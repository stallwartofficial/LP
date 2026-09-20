# SEO / AEO / GEO

How discoverability is engineered on this site, and where each piece lives.
Everything is **data-driven**: rendered copy and machine-readable data come from
the same `data/*.ts`, so they cannot contradict each other.

## Principles (priority order)
Search intent → entity clarity → semantic relevance → technical accessibility →
topical authority → AI/answer-engine understanding → geographic relevance →
conversion → natural language → long-term quality. No keyword stuffing.

## Metadata system — `lib/seo.ts`
- `pageMeta({ title, description, path, ogImage? })` builds per-page `title`,
  canonical, OpenGraph, and Twitter card. Used on every route except home.
- Home metadata is in `app/layout.tsx` (title template `%s | Stallwart`).
- **OG images are dynamic.** Default: a brand card generated in
  `app/opengraph-image.tsx` from `data/site.ts` (hero copy), with an automatic
  `?v=<hash>` cache-bust so WhatsApp/LinkedIn/Slack/X refresh when copy changes.
  Every page therefore shares WITH an image. (Bespoke per-page OG files were
  removed because they went stale; pass `ogImage:null` only if a route ships its
  own `opengraph-image` file again.)
- Titles are keyword-intent (e.g. `/offer` = "AI Agents, SaaS & Custom AI
  Systems", `/story` = "About Stallwart", `/faq` = "AI Development FAQ").

## Structured data (JSON-LD) — `lib/seo.ts`
- `organizationSchema()` — global (in `app/layout.tsx`): logo/image = lion mark,
  `foundingDate`, `contactPoint`, founder `Person` with `sameAs` (LinkedIn),
  `areaServed`, `knowsAbout`, country/region address. **No LocalBusiness**
  (global-remote positioning).
- `webSiteSchema()` + `serviceSchema()` — home (`app/page.tsx`).
- `serviceSchema()` + `industriesSchema()` + breadcrumb — `/offer`.
- `industryServiceSchema(slug)` + `faqSchema` + breadcrumb — each
  `/industries/[slug]`.
- `faqSchema()` — from `data/faqs.ts` (feeds `/faq` page + FAQPage); also on
  `/offer` and industry pages.
- `breadcrumbSchema`, `definedTermSetSchema` (glossary), `blogListSchema`,
  `articleSchema` (blog, E-E-A-T author = founder).

## AEO (answer engines)
- `app/llms.txt/route.ts` — generated plain-text summary: what we build, the 14
  industries, terms, company facts, founder. Kept in sync with the site
  (numbers, email, industries). Never let it contradict the live site.
- `robots.ts` — explicit allow-list for AI/answer crawlers (Googlebot,
  Google-Extended, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Applebot,
  CCBot, …) on top of `User-agent: *`.
- FAQ is broad customer-intent (cost model, timelines, ownership, security,
  industries, "what is an AI agent/RAG") so answers are quotable and claim-free.

## GEO
Global-remote. `data/site.ts` `location`: country India, region Tamil Nadu, no
city; `areaServed` = US / UK / India / Worldwide. Do **not** add LocalBusiness or
a city unless the positioning changes to local-first.

## Industries (long-tail AEO/GEO)
`data/industries.ts` is the single source of truth for all 14 industries and
their **display order** (`SEARCH_RANK`, most-searched first). It drives: the
`IndustryExplorer` (offer page + mobile carousel), `industriesSchema`, the
`/industries` hub, each `/industries/[slug]` page (unique "AI for X" title/H1 +
Service + FAQPage schema + internal links), and the sitemap. To re-rank or edit
copy everywhere, edit this one file.

## Sitemap & crawlability — `app/sitemap.ts`
- Data-driven (static routes + 14 industry routes + blog posts).
- **Real `lastmod`** via a `routeDates` map (edit when a page changes); no fake
  build-time freshness. Blog uses `publishedAt`.
- Crawl paths to industry pages without a nav tab: on-page explorer "See AI for…"
  links → `/industries/[slug]`, footer "AI by Industry" → hub, sitemap.

## Utility pages
`/contact/thank-you` is `noindex` (private confirmation). Privacy/Terms kept.

## Known gaps / TODO
- Company `sameAs` (Stallwart LinkedIn/X) is empty in `data/site.ts` — add URLs
  to strengthen the entity graph (founder `sameAs` is set).
- Core Web Vitals deep pass (main-thread work, network dependency tree) needs a
  Lighthouse trace + bundle analysis; analytics are already deferred, fonts
  optimized, and `browserslist` is modern.
