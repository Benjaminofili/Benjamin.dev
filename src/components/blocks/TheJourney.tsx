const MILESTONES = [
  {
    when: "Aug – Sep 2025",
    title: "Software Engineering Intern",
    where: "Imansoft Technologies · Lagos, Nigeria",
    detail:
      "Agile team environment. Web and mobile application work, frontend debugging and state management in existing codebases.",
    status: null,
  },
  {
    when: "Completed 12 Feb 2026",
    title: "Advanced Diploma in Software Engineering",
    where: "Aptech Computer Education · Lagos, Nigeria",
    detail:
      "Graduated with Distinction. Semester group project: led the team and served as lead developer on a JavaFX and MySQL Library Management System.",
    status: "Distinction",
  },
  {
    when: "2026 – 2027",
    title: "BSc (Hons) Business Computing and Data Analytics",
    where: "Middlesex University Mauritius",
    detail:
      "Year 3, final year. Focus areas: business intelligence, data analytics, information systems, databases, and data-driven decision making.",
    status: "In progress",
  },
];

export default function TheJourney() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="mx-auto w-full max-w-7xl px-6 pb-32 md:px-14 lg:px-20"
    >
      <header className="mb-14">
        <div className="mb-14 flex items-center gap-3">
          <span className="id-font-mono text-xs tracking-widest text-neutral-600 uppercase">
            Chapter 05
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-neutral-800" />
          <span className="id-font-mono text-xs tracking-widest text-emerald-500 uppercase">
            The Journey
          </span>
        </div>
        <h2
          id="journey-heading"
          className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl"
        >
          Software first, business and data next.
        </h2>
        <p className="id-font-mono mt-4 max-w-2xl text-sm leading-relaxed font-light text-neutral-400">
          A software engineering foundation, followed by a degree that adds
          business intelligence and data analytics. I have not fixed a single
          specialisation yet.
        </p>
      </header>

      <ol className="grid grid-cols-1 gap-px bg-neutral-800 lg:grid-cols-3">
        {MILESTONES.map((m) => (
          <li key={m.title} className="flex flex-col gap-3 bg-neutral-950 p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="id-font-mono text-xs text-neutral-600">
                {m.when}
              </span>
              {m.status && (
                <span className="id-font-mono border border-neutral-800 px-2 py-0.5 text-[10px] text-emerald-600">
                  {m.status}
                </span>
              )}
            </div>
            <h3 className="id-font-display text-xl leading-snug text-neutral-100">
              {m.title}
            </h3>
            <p className="id-font-mono text-xs text-neutral-500">{m.where}</p>
            <p className="id-font-mono text-xs leading-relaxed font-light text-neutral-400">
              {m.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
