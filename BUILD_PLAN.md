# Stallwart — Extrovert AI Landing Page — Build Plan

## 1. Problem & User Journey

**Company:** Stallwart (parent/maker) · **Product:** Extrovert AI (Full AI-Powered CRM on Autopilot)
**Tagline:** "Built Beyond."
**Positioning:** Company-led. Stallwart is the brand in the hero; Extrovert AI is introduced as its flagship product within the first screen.
**ICP:** B2B sales teams — SMB and Enterprise, US + UAE primary geos (no RTL needed).
**Differentiator:** Extrovert AI runs the entire lead lifecycle on autopilot — capture, scoring, follow-up emails, re-engagement — without manual sales-ops babysitting.

**User journey (first-time visitor):**
1. Lands on hero → sees Stallwart brand mark, "Built Beyond," one-line value prop, animated pipeline visual (wow moment), primary CTA "Book a Demo."
2. Scrolls to **Story** → short, emotionally grounded founder-origin narrative tied to a real technical thesis (not generic "we're passionate about AI").
3. Scrolls to **What We Offer** → Extrovert AI capability breakdown (lead capture, scoring, auto-follow-up, auto-outreach) as scannable feature blocks.
4. Sees **social proof** → illustrative role-based testimonials + placeholder logo infinite-scroll strip.
5. Sees **Case Studies** teaser (3 industries: SaaS Sales, Agencies, SMB Market) → links to full blog/case-study pages.
6. Reaches **Contact / Book a Demo** → form + placeholder contact info.
7. Footer → nav, legal, social, sitemap-relevant links for SEO.

No dead ends; CTA repeats after hero, after offer section, and in footer.

## 2. Screens / Component Inventory

| Component | Status |
|---|---|
| Navbar (sticky, blur-on-scroll, logo + anchor links + CTA button) | not started |
| Hero (headline, subhead, CTA, animated pipeline SVG/Framer visual) | not started |
| Story section (heart+techy narrative, scroll-reveal) | not started |
| Offer/Features grid (4 capability cards: Capture, Score, Follow-Up, Outreach) | not started |
| Social proof: testimonial cards (role-based, illustrative tag) | not started |
| Logo infinite-scroll strip (CSS marquee, placeholder marks) | not started |
| Case studies preview (3 cards → SaaS Sales / Agencies / SMB) | not started |
| Individual case study pages (MDX, 3 total) | not started |
| Blog index + blog post template (MDX) | not started |
| Contact/Book-a-Demo section (form + placeholder info) | not started |
| Footer (nav, legal, social) | not started |
| 404 page | not started |
| Loading/skeleton states for all async sections | not started |
| Logo asset integration (provided phoenix mark, optimized SVG/WebP) | not started |

## 3. Design Direction

- **Palette:** Black/near-black base (#0A0A0B), gold accent (#C9A24B–#D4AF37 range sampled from logo), warm white/cream text (#F5F1E8). Avoid pure white (#FFF) — too clinical against the luxury gold/black brief.
- **Type:** A refined serif or high-contrast display serif for headlines (echoes the logo's engraved/luxury feel — e.g. Fraunces or Playfair Display), clean geometric sans for body (Inter or Geist).
- **Motion:** Tasteful/premium only — scroll-reveals (fade+rise), magnetic buttons, subtle parallax on hero background, marquee logo scroll. No WebGL/3D. Respect `prefers-reduced-motion`.
- **Spacing:** Generous whitespace, 8pt grid, section padding scales responsively (fluid clamp() sizing) — HD down to mobile.
- **Hero wow-moment:** Animated pipeline — a "lead" node flows left→right through 4 stages (Captured → Scored → Followed Up → Booked), each stage lighting up gold on arrival, subtle particle/glow trail. Built with Framer Motion + SVG, no video/demo widget.

## 4. SEO / AEO Strategy

- **SEO:** Semantic HTML, one H1 per page, descriptive meta titles/descriptions per route, Open Graph + Twitter cards, canonical URLs, XML sitemap, robots.txt, image alt text, Core Web Vitals-first build (SSR/SSG, no layout shift, optimized fonts/images).
- **AEO (AI answer engines):** Structured data (Organization, Product, FAQPage, Article schema via JSON-LD on every case study/blog post), clear declarative Q&A blocks on case study pages ("What problem did X face?" / "How did Extrovert AI solve it?" — scannable by LLM crawlers), `llms.txt` at root summarizing company/product/facts, consistent NAP (name/address/phone) even as placeholder.
- **Case studies as SEO/AEO engine:** each of the 3 (SaaS Sales, Agencies, SMB Market) gets a real URL, schema markup, and a distinct target query cluster — depth over breadth per your own principle.

## 5. Data Model (conceptual — MDX-based, no DB for v1)

- **CaseStudy**: slug, industry, title, challenge, solution, outcome (illustrative), persona tag, publishedAt, seoMeta
- **BlogPost**: slug, title, body(MDX), tags, publishedAt, seoMeta
- **Testimonial**: role, industry, quote, illustrative:boolean
- **DemoRequest** (form submission): name, email, company, teamSize, message, submittedAt

## 6. API Contract Sketch

- `POST /api/demo-request` → validates + sends to email/CRM webhook (placeholder endpoint, swappable later) → returns `{success, id}`
- Static MDX content — no read API needed for v1 (build-time generation)

## 7. Architecture Decisions Log

- **Next.js 14 App Router + TypeScript + Tailwind** — SSR/SSG required for SEO/AEO (client-only React would hide content from crawlers); Vercel-native deployment matches stated host.
- **MDX for case studies/blog** — non-technical editing later without full CMS; can migrate to Sanity/Contentful headless CMS in phase 2 without restructuring routes.
- **Framer Motion** for micro-animations — best-in-class for the tasteful scroll-reveal/parallax brief, tree-shakeable, works cleanly with App Router.
- **No demo widget in hero** — replaced with animated pipeline visualization per your direction; avoids overscoping v1.
- **Testimonials: illustrative, role-based, not fabricated named companies** — legal/deceptive-advertising risk on a pre-launch product; logos in marquee are generic placeholder marks, not real or fake-real brand logos, until real customers exist to swap in.
- **No RTL/Arabic localization for v1** — confirmed not needed.

## 8. Open Questions (none blocking — proceed to build)

- Real contact info, real domain verification, real testimonials/logos: swap in when available (all marked as placeholder in code with clear TODO comments).

---
**Status: ready for `frontend-build` to execute end-to-end.**
