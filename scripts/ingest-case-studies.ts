/**
 * scripts/ingest-case-studies.ts
 *
 * Syncs portfolio content to the database and rebuilds the RAG index.
 *
 *  1. Backs up, then removes obsolete/fabricated projects and articles.
 *  2. Upserts every project in PROJECT_SEEDS (all display fields are updated).
 *  3. Clears document_chunks and re-embeds identity + case study content
 *     with Gemini 768-dim embeddings.
 *
 * Run:  npx tsx scripts/ingest-case-studies.ts [--dry-run] [--skip-embeddings]
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient, type ProjectRole } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEncoding } from "js-tiktoken";
import { GEO_CASE_STUDIES } from "./geo-case-study-data";
import { IDENTITY_BLOCKS } from "../src/lib/profile";

// ── Config ────────────────────────────────────────────────────────────────────

const GEMINI_MODEL = "models/gemini-embedding-001";
const CHUNK_SIZE_TOKENS = 512;
const CHUNK_OVERLAP_TOKENS = 64;
const EMBEDDING_DIMENSIONS = 768;

const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_EMBEDDINGS = process.argv.includes("--skip-embeddings");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});

// ── Obsolete content ─────────────────────────────────────────────────────────
// Seed entries with unsupported metrics or placeholder repository links, the
// duplicate Bistro Bliss entry, and the previous translator slug.

const OBSOLETE_PROJECT_SLUGS = [
  "benjamin-dev-portfolio",
  "shorely-beach-escape-platform",
  "bistro-bliss-frontend-system",
  "antonio-translator",
];

const OBSOLETE_ARTICLE_SLUGS = [
  "why-i-replaced-rest-with-trpc",
  "debugging-silent-race-condition-rag-pipeline",
  "hidden-cost-of-hydration-critique",
];

// ── Project metadata ─────────────────────────────────────────────────────────
// `highlight` is stored in the impactMetric column and shown as "Key
// contribution". It must stay qualitative: no unmeasured figures.

type ProjectSeed = {
  title: string;
  tagline: string;
  fullDescription: string;
  // null when the contribution split is not established; the UI omits the field
  // rather than asserting a role that cannot be supported.
  role: ProjectRole | null;
  techStack: string[];
  repositoryUrl: string | null;
  // null until a real screenshot of the running project exists. The UI renders
  // a typographic cover instead of a stand-in image.
  thumbnailUrl: string | null;
  coverImageUrl: string | null;
  completedDate: Date;
  highlight: string;
  // Team/engagement context, e.g. a hackathon. Stored in scaleMetric, which —
  // like impactMetric — now carries prose rather than a metric.
  context?: string;
  featured: boolean;
  displayOrder: number;
};

const PROJECT_SEEDS: Record<string, ProjectSeed> = {
  // ── Featured ────────────────────────────────────────────────────────────
  mediconnect: {
    title: "MediConnect",
    tagline:
      "A Django REST API for remote consultations: role-based accounts, appointment booking, Whereby video rooms and medical document storage.",
    fullDescription:
      "MediConnect is a Django REST API where patients book appointments with doctors, hold video consultations through the Whereby API, and receive prescriptions and medical records. It uses PostgreSQL, JWT authentication with separate patient, doctor and administrator roles, Supabase object storage for documents, and a Pytest suite with mocked and real-API test modes.",
    role: "SOLO_DEVELOPER",
    techStack: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "JWT",
      "Whereby API",
      "Supabase Storage",
      "Pytest",
    ],
    repositoryUrl: "https://github.com/Benjaminofili/MediConnect-",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-03-01"),
    highlight:
      "Designed and built the backend: role-based accounts, appointment lifecycle, Whereby video rooms and document storage, with a Pytest suite that has mocked and real-API modes.",
    featured: true,
    displayOrder: 1,
  },
  "ai-support-agent": {
    title: "AI Support Agent",
    tagline:
      "A multi-tenant support platform that answers customer questions from a company's own documents using RAG, across web chat, WhatsApp and email.",
    fullDescription:
      "AI Support Agent is a multi-tenant B2B support platform built with Django and Django Ninja. Documents are embedded into PostgreSQL with pgvector and retrieved to ground answers generated through Groq, with OpenAI as a fallback. Celery and Redis run background work, Twilio provides WhatsApp, and email is handled through SMTP and Resend. Embeddings are computed locally with a Hugging Face model.",
    role: "SOLO_DEVELOPER",
    techStack: [
      "Python",
      "Django",
      "Django Ninja",
      "PostgreSQL",
      "pgvector",
      "Celery",
      "Redis",
      "Hugging Face",
      "Twilio",
      "Docker",
    ],
    repositoryUrl: "https://github.com/Benjaminofili/ai_support_agent",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-10-01"),
    highlight:
      "Built the full RAG pipeline and the integrations around it: document ingestion, vector retrieval, background processing, and web chat, WhatsApp and email channels.",
    featured: true,
    displayOrder: 2,
  },
  verd: {
    title: "Verd",
    tagline:
      "An offline-first Flutter app that detects plant diseases from photos, using Gemini online and on-device TensorFlow Lite offline.",
    fullDescription:
      "Verd helps farmers and gardeners identify crop health issues from a photo. It was a team project built for the AgriScan AI Hackathon, where it reached the finals, with Benjamin as Lead Mobile Developer: he led the Flutter application, built the frontend, handled the app's backend and service integration, and integrated the pretrained machine-learning model. It uses Riverpod and GoRouter, Firebase for authentication and sync, Hive for local storage, the Gemini API when online and an on-device TensorFlow Lite model with Grad-CAM when offline. The underlying model was not trained by him.",
    role: "LEAD_MOBILE_DEVELOPER",
    techStack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "TensorFlow Lite",
      "Grad-CAM",
      "Firebase",
      "Hive",
      "Gemini API",
    ],
    repositoryUrl: "https://github.com/Benjaminofili/Verd",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-09-01"),
    highlight:
      "Led the Flutter app as Lead Mobile Developer: frontend, service integration, and integration of the on-device machine-learning model with Grad-CAM explainability.",
    context: "Team project · AgriScan AI Hackathon finalist",
    featured: true,
    displayOrder: 3,
  },
  "offline-voice-translator": {
    title: "Offline AI Voice Translator",
    tagline:
      "A Flutter app that transcribes, translates and speaks using pretrained on-device models: Sherpa-ONNX, CTranslate2 with OPUS-MT, and Piper.",
    fullDescription:
      "The Offline AI Voice Translator chains speech recognition, machine translation and speech synthesis inside a Flutter app using pretrained models. My contribution was integration engineering: researching model options, integrating Sherpa-ONNX for speech-to-text, CTranslate2 with OPUS-MT for translation and Piper for text-to-speech, orchestrating the pipeline, working around Windows, mobile and ONNX constraints, and building the initial UI. The underlying models were not trained by me.",
    role: "INTEGRATION_DEVELOPER",
    techStack: [
      "Flutter",
      "Dart",
      "Sherpa-ONNX",
      "CTranslate2",
      "OPUS-MT",
      "Piper TTS",
      "Hive",
    ],
    repositoryUrl: null,
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-12-01"),
    highlight:
      "Integration engineering: selected pretrained models and orchestrated speech to transcription to translation to speech, including platform and ONNX workarounds.",
    featured: true,
    displayOrder: 4,
  },

  // ── Earlier work and in-progress ────────────────────────────────────────
  "fusion-fiesta": {
    title: "Fusion Fiesta",
    tagline:
      "A Flutter college event management app with separate admin, organizer and student portals and QR-based attendance.",
    fullDescription:
      "Fusion Fiesta is a cross-platform event management app built with Flutter, GoRouter and GetIt. It separates administrator, organizer and student experiences and includes QR-based attendance tracking. An earlier learning project.",
    role: "SOLO_DEVELOPER",
    techStack: ["Flutter", "Dart", "GoRouter", "GetIt", "REST API"],
    repositoryUrl: "https://github.com/Benjaminofili/Fusion_fiesta_v2",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-06-01"),
    highlight:
      "Role-based portals with route guards, and QR-based event check-in.",
    featured: false,
    displayOrder: 5,
  },
  tasteflow: {
    title: "Tasteflow",
    tagline:
      "A Flask food ordering and delivery platform with separate customer, owner and admin portals.",
    fullDescription:
      "Tasteflow is a full-stack Flask application using Blueprints, SQLAlchemy, Alembic and Jinja2, with role-based access for customers, restaurant owners and administrators and a Pytest suite. An earlier learning project.",
    role: "SOLO_DEVELOPER",
    techStack: ["Python", "Flask", "SQLAlchemy", "Alembic", "Pytest", "Jinja2"],
    repositoryUrl: "https://github.com/Benjaminofili/Tasteflow",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-04-01"),
    highlight:
      "Three-role access control with data scoped to each restaurant owner, covered by Pytest.",
    featured: false,
    displayOrder: 6,
  },
  "baby-shophub": {
    title: "Baby Shophub",
    tagline:
      "A Flutter e-commerce app for baby products with Supabase, Google sign-in and separate customer and admin flows.",
    fullDescription:
      "Baby Shophub is a Flutter mobile shop backed by Supabase (PostgreSQL and auth), with Google sign-in, a service layer between screens and data, and deep links to product screens. An earlier learning project.",
    role: "SOLO_DEVELOPER",
    techStack: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    repositoryUrl: "https://github.com/Benjaminofili/Baby_Shophub",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-06-01"),
    highlight:
      "Customer and admin flows chosen at sign-in, with a service layer keeping database queries out of the UI.",
    featured: false,
    displayOrder: 7,
  },
  "bistro-bliss": {
    title: "Bistro Bliss",
    tagline:
      "A responsive restaurant website built with Next.js, TypeScript and Tailwind CSS, with a validated reservation form.",
    fullDescription:
      "Bistro Bliss is a restaurant website with menu browsing and a reservation form, built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form and Zod. An earlier front-end learning project.",
    role: "SOLO_DEVELOPER",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "React Hook Form",
      "Zod",
    ],
    repositoryUrl: "https://github.com/Benjaminofili/BistroBliss-Website",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2025-12-01"),
    highlight:
      "Responsive layout and a reservation form with typed validation on accessible component primitives.",
    featured: false,
    displayOrder: 8,
  },
  "devdocs-ai": {
    title: "DevDocs AI",
    tagline:
      "An experimental prototype that drafts documentation for a GitHub repository using language models. Work in progress.",
    fullDescription:
      "DevDocs AI is an experimental Next.js and TypeScript prototype that reads a GitHub repository and uses language models to draft documentation. It includes a provider-agnostic AI layer and rate limiting. Output quality is not yet where it should be, so it is presented as earlier work.",
    role: "SOLO_DEVELOPER",
    techStack: ["Next.js", "TypeScript", "Supabase", "Redis"],
    repositoryUrl: "https://github.com/Benjaminofili/devdocs-ai",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2026-02-01"),
    highlight:
      "A provider-agnostic AI layer and rate limiting on the AI endpoints. Still a prototype.",
    featured: false,
    displayOrder: 9,
  },
  "aspire-edge": {
    title: "AspireEdge",
    tagline:
      "A career guidance platform for students and professionals. In development.",
    fullDescription:
      "AspireEdge is a career guidance platform in development, planned as a Spring Boot backend with PostgreSQL and a cross-platform Flutter client. It is unfinished and is not presented as a completed system.",
    role: "SOLO_DEVELOPER",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Flutter"],
    repositoryUrl: "https://github.com/Benjaminofili/AspireEdge",
    thumbnailUrl: null,
    coverImageUrl: null,
    completedDate: new Date("2026-01-01"),
    highlight: "Unfinished. Included to show current direction and learning.",
    featured: false,
    displayOrder: 10,
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

type Metadata = {
  type: "project" | "identity";
  id: string;
  title: string;
  slug?: string;
};
type ChunkPayload = { content: string; metadata: Metadata };

async function chunkText(
  text: string,
  metadata: Metadata,
): Promise<ChunkPayload[]> {
  const enc = getEncoding("cl100k_base");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE_TOKENS,
    chunkOverlap: CHUNK_OVERLAP_TOKENS,
    lengthFunction: (t: string) => enc.encode(t).length,
  });
  const docs = await splitter.createDocuments([text]);
  return docs
    .map((d: { pageContent: string }) => d.pageContent.trim())
    .filter((c: string) => c.length > 0)
    .map((content: string) => ({ content, metadata }));
}

async function embedText(
  model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
  text: string,
): Promise<number[]> {
  const res = await model.embedContent({
    content: { role: "user", parts: [{ text }] },
    outputDimensionality: EMBEDDING_DIMENSIONS,
  } as Parameters<typeof model.embedContent>[0]);

  const values = res.embedding.values;
  if (!Array.isArray(values) || values.length !== EMBEDDING_DIMENSIONS) {
    throw new Error(
      `Bad embedding: expected ${EMBEDDING_DIMENSIONS}, got ${values?.length}`,
    );
  }
  return values;
}

async function insertChunk(
  model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>,
  chunk: ChunkPayload,
) {
  const embedding = await embedText(model, chunk.content);
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
}

function validateSeeds() {
  for (const [slug, seed] of Object.entries(PROJECT_SEEDS)) {
    if (!GEO_CASE_STUDIES[slug]) throw new Error(`No case study for "${slug}"`);
    if (seed.title.length > 60) throw new Error(`${slug}: title > 60 chars`);
    if (seed.tagline.length > 200)
      throw new Error(`${slug}: tagline > 200 chars`);
    if (seed.highlight.length > 200)
      throw new Error(`${slug}: highlight > 200 chars`);
    if (seed.context && seed.context.length > 200)
      throw new Error(`${slug}: context > 200 chars`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  validateSeeds();
  console.log(`\nSync portfolio content${DRY_RUN ? " (DRY RUN)" : ""}\n`);

  // ── 1. Back up and remove obsolete content ───────────────────────────────
  const obsoleteProjects = await prisma.project.findMany({
    where: { slug: { in: OBSOLETE_PROJECT_SLUGS } },
  });
  const obsoleteArticles = await prisma.article.findMany({
    where: { slug: { in: OBSOLETE_ARTICLE_SLUGS } },
  });
  console.log(
    `Obsolete rows found: ${obsoleteProjects.length} projects, ${obsoleteArticles.length} articles`,
  );

  if (
    !DRY_RUN &&
    (obsoleteProjects.length > 0 || obsoleteArticles.length > 0)
  ) {
    const dir = path.join(process.cwd(), "scratch", "backups");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `removed-content-${Date.now()}.json`);
    fs.writeFileSync(
      file,
      JSON.stringify(
        { projects: obsoleteProjects, articles: obsoleteArticles },
        null,
        2,
      ),
    );
    console.log(`Backup written: ${file}`);

    await prisma.project.deleteMany({
      where: { slug: { in: OBSOLETE_PROJECT_SLUGS } },
    });
    await prisma.article.deleteMany({
      where: { slug: { in: OBSOLETE_ARTICLE_SLUGS } },
    });
    console.log("Obsolete rows removed.");
  }

  // ── 2. Upsert projects ────────────────────────────────────────────────────
  console.log("\nUpserting projects:");
  const projects: {
    id: string;
    slug: string;
    title: string;
    techStack: string[];
  }[] = [];

  for (const [slug, seed] of Object.entries(PROJECT_SEEDS)) {
    const geo = GEO_CASE_STUDIES[slug]!;
    const fields = {
      title: seed.title,
      tagline: seed.tagline,
      fullDescription: seed.fullDescription,
      caseStudyContent: geo.markdown,
      role: seed.role,
      techStack: seed.techStack,
      repositoryUrl: seed.repositoryUrl,
      liveUrl: null,
      thumbnailUrl: seed.thumbnailUrl,
      coverImageUrl: seed.coverImageUrl,
      timeframe: "",
      impactMetric: seed.highlight,
      scaleMetric: seed.context ?? null,
      featured: seed.featured,
      displayOrder: seed.displayOrder,
    };

    if (DRY_RUN) {
      console.log(
        `  (dry) ${slug} featured=${seed.featured} order=${seed.displayOrder}`,
      );
      continue;
    }

    const project = await prisma.project.upsert({
      where: { slug },
      create: { slug, completedDate: seed.completedDate, ...fields },
      update: fields,
      select: { id: true, slug: true, title: true, techStack: true },
    });
    projects.push(project);
    console.log(`  ✓ ${project.slug}`);
  }

  if (DRY_RUN || SKIP_EMBEDDINGS) {
    console.log("\nSkipping embeddings.");
    return;
  }

  // ── 3. Rebuild the RAG index ──────────────────────────────────────────────
  const apiKey =
    process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey)
    throw new Error(
      "Missing env var: GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY",
    );
  const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: GEMINI_MODEL,
  });

  console.log("\nClearing document_chunks and re-embedding");
  await prisma.$executeRaw`DELETE FROM document_chunks`;

  let total = 0;

  for (const [i, content] of IDENTITY_BLOCKS.entries()) {
    await insertChunk(model, {
      content,
      metadata: { type: "identity", id: `identity-${i + 1}`, title: "About" },
    });
    total++;
  }

  for (const project of projects) {
    const geo = GEO_CASE_STUDIES[project.slug]!;
    const header = `Project: ${project.title}. Technologies: ${project.techStack.join(", ")}.\n\n`;
    const chunks = await chunkText(header + geo.markdown, {
      type: "project",
      id: project.id,
      title: project.title,
      slug: project.slug,
    });
    // Repeat the project name on every chunk so retrieval can tell projects apart.
    for (const chunk of chunks) {
      const content = chunk.content.startsWith("Project:")
        ? chunk.content
        : `Project: ${project.title}.\n\n${chunk.content}`;
      await insertChunk(model, { ...chunk, content });
      total++;
    }
    console.log(`  ✓ ${project.title} (${chunks.length} chunks)`);
  }

  console.log(`\nDone. Chunks inserted: ${total}`);
}

main()
  .catch((err) => {
    console.error("Sync failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
