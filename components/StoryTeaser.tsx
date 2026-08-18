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
// The photo is a marked placeholder. It renders as a deliberate empty frame with
// a caption rather than a stock portrait, because a stock face on a founder story
// is worse than an honest gap.
//
// TODO(owner): drop a real portrait at public/images/founder.jpg and swap the
// placeholder block for next/image.
export function StoryTeaser() {
  return (
    <section
      aria-labelledby="story-teaser-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
          {/* ---------------- The taped photograph ---------------- */}
          <div className="pinboard rounded-2xl border border-[var(--hairline)] p-8 sm:p-10">
            <figure className="photo-taped bg-[var(--bg-raised)] p-3">
              {/* Placeholder frame. Deliberately empty, not a stock portrait. */}
              <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-[var(--hairline-strong)] bg-[var(--surface)]">
                <span className="font-mono px-4 text-center text-[9px] uppercase leading-relaxed tracking-[0.16em] text-[var(--fg)]/60">
                  Portrait
                  <br />
                  to come
                </span>
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
              className="font-display weight-in mt-4 text-display-sm font-light"
            >
              <span aria-hidden="true" className="mr-1 text-[var(--accent)]/50">
                &ldquo;
              </span>
              Follow through is not a discipline problem. It is an{" "}
              <span className="text-gold-sheen italic">engineering</span>{" "}
              problem, and almost nobody was treating it like one.
            </blockquote>

            <p className="mt-8 max-w-xl text-[var(--fg)]/75">
              {site.founder.name} founded {site.company} after meeting the same
              failure in building after building. The enquiry nobody answered in
              time. The draft that sat in review. The compliance question
              everyone hoped belonged to someone else. Never carelessness, just
              more to hold than there were hands to hold it.
            </p>

            <p className="mt-4 max-w-xl text-[var(--fg)]/75">
              The standard that came out of it is the company: systems built with
              AI that are reliable enough to leave alone, honest enough to trust,
              and scalable enough to still be right at ten times the volume.
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
