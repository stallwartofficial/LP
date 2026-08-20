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
      "Stallwart builds AI systems that take operational work off a team permanently. The portfolio spans sales infrastructure, editorial production, and AI governance, each offering engineered to run on its own rather than to be operated by hand.",
  },
  {
    question: "Is Stallwart a product company or a services company?",
    answer:
      "Both, deliberately. Extrovert AI is a product you run. AI Editing and the AI Compliance Office are services that operate as a function inside your business. What they share is the same standard: the system carries the work, not the customer.",
  },
  {
    question: "Who does Stallwart build for?",
    answer:
      "B2B organisations, from small teams that need leverage without new headcount up to enterprises that need consistency across large operations.",
  },
  {
    question: "What is Extrovert AI?",
    answer:
      "Extrovert AI is Stallwart's AI-powered CRM, one offering in the portfolio, not the whole company. It runs the full lead lifecycle on autopilot: capturing leads, scoring them by buying signal, following up, and re-engaging cold pipeline.",
  },
  {
    question: "What does \"Built Beyond\" mean?",
    answer:
      "It's the standard we hold every system to. Anything can look convincing in a controlled demo. Built Beyond means the system holds up past that point, at real volume, on real edge cases, on the day the process breaks.",
  },
  {
    question: "How do engagements start?",
    answer:
      "With a demo. We look at how the work actually happens inside your business, identify where a system can take it over, and scope from there. We don't propose automation before understanding the workflow it has to survive.",
  },
];
