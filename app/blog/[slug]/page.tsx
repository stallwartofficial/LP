import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getBlogPost } from "@/data/blog";
import { getOffering } from "@/data/offerings";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.topic,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

// One template for both post kinds. Case studies add an honesty note, a
// structural outcomes list, and a metrics slot; articles skip them.
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const isCaseStudy = post.kind === "case-study";
  const offering = getOffering(post.offering);

  return (
    <>
      <JsonLd
        schema={[
          articleSchema({
            type: isCaseStudy ? "Article" : "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            path: `/blog/${post.slug}`,
            about: post.topic,
          }),
          // The Q&A blocks are what AI answer engines quote, so they get
          // first class structured data on every post.
          faqSchema(post.qa),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="link-draw text-sm text-[var(--accent-text)]"
          >
            ← All insights
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${
                isCaseStudy
                  ? "border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent-text)]"
                  : "border border-[var(--hairline-strong)] text-[var(--fg)]/60"
              }`}
            >
              {isCaseStudy ? "Case study" : "Article"}
            </span>
            {post.industry && (
              <span className="text-xs text-[var(--fg)]/60">
                {post.industry}
              </span>
            )}
            {offering && (
              <Link
                href={`/offer/${offering.slug}`}
                className="link-draw text-xs text-[var(--accent-text)]"
              >
                {offering.name}
              </Link>
            )}
          </div>

          <h1 className="font-display mt-5 text-display font-light">
            {post.title}
          </h1>

          <p className="mt-5 text-[length:var(--text-step-1)] text-[var(--fg)]/70">
            {post.excerpt}
          </p>

          <p className="rule-t mt-8 flex flex-wrap gap-x-4 gap-y-1 pt-5 text-xs text-[var(--fg)]/65">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>{post.readingMinutes} min read</span>
            <span>{site.company}</span>
          </p>

          {isCaseStudy && (
            <p className="mt-8 border-l-2 border-[var(--accent)] pl-5 text-sm text-[var(--fg)]/65">
              <strong className="font-medium text-[var(--fg)]/85">
                Illustrative scenario.
              </strong>{" "}
              Written for {post.persona}. This is pre launch, so it describes how
              the system addresses the situation rather than results from a named
              customer.
            </p>
          )}

          {/* ---- Body ---- */}
          <div className="mt-14 space-y-14">
            {post.sections.map((section, si) => (
              <section key={section.heading}>
                <h2 className="font-display text-display-sm font-light">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/85">
                  {section.paragraphs.map((para, pi) => (
                    <p
                      key={para}
                      className={
                        si === 0 && pi === 0
                          ? "[&::first-letter]:font-display [&::first-letter]:mr-2 [&::first-letter]:float-left [&::first-letter]:text-[3.75rem] [&::first-letter]:font-light [&::first-letter]:leading-[0.82] [&::first-letter]:text-[var(--accent-text)]"
                          : undefined
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* ---- Case study only: structural outcomes ---- */}
            {post.outcomes && post.outcomes.length > 0 && (
              <section>
                <h2 className="font-display text-display-sm font-light">
                  What actually changes
                </h2>
                <ul className="mt-7 space-y-px bg-[var(--hairline)]">
                  {post.outcomes.map((o) => (
                    <li key={o} className="bg-[var(--bg)] py-5 pl-5">
                      <span className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                        />
                        <span className="text-[var(--fg)]/85">{o}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {post.metrics && post.metrics.length > 0 ? (
                  <dl className="mt-10 grid gap-8 sm:grid-cols-3">
                    {post.metrics.map((m) => (
                      <div key={m.label}>
                        <dd className="font-display text-display-sm font-light text-[var(--accent-text)]">
                          {m.value}
                        </dd>
                        <dt className="mt-2 text-sm text-[var(--fg)]/60">
                          {m.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-7 text-sm italic text-[var(--fg)]/60">
                    We publish numbers once a customer has verified them.
                    Nothing here yet, which is the honest answer.
                  </p>
                )}
              </section>
            )}

            {/* ---- AEO surface: declarative Q&A ---- */}
            <section aria-labelledby="post-qa">
              <span className="eyebrow">The short answers</span>
              <h2
                id="post-qa"
                className="font-display mt-3 text-display-sm font-light"
              >
                Questions this raises
              </h2>
              <dl className="mt-8">
                {post.qa.map((item) => (
                  <div key={item.question} className="rule-t last:rule-b py-6">
                    <dt className="font-display text-[length:var(--text-step-1)]">
                      {item.question}
                    </dt>
                    <dd className="mt-3 text-[var(--fg)]/70">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          {/* ---- Close ---- */}
          <div className="rule-t mt-16 pt-12">
            <h2 className="font-display text-display-sm font-light">
              Recognise this in your own operation?
            </h2>
            <p className="mt-4 max-w-lg text-[var(--fg)]/70">
              Bring us the version of it happening in your business and we will
              tell you which part a system can take over.
            </p>
            <Link
              href="/contact"
              className="btn-wipe mt-7 inline-block rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
            >
              {site.cta.primary}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
