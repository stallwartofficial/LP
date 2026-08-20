import { commitments, engagementTerms } from "@/data/trust";

// "How we operate": the terms of doing business, as a masonry.
//
// Masonry, not a grid. CSS grids leave gaps when tiles have organic sizes;
// column-flow (CSS multi-column) packs blocks tightly with no vertical gaps and
// natural, uneven heights, which is the unstructured look we want. Terms and
// commitments are interleaved and numbered 01 to 08; hovering a tile turns the
// whole tile gold. Server component, no JS. To revert, restore from git.
type Tile = {
  kicker: string;
  num: string;
  title: string;
  body: string;
  accent?: boolean;
  feature?: boolean;
};

// Interleaved on purpose: terms and commitments alternate rather than sitting in
// two blocks, so the masonry reads as one mixed wall.
const tiles: Tile[] = [
  { kicker: "Cost", num: "01", title: engagementTerms[0].question, body: engagementTerms[0].answer },
  { kicker: "Commitment", num: "02", title: commitments[0].title, body: commitments[0].description },
  { kicker: "Ownership", num: "03", title: engagementTerms[2].question, body: engagementTerms[2].answer, feature: true },
  { kicker: "Commitment", num: "04", title: commitments[1].title, body: commitments[1].description },
  { kicker: "Time", num: "05", title: engagementTerms[1].question, body: engagementTerms[1].answer },
  { kicker: "Commitment", num: "06", title: commitments[2].title, body: commitments[2].description },
  { kicker: "Candour", num: "07", title: engagementTerms[3].question, body: engagementTerms[3].answer, accent: true },
  { kicker: "Commitment", num: "08", title: commitments[3].title, body: commitments[3].description },
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

        {/* Masonry: columns pack top to bottom with no vertical gaps. */}
        <div className="mt-8 gap-3 [column-fill:balance] sm:columns-2 lg:columns-4">
          {tiles.map((tile) => (
            <div
              key={tile.title}
              className={`group mb-3 break-inside-avoid rounded-2xl border p-5 transition-colors duration-300 ${
                tile.accent
                  ? "border-[var(--accent)]/45 bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface))] hover:border-[var(--accent)]"
                  : "border-[var(--hairline)] bg-[var(--surface)] hover:border-[var(--accent)]/70"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-colors ${
                    tile.accent
                      ? "text-[var(--accent-text)]"
                      : "text-[var(--fg)]/45 group-hover:text-[var(--accent-text)]"
                  }`}
                >
                  {tile.kicker}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]">
                  {tile.num}
                </span>
              </div>

              {tile.accent ? (
                <h3 className="font-display mt-3 text-[length:var(--text-step-1)] leading-tight transition-colors group-hover:text-[var(--accent-text)]">
                  When we say{" "}
                  <span className="text-gold-sheen text-[1.4em] italic">no</span>.
                </h3>
              ) : (
                <h3
                  className={`font-display mt-3 leading-tight transition-colors group-hover:text-[var(--accent-text)] ${
                    tile.feature
                      ? "text-display-sm font-light"
                      : "text-[length:var(--text-step-1)]"
                  }`}
                >
                  {tile.title}
                </h3>
              )}

              <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/75 transition-colors group-hover:text-[var(--accent-text)]/90">
                {tile.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
