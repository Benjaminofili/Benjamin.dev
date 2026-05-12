"use client";

/**
 * ProjectCard — Chapter II: The Lab
 * Anthology Developer Portfolio · 2026
 *
 * GEO:    <article> landmark, declarative <h3>, short metric labels
 * Theme:  Quiet Minimalism · Dark-mode native (no CSS variables)
 * Method: Rule of Five — ordinal → title → tagline → metrics → stack + CTA
 */

import Link from "next/link";
import Image from "next/image";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type ImpactMetric = {
  value: string;
  label: string;
};

export type ProjectCardProps = {
  index?: number;
  title: string;
  tagline: string;
  role: string | null;
  timeframe: string | null;
  techStack?: string[];
  metrics?: ImpactMetric[];
  caseStudyHref: string;
  thumbnailUrl: string;
  featured?: boolean;
};

/* ─── Component ─────────────────────────────────────────────────────────── */

export function ProjectCard({
  index = 1,
  title,
  tagline,
  role,
  timeframe,
  techStack = [],
  metrics = [],
  caseStudyHref,
  thumbnailUrl,
  featured = false,
}: ProjectCardProps) {
  const ordinal = String(index).padStart(2, "0");
  const roleLabel =
    role === "SOLO_DEVELOPER"
      ? "Solo Developer"
      : role === "LEAD_ENGINEER"
        ? "Lead Engineer"
        : role ?? "Engineer";

  return (
    <article
      aria-label={`Project: ${title}`}
      className="group flex flex-col bg-neutral-950 transition-colors duration-300 hover:bg-neutral-900"
      style={{ borderLeft: "2px solid transparent" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderLeftColor =
          "rgba(52,211,153,0.5)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderLeftColor =
          "transparent")
      }
    >
      {/* ── THUMBNAIL IMAGE ─────────────────────────────────────────── */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-xl bg-neutral-900">
        <Image
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* ── TOP ROW: ordinal + metadata ─────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 px-7 pt-7">
        <span
          className="text-xs text-neutral-700"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {ordinal}
        </span>

        <div className="flex items-center gap-6">
          {/* Role */}
          <div className="flex flex-col items-end gap-0.5">
            <span
              className="text-neutral-600 uppercase"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.1em",
              }}
            >
              Role
            </span>
            <span
              className="text-xs text-neutral-300"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {roleLabel}
            </span>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-neutral-800" aria-hidden="true" />

          {/* Timeframe */}
          <div className="flex flex-col items-end gap-0.5">
            <span
              className="text-neutral-600 uppercase"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.1em",
              }}
            >
              Timeframe
            </span>
            <span
              className="text-xs text-neutral-300"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {timeframe ?? "2025"}
            </span>
          </div>
        </div>
      </div>

      {/* ── TITLE + TAGLINE ─────────────────────────────────────────── */}
      <div className="px-7 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-2xl leading-snug text-neutral-50 sm:text-3xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {title}
          </h3>
          {featured && (
            <span
              aria-label="Featured project"
              className="mt-1 inline-flex shrink-0 items-center gap-1.5 border border-neutral-800 px-2 py-1"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                style={{ animation: "pc-pulse 2.4s ease-in-out infinite" }}
              />
              <span className="text-neutral-500">Featured</span>
            </span>
          )}
        </div>

        <p
          className="mt-3 text-sm font-light leading-relaxed text-neutral-500"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {tagline}
        </p>
      </div>

      {/* ── IMPACT METRICS ──────────────────────────────────────────── */}
      <div className="flex-1 px-7 pt-7">
        <div className="border-t border-neutral-800 pt-6">
          <p
            className="mb-5 uppercase text-neutral-600"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.12em",
            }}
          >
            Impact
          </p>

          <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 border-l border-neutral-800 pl-3"
              >
                <dt
                  className="uppercase text-neutral-600"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                  }}
                >
                  {metric.label}
                </dt>
                <dd
                  className="text-2xl text-emerald-400"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── TECH STACK + CTA ──────────────────────────────────────────── */}
      <div className="px-7 pb-7 pt-7">
        <div className="flex flex-col gap-5 border-t border-neutral-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Tech badges */}
          <div className="flex flex-wrap gap-2" aria-label="Technologies used">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="border border-neutral-700 px-2.5 py-1 text-neutral-400 transition-colors duration-150 group-hover:border-neutral-600 group-hover:text-neutral-300"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.04em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={caseStudyHref}
            aria-label={`Read the full case study for ${title}`}
            className="inline-flex shrink-0 items-center gap-2 border border-neutral-700 px-5 py-2 text-neutral-300 transition-all duration-200 hover:border-emerald-700 hover:text-emerald-400"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px" }}
          >
            Read Case Study
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        @keyframes pc-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </article>
  );
}

export default ProjectCard;
