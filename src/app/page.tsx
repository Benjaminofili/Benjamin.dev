import { type Metadata } from "next";

import { api, HydrateClient } from "~/trpc/server";
import { HeroSection } from "~/components/blocks/HeroSection";
import { ProjectCard } from "~/components/blocks/ProjectCard";
import TheWorkshop from "~/components/TheWorkshop";

import TheLens from "~/components/blocks/TheLens";

// Helper function to extract small metric labels from seeded sentences
function parseMetrics(impact: string | null, scale: string | null) {
  const metrics = [];
  
  if (impact) {
    if (impact.includes("100/100")) metrics.push({ value: "100/100", label: "Lighthouse" });
    else if (impact.includes("40%")) metrics.push({ value: "40%", label: "Engagement" });
    else if (impact.includes("Eliminated")) metrics.push({ value: "0ms", label: "Delay" });
    else metrics.push({ value: "Max", label: "Impact" });
  }

  if (scale) {
    if (scale.includes("4K")) metrics.push({ value: "4K", label: "Resolution" });
    else if (scale.includes("10+")) metrics.push({ value: "10+", label: "Components" });
    else metrics.push({ value: "100%", label: "Consistency" });
  }

  return metrics;
}

export const metadata: Metadata = {
  title: "Identity | Senior Full-Stack Engineer & AI Integration Specialist",
  description:
    "I build edge-first, AI-integrated systems with Next.js and TypeScript. RAG pipelines with pgvector. WCAG 2.2 AA accessibility. Production-grade architectures.",
  openGraph: {
    title: "Identity | Senior Full-Stack Engineer",
    description:
      "I build edge-first, AI-integrated systems with Next.js and TypeScript. RAG pipelines with pgvector.",
    type: "profile",
  },
  keywords: [
    "Next.js",
    "TypeScript",
    "RAG Pipeline",
    "pgvector",
    "Agentic AI",
    "Edge Computing",
    "WCAG Accessibility",
    "Full-Stack Developer",
  ],
};

export default async function Home() {
  const projects = await api.project.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
        {/* Structured Data for AI Agents */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Benjamin Ofili",
              jobTitle: "Senior Full-Stack Engineer",
              description:
                "I build edge-first, AI-integrated systems with Next.js and TypeScript.",
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Retrieval-Augmented Generation",
                "pgvector",
                "Edge Computing",
                "WCAG 2.2 Accessibility",
                "Agentic AI Systems",
              ],
              alumniOf: {
                "@type": "Organization",
                name: "Your University",
              },
              url: "https://yourportfolio.com",
              sameAs: [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername",
              ],
            }),
          }}
        />
        <HeroSection />

        {/* ── Chapter 02: The Workshop ───────────────────────────────────── */}
        <section id="workshop">
          <TheWorkshop />
        </section>

        {/* ── Chapter 03: The Lab ────────────────────────────────────────── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
          .id-font-display { font-family: 'Instrument Serif', Georgia, serif; }
          .id-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }
        `}</style>
        <section id="lab" aria-labelledby="lab-heading" className="mx-auto w-full max-w-7xl px-6 pb-32 md:px-14 lg:px-20">
          <header className="mb-14">
            <div className="mb-14 flex items-center gap-3">
              <span className="id-font-mono text-xs tracking-widest text-neutral-600 uppercase">
                Chapter 03
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-neutral-800" />
              <span className="id-font-mono text-xs tracking-widest text-emerald-500 uppercase">
                The Lab
              </span>
            </div>
            <h2 id="lab-heading" className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl">
              Shipped Architecture
            </h2>
            <p className="id-font-mono mt-4 max-w-2xl text-sm font-light leading-relaxed text-neutral-400">
              A selection of production-grade systems built with Next.js, Edge compute, and AI integrations. Monitored for performance and strictly typed.
            </p>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-px bg-neutral-800 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                index={index + 1}
                title={project.title}
                tagline={project.tagline}
                role={project.role}
                timeframe={project.timeframe}
                techStack={project.techStack}
                metrics={parseMetrics(project.impactMetric, project.scaleMetric)}
                caseStudyHref={`/lab/${project.slug}`}
                featured={project.featured}
              />
            ))}
            {/* Filler to hide container background on odd-count grids */}
            {projects.length % 2 !== 0 && (
              <div className="hidden bg-neutral-950 lg:block" aria-hidden="true" />
            )}
          </div>
        </section>

        {/* ── Chapter 04: The Lens ────────────────────────────────────────── */}
        <TheLens />
      </main>
    </HydrateClient>
  );
}
