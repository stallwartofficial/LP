# 02 — Architecture

## Stack
```
Framework:    Next.js 15 (App Router)
Hosting:      Vercel (edge, ISR, analytics baked in)
Styling:      Tailwind CSS 4 + CSS custom properties (design tokens from 01-design-system.md)
Fonts:        Satoshi via @font-face (self-hosted, not Google Fonts — faster, no third-party call)
              JetBrains Mono via @font-face
Icons:        Phosphor Icons (tree-shaken, import only what's used)
Animation:    Framer Motion for scroll reveals + hero viz
              CSS transitions for micro-interactions (hover, focus)
Forms:        React Hook Form + Zod validation
Email:        Resend (transactional: lead acknowledgment, notification)
Booking:      Cal.com (free, self-hosted option, or cal.com hosted — embed inline)
Analytics:    Vercel Analytics + Plausible (privacy-first, no cookie banner needed)
Database:     Supabase (leads table, form submissions, optional blog CMS)
Notifications: Resend (email to Arun) + WhatsApp Business API via webhook (or Twilio)
CMS:          MDX files in repo for blog/case studies (no external CMS dependency)
              Or: Notion as CMS via notion-to-md pipeline (Arun may already use Notion)
```

## Project structure
```
stallwart.in/
├── app/
│   ├── layout.tsx              # Root layout: fonts, nav, footer, metadata defaults
│   ├── page.tsx                # Homepage
│   ├── contact/
│   │   └── page.tsx            # Book a Call (multi-step form + Cal.com embed)
│   ├── contact/thank-you/
│   │   └── page.tsx            # Post-submission confirmation
│   ├── work/
│   │   ├── page.tsx            # What We Build (pillar page)
│   │   ├── [slug]/
│   │   │   └── page.tsx        # Individual capability deep-dive
│   ├── case-studies/
│   │   ├── page.tsx            # Case studies hub
│   │   ├── [slug]/
│   │   │   └── page.tsx        # Individual case study
│   ├── resources/
│   │   ├── page.tsx            # Resources hub (blog + guides + ebooks)
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx    # Blog post
│   │   ├── guides/
│   │   │   ├── page.tsx        # Guides listing
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx    # Guide chapter (ebook chapters live here)
│   │   ├── glossary/
│   │   │   └── page.tsx        # Glossary (single long page, anchor-linked)
│   ├── about/
│   │   └── page.tsx            # Our Story + Principles merged
│   ├── faq/
│   │   └── page.tsx            # FAQ (structured data, AEO-critical)
│   ├── trust/
│   │   └── page.tsx            # Trust & Security
│   ├── careers/
│   │   └── page.tsx            # Careers
│   ├── privacy/
│   │   └── page.tsx            # Privacy policy
│   ├── terms/
│   │   └── page.tsx            # Terms
│   ├── not-found.tsx           # Custom 404
│   ├── robots.ts               # Dynamic robots.txt
│   ├── sitemap.ts              # Dynamic sitemap.xml
│   ├── llms.txt/
│   │   └── route.ts            # llms.txt for AI crawlers
│   └── opengraph-image.tsx     # Dynamic OG image generation
├── components/
│   ├── ui/                     # Design system primitives (Button, Input, Card, Badge)
│   ├── layout/                 # Nav, Footer, Section, Container
│   ├── hero/                   # Hero section + architecture visualization
│   ├── proof/                  # Logo strip, testimonials, metrics
│   ├── forms/                  # Contact form, newsletter
│   └── seo/                    # JsonLd, FAQ schema, Article schema
├── content/
│   ├── blog/                   # MDX blog posts
│   ├── case-studies/           # MDX case studies
│   ├── guides/                 # MDX guides / ebook chapters
│   └── glossary.ts             # Glossary data
├── lib/
│   ├── supabase.ts             # DB client
│   ├── resend.ts               # Email client
│   ├── whatsapp.ts             # WhatsApp notification
│   ├── schema.ts               # Zod schemas for forms
│   └── metadata.ts             # Shared metadata helpers
├── public/
│   ├── images/                 # Optimized images (WebP)
│   ├── fonts/                  # Satoshi + JetBrains Mono woff2
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   └── site.webmanifest
└── styles/
    └── globals.css             # CSS custom properties (design tokens), base reset
```

## Pages removed from current site
- `/partner` — not needed for conversion-focused site. If referral program exists, add later.
- `/offer/extrovert-ai` — REMOVED entirely (301 redirect to homepage)
- `/offer/sillage` — REMOVED entirely (301 redirect to homepage)
- `/principles` — merged into `/about`

## Pages added
- `/contact/thank-you` — post-form confirmation (critical for conversion tracking + UX)
- `/not-found` — custom 404 with search + CTA
- `/resources` — hub page unifying blog, guides, ebooks
- `llms.txt` — AI crawler guidance

## Routing rules
- All blog posts: `/resources/blog/[slug]`
- All case studies: `/case-studies/[slug]`
- All guides/ebook chapters: `/resources/guides/[slug]`
- Capability deep-dives: `/work/[slug]` (e.g. `/work/ai-agents`, `/work/custom-software`, `/work/ai-for-healthcare`)
- Old URLs (`/offer/*`, `/story`, `/principles`) → 301 redirects to new paths

## Performance budgets
```
LCP:          < 1.8s mobile, < 1.2s desktop
FID/INP:      < 100ms
CLS:          < 0.05
Bundle size:  < 150KB first-load JS (gzipped)
Font load:    Satoshi variable woff2 < 50KB, preloaded
Images:       All WebP, lazy-loaded below fold, priority on hero
TTI:          < 3s on 3G throttled
```

## Data layer

### Leads table (Supabase)
```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text,        -- 'ai-system' | 'custom-software' | 'automation' | 'other'
  budget_range text,        -- '<25k' | '25k-50k' | '50k-100k' | '100k+'
  timeline text,            -- 'asap' | '1-3months' | '3-6months' | 'exploring'
  message text,
  source text,              -- page they submitted from
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz default now()
);
```

### Lead flow
```
1. User fills multi-step form → client-side validation (Zod)
2. Submit → Next.js Server Action
3. Server Action:
   a. Insert into Supabase leads table
   b. Send acknowledgment email via Resend (instant)
   c. Send notification email to Arun via Resend
   d. Send WhatsApp notification via webhook
   e. Return success → redirect to /contact/thank-you
4. Thank-you page shows: confirmation message + Cal.com inline embed for immediate booking
```

### Environment variables
```
NEXT_PUBLIC_SITE_URL=https://www.stallwart.in
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@stallwart.in
ARUN_EMAIL=
WHATSAPP_WEBHOOK_URL=
PLAUSIBLE_DOMAIN=stallwart.in
```
