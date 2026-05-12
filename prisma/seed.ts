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
        liveUrl: "",
        repositoryUrl: "https://github.com/Benjaminofili/beach-escape-explorer",
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
        liveUrl: "",
        repositoryUrl: "https://github.com/Benjaminofili/BistroBliss-Website",
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
      where: { slug: "why-i-replaced-rest-with-trpc" },
      update: {},
      create: {
        title: "Why I Replaced REST with tRPC Across Every Internal API",
        slug: "why-i-replaced-rest-with-trpc",
        excerpt:
          "Type safety at the client/server boundary is not a preference. It is a structural requirement for teams that move fast without breaking contracts.",
        body: "REST APIs have been the standard for a long time, but they have major drawbacks when it comes to type safety. By migrating to tRPC, we eliminated an entire class of runtime errors and improved our development velocity. The tight coupling between frontend and backend code through shared TypeScript types creates an unbreakable contract that gives teams confidence to ship faster and refactor aggressively without fear of breaking changes.",
        category: ArticleCategory.TECHNICAL,
        tags: ["tRPC", "TypeScript", "REST", "API Architecture"],
        readTimeMinutes: 7,
        viewCount: 3841,
        publishedAt: new Date("2025-03-01T09:00:00.000Z"),
      },
    }),
    prisma.article.upsert({
      where: { slug: "debugging-silent-race-condition-rag-pipeline" },
      update: {},
      create: {
        title: "Debugging a Silent Race Condition in a RAG Retrieval Pipeline",
        slug: "debugging-silent-race-condition-rag-pipeline",
        excerpt:
          "The vector search returned correct results. The reranker scored them correctly. The context window was still wrong. A debugging narrative.",
        body: "Building a reliable Retrieval-Augmented Generation (RAG) pipeline is notoriously difficult. In this deep dive, I recount a particularly nasty race condition where the retrieval phase and the reranking phase became subtly unsynchronized under high load. We'll explore the telemetry we used to track down the issue, the asynchronous operations that caused it, and the architectural changes we implemented to guarantee data consistency in the prompt context.",
        category: ArticleCategory.DEBUGGING,
        tags: ["RAG", "LLMs", "Vector Search", "Debugging", "Concurrency"],
        readTimeMinutes: 11,
        viewCount: 1204,
        publishedAt: new Date("2025-01-15T09:00:00.000Z"),
      },
    }),
    prisma.article.upsert({
      where: { slug: "hidden-cost-of-hydration-critique" },
      update: {},
      create: {
        title: "The Hidden Cost of Hydration: A Critique of Client-First Frameworks",
        slug: "hidden-cost-of-hydration-critique",
        excerpt:
          "Every byte hydrated on the client is a tax. This is an analysis of where that tax is justified and where it is architectural debt.",
        body: "Client-side rendering frameworks revolutionized web development, but the hydration process is not free. In fact, it's often the single largest bottleneck for initial interaction. This critique examines the performance implications of shipping large JavaScript bundles merely to attach event listeners to static markup. We'll explore alternative architectures like React Server Components and partial hydration (islands architecture) that offer a more balanced approach to interactivity.",
        category: ArticleCategory.CRITIQUE,
        tags: ["React", "Performance", "Hydration", "Architecture", "RSC"],
        readTimeMinutes: 9,
        viewCount: 6712,
        publishedAt: new Date("2024-11-10T09:00:00.000Z"),
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
