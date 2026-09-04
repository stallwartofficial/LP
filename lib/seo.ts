import type { Metadata } from "next";
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
 * Short stable hash of the current hero copy. Appended to the OG image URL as
 * ?v=<hash> so any hero change (headline, subhead, tagline, emphasis word, CTA
 * labels) automatically changes the URL. Aggressive social caches — WhatsApp,
 * iMessage, Slack, LinkedIn — treat the different URL as a new resource and
 * fetch the fresh preview. Zero-maintenance: no manual version bump ever.
 */
export function heroOgCacheKey(): string {
  const src = [
    site.hero.headline,
    site.hero.subhead.join("|"),
    site.hero.tagline,
    site.hero.headlineEmphasis,
    site.hero.primaryCta.label,
    site.hero.secondaryCta.label,
  ].join("::");
  // djb2, stable across builds and Node runtimes, produces a compact base36 id.
  let h = 5381;
  for (let i = 0; i < src.length; i++) {
    h = ((h * 33) ^ src.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

/** Full OG image URL with the auto cache-bust query. */
export function heroOgImageUrl(): string {
  return `/opengraph-image?v=${heroOgCacheKey()}`;
}

/**
 * Per-page metadata with DIFFERENTIATED social tags. Next does not derive
 * openGraph/twitter from a page's title and description, so a page that sets
 * only those inherits the root layout's home OG block, and every social preview
 * looks identical. This builds a page-specific canonical, openGraph, and twitter
 * card so each URL shares with its own title and description. Use it on every
 * page that isn't the home route.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const ogTitle = `${title} | ${site.company}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: `${site.domain}${path}`,
      siteName: site.company,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
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
    // The lion mark, registered as the entity's logo/image so Google and AI
    // answer engines attach it to "Stallwart" as the brand image, not just as
    // a favicon. This turns the mark from a header PNG into the entity image
    // that can appear in a knowledge panel or an AI-composed answer.
    logo: `${site.domain}/images/stallwart-lion-mark.png`,
    image: `${site.domain}/images/stallwart-lion-mark.png`,
    description: site.description,
    slogan: site.tagline,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(() => {
      const profiles = [site.social.linkedin, site.social.twitter].filter(Boolean);
      return profiles.length ? { sameAs: profiles } : {};
    })(),
    founder: { "@type": "Person", name: site.founder.fullName },
    knowsAbout: [
      "AI systems engineering",
      "Sales pipeline automation",
      "AI governance and compliance",
    ],
    areaServed: site.location.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressCountry: site.location.country,
      addressRegion: site.location.region,
    },
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
      audienceType: offering.builtFor.map((b) => b.role).join("; "),
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

/**
 * A glossary as a DefinedTermSet: every term is a DefinedTerm that points back
 * to the set. Lets answer engines quote a definition and know which glossary it
 * belongs to, rather than treating each term as free-floating text.
 */
export function definedTermSetSchema(
  name: string,
  url: string,
  terms: { term: string; def: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    url,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
      inDefinedTermSet: url,
    })),
  };
}

/**
 * A plain list of named links as an ItemList. Used for index pages that point
 * to other pages (the guides index), where the content is a set of links, not a
 * stepwise procedure. Deliberately not HowTo: these are entry points, not steps.
 */
export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
