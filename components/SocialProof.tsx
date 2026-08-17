import { testimonials, logoMarks } from "@/data/testimonials";
import { getOffering } from "@/data/offerings";

// MARKETER'S PASS.
//
// Two changes over the previous version. First, the logo bar no longer sits
// centred above the testimonials competing with them for the same attention.
// It is now a quiet top rail, right aligned, framed as a sector statement
// rather than a headline, so it supports the section instead of leading it.
// Second, testimonials are real cards: a pulled highlight does the scanning
// work, the quote carries the detail, and an attribution row grounds it.
//
// NOTE ON THE LOGO STRIP: the "trusted by" framing above placeholder marks was
// raised as a deceptive advertising risk (constraint #7) and the owner decided
// to keep the strip pre-launch. Kept, with the heading softened to a sector
// statement. Swap `logoMarks` in data/testimonials.ts for real names when they
// exist.
export function SocialProof() {
  const marqueeMarks = [...logoMarks, ...logoMarks]; // doubled for a seamless loop

  return (
    <section
      aria-labelledby="social-proof-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        {/* ---- Top rail: sector bar, right aligned, deliberately quiet ---- */}
        <div className="marquee-host flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow shrink-0">Built for teams at scale</p>

          <div className="flex min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:max-w-[62%]">
            <div
              className="animate-marquee flex shrink-0 items-center gap-10 pr-10"
              aria-hidden="true"
            >
              {marqueeMarks.map((mark, i) => (
                <span
                  key={`${mark}-${i}`}
                  className="font-display whitespace-nowrap text-sm tracking-[0.2em] text-[var(--fg)]/28"
                >
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---- The section proper ---- */}
        <div className="mt-14 max-w-2xl">
          <h2
            id="social-proof-heading"
            className="font-display text-display-sm font-light"
          >
            What changes when the system carries it.
          </h2>
          <p className="mt-4 text-[var(--fg)]/70">
            Illustrative accounts by role and sector. We publish named customer
            quotes when we have them and not before.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.role}
              className="card-lift scroll-rise flex flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="font-display text-2xl leading-none text-[var(--accent)]/45"
              >
                &ldquo;
              </span>

              <p className="font-display mt-3 text-[length:var(--text-step-2)] font-normal leading-snug">
                {t.highlight}
              </p>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--fg)]/70">
                {t.quote}
              </blockquote>

              <figcaption className="rule-t mt-6 flex items-center gap-3 pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[11px] font-medium tracking-wider text-[var(--accent-text)]"
                >
                  {t.initials}
                </span>
                <span className="min-w-0 text-sm">
                  <span className="block font-medium text-[var(--fg)]/85">
                    {t.role}
                  </span>
                  <span className="block text-xs text-[var(--fg)]/65">
                    {t.industry} · {getOffering(t.offering)?.name ?? t.offering}
                  </span>
                </span>
              </figcaption>

              <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/60">
                Illustrative example
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
