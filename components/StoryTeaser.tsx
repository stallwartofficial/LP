import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

// The origin.
//
// WHAT CHANGED. This was a centred pull quote over two paragraphs of prose:
// correct information, no presence, and nothing human in the one section that is
// supposed to be about a person.
//
// It now uses the tactile material the testimonials established: a taped
// photograph on pinboard, beside the quote. Human sections of this site share
// paper and tape; engineering sections share hairlines and mono. That split is a
// system rather than decoration.
//
// The portrait loads from /images/founder.jpg. Referenced by path rather than
// static import on purpose: a missing file then degrades to a broken image at
// runtime instead of failing the build, which keeps the site deployable while the
// asset is being swapped.
//
// `sizes` is set so a phone never downloads the desktop-width file. The frame is
// 4:5 with object-cover, so the source aspect ratio does not have to match.
export function StoryTeaser() {
  return (
    <section
      aria-labelledby="story-teaser-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[17rem_minmax(0,34rem)] lg:justify-center lg:gap-14">
          {/* ---------------- The taped photograph ---------------- */}
          <div className="pinboard rounded-2xl border border-[var(--hairline)] p-8 sm:p-10">
            <figure className="photo-taped bg-[var(--bg-raised)] p-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/founder.jpg"
                  alt={`${site.founder.name}, ${site.founder.role} of ${site.company}`}
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 60vw, 90vw"
                  // Eager: the origin block is high enough on the page to be in
                  // or near the first viewport on a tall screen, so lazy loading
                  // buys a pop-in rather than a saving on a 137KB asset.
                  loading="eager"
                  className="object-cover object-top"
                />
              </div>

              <figcaption className="mt-3 px-1 pb-1">
                <span className="font-display block text-[length:var(--text-step-1)] italic">
                  {site.founder.name}
                </span>
                <span className="font-mono mt-0.5 block text-[9px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
                  {site.founder.role}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* ---------------- The origin, in his words ---------------- */}
          <div>
            <p className="eyebrow">The origin</p>

            <blockquote
              id="story-teaser-heading"
              className="font-display mt-4 text-display-sm font-light"
            >
              <span aria-hidden="true" className="mr-1 text-[var(--accent)]/50">
                &ldquo;
              </span>
              The AI industry has a{" "}
              <span className="text-gold-sheen italic">confidence</span> problem,
              not a capability problem.
            </blockquote>

            <p className="mt-8 text-[var(--fg)]/75">
              {site.founder.name} founded {site.company} on a direct
              observation: systems get sold on how convincingly they perform in
              a controlled demo, and the gap between that and real-world
              reliability becomes someone else&apos;s problem the moment the
              invoice clears.
            </p>

            <p className="mt-4 text-[var(--fg)]/75">
              He built {site.company} to close that gap, engineering AI systems
              that report their own uncertainty instead of asserting through it,
              and that are built to be audited, not just believed.
            </p>

            <p className="mt-4 text-sm text-[var(--fg)]/60">
              {site.founder.credential}
            </p>

            <Link
              href="/story"
              className="link-draw mt-7 inline-block text-sm font-medium text-[var(--accent-text)]"
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
