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

## 2. Site Structure — Standalone Pages (Enterprise Pattern)

This is a multi-page landing site, not a single-page-with-anchors site.
Home carries **condensed teasers** of Story/Offer/Case Studies, each linking
out to its own full page — the standard enterprise B2B pattern.

**Nav menu:** Our Story · What We Offer · Case Studies · Blog · Contact
**CTA button (not a nav link):** Book a Demo → `/contact`

| Route | Purpose | Status |
|---|---|---|
| `/` | Hero (wow-moment pipeline visual) + condensed Story/Offer teasers + Social Proof + Case Studies preview + Contact banner | done |
| `/story` | Full "Our Story" page | done |
| `/offer` | Full "What We Offer" page (4 capability cards) | done |
| `/case-studies` | Case studies index (3 cards) | done |
| `/case-studies/[slug]` | Individual case study (SaaS Sales, Agencies, SMB Market) | done (structure; body content pending) |
| `/blog` | Blog index | not started |
| `/blog/[slug]` | Blog post template (MDX) | not started |
| `/contact` | Full contact page with Book-a-Demo form | done |
| 404 | Custom not-found page | not started |

## 3. Component Inventory

| Component | Status |
|---|---|
| Navbar (sticky, blur-on-scroll, real page links + CTA button) | done |
| Hero (headline, subhead, CTA, animated pipeline Framer visual) | done |
| Story (full) / StoryTeaser (condensed, home) | done |
| Offerings (full) / OfferingsTeaser (condensed, home) | done |
| Social proof: testimonial cards (role-based, illustrative tag) | done |
| Logo infinite-scroll strip (CSS marquee, placeholder marks) | done |
| CaseStudies (shared component, `showViewAll` prop toggles "view all" link) | done |
| ContactBanner (condensed, home) / Contact (full form, `/contact`) | done |
| Footer (nav, legal, social) | done |
| Loading/error/success states — contact form | done |
| 404 page | not started |
| Logo asset integration (provided phoenix mark) | done |

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
