import Link from "next/link";
import { offerings } from "@/data/offerings";
import { StatusPill } from "@/components/Offerings";
import { SystemFlow } from "@/components/SystemFlow";
import { EngineeringTexture } from "@/components/EngineeringTexture";

// The portfolio, as three substantial modules rather than three thin text
// columns above a void.
//
// Each system gets a numbered half of the row for its claim and a signal path
// diagram for the other half, alternating side on desktop so the eye moves down
// the page instead of scanning a grid. The diagram states the actual mechanism,
// which is what makes the module feel engineered rather than decorated.
export function OfferingsTeaser() {
  return (
    <section
      aria-labelledby="offerings-teaser-heading"
      className="relative isolate overflow-hidden rule-t px-[var(--space-gutter)] py-[var(--space-section)]"
    >
      <EngineeringTexture />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">The portfolio</p>
            <h2
              id="offerings-teaser-heading"
              className="font-display mt-4 text-display-sm font-light"
            >
              Three systems. One standard.
            </h2>
          </div>

          <Link
            href="/offer"
            className="link-draw shrink-0 text-sm font-medium text-[var(--accent-text)]"
          >
            Everything we build →
          </Link>
        </div>

        <ol className="mt-16 space-y-16 lg:space-y-24">
          {offerings.map((offering, i) => (
            <li
              key={offering.slug}
              className="scroll-rise grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              {/* ---- Claim ---- */}
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs tracking-[0.2em] text-[var(--accent-text)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-[var(--accent)]/50"
                  />
                  <StatusPill status={offering.status} />
                </div>

                <h3 className="font-display mt-5 text-display-sm font-light">
                  <Link
                    href={`/offer/${offering.slug}`}
                    className="transition-colors hover:text-[var(--accent-text)]"
                  >
                    {offering.name}
                  </Link>
                </h3>

                <p className="mt-3 text-[length:var(--text-step-1)] text-[var(--fg)]/70">
                  {offering.tagline}
                </p>

                <p className="mt-6 max-w-xl text-[var(--fg)]/75">
                  {offering.summary}
                </p>

                {/* The problem it removes, stated as a technical note. */}
                <p className="mt-6 border-l border-[var(--accent)]/50 pl-4 text-sm text-[var(--fg)]/65">
                  {offering.problem}
                </p>

                <Link
                  href={`/offer/${offering.slug}`}
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)]"
                >
                  {offering.status === "available"
                    ? `Explore ${offering.name}`
                    : "What it will do"}
                  <span aria-hidden="true" className="arrow-shift">
                    →
                  </span>
                </Link>
              </div>

              {/* ---- Signal path ---- */}
              <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                <SystemFlow offering={offering} index={i} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
