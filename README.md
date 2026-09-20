# Stallwart

Marketing site for **Stallwart**, an AI-first engineering company. Positioning:
_"Bring the problem, we build the system that solves it."_ We build AI agents and
automation, AI + SaaS products, AI infrastructure and RAG, and custom AI systems,
engineered to production and owned by the client.

Live: https://www.stallwart.in

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS 4** (tokens in `app/globals.css`)
- **Supabase** for lead capture (contact, careers, partner + partial drafts)
- **Resend** (email) · **ntfy.sh** (push) for lead notifications
- Analytics: GA4 + Microsoft Clarity, both deferred off the critical path

> This is **not** the Next.js you may know. Read the relevant guide in
> `node_modules/next/dist/docs/` before using a Next API. See `AGENTS.md`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also validates static generation)
npx tsc --noEmit # typecheck
```

## Repository layout

```
app/            routes (App Router). Each route: page.tsx (+ opengraph-image, etc.)
  offer/        "What We Build" — the core services page
  industries/   /industries hub + /industries/[slug] (14 SEO pages, data-driven)
  contact/      lead form + /contact/thank-you (Cal.com booking)
  llms.txt/     generated llms.txt route (AI-crawler summary)
  sitemap.ts robots.ts opengraph-image.tsx   SEO/metadata files
components/     UI components (server-first; "use client" only where needed)
data/           SOURCE OF TRUTH content: site.ts, industries.ts, faqs.ts, blog.ts, ...
lib/            seo.ts (all schema + metadata builders), notify.ts, supabase/, ogCard.tsx
docs/           engineering + SEO/AEO/GEO documentation
```

## Conventions (what each file is expected to do)

- **Content lives in `data/*.ts`, never hardcoded in components.** `data/site.ts`
  is the company source of truth; `data/industries.ts` drives the explorer, the
  `/industries` pages, the schema, and the sitemap at once. Change data, the whole
  site follows.
- **`lib/seo.ts` owns every JSON-LD graph and `pageMeta()`.** Rendered copy and
  machine-readable data derive from the same data, so they can never drift.
- **Every page uses `pageMeta()`** (canonical + OpenGraph + Twitter, with a
  dynamic brand OG image). Home metadata lives in `app/layout.tsx`.
- **Voice:** declarative, specific, plain English. No em dashes anywhere. No
  "leverage / seamless / cutting-edge / solutions". No unverifiable claims,
  metrics, or customer counts (see `AGENTS.md` / CLAUDE constraints).
- **Server components by default.** Add `"use client"` only for interactivity.
- **Design tokens** (gold/ink/cream, spacing, type steps, easings) are CSS vars in
  `app/globals.css`. Use the tokens, not raw values. Dark is the default theme.

## Design

Editorial, high-contrast, enterprise. Spectral (display serif), IBM Plex Sans
(body), IBM Plex Mono (labels), Cinzel (wordmark), all via `next/font`. Motion is
CSS-first (`Reveal`, `.scroll-rise`, marquees, animated beams) and always cancels
under `prefers-reduced-motion`. Signature elements: the hero build-terminal, the
Animated Beams core (lion mark), and the industry explorer.

## Lead flow

Contact / careers / partner forms → Zod validation → Supabase insert → `notify.ts`
(Resend email + ntfy push). Contact form also captures **partial drafts**
(`/api/lead-draft`) so abandoned forms are not lost. A honeypot field drops bots.
Env keys are documented in `Redesign docs/10-lead-flow.md` and `.env.example`.

## SEO / AEO / GEO

See **[docs/SEO.md](docs/SEO.md)**. In short: dynamic per-page metadata + canonical,
Organization / WebSite / Service / FAQPage / Breadcrumb / DefinedTermSet /
per-industry Service schema, `llms.txt` for AI crawlers, an AI-crawler allow-list
in `robots.ts`, a data-driven sitemap with real `lastmod`, and dynamic OG images
that update with the site. Positioning is global-remote (no LocalBusiness).
