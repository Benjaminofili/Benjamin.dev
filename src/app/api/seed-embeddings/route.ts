import { embed } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { db } from "~/server/db";

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
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
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
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

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Temporary ingestion route: clear and repopulate for deterministic re-runs.
    const { error: clearError } = await supabase
      .from("document_chunks")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (clearError) {
      throw new Error(`Failed to clear document_chunks: ${clearError.message}`);
    }

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

      const { error: insertError } = await supabase.from("document_chunks").insert({
        content: row.content,
        metadata: row.metadata,
        embedding: `[${embedding.join(",")}]`,
      });

      if (insertError) {
        throw new Error(
          `Failed to insert chunk (${row.metadata.type}:${row.metadata.id}): ${insertError.message}`,
        );
      }

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
