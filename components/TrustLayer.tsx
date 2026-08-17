import { commitments, engagementSteps } from "@/data/trust";

// Company-level operating commitments, as a hairline-divided grid. Reads as
// specification, which is the right register for trust content, a card with a
// rounded border and a shadow reads as marketing.
export function Commitments() {
  return (
    <section
      aria-labelledby="commitments-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow">How we operate</p>
          <h2
            id="commitments-heading"
            className="font-display mt-4 text-display-sm font-light"
          >
            Handing over the work shouldn&apos;t mean handing over control.
          </h2>
        </div>

        <dl className="mt-14 grid gap-px bg-[var(--hairline)] sm:grid-cols-2">
          {commitments.map((c) => (
            <div
              key={c.title}
              className="scroll-fade group bg-[var(--bg)] p-7 transition-colors hover:bg-[var(--surface)] sm:p-9"
            >
              <dt className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] transition-transform duration-500 group-hover:scale-150"
                />
                <span className="font-display text-[length:var(--text-step-1)]">
                  {c.title}
                </span>
              </dt>
              <dd className="mt-3 text-[var(--fg)]/70 sm:pl-[1.125rem]">
                {c.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// How a Stallwart engagement runs, company-level, offering-agnostic.
// Connected numerals read as a sequence rather than four unrelated cards.
export function Engagement() {
  return (
    <section
      aria-labelledby="engagement-heading"
      className="section-y rule-t bg-[var(--surface)] px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow">How engagements run</p>
          <h2
            id="engagement-heading"
            className="font-display mt-4 text-display-sm font-light"
          >
            Four steps. None of them are a discovery workshop.
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {engagementSteps.map((s, i) => (
            <li key={s.step} className="scroll-rise relative">
              {/* Connector line between steps on wide screens. */}
              {i < engagementSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-3 hidden h-px w-full bg-[var(--hairline)] lg:block"
                />
              )}
              <span
                aria-hidden="true"
                className="relative block h-1.5 w-1.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--surface)]"
              />
              <span className="mt-6 block text-xs font-medium tracking-[0.2em] text-[var(--accent-text)]">
                {s.step}
              </span>
              <h3 className="font-display mt-2 text-[length:var(--text-step-1)]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--fg)]/70">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
