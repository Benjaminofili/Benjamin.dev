import { embed, streamText, convertToModelMessages, type UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const requestSchema = z.object({
  messages: z.array(z.custom<UIMessage>()),
});

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

type MatchDocumentRow = {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
};

const MATCH_THRESHOLDS = [0.62, 0.5, 0.35] as const;

function extractLatestUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (!message || message.role !== "user") continue;

    const parts = Array.isArray(message.parts) ? message.parts : [];
    const text = parts
      .filter((part): part is { type: "text"; text: string } => {
        return part.type === "text" && typeof (part as { text?: unknown }).text === "string";
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
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    const body = await request.json();
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

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    let chunks: MatchDocumentRow[] = [];
    for (const threshold of MATCH_THRESHOLDS) {
      const { data, error } = await supabase.rpc("match_documents", {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: 8,
      });

      if (error) {
        throw new Error(`Supabase RPC error: ${error.message}`);
      }

      chunks = (data ?? []) as MatchDocumentRow[];
      if (chunks.length > 0) break;
    }

    const context = chunks.map((chunk) => chunk.content).join("\n\n---\n\n");

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: await convertToModelMessages(messages),
      system: `You are Benjamin's professional portfolio representative.
Only answer using the retrieved context below.
If the answer is not present in the context, say that you do not have enough information and ask a clarifying follow-up.
Do not use outside knowledge and do not fabricate experience, metrics, or project details.

Retrieved context:
${context || "No relevant context was found."}`,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response("Failed to process chat request.", { status: 500 });
  }
}
