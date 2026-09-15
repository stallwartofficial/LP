# 06 — Hero Implementation

## What the hero does
The hero is the entire brand in one viewport. It answers: "Who is Stallwart and why should I care?" in under 5 seconds. No scrolling required to understand the company.

## Layout (desktop, 1440px viewport)
```
┌─────────────────────────────────────────────┐
│  [Nav: Logo ---- links ---- Book a Call]    │
│                                             │
│                                             │
│         [Architecture viz at 15%            │
│          opacity as background]             │
│                                             │
│      AI systems engineered to run           │
│      unattended, audited, and trusted.      │
│                                             │
│      [text-lg subline, 60ch max]            │
│                                             │
│      [■ Book a Call]  [See Our Work]        │
│                                             │
│                                             │
│  Built for teams in: SaaS · Fintech · ...  │
│                                             │
└─────────────────────────────────────────────┘
```

## Layout (mobile, 375px)
```
┌──────────────────────┐
│ [Logo]    [☰] [CTA]  │
│                      │
│                      │
│ AI systems           │
│ engineered to run    │
│ unattended, audited, │
│ and trusted.         │
│                      │
│ [subline, 2 lines]   │
│                      │
│ [■ Book a Call]      │
│ [  See Our Work  ]   │
│                      │
│ Built for: SaaS ···  │
│                      │
└──────────────────────┘
```

## Architecture visualization (the background)

### Implementation: Canvas/SVG (not Three.js — too heavy for a background)
Use a `<canvas>` element or inline SVG with requestAnimationFrame for the particle system.

### Structure
```
Layer 1: Intelligence     ──┐
Layer 2: Orchestration    ──┤  connected by
Layer 3: Governance       ──┤  flowing particles
Layer 4: Production       ──┘
```

### Technical approach
```tsx
// Component: ArchitectureViz.tsx
// - Renders 4 rounded rectangles (layers) on canvas
// - Particles (2px circles) flow between layers along bezier paths
// - Everything renders at low opacity (15%) behind hero text
// - On scroll past hero, opacity increases to full in architecture section
// - Uses requestAnimationFrame, pauses when not in viewport (IntersectionObserver)
// - Canvas resolution: match device pixel ratio for crisp rendering
// - Fallback: static SVG diagram for reduced-motion or low-power devices
```

### Colors on canvas
```
Layer rectangles: rgba(232, 164, 48, 0.08)  -- amber at 8%
Layer borders:    rgba(232, 164, 48, 0.15)  -- amber at 15%
Layer labels:     rgba(237, 237, 239, 0.3)  -- text-1 at 30%
Particles:        rgba(232, 164, 48, 0.25)  -- amber at 25%
Connection paths: rgba(232, 164, 48, 0.06)  -- amber at 6%
```

### Performance
- Canvas draws only when in viewport (IntersectionObserver)
- Particle count: max 40 desktop, 0 mobile (static on mobile)
- FPS target: 30fps (not 60 — it's a subtle background, not a game)
- Total JS for viz: < 5KB gzipped
- Never block main thread — use requestAnimationFrame, not setInterval

### Scroll behavior
- Hero viewport (0-100vh): viz at 15% opacity behind text
- Scroll 100vh-200vh: viz opacity transitions from 15% → 100% as architecture section appears
- Architecture section: viz is now the main content, fully visible, interactive
- This creates a seamless transition — the background BECOMES the featured section

## Hero text

### Headline options (test — pick the one that converts)
1. "AI systems engineered to run unattended, audited, and trusted." (current — strong)
2. "We build what AI can build. You own everything."
3. "Engineering that ships AI to production — not to a demo."

### Subline
"Production-grade AI systems and custom software for the work that can't be solved off the shelf."

### CTA buttons
- Primary: "Book a Call" → /contact (amber button)
- Secondary: "See Our Work" → /work (ghost button)

## Industry ticker
- Auto-scrolling horizontal text: "SaaS · Fintech · Healthcare · Logistics · Marketplaces · Operations · B2B"
- CSS animation (translateX), infinite loop, 30s duration
- Color: text-3 (muted)
- Pauses on hover
- Preceded by "Built for teams in" label in text-3

## Sticky mobile CTA
- After scrolling past hero, a sticky bottom bar appears on mobile
- bg void/95, backdrop-blur, 56px height
- Contains: "Book a Call" amber button, full-width
- Fades in on scroll past hero, fades out when footer is in view
- z-index above everything except modals

## Favicon set
```
/public/favicon.ico          — 32x32, lion mark silhouette
/public/favicon-16x16.png    — 16x16
/public/favicon-32x32.png    — 32x32
/public/apple-touch-icon.png — 180x180
/public/site.webmanifest     — PWA manifest with theme color #050507
```
