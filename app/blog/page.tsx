import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, caseStudyPosts, articlePosts } from "@/data/blog";
import { getOffering } from "@/data/offerings";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, blogListSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Insights and Case Studies",
  description:
    "Case studies and writing from Stallwart on operations, AI systems, and the work that quietly falls through. Written for operators who want the mechanism.",
  alternates: { canonical: "/blog" },
};

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
            { name: "Insights", path: "/blog" },
          ]),
        ]}
      />

      <header className="px-[var(--space-gutter)] pb-4 pt-36 lg:pt-44">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-[var(--accent)]" />
            <p className="eyebrow">Insights</p>
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
            /* Cards, not stacked rows. Four full-width rows made a short index
               feel like a long scroll. */
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {blogPosts.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-lift enter-rise group flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${
                          post.kind === "case-study"
                            ? "border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-text)]"
                            : "border border-[var(--hairline-strong)] text-[var(--fg)]/70"
                        }`}
                      >
                        {post.kind === "case-study" ? "Case study" : "Article"}
                      </span>
                    </div>

                    <h2 className="font-display mt-4 text-[length:var(--text-step-2)] leading-tight transition-colors group-hover:text-[var(--accent-text)]">
                      {post.title}
                    </h2>

                    <p className="mt-3 flex-1 text-xs leading-relaxed text-[var(--fg)]/70">
                      {post.excerpt}
                    </p>

                    <span className="rule-t mt-5 flex items-center justify-between pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/70">
                      <span>
                        {post.industry ??
                          getOffering(post.offering)?.name ??
                          post.offering}
                      </span>
                      <span className="flex items-center gap-2">
                        {post.readingMinutes}m
                        <span
                          aria-hidden="true"
                          className="arrow-shift text-[var(--accent-text)]"
                        >
                          →
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
