import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { industries, getIndustry, industryShort } from "@/data/industries";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import {
  pageMeta,
  breadcrumbSchema,
  industryServiceSchema,
  faqSchema,
} from "@/lib/seo";

// One dedicated, crawlable page per industry: "AI for {industry}". Targets the
// long-tail intent ("AI for banking", "AI in healthcare") that answer engines
// and search reward, all driven from data/industries.ts so copy, schema, and
// page never drift.
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  const short = industryShort(ind.name);
  return pageMeta({
    title: `AI for ${ind.name}`,
    description: `In ${short}, ${site.company} builds AI that ${ind.title} ${ind.detail}`.slice(0, 300),
    path: `/industries/${ind.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const short = industryShort(ind.name);
  // A small, honest FAQ so the page is answer-engine ready.
  const faqs = [
    {
      question: `What can AI do for ${short}?`,
      answer: `In ${short}, ${site.company} builds AI that ${ind.title} ${ind.detail}`,
    },
    {
      question: `How does ${site.company} build AI for ${short}?`,
      answer:
        "On one engineering standard: systems that run in production, report their own uncertainty, and are yours to own outright. Fixed price per phase, no lock-in.",
    },
    {
      question: `Where does ${site.company} work?`,
      answer:
        "Remote-first, with clients worldwide. Start with a short call and we scope the build from there.",
    },
  ];

  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <div>
      <JsonLd
        schema={[
          industryServiceSchema(ind.slug),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: ind.name, path: `/industries/${ind.slug}` },
          ]),
        ].filter(Boolean)}
      />

      <section className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="eyebrow">AI across your industry</p>
            <h1 className="font-display mt-3 text-display-lg font-light leading-[1.05]">
              AI for <span className="text-gold-sheen italic">{ind.name}</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--text-step-2)] leading-relaxed text-[var(--fg)]/85">
              In {short}, we build AI that {ind.title}
            </p>
            <p className="mt-4 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/70">
              {ind.detail}
            </p>
          </Reveal>

          {/* Outcomes */}
          <Reveal>
            <h2 className="font-display mt-14 text-display-sm font-light">
              What you get.
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ind.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-4 text-[length:var(--text-step-0)] text-[var(--fg)]/85">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Systems / tags */}
          <Reveal>
            <h2 className="font-display mt-14 text-display-sm font-light">
              Systems we build for {short}.
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ind.tags.map((t) => (
                <li key={t} className="rounded-full border border-[var(--hairline)] px-3.5 py-2 text-sm text-[var(--fg)]/80">
                  {t}
                </li>
              ))}
            </ul>
            <p className="font-display mt-8 max-w-2xl text-[length:var(--text-step-2)] font-light italic text-[var(--fg)]/90">
              {ind.closer}
            </p>
            <Link
              href="/contact"
              className="btn-wipe mt-8 inline-flex items-center rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
            >
              Build AI for {short}
            </Link>
          </Reveal>

          {/* FAQ (visible, matches schema) */}
          <Reveal>
            <h2 className="font-display mt-16 text-display-sm font-light">
              Questions, answered.
            </h2>
            <dl className="mt-6 divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
              {faqs.map((f) => (
                <div key={f.question} className="py-5">
                  <dt className="font-display text-[length:var(--text-step-1)]">{f.question}</dt>
                  <dd className="mt-2 text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/70">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Related industries: internal links */}
          <Reveal>
            <h2 className="font-display mt-16 text-display-sm font-light">
              AI across other industries.
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/industries/${o.slug}`}
                    className="inline-block rounded-full border border-[var(--hairline)] px-3.5 py-2 text-sm text-[var(--fg)]/75 transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--fg)]"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
