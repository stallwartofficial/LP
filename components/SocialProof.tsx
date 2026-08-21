import { testimonials } from "@/data/testimonials";
import { getOffering } from "@/data/offerings";

// Testimonials as pinned notes on a board.
//
// WHY A DIFFERENT MATERIAL. Everything else on this site is hairlines, mono
// labels, and schematic line work, which is correct for an engineering company
// and wrong for the one section that is supposed to sound like a person. Cards
// made these read as more specification. Paper, tape, and a slight rotation give
// the human section its own material without leaving the palette.
//
// Restrained on purpose: 0.6 to 1.2 degrees of rotation, a single tape strip, no
// drop shadow theatrics. Each note straightens on hover. Rotation is canceled
// under reduced motion.
//
// The logo marquee that used to sit above this moved to LogoScroll, directly
// beneath the hero.
//
// NOTE: illustrative, role and industry attributed. Not real named companies and
// not fabricated ones (constraint 7).

const NOTE_STYLES = [
  { "--note-rot": "-1.1deg", "--tape-rot": "2deg" },
  { "--note-rot": "0.7deg", "--tape-rot": "-1.5deg" },
  { "--note-rot": "-0.5deg", "--tape-rot": "1.2deg" },
] as const;

export function SocialProof() {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="eyebrow">In their words</p>
          <h2
            id="social-proof-heading"
            className="font-display mt-3 text-display-sm font-light"
          >
            What changes when the system carries it.
          </h2>
          <p className="mt-4 text-[var(--fg)]/75">
            Illustrative accounts by role and sector. We publish named customer
            quotes when we have them and not before.
          </p>
        </div>

        {/* The board. Extra top padding leaves room for the tape strips. */}
        <div className="pinboard mt-10 rounded-2xl border border-[var(--hairline)] px-5 pb-8 pt-10 sm:mt-12 sm:px-8 sm:pt-12">
          <ul className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <li key={testimonial.role}>
                <figure
                  className="note-pin flex h-full flex-col rounded-sm bg-[var(--bg-raised)] p-5 sm:p-6"
                  style={NOTE_STYLES[i % NOTE_STYLES.length] as React.CSSProperties}
                >
                  <p className="font-display text-[length:var(--text-step-1)] leading-snug sm:text-[length:var(--text-step-2)]">
                    {testimonial.highlight}
                  </p>

                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg)]/75">
                    {testimonial.quote}
                  </blockquote>

                  <figcaption className="mt-6 border-t border-[var(--hairline)] pt-4">
                    <span className="block text-sm font-medium text-[var(--fg)]/85">
                      {testimonial.role}
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--fg)]/70">
                      {testimonial.industry} ·{" "}
                      {getOffering(testimonial.offering)?.name ??
                        testimonial.offering}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
