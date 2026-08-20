import { faqs } from "@/data/faqs";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";

// FAQ as a spec-sheet ledger, matching the standing-commitments motif rather
// than a generic +/- accordion: a numbered question on the left, its answer set
// in the right column, ruled rows with the gold-bar hover nudge. Answers are
// plain text and always present, so the block stays fully crawlable, which is
// the whole point of an FAQ for AEO.
export function Faq({ heading = "Questions, answered" }: { heading?: string }) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <JsonLd schema={faqSchema(faqs)} />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">FAQ</p>
            <h2
              id="faq-heading"
              className="font-display mt-3 text-display-sm font-light"
            >
              {heading}
            </h2>
          </div>
          <p className="font-mono shrink-0 text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/55">
            {String(faqs.length).padStart(2, "0")} answered
          </p>
        </div>

        <dl className="mt-8 border-t border-[var(--hairline)]">
          {faqs.map((f, i) => (
            <div
              key={f.question}
              className="row-nudge grid gap-x-10 gap-y-2 border-b border-[var(--hairline)] py-6 sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]"
            >
              <dt className="flex items-baseline gap-3 font-display text-[length:var(--text-step-1)] leading-snug">
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.question}
              </dt>
              <dd className="text-sm leading-relaxed text-[var(--fg)]/70">
                {f.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
