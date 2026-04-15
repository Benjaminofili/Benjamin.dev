import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// ============================================================================
// ZOD VALIDATION SCHEMAS
// ============================================================================

export const getArticleBySlugSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(150, "Slug must be 150 characters or less")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
}).strict();

export const getArticlesSchema = z.object({
  limit: z.number().int().min(1).max(100).optional(),
}).strict();

// ============================================================================
// TRPC ROUTER
// ============================================================================

export const articleRouter = createTRPCRouter({
  /**
   * Fetch a single article by its unique slug
   */
  getBySlug: publicProcedure
    .input(getArticleBySlugSchema)
    .query(async ({ ctx, input }) => {
      const article = await ctx.db.article.findUnique({
        where: { slug: input.slug },
      });

      if (!article) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Article with slug "${input.slug}" was not found.`,
        });
      }

      return article;
    }),

  /**
   * Fetch a list of articles, optionally filtered by category
   * Ordered by published date descending.
   */
  getAll: publicProcedure
    .input(getArticlesSchema.optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.article.findMany({
        orderBy: {
          publishedAt: "desc", // Newest first
        },
        take: input?.limit,
      });
    }),
});
