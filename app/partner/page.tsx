import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { PartnerForm } from "@/components/PartnerForm";
import { Reveal } from "@/components/Reveal";
import { type PartnerModel } from "@/components/PartnerEcosystem";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Partner with Stallwart",
  description:
    "Join the Stallwart partner ecosystem. Solutions, white-label, delivery, and referral partnerships to build, sell, and scale intelligent AI systems and custom software together.",
  path: "/partner",
});

// The four ways to partner. Real text, driven into the interactive carousel and
// the mobile list from one source.
const models: PartnerModel[] = [
  {
    key: "solutions",
    short: "Solutions",
    name: "Solutions Partner",
    tagline: "Bring Stallwart products to your customers.",
    blurb:
      "You own the customer. We provide the products, technology, and engineering. You sell it as a Stallwart-powered solution.",
  },
  {
    key: "whitelabel",
    short: "White-label",
    name: "White-label Partner",
    tagline: "Your brand. Stallwart technology.",
    blurb:
      "Sell Stallwart-built products under your own brand. We stay invisible; the product and the customer are yours.",
  },
  {
    key: "delivery",
    short: "Delivery",
    name: "Delivery Partner",
    tagline: "Bring the opportunity. We build it.",
    blurb:
      "You bring the client or project; we bring the engineering team. Built for agencies and consultants who win work but need the capacity to build.",
  },
  {
    key: "referral",
    short: "Referral",
    name: "Referral Partner",
    tagline: "Connect the opportunity. Grow together.",
    blurb:
      "Introduce businesses that need our products or engineering, and share in the deal that follows. The simplest way to grow with us.",
  },
];

// The four strongest partner benefits, not corporate wallpaper.
const benefits = [
  {
    title: "Expand your capabilities",
    body: "Pair your expertise with Stallwart's AI and systems engineering, and take on work neither side could ship alone.",
  },
  {
    title: "Reach new markets",
    body: "Move into new customers, industries, and geographies on the strength of a joint solution, not a cold pitch.",
  },
  {
    title: "Build with AI",
    body: "Work with a team that ships practical AI, automation, and intelligent systems into production, not demos.",
  },
  {
    title: "Create long-term value",
    body: "Build around shared opportunity and recurring value, so the relationship compounds instead of ending at handoff.",
  },
];

// Who can become a partner — org types, so a visitor can self-identify.
const orgTypes = [
  "Agencies",
  "Consultants",
  "SaaS companies",
  "Technology companies",
  "Entrepreneurs",
  "IT providers",
  "Independent professionals",
];

const steps = [
  {
    n: "01",
    title: "Tell us about your organization",
    body: "Share who you are, what you build, and the outcome you are after.",
  },
  {
    n: "02",
    title: "Identify the opportunity",
    body: "We find where your strengths and ours create value a customer can feel.",
  },
  {
    n: "03",
    title: "Define the model",
    body: "Solutions, white-label, delivery, or referral. We shape terms to the deal on the first call.",
  },
  {
    n: "04",
    title: "Build & launch together",
    body: "The work runs through the same engineering standard as everything we ship.",
  },
  {
    n: "05",
    title: "Scale the relationship",
    body: "Turn a first win into a repeatable, growing partnership.",
  },
];

const partnerFaqs = [
  {
    question: "What kinds of partnerships does Stallwart offer?",
    answer:
      "Four models: a Solutions Partner brings Stallwart products to their own customers; a White-label Partner offers Stallwart-built products under their own brand; a Delivery Partner brings the opportunity while Stallwart provides the engineering and technical delivery; and a Referral Partner introduces businesses and shares in the resulting opportunity. You choose how you want to work with us, and we shape the terms to the specific deal.",
  },
  {
    question: "Who can become a Stallwart partner?",
    answer:
      "Agencies, consultants, SaaS companies, technology companies, entrepreneurs, IT providers, and independent professionals. Partner type is separate from who can partner: the four models describe how you work with us, and almost any organization that serves clients or wins projects can fit one of them.",
  },
  {
    question: "How do I become a Stallwart partner?",
    answer:
      "Apply through the form on this page. We review the fit honestly, and if it is a match, the first call covers the opportunity, the partnership model, and the terms. We would rather say no to a poor fit than collect logos.",
  },
  {
    question: "What is the difference between a vendor and a Stallwart partner?",
    answer:
      "A vendor sells you something. A partner builds value with you: co-developing solutions, going to market together, and sharing in the outcome. Stallwart is building an ecosystem of partners who create joint value, not a directory of suppliers.",
  },
  {
    question: "Is there a fee to partner with Stallwart?",
    answer:
      "There is no published rate card. Referral partners participate in the commercial opportunity they originate, and every arrangement is structured on the first call so it stays fitted to the deal rather than forced into a template.",
  },
  {
    question: "What is a white-label partnership with Stallwart?",
    answer:
      "As a White-label Partner you package and sell Stallwart-built products under your own brand. Stallwart stays invisible and powers the technology behind the experience, so the product and the relationship are entirely yours to the customer.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partner with us", path: "/partner" },
        ])}
      />

      {/* ---- Hero: left-aligned pitch + stats, glass CTA box on the right ---- */}
      <header className="px-[var(--space-gutter)] pb-16 pt-28 lg:pt-32">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start lg:gap-16">
          {/* Left: the pitch */}
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
              <p className="eyebrow">Partner ecosystem</p>
            </div>

            <h1 className="font-display mt-5 text-display font-light">
              Build what&apos;s next,{" "}
              <span className="text-gold-sheen italic">together.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[length:var(--text-step-1)] text-[var(--fg)]/75">
              Partner with us to build, deploy, and scale intelligent systems,
              engineered to one standard and yours to own.
            </p>

            {/* Ecosystem: the four models as a 2×2 grid, all visible. */}
            <div
              id="ecosystem"
              aria-labelledby="ecosystem-heading"
              className="mt-6 scroll-mt-24 lg:mt-7"
            >
              <p className="eyebrow">The ecosystem</p>
              <h2
                id="ecosystem-heading"
                className="font-display mt-3 text-[length:var(--text-step-2)] font-light"
              >
                Four ways to partner with Stallwart.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-[var(--fg)]/65">
                Different strengths. One direction. Find the one that fits how
                you work.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {models.map((m, i) => (
                  <li
                    key={m.key}
                    className="group flex flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5 transition-colors duration-300 hover:border-[var(--accent)]/50"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-gold-sheen font-display text-lg font-light leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]">
                        {m.name}
                      </span>
                    </div>
                    <h3 className="font-display mt-3 text-[length:var(--text-step-1)] font-light leading-tight">
                      {m.tagline}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--fg)]/70">
                      {m.blurb}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: glass card holding the application form. */}
          <aside
            id="apply"
            className="relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]/55 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl scroll-mt-24 sm:p-7 lg:sticky lg:top-28"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--hairline-strong),transparent)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_55%)]"
            />

            <div className="relative">
              <p className="eyebrow">Become a partner</p>
              <h2 className="font-display mt-3 text-[length:var(--text-step-2)] font-light leading-tight">
                Find where you fit.
              </h2>

              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {orgTypes.map((type) => (
                  <li
                    key={type}
                    className="rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/40 px-2.5 py-1 text-[11px] text-[var(--fg)]/70"
                  >
                    {type}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-[var(--hairline)] pt-6">
                <PartnerForm />
              </div>
            </div>
          </aside>
        </div>
      </header>

      {/* ---- Why + How, combined: the payoff, then the path ---- */}
      <section
        aria-labelledby="why-how"
        className="section-y rule-t px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Why partner, and how it works</p>
          <h2
            id="why-how"
            className="font-display mt-3 text-display-sm font-light"
          >
            The payoff, and the path in.
          </h2>

          {/* What you get: the four strongest benefits */}
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
            What you get
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal as="li" index={i} key={b.title} className="group">
                <span
                  aria-hidden="true"
                  className="text-gold-sheen font-display block text-[2rem] font-light leading-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-10 origin-left bg-[var(--hairline-strong)] transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--accent)]"
                />
                <h3 className="font-display mt-4 text-[length:var(--text-step-1)] leading-tight">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/75">
                  {b.body}
                </p>
              </Reveal>
            ))}
          </ul>

          {/* How it works: the process spine */}
          <p className="mt-16 border-t border-[var(--hairline)] pt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
            How it works
          </p>
          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[9%] top-3 hidden h-px overflow-hidden bg-[var(--hairline-strong)] sm:block"
            >
              <span className="spine-x block h-full w-full bg-[linear-gradient(to_right,var(--accent),color-mix(in_oklab,var(--accent)_25%,transparent))]" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 left-3 top-3 w-px overflow-hidden bg-[var(--hairline-strong)] sm:hidden"
            >
              <span className="spine-y block h-full w-full bg-[linear-gradient(to_bottom,var(--accent),color-mix(in_oklab,var(--accent)_25%,transparent))]" />
            </div>

            <ol className="grid gap-x-8 gap-y-9 sm:grid-cols-5">
              {steps.map((step, i) => (
                <Reveal
                  as="li"
                  index={i}
                  key={step.n}
                  className="relative pl-11 sm:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)] sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  <div className="sm:mt-11 sm:text-center">
                    <span
                      aria-hidden="true"
                      className="text-gold-sheen font-display block text-[2.5rem] font-light leading-[0.9]"
                    >
                      {step.n}
                    </span>
                    <h3 className="font-display mt-2 text-[length:var(--text-step-1)] leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/75 sm:mx-auto sm:max-w-[13rem]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- FAQ (AEO surface) ---- */}
      <Faq heading="Partnering with Stallwart, answered" items={partnerFaqs} />
    </>
  );
}
