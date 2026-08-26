import type { Metadata } from "next";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { PartnerForm } from "@/components/PartnerForm";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Partner with Stallwart",
  description:
    "Partner with Stallwart as a referral or delivery partner. You extend the reach; we hold one engineering standard, so your name on the work is safe.",
  path: "/partner",
});

// Custom line-work marks, in the site's hairline + gold idiom rather than a
// generic icon library.
const ReferralIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <circle cx="5" cy="12" r="2.3" />
    <circle cx="18" cy="6" r="2.3" />
    <circle cx="18" cy="18" r="2.3" />
    <path d="M7.1 10.9 15.9 7.1" />
    <path d="M7.1 13.1 15.9 16.9" />
  </svg>
);

const DeliveryIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M12 3 21 8 12 13 3 8z" />
    <path d="M3 12 12 17 21 12" />
    <path d="M3 16 12 21 21 16" />
  </svg>
);

const tracks = [
  {
    icon: <ReferralIcon />,
    name: "Referral",
    line: "You bring the client. We build. You're rewarded.",
    body: "Introduce a company whose problem we can solve. We take it from first principles and build to our standard, and you are rewarded per engagement, agreed on the first call.",
    who: "Consultants, operators, and networks with the right rooms.",
  },
  {
    icon: <DeliveryIcon />,
    name: "Delivery and implementation",
    line: "You own the relationship. We hold the standard.",
    body: "For agencies and consultancies that want to deliver Stallwart-grade systems to their own clients, with or without our name on the work. You keep the relationship; the engineering bar behind it stays ours.",
    who: "Agencies and consultancies extending what they can ship.",
  },
];

const steps = [
  {
    n: "01",
    title: "Inquiry",
    body: "Tell us who you work with, or the delivery capacity you bring.",
  },
  {
    n: "02",
    title: "Fit and terms",
    body: "We check the fit honestly and, on the first call, agree terms and the reward.",
  },
  {
    n: "03",
    title: "Build to the standard",
    body: "The work runs through the same four engineering layers as everything we ship.",
  },
  {
    n: "04",
    title: "Launch, credited",
    body: "It goes live reliable and accountable, with your name where it belongs.",
  },
];

const youGet = [
  "Systems built to one standard, so your name on the work is safe.",
  "A reward per engagement, agreed up front, never a stale public rate.",
  "A straight answer on fit, fast, including a no.",
];

const weExpect = [
  "Real context on the client, or the delivery capacity you bring.",
  "Room to build it correctly, not only quickly.",
  "Honesty about scope, the same standard we hold ourselves to.",
];

const partnerFaqs = [
  {
    question: "Who does Stallwart partner with?",
    answer:
      "Two kinds today: referral partners who bring us a client, and delivery or implementation partners, agencies and consultancies who deliver or white-label systems we build. Technology and integration partnerships come later, once the products expose stable surfaces for them.",
  },
  {
    question: "How does the referral partnership work?",
    answer:
      "You introduce a company whose problem we can solve. We take it from first principles, build to our standard, and you are rewarded per engagement, agreed on the first call. There is no public rate card because every deal is shaped to the situation.",
  },
  {
    question: "Is there a fixed referral fee?",
    answer:
      "No published number. Referral partners are rewarded per engagement, structured on the first call, the same way we scope pricing rather than post a rate card. It keeps each arrangement honest and fitted to the deal.",
  },
  {
    question: "What is a delivery or implementation partnership?",
    answer:
      "For agencies and consultancies that want to deliver Stallwart-grade systems to their own clients, with or without our name on the work. You own the relationship; we hold the engineering standard behind it.",
  },
  {
    question: "How do I become a partner?",
    answer:
      "Send an inquiry below. We review the fit honestly and, if it is a match, the first call covers terms and the reward. We say no when it is not a fit rather than sign everyone.",
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

      {/* ---- Hero: the pitch and the form together, so the action is
          immediate rather than buried after the page. Two columns on desktop
          (pitch left, sticky form right), stacked on mobile. ---- */}
      <header className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-32 lg:pt-40">
        <div className="mx-auto grid max-w-6xl items-start gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)]">
          {/* Pitch */}
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
              <p className="eyebrow">Partners</p>
            </div>

            <h1 className="font-display mt-6 text-display-lg font-light">
              You extend the reach.
              <br />
              <span className="text-gold-sheen italic">
                We hold the standard.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-[length:var(--text-step-1)] text-[var(--fg)]/75">
              Refer a client, or deliver our systems as your own. Either way your
              name goes on work built to one engineering standard, so it holds up
              long after the handoff.
            </p>

            {/* The two ways in, in the hero, so the left column carries its own
                weight beside the form and the visitor self-sorts first. */}
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {tracks.map((track) => (
                <li
                  key={track.name}
                  className="flex h-full flex-col rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
                >
                  <span className="text-[var(--accent-text)]">{track.icon}</span>
                  <p className="font-display mt-3 text-[length:var(--text-step-1)] leading-tight">
                    {track.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--accent-text)]">
                    {track.line}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg)]/70">
                    {track.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-[var(--fg)]/60">
              No public rate card. Referral partners are rewarded per engagement,
              agreed on the first call.
            </p>
          </div>

          {/* Form: sticky beside the pitch on desktop. */}
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Start here</p>
            <h2 className="font-display mt-3 text-display-sm font-light">
              Tell us what you bring.
            </h2>
            <p className="mt-4 mb-6 text-sm text-[var(--fg)]/70">
              A client we can help, or delivery capacity worth extending. If it
              is a match, the first call sorts out terms and the reward.
            </p>
            <PartnerForm />
            <p className="mt-4 text-center text-xs text-[var(--fg)]/60">
              Not a partner, but have a project?{" "}
              <a
                href="/contact"
                className="link-draw font-medium text-[var(--accent-text)]"
              >
                Book a call instead
              </a>
              .
            </p>
          </div>
        </div>
      </header>

      {/* ---- How it works ---- */}
      <section
        aria-labelledby="how"
        className="section-y rule-t bg-[var(--surface)] px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2
            id="how"
            className="font-display mt-3 text-display-sm font-light"
          >
            From introduction to launch.
          </h2>

          <ol className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="text-gold-sheen font-display shrink-0 text-[3.25rem] font-light leading-[0.85]"
                >
                  {step.n}
                </span>
                <div className="border-t border-[var(--hairline)] pt-3">
                  <h3 className="font-display text-[length:var(--text-step-1)] leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg)]/75">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Mutual terms ---- */}
      <section
        aria-labelledby="terms"
        className="section-y rule-t px-[var(--space-gutter)]"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow" id="terms">
            The terms, both ways
          </p>
          <h2 className="font-display mt-3 text-display-sm font-light">
            A partnership is mutual, or it is not one.
          </h2>

          <div className="mt-8 grid gap-px bg-[var(--hairline)] sm:grid-cols-2">
            <div className="bg-[var(--bg)] p-6 sm:pr-8">
              <p className="eyebrow">What you get</p>
              <ul className="mt-4 space-y-3">
                {youGet.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm text-[var(--fg)]/85"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--bg)] p-6 sm:pl-8">
              <p className="eyebrow">What we expect</p>
              <ul className="mt-4 space-y-3">
                {weExpect.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm text-[var(--fg)]/85"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ (AEO surface) ---- */}
      <Faq heading="Partnering, answered" items={partnerFaqs} />
    </>
  );
}
