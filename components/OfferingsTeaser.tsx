import Link from "next/link";
import { offerings } from "@/data/offerings";
import { site } from "@/data/site";
import { StatusPill } from "@/components/Offerings";

// Asymmetric bento. The available offering takes the hero cell; the ones still
// in development sit beside it at smaller weight. The layout itself
// communicates the portfolio's shape, three equal cards would have implied
// three equally-ready products, which would be false.
export function OfferingsTeaser() {
  const [lead, ...rest] = offerings;

  return (
    <section
      aria-labelledby="offerings-teaser-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
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
            <p className="mt-4 text-[var(--fg)]/70">
              {site.company} doesn&apos;t build one thing. Each system takes a
              different function off a team, permanently, not partially.
            </p>
          </div>

          <Link
            href="/offer"
            className="link-draw shrink-0 text-sm font-medium text-[var(--accent-text)]"
          >
            Everything we build →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Lead cell, spans two rows on desktop. */}
          <Link
            href={`/offer/${lead.slug}`}
            className="scroll-rise group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-8 transition-colors hover:border-[var(--accent)]/50 lg:row-span-2 lg:p-10"
          >
            {/* Gold bloom follows the card on hover. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1/4 -top-1/4 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_65%)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">{lead.category}</span>
                <StatusPill status={lead.status} />
              </div>
              <h3 className="font-display mt-6 text-display-sm font-light">
                {lead.name}
              </h3>
              <p className="mt-3 text-[length:var(--text-step-1)] text-[var(--fg)]/70">
                {lead.tagline}
              </p>
            </div>

            <div className="relative mt-10">
              <p className="max-w-md text-[var(--fg)]/75">{lead.summary}</p>

              {/* Its own capability list, as proof there's depth behind it. */}
              <ul className="mt-7 flex flex-wrap gap-2">
                {lead.capabilities.map((c) => (
                  <li
                    key={c.title}
                    className="rounded-full border border-[var(--hairline-strong)] px-3 py-1 text-xs text-[var(--fg)]/70"
                  >
                    {c.title}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)]">
                Explore {lead.name}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>

          {/* Secondary cells */}
          {rest.map((offering) => (
            <Link
              key={offering.slug}
              href={`/offer/${offering.slug}`}
              className="scroll-rise group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--hairline)] p-8 transition-colors hover:border-[var(--accent)]/40 lg:col-span-2"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow">{offering.category}</span>
                  <StatusPill status={offering.status} />
                </div>
                <h3 className="font-display mt-5 text-[length:var(--text-step-3)] font-light">
                  {offering.name}
                </h3>
                <p className="mt-2 max-w-lg text-[var(--fg)]/70">
                  {offering.tagline}
                </p>
              </div>

              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)]">
                What it will do
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
