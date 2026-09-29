"use client";

/**
 * HeroSection — Chapter 01
 * Identity, location, education and availability.
 */

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { PROFILE } from "~/lib/profile";

/* ─── What I bring ──────────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: "01",
    title: "Software Engineering Foundation",
    description:
      "Advanced Diploma in Software Engineering (Distinction) and a software engineering internship. I build across web, mobile and backend.",
  },
  {
    id: "02",
    title: "Applied AI & Integration",
    description:
      "Retrieval-augmented generation, on-device ML and third-party API integration, built into working products.",
  },
  {
    id: "03",
    title: "Business & Data Direction",
    description:
      "Final-year Business Computing and Data Analytics student, growing into business intelligence, analytics and systems analysis.",
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
      <div className="id-grain relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">
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
              <h1 className="id-font-display id-rise id-d2 text-5xl leading-tight text-neutral-50 sm:text-6xl lg:text-7xl">
                Awelechukwu Benjamin{" "}
                <span className="text-emerald-400">Ofili</span>
              </h1>

              <p className="id-font-mono id-rise id-d3 mt-6 text-sm tracking-wide text-neutral-300">
                {PROFILE.headline}
              </p>
              <p className="id-font-mono id-rise id-d3 mt-2 text-xs tracking-wide text-neutral-500">
                {PROFILE.study}
              </p>

              <p className="id-font-mono id-rise id-d3 mt-7 max-w-md text-sm leading-loose font-light text-neutral-400">
                {PROFILE.statement}
              </p>

              {/* ── Call-to-Action row ──────────────────────────────── */}
              <div className="id-rise id-d4 mt-10 flex flex-wrap items-center gap-4">
                {/* Primary CTA — The Workshop */}
                <Link
                  href="#workshop"
                  aria-label="View The Workshop — skills and experience"
                >
                  <Button
                    size="lg"
                    className="id-cta-primary id-font-mono rounded-none bg-emerald-500 px-8 text-sm font-medium tracking-wide text-neutral-950 transition-all duration-200 hover:bg-emerald-400 focus-visible:outline-none"
                  >
                    View The Workshop
                  </Button>
                </Link>

                {/* Secondary CTA — The Lab */}
                <Link href="#lab" aria-label="View The Lab — selected projects">
                  <Button className="id-font-mono rounded-none border border-neutral-800 bg-transparent px-8 text-sm font-medium tracking-wide text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900/50 hover:text-neutral-100 focus-visible:outline-none">
                    The Lab
                  </Button>
                </Link>

                {/* Secondary CTA — Contact */}
                <Link href="#contact" aria-label="Get in touch">
                  <Button className="id-font-mono rounded-none border border-neutral-800 bg-transparent px-8 text-sm font-medium tracking-wide text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900/50 hover:text-neutral-100 focus-visible:outline-none">
                    Get in touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* ── Right: Status strip (spans 4 cols, offset 1) ───────── */}
            <aside
              aria-label="Location, education and availability"
              className="id-rise id-d5 flex flex-col justify-end gap-5 lg:col-span-4 lg:col-start-9"
            >
              {[
                { label: "Based in", value: PROFILE.location },
                {
                  label: "Studying",
                  value: "BSc (Hons) BCDA · Middlesex University Mauritius",
                },
                {
                  label: "Qualified",
                  value:
                    "Advanced Diploma in Software Engineering (Distinction)",
                },
                { label: "Availability", value: PROFILE.availability },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 border-l border-neutral-800 pl-4"
                >
                  <span className="id-font-mono text-xs tracking-widest text-neutral-600 uppercase">
                    {item.label}
                  </span>
                  <span className="id-font-mono text-xs leading-relaxed text-neutral-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </aside>
          </div>
        </header>

        {/* ── Engineering Principles — SECTION ───────────────────────── */}
        <section
          aria-labelledby="pillars-heading"
          className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-14 lg:px-20"
        >
          {/* Animated hairline */}
          <div
            aria-hidden="true"
            className="id-divider mb-14 h-px w-full bg-neutral-800"
          />

          {/* Section label */}
          <h2
            id="pillars-heading"
            className="id-font-mono id-rise id-d5 mb-10 text-xs tracking-widest text-neutral-600 uppercase"
          >
            What I bring
          </h2>

          {/* Pillars grid — 1 col mobile → 3 col desktop */}
          <div className="grid grid-cols-1 gap-px bg-neutral-800 md:grid-cols-3">
            {PILLARS.map((p, i) => (
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
                  <p className="id-font-mono text-xs leading-relaxed font-light text-neutral-500">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
