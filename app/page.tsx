import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { StoryTeaser } from "@/components/StoryTeaser";
import { SocialProof } from "@/components/SocialProof";

import { ContactBanner } from "@/components/ContactBanner";
import { JsonLd } from "@/components/JsonLd";
import { webSiteSchema, serviceSchema, webPageSchema, faqSchema } from "@/lib/seo";
import { site } from "@/data/site";
import { faqs } from "@/data/faqs";
import { SITE_UPDATED } from "./sitemap";
import Link from "next/link";

// The company front door, restructured for conversion + clarity.
//
//   1  Hero             who we are + the flip-board scope, in 5 seconds
//   2  ProblemSolution  the "that's my problem" comprehension moment
//   3  WhatWeBuild      the bento: anything AI, to production
//   4  Architecture     the engine underneath, plain + interactive
//   5  InsightsTeaser   case studies, proof it ships
//   6  Commitments      the terms: ownership, fixed price, no lock-in
//   7  SocialProof      testimonials, real names
//   8  StoryTeaser      the founder, human trust
//   9  AskAI            verify us with any AI (rare GEO signal)
//  10  ContactBanner    the close, Apple-style
export default function Home() {
  return (
    <>
      <JsonLd
        schema={[
          webSiteSchema(),
          webPageSchema({
            name: `${site.company} | ${site.tagline}`,
            description: site.description,
            path: "/",
            datePublished: "2026-01-01",
            dateModified: SITE_UPDATED,
          }),
          serviceSchema(),
          faqSchema(faqs.slice(0, 6)),
        ]}
      />
      <Hero />
      <ProblemSolution />
      <WhatWeBuild />
      <SocialProof />
      <StoryTeaser />
      <ContactBanner />

      {/* Homepage FAQ: 6 key questions, same two-column layout as /faq */}
      <section className="px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Common questions</p>
          <h2 className="font-display mt-3 text-display font-light">
            Answered, plainly.
          </h2>
          <dl className="mt-8 border-t border-[var(--hairline)]">
            {faqs
              .filter((faq) =>
                [
                  "What does Stallwart do?",
                  "What kinds of things can you build?",
                  "How much does it cost?",
                  "How long does it take to build?",
                  "Do I own what you build?",
                  "How do I start working with Stallwart?",
                ].includes(faq.question),
              )
              .map((faq, i) => (
                <div
                  key={faq.question}
                  className="row-nudge grid gap-x-10 gap-y-2 border-b border-[var(--hairline)] py-6 sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]"
                >
                  <dt className="flex items-baseline gap-3 font-display text-[length:var(--text-step-1)] leading-snug">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent-text)]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </dt>
                  <dd className="text-sm leading-relaxed text-[var(--fg)]/70">
                    {faq.answer}
                  </dd>
                </div>
              ))}
          </dl>
          <p className="mt-8 text-sm text-[var(--fg)]/60">
            More questions?{" "}
            <Link
              href="/faq"
              className="link-draw text-[var(--accent-text)]"
            >
              See all answers
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="link-draw text-[var(--accent-text)]"
            >
              ask us directly
            </Link>
            .
          </p>
        </div>
      </section>

    </>
  );
}
