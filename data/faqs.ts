export type Faq = {
  question: string;
  answer: string;
};

// COMPANY-LEVEL questions only, about Stallwart, how it works, who it serves.
// Questions about a specific offering belong on that offering in
// data/offerings.ts and render on its detail page.
//
// These double as AEO surface area: FAQPage JSON-LD is built from this same
// array, so the rendered copy and the structured data can never drift.
// Answers stay factual, no performance claims, no customer counts, nothing
// unverifiable (see CLAUDE_CODE_INSTRUCTIONS.md constraint 7).
export const faqs: Faq[] = [
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
      "Businesses of any kind, technical or not, from small teams that need more output without new headcount up to enterprises that need consistency across large operations. You do not need to know how AI works. You need to know the problem.",
  },
  {
    question: "Do we own what you build?",
    answer:
      "Yes. When we build a product or system for you, you own it outright: the code, the architecture, and the ability to run and change it. No lock-in.",
  },
  {
    question: "How do engagements start?",
    answer:
      "With a demo. We look at how the work actually happens inside your business, identify where a system can take it over, and scope from there. We don't propose automation before understanding the workflow it has to survive.",
  },
];
