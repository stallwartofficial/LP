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
  {
    question: "What can AI actually do for my business?",
    answer:
      "AI can take over work that follows a pattern: answering repeat questions, sorting and routing requests, pulling answers out of your documents, drafting first versions, and keeping data updated across your tools. The point is not to add a chatbot. It is to hand a real task to a system that does it the same way every time, so your team spends its hours on the work only people can do.",
  },
  {
    question: "Is AI worth it for a small business?",
    answer:
      "It is worth it when there is a task your team repeats often enough that doing it by hand is holding you back. If that task is clear, a small AI system can pay for itself by giving those hours back. If it is not clear yet, we will help you find where the real time goes before building anything.",
  },
  {
    question: "How much does it cost to build an AI system?",
    answer:
      "We work at a fixed price per phase. After a scoping call we quote the phase in front of us, you approve that price before any work starts, and there are no surprise charges inside it. We don't publish a rate card because the cost depends entirely on what the system has to do, so the honest answer comes after we understand your problem.",
  },
  {
    question: "How long does it take to build?",
    answer:
      "It depends on the size of the system, and we give you a timeline for each phase before it starts so you always know what you are waiting on. A focused first version is meant to reach you quickly rather than after months of silence. We would rather ship something working and build on it than disappear and hand over everything at the end.",
  },
  {
    question: "Do I own the code and data, or am I locked in?",
    answer:
      "You own all of it: the code, the system, and your data. There is no lock-in and nothing that only runs on our side. If you ever want to take it to another team or run it yourself, you can, because it was built to be yours from the start.",
  },
  {
    question: "Is my data safe and secure with you?",
    answer:
      "Your data is encrypted in transit and at rest, and keys stay on your side. We do not sell your data and we do not use it to train models that are shared with anyone else. We describe the security practices we follow rather than pointing to a certification badge, and we are glad to walk through them before you commit.",
  },
  {
    question: "Do I need to be technical to work with you?",
    answer:
      "No. You need to understand your own business and the problem you want solved. We handle the technical side and explain what we are building in plain language, so you can make decisions without needing to know how any of it works underneath.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work across many fields, including banking, fintech, insurance, healthcare, retail, logistics and mobility, real estate, education, media, and travel. What matters more than the industry is whether there is a real workflow worth building a system around. If your field is not on this list, the approach is the same.",
  },
  {
    question: "How do we get started, and what happens on the first call?",
    answer:
      "You reach out at contact@stallwart.in and we set up a scoping call. On that call we walk through how the work actually happens in your business, find where a system could take over, and talk through what a first phase would cover. You leave with a clear picture of what we would build and what it would cost, with no obligation to continue.",
  },
  {
    question: "Can you work with the tools and stack we already use?",
    answer:
      "Yes. We build systems that connect to the tools you already run through their APIs and integrations, so the AI fits into your existing setup instead of replacing it. If a tool you depend on has no clean way to connect, we will tell you that early and find the best path around it.",
  },
  {
    question: "What if there is already an off-the-shelf AI tool for this?",
    answer:
      "Then we will tell you. If an existing tool already solves your problem well, we would rather point you to it than build something you do not need. We take on the work where a custom system genuinely beats what you can buy, and we are honest about where it does not.",
  },
  {
    question: "Do you only build AI, or also apps, SaaS, and websites?",
    answer:
      "We are an AI-first engineering company, so AI runs through most of what we build, but we also build the software around it: full products, SaaS platforms, and the interfaces people actually use. In practice that means we can build the whole thing rather than just the AI piece and leave you to wire up the rest.",
  },
  {
    question: "Are you a remote or local company?",
    answer:
      "We are remote-first and work with clients worldwide. Where you are based does not change how we work together, since scoping calls, updates, and delivery all happen remotely. The founder is Arun Saravanan, and you can reach the team at contact@stallwart.in.",
  },
  {
    question: "Does Stallwart have an API, MCP server, or developer integration?",
    answer:
      "No. Stallwart does not have a public API, MCP server, SDK, or integration endpoint. Stallwart is a custom AI engineering company, not a software product. If you need an API, integration layer, or developer platform built, that is something we build for you as part of a custom engagement.",
  },
  {
    question: "Is Stallwart a product or a service company?",
    answer:
      "Stallwart is a service company that builds custom AI systems. There is no SaaS product to sign up for, no self-service dashboard, and no free tier. You describe the problem, we build the system that solves it, and you own everything we build. The engagement page at stallwart.in/how-it-works explains the full journey.",
  },
  {
    question: "How do I start working with Stallwart?",
    answer:
      "Book a scoping call at stallwart.in/contact. The first call is free, takes about an hour, and ends with a clear picture of whether a custom build is the right move. If it is, the next step is a paid discovery sprint that produces a written architecture you own. See stallwart.in/how-it-works for the full engagement journey.",
  },
  {
    question: "What makes you different from an agency or from hiring in-house?",
    answer:
      "An agency often hands you something that works in a demo but not in daily use, and hiring in-house means months of recruiting before anyone writes code. We build systems meant to run in production and hand them over as yours, so you get the depth of a dedicated team without the wait or the long-term payroll. You keep everything we build.",
  },
  {
    question: "What is an AI agent, in plain English?",
    answer:
      "An AI agent is a system that carries out a task on its own instead of just answering a question. You give it a goal, and it takes the steps needed to reach it: checking information, making a decision, and acting across your tools. Think of it as software that does a job end to end rather than waiting for a person to click through each step.",
  },
  {
    question: "What is RAG, in plain English?",
    answer:
      "RAG, short for retrieval-augmented generation, is a way of letting an AI answer from your own documents and data instead of only what it was trained on. Before it responds, the system looks up the relevant material from your files and uses that to write the answer. It is what lets an AI reliably answer questions about your business, your policies, or your product.",
  },
];
