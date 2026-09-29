/**
 * Base URL for canonical links, Open Graph images and the sitemap.
 *
 * Derived from the deployment rather than hardcoded, so nothing has to be
 * updated when a custom domain is attached. Set NEXT_PUBLIC_SITE_URL once a
 * production domain exists to pin it explicitly.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}
