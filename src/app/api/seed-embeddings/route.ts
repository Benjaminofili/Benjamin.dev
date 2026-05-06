import { embed } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "~/server/db";

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
});

type EmbeddingRow = {
  content: string;
  metadata: {
    type: "project" | "article" | "identity";
    id: string;
    title: string;
  };
};

const IDENTITY_BLOCKS = [
  "Identity: Benjamin. Role: Senior Engineer - Agentic AI Integration.",
  "Engineering Principle: Type-Safe Data Flow.",
  "Engineering Principle: Edge-First Architecture.",
  "Engineering Principle: RAG Pipeline Mastery.",
] as const;

function formatProjectBlock(project: {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  techStack: string[];
  fullDescription: string;
}): EmbeddingRow {
  return {
    content: `Project: ${project.title}. Slug: ${project.slug}. Tech Stack: ${project.techStack.join(", ")}. Description: ${project.tagline}. Deep Dive: ${project.fullDescription}`,
    metadata: {
      type: "project",
      id: project.id,
      title: project.title,
    },
  };
}

function formatArticleBlock(article: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  body: string;
}): EmbeddingRow {
  return {
    content: `Article: ${article.title}. Slug: ${article.slug}. Tags: ${article.tags.join(", ")}. Excerpt: ${article.excerpt}. Body: ${article.body}`,
    metadata: {
      type: "article",
      id: article.id,
      title: article.title,
    },
  };
}

export async function POST(): Promise<Response> {
  try {
    const env = envSchema.parse({
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const [projects, articles] = await Promise.all([
      db.project.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          tagline: true,
          techStack: true,
          fullDescription: true,
        },
      }),
      db.article.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          tags: true,
          body: true,
        },
      }),
    ]);

    const identityRows: EmbeddingRow[] = IDENTITY_BLOCKS.map((content, index) => ({
      content,
      metadata: {
        type: "identity",
        id: `identity-${index + 1}`,
        title: "Chapter I: Identity",
      },
    }));

    const rowsToEmbed: EmbeddingRow[] = [
      ...projects.map(formatProjectBlock),
      ...articles.map(formatArticleBlock),
      ...identityRows,
    ];

    const google = createGoogleGenerativeAI({
      apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    // Clear and repopulate for deterministic re-runs.
    await db.documentChunk.deleteMany();

    let insertedCount = 0;
    for (const row of rowsToEmbed) {
      const { embedding } = await embed({
        model: google.textEmbeddingModel("gemini-embedding-001"),
        value: row.content,
        providerOptions: {
          google: {
            outputDimensionality: 768,
            taskType: "RETRIEVAL_DOCUMENT",
          },
        },
      });

      // Use raw SQL for the vector embedding since Prisma doesn't natively support it
      await db.$executeRawUnsafe(
        `INSERT INTO document_chunks (id, content, metadata, embedding) VALUES (gen_random_uuid(), $1, $2::jsonb, $3::vector)`,
        row.content,
        JSON.stringify(row.metadata),
        `[${embedding.join(",")}]`
      );

      insertedCount += 1;
    }

    return Response.json({
      ok: true,
      totals: {
        projects: projects.length,
        articles: articles.length,
        identityBlocks: identityRows.length,
        inserted: insertedCount,
      },
    });
  } catch (error) {
    console.error("seed-embeddings route error:", error);
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown ingestion error",
      },
      { status: 500 },
    );
  }
}
