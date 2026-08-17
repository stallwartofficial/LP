import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog"].map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${site.domain}/case-studies/${cs.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
