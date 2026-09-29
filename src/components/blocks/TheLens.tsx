import { PrismaClient } from "@prisma/client";
import { ArticleCard, type ArticleCategory } from "~/components/ArticleCard";

const prisma = new PrismaClient();

function mapPrismaCategoryToArticleCategory(
  prismaCategory: string,
): ArticleCategory {
  switch (prismaCategory) {
    case "TECHNICAL":
      return "Technical";
    case "CRITIQUE":
      return "Critique";
    case "DEBUGGING":
      return "Debugging";
    default:
      return "Essay";
  }
}

const LENSES = [
  {
    title: "Software: build what can be maintained",
    body: "I read the existing code first, keep interfaces validated and typed, and test the flows that matter, as in the Pytest suites on MediConnect and the AI Support Agent.",
  },
  {
    title: "Data: start from the question",
    body: "Before tools, I want to know what decision the data should inform. My degree in business computing and data analytics is where I am building this side.",
  },
  {
    title: "Business: connect systems to how work happens",
    body: "Good software fits the process around it. I am interested in systems analysis, information systems and automation that make that fit better.",
  },
];

export default async function TheLens() {
  // Fetch articles from the database on the server
  const articles = await prisma.article.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <section
      id="lens"
      aria-labelledby="lens-heading"
      className="mx-auto w-full max-w-7xl px-6 py-32 md:px-14 lg:px-20"
    >
      <header className="mb-14">
        <div className="mb-14 flex items-center gap-3">
          <span className="id-font-mono text-xs tracking-widest text-neutral-600 uppercase">
            Chapter 04
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-neutral-800" />
          <span className="id-font-mono text-xs tracking-widest text-emerald-500 uppercase">
            The Lens
          </span>
        </div>
        <h2
          id="lens-heading"
          className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl"
        >
          How I look at problems
        </h2>
        <p className="id-font-mono mt-4 max-w-2xl text-sm leading-relaxed font-light text-neutral-400">
          Software, data and business questions overlap. This is how I approach
          them.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-neutral-800 md:grid-cols-3">
        {LENSES.map((lens) => (
          <article key={lens.title} className="bg-neutral-950 p-7">
            <h3 className="id-font-display mb-4 text-xl leading-snug text-neutral-100">
              {lens.title}
            </h3>
            <p className="id-font-mono text-xs leading-relaxed font-light text-neutral-500">
              {lens.body}
            </p>
          </article>
        ))}
      </div>

      {articles.length > 0 && (
        <div className="mt-14 flex flex-col gap-px bg-neutral-800">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              index={index + 1}
              title={article.title}
              excerpt={article.excerpt}
              category={mapPrismaCategoryToArticleCategory(article.category)}
              publishedAt={article.publishedAt.toISOString()}
              readTime={article.readTimeMinutes}
              viewCount={article.viewCount}
              href={`/lens/${article.slug}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
