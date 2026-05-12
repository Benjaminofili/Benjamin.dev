/**
 * scripts/ingest-case-studies.ts
 *
 * Phase 1a: Updates caseStudyContent for existing projects that match GEO entries.
 * Phase 1b: Upserts (creates or updates) all 10 GEO case study projects.
 * Phase 2:  Strips HTML, chunks text, generates Gemini 768-dim embeddings,
 *           and inserts into document_chunks via $executeRaw.
 *
 * Run:  npx tsx scripts/ingest-case-studies.ts
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEncoding } from "js-tiktoken";
import { GEO_CASE_STUDIES } from "./geo-case-study-data";

// ── Config ────────────────────────────────────────────────────────────────────

const GEMINI_MODEL = "models/gemini-embedding-001";
const CHUNK_SIZE_TOKENS = 512;
const CHUNK_OVERLAP_TOKENS = 64;
const EMBEDDING_DIMENSIONS = 768;
const PLACEHOLDER_THUMBNAIL = "https://placeholder.com/thumbnail";

// ── Prisma ────────────────────────────────────────────────────────────────────

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});

// ── Existing-slug → GEO-slug mapping ─────────────────────────────────────────
// For projects already in the DB whose slugs differ from the GEO data keys.
// We update their caseStudyContent without changing their slug.

const EXISTING_SLUG_REMAP: Record<string, string> = {
  "bistro-bliss-frontend-system": "bistro-bliss",
};

// ── Project metadata for new records ─────────────────────────────────────────
// Required by schema: title, slug, tagline, fullDescription, role, techStack,
// thumbnailUrl, completedDate, timeframe, displayOrder

type ProjectSeed = {
  title: string;
  tagline: string;
  fullDescription: string;
  techStack: string[];
  repositoryUrl?: string;
  liveUrl?: string | null;
  thumbnailUrl?: string;
  coverImageUrl?: string | null;
  timeframe: string;
  completedDate: Date;
  displayOrder: number;
  impactMetric?: string;
  scaleMetric?: string | null;
};

const PROJECT_SEEDS: Record<string, ProjectSeed> = {
  "verd": {
    title: "VERD",
    tagline: "An offline-first Flutter app delivering instant crop-health diagnostics via a hybrid cloud-to-edge AI routing system.",
    fullDescription: "VERD is an AI-powered crop health diagnostic engine engineered for offline-first agricultural environments. It uses a hybrid routing system to switch seamlessly between cloud Gemini API inference and an on-device TensorFlow Lite model, ensuring sub-500ms diagnostics even in zero-connectivity rural fields.",
    techStack: ["Flutter", "Dart", "Riverpod", "Firebase", "TensorFlow Lite", "Gemini API", "Hive", "GoRouter"],
    repositoryUrl: "https://github.com/Benjaminofili/Verd",
    thumbnailUrl: "/verd-Thumbnail.avif",
    timeframe: "6 weeks",
    completedDate: new Date("2024-08-01"),
    displayOrder: 5,
    impactMetric: "Sub-500ms AI inference with 100% data retention in zero-connectivity environments",
  },
  "fusion-fiesta": {
    title: "Fusion Fiesta",
    tagline: "A cross-platform college event ecosystem with distinct role-based portals, JWT-guarded routing, and QR-based attendance tracking.",
    fullDescription: "Fusion Fiesta is an enterprise-grade event management platform built with Feature-First Clean Architecture. It manages three isolated user personas — Admin, Organizer, and Student — with strict route guards, scoped dependency injection, and an offline-capable QR ticketing system.",
    techStack: ["Flutter", "Dart", "GoRouter", "GetIt", "REST API", "Mockito"],
    repositoryUrl: "https://github.com/Benjaminofili/Fusion_fiesta_v2",
    thumbnailUrl: "/Fusion_fiesta-Thumbnail.avif",
    timeframe: "5 weeks",
    completedDate: new Date("2024-06-01"),
    displayOrder: 6,
    impactMetric: "30+ screens across 3 isolated user roles with zero state leakage",
  },
  "tasteflow": {
    title: "Tasteflow",
    tagline: "A multi-tenant food delivery ecosystem with strict RBAC and dedicated secure portals for customers, owners, and admins.",
    fullDescription: "Tasteflow is a multi-tenant restaurant and delivery platform architected with Flask Blueprints for strict domain isolation. It enforces role-based access control across three user personas, with SQLAlchemy-backed relational data modeling and a comprehensive Pytest suite covering security boundaries and E2E journeys.",
    techStack: ["Python", "Flask", "SQLAlchemy", "Alembic", "Pytest", "Werkzeug", "Jinja2", "Vanilla JavaScript"],
    repositoryUrl: "https://github.com/Benjaminofili/Tasteflow",
    thumbnailUrl: "/Tasteflow_Thumbnail.avif",
    timeframe: "5 weeks",
    completedDate: new Date("2024-04-01"),
    displayOrder: 7,
    impactMetric: "Zero horizontal privilege escalation across 3 roles and 20+ routes",
  },
  "baby-shophub": {
    title: "Baby Shophub",
    tagline: "A full-stack e-commerce app with real-time order tracking, deep-linked product routing, and isolated dual-role portals.",
    fullDescription: "Baby Shophub is a cross-platform e-commerce ecosystem powered by a Supabase BaaS backend. It features dual isolated portals for customers and administrators, a service abstraction layer to decouple all database queries from the UI, and a deep-linking service enabling direct-to-product navigation from external marketing campaigns.",
    techStack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Deep Linking"],
    repositoryUrl: "https://github.com/Benjaminofili/Baby_Shophub",
    timeframe: "4 weeks",
    completedDate: new Date("2024-02-01"),
    displayOrder: 8,
    impactMetric: "20+ screens with isolated customer and admin lifecycles via Supabase BaaS",
  },
  "ai-support-agent": {
    title: "AI Support Agent",
    tagline: "A robust multi-channel AI support platform with async background processing and a pgvector RAG knowledge base.",
    fullDescription: "AI Support Agent is an enterprise-grade conversational AI platform built with Django, Celery, and Redis. It decouples slow LLM inference from the main thread via an async task queue, implements a full RAG pipeline with pgvector for cosine similarity retrieval, and normalises multi-channel inputs (email, webchat) into a unified ticket model.",
    techStack: ["Python", "Django", "PostgreSQL", "pgvector", "Celery", "Redis", "Hugging Face", "Docker", "Playwright"],
    repositoryUrl: "https://github.com/Benjaminofili/ai_support_agent",
    timeframe: "6 weeks",
    completedDate: new Date("2024-10-01"),
    displayOrder: 9,
    impactMetric: "100% webhook ingestion success with zero UI blocking under concurrent LLM load",
  },
  "devdocs-ai": {
    title: "DevDocs AI",
    tagline: "A multi-tenant AI SaaS that ingests GitHub repositories and orchestrates multiple LLMs to generate production-ready documentation.",
    fullDescription: "DevDocs AI is an advanced multi-tenant SaaS platform that analyses the AST of GitHub repositories and routes generation tasks across Anthropic, Gemini, Groq, OpenAI, and local Ollama models. It integrates a full Stripe billing pipeline, Upstash Redis rate-limiting, and automatic graceful model degradation to ensure reliable documentation output.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Redis (Upstash)", "Stripe", "Anthropic", "Gemini", "Groq", "Ollama"],
    timeframe: "8 weeks",
    completedDate: new Date("2025-01-01"),
    displayOrder: 10,
    impactMetric: "Hot-swappable AI across 5 LLM providers with Redis-protected endpoints",
  },
  "mediconnect": {
    title: "MediConnect",
    tagline: "A comprehensive telehealth and practice management system with video consultations, dynamic scheduling, and encrypted EMR storage.",
    fullDescription: "MediConnect is a secure domain-driven Django monolith for telehealth practice management. It integrates the Whereby API for dynamic WebRTC video room provisioning, AWS S3 custom storage backends for encrypted EMR documents, and an atomic slot-locking scheduling engine that prevents double-bookings in high-concurrency environments.",
    techStack: ["Python", "Django", "PostgreSQL", "AWS S3", "Whereby API", "Pytest"],
    repositoryUrl: "https://github.com/Benjaminofili/MediConnect-",
    timeframe: "7 weeks",
    completedDate: new Date("2025-03-01"),
    displayOrder: 11,
    impactMetric: "100% critical journey coverage via Pytest integration suite with zero production regressions",
  },
  "aspire-edge": {
    title: "AspireEdge",
    tagline: "A decoupled enterprise ecosystem with a containerized Spring Boot backend and a cross-platform Flutter client.",
    fullDescription: "AspireEdge is a decoupled client-server enterprise platform comprising a Docker-containerized Spring Boot REST API and a cross-platform Flutter client. It uses Spring Boot YAML profiles for runtime database switching between a local Dockerized PostgreSQL instance and a Supabase production cluster, achieving 100% environment parity without code changes.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Flutter", "Dart", "Supabase"],
    repositoryUrl: "https://github.com/Benjaminofili/AspireEdge",
    timeframe: "4 weeks",
    completedDate: new Date("2024-11-01"),
    displayOrder: 12,
    impactMetric: "Backend onboarding under 60 seconds with native compilation across 5 operating systems",
  },
  "bistro-bliss": {
    title: "Bistro Bliss",
    tagline: "A fully responsive restaurant platform with accessible components, type-safe forms, and interactive reservation booking flows.",
    fullDescription: "Bistro Bliss is a high-performance Next.js 14 restaurant web application built on Radix UI primitives via Shadcn UI. It delivers 100% ARIA-compliant interactive components, type-safe reservation forms powered by Zod and React Hook Form, and optimised asset delivery via next/image — maintaining a flawless layout from 320px mobile to 4K desktop.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Radix UI", "React Hook Form", "Zod"],
    repositoryUrl: "https://github.com/Benjaminofili/BistroBliss-Website",
    timeframe: "3 weeks",
    completedDate: new Date("2024-01-01"),
    displayOrder: 13,
    impactMetric: "100% ARIA-compliant components with zero DOM layout shifts across all viewports",
  },
  "antonio-translator": {
    title: "Antonio Translator",
    tagline: "A cross-platform audio translation app orchestrating STT, Machine Translation, and TTS via strict service-oriented architecture.",
    fullDescription: "Antonio Translator is a real-time voice translation engine built on a strict Service-Oriented Architecture. It orchestrates a 4-stage async pipeline (Record → Transcribe → Translate → Synthesise) entirely within headless singleton Dart services, making the UI a stateless consumer and preventing memory leaks even during aggressive UI iteration cycles.",
    techStack: ["Flutter", "Dart", "STT API", "TTS API", "REST API", "Local Storage"],
    repositoryUrl: "https://github.com/Benjaminofili/Antionio-translator",
    timeframe: "3 weeks",
    completedDate: new Date("2023-11-01"),
    displayOrder: 14,
    impactMetric: "Sub-second 4-API pipeline orchestration with 100% business logic isolated from the UI layer",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim();
}

type Metadata = { type: "project"; id: string; title: string; slug: string };
type ChunkPayload = { content: string; metadata: Metadata };

async function chunkText(text: string, metadata: Metadata): Promise<ChunkPayload[]> {
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
  text: string
): Promise<number[]> {
  const res = await model.embedContent({
    content: { role: "user", parts: [{ text }] },
    outputDimensionality: EMBEDDING_DIMENSIONS,
  } as Parameters<typeof model.embedContent>[0]);

  const values = res.embedding.values;
  if (!Array.isArray(values) || values.length !== EMBEDDING_DIMENSIONS) {
    throw new Error(`Bad embedding: expected ${EMBEDDING_DIMENSIONS}, got ${values?.length}`);
  }
  return values;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("Missing env var: GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  console.log("\n🚀 Ingest Case Studies — Starting\n");

  // ── PHASE 1a: Update existing mismatched projects ─────────────────────────

  console.log("── PHASE 1a: Updating caseStudyContent on existing remapped projects ──");
  for (const [existingSlug, geoKey] of Object.entries(EXISTING_SLUG_REMAP)) {
    const geoEntry = GEO_CASE_STUDIES[geoKey];
    if (!geoEntry) { console.warn(`  ⚠ No GEO entry for key "${geoKey}"`); continue; }

    const updated = await prisma.project.updateMany({
      where: { slug: existingSlug },
      data: { caseStudyContent: geoEntry.markdown },
    });

    if (updated.count > 0) {
      console.log(`  ✓ Updated "${existingSlug}" with GEO content from "${geoKey}"`);
    } else {
      console.warn(`  ⚠ No project found with slug "${existingSlug}" — skipping remap`);
    }
  }

  // ── PHASE 1b: Upsert all 10 GEO projects ─────────────────────────────────

  console.log("\n── PHASE 1b: Upserting all 10 GEO projects ──");
  const upsertedProjects: { id: string; slug: string; title: string }[] = [];

  for (const [slug, geoEntry] of Object.entries(GEO_CASE_STUDIES)) {
    const seed = PROJECT_SEEDS[slug];
    if (!seed) {
      console.warn(`  ⚠ No seed metadata for slug "${slug}" — skipping`);
      continue;
    }

    const project = await prisma.project.upsert({
      where: { slug },
      create: {
        slug,
        title: seed.title,
        tagline: seed.tagline,
        fullDescription: seed.fullDescription,
        caseStudyContent: geoEntry.markdown,
        role: "SOLO_DEVELOPER",
        techStack: seed.techStack,
        repositoryUrl: seed.repositoryUrl,
        thumbnailUrl: seed.thumbnailUrl ?? PLACEHOLDER_THUMBNAIL,
        completedDate: seed.completedDate,
        timeframe: seed.timeframe,
        displayOrder: seed.displayOrder,
        impactMetric: seed.impactMetric,
        featured: false,
      },
      update: {
        caseStudyContent: geoEntry.markdown,
        thumbnailUrl: seed.thumbnailUrl ?? undefined,
      },
      select: { id: true, slug: true, title: true },
    });

    upsertedProjects.push(project);
    console.log(`  ✓ Upserted: ${project.title} (${project.slug})`);
  }

  console.log(`\n  Total GEO projects upserted: ${upsertedProjects.length}/10`);

  // ── PHASE 2: Delete stale chunks and re-embed ─────────────────────────────

  console.log("\n── PHASE 2: Clearing stale document_chunks for GEO projects ──");

  for (const project of upsertedProjects) {
    await prisma.$executeRaw`
      DELETE FROM document_chunks
      WHERE metadata->>'type' = 'project'
        AND metadata->>'id'   = ${project.id}
    `;
  }

  // Also clear chunks for remapped existing projects
  for (const existingSlug of Object.keys(EXISTING_SLUG_REMAP)) {
    const p = await prisma.project.findUnique({ where: { slug: existingSlug }, select: { id: true } });
    if (p) {
      await prisma.$executeRaw`
        DELETE FROM document_chunks
        WHERE metadata->>'type' = 'project'
          AND metadata->>'id'   = ${p.id}
      `;
    }
  }

  console.log("  ✓ Stale chunks cleared.\n");

  // ── PHASE 2b: Generate + insert embeddings for GEO projects ───────────────

  console.log("── PHASE 2b: Generating Gemini embeddings ──");
  let totalInserted = 0;

  for (const project of upsertedProjects) {
    const geoEntry = GEO_CASE_STUDIES[project.slug];
    if (!geoEntry) continue;

    const plainText = geoEntry.markdown;
    const metadata: Metadata = { type: "project", id: project.id, title: project.title, slug: project.slug };
    const chunks = await chunkText(plainText, metadata);

    console.log(`  Embedding ${chunks.length} chunks → ${project.title}`);

    for (const chunk of chunks) {
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
      totalInserted++;
    }

    console.log(`  ✓ Done: ${project.title} (${chunks.length} chunks)`);
  }

  // ── PHASE 2c: Re-embed remapped existing projects ─────────────────────────

  for (const [existingSlug, geoKey] of Object.entries(EXISTING_SLUG_REMAP)) {
    const project = await prisma.project.findUnique({
      where: { slug: existingSlug },
      select: { id: true, title: true, slug: true },
    });
    if (!project) continue;

    const geoEntry = GEO_CASE_STUDIES[geoKey];
    if (!geoEntry) continue;

    const plainText = geoEntry.markdown;
    const metadata: Metadata = { type: "project", id: project.id, title: project.title, slug: project.slug };
    const chunks = await chunkText(plainText, metadata);

    console.log(`  Embedding ${chunks.length} chunks → ${project.title} (remapped from ${geoKey})`);

    for (const chunk of chunks) {
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
      totalInserted++;
    }

    console.log(`  ✓ Done: ${project.title}`);
  }

  console.log(`\n✅ All done! Total document chunks inserted: ${totalInserted}`);
}

main()
  .catch((err) => { console.error("Ingestion failed:", err); process.exit(1); })
  .finally(() => prisma.$disconnect());
