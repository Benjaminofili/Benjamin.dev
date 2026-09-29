/**
 * ProjectCover — typographic stand-in used when a project has no real screenshot.
 *
 * Deliberately not a mock screenshot: it states the project name and stack in the
 * site's own type, so nothing implies a UI that was not built.
 */

const ACCENT_POSITIONS = [
  "ellipse 70% 60% at 15% 20%",
  "ellipse 65% 55% at 85% 25%",
  "ellipse 75% 60% at 50% 85%",
  "ellipse 60% 70% at 20% 80%",
] as const;

function slugSeed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 9973;
  }
  return hash;
}

function monogram(title: string): string {
  const words = title.split(/[\s-]+/).filter(Boolean);
  if (words.length > 1) {
    return words
      .map((word) => word[0]!.toUpperCase())
      .join("")
      .slice(0, 3);
  }
  // Single word: prefer its internal capitals ("MediConnect" → "MC"),
  // falling back to the first two letters ("Verd" → "VE").
  const word = words[0] ?? title;
  const capitals = word.replace(/[^A-Z]/g, "");
  return (capitals.length > 1 ? capitals : word.slice(0, 2))
    .toUpperCase()
    .slice(0, 3);
}

export type ProjectCoverProps = {
  slug: string;
  title: string;
  techStack?: string[];
  size?: "card" | "hero";
};

export function ProjectCover({
  slug,
  title,
  techStack = [],
  size = "card",
}: ProjectCoverProps) {
  const seed = slugSeed(slug);
  const accent = ACCENT_POSITIONS[seed % ACCENT_POSITIONS.length]!;
  const isHero = size === "hero";
  const chips = techStack.slice(0, isHero ? 5 : 3);
  const pad = isHero ? "p-6 sm:p-10" : "p-6";
  const padX = isHero ? "px-6 sm:px-10" : "px-6";

  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-neutral-950"
    >
      {/* Emerald bloom — mirrors the hero and workshop section blooms */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(${accent}, rgba(52,211,153,0.10) 0%, transparent 70%)`,
        }}
      />

      {/* Hairline grid — the repeating motif used for section dividers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: isHero ? "72px 72px" : "44px 44px",
        }}
      />

      <div className={`relative flex items-start justify-between ${pad}`}>
        <span
          className="text-neutral-700"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: isHero ? "11px" : "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {slug}
        </span>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-emerald-500/50"
        />
      </div>

      {/* Monogram watermark — the card already carries the project name, so this
          gives the plate an identity without repeating it. */}
      <div
        className={`relative flex min-h-0 flex-1 items-center overflow-hidden ${padX}`}
      >
        <span
          className={`leading-none text-neutral-100/[0.07] select-none ${
            isHero
              ? "text-[3.5rem] sm:text-[9rem]"
              : "text-[3.25rem] sm:text-[5.5rem]"
          }`}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            letterSpacing: "-0.02em",
          }}
        >
          {monogram(title)}
        </span>
      </div>

      <div className={`relative flex shrink-0 flex-wrap gap-2 ${pad}`}>
        {chips.map((tech) => (
          <span
            key={tech}
            className="border border-neutral-800 px-2 py-1 text-neutral-600"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: isHero ? "11px" : "9px",
              letterSpacing: "0.04em",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCover;
