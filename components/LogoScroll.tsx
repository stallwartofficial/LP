import { logoMarks } from "@/data/testimonials";

// Extracted from SocialProof and moved directly beneath the hero, which is
// where a trust bar belongs.
//
// Pure CSS marquee, content doubled for a seamless loop, paused on hover so it
// can actually be read. The strip itself is aria-hidden: it is decorative
// repetition, and the label beside it carries the meaning.
//
// NOTE: these are placeholder marks. The framing is a sector statement rather
// than "trusted by", pending real customer names (constraint 7).
export function LogoScroll({ inHero = false }: { inHero?: boolean } = {}) {
  const marks = [...logoMarks, ...logoMarks];

  return (
    <section
      aria-label="Sectors we build for"
      className={
        inHero
          ? "marquee-host rule-t rule-b overflow-hidden py-3"
          : "rule-t rule-b marquee-host overflow-hidden bg-[var(--surface)] py-6"
      }
    >
      <div
        className={
          inHero
            ? "flex items-center gap-8"
            : "mx-auto flex max-w-6xl items-center gap-8 px-[var(--space-gutter)]"
        }
      >
        <p className="eyebrow shrink-0">Built for teams at scale</p>

        <div className="flex min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            aria-hidden="true"
            className="animate-marquee flex shrink-0 items-center gap-12 pr-12"
          >
            {marks.map((mark, i) => (
              <span
                key={`${mark}-${i}`}
                className="font-display whitespace-nowrap text-sm tracking-[0.2em] text-[var(--fg)]/30"
              >
                {mark}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
