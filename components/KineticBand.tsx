import { site } from "@/data/site";

// Kinetic type band: the tagline at billboard scale, scrolling. The section
// divider that makes the page feel authored rather than assembled.
//
// Pure CSS marquee (doubled content for a seamless loop), aria-hidden because it
// is decorative repetition; the tagline is already announced in the hero,
// footer, and metadata. Halts under prefers-reduced-motion via globals.css.
export function KineticBand() {
  const phrase = site.tagline.replace(".", "");
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section
      aria-hidden="true"
      className="rule-t rule-b marquee-host relative overflow-hidden bg-[var(--surface)] py-8 sm:py-12"
    >
      <div className="flex [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee-slow flex shrink-0 items-center gap-10 pr-10">
          {items.concat(items).map((n, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-display-lg font-light uppercase leading-none tracking-tight text-[var(--fg)]/12">
                {phrase}
              </span>
              <span
                className="h-2 w-2 shrink-0 rotate-45 bg-[var(--accent)]/60"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ARCHITECTURAL PROPERTIES, not performance metrics.
//
// Reframed deliberately. The previous version read "3 systems / 24/7 / 0 /
// 100%" with no context, which is indistinguishable from invented SaaS
// statistics. Two changes fix that: the properties are ordered so the strongest
// architectural claim leads rather than the portfolio count, and the footnote
// states plainly that these are design commitments checkable by reading the
// system, not measured outcomes. "0 untracked automation steps" is a
// falsifiable statement about how the systems are built; "0 steps needing a
// human reminder" was a claim about usage we cannot substantiate, so it is gone.
export function ProductionProperties() {
  return (
    <section
      aria-labelledby="production-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow" id="production-heading">
          Built for production
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-px bg-[var(--hairline)] lg:grid-cols-4">
          {site.productionProperties.map((prop) => (
            <div
              key={prop.label}
              className="scroll-fade bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--surface)] sm:p-8"
            >
              <dd className="font-display text-display-sm font-light leading-none">
                {prop.value}
              </dd>
              <dt className="mt-3 text-sm leading-snug text-[var(--fg)]/70">
                {prop.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-5 max-w-2xl text-xs text-[var(--fg)]/60">
          These are engineering commitments, verifiable by reading the system,
          not measured customer outcomes. We publish performance figures once a
          customer has confirmed them.
        </p>
      </div>
    </section>
  );
}
