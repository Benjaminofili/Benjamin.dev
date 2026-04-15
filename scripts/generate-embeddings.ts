import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEncoding } from "js-tiktoken";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});

const GEMINI_MODEL = "models/gemini-embedding-001";
const CHUNK_SIZE_TOKENS = 512;
const CHUNK_OVERLAP_TOKENS = 64;

type SourceType = "project" | "article";

type ChunkPayload = {
  content: string;
  metadata: {
    type: SourceType;
    id: string;
    title: string;
    slug: string;
  };
};

function ensureEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function buildProjectContent(project: {
  title: string;
  slug: string;
  tagline: string;
  fullDescription: string;
  caseStudyContent: string | null;
  techStack: string[];
  impactMetric: string | null;
  scaleMetric: string | null;
}): string {
  return [
    `Title: ${project.title}`,
    `Slug: ${project.slug}`,
    `Tagline: ${project.tagline}`,
    `Tech Stack: ${project.techStack.join(", ")}`,
    `Impact Metric: ${project.impactMetric ?? "N/A"}`,
    `Scale Metric: ${project.scaleMetric ?? "N/A"}`,
    "",
    "Full Description:",
    project.fullDescription,
    "",
    "Case Study Content:",
    project.caseStudyContent ?? "N/A",
  ].join("\n");
}

function buildArticleContent(article: {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  tags: string[];
}): string {
  return [
    `Title: ${article.title}`,
    `Slug: ${article.slug}`,
    `Excerpt: ${article.excerpt}`,
    `Tags: ${article.tags.join(", ")}`,
    "",
    "Body:",
    article.body,
  ].join("\n");
}

async function splitContentIntoChunks(
  input: string,
  metadata: ChunkPayload["metadata"],
): Promise<ChunkPayload[]> {
  // Uses token-aware length calculation to approximate 512-token chunks.
  const encoding = getEncoding("cl100k_base");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE_TOKENS,
    chunkOverlap: CHUNK_OVERLAP_TOKENS,
    lengthFunction: (text: string) => encoding.encode(text).length,
  });

  const docs = await splitter.createDocuments([input]);
  const chunks = docs
    .map((doc: { pageContent: string }) => doc.pageContent.trim())
    .filter((content: string) => content.length > 0)
    .map((content: string) => ({ content, metadata }));

  return chunks;
}

async function generateEmbeddingVector(
  model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
  text: string,
): Promise<number[]> {
  const embedRequest: any = {
    content: { role: "user", parts: [{ text }] },
    outputDimensionality: 768,
  };
  const response = await model.embedContent(embedRequest);
  const values = response.embedding.values;

  if (!Array.isArray(values) || values.length !== 768) {
    throw new Error(
      `Invalid embedding length. Expected 768, received ${values?.length ?? 0}.`,
    );
  }

  return values;
}

async function main() {
  const apiKey = ensureEnv("GEMINI_API_KEY");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  console.log("Starting Gemini embedding ingestion...");

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      tagline: true,
      fullDescription: true,
      caseStudyContent: true,
      techStack: true,
      impactMetric: true,
      scaleMetric: true,
    },
    orderBy: { displayOrder: "asc" },
  });

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      body: true,
      tags: true,
    },
    orderBy: { publishedAt: "desc" },
  });

  const allChunks: ChunkPayload[] = [];

  for (const project of projects) {
    const content = buildProjectContent(project);
    const chunks = await splitContentIntoChunks(content, {
      type: "project",
      id: project.id,
      title: project.title,
      slug: project.slug,
    });
    allChunks.push(...chunks);
  }

  for (const article of articles) {
    const content = buildArticleContent(article);
    const chunks = await splitContentIntoChunks(content, {
      type: "article",
      id: article.id,
      title: article.title,
      slug: article.slug,
    });
    allChunks.push(...chunks);
  }

  console.log(`Prepared ${allChunks.length} chunks for embedding.`);

  await prisma.documentChunk.deleteMany();
  console.log("Cleared existing document_chunks rows.");

  let insertedCount = 0;
  for (const chunk of allChunks) {
    const embedding = await generateEmbeddingVector(model, chunk.content);

    await prisma.$executeRaw`
      INSERT INTO document_chunks (id, content, metadata, embedding, "createdAt")
      VALUES (
        gen_random_uuid(),
        ${chunk.content},
        ${JSON.stringify(chunk.metadata)}::jsonb,
        ${`[${embedding.join(",")}]`}::vector,
        NOW()
      )
    `;

    insertedCount += 1;
    if (insertedCount % 25 === 0) {
      console.log(`Inserted ${insertedCount}/${allChunks.length} chunks...`);
    }
  }

  console.log(`Done. Inserted ${insertedCount} document chunks.`);
}

main()
  .catch((error) => {
    console.error("Embedding ingestion failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
