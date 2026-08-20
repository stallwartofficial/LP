import { site } from "@/data/site";
import { offerings, type Offering } from "@/data/offerings";
import { blogPosts } from "@/data/blog";

// Centralised structured data and canonical URLs.
//
// Every builder derives from data/*.ts so the rendered page and the machine
// readable version can never disagree. This is the AEO layer: AI answer engines
// read these graphs to decide what Stallwart is and what it sells.

export function canonical(path: string) {
  return { alternates: { canonical: path } };
}

/**
 * The company, the primary entity of this site. Stallwart makes several
 * offerings, so `makesOffer` is a list. Only offerings that actually exist are
 * advertised; in development ones are omitted rather than announced.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.company,
    alternateName: `${site.company} AI`,
    url: site.domain,
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    telephone: site.contact.phone,
    sameAs: [site.social.linkedin, site.social.twitter],
    founder: { "@type": "Person", name: site.founder.fullName },
    knowsAbout: [
      "AI systems engineering",
      "Sales pipeline automation",
      "AI governance and compliance",
      "AI video production",
    ],
    makesOffer: offerings
      .filter((o) => o.status === "available")
      .map((o) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: o.name,
          description: o.summary,
          url: `${site.domain}/offer/${o.slug}`,
        },
      })),
  };
}

/** The site itself, with a search action. Helps sitelinks in search results. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.company,
    url: site.domain,
    description: site.description,
    publisher: { "@type": "Organization", name: site.company },
  };
}

/**
 * A single offering on its own detail page.
 *
 * NOTE: deliberately omits `aggregateRating` and `offers.price`. Both are
 * verifiable claims; publishing either pre launch would be fabrication.
 */
export function offeringSchema(offering: Offering) {
  const isSoftware = offering.category.startsWith("Product");

  return {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareApplication" : "Service",
    name: offering.name,
    description: offering.description,
    url: `${site.domain}/offer/${offering.slug}`,
    ...(isSoftware
      ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" }
      : { serviceType: offering.category }),
    provider: {
      "@type": "Organization",
      name: site.company,
      url: site.domain,
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: offering.builtFor.join("; "),
    },
    ...(offering.capabilities.length > 0 && {
      featureList: offering.capabilities.map((c) => c.title),
    }),
  };
}

/** The portfolio as a list, so crawlers see the full offering set. */
export function offeringListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.company}, what we offer`,
    itemListElement: offerings.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: o.name,
      url: `${site.domain}/offer/${o.slug}`,
    })),
  };
}

/** The insights index as a Blog, with every post enumerated. */
export function blogListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.company} Insights`,
    url: `${site.domain}/blog`,
    description:
      "Case studies and writing on AI systems, operations, and the work that falls through.",
    publisher: { "@type": "Organization", name: site.company },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.publishedAt,
      url: `${site.domain}/blog/${p.slug}`,
    })),
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Breadcrumbs give crawlers the site hierarchy on nested routes. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.domain}${crumb.path}`,
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  path: string;
  about?: string;
  type?: "Article" | "BlogPosting";
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    about: opts.about,
    url: `${site.domain}${opts.path}`,
    author: { "@type": "Organization", name: site.company },
    publisher: {
      "@type": "Organization",
      name: site.company,
      url: site.domain,
    },
    isPartOf: { "@type": "WebSite", name: site.company, url: site.domain },
  };
}
