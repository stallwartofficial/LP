# Stallwart, Design Brief

Written as a handoff document. If you are an AI or a designer picking this up
cold, read this before touching anything. It is my understanding of what we are
building, stated plainly, including the parts that are still unresolved.

Punctuation note: this site uses no em dashes anywhere, including page titles.
That rule applies to this document too.

---

## 1. The core

**Stallwart is an AI and software engineering company.** Founded by Nuras.
Serves the United States and the UAE. B2B only.

**Positioning line:** Engineering the impossible into production.
**Tagline:** Built Beyond.

The company builds production grade AI systems, intelligent automation, and
custom software for problems that off the shelf tooling cannot solve. It takes
ambitious ideas from first principles to production.

### The thesis

Businesses rarely fail at strategy. They fail at follow through: the work that
has to happen every day, by someone, on time, and that nobody finds
interesting. The enquiry nobody answered. The draft stuck in review. The
compliance question everyone hoped belonged to someone else.

Stallwart's position is that **follow through is an engineering problem, not a
discipline problem.** You do not fix it by asking people to try harder. You
build systems that carry it whether anyone is watching or not.

The corollary, and the part that differentiates: pointing an unaccountable
model at the problem does not remove the work. It moves the work to whoever now
has to check the output.

### The standard: reliable, honest, scalable

In that order, and it is a specification rather than a slogan.

| Layer | Claim | What it means in practice |
| --- | --- | --- |
| **Reliable** | A system that needs remembering is not finished | Ships to run unattended or it does not ship. Degrades safely, never silently. |
| **Honest** | A system should say what it cannot do | Surfaces uncertainty instead of guessing. Escalates what it should not decide. Auditable, not a black box. |
| **Scalable** | Demos are easy, Tuesdays are hard | Built against malformed data, volume spikes, requests fitting no category. Capacity from the system, not headcount. |

### THE MOST IMPORTANT STRUCTURAL FACT

**Stallwart is a company with a portfolio. It is NOT a single product.**

This was got wrong once already and it cost a full rebuild. Extrovert AI is
**one of three** offerings. Never treat it as a synonym for the company. The
company is the subject of the site; a single offering is the subject only on its
own detail page.

| Offering | Category | Status |
| --- | --- | --- |
| **Extrovert AI** | Product, Revenue. An AI CRM that runs the whole lead lifecycle | **Available** |
| **AI Compliance and Governance** | Service, Assurance. Inventory, document, control, and evidence AI decisions | In development |
| **AI Video Creation** | Service, Production. Video output decoupled from editing hours | In development |

### The shared engineering core

What makes "three systems, one standard" a structural claim rather than a
heading. Every build moves through the same four layers, and each offering
declares which it leans on:

```
INTELLIGENCE  ->  ORCHESTRATION  ->  GOVERNANCE  ->  PRODUCTION
where a           where work         where limits    where it meets
judgement         is routed          are enforced    reality
is made
```

---

## 2. The theme

### Palette, fixed

Three tones. This is the one thing that never changes.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Background | `#f5f1e8` cream | `#0a0a0b` ink | Page ground. **Never pure white.** |
| Foreground | `#0a0a0b` | `#f5f1e8` | Body text |
| Surface | `#efeade` | `#121214` | Raised panels, bands |
| Accent, fills | `#c9a24b` gold | `#e6c375` | Borders, dots, button fills |
| Accent, **text** | `#80611c` deep | `#e6c375` | Type only. See below. |

**Critical:** there are two accent tokens for a reason. Brand gold `#c9a24b` is
only **2.13:1** on cream, far below the AA floor. It is for fills and borders.
Any gold **text** in light mode uses `--accent-text`, measured at 5.11:1. Using
a fill token for type is the single easiest way to break accessibility here.

The mindmap extends this: each branch has `--branch-*-fill` and
`--branch-*-text`. Same rule.

### Type

- **Display:** Fraunces, variable, light weights, tight tracking (`-0.018em`),
  `text-wrap: balance`. Editorial and a little literary.
- **Body:** Inter. `line-height: 1.68`.
- **Micro labels:** monospace, 9 to 10px, uppercase, tracked out to `0.14em+`.
  This is what gives diagrams their engineering register.
- **Fluid scale** via `clamp()`, ceiling **60px**.

**On size:** an earlier version topped out at 130px and read as a consumer brand
shouting. Enterprise buyers read confidence as composure. Hierarchy comes from
**weight, colour, and space**, not from raw size. If a heading is not landing,
the answer is rarely "bigger".

### Layout and texture

- Editorial rows and hairline dividers over card grids. Asymmetric where it
  earns attention (bento with one dominant cell, alternating module sides).
- Fluid section rhythm and gutters via tokens, never hardcoded padding.
- **Film grain** overlay across the page. The cheapest thing that stops a flat
  digital surface reading as a template.
- Numbered items, drop caps, pull quotes. Long form should look authored.

### Motion

CSS first. Native `animation-timeline: view()` for scroll reveals, so there is
no JavaScript cost and no observers. Framer Motion only for mount transitions.

Shared micro-interaction vocabulary, applied consistently:
`link-draw` (underline draws itself), `btn-wipe` (gold fills from the left),
`arrow-shift`, `row-nudge`, `card-lift`, `trace-x` / `trace-y` (a signal
travelling a diagram), `node-latch`.

Everything disabled under `prefers-reduced-motion`, and reduced motion must
never hide content. Cancel the animation, do not leave elements at opacity 0.

### Diagrams, the differentiator

Diagrams state **mechanism**, stage by stage. Thin routing lines, small junction
nodes, mono labels, coordinate ticks, one travelling signal. The reference is an
engineering control room schematic or a measured drawing.

Every system diagram shows its **escape hatch** (human escalation, rollback,
human review). Showing the override is a credibility signal, not a caveat.

### Anti-patterns, explicit

These drag the work back into the generic AI aesthetic. Do not reach for them:

- Particle fields, glowing neural networks, floating 3D spheres, orbiting dots
- Stock futuristic gradients, iridescent blur blobs
- **Fake dashboards** or charts of invented numbers
- Centred-stack template layout, uniform three-card grids, everything at `py-20`
- Fade-up on absolutely everything as the only motion idea
- Enormous type standing in for confidence

---

## 3. The constraints, binding

Treat these as non-negotiable unless the owner explicitly overrides them in
conversation.

1. **Naming.** Company is **Stallwart**, double L. Company-led structure.
   Offerings are introduced within it, never in place of it.
2. **Tagline** is exactly `Built Beyond.` Exact wording, exact punctuation.
3. **CTA verb** is `Book a Call`, used consistently. Do not mix in "Book a
   Demo", "Get Started", "Contact Us". (This changed from "Book a Demo"
   deliberately: two of three offerings are pre-launch and you cannot demo what
   is not built.)
4. **B2B only.** No consumer messaging or self-serve pricing tiers.
5. **Palette** is the three tones above. No pure white backgrounds.
6. **No em dashes anywhere**, including page titles. Use a comma, a colon, a
   full stop, or a middot.
7. **Pre-launch honesty.** This is the most consequential constraint.
   - Testimonials are illustrative and role/industry attributed. **Not** real
     named companies and **not** fabricated named companies.
   - Case studies are labelled illustrative scenarios describing mechanism, not
     results from named customers.
   - **No invented metrics.** The production properties on the home page are
     architectural facts checkable by reading the system, with a footnote
     saying exactly that. A statement like "0 steps needing a human reminder"
     was removed because it was a claim about usage we cannot substantiate.
   - In-development offerings are labelled, described in future tense, and
     excluded from `makesOffer` schema.
   - No pricing, no customer counts, no certification claims (no SOC 2, ISO
     27001, HIPAA) until an audit is actually complete.
   - If asked to make proof "more realistic", push back and offer the tradeoff.
8. **Accessibility is non-negotiable.** Semantic HTML, keyboard navigation,
   visible focus, WCAG AA contrast in **both** themes, `prefers-reduced-motion`
   on every animation. Verify by measuring, not by eye. Never trade this for a
   visual effect.
9. **Both themes, always.** Never ship a change that only works in one.
10. **No secrets client side.** Anything shipped to the browser is public.
    Server-only env vars are never prefixed `NEXT_PUBLIC_`.
11. **Content lives in `data/`.** Typed modules are the single source of truth.
    Adding an offering there must propagate to the portfolio, its detail route,
    the sitemap, the footer, the contact form, and JSON-LD automatically.
12. **Depth over breadth.** Three fully developed offerings, not six thin ones.
13. **SEO and AEO are structural, not a bolt-on.** Exactly one `h1` per route,
    a canonical URL on every page, structured data centralised in `lib/seo.ts`
    and derived from `data/` so schema cannot drift from copy. Declarative Q&A
    blocks that emit `FAQPage`, because that is what AI answer engines quote.
    Consolidate namespaces rather than splitting ranking signal (case studies
    live inside `/blog`, with redirects preserving the old URLs).

---

## 4. Voice

Declarative, specific, unhedged. Short sentences carrying real claims.

Banned: leverage, empower, seamless, cutting edge, revolutionary, solutions,
unlock, supercharge. The test: **if a sentence would survive being pasted onto a
competitor's site, it is not saying anything.**

Prefer the mechanism over the adjective. "Follow ups fire on the cadence a
lead's score justifies" beats "powerful automation".

Say the uncomfortable thing when it is true. "It is not available yet, and we
would rather say so than describe something that does not exist" is better
positioning than vagueness, and it is consistent with the Honest pillar.

---

## 5. Open items

Do not invent answers to these.

| Item | Status |
| --- | --- |
| **AI Compliance and AI Video scope** | Copy currently on those pages is drafted from the offering names alone. Marked `TODO(owner)`. Needs sign-off before launch. |
| **Signed founder quote** | Story page attributes the narrative to Nuras by name and role. No words are quoted, deliberately. Supply wording if you want a pull quote. |
| **Real contact details** | Email, phone, address are placeholders in `data/site.ts`. |
| **Domain** | `stallwart.in` assumed. Drives every canonical URL and the sitemap. Confirm. |
| **`DEMO_WEBHOOK_URL`** | Unset. Form accepts submissions and logs a server-side warning that they are going nowhere. |
| **Real testimonials and logos** | Placeholders. The logo marquee's framing was flagged as a deceptive-advertising risk and the owner chose to keep it pre-launch. Revisit at launch. |
| **Positioning gap** | The hero claims custom AI and software engineering, which is broader than the three named systems the rest of the site is organised around. If custom engineering is a real line of business, it likely belongs in the portfolio rather than only in the hero. |
