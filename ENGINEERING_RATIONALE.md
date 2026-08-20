# Engineering Rationale — Stallwart Landing Page

Author: Claude (the engineer who built this)
Purpose: a PRD written backwards — not "what to build" but "what was built and
why." If you inherit this codebase, read this first. It explains the decisions
that the code itself can't, so you don't undo something on purpose that looks
like an accident.

This is a living document. When you change a decision below, update the entry
rather than deleting it, so the reasoning trail survives.

---

## 1. What this is

A marketing site for **Stallwart** — an AI and software engineering *company*,
not a single product. The site's whole job is to make a serious, enterprise
buyer believe this is a company that ships AI into production and stands behind
it. Everything below serves that one goal: *credibility over flash.*

Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict),
Tailwind CSS v4 (CSS-first `@theme`). See `README.md` for the mechanical stack;
this file is the *why*.

---

## 2. The core positioning decision

**Stallwart is the company. Extrovert AI, Sillage, and Custom AI Engineering are
its offerings.** This sounds obvious, but the site was originally built as if
Stallwart were a single product, and correcting that drove a full restructure.

Consequences that live in the code:
- The information architecture is **company → portfolio → offering**, never
  "product features." One `h1` per route, one subject per route.
- All three offerings are data (`data/offerings.ts`). Adding one propagates to
  the portfolio, its detail page, the sitemap, the footer, the contact form,
  and JSON-LD automatically. **Content lives in `data/`, never hardcoded in
  components.** This is the single most important convention here.
- The hero and portfolio each state the offering set *once*. Earlier versions
  duplicated it (a hero "what we build" strip plus the portfolio section); the
  duplication was removed because repetition reads as thin, not thorough.

---

## 3. The hero — the most-iterated surface

The hero went through several honest iterations. The final decision:

**A centered, text-only, enterprise header.** Tagline, headline, subhead, and
two CTAs, all centered, with the trust strip below — "lands with nothing but
text."

Why we ended here:
- An earlier version paired the headline with a technical "schematic" diagram
  (`Blueprint`/`CadField`). It looked designed-for-the-sake-of-it and competed
  with the claim. A strong headline is the hero; the diagram was noise. It was
  removed (and its now-dead components deleted in cleanup — see §10).
- **Headline:** "AI systems engineered to run / unattended, audited, and
  *trusted*." Split into two lines on a pipe (`|`) in `data/site.ts`. Line one
  sits at weight 300, line two at 500 — hierarchy by **weight contrast**, not
  color. Exactly one word (*trusted*) is gold italic.
  - We tried a two-tone treatment (muted grey counter-line) and a hollow
    `-webkit-text-stroke` outline. Both read as *tacky in light mode* — the
    stroke looked hollow, the grey looked washed. Weight contrast is the premium
    solution and works identically in both themes. The old `.text-outline`
    class was removed.
  - The gold emphasis word can fall on **either** line — `Hero.tsx` finds it
    wherever it is (`renderLine`). Don't assume it's on line one.
- **Tagline:** "From first principles to production." This is the *hero*
  tagline only. It is deliberately decoupled from `site.tagline` ("Built
  Beyond."), which still drives the footer, ContactBanner, and OG images.
  Changing `site.tagline` would change all of those — that's why the hero tagline
  is a separate field (`site.hero.tagline`). **Do not re-merge them.**
- **One line per clause:** the headline size ceiling (`.text-hero` clamp in
  `globals.css`) is tuned so each clause holds a single line. Centered full-width
  gives it room; if you make the headline share a column again, re-check wrapping.

---

## 4. Typography and the design system

- Three faces via `next/font/google`: **Fraunces** (display), **IBM Plex Sans**
  (body), **IBM Plex Mono** (labels/data). Plex over Inter deliberately — Inter
  is the default every generated site reaches for and has no point of view; Plex
  was designed as an engineering company's voice.
- **Fraunces loads only the `opsz` axis.** It previously loaded `SOFT` + `WONK`
  too, for an "editorial cut," but nothing in the CSS ever set them (the
  animation that once did was removed). They were dead weight on the
  critical-path font that renders the LCP element. Trimming them is invisible
  and faster. Don't re-add axes you don't actually use.
- **Everything is CSS-token-driven** (`app/globals.css`): a fluid `clamp()` type
  scale, light + dark palettes built with `color-mix(in oklab)`, shared easing.
  Components consume CSS variables, never literal colors, so both themes stay in
  sync. Text uses AA-contrast-safe tokens (`--accent-text`); the brighter accent
  is for fills/borders only. **Contrast is measured, not eyeballed.**
- **No em dashes** anywhere in user-facing copy, including titles. Use a comma,
  colon, full stop, or middot. (Enforced by convention, stated in `data/site.ts`.)

---

## 5. Animation — CSS-first, zero JS runtime

There is **no animation library** in the bundle (framer-motion was removed).
Scroll reveals use native `animation-timeline: view()` (runs on the compositor);
first-paint reveals use `@starting-style`. Everything is cancelled under
`prefers-reduced-motion`, so nothing can be stuck at opacity 0.

Why: framer-motion shipped the whole library to fade a few elements in, and it
showed up in Lighthouse as blocking time and LCP delay. The CSS replacements
degrade to visible content where unsupported. A heading "weight-in" animation
that tweened `font-variation-settings` was also removed — animating it forces a
full text relayout every frame (forced reflow); the effect was near-invisible and
the cost was real.

---

## 6. Responsive strategy — reorder, don't duplicate

Pages like **Story** and **Contact** are a single set of grid children that
reorder with CSS `order` on mobile and snap to explicit
`col-start`/`row-start`/`row-span` placement on desktop. One markup serves every
breakpoint — no duplicated mobile/desktop blocks.

The mobile order was chosen for the reader, not the source order:
- **Story (mobile):** heading → portrait → article. The title frames the page,
  then Nuras's photo, then the long-form.
- **Contact (mobile):** heading → **form** → supporting detail. The form is the
  urgent action, so it comes right after the title, above the "what happens
  next" copy.

Both keep the two-column desktop layout unchanged (article/detail left, portrait/
form sticky right).

---

## 7. The founder narrative

Third person, attributed by name and role. The long-form lives on `/story`
(`components/Story.tsx`); the home page (`StoryTeaser`) reflects it in a short
teaser with a "Read the full story" link — it does **not** repeat the full text.

The thesis the copy is built around: *"the AI industry has a confidence problem,
not a capability problem."* Systems get sold on a convincing demo; the gap
between that and real reliability becomes the buyer's problem after the invoice
clears. Stallwart's standard — reliable, honest, scalable — is the answer to
that, and the copy states it as a standard, not a slogan.

Note for whoever owns the content: the founder narrative states specific facts
(five years, a SaaS knowledge platform still in production). Confirm these are
accurate before they go fully public.

---

## 8. SEO / AEO — held at 100 on purpose

Structured data (`lib/seo.ts`) is derived from `data/`, so schema can't drift
from rendered copy. Every route sets a canonical URL and has exactly one `h1`.
OG images are generated at build by `next/og`. `public/llms.txt` is the
answer-engine fact sheet (served at the URL — not dead code, don't delete it).

**The rule that keeps the on-page score at 100:** the `h1` words must appear in
the page body, and the meta description must not contradict the `h1`. When the
hero headline changed, the subhead and meta description were updated in the same
commit so all three still echo each other ("AI systems engineered to run
unattended, audited, and trusted"). If you change the headline, change the
subhead and `site.description` with it, or the "H1 words not in text" warning
returns and the score drops.

External-factors / backlink score is off-page (other sites linking in) and
**cannot be fixed in this repo** — don't chase it in code.

---

## 9. Performance decisions

The site is fast because most of it is static server components with no client
JS. Specific choices:
- **Server components by default.** Only `Navbar`, `ThemeToggle`, `CadField`
  (removed), and `Contact` are `"use client"`. Page copy is server-rendered so
  it's in the initial HTML and crawlable.
- **Critical-path discipline:** the LCP element on mobile is the hero *text*, so
  the font that renders it (Fraunces) is kept as light as possible (§4).
- **Below-the-fold images are lazy.** The home `StoryTeaser` portrait was eager
  but sits far below the mobile fold; it's now `loading="lazy"` so its ~137KB
  leaves the critical path. The `/story` portrait, which is near the top, stays
  eager.
- **browserslist is already modern** (Chrome 111+, Safari 16.4+), so Next drops
  most legacy transforms. The residual "legacy JS" Lighthouse flags is Next's
  own framework chunk, not safely removable — we did not chase it.
- Known-good mobile metrics at last check: FCP ~1.1s, TBT ~10ms, CLS 0. LCP and
  Speed Index are the remaining levers, both font/render bound.

**Every design change is verified in both themes and, when layout changes, at
mobile + desktop, before it ships.**

---

## 10. Brand / logo

The HD logo is a full lockup (winged emblem + STALLWART + BUILT BEYOND). We use
only the **emblem**, cropped out of the lockup:
- `public/images/logo-mark.png` — 19KB optimized retina emblem, used in the
  navbar (`h-9`) and footer.
- `app/icon.png` (512px) + `app/favicon.ico` (16/32/48) — browser/tab icons.
- The 2.2MB source lockup lives in `brand/` and is **gitignored** — kept locally
  as the source of truth, never shipped to the browser or the repo.

Placement is deliberate and restrained: **navbar + footer + favicon** only. A
mark earns authority through scarcity; it is *not* repeated inside body sections.
Footer social links are **icon-only** (the icon already is the LinkedIn/X logo —
a text label beside it was redundant), with `aria-label`s for screen readers.

---

## 11. Legal pages

`/privacy` and `/terms` are static pages (`app/privacy`, `app/terms`), in the
sitemap and linked from the footer bottom bar. Governing context: India (DPDP)
with US operations noted; contact `hello@stallwart.in`.

**These are plain-language templates, not legal advice** — flagged as such in the
code comments. Have counsel review before relying on them.

---

## 12. Cleanup (post-iteration)

After many versions, dead weight was removed: four orphaned components from the
old schematic hero (`Blueprint`, `CadField`, `EngineeringTexture`, `SystemFlow`),
the five Next.js starter SVGs, the scaffolding docs, and the CLAUDE_CODE
instructions file. The brand source was untracked (gitignored). `next build` and
a full `eslint .` are clean; everything removed was unreferenced, so there was no
UI or runtime change.

---

## Conventions cheat-sheet (for the next engineer)

- **Single responsive source — the rule.** There is no separate mobile site.
  Every copy and content change lives in shared `data/` and components and
  therefore renders at **every** breakpoint automatically. Desktop and mobile
  differ only in *layout* (how content stacks or reflows), and those differences
  are deliberate and breakpoint-scoped (`sm:` / `lg:` classes, `.op-bento`).
  Never fork content per device; if a change "isn't showing on mobile," it is a
  browser cache, not a missing edit.
- Content changes go in `data/`, not component JSX.
- One `h1` per route; keep it in step with the subhead and meta description.
- No em dashes in user-facing copy.
- Consume CSS variables, never literal colors. Verify both themes.
- Don't re-add the schematic to the hero, don't re-merge the hero tagline with
  `site.tagline`, don't re-add unused font axes.
- Below-the-fold images: lazy. Above-the-fold / LCP: eager and light.
- Keep the logo to navbar + footer + favicon.
