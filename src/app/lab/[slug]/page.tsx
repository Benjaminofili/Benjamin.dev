import { notFound } from "next/navigation";
import Link from "next/link";
import { type Metadata } from "next";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

/* ─── Static params for pre-rendering ─────────────────────────────────────── */

export const revalidate = 86400; // Cache for 24 hours

export async function generateStaticParams() {
  // Use db directly — generateStaticParams has no request context,
  // so we cannot call api.*  (which internally calls headers()).
  const projects = await db.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

/* ─── Dynamic metadata ─────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await api.project.getBySlug({ slug });
    return {
      title: `${project.title} — Case Study | Anthology`,
      description: project.tagline,
    };
  } catch {
    return { title: "Not Found | Anthology" };
  }
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project;
  try {
    project = await api.project.getBySlug({ slug });
  } catch {
    notFound();
  }

  const roleLabel =
    project.role === "SOLO_DEVELOPER"
      ? "Solo Developer"
      : project.role === "LEAD_ENGINEER"
        ? "Lead Engineer"
        : (project.role ?? "Engineer");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .cs-font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .cs-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }

        @keyframes cs-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-rise { opacity: 0; animation: cs-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .cs-d1 { animation-delay: 0.05s; }
        .cs-d2 { animation-delay: 0.15s; }
        .cs-d3 { animation-delay: 0.25s; }
        .cs-d4 { animation-delay: 0.35s; }

        /* Prose markdown body */
        .cs-prose h2 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.5rem;
          line-height: 1.4;
          color: #f5f5f5;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }
        .cs-prose strong {
          color: #e5e5e5;
          font-weight: 500;
        }
        .cs-prose p {
          font-family: 'DM Mono', monospace;
          font-size: 0.8125rem;
          font-weight: 300;
          line-height: 1.9;
          color: #737373;
          margin-bottom: 1rem;
        }
        .cs-prose ol {
          list-style: decimal;
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cs-prose li {
          font-family: 'DM Mono', monospace;
          font-size: 0.8125rem;
          font-weight: 300;
          line-height: 1.9;
          color: #737373;
        }

        /* Hairline */
        @keyframes cs-expand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .cs-divider {
          transform-origin: left;
          animation: cs-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }
      `}</style>

      <div className="min-h-screen bg-neutral-950 text-neutral-100">

        {/* Background bloom — mirrors hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 35% at 80% 5%, rgba(52,211,153,0.05) 0%, transparent 70%)",
          }}
        />

        {/* ── Back navigation ──────────────────────────────────────────── */}
        <nav className="relative z-10 mx-auto max-w-7xl px-6 pt-10 md:px-14 lg:px-20">
          <Link
            href="/#lab"
            className="cs-font-mono inline-flex items-center gap-2 text-xs text-neutral-600 transition-colors duration-200 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
            aria-label="Back to The Lab"
          >
            <span aria-hidden="true">←</span>
            The Lab
          </Link>
        </nav>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-14 lg:px-20">

          {/* Chapter eyebrow */}
          <div className="cs-rise cs-d1 mb-10 flex items-center gap-3">
            <span className="cs-font-mono text-xs tracking-widest text-neutral-600 uppercase">
              Case Study
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-neutral-800" />
            <span className="cs-font-mono text-xs tracking-widest text-emerald-500 uppercase">
              The Lab
            </span>
          </div>

          {/* Title */}
          <h1 className="cs-font-display cs-rise cs-d2 max-w-3xl text-5xl leading-tight text-neutral-50 sm:text-6xl">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="cs-font-mono cs-rise cs-d3 mt-5 max-w-2xl text-sm font-light leading-relaxed text-neutral-400">
            {project.tagline}
          </p>

          {/* Metadata strip */}
          <div className="cs-rise cs-d4 mt-10 flex flex-wrap gap-8 border-t border-neutral-800 pt-8">
            {[
              { label: "Role", value: roleLabel },
              { label: "Timeframe", value: project.timeframe ?? "2025" },
              ...(project.liveUrl
                ? [{ label: "Live", value: project.liveUrl, href: project.liveUrl }]
                : []),
              ...(project.repositoryUrl
                ? [{ label: "Repo", value: "GitHub →", href: project.repositoryUrl }]
                : []),
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="cs-font-mono text-[10px] tracking-widest text-neutral-600 uppercase">
                  {item.label}
                </span>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-font-mono text-xs text-emerald-400 transition-colors hover:text-emerald-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="cs-font-mono text-xs text-neutral-300">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <main className="relative z-10 mx-auto max-w-7xl px-6 pb-32 md:px-14 lg:px-20">

          {/* Animated hairline */}
          <div aria-hidden="true" className="cs-divider mb-16 h-px w-full bg-neutral-800" />

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

            {/* ── Left: Case study prose ───────────────────────────── */}
            <article className="lg:col-span-8">
              <h2 className="cs-font-mono mb-8 text-xs tracking-widest text-neutral-600 uppercase">
                Project Breakdown
              </h2>

              {/* Render the markdown-like caseStudyContent as prose */}
              <div
                className="cs-prose"
                dangerouslySetInnerHTML={{
                  __html: project.caseStudyContent
                    ? renderSimpleMarkdown(project.caseStudyContent)
                    : "<p>No case study content available yet.</p>",
                }}
              />

              {/* Impact + Scale callout */}
              {(project.impactMetric ?? project.scaleMetric) && (
                <div className="mt-12 grid grid-cols-1 gap-px bg-neutral-800 sm:grid-cols-2">
                  {project.impactMetric && (
                    <div className="bg-neutral-950 p-6">
                      <p className="cs-font-mono mb-2 text-[10px] tracking-widest text-neutral-600 uppercase">
                        Impact
                      </p>
                      <p className="cs-font-mono text-xs font-light leading-relaxed text-neutral-400">
                        {project.impactMetric}
                      </p>
                    </div>
                  )}
                  {project.scaleMetric && (
                    <div className="bg-neutral-950 p-6">
                      <p className="cs-font-mono mb-2 text-[10px] tracking-widest text-neutral-600 uppercase">
                        Scale
                      </p>
                      <p className="cs-font-mono text-xs font-light leading-relaxed text-neutral-400">
                        {project.scaleMetric}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </article>

            {/* ── Right: Tech stack sidebar ────────────────────────── */}
            <aside
              aria-label="Technologies used"
              className="lg:col-span-4"
            >
              <h2 className="cs-font-mono mb-6 text-[10px] tracking-widest text-neutral-600 uppercase">
                Tech Stack
              </h2>
              <ul className="flex flex-col gap-2">
                {project.techStack.map((tech, i) => (
                  <li
                    key={tech}
                    className="cs-font-mono flex items-center gap-3 border-l border-neutral-800 py-1 pl-4 text-xs text-neutral-400 transition-colors duration-200 hover:border-emerald-800 hover:text-neutral-300"
                    style={{ animationDelay: `${0.35 + i * 0.06}s` }}
                  >
                    <span aria-hidden="true" className="text-neutral-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {tech}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}

/* ─── Lightweight markdown → HTML renderer ───────────────────────────────── */
/**
 * Converts the simple markdown format stored in caseStudyContent to HTML.
 * Supports: ## headings, **bold**, ordered lists, paragraphs.
 * Does NOT use a full MD library to keep the bundle lean.
 */
function renderSimpleMarkdown(md: string): string {
  return md
    .split("\n")
    .map((line) => {
      // ## Heading
      if (line.startsWith("## ")) {
        return `<h2>${escapeHtml(line.slice(3))}</h2>`;
      }
      // Numbered list items (e.g. "1) **Title** ...")
      const listMatch = /^\d+\)\s/.exec(line);
      if (listMatch) {
        const content = line.slice(listMatch[0].length);
        return `<li>${inlineFormat(content)}</li>`;
      }
      // Blank line
      if (line.trim() === "") return "";
      // Normal paragraph
      return `<p>${inlineFormat(line)}</p>`;
    })
    .join("\n")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ol>${match}</ol>`);
}

function inlineFormat(text: string): string {
  return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
