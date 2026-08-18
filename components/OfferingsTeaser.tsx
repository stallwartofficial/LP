import Link from "next/link";
import { offerings } from "@/data/offerings";
import { StatusPill } from "@/components/Offerings";
import { MiniPath } from "@/components/MiniPath";

// The portfolio as four compact cards.
//
// WHAT CHANGED. This was four full height alternating modules, each with a five
// stage diagram: roughly 1,600px for four items, reading as a scroll rather
// than a summary. Same copy, same engineering language, about a quarter of the
// height.
//
// Each card carries status, name, tagline, and a three node MiniPath. Summary,
// problem, capabilities, and FAQs stay on the detail page the card links to.
// Count is derived from data/offerings.ts and never hardcoded.
export function OfferingsTeaser() {
  return (
    <section
      aria-labelledby="offerings-teaser-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">The portfolio</p>
            <h2
              id="offerings-teaser-heading"
              className="font-display mt-3 text-display-sm font-light"
            >
              {offerings.length} offerings. One engine.
            </h2>
          </div>

          <Link
            href="/offer"
            className="link-draw shrink-0 text-sm font-medium text-[var(--accent-text)]"
          >
            Everything we build →
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {offerings.map((offering, i) => (
            <li key={offering.slug}>
              <Link
                href={`/offer/${offering.slug}`}
                className="card-lift enter-rise group flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
                style={
                  {
                    // Stagger entry and the travelling signal so four cards read
                    // as four systems rather than one synchronised block.
                    transitionDelay: `${i * 70}ms`,
                    "--trace-delay": `${i * 0.45}s`,
                    "--trace-duration": `${3.2 + i * 0.3}s`,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <StatusPill status={offering.status} />
                </div>

                <h3 className="font-display mt-4 text-[length:var(--text-step-2)] leading-tight transition-colors group-hover:text-[var(--accent-text)]">
                  {offering.name}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-snug text-[var(--fg)]/70">
                  {offering.tagline}
                </p>

                <MiniPath offering={offering} />

                <p className="rule-t mt-5 pt-4 text-xs text-[var(--fg)]/70">
                  <span className="font-mono uppercase tracking-[0.14em] text-[var(--accent-text)]">
                    Pricing
                  </span>
                  <span className="mt-1 block leading-snug">{offering.pricing}</span>
                </p>

                <span className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/70">
                  {offering.category}
                  <span
                    aria-hidden="true"
                    className="arrow-shift text-[var(--accent-text)]"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
