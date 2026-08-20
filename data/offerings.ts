// STALLWART'S PORTFOLIO. The company's offerings, not one product's features.
//
// Extrovert AI is ONE offering here, not the subject of the site. Each entry
// gets its own detail page at /offer/[slug] where its capabilities live.
//
// Order is deliberate: Custom AI Engineering leads because it is available
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
  /** Who it is built for. Also feeds schema audience. */
  builtFor: string[];
  /** Offering specific FAQs. Rendered and emitted as FAQPage on its page. */
  faqs: { question: string; answer: string }[];
  integrations: string[];
  /** Pricing MODEL, how a customer is charged. Not an invented figure.
   *  TODO(owner): replace the bracketed ranges with real numbers. */
  pricing: string;
  /**
   * The system's signal path, rendered as a concept diagram beside its module
   * on the home page. This is NOT a mock dashboard: it states the actual
   * mechanism, stage by stage, which is the thing a technical buyer wants to
   * see and the thing a chart of invented numbers cannot convey.
   *
   * `kind` drives the node treatment:
   *   input   entry point, hairline only
   *   model   where a judgement is made, gold ring
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
    name: "Custom AI Engineering",
    category: "Engagement · Build",
    status: "available",
    pricing: "Fixed price per phase, from a paid discovery sprint. Book a call for a scoped quote.",
    tagline: "Your system, engineered from first principles",
    summary:
      "For problems no product solves. Whatever the system is, a SaaS platform, a product, or an internal tool, we build it with AI to the standard the best teams hold, and hand over code you own outright.",
    description:
      "A Stallwart system is whatever the problem needs: a SaaS platform, a customer-facing product, an internal tool. We build it with AI, so it ships faster and holds under real load, engineered to the standard the best teams hold: correct at scale, observable, and yours to own. Most AI work fails at the same point: a promising prototype meets real data, real volume, and real edge cases, and nobody scoped the last 80 percent. We take the problem from first principles instead. That means understanding the workflow before proposing architecture, building against your actual exceptions rather than a clean sample, and treating observability and rollback as part of the build rather than a later phase. You own the code, the infrastructure definitions, and the documentation. No lock in, because a system you cannot maintain without us is not a system we would ship.",
    problem:
      "The prototype worked. Then it met production, and the team discovered that the interesting 20 percent was demonstrated and the load bearing 80 percent was never built.",
    capabilities: [
      {
        eyebrow: "01 Scope",
        title: "Problem framing before architecture",
        description:
          "We map how the work actually happens, where it stalls, and what a failure costs. Systems fail from being pointed at the wrong problem far more often than from bad engineering.",
      },
      {
        eyebrow: "02 Design",
        title: "Architecture you can interrogate",
        description:
          "A written technical design covering data flow, model boundaries, failure modes, escalation paths, and the decisions the system is explicitly not permitted to make. Reviewed with your engineers before a line is written.",
      },
      {
        eyebrow: "03 Build",
        title: "Built against your real exceptions",
        description:
          "Calibrated on your data, including the malformed records and the requests that fit no category. Tested on the failure modes rather than the happy path.",
      },
      {
        eyebrow: "04 Handover",
        title: "Code you own, documented to maintain",
        description:
          "Source, infrastructure as code, runbooks, and observability. Your team can operate and extend it without us. Optional support after that is a choice, not a dependency.",
      },
    ],
    builtFor: [
      "CTOs and heads of engineering with a build decision",
      "Teams whose prototype stalled before production",
      "Organisations that need to own the system outright",
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
          "You do, outright. Source, infrastructure definitions, and documentation are yours. We do not retain licences to work you paid for and we do not build in dependencies on us.",
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
    pricing: "Subscription, priced to your pipeline volume. Book a call for current plans.",
    tagline: "The AI CRM that works your pipeline for you",
    summary:
      "A CRM that runs the whole lead lifecycle itself. It captures every inbound signal, ranks it on real buying intent, follows up on time, and reopens pipeline that went quiet.",
    description:
      "A traditional CRM is a system of record. It stores what your reps remember to enter, then waits for someone to act on it. Extrovert AI is a system of action. It captures every inbound lead, scores it on observed buying signals, follows up on the cadence that lead deserves, and reopens pipeline that went cold. Deals move whether or not anyone remembers to move them.",
    problem:
      "Revenue teams rarely have a lead problem. They have a triage problem: high intent and low intent arrive in the same queue, so reps work them in the order they landed rather than the order they are worth.",
    capabilities: [
      {
        eyebrow: "Capture",
        title: "Every signal, one pipeline",
        description:
          "Form fills, email replies, site visits, referrals, and ad platform leads are captured at the source and routed into a single pipeline. No channel keeps a private backlog nobody is watching.",
      },
      {
        eyebrow: "Score",
        title: "Ranked on intent, not opinion",
        description:
          "Leads are ranked on observed behaviour: engagement depth, reply patterns, source quality, and fit. Not on static point values that stop describing your market within a quarter.",
      },
      {
        eyebrow: "Follow up",
        title: "Cadence that does not depend on memory",
        description:
          "Follow ups fire on the interval each lead's score justifies, in your team's voice. High intent gets contacted while the buying moment is still open.",
      },
      {
        eyebrow: "Reopen",
        title: "Dormant pipeline, worked continuously",
        description:
          "Cold leads are re approached with context aware messaging on their timeline rather than yours, turning a dormant back catalogue into a renewable source of pipeline.",
      },
    ],
    builtFor: [
      "B2B sales teams from 5 to 500 reps",
      "Founder led sales with no sales ops function",
      "Revenue leaders replacing manual triage",
    ],
    faqs: [
      {
        question: "How is Extrovert AI different from a traditional CRM?",
        answer:
          "A traditional CRM is a system of record. It stores what reps remember to enter and waits for someone to act. Extrovert AI is a system of action: capture, scoring, follow up, and re engagement happen automatically, so pipeline moves whether or not a rep remembers to move it.",
      },
      {
        question: "Does Extrovert AI replace our sales team?",
        answer:
          "No. It removes the administrative work that stops reps selling: chasing, logging, and remembering to follow up. Your team spends its time on qualified conversations instead of pipeline maintenance.",
      },
      {
        question: "What does the lead scoring actually use?",
        answer:
          "Observed buying signals: engagement behaviour, reply patterns, source quality, and firmographic fit. Not manually assigned point values, which go stale as soon as your market shifts.",
      },
      {
        question: "Do we need a sales ops person to run it?",
        answer:
          "No. Extrovert AI is built to run the lead lifecycle without ongoing manual configuration, which is what makes it workable for teams with no sales ops function.",
      },
      {
        question: "Does it replace our existing CRM?",
        answer:
          "It does not have to. Extrovert AI connects to existing records and channels and layers automation on top, so your team keeps the system it already knows.",
      },
    ],
    integrations: [
      "Web forms and landing pages",
      "Email and calendar",
      "Existing CRM records",
      "Ad platform lead forms",
      "Chat and inbound messaging",
      "Webhooks and custom APIs",
    ],
    flow: {
      label: "Lead path",
      stages: [
        { name: "Lead in", kind: "input" },
        { name: "Qualify", kind: "model" },
        { name: "Follow up", kind: "action" },
        { name: "Pipeline moves", kind: "action" },
        { name: "Booked", kind: "output" },
      ],
      branch: { fromIndex: 1, name: "Human escalation" },
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
      "A governance function for organisations putting AI into real decisions. Inventory what is running, document how it decides, and hold evidence ready before anyone asks for it.",
    description:
      "Sillage is the governance layer most organisations skipped: models reached production faster than the ability to account for them. It stands up a live register of every AI system in use, a written basis for how each one decides, runtime controls on the decisions they may make, and a continuously assembled evidence trail. It is built to map cleanly onto the frameworks an audit will invoke, including SOC 2 and ISO/IEC 42001, so readiness is a standing state rather than a scramble.",
    problem:
      "The exposure is not that AI makes mistakes. It is that when a regulator, customer, or board member asks how a decision was reached, nobody can answer, and the absence of an answer is the finding.",
    capabilities: [
      {
        eyebrow: "Inventory",
        title: "Know what is actually running",
        description:
          "A live register of every AI system in the organisation, what data each touches, which decisions it influences, and who owns it. Most governance failures start as a system nobody knew was in production.",
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
      "Regulated industries deploying AI in decisions",
      "Teams facing SOC 2, ISO 42001, or the EU AI Act",
      "Boards asking how AI decisions are governed",
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
          "No. This service gives them the technical substrate they are currently missing: an accurate register of what is running and how it decides. Legal judgement stays with your counsel.",
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
