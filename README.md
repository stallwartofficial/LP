# Stallwart — Extrovert AI Landing Page

Production-grade marketing site for Stallwart / Extrovert AI. Next.js 14 (App
Router) + TypeScript + Tailwind + Framer Motion, deployed on Vercel.

## Local setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Where to edit content

- `data/site.ts` — company name, tagline, contact info, CTA copy
- `data/offerings.ts` — the 4 product capability cards
- `data/testimonials.ts` — testimonials (illustrative/role-based, see note
  below) and logo marquee marks
- `data/caseStudies.ts` — case study index; full narrative content lives in
  `app/case-studies/[slug]/page.tsx` (marked with `TODO` where real content
  should replace placeholder copy)
- `app/layout.tsx` — global metadata, JSON-LD structured data
- `public/llms.txt` — AI answer engine (AEO) fact sheet, keep in sync with
  `data/site.ts`

## Known TODOs before real launch

1. **Fonts**: `next/font/google` (Fraunces + Inter) couldn't resolve in this
   sandboxed build environment — currently falls back to system fonts. Swap
   back per the comment in `app/layout.tsx` once building outside this
   sandbox (Vercel/local dev will resolve them normally).
2. **Contact info**: `data/site.ts` has placeholder email/phone/address —
   replace with real values.
3. **Testimonials & logos**: currently illustrative/role-based by deliberate
   decision (pre-launch product — avoids deceptive-advertising risk from
   fabricated named-company quotes). Swap in real customer testimonials and
   logos in `data/testimonials.ts` once available.
4. **Case study body content**: structure and schema markup are in place;
   the actual challenge/solution/outcome narratives need real content per
   industry.
5. **Demo request handler**: `app/api/demo-request/route.ts` currently
   validates and accepts submissions but doesn't send anywhere — wire to a
   real CRM/email webhook.
6. **OG image**: `public/images/og-cover.png` referenced in metadata but not
   yet created — add a 1200×630 social share image.
7. **Blog**: route (`/blog`) is linked in nav but not yet scaffolded — same
   MDX pattern as case studies, build when ready.

## Architecture

See `BUILD_PLAN.md` for the full living build plan (screens, data model,
architecture decisions log, SEO/AEO strategy).
