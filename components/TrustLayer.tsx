import { commitments, engagementTerms } from "@/data/trust";

// "How we operate": the terms of doing business, as a designed bento.
//
// A true bento: real 2D size variety placed with grid-template-areas (see
// .op-bento in globals.css) so tiles pack with no gaps. Content is sized to each
// tile, so nothing stretches empty: the 2x2 feature and the two tall tiles carry
// full copy, the wide tiles carry one line, the small tiles carry a label only.
// Gold is reserved for the top kicker labels; one font weight throughout; no
// numbers. Hover is a subtle lift. Server component, no JS. Revert from git.
type Tile = {
  area: string;
  kicker: string;
  title: string;
  line?: string;
  statement?: string;
  accent?: boolean;
};

// DOM order is the mobile stacking order (terms, then commitments); on lg the
// grid areas reposition them into the bento.
const tiles: Tile[] = [
  {
    area: "own",
    kicker: "Ownership",
    title: engagementTerms[2].question,
    statement: "Everything.",
    line: "Source, infrastructure as code, runbooks, and documentation. Yours to keep, with no lock-in.",
  },
  {
    area: "cost",
    kicker: "Cost",
    title: engagementTerms[0].question,
    line: "Fixed price per phase, approved up front. Never billed hourly.",
  },
  {
    area: "time",
    kicker: "Time",
    title: engagementTerms[1].question,
    line: "Weeks, not months, with a committed build date.",
  },
  {
    area: "enc",
    kicker: "Security",
    title: "Secure by default",
    line: "What we build is encrypted in transit and at rest, with keys on your side. Security is built in, not bolted on.",
  },
  {
    area: "data",
    kicker: "Data",
    title: commitments[0].title,
    line: "Your data is never sold and never trains shared models.",
  },
  {
    area: "ovr",
    kicker: "Control",
    title: commitments[2].title,
    line: "Every action is logged and reversible, and any run can be paused.",
  },
  {
    area: "no",
    kicker: "Candour",
    title: "no",
    accent: true,
    line: "We would rather lose the work than sell you something you do not need. If something simpler already does the job, we tell you, and you keep your money.",
  },
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
        </div>

        <div className="op-bento mt-8 flex flex-wrap gap-3 lg:grid">
          {tiles.map((tile) => {
            const isFeature = Boolean(tile.statement);
            return (
              <div
                key={tile.area}
                style={{ gridArea: tile.area }}
                className={`op-tile card-lift flex min-w-0 flex-col rounded-2xl border p-4 transition-colors duration-300 lg:basis-auto lg:p-5 ${
                  isFeature ? "lg:self-stretch" : ""
                } ${
                  isFeature
                    ? "basis-full"
                    : "basis-[calc(50%-0.375rem)]"
                } ${
                  tile.accent
                    ? "border-[var(--accent)]/40 bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface))]"
                    : "border-[var(--hairline)] bg-[var(--surface)] hover:border-[var(--accent)]/45"
                }`}
              >
                {/* The only gold: the top label. */}
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                  {tile.kicker}
                </span>

                {tile.accent ? (
                  <h3 className="font-display mt-2 text-[length:var(--text-step-1)] leading-tight">
                    When we say <span className="text-[1.4em] italic">no</span>.
                  </h3>
                ) : (
                  <h3 className="font-display mt-2 text-[length:var(--text-step-1)] leading-tight">
                    {tile.title}
                  </h3>
                )}

                {isFeature && (
                  <p className="font-display mt-1 text-[clamp(1.75rem,2.6vw,2.4rem)] italic leading-[0.95]">
                    {tile.statement}
                  </p>
                )}

                {tile.line && (
                  <p
                    className={`text-sm leading-relaxed text-[var(--fg)]/70 ${
                      isFeature ? "mt-3 sm:max-w-sm" : "mt-3"
                    }`}
                  >
                    {tile.line}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
