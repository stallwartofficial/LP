import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { getOffering } from "@/data/offerings";

// Home page insights block. Replaces the old standalone case studies section:
// case studies are posts now, so the home page surfaces the three most recent
// items of either kind and links into one namespace.
//
// Also an internal linking surface. Fresh, crawlable links from the highest
// authority page to the content built to rank.
export function InsightsTeaser() {
  const featured = blogPosts.slice(0, 4);

  return (
    <section
      aria-labelledby="insights-teaser-heading"
      className="section-y rule-t px-[var(--space-gutter)]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Insights</p>
            <h2
              id="insights-teaser-heading"
              className="font-display mt-4 text-display-sm font-light"
            >
              Where the work breaks.
            </h2>
            <p className="mt-4 text-[var(--fg)]/70">
              Case studies and writing on how operations actually fail, and what
              holds instead.
            </p>
          </div>

          <Link
            href="/blog"
            className="link-draw shrink-0 text-sm font-medium text-[var(--accent-text)]"
          >
            All insights →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-lift scroll-rise group flex flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${
                    post.kind === "case-study"
                      ? "border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-text)]"
                      : "border border-[var(--hairline-strong)] text-[var(--fg)]/60"
                  }`}
                >
                  {post.kind === "case-study" ? "Case study" : "Article"}
                </span>
                {post.industry && (
                  <span className="text-xs text-[var(--fg)]/65">
                    {post.industry}
                  </span>
                )}
              </div>

              <h3 className="font-display mt-4 flex-1 text-[length:var(--text-step-2)] font-normal leading-snug">
                {post.title}
              </h3>

              <p className="mt-3 text-sm text-[var(--fg)]/70">{post.excerpt}</p>

              <span className="rule-t mt-6 flex items-center justify-between pt-4 text-xs text-[var(--fg)]/65">
                <span>{getOffering(post.offering)?.name ?? post.offering}</span>
                <span className="flex items-center gap-3">
                  {post.readingMinutes} min
                  <span
                    aria-hidden="true"
                    className="arrow-shift text-[var(--accent-text)]"
                  >
                    →
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
