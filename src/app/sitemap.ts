import { type MetadataRoute } from "next";
import { db } from "~/server/db";
import { getSiteUrl } from "~/lib/site-url";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const projects = await db.project.findMany({
    select: { slug: true, updatedAt: true },
  });

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/lab`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/workshop`, lastModified: new Date(), priority: 0.8 },
    ...projects.map((project) => ({
      url: `${baseUrl}/lab/${project.slug}`,
      lastModified: project.updatedAt,
      priority: 0.6,
    })),
  ];
}
