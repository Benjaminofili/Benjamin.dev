"use client";

/**
 * ArticleCard — Chapter IV: The Lens
 * Anthology Developer Portfolio · 2026
 *
 * Stack:   Next.js 15 App Router · React 19 · Tailwind CSS · Shadcn UI
 * Theme:   Quiet Minimalism · Dark-mode native · Editorial index aesthetic
 * Method:  Zoom-In (category → title → excerpt → metadata → action)
 * GEO:     <article> landmark, semantic <h3>, structured publication metadata
 *
 * Design tokens — identical to IdentityHero, ProjectCard, TheWorkshop:
 *   Surface   bg-neutral-950
 *   Border    neutral-800 → emerald-900 hover
 *   Accent    emerald-500 / emerald-400
 *   Display   Instrument Serif
 *   Meta      DM Mono
 *   Edges     rounded-none (sharp)
 */

import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

/* ─── Types ──────────────────────────────────────────────────────────────── */

export type ArticleCategory =
  | "Technical"
  | "Critique"
  | "Debugging"
  | "Architecture"
  | "Essay";

export interface ArticleCardProps {
  index?: number;       // Ordinal for visual numbering (1-based).
  title: string;       // Article headline. Used in <h3>.
  excerpt: string;     // One–two sentence summary (≤30 words).
  category: ArticleCategory;    // Classification badge.
  publishedAt: string; // ISO 8601 date string. e.g. "2025-03-14"
  readTime: number;    // Estimated read time in minutes.
  viewCount: number;   // Lifetime page view count.
  href: string;        // Route to the full article page.
  featured?: boolean;  // Applies a subtle accent treatment.
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** Format ISO date to "Mar 2025" */
function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

/** Format raw number to locale string. 1204 → "1,204" */
function formatViews(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

/* ─── Category accent map ────────────────────────────────────────────────── */

const CATEGORY_STYLES: Record<ArticleCategory, { border: string; text: string }> = {
  Technical:    { border: "border-sky-900",     text: "text-sky-500"     },
  Critique:     { border: "border-violet-900",  text: "text-violet-400"  },
  Debugging:    { border: "border-amber-900",   text: "text-amber-500"   },
  Architecture: { border: "border-emerald-900", text: "text-emerald-400" },
  Essay:        { border: "border-neutral-700", text: "text-neutral-400" },
};

const DEFAULT_CATEGORY_STYLE = { border: "border-neutral-700", text: "text-neutral-400" };

/* ─── Component ──────────────────────────────────────────────────────────── */

export function ArticleCard({
  index = 1,
  title,
  excerpt,
  category,
  publishedAt,
  readTime,
  viewCount,
  href,
  featured = false,
}: ArticleCardProps) {
  const ordinal = String(index).padStart(2, "0");
  const categoryStyle = CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
  const formattedDate = formatDate(publishedAt);
  const formattedViews = formatViews(viewCount);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .ac-font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .ac-font-mono    { font-family: 'DM Mono', 'Courier New', monospace; }

        .ac-card {
          border-left: 2px solid transparent;
          transition:
            border-left-color 0.2s ease,
            background-color  0.2s ease;
        }
        .ac-card:hover {
          border-left-color: rgba(52, 211, 153, 0.45);
          background-color:  rgba(255, 255, 255, 0.018);
        }

        .ac-cta {
          transition: color 0.18s ease;
        }
        .ac-cta:hover { color: rgba(52, 211, 153, 0.85); }
        .ac-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.55);
        }

        .ac-arrow {
          display: inline-block;
          transition: transform 0.18s ease;
        }
        .ac-cta:hover .ac-arrow { transform: translateX(4px); }

        @keyframes ac-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
        .ac-pulse-dot { animation: ac-pulse 2.4s ease-in-out infinite; }

        .ac-sep::before {
          content: '·';
          margin: 0 0.4rem;
          color: rgba(255,255,255,0.15);
        }

        .ac-card:hover .ac-title {
          text-decoration-color: rgba(52, 211, 153, 0.25);
        }
        .ac-title {
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 4px;
          transition: text-decoration-color 0.2s ease;
        }
      `}</style>

      <article aria-label={`Article: ${title}`}>
        <Card className="ac-card rounded-none border border-neutral-800 border-l-2 bg-neutral-950 shadow-none">
          <CardContent className="p-7 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="ac-font-mono text-xs text-neutral-700">
                  {ordinal}
                </span>
                <Badge
                  variant="outline"
                  className={`ac-font-mono rounded-none px-2.5 py-1 text-xs font-light ${categoryStyle.border} ${categoryStyle.text}`}
                >
                  {category}
                </Badge>
              </div>

              {featured && (
                <span
                  aria-label="Featured article"
                  className="ac-font-mono inline-flex shrink-0 items-center gap-1.5 border border-neutral-800 px-2 py-1 text-xs text-neutral-600"
                >
                  <span
                    aria-hidden="true"
                    className="ac-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                  Featured
                </span>
              )}
            </div>

            <div className="mb-5">
              <h3 className="ac-font-display mb-3 leading-snug text-neutral-50">
                <Link
                  href={href}
                  className="ac-title text-2xl sm:text-3xl hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-0"
                  aria-label={`Read article: ${title}`}
                >
                  {title}
                </Link>
              </h3>
              <p className="ac-font-mono text-sm font-light leading-relaxed text-neutral-500">
                {excerpt}
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <dl
                className="ac-font-mono flex flex-wrap items-center text-xs text-neutral-600"
                aria-label="Article metadata"
              >
                <div className="flex items-center">
                  <dt className="sr-only">Published</dt>
                  <dd>
                    <time dateTime={publishedAt} aria-label={`Published ${formattedDate}`}>
                      {formattedDate}
                    </time>
                  </dd>
                </div>

                <div className="ac-sep flex items-center">
                  <dt className="sr-only">Read time</dt>
                  <dd aria-label={`${readTime} minute read`}>
                    {readTime} min read
                  </dd>
                </div>

                <div className="ac-sep flex items-center">
                  <dt className="sr-only">View count</dt>
                  <dd aria-label={`${formattedViews} views`}>
                    {formattedViews} views
                  </dd>
                </div>
              </dl>

              <Link
                href={href}
                aria-label={`Read the full article: ${title}`}
                className="ac-cta ac-font-mono shrink-0 text-xs text-neutral-500 focus-visible:outline-none"
              >
                Read Article{" "}
                <span aria-hidden="true" className="ac-arrow">→</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </article>
    </>
  );
}

export default ArticleCard;
