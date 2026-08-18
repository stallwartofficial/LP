import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { offerings, getOffering } from "@/data/offerings";
import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { StatusPill } from "@/components/Offerings";
import { breadcrumbSchema, faqSchema, offeringSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offerings.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) return {};
  return {
    title: offering.name,
    description: offering.summary,
    alternates: { canonical: `/offer/${offering.slug}` },
    openGraph: {
      title: `${offering.name}, by ${site.company}`,
      description: offering.summary,
    },
  };
}

// One offering, in depth. The only level of the site where a single product or
// service is the subject.
export default async function OfferingPage({ params }: Props) {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) notFound();

  const inDevelopment = offering.status === "in-development";
  // Related reading, so every offering page links into the content built to
  // rank for its query cluster.
  const related = blogPosts
    .filter((p) => p.offering === offering.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        schema={[
          offeringSchema(offering),
          ...(offering.faqs.length > 0 ? [faqSchema(offering.faqs)] : []),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "What We Offer", path: "/offer" },
            { name: offering.name, path: `/offer/${offering.slug}` },
          ]),
        ]}
      />

      {/* ---- Header ---- */}
      <header className="px-[var(--space-gutter)] pb-4 pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/offer"
            className="link-draw text-sm text-[var(--accent-text)]"
          >
            ← Everything we build
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="eyebrow">{offering.category}</span>
            <StatusPill status={offering.status} />
          </div>

          <h1 className="font-display mt-5 text-display-lg font-light">
            {offering.name}
          </h1>
          <p className="mt-4 text-[length:var(--text-step-2)] font-light text-[var(--fg)]/60">
            {offering.tagline}
          </p>

          <p className="mt-6 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[var(--hairline)] pt-5 text-sm text-[var(--fg)]/80">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
              Pricing
            </span>
            {offering.pricing}
          </p>

          {/* The problem, stated before the pitch. */}
          <p className="mt-9 border-l-2 border-[var(--accent)] pl-5 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/85">
            {offering.problem}
          </p>

          <p className="mt-7 text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
            {offering.description}
          </p>

          {inDevelopment && (
            <p className="mt-9 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-6 text-sm text-[var(--fg)]/75">
              <strong className="font-medium text-[var(--fg)]">
                This offering is still being built.
              </strong>{" "}
              It is not available yet, and we would rather say so than describe
              something that does not exist. If it is relevant to your team, book
              a call and we will tell you honestly where it stands.
            </p>
          )}
        </div>
      </header>

      {/* ---- Built for ---- */}
      <section
        aria-labelledby="built-for"
        className="section-y px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Built for</p>
          <h2
            id="built-for"
            className="font-display mt-3 text-display-sm font-light"
          >
            Who this is for
          </h2>
          <ul className="mt-8 grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
            {offering.builtFor.map((who) => (
              <li
                key={who}
                className="scroll-fade bg-[var(--bg)] p-5 text-sm text-[var(--fg)]/80"
              >
                <span
                  aria-hidden="true"
                  className="mb-3 block h-1 w-6 bg-[var(--accent)]"
                />
                {who}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Capabilities ---- */}
      {offering.capabilities.length > 0 && (
        <section
          aria-labelledby="capabilities"
          className="section-y rule-t bg-[var(--surface)] px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">Mechanism</p>
            <h2
              id="capabilities"
              className="font-display mt-3 text-display-sm font-light"
            >
              {inDevelopment ? "What it will do" : "How it works"}
            </h2>

            <ol className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {offering.capabilities.map((c, i) => (
                <li key={c.title} className="scroll-rise">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)]/60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{c.eyebrow}</span>
                  </div>
                  <h3 className="font-display mt-2 text-[length:var(--text-step-1)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/75">
                    {c.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ---- Integrations ---- */}
      {offering.integrations.length > 0 && (
        <section
          aria-labelledby="integrations"
          className="section-y rule-t px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">Surfaces</p>
            <h2
              id="integrations"
              className="font-display mt-3 text-display-sm font-light"
            >
              Plugs into what you already use
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {offering.integrations.map((integration) => (
                <li
                  key={integration}
                  className="rounded-full border border-[var(--hairline-strong)] px-4 py-2 text-sm text-[var(--fg)]/75 transition-colors hover:border-[var(--accent)]"
                >
                  {integration}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---- FAQ (AEO surface) ---- */}
      {offering.faqs.length > 0 && (
        <section
          aria-labelledby="offering-faq"
          className="section-y rule-t px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">FAQ</p>
            <h2
              id="offering-faq"
              className="font-display mt-3 text-display-sm font-light"
            >
              {offering.name}, answered
            </h2>
            <dl className="mt-8">
              {offering.faqs.map((f) => (
                <div key={f.question} className="rule-t last:rule-b">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6">
                      <dt className="font-display text-[length:var(--text-step-1)] transition-colors group-hover:text-[var(--accent-text)]">
                        {f.question}
                      </dt>
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[var(--accent-text)] transition-transform duration-500 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <dd className="pb-7 text-[var(--fg)]/70">{f.answer}</dd>
                  </details>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ---- Related reading ---- */}
      {related.length > 0 && (
        <section
          aria-labelledby="related"
          className="section-y rule-t px-[var(--space-gutter)]"
        >
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">Further reading</p>
            <h2
              id="related"
              className="font-display mt-3 text-display-sm font-light"
            >
              {offering.name} in practice
            </h2>
            <ul className="mt-8">
              {related.map((post) => (
                <li key={post.slug} className="rule-t last:rule-b">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="row-nudge group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]">
                        {post.kind === "case-study" ? "Case study" : "Article"}
                      </span>
                      <span className="font-display mt-1 block text-[length:var(--text-step-1)]">
                        {post.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="arrow-shift shrink-0 text-[var(--accent-text)]"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---- Close ---- */}
      <section className="section-y rule-t px-[var(--space-gutter)]">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-display-sm font-light">
            {inDevelopment
              ? "Want to hear where this is going?"
              : `See ${offering.name} on your own workflow.`}
          </h2>
          <Link
            href="/contact"
            className="btn-wipe mt-7 inline-block rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
          >
            {site.cta.primary}
          </Link>
        </div>
      </section>
    </>
  );
}
