import { testimonials, type Testimonial } from "@/data/testimonials";
import { ProofBadge } from "@/components/ProofBadge";

// Testimonials as two full-bleed marquee rows moving in opposite directions.
// Rows are disjoint (row 1 = first 6, row 2 = last 5), so the same testimonial
// never appears in both places at once. Different animation durations mean the
// rows never visually sync. Pauses on hover (whole row) so a reader can
// actually read a quote. Motion is CSS-only; content is duplicated for a
// seamless loop.

// Split the reviews so there is no overlap between rows.
const ROW_ONE: Testimonial[] = testimonials.slice(0, 6);
const ROW_TWO: Testimonial[] = testimonials.slice(6);

// Mobile order (single swipe row) is curated separately from the desktop
// marquee: Ken opens (US CEO / ownership), then Pradeep (range + AI), then
// Jeevitha (brand voice), then the rest by impact.
// Ken opens (US CEO, ownership). Arunkumar sits mid-list so a swipe never
// dead-ends on his quiet closer. Jeevitha closes because her line is punchy
// and clearly reads as a finale.
const MOBILE_ORDER = [
  "Ken Morford",
  "Pradeep",
  "Sukanthen",
  "Arunkumar",
  "Rashmi",
  "Dharshan",
  "Kaviarasu",
  "Ambrose Dass",
  "Aditya",
  "Uma",
  "Jeevitha",
];
const byName = new Map(testimonials.map((t) => [t.name, t]));
const MOBILE_ROW: Testimonial[] = MOBILE_ORDER
  .map((n) => byName.get(n))
  .filter((t): t is Testimonial => Boolean(t));

function QuoteMark({ closing = false }: { closing?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 text-[var(--accent-text)] ${closing ? "rotate-180" : ""}`}
    >
      <path
        fill="currentColor"
        d="M7.5 5C4.5 5 2 7.5 2 10.5V19h7v-8.5H5c0-1.66 1.34-3 3-3V5h-.5zm10 0c-3 0-5.5 2.5-5.5 5.5V19h7v-8.5H15c0-1.66 1.34-3 3-3V5h-.5z"
      />
    </svg>
  );
}

// Fixed card size so every row has a uniform silhouette and the marquee
// doesn't jitter. Name/role at the top per the reference; quote below;
// closing quote mark at the bottom-right to bracket the passage.
function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-80 w-[20rem] shrink-0 flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--card-glow)] sm:w-[24rem]">
      <figcaption>
        <span className="block text-sm font-medium text-[var(--fg)]">{t.name}</span>
        <span className="mt-0.5 block text-xs text-[var(--fg)]/75">
          {t.role} · {t.company}
        </span>
      </figcaption>
      <div className="mt-4 border-t border-[var(--hairline)] pt-4">
        <QuoteMark />
      </div>
      <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg)]/80">
        {t.quote}
      </blockquote>
      <div className="mt-2 flex justify-end">
        <QuoteMark closing />
      </div>
    </figure>
  );
}

function Row({
  items,
  reverse = false,
  duration = 80,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration?: number;
}) {
  // Content doubled for a seamless -50% loop.
  const doubled = [...items, ...items];
  return (
    <div className="marquee-host [overflow-x:clip] py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        // w-max: the flex row's box must match its content width, not the
        // clipped parent's width. Without it, the `-50%` in the marquee
        // keyframe is computed against the viewport (~1120px) instead of
        // the doubled-row width (~4900px), and the animation wraps after
        // only ~560px — exactly the "restart mid-flow" glitch.
        className={`${reverse ? "animate-marquee-right" : "animate-marquee"} flex w-max shrink-0 items-stretch`}
        style={{ animationDuration: `${duration}s` }}
        aria-hidden="true"
      >
        {doubled.map((t, i) => (
          // pr-6 (not mr-6) so the trailing gap is part of the wrapper's
          // width. Browsers exclude a trailing margin from scrollWidth, which
          // made translate:-50% under-shoot by half a gap (12px) and produced
          // a visible jump at each loop boundary. Padding is included, so
          // -50% now lands exactly on the start of the duplicate set.
          <div key={`${t.name}-${i}`} className="shrink-0 pr-6">
            <Card t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="section-y rule-t"
    >
      <div className="mx-auto max-w-6xl px-[var(--space-gutter)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">In their words</p>
            <h2
              id="social-proof-heading"
              className="group font-display mt-3 w-fit text-display-sm font-light"
            >
              <span className="relative inline-block">
                The customers speak.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </span>
            </h2>
            <p className="mt-3 text-[length:var(--text-step-1)] text-[var(--fg)]/70">
              From some of the people we&apos;ve built for.
            </p>
          </div>
          <ProofBadge className="shrink-0" />
        </div>
      </div>

      {/* Mobile: a single horizontal swipe row (user controls the pace).
          Desktop (sm+): two opposite-direction marquee rows. */}
      <div className="mt-10 sm:hidden">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--space-gutter)] px-[var(--space-gutter)] pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none]"
        >
          {MOBILE_ROW.map((t) => (
            <div key={t.name} className="snap-start">
              <Card t={t} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 hidden flex-col gap-6 sm:flex">
        {/* Durations chosen so both rows move at the SAME visible speed
            (~185 px/s). ROW_ONE has 6 cards, ROW_TWO has 5, so equal
            durations would make row 1 look faster; the ratio matches
            their content widths. */}
        <Row items={ROW_ONE} duration={36} />
        <Row items={ROW_TWO} reverse duration={30} />
      </div>

      {/* Accessible fallback: real content, not the visual duplicates. */}
      <ul className="sr-only">
        {testimonials.map((t) => (
          <li key={t.name}>
            <blockquote>{t.quote}</blockquote>
            <cite>
              — {t.name}, {t.role}, {t.company}
            </cite>
          </li>
        ))}
      </ul>
    </section>
  );
}
