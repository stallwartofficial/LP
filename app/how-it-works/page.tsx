import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactBanner } from "@/components/ContactBanner";
import { site } from "@/data/site";
import { breadcrumbSchema, pageMeta, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "How It Works",
  description:
    "How to work with Stallwart: the engagement journey from first call to production handover. Fixed price per phase, full ownership, no lock-in. Response within one hour.",
  path: "/how-it-works",
});

const STEPS = [
  {
    n: "01",
    title: "First call",
    body: "You describe the problem. We listen, ask questions, and tell you honestly whether a custom build is the right move or whether something off the shelf already solves it. No pitch deck, no proposal. One hour, and you leave knowing the shape of the engagement or knowing it is not the right fit.",
    outcome: "A clear yes, no, or 'here is what to try first.'",
  },
  {
    n: "02",
    title: "Paid discovery sprint",
    body: "We map the workflow the system has to survive: how the work actually happens, where it breaks, what failure costs, and what the edge cases look like. This produces a written technical design and architecture that your engineers can interrogate. You can take this document to another team and build it yourself.",
    outcome: "A written architecture you own, whether or not you continue.",
  },
  {
    n: "03",
    title: "Fixed-price build phases",
    body: "The build is scoped into phases, each with a fixed price approved before work starts. No hourly billing, no surprise invoices. We build against your real data and real exceptions, not the happy path. You see working software at the end of each phase, not a status update.",
    outcome: "Working software at each milestone, at a price you approved.",
  },
  {
    n: "04",
    title: "Production and handover",
    body: "The system ships to production with observability, rollback, and documentation. Source code, infrastructure definitions, runbooks, and everything else are yours outright. We do not retain licenses, we do not build in dependencies on us, and we do not charge to hand it over.",
    outcome: "You own everything. No lock-in, no recurring dependency.",
  },
];


export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How It Works", path: "/how-it-works" },
          ]),
          webPageSchema({ name: "How It Works", description: "How to work with Stallwart: the engagement journey from first call to production handover.", path: "/how-it-works" }),
        ]}
      />
      <main className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <p className="eyebrow">How it works</p>
          <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
            From first call to{" "}
            <span className="text-gold-sheen italic">you own it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] leading-relaxed text-[var(--fg)]/75">
            Stallwart is not a SaaS product you sign up for. It is an
            engineering company that builds custom AI systems around your
            business. Every engagement follows the same four steps, and you
            can walk away with what you have after any one of them.
          </p>

          {/* Engagement steps */}
          <ol className="mt-16 space-y-0">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className={`grid gap-6 py-10 sm:grid-cols-[4rem_1fr] ${i > 0 ? "rule-t" : ""}`}
              >
                <span className="font-display text-[3rem] font-light leading-none tracking-[-0.02em] text-[var(--fg)]/15">
                  {step.n}
                </span>
                <div>
                  <h2 className="font-display text-[length:var(--text-step-2)] font-light leading-tight">
                    {step.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-[var(--fg)]/80">
                    {step.body}
                  </p>
                  <p className="mt-3 text-sm font-medium text-[var(--accent-text)]">
                    → {step.outcome}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* What Stallwart is and is not */}
          <section className="rule-t mt-4 pt-14">
            <h2 className="font-display text-display-sm font-light">
              What this is,{" "}
              <span className="text-gold-sheen italic">and what it is not.</span>
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                <h3 className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--accent-text)]">
                  Stallwart is
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--fg)]/80">
                  <li>An AI-first engineering company</li>
                  <li>Custom systems built around your business</li>
                  <li>Fixed price, full ownership, no lock-in</li>
                  <li>30+ businesses served, 10+ returned to build again</li>
                  <li>Remote-first, working with clients worldwide</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
                <h3 className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--fg)]/50">
                  Stallwart is not
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--fg)]/60">
                  <li>A SaaS product with a public API or self-service sign-up</li>
                  <li>A staffing agency or body shop</li>
                  <li>A marketplace or platform you subscribe to</li>
                  <li>An open-source project or framework</li>
                  <li>A consulting firm that delivers slide decks</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Next action */}
          <section className="rule-t mt-14 pt-14 text-center">
            <h2 className="font-display text-display-sm font-light">
              Ready to start?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[var(--fg)]/70">
              The first call is free, takes about an hour, and ends with a
              clear answer: whether a custom build is the right move for your
              problem or whether something else solves it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                />
                <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
                  {site.cta.primary}
                </span>
              </Link>
              <Link
                href="/offer"
                className="link-draw text-sm font-medium text-[var(--accent-text)]"
              >
                See what we build →
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--fg)]/50">
              {site.contact.email} · Response within one hour
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
