import Link from "next/link";
import { offerings } from "@/data/offerings";
import { site } from "@/data/site";
import { MiniPath } from "@/components/MiniPath";

/** Shared status pill so "in development" never reads as "available". */
export function StatusPill({
  status,
}: {
  status: "available" | "in-development";
}) {
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--accent-text)]">
        <span
          aria-hidden="true"
          className="animate-soft-pulse h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
        />
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--fg)]/60">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full border border-current"
      />
      In development
    </span>
  );
}

// The portfolio page. Full width editorial rows, each offering given real space
// with the problem it removes stated up front. The row is the link target.
export function Offerings() {
  return (
    <>
      <header className="px-[var(--space-gutter)] pb-4 pt-36 lg:pt-44">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
            <p className="eyebrow">The portfolio</p>
          </div>

          <h1 className="font-display mt-6 max-w-3xl text-display-lg font-light">
            {offerings.length} offerings.
            <br />
            <span className="text-gold-sheen italic">One standard.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            {site.positioning} Every system here answers the same question: what
            is this team doing by hand only because nobody built the thing that
            would do it instead?
          </p>
        </div>
      </header>

      <section
        aria-label="Offerings"
        className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-12"
      >
        {/* Cards, not rows. Four full-width editorial rows meant four screens of
            scrolling for four items; the grid puts the whole portfolio in one
            view while keeping the mechanism visible via MiniPath. */}
        <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {offerings.map((offering, i) => (
            <li key={offering.slug}>
              <Link
                href={`/offer/${offering.slug}`}
                className="card-lift enter-rise group flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
                style={
                  {
                    transitionDelay: `${i * 70}ms`,
                    "--trace-delay": `${i * 0.45}s`,
                    "--trace-duration": `${5.2 + i * 0.4}s`,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <StatusPill status={offering.status} />
                </div>

                <h2 className="font-display mt-4 text-[length:var(--text-step-2)] leading-tight transition-colors group-hover:text-[var(--accent-text)]">
                  {offering.name}
                </h2>

                <p className="mt-2 text-sm leading-snug text-[var(--fg)]/70">
                  {offering.tagline}
                </p>

                <p className="mt-4 flex-1 text-xs leading-relaxed text-[var(--fg)]/70">
                  {offering.summary}
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
      </section>
    </>
  );
}
