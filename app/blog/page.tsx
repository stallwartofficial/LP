import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, caseStudyPosts, articlePosts } from "@/data/blog";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, blogListSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Case Studies",
  description:
    "Case studies and writing from Stallwart on operations, AI systems, and the work that quietly falls through. Written for operators who want the mechanism.",
  path: "/blog",
});

// One content surface. Case studies and articles live together here; the
// standalone /case-studies route redirects in (see next.config.ts), which
// concentrates ranking signal on one namespace instead of splitting it.
export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        schema={[
          blogListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/blog" },
          ]),
        ]}
      />

      <header className="px-[var(--space-gutter)] pb-4 pt-36 lg:pt-44">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
            <p className="eyebrow">Case studies</p>
          </div>

          <h1 className="font-display mt-6 max-w-3xl text-display-lg font-light">
            Case studies and notes from{" "}
            <span className="text-gold-sheen italic">the messy middle.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            How work actually breaks inside a business, and what it takes to
            build something that holds. Written for operators who want the
            mechanism, not the vocabulary.
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div className="flex items-baseline gap-2">
              <dt className="text-[var(--fg)]/65">Case studies</dt>
              <dd className="font-medium">{caseStudyPosts.length}</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="text-[var(--fg)]/65">Articles</dt>
              <dd className="font-medium">{articlePosts.length}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section
        aria-label="All posts"
        className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-10"
      >
        <div className="mx-auto max-w-6xl">
          {blogPosts.length === 0 ? (
            <p className="text-[var(--fg)]/70">First posts are on the way.</p>
          ) : (
            /* One post per full-width row. A ruled editorial list reads more
               senior than a card grid and fits more in less height. */
            <ol className="border-t border-[var(--hairline)]">
              {blogPosts.map((post) => (
                <li key={post.slug} className="border-b border-[var(--hairline)]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="row-nudge group grid items-baseline gap-2 py-5 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-6"
                  >
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                        post.kind === "case-study"
                          ? "text-[var(--accent-text)]"
                          : "text-[var(--fg)]/60"
                      }`}
                    >
                      {post.kind === "case-study" ? "Case study" : "Article"}
                    </span>

                    <span className="min-w-0">
                      <span className="font-display block text-[length:var(--text-step-2)] leading-tight transition-colors group-hover:text-[var(--accent-text)]">
                        {post.title}
                      </span>
                      <span className="mt-1 block truncate text-sm text-[var(--fg)]/70">
                        {post.excerpt}
                      </span>
                    </span>

                    <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/60">
                      {post.readingMinutes}m
                      <span
                        aria-hidden="true"
                        className="arrow-shift text-[var(--accent-text)]"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
