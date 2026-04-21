"use client";

/**
 * HeroSection — Chapter 01
 * Anthology Developer Portfolio · 2026
 *
 * Stack:  Next.js 15 App Router · React 19 · Tailwind CSS · Shadcn UI
 * Theme:  Quiet Minimalism · Dark-mode native
 * Method: Zoom-In narrative (broad identity → specific beliefs)
 * GEO:    Semantic HTML, declarative headings, short sentences (≤20 words)
 */

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

/* ─── Engineering Beliefs ───────────────────────────────────────────────── */
const PRINCIPLES = [
  {
    id: "01",
    title: "Type-Safe Data Flow",
    description:
      "Every contract between system layers is enforced at compile time. Runtime surprises are architectural failures, not edge cases.",
  },
  {
    id: "02",
    title: "Edge-First Architecture",
    description:
      "Latency is a product decision. Compute lives where users live — at the network edge, not the data center.",
  },
  {
    id: "03",
    title: "RAG Pipeline Mastery",
    description:
      "Retrieval-Augmented Generation is the foundation of trustworthy AI. Context accuracy determines system credibility.",
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <>
      {/* ── Custom keyframes & font import ─────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        /* Token aliases — consumed throughout this component */
        .id-font-display  { font-family: 'Instrument Serif', Georgia, serif; }
        .id-font-mono     { font-family: 'DM Mono', 'Courier New', monospace; }

        /* Entrance animation */
        @keyframes id-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .id-rise {
          opacity: 0;
          animation: id-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .id-d1 { animation-delay: 0.05s; }
        .id-d2 { animation-delay: 0.18s; }
        .id-d3 { animation-delay: 0.31s; }
        .id-d4 { animation-delay: 0.44s; }
        .id-d5 { animation-delay: 0.57s; }
        .id-d6 { animation-delay: 0.70s; }
        .id-d7 { animation-delay: 0.83s; }

        /* Subtle grain overlay for atmospheric depth */
        .id-grain::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Principle card hover */
        .id-card {
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .id-card:hover {
          background-color: rgba(255, 255, 255, 0.025);
          border-color: rgba(52, 211, 153, 0.25) !important;
        }

        /* Primary CTA glow */
        .id-cta-primary:hover {
          box-shadow: 0 0 28px rgba(52, 211, 153, 0.25);
        }
        .id-cta-primary:focus-visible {
          box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.6);
        }

        /* Hairline divider pulse on load */
        @keyframes id-expand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .id-divider {
          transform-origin: left;
          animation: id-expand 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
        }
      `}</style>

      {/* ── Root shell ─────────────────────────────────────────────────── */}
      <div className="id-grain relative min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden">

        {/* Background accent — low-opacity radial bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 10%, rgba(52,211,153,0.06) 0%, transparent 70%)",
          }}
        />

        {/* ── Chapter 01 · Identity — HEADER ─────────────────────────── */}
        <header className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-20 md:px-14 lg:px-20">

          {/* Chapter eyebrow label */}
          <div className="id-rise id-d1 mb-14 flex items-center gap-3">
            <span className="id-font-mono text-xs tracking-widest text-neutral-600 uppercase">
              Chapter 01
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-neutral-800" />
            <span className="id-font-mono text-xs tracking-widest text-emerald-500 uppercase">
              Identity
            </span>
          </div>

          {/* Two-column layout on large screens */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">

            {/* ── Left: Headline + CTAs (spans 7 cols) ──────────────── */}
            <div className="lg:col-span-7">

              {/* Hero statement — GEO: declarative, ≤20 words per sentence */}
              <h1 className="id-font-display id-rise id-d2 text-5xl leading-tight text-neutral-50 sm:text-6xl lg:text-7xl">
                I build systems where{" "}
                <em className="not-italic text-emerald-400">AI acts</em>,
                edges respond,{" "}
                <span className="text-neutral-400">and latency disappears.</span>
              </h1>

              {/* Sub-statement — role declaration */}
              <p className="id-font-mono id-rise id-d3 mt-7 max-w-md text-sm font-light leading-loose text-neutral-400">
                Senior Engineer — Agentic AI Integration & Edge-First Architecture.
                I design performant, context-aware systems for the AI-native stack.
              </p>

              {/* ── Call-to-Action row ──────────────────────────────── */}
              <div className="id-rise id-d4 mt-10 flex flex-wrap items-center gap-4">

                {/* Primary CTA — The Workshop */}
                <Link href="#workshop" aria-label="View The Workshop — architectural audit">
                  <Button
                    size="lg"
                    className="id-cta-primary id-font-mono rounded-none bg-emerald-500 px-8 text-sm font-medium tracking-wide text-neutral-950 transition-all duration-200 hover:bg-emerald-400 focus-visible:outline-none"
                  >
                    View The Workshop
                  </Button>
                </Link>

                {/* Secondary CTA — The Lab */}
                <Link href="#lab" aria-label="View The Lab — project showcase">
                  <Button
                    className="id-font-mono rounded-none border border-neutral-800 bg-transparent px-8 text-sm font-medium tracking-wide text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900/50 hover:text-neutral-100 focus-visible:outline-none"
                  >
                    The Lab
                  </Button>
                </Link>

                {/* Secondary CTA — The Lens */}
                <Link href="#lens" aria-label="View The Lens — editorial index">
                  <Button
                    className="id-font-mono rounded-none border border-neutral-800 bg-transparent px-8 text-sm font-medium tracking-wide text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900/50 hover:text-neutral-100 focus-visible:outline-none"
                  >
                    The Lens
                  </Button>
                </Link>

                {/* Mobile spacer / divider on small screens could go here, but flex-wrap handles it */}

                {/* Featured project badge */}
                <Link
                  href="/lab/agentic-ai-chatbot"
                  aria-label="Featured Project: Agentic AI Chatbot"
                  className="id-font-mono group inline-flex items-center gap-2 rounded-none border border-neutral-800 px-4 py-2 text-xs text-neutral-500 transition-all duration-200 hover:border-emerald-700 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  Agentic AI Chatbot
                  <Badge
                    variant="outline"
                    className="id-font-mono ml-1 rounded-none border-neutral-700 px-1.5 py-0 text-neutral-600 text-xs group-hover:border-emerald-800 group-hover:text-emerald-600"
                  >
                    Featured
                  </Badge>
                </Link>
              </div>
            </div>

            {/* ── Right: Status strip (spans 4 cols, offset 1) ───────── */}
            <aside
              aria-label="Current focus areas"
              className="id-rise id-d5 flex flex-col justify-end gap-5 lg:col-span-4 lg:col-start-9"
            >
              {[
                { label: "Specialism", value: "Agentic AI Integration" },
                { label: "Architecture", value: "Edge-First Systems" },
                { label: "Stack", value: "Next.js · Vercel AI SDK · tRPC" },
                { label: "Status", value: "Open to opportunities" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 border-l border-neutral-800 pl-4"
                >
                  <span className="id-font-mono text-xs tracking-widest text-neutral-600 uppercase">
                    {item.label}
                  </span>
                  <span className="id-font-mono text-xs text-neutral-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </aside>

          </div>
        </header>

        {/* ── Engineering Principles — SECTION ───────────────────────── */}
        <section
          aria-labelledby="principles-heading"
          className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-14 lg:px-20"
        >
          {/* Animated hairline */}
          <div
            aria-hidden="true"
            className="id-divider mb-14 h-px w-full bg-neutral-800"
          />

          {/* Section label */}
          <h2
            id="principles-heading"
            className="id-font-mono id-rise id-d5 mb-10 text-xs tracking-widest text-neutral-600 uppercase"
          >
            Engineering Principles
          </h2>

          {/* Principles grid — 1 col mobile → 3 col desktop */}
          <div className="grid grid-cols-1 gap-px bg-neutral-800 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Card
                key={p.id}
                className={`id-card id-rise id-d${i + 5} rounded-none border border-transparent bg-neutral-950`}
              >
                <CardContent className="p-8">
                  {/* Ordinal */}
                  <span className="id-font-mono mb-8 block text-xs text-neutral-700">
                    {p.id}
                  </span>

                  {/* Principle name — GEO: specific, searchable heading */}
                  <h3 className="id-font-display mb-4 text-xl leading-snug text-neutral-100">
                    {p.title}
                  </h3>

                  {/* Principle explanation — short declarative sentences */}
                  <p className="id-font-mono text-xs font-light leading-relaxed text-neutral-500">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer micro-detail */}
          <p className="id-font-mono id-rise id-d7 mt-10 text-xs text-neutral-700">
            These principles are non-negotiable. They govern every pull request.
          </p>
        </section>

      </div>
    </>
  );
}
