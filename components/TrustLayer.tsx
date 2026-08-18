import { commitments, engagementTerms } from "@/data/trust";

// "How we operate": the terms of doing business, as a ledger.
//
// TWO SECTIONS BECAME ONE. The "Four steps, none of them are a discovery
// workshop" block is gone; it described process nobody asked about. What was
// inside it and worth keeping are the four terms every buyer blocks on: cost,
// duration, ownership, and when we decline. Those now open this section, because
// they are the first thing a serious buyer wants and they were previously buried
// under process copy.
//
// The commitments follow as expandable rows. Native details/summary, so this is
// a server component with no JavaScript and the whole text is in the initial
// HTML. Reads as a document rather than as marketing, which is the right
// register for terms.
const NOTE_STYLES = [
  { "--note-rot": "-1.1deg", "--tape-rot": "2deg" },
  { "--note-rot": "0.8deg", "--tape-rot": "-1.6deg" },
  { "--note-rot": "-0.6deg", "--tape-rot": "1.3deg" },
  { "--note-rot": "1deg", "--tape-rot": "-1.1deg" },
] as const;

export function Commitments() {
  return (
    <section
      aria-labelledby="operate-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow">How we operate</p>
          <h2
            id="operate-heading"
            className="font-display mt-3 text-display-sm font-light"
          >
            The terms, before you ask for them.
          </h2>
          <p className="mt-4 text-[var(--fg)]/75">
            Cost, duration, and ownership stated up front. Handing over the work
            should never mean handing over control.
          </p>
        </div>

        {/* ---- The four terms, as pinned notes ----
            Terms are the human half of this section, so they take the paper and
            tape material the testimonials established rather than another
            hairline grid. Extra top padding leaves room for the tape. */}
        <div className="pinboard mt-10 rounded-2xl border border-[var(--hairline)] px-5 pb-8 pt-12 sm:px-8">
          <dl className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {engagementTerms.map((term, i) => (
              <div
                key={term.question}
                className="note-pin flex flex-col rounded-sm bg-[var(--bg-raised)] p-5"
                style={NOTE_STYLES[i % NOTE_STYLES.length] as React.CSSProperties}
              >
                <dt>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display mt-3 block text-[length:var(--text-step-1)] leading-tight">
                    {term.question}
                  </span>
                </dt>
                <dd className="mt-3 text-xs leading-relaxed text-[var(--fg)]/75">
                  {term.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- Commitments, as expandable ledger rows ---- */}
        <div className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/70">
            Standing commitments
          </p>

          {/* Four across, stated outright. Disclosure rows hid short text
              behind a click and added a scroll for no reason. */}
          <ul className="mt-4 grid gap-px bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((commitment) => (
              <li key={commitment.title} className="bg-[var(--bg)] p-5">
                <span
                  aria-hidden="true"
                  className="mb-3 block h-1 w-5 bg-[var(--accent)]"
                />
                <h3 className="font-display text-[length:var(--text-step-1)] leading-tight">
                  {commitment.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--fg)]/75">
                  {commitment.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
