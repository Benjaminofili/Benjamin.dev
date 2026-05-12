import { type Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "~/components/blocks/ProjectCard";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "The Lab | Project Anthology",
  description: "A showcase of engineering artifacts, featuring edge computing, RAG pipelines, and performant user interfaces.",
};

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

export default async function TheLabPage() {
  const projects = await api.project.getAll();

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 pb-24">
      {/* ── Custom font imports ─────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .id-font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .id-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }
      `}</style>

      {/* ── Back navigation ──────────────────────────────────────────── */}
      <nav className="mx-auto max-w-7xl px-6 pt-10 md:px-14 lg:px-20">
        <Link
          href="/"
          className="id-font-mono inline-flex items-center gap-2 text-xs text-neutral-600 transition-colors duration-200 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
          aria-label="Back to Home"
        >
          <span aria-hidden="true">←</span>
          Home
        </Link>
      </nav>
      
      <section aria-labelledby="lab-heading" className="mx-auto max-w-7xl px-6 pt-12 md:px-14 lg:px-20">
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
          <h1 id="lab-heading" className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl">
            Shipped Architecture
          </h1>
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
              thumbnailUrl={project.thumbnailUrl}
              featured={project.featured}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
