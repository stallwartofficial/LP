# Handoff Instructions & Constraints — Read Before Building

This file governs how Claude Code should operate on this repo. It is not
optional context — treat every constraint below as binding unless the
person (Kanmani) explicitly overrides it in conversation.

## Working mode: propose, don't just execute

- Before any change beyond a small fix, **present 2–3 options with a clear
  best/recommended pick and why**, then ask which to proceed with — don't
  silently choose and ship. This applies to: visual/design changes, new
  features, copy rewrites, architecture changes, and anything touching the
  constraints below.
- Exception: bug fixes, typo corrections, and build-breaking errors — just
  fix those, no need to ask.
- When suggesting improvements unprompted (you're encouraged to), always
  frame as "here's what I'd improve and why, and here are the trade-offs" —
  not a silent rewrite.

## Non-negotiable constraints (do not change without explicit approval)

1. **Naming**: Company = "Stallwart" (correct spelling, double-L). Product =
   "Extrovert AI". Structure is company-led: Stallwart is the hero brand,
   Extrovert AI is the product introduced within it. Do not swap this
   structure or the spelling.
2. **Tagline**: "Built Beyond." — exact wording, exact punctuation.
3. **B2B only** — no B2C messaging, flows, or pricing tiers. ICP is sales
   teams, SMB and Enterprise, US + UAE.
4. **CTA verb**: "Book a Demo" used consistently everywhere — don't mix in
   "Book a Call," "Start Free," "Contact Us," etc.
5. **Palette**: Black/near-black base, gold accent, cream/warm-white text —
   sampled from the provided logo. No pure white backgrounds, no departure
   from this three-tone identity without approval.
6. **No demo widget / fake chat simulation in the hero** — the animated
   pipeline visualization is the agreed wow-moment. Don't add a simulated
   AI chat demo without asking first.
7. **Testimonials & logos — the most important constraint in this file**:
   this is a **pre-launch product**. Testimonials are illustrative and
   role/industry-attributed (e.g. "VP of Sales, Mid-Market SaaS"), NOT real
   named companies, NOT fabricated named companies. Logo marquee uses
   generic placeholder marks, not real or fake-real brand logos. This was a
   deliberate legal/risk decision (deceptive advertising exposure under
   FTC/UAE consumer protection rules on unverified claims). **Do not add
   named-company testimonials or real-looking logos until the person
   supplies actual customer data and explicitly confirms it's real and
   approved for use.** If asked to "make testimonials more realistic," push
   back the same way this build did — offer the tradeoff, don't just comply.
8. **No RTL / Arabic localization** — confirmed out of scope for v1.
9. **Depth over breadth** — 3 case studies (SaaS Sales, Agencies, SMB
   Market), fully developed, rather than adding more thin ones. Don't add a
   4th+ industry without checking first.
9a. **Site structure is multi-page, not single-page-with-anchors.** Story,
    Offer, Case Studies, and Contact are real standalone routes (`/story`,
    `/offer`, `/case-studies`, `/contact`). Home shows condensed teaser
    versions of each, linking out to the full page — the enterprise B2B
    pattern. Nav menu: Our Story · What We Offer · Case Studies · Blog ·
    Contact, with "Book a Demo" as a separate CTA button (not a nav link).
    Don't collapse this back into anchor sections on one page.
10. **Accessibility is non-negotiable** — semantic HTML, keyboard nav,
    visible focus states, WCAG AA contrast in both themes,
    `prefers-reduced-motion` fallback on every animation. Never trade this
    away for a visual effect.
11. **Both light and dark theme, always** — never ship a change that only
    looks right in one theme.
12. **No secrets in client-side code** — anything shipped to the browser is
    public. API keys/tokens stay server-side only.
13. **Data-folder-driven content** — content that changes (copy, offerings,
    testimonials, case study index) lives in `data/*.ts`, never hardcoded
    inline in components. Preserve this pattern for any new content.

## Explicitly open / awaiting real input (safe to build around, not to fabricate)

- Real contact email/phone/address (`data/site.ts`)
- Real customer testimonials + logos (`data/testimonials.ts`)
- Real case study narrative content (`app/case-studies/[slug]/page.tsx`)
- Demo request webhook destination (`app/api/demo-request/route.ts`)
- OG social share image (`public/images/og-cover.png`)
- Blog scaffold (route exists in nav, page not yet built)

When touching any of the above, use clearly marked placeholders and flag
what's still needed — don't invent real-sounding facts to fill gaps.

## When in doubt

Ask. Kanmani prefers being asked a sharp, specific question with
recommended options over Claude Code guessing and needing a redo — same
working style used to build this v1.
