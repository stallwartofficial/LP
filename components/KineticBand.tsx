import { site } from "@/data/site";

// Kinetic type band, the tagline at billboard scale, scrolling. This is the
// section divider that makes the page feel authored rather than assembled.
//
// Pure CSS marquee (doubled content for a seamless loop), aria-hidden because
// it is decorative repetition; the tagline is already announced in the footer
// and metadata. Halts under prefers-reduced-motion via globals.css.
export function KineticBand() {
  const phrase = site.tagline.replace(".", "");
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section
      aria-hidden="true"
      className="rule-t rule-b relative overflow-hidden bg-[var(--surface)] py-8 sm:py-12"
    >
      {/* Fade the ends so the loop never appears to hit a hard edge. */}
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

// Structural facts strip. Numbers, but only ones that are true by construction,
// portfolio size, regions, uptime posture. Deliberately NOT performance metrics
// or customer counts, which are unverifiable pre-launch (constraint 7).
export function FactsStrip() {
  return (
    <section
      aria-label="Stallwart at a glance"
      className="section-y px-[var(--space-gutter)]"
    >
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] lg:grid-cols-4">
        {site.facts.map((fact) => (
          <div
            key={fact.label}
            className="scroll-fade bg-[var(--bg)] p-7 transition-colors hover:bg-[var(--surface)] sm:p-9"
          >
            <dd className="font-display text-display-sm font-light leading-none">
              {fact.value}
            </dd>
            <dt className="mt-3 text-sm leading-snug text-[var(--fg)]/60">
              {fact.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
