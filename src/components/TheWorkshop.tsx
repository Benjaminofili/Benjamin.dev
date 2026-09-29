"use client";

/**
 * TheWorkshop — Chapter 02
 * Technical capabilities, experience and engineering approach.
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const STACK_LAYERS = [
  {
    id: "web",
    label: "Web & Frontend",
    ordinal: "01",
    description: "Interfaces for the browser.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML & CSS",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    ordinal: "02",
    description: "Cross-platform apps with local and cloud data.",
    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Provider",
      "GoRouter",
      "Hive",
      "Firebase",
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    ordinal: "03",
    description: "Services, authentication and integrations.",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "Django Ninja",
      "Flask",
      "Java & Spring Boot",
      "tRPC",
      "JWT",
    ],
  },
  {
    id: "data",
    label: "Databases & Infrastructure",
    ordinal: "04",
    description: "Persistence, background work and delivery.",
    technologies: [
      "PostgreSQL",
      "SQL",
      "pgvector",
      "Supabase",
      "Redis",
      "Celery",
      "Prisma",
      "Docker",
      "Git & GitHub",
    ],
  },
  {
    id: "ai",
    label: "Applied AI & Integration",
    ordinal: "05",
    description: "Using existing models and services inside real products.",
    technologies: [
      "RAG pipelines",
      "Hugging Face",
      "Gemini API",
      "Groq",
      "TensorFlow Lite",
      "Sherpa-ONNX",
      "CTranslate2",
      "Piper TTS",
      "Twilio",
    ],
  },
  {
    id: "business",
    label: "Business & Data Analytics",
    ordinal: "06",
    description:
      "Currently studying and building toward this side of the field.",
    technologies: [
      "Business Intelligence",
      "Data Analytics",
      "Information Systems",
      "Databases",
      "Statistics & ML concepts",
      "Systems & Business Analysis",
    ],
  },
];

const EXPERIENCE = {
  role: "Software Engineering Intern",
  org: "Imansoft Technologies",
  place: "Lagos, Nigeria",
  period: "August 2025 – September 2025",
  points: [
    "Worked in an Agile team: stand-ups, sprint planning and team workflows.",
    "Contributed to web and mobile application work.",
    "Worked in existing codebases on frontend features, debugging and state management.",
  ],
};

const ADRS = [
  {
    id: "adr-01",
    ordinal: "ADR-01",
    decision: "Why Next.js App Router",
    context:
      "This portfolio needed server-rendered pages, database access and a chat API in one codebase.",
    reasoning:
      "The App Router lets pages fetch their data on the server and keeps server logic next to the UI. Project and article pages render without client-side loading states.",
    tradeoffs:
      "Caching behaviour takes care to reason about, and the framework is still changing quickly.",
  },
  {
    id: "adr-02",
    ordinal: "ADR-02",
    decision: "Why Neon & pgvector",
    context:
      "The portfolio assistant retrieves from project write-ups, so it needs vector search alongside ordinary relational data.",
    reasoning:
      "Neon is serverless PostgreSQL with pgvector support, so one database holds projects, articles and embeddings. Branching makes it easy to test schema changes without touching the live data.",
    tradeoffs:
      "File storage is handled separately (Vercel Blob), so there are two services to manage instead of one.",
  },
  {
    id: "adr-03",
    ordinal: "ADR-03",
    decision: "Why tRPC over REST",
    context:
      "The frontend and the Prisma-backed API are both TypeScript, and both are maintained by one person.",
    reasoning:
      "tRPC with Zod validation shares types across the client/server boundary, so a schema change shows up as a compile error instead of a runtime failure.",
    tradeoffs:
      "It couples the client to the TypeScript backend. A public REST API for third parties would need extra work.",
  },
  {
    id: "adr-04",
    ordinal: "ADR-04",
    decision: "Why Gemini embeddings with the Vercel AI SDK",
    context:
      "The assistant needed embeddings and a chat model without a paid subscription for a personal project.",
    reasoning:
      "The Gemini embedding API has a free tier, and the Vercel AI SDK provides tool calling and streaming behind one interface. The vector column was sized to 768 dimensions to match.",
    tradeoffs:
      "Moving from the common 1536-dimension setup meant writing a custom PostgreSQL migration to resize the vectors.",
  },
];

const PHILOSOPHY_TENETS = [
  {
    id: "ph-01",
    ordinal: "01",
    title: "Read before changing",
    body: "Working in an existing codebase at Imansoft taught me to understand how a system already behaves before touching it.",
  },
  {
    id: "ph-02",
    ordinal: "02",
    title: "Validate at the boundaries",
    body: "Inputs are checked where they enter the system: Zod schemas, DRF serializers, typed API contracts.",
  },
  {
    id: "ph-03",
    ordinal: "03",
    title: "Test the paths that matter",
    body: "MediConnect and the AI Support Agent both include Pytest suites covering key flows, with mocked and real-API test modes.",
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function TheWorkshop() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .ws-font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .ws-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }

        /* Entrance */
        @keyframes ws-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .ws-rise { opacity: 0; animation: ws-rise 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
        .ws-d1 { animation-delay: 0.05s; }
        .ws-d2 { animation-delay: 0.15s; }
        .ws-d3 { animation-delay: 0.25s; }
        .ws-d4 { animation-delay: 0.35s; }
        .ws-d5 { animation-delay: 0.45s; }
        .ws-d6 { animation-delay: 0.55s; }

        /* Divider expand */
        @keyframes ws-expand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .ws-divider {
          transform-origin: left;
          animation: ws-expand 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }

        /* Stack layer card hover */
        .ws-layer-card {
          border-left: 2px solid transparent;
          transition: background-color 0.2s ease, border-left-color 0.2s ease;
        }
        .ws-layer-card:hover {
          background-color: rgba(255,255,255,0.02);
          border-left-color: rgba(52,211,153,0.45);
        }

        /* ADR accordion trigger */
        .ws-adr-trigger {
          transition: color 0.2s ease;
        }
        .ws-adr-trigger:hover,
        .ws-adr-trigger[data-state="open"] {
          color: rgba(52,211,153,0.9);
        }
        .ws-adr-trigger[data-state="open"] .ws-adr-ordinal {
          color: rgba(52,211,153,0.6);
        }

        /* Accordion open indicator line */
        .ws-adr-item[data-state="open"] {
          border-left-color: rgba(52,211,153,0.35) !important;
        }

        /* Philosophy card hover */
        .ws-phil-card {
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .ws-phil-card:hover {
          border-color: rgba(52,211,153,0.2);
          background-color: rgba(255,255,255,0.018);
        }

        /* Badge hover */
        .ws-tech-badge {
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .ws-tech-badge:hover {
          border-color: rgba(52,211,153,0.35);
          color: rgba(52,211,153,0.85);
        }
      `}</style>

      {/* ── Root ──────────────────────────────────────────────────────── */}
      <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">
        {/* Ambient bloom — top-right, mirrors hero's top-left bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 35% at 85% 5%, rgba(52,211,153,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-14 lg:px-20">
          {/* ── Chapter eyebrow ──────────────────────────────────────── */}
          <div className="ws-rise ws-d1 mb-14 flex items-center gap-3">
            <span className="ws-font-mono text-xs tracking-widest text-neutral-600 uppercase">
              Chapter 02
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-neutral-800" />
            <span className="ws-font-mono text-xs tracking-widest text-emerald-500 uppercase">
              The Workshop
            </span>
          </div>

          {/* ── Section heading ───────────────────────────────────────── */}
          <header className="ws-rise ws-d2 mb-20 max-w-2xl">
            <h2 className="ws-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl">
              What I work with, and{" "}
              <em className="text-emerald-400 not-italic">how I work</em>.
            </h2>
            <p className="ws-font-mono mt-5 text-sm leading-loose font-light text-neutral-400">
              Technical capabilities across web, mobile, backend and applied AI,
              plus my internship experience and the decisions behind this
              portfolio.
            </p>
          </header>

          {/* ══════════════════════════════════════════════════════════
              CAPABILITIES
          ══════════════════════════════════════════════════════════ */}
          <section aria-labelledby="capabilities-heading">
            {/* Hairline */}
            <div
              aria-hidden="true"
              className="ws-divider mb-12 h-px w-full bg-neutral-800"
            />

            <h2
              id="capabilities-heading"
              className="ws-font-mono ws-rise ws-d3 mb-10 text-xs tracking-widest text-neutral-600 uppercase"
            >
              Capabilities
            </h2>

            {/* Layer grid — 1 col mobile, 3 col desktop */}
            <div className="grid grid-cols-1 gap-px bg-neutral-800 md:grid-cols-2 lg:grid-cols-3">
              {STACK_LAYERS.map((layer) => (
                <article
                  key={layer.id}
                  aria-label={`Capability area: ${layer.label}`}
                >
                  <Card className="ws-layer-card h-full rounded-none border border-transparent bg-neutral-950 shadow-none">
                    <CardContent className="p-7">
                      {/* Ordinal */}
                      <span className="ws-font-mono mb-6 block text-xs text-neutral-700">
                        {layer.ordinal}
                      </span>

                      {/* Layer name — GEO: extractable heading */}
                      <h3 className="ws-font-display mb-2 text-xl leading-snug text-neutral-100">
                        {layer.label}
                      </h3>

                      {/* Layer description */}
                      <p className="ws-font-mono mb-7 text-xs leading-relaxed font-light text-neutral-500">
                        {layer.description}
                      </p>

                      {/* Tech badges */}
                      <div
                        className="flex flex-wrap gap-2"
                        aria-label={`Technologies: ${layer.technologies.join(", ")}`}
                      >
                        {layer.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="ws-tech-badge ws-font-mono cursor-default rounded-none border-neutral-800 px-2.5 py-1 text-xs font-light text-neutral-500"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              EXPERIENCE
          ══════════════════════════════════════════════════════════ */}
          <section aria-labelledby="experience-heading" className="mt-24">
            <div
              aria-hidden="true"
              className="ws-divider mb-12 h-px w-full bg-neutral-800"
            />
            <h2
              id="experience-heading"
              className="ws-font-mono mb-10 text-xs tracking-widest text-neutral-600 uppercase"
            >
              Experience
            </h2>
            <article className="border border-l-2 border-neutral-800 border-l-emerald-900 bg-neutral-950 p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="ws-font-display text-xl text-neutral-100">
                  {EXPERIENCE.role} · {EXPERIENCE.org}
                </h3>
                <p className="ws-font-mono text-xs text-neutral-600">
                  {EXPERIENCE.place} · {EXPERIENCE.period}
                </p>
              </div>
              <ul className="ws-font-mono mt-5 flex flex-col gap-2 text-sm leading-relaxed font-light text-neutral-400">
                {EXPERIENCE.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="text-neutral-700">
                      —
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          {/* ══════════════════════════════════════════════════════════
              DECISIONS
          ══════════════════════════════════════════════════════════ */}
          <section aria-labelledby="adr-heading" className="mt-24">
            {/* Hairline */}
            <div
              aria-hidden="true"
              className="ws-divider mb-12 h-px w-full bg-neutral-800"
            />

            {/* Section header row */}
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="adr-heading"
                className="ws-font-mono text-xs tracking-widest text-neutral-600 uppercase"
              >
                Decisions Behind This Portfolio
              </h2>
              <p className="ws-font-mono text-xs text-neutral-700">
                Short records of why this site is built the way it is.
              </p>
            </div>

            {/*
             * <dl> wraps the ADR list for GEO: each accordion item is a
             * named decision with a structured rationale AI agents can extract.
             */}
            <Accordion className="flex flex-col gap-px">
              {ADRS.map((adr) => (
                <AccordionItem
                  key={adr.id}
                  value={adr.id}
                  className="ws-adr-item border border-l-2 border-neutral-800 border-l-neutral-800 bg-neutral-950 px-0 transition-all duration-200"
                >
                  <AccordionTrigger className="ws-adr-trigger ws-font-mono group flex w-full items-center gap-5 px-7 py-5 text-left text-sm text-neutral-300 no-underline hover:no-underline [&>svg]:text-neutral-700 [&>svg]:transition-colors [&[data-state=open]>svg]:text-emerald-600">
                    <span className="ws-adr-ordinal ws-font-mono shrink-0 text-xs text-neutral-700 transition-colors">
                      {adr.ordinal}
                    </span>
                    <span className="ws-font-display text-lg leading-snug text-neutral-100 group-hover:text-neutral-50">
                      {adr.decision}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-7 pt-0 pb-7">
                    {/* Indent to align with title text */}
                    <div className="ml-14 flex flex-col gap-6 border-l border-neutral-800 pl-6">
                      {/* Context */}
                      <div>
                        <p className="ws-font-mono mb-2 text-xs tracking-widest text-neutral-600 uppercase">
                          Context
                        </p>
                        <p className="ws-font-mono text-sm leading-relaxed font-light text-neutral-400">
                          {adr.context}
                        </p>
                      </div>

                      {/* Reasoning */}
                      <div>
                        <p className="ws-font-mono mb-2 text-xs tracking-widest text-neutral-600 uppercase">
                          Reasoning
                        </p>
                        <p className="ws-font-mono text-sm leading-relaxed font-light text-neutral-400">
                          {adr.reasoning}
                        </p>
                      </div>

                      {/* Tradeoffs */}
                      <div>
                        <p className="ws-font-mono mb-2 text-xs tracking-widest text-emerald-800 uppercase">
                          Tradeoffs
                        </p>
                        <p className="ws-font-mono text-sm leading-relaxed font-light text-neutral-500">
                          {adr.tradeoffs}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* ══════════════════════════════════════════════════════════
              ENGINEERING APPROACH
          ══════════════════════════════════════════════════════════ */}
          <section aria-labelledby="philosophy-heading" className="mt-24">
            {/* Hairline */}
            <div
              aria-hidden="true"
              className="ws-divider mb-12 h-px w-full bg-neutral-800"
            />

            {/* Section header */}
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="philosophy-heading"
                className="ws-font-mono text-xs tracking-widest text-neutral-600 uppercase"
              >
                Engineering Approach
              </h2>
              <p className="ws-font-mono text-xs text-neutral-700">
                How I try to work.
              </p>
            </div>

            {/* Philosophy tenets — 1 col mobile, 3 col desktop */}
            <div className="grid grid-cols-1 gap-px bg-neutral-800 md:grid-cols-3">
              {PHILOSOPHY_TENETS.map((tenet) => (
                <article
                  key={tenet.id}
                  aria-label={`Engineering standard: ${tenet.title}`}
                >
                  <Card className="ws-phil-card h-full rounded-none border border-transparent bg-neutral-950 shadow-none">
                    <CardContent className="p-7">
                      {/* Ordinal */}
                      <span className="ws-font-mono mb-8 block text-xs text-neutral-700">
                        {tenet.ordinal}
                      </span>

                      {/* Tenet title — GEO: specific, searchable */}
                      <h3 className="ws-font-display mb-4 text-xl leading-snug text-neutral-100">
                        {tenet.title}
                      </h3>

                      {/* Tenet body */}
                      <p className="ws-font-mono text-xs leading-relaxed font-light text-neutral-500">
                        {tenet.body}
                      </p>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
