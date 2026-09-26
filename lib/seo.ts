import type { Metadata } from "next";
import { site } from "@/data/site";
import { blogPosts } from "@/data/blog";
import { industries, industryShort } from "@/data/industries";

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
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  /**
   * Social image control. Omit for the default brand OG image, so every page
   * shares WITH a picture. Pass `null` on routes that ship their own
   * opengraph-image file (offer, contact, faq, story), so Next's file
   * convention supplies the bespoke image instead of this default overriding it.
   */
  ogImage?: string | null;
}): Metadata {
  const ogTitle = `${title} | ${site.company}`;
  const image = ogImage === undefined ? heroOgImageUrl() : ogImage;
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
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: `${site.company}, ${site.tagline}` }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(image ? { images: [image] } : {}),
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
    foundingDate: "2026",
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.email
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            email: site.contact.email,
            contactType: "sales",
            availableLanguage: ["English"],
            areaServed: site.location.areaServed,
          },
        }
      : {}),
    founder: {
      "@type": "Person",
      name: site.founder.fullName,
      jobTitle: site.founder.role,
      ...(site.founder.linkedin ? { sameAs: [site.founder.linkedin] } : {}),
    },
    // Entity disambiguation: link the founder's LinkedIn as a sameAs signal
    // even when the company has no social profiles yet.
    sameAs: [
      site.founder.linkedin,
      ...([site.social.linkedin, site.social.twitter].filter(Boolean)),
    ].filter(Boolean),
    areaServed: site.location.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressCountry: site.location.country,
      addressRegion: site.location.region,
    },
    foundingLocation: {
      "@type": "Place",
      name: site.location.country,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${site.company} Services`,
      url: `${site.domain}/offer`,
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Agents & Automation",
          description: "Software that runs a process end to end, unattended.",
          url: `${site.domain}/offer`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI + SaaS Products",
          description: "Full AI and SaaS products, built, shipped, and owned by the client.",
          url: `${site.domain}/offer`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Infrastructure & RAG",
          description: "Retrieval, model selection, and evaluation that make AI reliable.",
          url: `${site.domain}/offer`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom AI Systems",
          description: "Bespoke AI systems engineered to fit the business.",
          url: `${site.domain}/offer`,
        },
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "AI Agents",
      "Retrieval-Augmented Generation",
      "AI Infrastructure",
      "SaaS Product Engineering",
      "Automation",
    ],
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

export function webPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: `${site.domain}${opts.path}`,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    isPartOf: { "@type": "WebSite", name: site.company, url: site.domain },
    publisher: { "@type": "Organization", name: site.company, url: site.domain },
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
  dateModified?: string;
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
    // Freshness signal: engines weight recency. Defaults to published date when
    // a post has not been revised.
    dateModified: opts.dateModified ?? opts.datePublished,
    about: opts.about,
    url: `${site.domain}${opts.path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.domain}${opts.path}` },
    // Author is the founder (E-E-A-T), with the company as publisher.
    author: {
      "@type": "Person",
      name: site.founder.fullName,
      jobTitle: site.founder.role,
      ...(site.founder.linkedin ? { sameAs: [site.founder.linkedin] } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: site.company,
      url: site.domain,
    },
    isPartOf: { "@type": "WebSite", name: site.company, url: site.domain },
  };
}

/**
 * The four capabilities as Service entities, so answer engines can associate
 * Stallwart with "who builds AI agents / RAG / AI SaaS / custom AI". Product-
 * free by design: these are services the company provides, not named products.
 */
export function serviceSchema() {
  const services = [
    ["AI Agents & Automation", "Software that runs a process end to end, unattended."],
    ["AI + SaaS Products", "Full AI and SaaS products, built, shipped, and owned by the client."],
    ["AI Infrastructure & RAG", "Retrieval, model selection, and evaluation that make AI reliable."],
    ["Custom AI Systems", "Bespoke AI systems engineered to fit the business."],
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.company}, what we build`,
    itemListElement: services.map(([name, description], i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name,
        description,
        serviceType: name,
        provider: { "@type": "Organization", name: site.company, url: site.domain },
        areaServed: site.location.areaServed,
        url: `${site.domain}/offer`,
      },
    })),
  };
}

/**
 * The industries Stallwart builds AI for, as an ItemList of Service entities.
 * Lets answer engines enumerate "who builds AI for banking / healthcare / ..."
 * and attach each to Stallwart. Mirrors the /offer industry explorer; keep the
 * names in sync with components/IndustryExplorer.tsx.
 */
export function industriesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.company}, AI across industries`,
    itemListElement: industries.map((ind, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: `AI for ${ind.name}`,
        serviceType: `AI for ${ind.name}`,
        description: `In ${industryShort(ind.name)}, ${site.company} builds AI that ${ind.title}`,
        provider: { "@type": "Organization", name: site.company, url: site.domain },
        areaServed: site.location.areaServed,
        url: `${site.domain}/industries/${ind.slug}`,
      },
    })),
  };
}

/**
 * Per-industry schema for the /industries/[slug] pages: a Service graph plus a
 * matching FAQPage stub built from the industry's outcomes, so answer engines
 * can quote "what AI does for {industry}".
 */
export function industryServiceSchema(slug: string) {
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI for ${ind.name}`,
    serviceType: `AI for ${ind.name}`,
    description: `In ${industryShort(ind.name)}, ${site.company} builds AI that ${ind.title} ${ind.detail}`,
    provider: { "@type": "Organization", name: site.company, url: site.domain },
    areaServed: site.location.areaServed,
    url: `${site.domain}/industries/${ind.slug}`,
    ...(ind.tags.length ? { serviceOutput: ind.tags } : {}),
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
export function howToSchema(opts: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: `${site.domain}${opts.path}`,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

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
