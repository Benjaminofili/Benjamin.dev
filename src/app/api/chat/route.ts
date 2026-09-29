import {
  embed,
  streamText,
  convertToModelMessages,
  tool,
  type UIMessage,
} from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "~/server/db";
import { PROFILE } from "~/lib/profile";

const requestSchema = z.object({
  messages: z.array(z.custom<UIMessage>()),
});

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
});

type MatchDocumentRow = {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
};

const MATCH_THRESHOLDS = [0.62, 0.5, 0.35] as const;

const PROJECT_SLUG_ALIASES: Record<string, string> = {
  "offline translator": "offline-voice-translator",
  "voice translator": "offline-voice-translator",
  "support agent": "ai-support-agent",
};

function normalizeProjectReference(reference: string): string {
  const trimmed = reference.trim().toLowerCase();
  return PROJECT_SLUG_ALIASES[trimmed] ?? trimmed;
}

async function findProjectByReference(reference: string) {
  const normalized = normalizeProjectReference(reference);

  const bySlug = await db.project.findUnique({
    where: { slug: normalized },
    select: {
      id: true,
      title: true,
      slug: true,
      techStack: true,
      impactMetric: true,
      role: true,
      timeframe: true,
    },
  });

  if (bySlug) return bySlug;

  const token = reference.trim();
  if (!token) return null;

  return db.project.findFirst({
    where: {
      OR: [
        { title: { contains: token, mode: "insensitive" } },
        { slug: { contains: token.toLowerCase() } },
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      techStack: true,
      impactMetric: true,
      role: true,
      timeframe: true,
    },
  });
}

function extractLatestUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.role !== "user") continue;

    const parts = message.parts ?? [];
    const text = parts
      .filter((part): part is { type: "text"; text: string } => {
        return part?.type === "text" && typeof part?.text === "string";
      })
      .map((part) => part.text)
      .join("\n")
      .trim();

    if (text.length > 0) return text;
  }

  return "";
}

export async function POST(request: Request): Promise<Response> {
  try {
    const env = envSchema.parse({
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const body = (await request.json()) as { messages: UIMessage[] };
    const { messages } = requestSchema.parse(body);

    const latestUserMessage = extractLatestUserText(messages);
    if (!latestUserMessage) {
      return new Response("A user message is required.", { status: 400 });
    }

    const google = createGoogleGenerativeAI({
      apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const { embedding } = await embed({
      model: google.textEmbeddingModel("gemini-embedding-001"),
      value: latestUserMessage,
      providerOptions: {
        google: {
          outputDimensionality: 768,
          taskType: "RETRIEVAL_QUERY",
        },
      },
    });

    let chunks: MatchDocumentRow[] = [];
    for (const threshold of MATCH_THRESHOLDS) {
      const data = await db.$queryRawUnsafe<MatchDocumentRow[]>(
        `SELECT * FROM match_documents($1::vector, $2::float, $3::int)`,
        `[${embedding.join(",")}]`,
        threshold,
        8,
      );

      chunks = data ?? [];
      if (chunks.length > 0) break;
    }

    const context = chunks.map((chunk) => chunk.content).join("\n\n---\n\n");

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: await convertToModelMessages(messages),
      system: `You are the assistant on the portfolio of ${PROFILE.name}, a software engineer and final-year BSc (Hons) Business Computing and Data Analytics student at Middlesex University Mauritius. He holds an Advanced Diploma in Software Engineering (Distinction) from Aptech and completed a software engineering internship at Imansoft Technologies (August-September 2025). Be professional, concise and precise. Refer to him as ${PROFILE.shortName} or "he".

<core_directive>
You operate under a strict zero-hallucination policy. You must ONLY answer using the provided context or by executing your available tools. Never fabricate experience, metrics, projects, or use outside knowledge. Do not describe him as a senior engineer. Do not claim he trained machine-learning models unless the context says so. Do not present unfinished projects as completed. If asked about contact details, availability or CV, point to the Contact section of the page.
</core_directive>

<agentic_methodology>
You operate using the ReAct (Reason, Then Act) framework. You are an autonomous agent, not a static Q&A bot. 
1. Always analyze the user's query against the <context> provided below.
2. If the <context> does not contain the complete answer, you MUST autonomously evaluate the descriptions of all your available tools.
3. DO NOT limit yourself to specific tool categories. If ANY tool's description indicates it can fetch the missing information, you must execute it immediately.
4. Only state that you "do not have enough information" if you have exhausted all relevant tools and the information is still not found.
</agentic_methodology>

<context>
${context ?? "No relevant context was found."}
</context>`,
      tools: {
        getProjectDetails: tool({
          description:
            "Fetches specific structured project metrics for a single project reference (slug or name).",
          inputSchema: z.object({
            slug: z.string().min(1),
          }),
          execute: async ({ slug }) => {
            try {
              const project = await findProjectByReference(slug);

              if (!project) {
                return {
                  found: false,
                  message: `No project found for reference "${slug}".`,
                };
              }

              return {
                found: true,
                project: {
                  title: project.title,
                  slug: project.slug,
                  techStack: project.techStack,
                  impactMetric: project.impactMetric,
                  role: project.role,
                },
              };
            } catch (error) {
              return {
                found: false,
                error: "DATABASE_ERROR",
                message:
                  error instanceof Error
                    ? error.message
                    : "Failed to fetch project details due to a database error.",
              };
            }
          },
        }),
        getArticleContent: tool({
          description:
            "Retrieves the full body content and category of a technical article.",
          inputSchema: z.object({
            slug: z.string().min(1).describe("The slug of the article."),
          }),
          execute: async ({ slug }) => {
            try {
              const article = await db.article.findUnique({ where: { slug } });
              if (!article) {
                return {
                  found: false,
                  message: `No article found for slug "${slug}".`,
                };
              }
              return {
                found: true,
                article,
              };
            } catch (error) {
              return {
                found: false,
                error: "DATABASE_ERROR",
                message:
                  error instanceof Error
                    ? error.message
                    : "Failed to fetch article details.",
              };
            }
          },
        }),
        listArticles: tool({
          description:
            "Returns a list of all technical articles available in 'The Lens'.",
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const articles = await db.article.findMany({
                select: {
                  title: true,
                  slug: true,
                  category: true,
                  excerpt: true,
                },
              });
              return {
                found: true,
                count: articles.length,
                articles,
              };
            } catch (error) {
              return {
                found: false,
                error: "DATABASE_ERROR",
                message:
                  error instanceof Error
                    ? error.message
                    : "Failed to list articles.",
              };
            }
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response("Failed to process chat request.", { status: 500 });
  }
}
