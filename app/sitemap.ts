import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { industries } from "@/data/industries";
import { site } from "@/data/site";

// Derived from data/*.ts so a new post appears automatically. /case-studies is
// intentionally absent: it redirects to /blog (see next.config.ts) and a
// redirect must never be listed.
//
// lastModified is a REAL per-page date, not the build time. Google only honours
// <lastmod> when it is consistently accurate, so update the date below whenever
// a page's content meaningfully changes. Anything without an entry falls back to
// SITE_UPDATED. Blog posts use their own publishedAt.
const SITE_UPDATED = "2026-09-20";

// path (after the domain, "" = home) -> ISO date of last meaningful content change.
const routeDates: Record<string, string> = {
  "": "2026-09-20",
  "/offer": "2026-09-20",
  "/story": "2026-09-20",
  "/contact": "2026-09-20",
  "/careers": "2026-09-20",
  "/careers/interns": "2026-09-20",
  "/partner": "2026-09-19",
  "/blog": "2026-09-19",
  "/guides": "2026-09-19",
  "/glossary": "2026-09-19",
  "/faq": "2026-09-19",
  "/trust": "2026-09-19",
  "/principles": "2026-09-19",
  "/privacy": "2026-09-12",
  "/terms": "2026-09-12",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const priorities: Record<string, number> = {
    "": 1, "/offer": 0.9, "/industries": 0.9, "/blog": 0.8, "/story": 0.7,
    "/contact": 0.7, "/guides": 0.7, "/partner": 0.6, "/glossary": 0.6,
    "/faq": 0.6, "/trust": 0.6, "/careers/interns": 0.5, "/principles": 0.4,
    "/careers": 0.4, "/privacy": 0.3, "/terms": 0.3,
  };

  const staticRoutes: MetadataRoute.Sitemap = Object.keys(priorities).map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: new Date(routeDates[path] ?? SITE_UPDATED),
    priority: priorities[path],
  }));

  // One page per industry: high-value long-tail intent ("AI for banking").
  const industryRoutes: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${site.domain}/industries/${ind.slug}`,
    lastModified: new Date(SITE_UPDATED),
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${site.domain}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.7,
  }));

  return [...staticRoutes, ...industryRoutes, ...postRoutes];
}
