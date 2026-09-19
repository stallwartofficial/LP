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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* ---------------- The taped photograph, scaled up ---------------- */}
          <div className="pinboard rounded-2xl border border-[var(--hairline)] p-6 sm:p-10">
            <figure className="photo-taped mx-auto max-w-[17rem] bg-[var(--bg-raised)] p-3.5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/arun-saravanan-founder-stallwart.jpg"
                  alt={`${site.founder.fullName}, ${site.founder.role} of ${site.company}`}
                  fill
                  sizes="(min-width: 1024px) 40rem, (min-width: 640px) 70vw, 90vw"
                  loading="lazy"
                  className="object-cover object-top"
                />
              </div>

              <figcaption className="mt-4 px-1 pb-1">
                <span className="font-display block text-[length:var(--text-step-2)] italic">
                  {site.founder.fullName}
                </span>
                <span className="font-mono mt-1 block text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/70">
                  {site.founder.role}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* ---------------- Eyebrow, pull-quote, tight bio ---------------- */}
          <div>
            <p className="eyebrow">The origin</p>
            <blockquote
              id="story-teaser-heading"
              className="font-display mt-5 font-light leading-[1.1] text-[clamp(1.8rem,1.1rem+2.4vw,3rem)]"
            >
              <span aria-hidden="true" className="mr-1 text-[var(--accent)]/50">
                &ldquo;
              </span>
              The AI industry has a{" "}
              <span className="text-gold-sheen italic">confidence</span> problem,
              not a capability problem.
            </blockquote>

            <p className="mt-7 max-w-xl text-[length:var(--text-step-1)] text-[var(--fg)]/80">
              {site.founder.name} founded {site.company} to close the gap between a
              demo and production, engineering systems built to be audited, not
              just believed.
            </p>

            <p className="mt-4 max-w-xl text-sm text-[var(--fg)]/65">
              {site.founder.credential}
            </p>

            <Link
              href="/story"
              className="link-draw mt-8 inline-block text-sm font-medium text-[var(--accent-text)]"
            >
              Read the full story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
