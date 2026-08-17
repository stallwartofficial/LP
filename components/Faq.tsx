import { faqs } from "@/data/faqs";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";

// Native <details>/<summary>: keyboard-accessible and readable by crawlers
// without a line of JavaScript, so the answers stay indexable, which is the
// whole point of an FAQ block for AEO.
export function Faq({ heading = "Questions, answered" }: { heading?: string }) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <JsonLd schema={faqSchema(faqs)} />

      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2
            id="faq-heading"
            className="font-display mt-4 text-display-sm font-light"
          >
            {heading}
          </h2>
        </div>

        <dl>
          {faqs.map((f) => (
            <div key={f.question} className="rule-t last:rule-b">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6">
                  <dt className="font-display text-[length:var(--text-step-1)] transition-colors group-hover:text-[var(--accent-text)]">
                    {f.question}
                  </dt>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[var(--accent-text)] transition-transform duration-500 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="max-w-2xl pb-7 text-[var(--fg)]/70">
                  {f.answer}
                </dd>
              </details>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
