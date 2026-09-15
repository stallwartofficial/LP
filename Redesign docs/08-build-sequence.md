# 08 — Build Sequence

## Phase 0: Repo prep 

**Goal:** Fork existing repo, strip old design, prep for new system.

* \[ ] Clone existing stallwart.in repo
* \[ ] Strip all old CSS/styling (keep component structure as reference)
* \[ ] Keep: existing routing, deployment config, any Vercel settings, domain config
* \[ ] Keep: existing blog/case-study MDX content files
* \[ ] Keep: existing images (founder photo, lion mark)
* \[ ] Remove: Extrovert AI and Sillage product pages (/offer/extrovert-ai, /offer/sillage)
* \[ ] Remove: /partner page
* \[ ] Commit as "clean slate for redesign"

**Checkpoint:** Repo builds and deploys. All old pages stripped. Content files preserved.

\---

## Phase 1: Foundation

**Goal:** New design system live, one page renders.

* \[ ] Next.js 15 project init (App Router)
* \[ ] Tailwind 4 setup with CSS custom properties from 01-design-system.md
* \[ ] Font files: Satoshi + JetBrains Mono self-hosted in /public/fonts
* \[ ] Global CSS: reset, tokens, base typography
* \[ ] Favicon set: ico, png, apple-touch-icon, webmanifest
* \[ ] Root layout: metadata defaults, font loading, theme setup (dark-first)
* \[ ] Component: Button (primary, secondary, ghost)
* \[ ] Component: Container (max-width, padding)
* \[ ] Component: Nav (desktop + mobile hamburger overlay)
* \[ ] Component: Footer
* \[ ] robots.ts, sitemap.ts stubs
* \[ ] Deploy to Vercel (staging domain)

**Checkpoint:** Nav + footer render on a blank homepage. Fonts load. Tokens work. Mobile hamburger works.

\---

## Phase 2: Homepage

**Goal:** Full homepage live with all sections.

* \[ ] Hero section: headline, subline, CTAs, industry ticker
* \[ ] Architecture visualization: canvas/SVG background (start simple — static diagram first, animate later)
* \[ ] Proof strip: client names, metric line
* \[ ] What We Build: 4 capability cards (staggered 2×2 layout)
* \[ ] Architecture section: 4-layer interactive (desktop hover, mobile tap-expand)
* \[ ] Case study section: featured + 2 smaller cards (hardcoded content initially)
* \[ ] Terms section: 2×4 grid
* \[ ] Testimonials: masonry layout, 6 quotes
* \[ ] Founder section: photo + quote + bio
* \[ ] Ask AI About Us: 5 AI engine links
* \[ ] Final CTA section
* \[ ] Sticky mobile CTA bar

**Checkpoint:** Homepage renders fully, responsive at 375/768/1280/1440. All copy from 03-content-copy.md in place. No placeholder text.

\---

## Phase 3: Core pages

**Goal:** All primary pages live.

* \[ ] /work: pillar page with capability sections
* \[ ] /case-studies: hub page + 3 individual case study pages (MDX)
* \[ ] /about: merged story + principles
* \[ ] /faq: full FAQ with FAQPage schema
* \[ ] /contact: multi-step form (React Hook Form + Zod)
* \[ ] /contact/thank-you: confirmation + Cal.com embed
* \[ ] /trust: Trust \& Security page
* \[ ] /privacy + /terms
* \[ ] Custom 404 page

**Checkpoint:** Every page accessible. Form submits (even if to console.log for now). No broken links. All copy in place.

\---

## Phase 4: Lead flow 

**Goal:** Form → DB → notifications → acknowledgment working end-to-end.

* \[ ] Supabase: create leads table
* \[ ] Server Action: form submission handler
* \[ ] Resend: auto-acknowledgment email to customer
* \[ ] Resend: notification email to Arun
* \[ ] WhatsApp: webhook notification to Arun
* \[ ] Cal.com: embed on thank-you page (or setup if no account yet)
* \[ ] UTM parameter capture on form
* \[ ] Test full flow: submit → DB row + 2 emails + WhatsApp + thank-you page

**Checkpoint:** Submit form → lead appears in Supabase, Arun gets email + WhatsApp within 30 seconds, customer gets auto-reply email.

\---

## Phase 5: SEO/AEO/GEO

**Goal:** Schema, metadata, llms.txt, structured data on every page.

* \[ ] Schema: Organization (site-wide)
* \[ ] Schema: FAQPage on /faq
* \[ ] Schema: Article on each blog/case study
* \[ ] Schema: WebSite on homepage
* \[ ] Meta tags: title + description on EVERY page (from 03-content-copy.md templates)
* \[ ] OG images: dynamic generation per page
* \[ ] llms.txt: serve at /llms.txt (from 07-seo-aeo.md)
* \[ ] robots.txt: allow all, point to sitemap
* \[ ] sitemap.xml: dynamic, includes all pages + blog + case studies
* \[ ] 301 redirects: /offer/\* → /work, /story → /about, /principles → /about
* \[ ] Alt text: every image
* \[ ] Internal linking audit: blog → /work → /contact → /case-studies
* \[ ] Canonical URLs: consistent www + trailing slash
* \[ ] Heading hierarchy: H1 once per page

**Checkpoint:** Run Lighthouse → 90+ SEO score. Validate structured data with Google Rich Results Test. llms.txt accessible. All old URLs redirect.

\---

## Phase 6: Content, resources \& ebooks

**Goal:** Blog, guides, ebooks live with real content — written from scratch.

* \[ ] /resources hub page
* \[ ] /resources/blog listing + 3 initial blog posts (decision-stage content from 07-seo-aeo.md)
* \[ ] Write Ebook 1: "The AI Engineering Playbook: From Demo to Production" (7 chapters)
* \[ ] Write Ebook 2: "AI-Native Visibility: How to Get Recommended by AI Engines" (7 chapters)
* \[ ] Write Ebook 3: "SaaS MVP to Production: An Engineering Guide" (6 chapters)
* \[ ] Publish each ebook chapter as standalone page at /resources/guides/\[ebook]/\[chapter]
* \[ ] Ebook hub pages with chapter navigation
* \[ ] PDF compilation of each ebook (downloadable, email-gated optional)
* \[ ] /glossary page (from current site content, expanded)
* \[ ] /careers page (from current site content)
* \[ ] MDX pipeline working: write .mdx → renders on site with schema
* \[ ] RSS feed
* \[ ] FAQ schema on every ebook chapter page

**Checkpoint:** 20+ indexable content pages live (3 blogs + 20 ebook chapters + glossary). All with proper schema. All internally linked.

\---

## Phase 7: Animation \& polish 

**Goal:** Motion spec implemented. Performance optimized.

* \[ ] Hero load sequence (from 05-motion-spec.md)
* \[ ] Architecture viz: particle animation (canvas)
* \[ ] Section heading scroll reveals (Framer Motion)
* \[ ] Micro-interactions: button hovers, card hovers, input focus
* \[ ] Mobile nav animation
* \[ ] Sticky mobile CTA: appear/disappear on scroll
* \[ ] prefers-reduced-motion: all animations disabled
* \[ ] Image optimization: all WebP, lazy-loaded, priority on hero
* \[ ] Font optimization: preload, font-display: swap
* \[ ] Bundle analysis: < 150KB first-load JS

**Checkpoint:** Lighthouse → 90+ Performance. Animations feel smooth. Reduced-motion works. Mobile under 2s LCP.

\---

## Phase 8: Analytics \& launch prep

**Goal:** Tracking live. Final QA. Ship.

* \[ ] Plausible analytics installed (no cookie banner needed)
* \[ ] Vercel Analytics enabled
* \[ ] Conversion tracking: form submissions as goals
* \[ ] Cookie banner: only if using GA4 or similar (Plausible doesn't need one)
* \[ ] Cross-browser test: Chrome, Safari, Firefox, mobile Safari, Chrome Android
* \[ ] Responsive test: 375, 414, 768, 1024, 1280, 1440
* \[ ] Form error states: all validation messages visible, styled
* \[ ] Loading states: form submission spinner
* \[ ] Compressed images: verify all images are WebP, < 200KB each
* \[ ] Real contact address in footer (or at minimum, city + country)
* \[ ] Social meta: share to Twitter/LinkedIn → correct image + title
* \[ ] DNS: point stallwart.in to Vercel
* \[ ] SSL: verify HTTPS working
* \[ ] Final copy proofread
* \[ ] Ask AI test: query all 5 AI engines with buyer prompts — document results as baseline

**Checkpoint:** Everything works. Ship to production.

\---

## Post-launch 

* \[ ] Publish 2 decision-stage blog posts per month
* \[ ] Break ebook into guide chapters (when content provided)
* \[ ] Create comparison pages (Stallwart vs alternatives)
* \[ ] Update "Ask AI" prompts based on actual LLM results
* \[ ] Monitor AI citations monthly (query ChatGPT/Claude/Perplexity)
* \[ ] Light mode implementation
* \[ ] LinkedIn + Crunchbase + other directory listings aligned to positioning
* \[ ] Cross-platform content syndication (Medium/Dev.to with canonical)

\---

## The 20 technical items checklist

|Item|Status|Where handled|
|-|-|-|
|Custom 404 page|Phase 3|/not-found.tsx|
|Meta title every page|Phase 5|metadata.ts + per-page|
|Meta description every page|Phase 5|metadata.ts + per-page|
|CTA above the fold|Phase 2|Hero section|
|Favicon set|Phase 1|/public/|
|robots.txt|Phase 5|robots.ts|
|sitemap.xml|Phase 5|sitemap.ts|
|Open Graph image|Phase 5|opengraph-image.tsx|
|Alt text every image|Phase 5|Content audit|
|Mobile breakpoints|Phase 2|Tailwind responsive|
|Sticky mobile CTA|Phase 2|Hero + scroll listener|
|Loading states|Phase 4|Form submit spinner|
|Form error states|Phase 4|Zod validation + UI|
|Thank you page|Phase 3|/contact/thank-you|
|Privacy policy|Phase 3|/privacy|
|Terms and conditions|Phase 3|/terms|
|Cookie banner|Phase 8|Only if GA4 (Plausible = no)|
|Analytics installed|Phase 8|Plausible + Vercel|
|Real contact address|Phase 8|Footer|
|Compressed images|Phase 7|WebP + Next.js Image|



