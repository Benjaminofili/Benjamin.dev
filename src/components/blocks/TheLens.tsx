import { PrismaClient } from "@prisma/client";
import { ArticleCard, type ArticleCategory } from "~/components/ArticleCard";

const prisma = new PrismaClient();

function mapPrismaCategoryToArticleCategory(prismaCategory: string): ArticleCategory {
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
        <h2 id="lens-heading" className="id-font-display text-5xl leading-tight text-neutral-50 sm:text-6xl">
          Engineering Notes
        </h2>
        <p className="id-font-mono mt-4 text-sm font-light leading-relaxed text-neutral-400">
          Long-form critiques and technical deep-dives into the systems I build. Selective, opinionated, and strictly technical.
        </p>
      </header>

      {/* Stacked, single-column list (not a grid) to emphasize high-end editorial readability */}
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
        {articles.length === 0 && (
          <div className="bg-neutral-950 p-8">
            <p className="id-font-mono text-neutral-500 font-light italic">No articles published yet.</p>
          </div>
        )}
      </div>

      <footer className="mt-16 flex justify-center">
         <p className="id-font-mono text-xs text-neutral-700">
           End of Volume I. New chapters published periodically.
         </p>
      </footer>
    </section>
  );
}
