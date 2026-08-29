import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { PartnerForm } from "@/components/PartnerForm";
import { Reveal } from "@/components/Reveal";
import { PartnerEcosystem, type PartnerModel } from "@/components/PartnerEcosystem";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Partner with Stallwart",
  description:
    "Join the Stallwart partner ecosystem. Technology, solution, cloud, strategic, referral, and research partnerships to build, deploy, and scale intelligent AI systems together.",
  path: "/partner",
});

// The six ways to partner. Real text, driven into the interactive ecosystem map
// and the mobile list from one source.
const models: PartnerModel[] = [
  {
    key: "technology",
    short: "Technology",
    name: "Technology Partners",
    tagline: "Integrate your platform.",
    blurb:
      "Connect your platform, API, or model to Stallwart systems and ship products that are more capable together than either side is alone. We build to stable, documented surfaces, so the integration holds.",
  },
  {
    key: "solution",
    short: "Solutions",
    name: "Solution Partners",
    tagline: "Deliver end to end.",
    blurb:
      "Pair your industry expertise with Stallwart's engineering to take a client from problem to production. You own the relationship and the domain; the engineering standard behind the work stays ours.",
  },
  {
    key: "cloud",
    short: "Cloud",
    name: "Cloud & Infrastructure Partners",
    tagline: "Build the foundation.",
    blurb:
      "Stand up secure, scalable AI and data infrastructure together, engineered to hold under real load with observability and rollback built in, not bolted on.",
  },
  {
    key: "strategic",
    short: "Strategic",
    name: "Strategic Partners",
    tagline: "Co-create what's next.",
    blurb:
      "Co-build new products, capabilities, and markets around emerging AI and deep tech. A shared roadmap and shared upside, not a one-off statement of work.",
  },
  {
    key: "referral",
    short: "Referral",
    name: "Referral & Channel Partners",
    tagline: "Open new markets.",
    blurb:
      "Bring Stallwart to new customers, industries, and geographies. You make the introduction or carry the offer to market; you are rewarded per engagement, agreed on the first call.",
  },
  {
    key: "research",
    short: "Research",
    name: "Research & Innovation Partners",
    tagline: "Turn research into product.",
    blurb:
      "Work with research and academic teams on frontier AI, then turn findings into systems that ship. Where a promising idea becomes something people can actually run.",
  },
];

// Tangible benefits, not corporate wallpaper.
const benefits = [
  {
    title: "Expand your capabilities",
    body: "Pair your expertise with Stallwart's AI and systems engineering, and take on work neither side could ship alone.",
  },
  {
    title: "Create new solutions",
    body: "Co-build products around emerging technology instead of retrofitting AI onto tools that were never designed for it.",
  },
  {
    title: "Reach new markets",
    body: "Move into new customers, industries, and geographies on the strength of a joint solution, not a cold pitch.",
  },
  {
    title: "Go to market together",
    body: "Launch joint offers, campaigns, and customer programs. A real go-to-market motion, not a logo swap.",
  },
  {
    title: "Build with AI",
    body: "Work hands-on with a team that ships practical AI, automation, and intelligent systems into production, not demos.",
  },
  {
    title: "Create long-term value",
    body: "Build around shared opportunity and recurring value, so the relationship compounds instead of ending at handoff.",
  },
];

// Who can become a partner — org types, so a visitor can self-identify.
const orgTypes = [
  "Technology companies",
  "AI & data companies",
  "Cloud & infrastructure providers",
  "Consulting & system integrators",
  "SaaS companies",
  "Startups & emerging innovators",
  "Research & academic institutions",
  "Industry & community organizations",
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
    body: "Referral, technology, solution, strategic — we shape terms to the deal, on the first call.",
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
      "Six models: technology and integration, solution and implementation, cloud and infrastructure, strategic and co-innovation, referral and channel, and research and innovation. You choose the one that fits how you want to work with us, and we shape the terms to the specific opportunity.",
  },
  {
    question: "Who can become a Stallwart partner?",
    answer:
      "Technology and AI companies, cloud and infrastructure providers, consulting and system integration firms, SaaS companies, startups, research and academic institutions, and industry or community organizations. If you build, deliver, or take intelligent systems to market, there is a way to partner.",
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
      "There is no published rate card. Referral and channel partners are rewarded per engagement, and every arrangement is structured on the first call so it stays fitted to the deal rather than forced into a template.",
  },
  {
    question: "Does Stallwart offer AI technology and integration partnerships?",
    answer:
      "Yes. Technology partners integrate their platform, API, or model with Stallwart systems to ship connected, scalable AI solutions. We build against stable, documented surfaces so the integration keeps working in production.",
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

      {/* ---- Hero ---- */}
      <header className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
            <p className="eyebrow">Partner ecosystem</p>
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
          </div>

          <h1 className="font-display mt-6 text-display-lg font-light">
            Build what&apos;s next,{" "}
            <span className="text-gold-sheen italic">together.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/75">
            Stallwart partners with technology companies, solution providers, and
            innovators to build, deploy, and scale intelligent systems —
            engineered to one standard, and owned by the people who run them.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#apply"
              className="group relative w-full overflow-hidden rounded-full bg-[var(--fg)] px-7 py-3.5 text-center text-sm font-medium text-[var(--bg)] sm:w-auto"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
                Become a partner →
              </span>
            </a>
            <a
              href="#ecosystem"
              className="w-full rounded-full border border-[var(--hairline-strong)] px-7 py-3.5 text-center text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)]/60 sm:w-auto"
            >
              Explore the ecosystem →
            </a>
          </div>
        </div>
      </header>

      {/* ---- Ecosystem: the interactive map ---- */}
      <section
        id="ecosystem"
        aria-labelledby="ecosystem-heading"
        className="section-y rule-t bg-[var(--surface)] px-[var(--space-gutter)] scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="eyebrow">The ecosystem</p>
            <h2
              id="ecosystem-heading"
              className="font-display mt-3 text-display-sm font-light"
            >
              Six ways to partner with Stallwart.
            </h2>
            <p className="mt-4 text-sm text-[var(--fg)]/65">
              We are building an ecosystem, not collecting logos. Every model
              below is a way to create value together — pick the one that matches
              how you work.
            </p>
          </div>

          <div className="mt-12">
            <PartnerEcosystem models={models} />
          </div>
        </div>
      </section>

      {/* ---- Why partner ---- */}
      <section
        aria-labelledby="why"
        className="section-y rule-t px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Why partner with Stallwart</p>
          <h2 id="why" className="font-display mt-3 text-display-sm font-light">
            What you actually get.
          </h2>

          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* ---- Who we partner with ---- */}
      <section
        aria-labelledby="who"
        className="section-y rule-t bg-[var(--surface)] px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="eyebrow">Who we partner with</p>
            <h2 id="who" className="font-display mt-3 text-display-sm font-light">
              Find where you fit.
            </h2>
            <p className="mt-4 text-sm text-[var(--fg)]/65">
              Partnerships span the organizations building, delivering, and
              taking intelligent systems to market.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3">
            {orgTypes.map((type, i) => (
              <Reveal
                as="li"
                index={i}
                key={type}
                className="group flex items-center gap-2.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--fg)]/80 transition-colors hover:border-[var(--accent)]/60 hover:text-[var(--fg)]"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70 transition-colors group-hover:bg-[var(--accent)]"
                />
                {type}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- How partnership works: process spine ---- */}
      <section
        aria-labelledby="how"
        className="section-y rule-t px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">How partnership works</p>
          <h2 id="how" className="font-display mt-3 text-display-sm font-light">
            From first conversation to scale.
          </h2>

          <div className="relative mt-16">
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

      {/* ---- Apply ---- */}
      <section
        id="apply"
        aria-labelledby="apply-heading"
        className="section-y rule-t bg-[var(--surface)] px-[var(--space-gutter)] scroll-mt-24"
      >
        <div className="mx-auto grid max-w-6xl gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:items-start lg:gap-x-20">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Become a partner</p>
            <h2
              id="apply-heading"
              className="font-display mt-3 text-display-sm font-light"
            >
              Become a Stallwart partner.
            </h2>
            <p className="mt-5 max-w-lg text-[length:var(--text-step-1)] text-[var(--fg)]/75">
              Whether you are building breakthrough technology, delivering
              enterprise solutions, entering new markets, or looking to co-create
              what&apos;s next — we&apos;d like to hear from you.
            </p>
            <p className="mt-5 max-w-lg text-sm text-[var(--fg)]/60">
              We reply to every serious application from a person, review the fit
              honestly, and shape terms to the specific opportunity. No rate card,
              no template.
            </p>
          </div>

          <PartnerForm />
        </div>
      </section>

      {/* ---- FAQ (AEO surface) ---- */}
      <Faq heading="Partnering with Stallwart, answered" items={partnerFaqs} />
    </>
  );
}
