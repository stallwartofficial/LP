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
            className="font-display weight-in mt-3 text-display-sm font-light"
          >
            The terms, before you ask for them.
          </h2>
          <p className="mt-4 text-[var(--fg)]/75">
            Cost, duration, and ownership stated up front. Handing over the work
            should never mean handing over control.
          </p>
        </div>

        {/* ---- The four terms. The answers buyers block on. ---- */}
        <dl className="mt-10 grid gap-px bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {engagementTerms.map((term, i) => (
            <div
              key={term.question}
              className="enter-rise bg-[var(--bg)] p-5 transition-colors hover:bg-[var(--surface)] sm:p-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <dt>
                <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent-text)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display mt-3 block text-[length:var(--text-step-1)]">
                  {term.question}
                </span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-[var(--fg)]/75">
                {term.answer}
              </dd>
            </div>
          ))}
        </dl>

        {/* ---- Commitments, as expandable ledger rows ---- */}
        <div className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/70">
            Standing commitments
          </p>

          <div className="mt-4">
            {commitments.map((commitment) => (
              <details
                key={commitment.title}
                className="group rule-t last:rule-b"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] transition-transform duration-500 group-open:scale-150"
                  />
                  <span className="font-display flex-1 text-[length:var(--text-step-1)]">
                    {commitment.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[var(--accent-text)] transition-transform duration-500 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pl-[1.375rem] text-[var(--fg)]/75">
                  {commitment.description}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
