import { site } from "@/data/site";

// The standard, as a specification sheet.
//
// WHAT CHANGED, TWICE OVER. This was a two column mindmap with tab state, which
// competed with the architecture diagram directly below it and required a client
// component to work. It is now three disclosure rows built on native
// details/summary, which means:
//
//   - No JavaScript. It is a server component, so the whole argument is in the
//     initial HTML and crawlable without hydration.
//     Registers as a specification a buyer reads, not a toy they operate.
//   - The open and close animation is native CSS (::details-content plus
//     interpolate-size, see globals.css), so it is smooth where supported and
//     instant where not. Nothing breaks either way.
//   - Keyboard and screen reader support come from the platform rather than
//     from hand rolled roving tabindex.
//
// Each row carries its own gold weight so the three read as distinct claims.
// Type only ever uses a --branch-*-text token, which is AA measured; the -fill
// counterparts are for rules and markers.

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
              className="font-display weight-in mt-3 text-display-sm font-light"
            >
              <span className="text-gold-sheen italic">Built Beyond</span> is a
              specification, not a slogan.
            </h2>
            <p className="mt-4 text-[var(--fg)]/75">
              Three conditions have to hold before a system ships with our name
              on it. Each one is testable.
            </p>
          </div>

          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
            {site.pillars.length} conditions
          </p>
        </div>

        <div className="mt-10">
          {site.pillars.map((pillar, i) => {
            const tone = TONES[i] ?? TONES[0];

            return (
              <details
                key={pillar.key}
                open={i === 0}
                className="group rule-t last:rule-b"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-6 sm:gap-6">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] tracking-[0.2em]"
                    style={{ color: tone.text }}
                  >
                    {pillar.number}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span
                        className="font-display text-[length:var(--text-step-3)] leading-tight"
                        style={{ color: tone.text }}
                      >
                        {pillar.title}
                      </span>
                      <span className="text-[var(--fg)]/75">{pillar.claim}</span>
                    </span>
                  </span>

                  {/* Rotates to a minus when the row is open. */}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-lg leading-none transition-transform duration-500 group-open:rotate-45"
                    style={{ color: tone.text }}
                  >
                    +
                  </span>
                </summary>

                <div className="pb-8 sm:pl-12">
                  <p className="max-w-2xl text-[var(--fg)]/75">
                    {pillar.description}
                  </p>

                  <ul className="mt-6 grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
                    {pillar.branches.map((branch) => (
                      <li
                        key={branch}
                        className="bg-[var(--bg)] p-4 text-sm text-[var(--fg)]/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mb-3 block h-1 w-5"
                          style={{ background: tone.fill }}
                        />
                        {branch}
                      </li>
                    ))}
                  </ul>

                  <p
                    className="mt-6 flex items-start gap-2.5 text-sm font-medium"
                    style={{ color: tone.text }}
                  >
                    <span aria-hidden="true">✓</span>
                    {pillar.proof}
                  </p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
