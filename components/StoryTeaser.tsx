import Link from "next/link";
import { site } from "@/data/site";

// Editorial pull quote. The origin thesis stated once, large, with nothing
// competing for attention.
export function StoryTeaser() {
  return (
    <section
      aria-labelledby="story-teaser-heading"
      className="section-y px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow scroll-fade">The origin</p>

        <blockquote
          id="story-teaser-heading"
          className="scroll-rise font-display mt-7 text-display-sm font-light"
        >
          <span aria-hidden="true" className="mr-1 text-[var(--accent)]/50">
            &ldquo;
          </span>
          Follow through is not a discipline problem. It is an{" "}
          <span className="text-gold-sheen italic">engineering</span> problem,
          and almost nobody was treating it like one.
        </blockquote>

        <div className="scroll-fade mt-10 sm:pl-8">
          <div className="rule-t pt-6 sm:border-l sm:border-t-0 sm:border-[var(--hairline)] sm:pl-8 sm:pt-0">
            <p className="max-w-xl text-[var(--fg)]/75">
              {site.founder.name} founded {site.company} after meeting the same
              failure in building after building. The enquiry nobody answered in
              time. The draft that sat in review. The compliance question
              everyone hoped belonged to someone else. Never carelessness, just
              more to hold than there were hands to hold it.
            </p>
            <p className="mt-4 max-w-xl text-[var(--fg)]/75">
              The standard that came out of it is the company: systems built
              with AI that are reliable enough to leave alone, honest enough to
              trust, and scalable enough to still be right at ten times the
              volume.
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
