import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.excerpt,
    openGraph: { title: cs.title, description: cs.excerpt },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    about: cs.industry,
    publisher: { "@type": "Organization", name: site.company },
    description: cs.excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <Link
          href="/#case-studies"
          className="text-sm text-[var(--accent)] hover:underline"
        >
          ← All case studies
        </Link>
        <span className="mt-6 block text-xs uppercase tracking-widest text-[var(--accent)]">
          {cs.industry}
        </span>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{cs.title}</h1>
        <p className="mt-4 text-lg text-[var(--fg)]/70">{cs.excerpt}</p>

        <div className="mt-10 space-y-8 text-[var(--fg)]/85">
          <section>
            <h2 className="font-display text-xl">The Challenge</h2>
            <p className="mt-2">
              {/* TODO: replace with real/finalized narrative content per
              industry — placeholder structure demonstrates the AEO-friendly
              Q&A pattern (challenge/solution/outcome) for crawlers. */}
              Content pending — structure is ready for real challenge
              narrative specific to {cs.industry}.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl">The Solution</h2>
            <p className="mt-2">
              Content pending — structure is ready for real solution
              narrative specific to {cs.industry}.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl">The Outcome</h2>
            <p className="mt-2 italic text-[var(--fg)]/60">
              Illustrative example — real outcome data to be added once
              available.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
