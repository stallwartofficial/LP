# Stallwart, Landing Page

Marketing site for **Stallwart**, an AI and software engineering company.
This README documents the stack and conventions only, not the copy.

## Stack

| Layer | Choice | Version |
| --- | --- | --- |
| Framework | Next.js, App Router, Turbopack | 16.3.1 |
| Runtime | React | 19.2.8 |
| Language | TypeScript, strict | 5.x |
| Styling | Tailwind CSS, CSS-first config via `@theme` | 4.x |
| Animation | Native CSS scroll-driven animation, no JS runtime | n/a |
| Fonts | `next/font/google`, self-hosted at build time | Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (labels) |
| Hosting target | Vercel | n/a |

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server, http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
```

## Project layout

```
app/          routes (App Router), route-level metadata, API handlers
  api/        server route handlers (contact-form intake)
  offer/      portfolio index and [slug] offering pages
  blog/       insights index and [slug] posts (case studies live here)
  privacy/    privacy policy (static)
  terms/      terms of service (static)
components/   presentational components, server by default
data/         all site content as typed modules, the single source of truth
lib/          seo builders, og image renderer, theme helpers
public/       static assets, images, llms.txt
```

For the design and decision rationale behind the site (positioning, the hero,
typography, performance, SEO/AEO), see `ENGINEERING_RATIONALE.md`.

## Architecture notes

**Server components by default.** Only components that need browser APIs are
marked `"use client"`: `Navbar`, `ThemeToggle`, and the `Contact` form. All page
copy stays server-rendered, so it is present in the initial HTML.

**Content lives in `data/`.** Copy, offerings, posts, testimonials, trust terms,
and FAQs are typed modules, never hardcoded in components. Adding an offering to
`data/offerings.ts` propagates to the portfolio page, its detail route, the
sitemap, the footer, the contact form, and JSON-LD automatically.

**Styling is token-driven.** `app/globals.css` defines a fluid type scale via
`clamp()`, light and dark palettes built with `color-mix(in oklab)`, and shared
easing. Components consume CSS variables rather than literal colours, so both
themes stay in sync. Text colours use AA-contrast-safe tokens (`--accent-text`);
the brighter counterparts are for fills and borders only.

**Animation is CSS-first, zero JavaScript.** Scroll reveals use native
`animation-timeline: view()` (running on the compositor); first-paint reveals use
`@starting-style`. There is no animation library in the bundle. Everything is
cancelled under `prefers-reduced-motion`, so nothing can be left stuck at
opacity 0.

**Responsive by reflow, not duplication.** Pages such as Story and Contact are a
single set of grid children that reorder with CSS `order` on mobile and snap to
explicit `col-start` / `row-start` / `row-span` placement on desktop. One markup
serves every breakpoint.

**SEO and AEO.** Structured data is centralised in `lib/seo.ts` and derived from
`data/`, so schema cannot drift from rendered copy. Every route sets a canonical
URL and has exactly one `h1`. OG images are generated at build time by
`next/og`. `public/llms.txt` is the AI answer-engine fact sheet.

## Environment

Copy `.env.example` to `.env.local`:

```
DEMO_WEBHOOK_URL=    # server-side only, destination for contact-form submissions
```

Server-side only, never prefix with `NEXT_PUBLIC_`. Any generic webhook receiver
works (Zapier, Make, n8n, or your own CRM intake). If unset, submissions are
accepted by the UI, delivered nowhere, and a warning is logged server-side.

## Conventions

- No em dashes in any user-facing copy, including page titles.
- Both themes must be verified for any visual change.
- WCAG AA contrast is enforced; text tokens are measured, not eyeballed.
- Content changes go in `data/`, not in component JSX.
