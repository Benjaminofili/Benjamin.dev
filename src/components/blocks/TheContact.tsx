import { PROFILE } from "~/lib/profile";

const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Phone (Mauritius)", value: PROFILE.phone, href: PROFILE.phoneHref },
  {
    label: "LinkedIn",
    value: "awelechukwu-ofili",
    href: PROFILE.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "Benjaminofili",
    href: PROFILE.github,
    external: true,
  },
];

export default function TheContact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-7xl px-6 pb-32 md:px-14 lg:px-20"
    >
      <header className="mb-14">
        <div className="mb-14 flex items-center gap-3">
          <span className="id-font-mono text-xs tracking-widest text-neutral-600 uppercase">
            Chapter 06
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-neutral-800" />
          <span className="id-font-mono text-xs tracking-widest text-emerald-500 uppercase">
            Contact
          </span>
        </div>
        <h2
          id="contact-heading"
          className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl"
        >
          Let&apos;s talk.
        </h2>
        <p className="id-font-mono mt-4 max-w-2xl text-sm leading-relaxed font-light text-neutral-400">
          Based in {PROFILE.location}. {PROFILE.availability}.
        </p>

        <a
          href={PROFILE.cvPath}
          download
          className="id-font-mono mt-8 inline-flex items-center gap-3 border border-neutral-700 px-6 py-3 text-xs tracking-widest text-neutral-300 uppercase transition-all duration-300 hover:border-emerald-500 hover:text-emerald-400 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:outline-none"
        >
          Download CV
          <span aria-hidden="true">↓</span>
        </a>
      </header>

      <dl className="grid grid-cols-1 gap-px bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((item) => (
          <div key={item.label} className="bg-surface p-7">
            <dt className="id-font-mono mb-3 text-[10px] tracking-widest text-neutral-600 uppercase">
              {item.label}
            </dt>
            <dd>
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="id-font-mono text-xs break-all text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                {item.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <p className="id-font-mono mt-16 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} {PROFILE.name}
      </p>
    </section>
  );
}
