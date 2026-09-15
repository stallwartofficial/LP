# 01 — Design System

## Design DNA
Not a dark SaaS template. Not a startup landing page. The visual identity of a company that engineers things that work — and knows it.

**Aspirational references and what we steal from each:**
- **Apple** — one idea per viewport. Massive whitespace (128px+ section gaps). Scroll-triggered reveals with one orchestrated moment per section, not scattered fade-ins. Product IS the visual. Typography does the heavy lifting — no decoration needed.
- **Notion** — warm but precise. Generous breathing room. Flat nav hierarchy. Clear product demonstrations over marketing fluff. Approachable without sacrificing professionalism.
- **Clay.global** — bold ownable visual identity (their claymation). Case studies ARE the portfolio (shown inline, not on a separate page). Client logo strip. Distinctive, not safe. Services shown with real project images, not icons.
- **Apollo.io** — proof-density (600K+ companies, compliance badges, metrics everywhere). "Ask AI about us" in footer. FAQ section structured for AEO. Inline hero signup/CTA. Role-based persona pages.
- **Explee** — dead-simple hero CTA. "Give us your problem → we solve it." Testimonials doing conversion work. Minimal friction.

**Stallwart's synthesis:** Apple's discipline + Clay's distinctiveness + Apollo's proof density + Explee's simplicity. One unforgettable visual signature (the living architecture viz), everything else disciplined and spacious.

## The signature move
A living, breathing visualization of the 4-layer architecture (Intelligence → Orchestration → Governance → Production) as the hero's centerpiece. Not a static diagram. Not a lottie animation. A real-time, interactive node graph that pulses — showing data flowing through layers. This IS the brand. When someone remembers Stallwart, they remember this visual. Like Clay's claymation landscape or Stripe's gradient mesh — ownable, not copyable.

## Color palette

### Philosophy
Every AI company uses: neon green, lime, electric purple, or gradient meshes. Stallwart's color says "engineering precision, premium trust." The palette is built around deep slate and warm amber — the combination of midnight workshop and gold-standard output.

### Dark mode (primary, ship first)
```css
:root {
  /* Foundations */
  --void:           #050507;    /* deepest background — not pure black, has depth */
  --surface-1:      #0C0C10;   /* primary surface — cards, nav */
  --surface-2:      #14141A;   /* elevated surface — modals, dropdowns */
  --surface-3:      #1C1C24;   /* highest elevation — hover states, active cards */

  /* Amber accent — the signature */
  --amber:          #E8A430;   /* primary accent — CTAs, links, focus */
  --amber-bright:   #F2B841;   /* hover state */
  --amber-dim:      #E8A43020; /* 12% opacity — subtle highlights, tag bgs */
  --amber-glow:     #E8A43040; /* 25% opacity — focus rings, active borders */

  /* Text */
  --text-1:         #EDEDEF;   /* primary text — not pure white, softer on dark bg */
  --text-2:         #8E8E96;   /* secondary — captions, metadata */
  --text-3:         #5A5A62;   /* muted — placeholders, disabled */

  /* Structural */
  --border:         #1C1C24;   /* default borders */
  --border-active:  #E8A43033; /* active/focus borders */
  --divider:        #14141A;   /* section dividers */

  /* Functional */
  --positive:       #34D399;   /* success states only */
  --negative:       #F87171;   /* error states only */
  --info:           #60A5FA;   /* info states only */
}
```

### Light mode (secondary — build after dark ships)
```css
:root[data-theme="light"] {
  --void:           #FAFAF9;
  --surface-1:      #FFFFFF;
  --surface-2:      #F5F5F4;
  --surface-3:      #E7E5E4;
  --amber:          #B45309;   /* darker amber for light bg contrast */
  --amber-bright:   #92400E;
  --text-1:         #0C0C10;
  --text-2:         #57534E;
  --text-3:         #A8A29E;
  --border:         #E7E5E4;
}
```

### Why amber, not blue/green/purple
- Blue = every B2B SaaS ever. Green = "AI startup." Purple = "creative agency." Orange = too casual.
- Amber = gold = premium engineering output. Think: the warm glow of a precision instrument. Signals: trust, craftsmanship, value.
- Nobody in the AI engineering space uses amber. It's immediately distinctive.
- Passes WCAG AA on both dark (#E8A430 on #050507 = 8.2:1) and light backgrounds.

## Typography

### Font stack
```css
--font-display:  "Satoshi", system-ui, sans-serif;
--font-body:     "Satoshi", system-ui, sans-serif;
--font-mono:     "JetBrains Mono", "Fira Code", monospace;
```

### Why Satoshi
- Not Inter (every engineer's default). Not the serif-display trend (Clay already owns that lane).
- Satoshi is geometric, modern, reads technical — but has personality. The 'a' and 'g' have character. It doesn't look like a template.
- Variable font: one file, all weights. Performance win.
- Free via fontshare.com (Indian foundry — bonus brand alignment).

### Type scale
```css
/* Fluid type — clamp() for responsive without breakpoints */
--text-xs:     clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);     /* 11-12px */
--text-sm:     clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem);    /* 13-14px */
--text-base:   clamp(0.9rem, 0.85rem + 0.25vw, 1rem);        /* 14-16px */
--text-lg:     clamp(1rem, 0.9rem + 0.5vw, 1.125rem);        /* 16-18px */
--text-xl:     clamp(1.15rem, 1rem + 0.75vw, 1.5rem);        /* 18-24px */
--text-2xl:    clamp(1.4rem, 1.1rem + 1.5vw, 2rem);          /* 22-32px */
--text-3xl:    clamp(1.75rem, 1.25rem + 2.5vw, 2.75rem);     /* 28-44px */
--text-4xl:    clamp(2.25rem, 1.5rem + 3.75vw, 3.75rem);     /* 36-60px */
--text-hero:   clamp(2.75rem, 1.75rem + 5vw, 5rem);          /* 44-80px */
```

### Type rules
- **Hero headline:** Satoshi Bold (700), tracking -0.03em, --text-hero. Multiline OK. Never color-accent a single word — the amber accent lives in the CTA button, not sprinkled in headlines.
- **Section headings:** Satoshi Semibold (600), --text-3xl, tracking -0.02em.
- **Body:** Satoshi Regular (400), --text-base, line-height 1.7, max-width 68ch.
- **Mono:** JetBrains Mono 400, --text-sm. Only for: code snippets, architecture layer labels, technical metadata. Never decorative.
- **No eyebrow labels.** No "OUR SERVICES" or "WHAT WE DO" above headings. The heading IS the label.
- **No numbered markers (01, 02, 03)** unless content is genuinely sequential. The architecture layers ARE sequential — that's the one place they belong.

## Spacing
```css
--space-1:   0.25rem;   /* 4px */
--space-2:   0.5rem;    /* 8px */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-6:   1.5rem;    /* 24px */
--space-8:   2rem;      /* 32px */
--space-12:  3rem;      /* 48px */
--space-16:  4rem;      /* 64px */
--space-24:  6rem;      /* 96px */
--space-32:  8rem;      /* 128px */
--space-40:  10rem;     /* 160px */
```

- Section vertical padding: --space-32 (128px desktop), --space-16 (64px mobile)
- Content max-width: 1200px
- Side padding: --space-8 desktop, --space-4 mobile
- Never full-bleed text. Always contained.

## Layout grid
- 12-column, 1200px max-width, 24px gutters
- Content zones: narrow (6-col, ~580px) for text-heavy, wide (10-col, ~970px) for featured, full (12-col) for hero/architecture viz
- Mobile: single column, 16px side padding
- No CSS Grid template areas — use flexbox for simpler sections, grid for complex layouts

## Border radius
```css
--radius-xs:   4px;    /* badges, tags */
--radius-sm:   6px;    /* buttons, inputs */
--radius-md:  10px;    /* cards */
--radius-lg:  16px;    /* featured cards, modals */
--radius-full: 9999px; /* pills, avatars */
```

## Elevation (dark mode — color-based, not shadow-based)
Dark mode depth comes from surface color stepping, not box-shadows. Shadows are invisible on dark backgrounds.
```
Level 0: --void (deepest)
Level 1: --surface-1 (cards, nav)
Level 2: --surface-2 (elevated cards, dropdowns)
Level 3: --surface-3 (hover, active states)
```
On hover: card goes from surface-1 → surface-2 + border-active. 150ms ease-out.

Light mode CAN use subtle shadows:
```css
--shadow-sm:  0 1px 3px rgba(0,0,0,0.06);
--shadow-md:  0 4px 12px rgba(0,0,0,0.08);
--shadow-lg:  0 12px 32px rgba(0,0,0,0.12);
```

## Components

### Buttons
```
Primary:   bg amber, text void, radius-sm, padding 14px 28px, font-weight 600, text-sm uppercase tracking 0.05em
           Hover: bg amber-bright, subtle scale(1.02) 150ms
Secondary: bg transparent, border 1px amber-glow, text amber, same padding
           Hover: bg amber-dim
Ghost:     bg transparent, text text-2, no border
           Hover: text text-1, bg surface-2
```
- No gradient buttons ever.
- No "→" appended to text.
- Primary CTA always amber. Only ONE primary button visible per viewport.

### Cards
- bg surface-1, radius-md, border 1px border, padding --space-6
- Hover: border border-active, bg surface-2, transition 200ms ease-out
- NO identical card grids. Vary: featured card (larger, 2-col span) vs regular cards. Or use list layout instead.
- Case study cards: image top (16:9), content below. Not equal-height forced grids.

### Form inputs
- bg void, border 1px border, radius-sm, padding 14px 16px, text text-1
- Focus: border amber, ring 3px amber-glow, outline none
- Error: border negative, helper text below in text-sm negative
- Labels: above input, text-2, text-sm, font-weight 500, margin-bottom space-2
- Never floating labels. Never placeholder-as-label.

### Navigation
- Fixed top, bg void/90 (with backdrop-blur-xl), border-bottom 1px divider
- Height: 64px desktop, 56px mobile
- Logo (lion mark) left, nav links center, "Book a Call" (primary button) right
- Mobile: hamburger → full-screen takeover (not drawer). bg void, centered nav links, CTA at bottom.
- Scroll behavior: hide on scroll-down, show on scroll-up (saves mobile viewport).

### Testimonial cards
- NOT a carousel. Stacked masonry layout (different heights based on quote length).
- bg surface-1, radius-md, border 1px border
- Quote in text-lg, italic NO — just regular weight, let the words carry it
- Name + title in text-sm, text-2
- Company name in text-sm, amber (subtle brand reinforcement)
- Optional: small company logo/avatar

## Iconography
- Phosphor Icons (not Lucide — everyone uses Lucide now)
- Style: regular weight (not thin, not bold)
- Size: 20px inline, 24px standalone, 32px feature icons
- Color: text-2 default, amber when interactive or featured

## Image treatment
- All images: radius-md, no border
- Case study screenshots: aspect-ratio 16:9, subtle 1px border (border) to separate from bg
- Founder photo: radius-lg (not circle — circles are overused), natural crop
- All images: WebP, quality 80, lazy-loaded, with descriptive alt text
- NO stock photos. NO AI-generated illustrations. Real screenshots, real photos, real diagrams.

## The anti-template checklist (verify before shipping)
- [ ] No single-word color accents in headlines
- [ ] No ALL-CAPS eyebrow labels
- [ ] No "01 / 02 / 03" markers on non-sequential content
- [ ] No identical card grids
- [ ] No gradient washes as decoration
- [ ] No "→" on buttons or links
- [ ] No cream/terracotta color anywhere
- [ ] No tracked-out uppercase nav links
- [ ] Amber accent appears in exactly 3 places: CTA buttons, interactive elements, architecture viz accents. Nowhere else.
