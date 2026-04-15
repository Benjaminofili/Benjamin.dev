'use client';

import Link from 'next/link';

export function IdentityHero() {
  return (
    <header className="bg-black text-white">
      {/* Main hero container with generous padding and grid structure */}
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        {/* Content grid: mobile single column, desktop asymmetrical layout */}
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Left section: headline and supporting text */}
          <div className="space-y-8 lg:col-span-2">
            {/* Semantic headline with "Quiet Minimalism" aesthetic */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Senior Full-Stack Engineer building high-performance, AI-integrated systems.
            </h1>

            {/* Supporting description with functional typography */}
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Crafting elegant solutions at the intersection of frontend, backend, and artificial intelligence. Focused on performance, scalability, and user experience.
            </p>
          </div>

          {/* Right section: CTA buttons and badge (mobile: flows below, desktop: right column) */}
          <div className="flex flex-col gap-6 lg:items-end lg:justify-start">
            {/* Primary CTA button */}
            <Link
              href="#lab"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-black transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black active:bg-gray-200 sm:px-8 lg:w-full"
              aria-label="View The Lab - My projects and case studies"
            >
              View The Lab
            </Link>

            {/* Secondary badge/link for Agentic AI */}
            <Link
              href="#agentic-ai"
              className="inline-flex items-center gap-2 rounded-full border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 hover:border-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Learn about Agentic AI approach"
            >
              <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true"></span>
              Agentic AI
            </Link>
          </div>
        </div>

        {/* Divider: subtle minimal line */}
        <div className="border-t border-gray-800 pt-12 sm:pt-16 lg:pt-20">
          {/* Grid of key attributes (responsive: 2 cols on mobile, 3 cols on desktop) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Expertise
              </div>
              <p className="text-sm text-gray-300">React, TypeScript, Next.js</p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Focus
              </div>
              <p className="text-sm text-gray-300">AI Integration, Performance</p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Approach
              </div>
              <p className="text-sm text-gray-300">Thoughtful Design Systems</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
