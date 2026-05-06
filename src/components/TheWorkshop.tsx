"use client";

/**
 * TheWorkshop — Chapter II
 * Anthology Developer Portfolio · 2026
 *
 * Stack:   Next.js 15 App Router · React 19 · Tailwind CSS · Shadcn UI
 * Theme:   Quiet Minimalism · Dark-mode native
 * Method:  Zoom-In (broad toolkit → justified decisions → philosophy)
 * GEO:     <section> landmarks, declarative <h2>/<h3>, short sentences
 *
 * Design tokens — identical to IdentityHero & ProjectCard:
 *   Surface   bg-neutral-950
 *   Border    neutral-800  → emerald-900 hover
 *   Accent    emerald-500 / emerald-400
 *   Display   Instrument Serif
 *   Meta      DM Mono
 *   Edges     rounded-none (sharp)
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
    id: "frontend",
    label: "Frontend & Edge",
    ordinal: "01",
    description: "UI surfaces and globally-distributed compute.",
    technologies: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "Shadcn UI",
      "TypeScript",
      "Vercel Edge",
      "Zod",
      "tRPC",
    ],
  },
  {
    id: "agentic",
    label: "Agentic AI",
    ordinal: "02",
    description: "Retrieval, reasoning, and autonomous action layers.",
    technologies: [
      "Vercel AI SDK",
      "LangChain",
      "Google Gemini API",
      "pgvector (768 dimensions)",
      "Neon Serverless Postgres",
      "Tool Calling",
      "RAG Pipelines",
    ],
  },
  {
    id: "backend",
    label: "Backend & Infrastructure",
    ordinal: "03",
    description: "Data persistence, auth, and delivery pipelines.",
    technologies: [
      "Neon",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "GitHub Actions",
      "Docker",
      "Terraform",
      "Axiom",
    ],
  },
];

const ADRS = [
  {
    id: "adr-01",
    ordinal: "ADR-01",
    decision: "Why Next.js App Router",
    context:
      "Needed a unified fullstack primitive that colocates server logic with UI. Pages Router added cognitive overhead at the boundary.",
    reasoning:
      "App Router's React Server Components eliminate client-side data-fetching waterfalls entirely. Layouts enable persistent UI without re-renders. Parallel routes support complex dashboard patterns without state hacks. The model aligns with how I think about data flow: server-first, streamed, type-safe.",
    tradeoffs:
      "Caching semantics are complex. The mental model requires discipline. Tooling ecosystem is still maturing. This is the correct tradeoff for long-lived systems.",
  },
  {
    id: "adr-02",
    ordinal: "ADR-02",
    decision: "Why Neon & pgvector",
    context:
      "The portfolio required a high-performance vector search engine with a serverless architecture to support ephemeral development environments and instant branching.",
    reasoning:
      "Neon provides a dedicated PostgreSQL database with native pgvector support. Unlike monolithic alternatives, Neon's branching capabilities allow for isolated schema and data testing without provisioning new instances. This serverless model perfectly aligns with the high-velocity deployment strategy while maintaining full PostgreSQL compatibility.",
    tradeoffs:
      "While monolithic Backend-as-a-Service solutions offer integrated file storage and auth, Neon's focus on database excellence allows us to choose best-in-class separate services like Vercel Blob and Clerk, resulting in a more modular and robust architecture.",
  },
  {
    id: "adr-03",
    ordinal: "ADR-03",
    decision: "Why tRPC over REST",
    context:
      "The system required a reliable method to connect the Next.js client to the Prisma database layer without fragile data fetching or manual type declarations.",
    reasoning:
      "tRPC enforces strict end-to-end type safety, which is a core mandate of the T3 Stack architecture. By enforcing Zod schema validation directly at the API boundaries, tRPC guarantees that any database schema changes immediately trigger TypeScript errors on the frontend. This prevents runtime crashes and ensures a strictly type-safe data flow.",
    tradeoffs:
      "This approach tightly couples the frontend and backend to the TypeScript ecosystem. It is highly optimized for a monorepo structure, but it would require significant refactoring if we needed to expose a public REST API for external third-party developers.",
  },
  {
    id: "adr-04",
    ordinal: "ADR-04",
    decision: "Why Vercel AI SDK for Agentic Systems",
    context:
      "The Retrieval-Augmented Generation (RAG) pipeline needed a reliable, cost-effective way to orchestrate multi-step reasoning and generate embeddings.",
    reasoning:
      "To drastically reduce personal infrastructure costs while maintaining agentic capabilities, the database was migrated to accept 768-dimensional vectors, allowing the use of Google Gemini's generous free-tier embedding API. The Vercel AI SDK acts as the overarching orchestration layer, standardizing tool-calling and multi-model routing regardless of the underlying LLM being used.",
    tradeoffs:
      "Migrating away from the industry-standard OpenAI models required writing custom PostgreSQL migration scripts to manually resize the vector embeddings from 1536 to 768 dimensions.",
  },
];

const PHILOSOPHY_TENETS = [
  {
    id: "ph-01",
    ordinal: "01",
    title: "Strict Type-Safe Data Flow",
    body: "TypeScript strict mode on every project. Zod validates at runtime boundaries. tRPC enforces contracts across the client/server split. Types are documentation that cannot become outdated.",
  },
  {
    id: "ph-02",
    ordinal: "02",
    title: "Automated Linting as Architecture",
    body: "ESLint, Prettier, and import-order rules are committed on day one. Lint errors block CI. Code style is not a preference — it is a constraint that enables scale.",
  },
  {
    id: "ph-03",
    ordinal: "03",
    title: "CI/CD as a First-Class Primitive",
    body: "Every pull request runs type-check, lint, tests, and preview deployments in parallel. Merging to main is always deployable. Manual deployment steps are architectural failures.",
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
      <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">

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
              Every tool chosen{" "}
              <em className="not-italic text-emerald-400">deliberately</em>.
            </h2>
            <p className="ws-font-mono mt-5 text-sm font-light leading-loose text-neutral-400">
              This is not a technology list. It is an audit of architectural decisions.
              Each layer exists because it solves a specific failure mode.
            </p>
          </header>

          {/* ══════════════════════════════════════════════════════════
              AREA 01 — STACK AUDIT
          ══════════════════════════════════════════════════════════ */}
          <section aria-labelledby="stack-audit-heading">

            {/* Hairline */}
            <div aria-hidden="true" className="ws-divider mb-12 h-px w-full bg-neutral-800" />

            <h2
              id="stack-audit-heading"
              className="ws-font-mono ws-rise ws-d3 mb-10 text-xs tracking-widest text-neutral-600 uppercase"
            >
              Stack Audit
            </h2>

            {/* Layer grid — 1 col mobile, 3 col desktop */}
            <div className="grid grid-cols-1 gap-px bg-neutral-800 md:grid-cols-3">
              {STACK_LAYERS.map((layer) => (
                <article
                  key={layer.id}
                  aria-label={`Technology layer: ${layer.label}`}
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
                      <p className="ws-font-mono mb-7 text-xs font-light leading-relaxed text-neutral-500">
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
              AREA 02 — ARCHITECTURE DECISION RECORDS
          ══════════════════════════════════════════════════════════ */}
          <section
            aria-labelledby="adr-heading"
            className="mt-24"
          >
            {/* Hairline */}
            <div aria-hidden="true" className="ws-divider mb-12 h-px w-full bg-neutral-800" />

            {/* Section header row */}
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="adr-heading"
                className="ws-font-mono text-xs tracking-widest text-neutral-600 uppercase"
              >
                Architecture Decision Records
              </h2>
              <p className="ws-font-mono text-xs text-neutral-700">
                The &quot;why&quot; behind every major choice.
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
                  className="ws-adr-item border border-neutral-800 border-l-2 border-l-neutral-800 bg-neutral-950 px-0 transition-all duration-200"
                >
                  <AccordionTrigger
                    className="ws-adr-trigger ws-font-mono group flex w-full items-center gap-5 px-7 py-5 text-left text-sm text-neutral-300 no-underline hover:no-underline [&>svg]:text-neutral-700 [&>svg]:transition-colors [&[data-state=open]>svg]:text-emerald-600"
                  >
                    <span className="ws-adr-ordinal ws-font-mono shrink-0 text-xs text-neutral-700 transition-colors">
                      {adr.ordinal}
                    </span>
                    <span className="ws-font-display text-lg leading-snug text-neutral-100 group-hover:text-neutral-50">
                      {adr.decision}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-7 pb-7 pt-0">
                    {/* Indent to align with title text */}
                    <div className="ml-14 flex flex-col gap-6 border-l border-neutral-800 pl-6">

                      {/* Context */}
                      <div>
                        <p className="ws-font-mono mb-2 text-xs tracking-widest text-neutral-600 uppercase">
                          Context
                        </p>
                        <p className="ws-font-mono text-sm font-light leading-relaxed text-neutral-400">
                          {adr.context}
                        </p>
                      </div>

                      {/* Reasoning */}
                      <div>
                        <p className="ws-font-mono mb-2 text-xs tracking-widest text-neutral-600 uppercase">
                          Reasoning
                        </p>
                        <p className="ws-font-mono text-sm font-light leading-relaxed text-neutral-400">
                          {adr.reasoning}
                        </p>
                      </div>

                      {/* Tradeoffs */}
                      <div>
                        <p className="ws-font-mono mb-2 text-xs tracking-widest text-emerald-800 uppercase">
                          Accepted Tradeoffs
                        </p>
                        <p className="ws-font-mono text-sm font-light leading-relaxed text-neutral-500">
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
              AREA 03 — TOOLING PHILOSOPHY
          ══════════════════════════════════════════════════════════ */}
          <section
            aria-labelledby="philosophy-heading"
            className="mt-24"
          >
            {/* Hairline */}
            <div aria-hidden="true" className="ws-divider mb-12 h-px w-full bg-neutral-800" />

            {/* Section header */}
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="philosophy-heading"
                className="ws-font-mono text-xs tracking-widest text-neutral-600 uppercase"
              >
                Tooling Philosophy
              </h2>
              <p className="ws-font-mono text-xs text-neutral-700">
                Standards I hold on every project, from day one.
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
                      <p className="ws-font-mono text-xs font-light leading-relaxed text-neutral-500">
                        {tenet.body}
                      </p>

                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            {/* Footer micro-detail — mirrors IdentityHero's footer line */}
            <p className="ws-font-mono mt-10 text-xs text-neutral-700">
              These standards are defaults, not aspirations. They are on in every repository.
            </p>

          </section>

        </div>
      </div>
    </>
  );
}
