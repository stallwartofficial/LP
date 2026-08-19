import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { offerings } from "@/data/offerings";
import { site } from "@/data/site";

// Derived entirely from data/*.ts, so adding an offering or a post puts it in
// the sitemap automatically. /case-studies is intentionally absent: it now
// redirects to /blog (see next.config.ts) and a redirect must never be listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.domain}`, lastModified: now, priority: 1 },
    { url: `${site.domain}/offer`, lastModified: now, priority: 0.9 },
    { url: `${site.domain}/story`, lastModified: now, priority: 0.7 },
    { url: `${site.domain}/blog`, lastModified: now, priority: 0.8 },
    { url: `${site.domain}/contact`, lastModified: now, priority: 0.7 },
    { url: `${site.domain}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${site.domain}/terms`, lastModified: now, priority: 0.3 },
  ];

  const offeringRoutes: MetadataRoute.Sitemap = offerings.map((o) => ({
    url: `${site.domain}/offer/${o.slug}`,
    lastModified: now,
    // Available offerings outrank ones still in development.
    priority: o.status === "available" ? 0.9 : 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${site.domain}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.7,
  }));

  return [...staticRoutes, ...offeringRoutes, ...postRoutes];
}
