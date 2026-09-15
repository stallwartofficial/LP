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
      "Stallwart is an AI-first engineering company. We build anything AI around your business: AI agents and automation, AI + SaaS products, AI infrastructure and RAG, and fully custom AI systems, each engineered to run in production rather than to be operated by hand.",
  },
  {
    question: "What kinds of things can you build?",
    answer:
      "If it involves AI, we build it. Agents that run a process end to end, automation that removes repetitive work, RAG systems and dashboards that turn scattered data into answers, AI features inside your product, and the infrastructure underneath. You bring the problem, we build the system that solves it.",
  },
  {
    question: "Who does Stallwart build for?",
    answer:
      "Businesses of any kind, technical or not, from small teams that need more output without new headcount up to enterprises that need consistency and auditability across large operations. You do not need to know how AI works. You need to know the problem.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on the scope. Custom builds are fixed price per phase, quoted after a paid discovery sprint. There is no public rate card because pricing is scoped to the situation, not forced into a template.",
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
    question: "How can we partner with Stallwart?",
    answer:
      "Four ways: a Solutions partner brings Stallwart's work to their own customers; a White-label partner sells Stallwart-built systems under their own brand; a Delivery partner brings the opportunity while Stallwart provides the engineering; and a Referral partner introduces businesses and shares in the resulting opportunity.",
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
