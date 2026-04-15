import { ArticleCategory, PrismaClient, ProjectRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Anthology portfolio content...");

  const seededProjects = await Promise.all([
    prisma.project.upsert({
      where: { slug: "benjamin-dev-portfolio" },
      update: {},
      create: {
        title: "Benjamin.dev Portfolio",
        slug: "benjamin-dev-portfolio",
        tagline:
          "Engineered a high-performance, narrative-first portfolio with interactive motion systems and measurable UX gains.",
        fullDescription:
          "Built and deployed a production portfolio as an engineering artifact, not a static resume. The project focused on balancing storytelling, performance, and conversion: every interaction had to reinforce technical depth while preserving Lighthouse-level quality and smooth cross-device behavior.",
        caseStudyContent: `## Rule of Five Breakdown
1) **Performance Architecture**  
Reached a perfect 100/100 Lighthouse score by combining route-level code splitting, efficient asset loading, and optimized image/font strategy.

2) **Interaction System Design**  
Built a context-aware dynamic-island navigation bar with smooth active-section transitions using Framer Motion and section-observer logic.

3) **Visual Data Storytelling**  
Implemented an interactive constellation graph that communicates engineering competencies through motion-driven SVG rendering and theme-aware styling.

4) **Component Reusability at Scale**  
Designed a reusable bento-grid card system with composable props, consistent animation choreography, and predictable layout contracts.

5) **Responsive Reliability**  
Delivered seamless behavior from 320px mobile viewports to 4K desktop displays using fluid typography ("clamp") and Tailwind utility composition.`,
        role: ProjectRole.SOLO_DEVELOPER,
        techStack: [
          "Next.js App Router",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "shadcn/ui",
          "Radix UI",
          "next-themes",
          "Vercel Analytics",
        ],
        liveUrl: "https://benjamin.dev",
        repositoryUrl: "https://github.com/benjamin/portfolio",
        thumbnailUrl: "/projects/benjamin-dev-portfolio.webp",
        completedDate: new Date("2025-10-12"),
        timeframe: "6 weeks",
        impactMetric:
          "Achieved 100/100 Lighthouse performance, accessibility, and SEO in production",
        scaleMetric:
          "Sustained smooth interactions across 320px to 4K viewports with zero layout regressions",
        featured: true,
        displayOrder: 1,
      },
    }),
    prisma.project.upsert({
      where: { slug: "shorely-beach-escape-platform" },
      update: {},
      create: {
        title: "Shorely (Beach Escape Platform)",
        slug: "shorely-beach-escape-platform",
        tagline:
          "Architected a data-rich travel discovery frontend with secure Supabase edge integrations and high-velocity UX.",
        fullDescription:
          "Shorely unifies auth, personalization, and real-time beach discovery into a single user flow. The frontend architecture centered on low-latency filtering, maintainable data hooks, and robust protected routing for user-specific content like favorites and private trip planning.",
        caseStudyContent: `## Rule of Five Breakdown
1) **Service Integration Strategy**  
Unified Supabase Auth, database access, and OpenWeatherMap through Supabase Edge Functions to isolate secrets and standardize API boundaries.

2) **Data Layer Modularity**  
Introduced custom hooks (useAuth, useFavorites, useBeachData) with TanStack Query for caching, background revalidation, and reduced component coupling.

3) **Filtering Performance**  
Enabled sub-second multi-tag search by combining Supabase overlaps operators with client-managed active filter state.

4) **Security and Route Control**  
Implemented ProtectedRoute patterns that block unauthorized access to account-level views while preserving session continuity.

5) **Design System Coherence**  
Established a reusable, theme-aware component language with shadcn/ui and Tailwind tokens across 30+ custom UI components.`,
        role: ProjectRole.LEAD_ENGINEER,
        techStack: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "shadcn/ui",
          "Supabase Auth",
          "Supabase Edge Functions",
          "TanStack Query",
          "OpenWeatherMap API",
        ],
        liveUrl: "https://shorely.app",
        repositoryUrl: "https://github.com/benjamin/shorely",
        thumbnailUrl: "/projects/shorely.webp",
        completedDate: new Date("2025-07-04"),
        timeframe: "8 weeks",
        impactMetric:
          "Improved user engagement by 40% through personalization and faster discovery workflows",
        scaleMetric:
          "Reduced boilerplate across 10+ feature components while maintaining sub-second filter responses",
        featured: true,
        displayOrder: 2,
      },
    }),
    prisma.project.upsert({
      where: { slug: "bistro-bliss-frontend-system" },
      update: {},
      create: {
        title: "Bistro Bliss Frontend System",
        slug: "bistro-bliss-frontend-system",
        tagline:
          "Delivered a conversion-focused restaurant UI system with mobile-first navigation and strong visual stability.",
        fullDescription:
          "Developed Bistro Bliss as a performant and conversion-aware customer interface for menu browsing, bookings, and mobile interactions. The implementation prioritized frictionless navigation and rapid content exploration without sacrificing accessibility or long-term maintainability.",
        caseStudyContent: `## Rule of Five Breakdown
1) **Mobile Navigation Engineering**  
Implemented a responsive drawer menu using Radix primitives with active link highlighting and no layout shift during transitions.

2) **Instant Menu Exploration**  
Built real-time category filtering using lightweight client state to eliminate server round-trips for common browse actions.

3) **Performance and Stability**  
Raised visual stability by enforcing image sizing discipline and strategic lazy-loading with Next.js image optimization.

4) **Booking Experience Design**  
Composed layered visual hierarchy (map background + gradient overlays + focused form surface) to improve readability and intent completion.

5) **Reusable UI Foundation**  
Standardized implementation patterns with shadcn/ui + Tailwind to accelerate future feature delivery and keep styling consistent.`,
        role: ProjectRole.SOLO_DEVELOPER,
        techStack: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "shadcn/ui",
          "Radix UI",
          "Lucide Icons",
          "React",
        ],
        liveUrl: "https://bistrobliss.dev",
        repositoryUrl: "https://github.com/benjamin/bistro-bliss",
        thumbnailUrl: "/projects/bistro-bliss.webp",
        completedDate: new Date("2025-03-22"),
        timeframe: "5 weeks",
        impactMetric:
          "Eliminated perceptible delay during menu category switching for key customer journeys",
        scaleMetric:
          "Maintained consistent behavior across all major mobile and desktop breakpoints",
        featured: false,
        displayOrder: 3,
      },
    }),
  ]);

  const seededArticles = await Promise.all([
    prisma.article.upsert({
      where: { slug: "hardest-bug-react-18-race-condition-postmortem" },
      update: {},
      create: {
        title: "Hardest Bug: React 18 Race Condition Postmortem",
        slug: "hardest-bug-react-18-race-condition-postmortem",
        excerpt:
          "A production debugging narrative on stale promise orchestration, suspense waterfalls, and how typed query boundaries eliminated nondeterministic UI failures.",
        body: `## Incident Overview
During a frontend migration to concurrent rendering, we observed non-deterministic dashboard tear-downs under rapid route transitions. The failure signature looked random, but it was reproducible under synthetic navigation bursts.

## Hypothesis and Reproduction
We instrumented transition boundaries and identified overlapping suspense states. A stale in-memory cache key was being evicted while a sibling transition still referenced the pending promise, causing hydration mismatch and local state reset.

## Root Cause
The architecture mixed ad-hoc promise caching with Suspense semantics. That violated ownership boundaries: cache lifetime and render lifetime were managed by different abstractions.

## Remediation
We migrated to TanStack Query for authoritative cache ownership, normalized query keys, and added cancellation-safe invalidation. We also wrapped route transitions with deterministic loading boundaries and error segmentation.

## Outcome
The issue dropped from intermittent production incidents to zero regressions over the next release cycle, with faster diagnostics thanks to explicit query and transition telemetry.`,
        category: ArticleCategory.DEBUGGING,
        tags: ["React 18", "Suspense", "TanStack Query", "Postmortem", "Debugging"],
        coverImageUrl: "/articles/react-18-race-condition.webp",
        readTimeMinutes: 9,
        viewCount: 1842,
        publishedAt: new Date("2025-11-08T09:00:00.000Z"),
      },
    }),
    prisma.article.upsert({
      where: { slug: "ui-ux-critique-accessible-modal-systems" },
      update: {},
      create: {
        title: "UI/UX Critique: Accessible Modal Systems That Actually Hold Up",
        slug: "ui-ux-critique-accessible-modal-systems",
        excerpt:
          "A technical critique of modal implementations that pass visual QA but fail keyboard, focus, and assistive technology behavior in production.",
        body: `## Why This Critique Exists
Most modal implementations look polished but collapse under accessibility scrutiny. Teams often optimize for visual parity and ignore behavioral contracts required for keyboard and assistive technology users.

## Common Failure Modes
Frequent regressions include focus escaping to background content, missing dialog announcements, broken return-focus logic, and disabled scroll controls that trap touch users.

## Engineering Standards for Reliable Modals
Use a strict modal contract: initial focus target, tab loop containment, escape semantics, inert background behavior, and focus restoration on close. Treat each as testable acceptance criteria.

## Recommended Implementation Strategy
Prefer battle-tested primitives (Radix Dialog or native dialog with strong polyfill strategy). Add integration tests for keyboard traversal and screen-reader snapshots as part of CI, not manual QA.

## Resulting UX Impact
Teams that adopt this modal contract reduce accessibility regressions, improve form completion rates in overlays, and avoid costly post-release hotfixes tied to interaction traps.`,
        category: ArticleCategory.CRITIQUE,
        tags: ["Accessibility", "WCAG", "UI/UX", "Radix UI", "Frontend Architecture"],
        coverImageUrl: "/articles/accessibility-modal-critique.webp",
        readTimeMinutes: 7,
        viewCount: 1297,
        publishedAt: new Date("2025-11-21T09:00:00.000Z"),
      },
    }),
  ]);

  console.log("Seed complete.");
  console.log("Projects:", seededProjects.map((project) => project.slug).join(", "));
  console.log("Articles:", seededArticles.map((article) => article.slug).join(", "));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
