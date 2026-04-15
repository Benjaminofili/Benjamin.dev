import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});

function ensureEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const GEMINI_MODEL = "models/gemini-embedding-001";

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

  const testQuery = "What projects use Next.js and Tailwind CSS?";
  console.log(`\n🔍 Generating embedding for query: "${testQuery}"...`);
  const embedding = await generateEmbeddingVector(model, testQuery);

  console.log("📥 Calling match_documents RPC via Prisma...");
  
  // Note: pgvector requires the vector string to be formatted like '[0.1, 0.2, ...]'
  const vectorString = `[${embedding.join(",")}]`;

  const results = await prisma.$queryRaw<
    { id: string; content: string; metadata: any; similarity: number }[]
  >`
    SELECT id, content, metadata, similarity
    FROM match_documents(${vectorString}::vector, 0.4, 3)
  `;

  console.log(`\n✅ Retrieved ${results.length} chunks successfully!\n`);

  results.forEach((result, idx) => {
    console.log(`--- Match ${idx + 1} (Similarity: ${(result.similarity * 100).toFixed(2)}%) ---`);
    console.log(`Source Type: ${result.metadata.type}`);
    console.log(`Title: ${result.metadata.title}`);
    console.log(`Content Preview: ${result.content.substring(0, 150)}...\n`);
  });
}

main()
  .catch((error) => {
    console.error("Smoke test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
