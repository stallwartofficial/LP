// STALLWART'S PORTFOLIO. The company's offerings, not one product's features.
//
// Extrovert AI is ONE offering here, not the subject of the site. Each entry
// gets its own detail page at /offer/[slug] where its capabilities live.
//
// Order is deliberate: Custom Systems and AI leads because it is available
// today and is what the hero's positioning claims. The two in-development
// services follow the shipped product rather than heading the list.
//
// Adding an offering is a single entry: the portfolio page, detail route,
// sitemap, footer, contact form, and schema all derive from this array.
//
// PUNCTUATION: no em dashes. HONESTY: copy for in-development offerings
// describes intended scope in future tense and is never phrased as available.

export type OfferingStatus = "available" | "in-development";

export type Capability = {
  eyebrow: string;
  title: string;
  description: string;
};

export type Offering = {
  slug: string;
  name: string;
  /** Portfolio position, shown as the card eyebrow. */
  category: string;
  status: OfferingStatus;
  /** One line. Cards and the detail page subhead. */
  tagline: string;
  /** Short paragraph for the portfolio card. */
  summary: string;
  /** Longer positioning for the detail page. */
  description: string;
  /** The problem this offering exists to remove. Sharpens the pitch. */
  problem: string;
  capabilities: Capability[];
  /** Who it is built for. `role` is the short label, `note` the fuller line,
   *  `icon` names a mark in the offer page's icon set. `role` feeds schema
   *  audience. */
  builtFor: { role: string; note: string; icon: string }[];
  /** Offering specific FAQs. Rendered and emitted as FAQPage on its page. */
  faqs: { question: string; answer: string }[];
  integrations: string[];
  /** Optional: the kinds of things this offering can build, shown as tags in
   *  the offer page's action card. Only set for the build-anything offering;
   *  specific products leave it undefined so their card stays focused. */
  builds?: string[];
  /** Pricing MODEL, how a customer is charged. Not an invented figure.
   *  TODO(owner): replace the bracketed ranges with real numbers. */
  pricing: string;
  /** Optional compact pricing label for the action card, when the full
   *  sentence would make the card too tall. Falls back to `pricing`. */
  pricingShort?: string;
  /** Optional explicit "what it does" motion for the action card, ending in
   *  the outcome. Falls back to the capability labels when unset. The last
   *  item renders as the accented outcome. */
  motion?: string[];
  /** When true, the offer page renders the pay-as-you-go usage estimator. */
  usagePricing?: boolean;
  /** Optional rich "how it works" map. When set, it replaces the capabilities
   *  grid and the long description paragraph, and the card drops "What it does"
   *  (this map tells that story in full). */
  howItWorks?: {
    steps: { icon: string; title: string; body: string }[];
    logic: string[];
  };
  /**
   * The system's signal path, rendered as a concept diagram beside its module
   * on the home page. This is NOT a mock dashboard: it states the actual
   * mechanism, stage by stage, which is the thing a technical buyer wants to
   * see and the thing a chart of invented numbers cannot convey.
   *
   * `kind` drives the node treatment:
   *   input   entry point, hairline only
   *   model   where a judgment is made, gold ring
   *   action  something happens in the world, gold ring
   *   output  terminal state, filled
   * `branch` is the escape hatch off a given stage: every honest system has
   * one, and showing it is a credibility signal rather than a caveat.
   */
  flow: {
    label: string;
    stages: {
      name: string;
      kind: "input" | "model" | "action" | "output";
    }[];
    branch: { fromIndex: number; name: string };
  };
  /** Which layers of the shared engineering core this system leans on. */
  layers: string[];
};

export const offerings: Offering[] = [
  {
    slug: "custom-ai-engineering",
    name: "Custom Systems and AI",
    category: "Engagement · Build",
    status: "available",
    pricing: "Fixed price per phase, from a paid discovery sprint. Book a call for a scoped quote.",
    pricingShort: "Fixed price per phase",
    tagline:
      "Stop adapting your business to software. Build the system around it.",
    summary:
      "For problems no product solves. Whatever the system is, a SaaS platform, a product, or an internal tool, we build it with AI to the standard the best teams hold, and hand over code you own outright.",
    description:
      "Custom software and intelligent AI systems, engineered around how your business actually works — and built for what comes next. We design and build custom software, AI systems, and intelligent infrastructure for businesses that have outgrown generic solutions. From SaaS platforms and customer-facing products to AI agents, automation, and internal systems, we turn complex workflows and ambitious ideas into technology that works in the real world. Built from first principles. Engineered to scale. Designed around your data, workflows, and goals.",
    problem:
      "The prototype worked. Then it met production, and the team discovered that the interesting 20 percent was demonstrated and the load bearing 80 percent was never built.",
    capabilities: [
      {
        eyebrow: "01 Scope",
        title: "Problem framing first",
        description:
          "We map your real workflow, where it breaks, and what failure costs — before any architecture.",
      },
      {
        eyebrow: "02 Design",
        title: "Architecture you can interrogate",
        description:
          "A written design: data flow, model boundaries, failure modes, and what the system may never do. Reviewed with your engineers.",
      },
      {
        eyebrow: "03 Build",
        title: "Built against real exceptions",
        description:
          "Engineered on your data and edge cases, and tested on failure modes — not the happy path.",
      },
      {
        eyebrow: "04 Handover",
        title: "Code you own and run",
        description:
          "Source, infrastructure as code, runbooks, and observability. Your team runs it without us. Support is a choice, not a dependency.",
      },
    ],
    builtFor: [
      {
        role: "Engineering leaders",
        note: "CTOs and heads of engineering with a build decision",
        icon: "chip",
      },
      {
        role: "Stalled prototypes",
        note: "teams whose prototype never reached production",
        icon: "graph",
      },
      {
        role: "Full ownership",
        note: "organizations that need to own the system outright",
        icon: "key",
      },
    ],
    faqs: [
      {
        question: "What does a custom engineering engagement cost?",
        answer:
          "Engagements are scoped and fixed price per phase rather than billed hourly, so you approve a number before work starts. Scope drives the figure, so the first conversation is about the problem rather than a rate card. We will tell you early if the work does not justify the spend.",
      },
      {
        question: "How long does it take?",
        answer:
          "A scoping and technical design phase typically runs in weeks, not months, and produces a written architecture you can take elsewhere if you choose. Build duration depends on scope, and we commit to a date at the end of design rather than guessing before it.",
      },
      {
        question: "Who owns the code and the IP?",
        answer:
          "You do, outright. Source, infrastructure definitions, and documentation are yours. We do not retain licenses to work you paid for and we do not build in dependencies on us.",
      },
      {
        question: "What technologies do you build on?",
        answer:
          "Chosen per problem rather than per preference. In practice: Python and TypeScript, managed model APIs alongside self hosted open weight models where data residency requires it, Postgres and vector stores, containerised deployment on your cloud of choice. We will justify every choice in the design document.",
      },
      {
        question: "Will you work alongside our existing engineering team?",
        answer:
          "Yes, and it is usually the better outcome. Your engineers know the domain, we know how these systems fail in production. Handover is materially easier when your team was in the design reviews.",
      },
      {
        question: "What if we already have a prototype?",
        answer:
          "Bring it. A working prototype is useful evidence about the problem even when little of the code survives. We will tell you honestly which parts are a foundation and which are a detour.",
      },
    ],
    integrations: [
      "Your existing cloud account",
      "Your data warehouse",
      "Internal APIs and services",
      "Identity and access management",
      "Existing CI and observability",
      "On premise and residency constrained",
    ],
    builds: [
      "Custom software",
      "Web apps",
      "Mobile apps",
      "SaaS",
      "micro-SaaS",
      "Marketplaces",
      "E-commerce",
      "Customer portals",
      "CRMs",
      "HRMS",
      "ERPs",
      "Internal tools",
      "Dashboards",
      "Automations",
      "AI agents",
      "Chatbots and copilots",
      "APIs",
      "Integrations",
      "Data pipelines",
    ],
    flow: {
      label: "Engagement path",
      stages: [
        { name: "Scope", kind: "input" },
        { name: "Technical design", kind: "model" },
        { name: "Build", kind: "action" },
        { name: "Production", kind: "action" },
        { name: "You own it", kind: "output" },
      ],
      branch: { fromIndex: 1, name: "Walk away with the design" },
    },
    layers: ["Intelligence", "Orchestration", "Governance", "Production"],
  },
  {
    slug: "extrovert-ai",
    name: "Extrovert AI",
    category: "Product · Revenue",
    status: "available",
    pricing: "Subscription, priced to your outbound volume. Book a call for current plans.",
    pricingShort: "Pay as you go, no subscription",
    motion: ["Research", "Target", "Write and send", "Follow up", "Meeting booked"],
    usagePricing: true,
    howItWorks: {
      steps: [
        {
          icon: "search",
          title: "Research",
          body: "Finds the right accounts and buying signals.",
        },
        {
          icon: "target",
          title: "Target",
          body: "Prioritizes who to reach, and when.",
        },
        {
          icon: "pencil",
          title: "Personalize and write",
          body: "Writes personalized email and LinkedIn outreach.",
        },
        {
          icon: "send",
          title: "Send and engage",
          body: "Sends, follows up, and handles replies.",
        },
        {
          icon: "calendar",
          title: "Meeting booked",
          body: "Books qualified meetings on your calendar.",
        },
      ],
      logic: [
        "Focuses on the right audience, not everyone.",
        "Personalization drives higher response rates.",
        "Multi-channel outreach increases the chance of engagement.",
        "Automated follow-ups keep conversations alive.",
        "The end goal is always real conversations and real opportunities.",
      ],
    },
    tagline: "The AI GTM engine that runs outbound end to end",
    summary:
      "Give it a company and a website. It researches the account, finds the angle, builds the target list, writes and sends the outreach in your voice, follows up, scores the replies, and books the meeting. Outbound that runs from first contact to a calendar invite without a rep driving each step.",
    description:
      "Outbound is not one job. It is research, targeting, writing, sending, chasing, reading replies, and scheduling, and most teams run that chain by hand across a stack of disconnected tools. Extrovert AI is a single system that runs the whole motion. You give it a target company and its website. It researches the business and its market, decides who is worth contacting and the specific reason to reach out, drafts the outreach grounded in that research and in your team's voice, sends it, follows up on the cadence each account deserves, scores the responses on real intent, and books the meeting straight onto your calendar. Your reps step in for the conversation, not the busywork. It can run fully autonomously or hold every message for approval, and you move between the two as you build trust in it.",
    problem:
      "Outbound rarely fails for lack of tools. It fails because every step, researching the account, finding the angle, writing the email, chasing the follow up, is manual. A rep can only work a handful of accounts well, so the rest get a generic blast or nothing at all.",
    capabilities: [
      {
        eyebrow: "Research",
        title: "Reads the account before it writes a word",
        description:
          "Give it a company name and a website. It researches the business, its market, and recent signals to find a reason to reach out that is specific to that account, not a mail merge field.",
      },
      {
        eyebrow: "Target",
        title: "Builds the list and the angle",
        description:
          "It identifies who is worth contacting and the specific opening for each, so outreach is aimed rather than sprayed across a bought list.",
      },
      {
        eyebrow: "Write and send",
        title: "Outreach in your voice, sent for you",
        description:
          "It drafts each email grounded in the research and in your team's tone, then sends it. Run it autonomously, or hold every message for a one click approval first.",
      },
      {
        eyebrow: "Follow up",
        title: "Persistence without the reminders",
        description:
          "It follows up on the interval each account deserves and adjusts to how they reply, so no thread dies because someone forgot to circle back.",
      },
      {
        eyebrow: "Score and book",
        title: "Scores the reply, books the meeting",
        description:
          "It reads responses, scores real buying intent rather than politeness, and puts qualified meetings straight on your calendar. Reps arrive to a booked conversation, not a to do list.",
      },
    ],
    builtFor: [
      {
        role: "Founder-led sales",
        note: "running outbound by hand",
        icon: "people",
      },
      {
        role: "SDR and BDR teams",
        note: "losing the day to research and admin",
        icon: "gears",
      },
      {
        role: "RevOps and sales ops",
        note: "stitching a disconnected outbound stack",
        icon: "chip",
      },
      {
        role: "Revenue leaders",
        note: "more accounts worked without more headcount",
        icon: "graph",
      },
      {
        role: "Marketing teams",
        note: "turning demand into booked pipeline",
        icon: "graph",
      },
      {
        role: "Agencies",
        note: "running outbound for their clients",
        icon: "layers",
      },
      {
        role: "Lean teams",
        note: "scaling GTM without hiring",
        icon: "key",
      },
    ],
    faqs: [
      {
        question: "What does Extrovert AI actually do?",
        answer:
          "You give it a target company and its website. It researches the account, decides who to contact and why, writes and sends the outreach in your voice, follows up, scores the replies, and books the meeting on your calendar. It runs the outbound motion end to end and your reps take the conversation.",
      },
      {
        question: "Is Extrovert AI an AI SDR?",
        answer:
          "That is a fair shorthand. It does the work a sales development rep does before the conversation: researching accounts, writing and sending outreach, following up, and booking meetings. The difference is it runs the whole outbound motion across every account at once rather than one rep working a single list.",
      },
      {
        question: "Is Extrovert AI a CRM?",
        answer:
          "No. A CRM records what your team already did and waits to be updated. Extrovert AI does the work: research, outreach, follow up, scoring, and booking. It connects to the CRM you already keep rather than replacing it.",
      },
      {
        question: "Does it send email on its own, or do we review first?",
        answer:
          "Your choice, per campaign. It can run fully autonomously or hold every message for approval before it sends, and you move between the two as you build trust in it. Nothing goes out in a mode you did not choose.",
      },
      {
        question: "Will the emails read like generic AI spam?",
        answer:
          "No. Each message is grounded in the specific research on that account and written in your team's voice, which is the opposite of a templated blast. You set the tone and the guardrails it works inside.",
      },
      {
        question: "Does it replace our sales reps?",
        answer:
          "No. It removes the research and the manual sending and chasing that stop reps from selling. They spend their time in the booked conversations instead of assembling lists and writing the same email again.",
      },
      {
        question: "How does the scoring work?",
        answer:
          "It scores on the reply itself and the engagement it observes, not static point values, so a warm response is surfaced and a polite brush off is not mistaken for intent.",
      },
    ],
    integrations: [
      "Your email and calendar",
      "Your CRM records",
      "Company and contact data sources",
      "Your sending domain and infrastructure",
      "Meeting scheduler",
      "Webhooks and custom APIs",
    ],
    flow: {
      label: "Outbound path",
      stages: [
        { name: "Company in", kind: "input" },
        { name: "Research", kind: "model" },
        { name: "Outreach sent", kind: "action" },
        { name: "Follow up", kind: "action" },
        { name: "Meeting booked", kind: "output" },
      ],
      branch: { fromIndex: 1, name: "Not a fit, skipped" },
    },
    layers: ["Intelligence", "Orchestration", "Production"],
  },
  {
    slug: "sillage",
    name: "Sillage",
    category: "Platform · Governance",
    status: "in-development",
    pricing: "In development. Design-partner pricing for early teams.",
    tagline: "The AI governance platform for teams who will be audited",
    summary:
      "A governance function for organizations putting AI into real decisions. Inventory what is running, document how it decides, and hold evidence ready before anyone asks for it.",
    description:
      "Sillage is the governance layer most organizations skipped: models reached production faster than the ability to account for them. It stands up a live register of every AI system in use, a written basis for how each one decides, runtime controls on the decisions they may make, and a continuously assembled evidence trail. It is built to map cleanly onto the frameworks an audit will invoke, including SOC 2 and ISO/IEC 42001, so readiness is a standing state rather than a scramble.",
    problem:
      "The exposure is not that AI makes mistakes. It is that when a regulator, customer, or board member asks how a decision was reached, nobody can answer, and the absence of an answer is the finding.",
    capabilities: [
      {
        eyebrow: "Inventory",
        title: "Know what is actually running",
        description:
          "A live register of every AI system in the organization, what data each touches, which decisions it influences, and who owns it. Most governance failures start as a system nobody knew was in production.",
      },
      {
        eyebrow: "Document",
        title: "Decisions with a written basis",
        description:
          "Each system gets a plain language account of how it reaches conclusions, what it is not permitted to decide, and where a human is required. Written to be read by a regulator, not only by an engineer.",
      },
      {
        eyebrow: "Control",
        title: "Guardrails that hold at runtime",
        description:
          "Policy expressed as controls that actually intervene, rather than a document nobody reads. Escalation paths for the decisions a system should never make alone.",
      },
      {
        eyebrow: "Evidence",
        title: "Audit readiness as a standing state",
        description:
          "Logs, approvals, and reviews assembled continuously, so an audit is a query against existing evidence rather than a six week scramble to reconstruct it.",
      },
    ],
    builtFor: [
      {
        role: "Regulated industries",
        note: "deploying AI in decisions",
        icon: "shield",
      },
      {
        role: "Compliance teams",
        note: "facing SOC 2, ISO 42001, or the EU AI Act",
        icon: "checklist",
      },
      {
        role: "Boards and risk",
        note: "asking how AI decisions are governed",
        icon: "building",
      },
    ],
    faqs: [
      {
        question: "Is this a certification?",
        answer:
          "No. Stallwart does not issue certifications and does not claim to hold any. Sillage produces the inventory, documentation, controls, and evidence trail that a SOC 2 or ISO/IEC 42001 audit, or an EU AI Act review, will ask you to produce.",
      },
      {
        question: "When will Sillage be available?",
        answer:
          "Sillage is in development and not yet available for purchase. If AI governance is live on your risk register, book a call and we will tell you honestly where it stands.",
      },
      {
        question: "Do you replace our legal or risk team?",
        answer:
          "No. This service gives them the technical substrate they are currently missing: an accurate register of what is running and how it decides. Legal judgment stays with your counsel.",
      },
    ],
    integrations: [],
    flow: {
      label: "Decision path",
      stages: [
        { name: "AI decision", kind: "input" },
        { name: "Policy check", kind: "model" },
        { name: "Approval gate", kind: "action" },
        { name: "Audit trail", kind: "action" },
        { name: "Evidence held", kind: "output" },
      ],
      branch: { fromIndex: 2, name: "Rollback" },
    },
    layers: ["Governance", "Orchestration"],
  },
];

export function getOffering(slug: string) {
  return offerings.find((o) => o.slug === slug);
}

export const availableOfferings = offerings.filter(
  (o) => o.status === "available"
);
