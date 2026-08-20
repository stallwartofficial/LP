import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { offerings, getOffering } from "@/data/offerings";
import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { StatusPill } from "@/components/Offerings";
import { Faq } from "@/components/Faq";
import { breadcrumbSchema, offeringSchema } from "@/lib/seo";

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

      {/* ---- Built for: a spec strip across the width, so it reads as a
          deliberate set rather than a short hanging list ---- */}
      <section
        aria-labelledby="built-for"
        className="section-y px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow" id="built-for">
            Built for
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {offering.builtFor.map((who, i) => (
              <li
                key={who}
                className="border-t border-[var(--hairline)] pt-5"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display mt-3 text-[length:var(--text-step-1)] leading-snug">
                  {who}
                </p>
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

            {/* Steps sit on a continuous rail (border-l with no row gap), each
                marked by a node, so the sequence reads as a connected flow. */}
            <ol className="mt-8 grid gap-x-12 sm:grid-cols-2">
              {offering.capabilities.map((c, i) => (
                <li
                  key={c.title}
                  className="scroll-rise relative border-l border-[var(--hairline)] py-5 pl-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[-4.5px] top-[1.55rem] h-2 w-2 rounded-full border border-[var(--accent)] bg-[var(--bg)]"
                  />
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
            <p className="mt-4 max-w-2xl text-sm text-[var(--fg)]/60">
              No rip and replace. It runs on what you already operate.
            </p>
            <ul className="mt-6 grid gap-x-12 gap-y-1 sm:grid-cols-2">
              {offering.integrations.map((integration) => (
                <li
                  key={integration}
                  className="row-nudge flex items-baseline gap-3 border-b border-[var(--hairline)] py-3.5 text-sm text-[var(--fg)]/85"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-text)]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {integration}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---- FAQ (AEO surface): the shared spec-sheet ledger ---- */}
      {offering.faqs.length > 0 && (
        <Faq heading={`${offering.name}, answered`} items={offering.faqs} />
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
