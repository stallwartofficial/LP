import Link from "next/link";
import { offerings } from "@/data/offerings";
import { site } from "@/data/site";

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
            Three systems.
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
        className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-14"
      >
        <ol className="mx-auto max-w-6xl">
          {offerings.map((offering, i) => (
            <li key={offering.slug} className="scroll-fade rule-t last:rule-b">
              <Link
                href={`/offer/${offering.slug}`}
                className="row-nudge group grid gap-6 py-10 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:py-14"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[length:var(--text-step-3)] font-light leading-none text-[var(--accent)]/35 transition-colors group-hover:text-[var(--accent)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="eyebrow">{offering.category}</span>
                    <StatusPill status={offering.status} />
                  </div>
                  <h2 className="font-display mt-4 text-display-sm font-light">
                    {offering.name}
                  </h2>
                  <p className="mt-2 text-[length:var(--text-step-1)] text-[var(--fg)]/60">
                    {offering.tagline}
                  </p>
                </div>

                <div>
                  <p className="text-[var(--fg)]/75">{offering.summary}</p>

                  {offering.capabilities.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {offering.capabilities.map((c) => (
                        <li
                          key={c.title}
                          className="rounded-full border border-[var(--hairline-strong)] px-3 py-1 text-xs text-[var(--fg)]/70"
                        >
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)]">
                    {offering.status === "available"
                      ? `Explore ${offering.name}`
                      : "What it will do"}
                    <span aria-hidden="true" className="arrow-shift">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
