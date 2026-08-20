import { commitments, engagementTerms } from "@/data/trust";

// "How we operate": the terms of doing business, as an asymmetric bento.
//
// BENTO (test), true asymmetric. Not a uniform card grid: genuine size variety
// on a dense-packed 4-column grid. "What you own" is the 2x2 feature; the other
// terms and the security commitments fill wide and square tiles around it;
// "When we say no" carries a gold accent. Oversized ghost numbers add texture.
// Server component, no JS. To revert, restore the previous version from git.
type Tile = {
  variant: "feature" | "term" | "accent" | "commit";
  kicker: string;
  num?: string;
  title: string;
  body: string;
  span: string;
};

// DOM order is chosen so grid-flow-dense packs the tiles into a clean 4x4 on
// desktop: feature (2x2) + a wide + two squares fill the top two rows, then
// four wides fill the last two.
const tiles: Tile[] = [
  { variant: "feature", kicker: "Ownership", num: "03", title: engagementTerms[2].question, body: engagementTerms[2].answer, span: "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2" },
  { variant: "term", kicker: "Cost", num: "01", title: engagementTerms[0].question, body: engagementTerms[0].answer, span: "sm:col-span-2 lg:col-span-2" },
  { variant: "term", kicker: "Time", num: "02", title: engagementTerms[1].question, body: engagementTerms[1].answer, span: "" },
  { variant: "accent", kicker: "Candour", num: "04", title: engagementTerms[3].question, body: engagementTerms[3].answer, span: "" },
  { variant: "commit", kicker: "Commitment", title: commitments[0].title, body: commitments[0].description, span: "" },
  { variant: "commit", kicker: "Commitment", title: commitments[1].title, body: commitments[1].description, span: "sm:col-span-2 lg:col-span-2" },
  { variant: "commit", kicker: "Commitment", title: commitments[2].title, body: commitments[2].description, span: "" },
  { variant: "commit", kicker: "Commitment", title: commitments[3].title, body: commitments[3].description, span: "sm:col-span-2 lg:col-span-4" },
];

export function Commitments() {
  return (
    <section
      aria-labelledby="operate-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">How we operate</p>
            <h2
              id="operate-heading"
              className="font-display mt-3 text-display-sm font-light"
            >
              The terms, before you ask for them.
            </h2>
            <p className="mt-4 text-[var(--fg)]/75">
              Cost, duration, ownership, and the commitments underneath them,
              stated up front. Handing over the work should never mean handing
              over control.
            </p>
          </div>
          <p className="font-mono shrink-0 text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/55">
            Full detail on request
          </p>
        </div>

        <div className="mt-10 grid grid-flow-dense gap-3 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
          {tiles.map((tile) => {
            const isFeature = tile.variant === "feature";
            const isAccent = tile.variant === "accent";
            // The feature pulls its first word out as a large statement so the
            // 2x2 tile is filled rather than mostly empty.
            const [lead, ...restParts] = tile.body.split(". ");
            const featureRest = restParts.join(". ");
            return (
              <div
                key={tile.title}
                className={`card-lift relative flex flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 ${tile.span} ${
                  isAccent
                    ? "border-[var(--accent)]/45 bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface))]"
                    : isFeature
                      ? "border-[var(--accent)]/35 bg-[var(--surface)]"
                      : "border-[var(--hairline)] bg-[var(--surface)]"
                }`}
              >
                {/* Oversized ghost number, texture only. */}
                {tile.num && (
                  <span
                    aria-hidden="true"
                    className="font-display pointer-events-none absolute -right-2 -top-4 select-none text-[5.5rem] leading-none text-[var(--fg)]/[0.045]"
                  >
                    {tile.num}
                  </span>
                )}

                <span
                  className={`font-mono relative text-[9px] uppercase tracking-[0.2em] ${
                    isAccent ? "text-[var(--accent-text)]" : "text-[var(--fg)]/45"
                  }`}
                >
                  {tile.kicker}
                </span>

                {isAccent ? (
                  <>
                    <h3 className="font-display relative mt-3 text-[length:var(--text-step-1)] leading-tight">
                      When we say{" "}
                      <span className="text-gold-sheen text-[1.5em] italic">
                        no
                      </span>
                      .
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-[var(--fg)]/75">
                      {tile.body}
                    </p>
                  </>
                ) : isFeature ? (
                  // Feature: label, a large statement word, then the detail,
                  // spread so the 2x2 tile reads full and deliberate.
                  <>
                    <h3 className="font-display relative mt-3 text-[length:var(--text-step-1)] font-light leading-tight text-[var(--fg)]/70">
                      {tile.title}
                    </h3>
                    <p className="font-display relative mt-2 text-[clamp(2.5rem,5vw,3.75rem)] font-light italic leading-[0.95]">
                      {lead}.
                    </p>
                    <p className="relative mt-auto pt-6 text-sm leading-relaxed text-[var(--fg)]/70 sm:max-w-md">
                      {featureRest}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-display relative mt-3 text-[length:var(--text-step-1)] leading-tight">
                      {tile.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-[var(--fg)]/75">
                      {tile.body}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
