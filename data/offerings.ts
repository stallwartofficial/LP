// STALLWART'S PORTFOLIO. The company's offerings, not one product's features.
//
// Extrovert AI is ONE offering here, not the subject of the site. Each entry
// gets its own detail page at /offer/[slug] where its capabilities live.
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
};

export const offerings: Offering[] = [
  {
    slug: "extrovert-ai",
    name: "Extrovert AI",
    category: "Product · Revenue",
    status: "available",
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
  },
  {
    slug: "ai-compliance-and-governance",
    name: "AI Compliance and Governance",
    category: "Service · Assurance",
    status: "in-development",
    tagline: "Deploy AI you can defend in a room full of auditors",
    summary:
      "A governance function for organisations putting AI into real decisions. Inventory what is running, document how it decides, and hold evidence ready before anyone asks for it.",
    description:
      "Most organisations adopted AI faster than they built the ability to account for it. Models are in production that nobody has inventoried, making decisions nobody has documented, on data nobody has mapped. This service will stand up that missing layer: a register of every AI system in use, a written account of how each one decides, controls on the decisions they are permitted to make, and an evidence trail assembled continuously rather than the week before a review.",
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
      "Teams facing EU AI Act or sector obligations",
      "Boards asking how AI decisions are governed",
    ],
    faqs: [
      {
        question: "Is this a certification?",
        answer:
          "No. Stallwart does not issue certifications and does not claim any. This service builds the inventory, documentation, controls, and evidence trail that a certification, audit, or regulatory review will ask you to produce.",
      },
      {
        question: "When will AI Compliance and Governance be available?",
        answer:
          "It is in development and not yet available for purchase. Scope is being finalised. If AI governance is live on your risk register, book a call and we will tell you honestly where it stands.",
      },
      {
        question: "Do you replace our legal or risk team?",
        answer:
          "No. This service gives them the technical substrate they are currently missing: an accurate register of what is running and how it decides. Legal judgement stays with your counsel.",
      },
    ],
    integrations: [],
  },
  {
    slug: "ai-video-creation",
    name: "AI Video Creation",
    category: "Service · Production",
    status: "in-development",
    tagline: "Video production at the volume your channels actually need",
    summary:
      "A production service for teams whose video demand outgrew their editing capacity. Consistent output, on brand, without a linear relationship between videos shipped and hours spent.",
    description:
      "Video is now the format every channel prefers and the one every team is short of. The constraint is rarely ideas. It is that each finished asset costs the same editing hours as the last, so output is capped by headcount. This service will change that arithmetic: an AI assisted production pipeline that turns source material into finished, on brand, platform ready video, with a human holding editorial judgement rather than dragging clips on a timeline.",
    problem:
      "Every channel rewards more video, and every additional video costs the same as the one before it. Output stays flat while demand compounds.",
    capabilities: [
      {
        eyebrow: "Assemble",
        title: "Source material to first cut",
        description:
          "Long form recordings, calls, and raw footage become structured first cuts automatically, so editorial time is spent on judgement instead of on assembly.",
      },
      {
        eyebrow: "Adapt",
        title: "One asset, every aspect ratio",
        description:
          "Each piece is reframed, captioned, and paced for the platform it is going to, rather than one master file posted everywhere and performing nowhere.",
      },
      {
        eyebrow: "Hold the line",
        title: "Brand consistency at volume",
        description:
          "Typography, colour, pacing, and lower thirds stay identical across every asset, because consistency is what separates a channel from a pile of uploads.",
      },
      {
        eyebrow: "Review",
        title: "A human before anything ships",
        description:
          "Nothing publishes unreviewed. The pipeline removes the labour, not the editorial judgement, which is the part worth paying a person for.",
      },
    ],
    builtFor: [
      "Marketing teams with a weekly content commitment",
      "Founders publishing consistently on social",
      "Agencies delivering video across many clients",
    ],
    faqs: [
      {
        question: "When will AI Video Creation be available?",
        answer:
          "It is in development and not yet available for purchase. Scope is being finalised. If video output is a current bottleneck, book a call and we will tell you where the service stands.",
      },
      {
        question: "Is the output fully automated?",
        answer:
          "No, deliberately. The pipeline removes the assembly labour, and a person holds editorial judgement and signs off before anything publishes. Fully unattended publishing is how brands ship work they regret.",
      },
      {
        question: "Will it match our existing brand?",
        answer:
          "That is the point of the service. Typography, colour, pacing, and templates are configured to your brand once, then applied identically across every asset.",
      },
    ],
    integrations: [],
  },
];

export function getOffering(slug: string) {
  return offerings.find((o) => o.slug === slug);
}

export const availableOfferings = offerings.filter(
  (o) => o.status === "available"
);
