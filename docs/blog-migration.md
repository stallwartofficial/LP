# Blog migration (structural pass)

Structural migration of the blog to the AI-first positioning. **No articles were
rewritten** in this pass; content rewrites/reframes are a separate task.

## Done
- **1A www canonical**: apex `stallwart.in` 301 → `www.stallwart.in` (`next.config.ts`).
- **1B legacy products**: `/offer/extrovert-ai`, `/offer/sillage` → `/offer`
  (already present); fixed a redirect **chain** (`/offer/ai-compliance-office`
  now → `/offer` directly, not via `/offer/sillage`).
- **1C orphan**: `/blog/speed-to-lead-is-the-whole-funnel` → `/blog`.
- **2 content redirects** (301) + removed from listing/sitemap/params:
  `what-is-an-ai-sdr` → `ai-sdr-vs-human-sdr-when-each-wins`;
  `how-much-does-an-ai-sdr-cost` → `how-much-does-custom-ai-development-cost`;
  `ai-gtm-engine-autonomous-outbound` → `ai-sdr-vs-human-sdr-when-each-wins`;
  `what-custom-ai-development-costs-fixed-price-per-phase` → `how-much-does-custom-ai-development-cost`.
- **3 retire** (Option B, delete + 301 → `/blog`): `aeo-vs-seo-vs-geo`,
  `geo-checklist-get-cited-by-ai-answers`, `ai-seo-what-changed-in-2026`.
- **4 merge**: fixed-price-vs-hourly argument + discovery-sprint Q&A folded into
  `how-much-does-custom-ai-development-cost` (no duplication).
- **6 categories**: `BlogCategory` taxonomy + slug→category map in `data/blog.ts`.

## Phase 5 — legacy reference scan (no auto-replace)
No prose mentions of Extrovert / Sillage / Milo in any article body, and no
"our SDR / our outbound platform" phrases anywhere. All references are
structural or comments:
- `data/blog.ts`: `offering: "extrovert-ai"` (10), `offering: "sillage"` (4) —
  internal post→offering wiring; drives the `BlogCardGrid` label only.
- `data/offerings.ts`: the Extrovert AI (~241–378) and Sillage (~424–487)
  definitions. Pages are redirected; data still read by the blog `offering`
  coupling.
- Comments: `components/Architecture.tsx:5`, `data/offerings.ts:3,98`,
  `data/trust.ts:9`, `next.config.ts` (the redirect rules + notes).
**Recommendation:** retire `data/offerings.ts` and the blog `offering` coupling
during the content reframe pass; safe to leave until then.

## Phase 7 — internal linking audit (no auto-add)
**Finding:** blog article bodies are plain-text paragraphs with **no in-content
internal links**. The only internal links are template-level on every post
(`app/blog/[slug]/page.tsx`): `/blog` (back), `/contact`, `/offer`.
- Rule 4 (case study → /contact): **met** (template).
- Rules 5 & 6 (no links to redirected/retired or extrovert/sillage URLs):
  **met** (none exist).
- Rules 1–3 (cluster → pillar anchor; article → a case study; article → a
  commercial page): **not met** — no in-content linking mechanism exists.
**Recommendation:** add an `internalLinks`/`relatedSlugs` field to `BlogPost`
(or a curated related block on the `[slug]` page) and wire, per post: one pillar
anchor, one case study, one commercial page. Do during the content pass.

## Not done (deferred, by instruction)
Article rewrites/reframes; reslugging the SDR/outbound articles; category
filtering UI; retiring `data/offerings.ts`.
