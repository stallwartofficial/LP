import { site } from "@/data/site";

// The standard, as an editorial spec, not cards.
//
// WHAT CHANGED, THREE TIMES NOW. Mindmap with tab state, then full-width
// disclosure rows, then three bordered cards. All read either as a toy or as a
// SaaS tile grid. This is the compact, de-carded version: three columns divided
// by hairline rules, no borders, no rounded boxes, so it reads as one
// specification rather than three products. Shorter than the card version, which
// keeps the page from scrolling.
//
// Server component, no JavaScript. Type only ever uses a --branch-*-text token,
// which is AA measured; -fill drives the small rule markers.

const TONES = [
  { fill: "var(--branch-reliable-fill)", text: "var(--branch-reliable-text)" },
  { fill: "var(--branch-honest-fill)", text: "var(--branch-honest-text)" },
  { fill: "var(--branch-scalable-fill)", text: "var(--branch-scalable-text)" },
] as const;

export function HowWeBuild() {
  return (
    <section
      aria-labelledby="how-we-build-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">The standard</p>
            <h2
              id="how-we-build-heading"
              className="font-display mt-3 text-display-sm font-light"
            >
              <span className="text-gold-sheen italic">Built Beyond</span> is a
              specification, not a slogan.
            </h2>
          </div>

          <p className="font-mono shrink-0 text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
            {site.pillars.length} conditions, all testable
          </p>
        </div>

        {/* Ruled columns. A single top rule spans the row; each column carries a
            left rule from the second onward, so the three read as one table. */}
        <div className="mt-10 grid border-t border-[var(--hairline)] md:grid-cols-3">
          {site.pillars.map((pillar, i) => {
            const tone = TONES[i] ?? TONES[0];
            return (
              <div
                key={pillar.key}
                className="border-b border-[var(--hairline)] py-6 md:border-b-0 md:py-8 md:pr-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[var(--hairline)] md:[&:not(:first-child)]:pl-8"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em]"
                    style={{ color: tone.text }}
                  >
                    {pillar.number}
                  </span>
                  <h3
                    className="font-display text-[length:var(--text-step-2)] leading-tight"
                    style={{ color: tone.text }}
                  >
                    {pillar.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-snug text-[var(--fg)]/85">
                  {pillar.claim}
                </p>

                <p className="mt-4 flex items-start gap-2 text-xs text-[var(--fg)]/70">
                  <span aria-hidden="true" style={{ color: tone.text }}>
                    ✓
                  </span>
                  {pillar.proof}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
