# Stallwart, Landing Page

Marketing site for Stallwart. This README documents the stack only.

## Stack

| Layer | Choice | Version |
| --- | --- | --- |
| Framework | Next.js, App Router, Turbopack | 16.3.1 |
| Runtime | React | 19.2.8 |
| Language | TypeScript, strict | 5.x |
| Styling | Tailwind CSS, CSS first config via `@theme` | 4.x |
| Animation | Framer Motion, plus native CSS scroll driven animation | 13.x |
| Fonts | `next/font/google`, self hosted at build time | Fraunces (variable), Inter |
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
app/          routes (App Router), route level metadata, API handlers
  api/        server route handlers
  offer/      portfolio index and [slug] offering pages
  blog/       insights index and [slug] posts (case studies live here)
components/   presentational components, server by default
data/         all site content as typed modules, the single source of truth
lib/          seo builders, og image renderer, theme hook
public/       static assets, llms.txt
```

## Architecture notes

**Server components by default.** Only components that need browser APIs are
marked `"use client"`: the navbar, theme toggle, mindmap, contact form, and the
motion wrappers in `components/Reveal.tsx`. Page copy stays server rendered so
it is in the initial HTML.

**Content lives in `data/`.** Copy, offerings, posts, testimonials, and FAQs are
typed modules, never hardcoded in components. Adding an offering to
`data/offerings.ts` propagates to the portfolio page, its detail route, the
sitemap, the footer, the contact form, and JSON-LD automatically.

**Styling is token driven.** `app/globals.css` defines a fluid type scale via
`clamp()`, a light and dark palette, and shared easing. Components consume CSS
variables rather than literal colours, so both themes stay in sync. Text colours
use AA contrast safe tokens (`--accent-text`, `--branch-*-text`); the brighter
counterparts are for fills and borders only.

**Animation is CSS first.** Scroll reveals use native `animation-timeline: view()`
with no JavaScript, degrading to visible content where unsupported. Framer
Motion handles only mount transitions. Everything is disabled under
`prefers-reduced-motion`.

**SEO and AEO.** Structured data is centralised in `lib/seo.ts` and derived from
`data/`, so schema cannot drift from rendered copy. Every route sets a canonical
URL and has exactly one `h1`. OG images are generated at build time by
`next/og`. `public/llms.txt` is the AI answer engine fact sheet.

## Environment

Copy `.env.example` to `.env.local`:

```
DEMO_WEBHOOK_URL=    # server side only, destination for contact form submissions
```

Server side only, never prefix with `NEXT_PUBLIC_`. If unset, submissions are
accepted by the UI, delivered nowhere, and a warning is logged server side.

## Conventions

- No em dashes in any user facing copy, including page titles.
- Both themes must be verified for any visual change.
- WCAG AA contrast is enforced; text tokens are measured, not eyeballed.
