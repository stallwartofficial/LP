import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers to the common questions about Stallwart: what we do, product vs services, pricing, ownership, security and data, how engagements start, and partnering.",
  path: "/faq",
});

const faqs = [
  {
    question: "What does Stallwart do?",
    answer:
      "Stallwart builds AI systems and custom software that take operational work off a team permanently. The portfolio spans custom AI engineering, an outbound go-to-market product, and AI governance, each engineered to run on its own rather than to be operated by hand.",
  },
  {
    question: "Is Stallwart a product company or a services company?",
    answer:
      "Both, deliberately. Extrovert AI is a product you run. Custom Systems and AI, and Sillage, are engineered to operate as a function inside your business. What they share is the same standard: the system carries the work, not the customer.",
  },
  {
    question: "Who does Stallwart build for?",
    answer:
      "B2B organizations, from small teams that need more output without new headcount up to enterprises that need consistency and auditability across large operations.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on the offering. Custom builds are fixed price per phase, quoted after a paid discovery sprint. Extrovert AI is pay-as-you-go, priced to your outbound volume. Sillage is in development with design-partner pricing. There is no public rate card because pricing is scoped to the situation, not forced into a template.",
  },
  {
    question: "What do we own at the end?",
    answer:
      "Everything: source, infrastructure as code, runbooks, and documentation, yours to keep with no lock-in. A system you cannot maintain without us is not a system we would ship.",
  },
  {
    question: "How do you handle security and our data?",
    answer:
      "TLS 1.2+ in transit and AES-256 at rest, with keys server-side. Your data is never sold and never used to train shared models, every action is logged and reversible, and data can stay resident in the region you choose. Systems are built to be audit-ready against SOC 2, ISO 42001, and the EU AI Act. See our Trust & Security page for detail.",
  },
  {
    question: "How do engagements start?",
    answer:
      "With a call and, for custom work, a paid discovery sprint. We map how the work actually happens, identify where a system can take it over, and scope from there. We do not propose automation before understanding the workflow it has to survive.",
  },
  {
    question: "What is Extrovert AI?",
    answer:
      "Stallwart's AI go-to-market engine, one offering in the portfolio, not the whole company. You give it a target company and website and it runs outbound end to end: researching the account, writing and sending outreach in your voice, following up, scoring replies, and booking the meeting.",
  },
  {
    question: "What is Sillage?",
    answer:
      "An AI governance platform, in development, for teams who will be audited. It stands up a live register of every AI system in use, a written basis for how each decides, runtime controls, and a continuously assembled evidence trail that maps onto SOC 2 and ISO/IEC 42001.",
  },
  {
    question: "How can we partner with Stallwart?",
    answer:
      "Four ways: a Solutions partner brings Stallwart products to their own customers; a White-label partner sells Stallwart-built products under their own brand; a Delivery partner brings the opportunity while Stallwart provides the engineering; and a Referral partner introduces businesses and shares in the resulting opportunity.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <main className="pt-32 lg:pt-40">
        <div className="px-[var(--space-gutter)]">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">FAQ</p>
            <h1 className="font-display mt-4 max-w-3xl text-display-lg font-light">
              Questions,{" "}
              <span className="text-gold-sheen italic">answered plainly.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
              The things people ask most, in one place. If yours isn&apos;t here,
              a real person will answer it.
            </p>
          </div>
        </div>
        <Faq heading="Everything, answered" items={faqs} />
      </main>
    </>
  );
}
