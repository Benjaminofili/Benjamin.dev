import { type Metadata } from "next";
import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import { HeroSection } from "~/components/blocks/HeroSection";
import { ProjectCard } from "~/components/blocks/ProjectCard";
import TheWorkshop from "~/components/TheWorkshop";
import TheLens from "~/components/blocks/TheLens";
import TheJourney from "~/components/blocks/TheJourney";
import TheContact from "~/components/blocks/TheContact";
import { PROFILE, SITE_DESCRIPTION } from "~/lib/profile";
import { getSiteUrl } from "~/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: `${PROFILE.name} | ${PROFILE.jobTitle} · Full-Stack & Mobile · Business Computing & Data Analytics`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${PROFILE.name} | ${PROFILE.jobTitle}`,
    description: SITE_DESCRIPTION,
    type: "profile",
  },
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Mobile Developer",
    "Flutter",
    "Django",
    "Next.js",
    "Business Intelligence",
    "Data Analytics",
    "Mauritius",
  ],
};

const HOMEPAGE_PROJECT_LIMIT = 4;

export default async function Home() {
  const allProjects = await api.project.getAll();
  const featuredProjects = allProjects.filter((p) => p.featured);
  const projects = featuredProjects.slice(0, HOMEPAGE_PROJECT_LIMIT);
  const hasMore = allProjects.length > projects.length;

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
              name: PROFILE.name,
              url: getSiteUrl(),
              jobTitle: PROFILE.jobTitle,
              description: SITE_DESCRIPTION,
              email: `mailto:${PROFILE.email}`,
              telephone: PROFILE.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Flic en Flac",
                addressCountry: "MU",
              },
              knowsAbout: [
                "Software engineering",
                "Full-stack web development",
                "Mobile development with Flutter",
                "Django",
                "Next.js",
                "PostgreSQL",
                "Retrieval-augmented generation",
                "Business intelligence",
                "Data analytics",
              ],
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "Middlesex University Mauritius",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Aptech Computer Education",
                },
              ],
              sameAs: [PROFILE.github, PROFILE.linkedin],
            }),
          }}
        />
        <HeroSection />

        {/* ── Chapter 02: The Workshop ───────────────────────────────────── */}
        <section id="workshop">
          <TheWorkshop variant="compact" />
        </section>

        {/* ── Chapter 03: The Lab ────────────────────────────────────────── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
          .id-font-display { font-family: 'Instrument Serif', Georgia, serif; }
          .id-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }
        `}</style>
        <section
          id="lab"
          aria-labelledby="lab-heading"
          className="mx-auto w-full max-w-7xl px-6 pb-32 md:px-14 lg:px-20"
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
            <h2
              id="lab-heading"
              className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl"
            >
              Selected Projects
            </h2>
            <p className="id-font-mono mt-4 max-w-2xl text-sm leading-relaxed font-light text-neutral-400">
              Web, mobile, backend and applied AI projects, each with the
              technologies used and what I built.
            </p>
          </header>

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
            {/* Filler to hide container background on odd-count grids */}
            {projects.length % 2 !== 0 && (
              <div
                className="hidden bg-surface lg:block"
                aria-hidden="true"
              />
            )}
          </div>

          {/* ── View More CTA ─────────────────────────────────────────────── */}
          {hasMore && (
            <div className="mt-px flex items-center justify-between border-t border-neutral-800 bg-surface px-8 py-10">
              <p className="id-font-mono text-xs tracking-widest text-neutral-500 uppercase">
                Showing {projects.length} of {allProjects.length} projects
              </p>
              <Link
                href="/lab"
                className="id-font-mono group inline-flex items-center gap-3 border border-neutral-700 px-6 py-3 text-xs tracking-widest text-neutral-300 uppercase transition-all duration-300 hover:border-emerald-500 hover:text-emerald-400"
                aria-label="View all projects in The Lab"
              >
                All Projects
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          )}
        </section>

        {/* ── Chapter 04: The Lens ────────────────────────────────────────── */}
        <TheLens />

        {/* ── Chapter 05: The Journey ─────────────────────────────────────── */}
        <TheJourney />

        {/* ── Chapter 06: Contact ─────────────────────────────────────────── */}
        <TheContact />
      </main>
    </HydrateClient>
  );
}
