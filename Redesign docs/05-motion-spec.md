# 05 — Motion Spec

## Philosophy
Apple rule: one orchestrated moment per section. Not "everything fades in on scroll." Motion answers actions or draws attention to ONE thing. Reduced-motion users see instant state, no compromise.

## Global settings
```css
:root {
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   500ms;
  --duration-reveal:  800ms;
  --ease-out:        cubic-bezier(0.16, 1, 0.3, 1);  /* smooth deceleration */
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot */
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Micro-interactions (CSS only, no Framer Motion)

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Button primary | Hover | scale(1.02) + bg amber-bright | --duration-fast |
| Button primary | Active/press | scale(0.98) | 100ms |
| Card | Hover | border → border-active, bg surface-1 → surface-2 | --duration-fast |
| Nav link | Hover | text-2 → text-1 | --duration-fast |
| Form input | Focus | border → amber, ring 3px amber-glow | --duration-fast |
| Mobile nav | Open | full-screen fade-in from opacity 0 | --duration-normal |
| Mobile nav links | Open | stagger in from bottom, 50ms delay each | --duration-normal |
| Tooltip/dropdown | Enter | opacity 0→1, translateY(4px→0) | --duration-fast |

## Scroll reveals (Framer Motion — use sparingly)

### Hero section (the one orchestrated load moment)
```
Sequence on page load (not scroll):
1. Background viz fades in:        0ms → 800ms, opacity 0→0.15
2. Headline slides up:             200ms → 700ms, translateY(20px→0), opacity 0→1
3. Subline fades in:               400ms → 800ms, opacity 0→1
4. CTA button scales in:           600ms → 900ms, scale(0.95→1), opacity 0→1
5. Industry ticker fades in:       800ms → 1100ms, opacity 0→1
```
This is THE orchestrated moment. Nothing else on the page has a load sequence.

### Section reveals (scroll-triggered)
- **Only the section heading** animates on scroll-into-view
- translateY(12px→0), opacity 0→1, --duration-reveal, --ease-out
- Trigger: when section top hits 80% viewport height
- Content below heading: already visible (no staggered card reveals — that's the template tell)
- Once revealed, stays revealed. No re-animation on scroll back.

### Architecture visualization (the signature)
- On scroll into viewport: layers light up sequentially, 200ms stagger
- Layer 1 (Intelligence): amber glow pulse
- Layer 2 (Orchestration): amber glow pulse, 200ms later
- Layer 3 (Governance): 400ms later
- Layer 4 (Production): 600ms later
- After all lit: subtle continuous particle flow between layers (CSS animation, low-intensity)
- On hover/click a layer: that layer scales slightly, description panel slides in

### Testimonials
- No animation. They're static masonry. Let the words do the work.

### Final CTA section
- Headline: subtle scale from 0.98→1 on scroll, --duration-slow
- Button: no animation. Just sits there, amber, waiting.

## Architecture visualization (detailed)
This is the hero's centerpiece and the brand's visual signature.

### Desktop
- Canvas: 600×400px centered, or full-width at 40% viewport height
- 4 horizontal layers, connected by flowing particle lines
- Each layer: rounded rectangle (radius-md), border 1px border, label in mono font
- Particles: small dots (2px) flowing top→bottom through layers, color amber at 30% opacity
- Idle state: particles flow slowly, all layers at base opacity
- Hover/click state: selected layer glows (amber border, amber-dim bg), others dim to 50% opacity
- Connection lines between layers: thin (1px), amber at 15% opacity

### Mobile
- Vertical stack of 4 layers
- No particle animation (performance)
- Tap to expand layer description
- Static connecting lines between layers

### Fallback (reduced motion / low-power)
- Static diagram, all layers visible, no particles
- Still looks good — just no movement

## Page transitions
- None. Instant navigation. Page transitions add perceived latency and are a template tell. Let Next.js handle fast route transitions natively.

## Loading states
- Form submit: button text changes to "Sending..." + subtle spinner (amber, 16px)
- Page load: no skeleton screens for static content. Only for async data (if any).
- Image loading: blur-up placeholder → sharp image (Next.js Image handles this)

## What NOT to animate
- Logos in the proof strip (no hover scale)
- Footer (nothing moves)
- Body text (never)
- Navigation transitions between pages
- Cards appearing in grids (no stagger entrance)
- Testimonial cards (no slide-in)
- Any element that triggers more than once per page visit
