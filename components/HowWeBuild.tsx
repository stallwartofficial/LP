import { site } from "@/data/site";

// The standard, as three compact cards.
//
// WHAT CHANGED, TWICE. This began as a two column mindmap with tab state, then
// became three full width disclosure rows at 873px. Both were too much room for
// three claims on a landing page.
//
// Now three cards at roughly a third of that height, carrying the same three
// claims, their sub points, and their proof lines. Nothing was cut: the
// description paragraph moved to the /story page where the standard is discussed
// at length, and the card keeps the claim, the three testable conditions, and
// the proof.
//
// Server component, no JavaScript. Each card owns a gold weight, and type only
// ever uses a --branch-*-text token, which is AA measured; the -fill
// counterparts drive rules and markers.

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
          </div>

          <p className="font-mono shrink-0 text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
            {site.pillars.length} conditions, all testable
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {site.pillars.map((pillar, i) => {
            const tone = TONES[i] ?? TONES[0];

            return (
              <li
                key={pillar.key}
                className="enter-rise flex flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5 sm:p-6"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em]"
                    style={{ color: tone.text }}
                  >
                    {pillar.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1 w-6"
                    style={{ background: tone.fill }}
                  />
                </div>

                <h3
                  className="font-display mt-4 text-[length:var(--text-step-2)] leading-tight"
                  style={{ color: tone.text }}
                >
                  {pillar.title}
                </h3>

                <p className="mt-2 text-sm leading-snug text-[var(--fg)]/85">
                  {pillar.claim}
                </p>

                <ul className="mt-5 flex-1 space-y-2">
                  {pillar.branches.map((branch) => (
                    <li
                      key={branch}
                      className="flex items-start gap-2.5 text-xs leading-snug text-[var(--fg)]/75"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-px w-2.5 shrink-0"
                        style={{ background: tone.fill }}
                      />
                      {branch}
                    </li>
                  ))}
                </ul>

                <p
                  className="rule-t mt-5 flex items-start gap-2 pt-4 text-xs font-medium"
                  style={{ color: tone.text }}
                >
                  <span aria-hidden="true">✓</span>
                  {pillar.proof}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
