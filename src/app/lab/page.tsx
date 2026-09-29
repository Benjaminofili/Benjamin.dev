import { type Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "~/components/blocks/ProjectCard";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "Selected projects across web, mobile, backend and applied AI, plus earlier and in-progress work.",
};

type LabProject = Awaited<ReturnType<typeof api.project.getAll>>[number];

function ProjectGrid({ projects }: { projects: LabProject[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-px bg-neutral-800 lg:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          slug={project.slug}
          index={index + 1}
          title={project.title}
          tagline={project.tagline}
          role={project.role}
          timeframe={project.timeframe}
          techStack={project.techStack}
          highlight={project.impactMetric}
          caseStudyHref={`/lab/${project.slug}`}
          thumbnailUrl={project.thumbnailUrl}
          featured={project.featured}
        />
      ))}
      {projects.length % 2 !== 0 && (
        <div className="hidden bg-neutral-950 lg:block" aria-hidden="true" />
      )}
    </div>
  );
}

export default async function TheLabPage() {
  const projects = await api.project.getAll();
  const selected = projects.filter((p) => p.featured);
  const earlier = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 text-neutral-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .id-font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .id-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }
      `}</style>

      <nav className="mx-auto max-w-7xl px-6 pt-10 md:px-14 lg:px-20">
        <Link
          href="/"
          className="id-font-mono inline-flex items-center gap-2 text-xs text-neutral-600 transition-colors duration-200 hover:text-emerald-400 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:outline-none"
          aria-label="Back to Home"
        >
          <span aria-hidden="true">←</span>
          Home
        </Link>
      </nav>

      <section
        aria-labelledby="lab-heading"
        className="mx-auto max-w-7xl px-6 pt-12 md:px-14 lg:px-20"
      >
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
          <h1
            id="lab-heading"
            className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl"
          >
            Selected Projects
          </h1>
          <p className="id-font-mono mt-4 max-w-2xl text-sm leading-relaxed font-light text-neutral-400">
            Web, mobile, backend and applied AI projects, each with the
            technologies used and what I built.
          </p>
        </header>

        <ProjectGrid projects={selected} />
      </section>

      {earlier.length > 0 && (
        <section
          aria-labelledby="earlier-heading"
          className="mx-auto max-w-7xl px-6 pt-24 md:px-14 lg:px-20"
        >
          <h2
            id="earlier-heading"
            className="id-font-display text-4xl leading-tight text-neutral-50"
          >
            Earlier &amp; in-progress work
          </h2>
          <p className="id-font-mono mt-4 max-w-2xl text-sm leading-relaxed font-light text-neutral-400">
            Learning projects and work still in development. Kept here for
            completeness rather than as headline evidence.
          </p>
          <ProjectGrid projects={earlier} />
        </section>
      )}
    </div>
  );
}
