# Stallwart.in Redesign — Spec Set for Claude Code

## INSTRUCTIONS FOR CLAUDE CODE

**USE THE CAVEMAN METHOD. Minimal tokens. No explanations unless asked. Build, don't talk.**

1. Read all spec files FIRST before writing any code.
2. Ask ALL questions upfront in one batch — not mid-build.
3. Follow the build sequence in `08-build-sequence.md` exactly.
4. Use existing repo as base — strip old design, keep routing/content/deployment.
5. Every line of copy comes from `03-content-copy.md` — no placeholder text. Make texts better only if you feel it is shit
6. Every design token comes from `01-design-system.md` — no ad-hoc colors/fonts.
7. Test at 375px, 768px, 1280px, 1440px after each phase.
8. Always ask when presented with a choice or when you feel the revamp is not better than the current
9. Dont Commit keep it local

## File order (read in this sequence)

1. `00-project-brief.md` — positioning, audience, goals, psychology
2. `01-design-system.md` — palette (amber+void), Satoshi type, spacing, components
3. `02-architecture.md` — Next.js 15 + Vercel, file structure, lead flow, DB schema
4. `07-seo-aeo.md` — schema, metadata, llms.txt, GEO strategy, ebook specs
5. `06-hero-implementation.md` — hero viz, layout, sticky mobile CTA
6. `04-page-specs.md` — every page section-by-section
7. `03-content-copy.md` — all copy, per page, ready to drop in
8. `05-motion-spec.md` — animations (add last)
9. `08-build-sequence.md` — build phases with checkpoints
10. `09-changes-summary.md` — what changes vs current site (reference)

## Key rules

* Positioning: "Stallwart is an AI-first engineering company" — same words everywhere.
* Single CTA: "Book a Call" — no competing actions.
* Dark mode first. Light mode later.
* Mobile-first. Sticky CTA on mobile.
* No Extrovert AI or Sillage on any page except one footer line.
* No placeholder copy ships.

