import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// ============================================================================
// ZOD VALIDATION SCHEMAS
// ============================================================================

export const getProjectBySlugSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(100, "Slug must be 100 characters or less")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
}).strict();

export const getProjectsSchema = z.object({
  featured: z.boolean().optional(),
}).strict();

// ============================================================================
// TRPC ROUTER
// ============================================================================

export const projectRouter = createTRPCRouter({
  /**
   * Fetch a single project by its unique slug
   */
  getBySlug: publicProcedure
    .input(getProjectBySlugSchema)
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { slug: input.slug },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Project with slug "${input.slug}" was not found.`,
        });
      }

      return project;
    }),

  /**
   * Fetch a list of projects, optionally filtered by featured status
   * Ordered by the displayOrder field ascending.
   */
  getAll: publicProcedure
    .input(getProjectsSchema.optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.project.findMany({
        where: input?.featured === undefined ? undefined : { featured: input.featured },
        orderBy: {
          displayOrder: "asc", // ASC to keep specific ordering control
        },
      });
    }),
});
