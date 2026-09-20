// Founder tenure, derived so the copy never goes stale. Recomputed at build
// time; the site redeploys well within a year, so "N years" stays current
// without anyone editing the string. Start year 2021 (about five years in 2026).
const FOUNDER_SINCE = 2021;
const YEAR_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
];
const founderYears = new Date().getFullYear() - FOUNDER_SINCE;
export const founderYearsWord =
  YEAR_WORDS[founderYears] ?? String(founderYears);

export const site = {
  // STALLWART IS THE SUBJECT OF THIS SITE.
  //
  // Stallwart is a multi-product AI company. Its offerings live in
  // data/offerings.ts and are introduced under "What We Offer". Nothing in this
  // file should describe a single product; if a string here mentions a CRM or
  // any one offering's features, it belongs in data/offerings.ts instead.
  //
  // VOICE (enterprise): declarative, specific, unhedged. Short sentences
  // carrying real claims. No "leverage", "empower", "seamless", "cutting edge",
  // "solutions". Nothing that would survive being pasted onto a competitor's
  // site. Written to be quoted by an AI answer engine and to read as composed
  // rather than loud.
  //
  // PUNCTUATION RULE: no em dashes anywhere on this site, including page
  // titles. Use a comma, a colon, a full stop, or a middot.
  company: "Stallwart",
  tagline: "An AI-first engineering company",

  /** What the company is, in one line. No em dash: this feeds the tab title. */
  companyDescriptor: "AI-first engineering",

  /** Expanded positioning line, used under the wordmark and in the footer. */
  positioning:
    "We build anything AI around your business, engineered to run in production.",

  domain: "https://www.stallwart.in", // canonical host, drives every canonical URL

  /**
   * Company description. Feeds Organization schema and default metadata.
   * Deliberately in step with the hero copy: a meta description that
   * contradicts the h1 splits the ranking signal for the same query.
   */
  description:
    "Stallwart is an AI-first engineering company that builds production-grade AI systems: AI agents, AI and SaaS products, AI infrastructure and RAG, and custom AI systems, engineered to run in production and yours to own.",

  hero: {
    /** Hero-only tagline. Kept separate from the shared `tagline` above so the
        footer, ContactBanner and OG images keep the company standard. */
    tagline: "An AI-first engineering company",
    /** Rotating scope list for the hero flip-board. */
    flipWords: ["AI agents", "RAG bots", "dashboards", "SaaS products", "automation", "AI infra"],
    /** Split on the pipe: one line per clause. */
    headline: "AI products, agents, and systems,|built around your business.",
    /**
     * The one word set in gold. The headline is split around it, so changing
     * either string keeps the emphasis in the right place. Must appear in
     * `headline` verbatim or the headline simply renders unemphasised.
     */
    headlineEmphasis: "your business",
    /**
     * Two paragraphs rather than one wall: the first states what the company
     * is, the second states how it works. Original copy carried an em dash
     * before "built for the real world"; replaced with a comma per the
     * punctuation rule above.
     */
    subhead: [
      "Bring the problem, we build the system that solves it.",
      "Custom AI, SaaS, and automation, built for production, not a demo.",
    ],
    primaryCta: { label: "Build with us", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/offer" },
    scrollCue: "How we build",
  },

  /**
   * The founder origin, told in third person. Attributed by name and role only:
   * no quoted words are put in a real person's mouth.
   *
   * TODO(owner): if you want a signed pull quote from Arun, send the wording
   * and it goes in the Story page beside this narrative.
   */
  founder: {
    // First name for the narrative and captions; full name for formal spots
    // (photo credit, image alt, structured-data author).
    name: "Arun",
    fullName: "Arun Saravanan",
    role: "Founder",
    // Public professional profile, used as a sameAs entity signal in schema.
    linkedin: "https://in.linkedin.com/in/nuras",
    conviction:
      "Reliable, honest, and scalable. In that order, and without exception.",
    // Competence anchor. Kept factual and modest; expand only with verifiable
    // detail the founder approves.
    credential:
      "A software engineer with 5+ years building production systems, building with AI since well before it was the default.",
  },

  /**
   * The company's thesis, in three claims. Rendered as the interactive
   * mindmap on the home page. `colorKey` drives that node's accent so each
   * branch has its own identity.
   */
  pillars: [
    {
      number: "01",
      key: "reliable",
      title: "Reliable",
      claim: "A system that needs remembering is not finished.",
      description:
        "Most automation is a tool with homework attached. Someone has to trigger it, verify it, then clean up behind it. We do not ship that. If the work stops when attention moves, the system is not done.",
      proof: "Ships to run unattended, or it does not ship.",
      branches: [
        "Runs without a human trigger",
        "Degrades safely, never silently",
        "Every action logged and reversible",
      ],
    },
    {
      number: "02",
      key: "honest",
      title: "Honest",
      claim: "A system should tell you what it cannot do.",
      description:
        "Confidence without calibration is the expensive failure mode in AI. Our systems surface their own uncertainty, escalate what they should not decide, and leave an auditable trail behind every judgment they make.",
      proof: "Says what it does not know, before it costs you.",
      branches: [
        "Surfaces uncertainty instead of guessing",
        "Escalates what it should not decide",
        "Auditable reasoning, not a black box",
      ],
    },
    {
      number: "03",
      key: "scalable",
      title: "Scalable",
      claim: "Demos are easy. Tuesdays are hard.",
      description:
        "We build against the messy middle: malformed records, volume spikes, the request that fits no category. Capacity is added by the system, not by hiring another person to watch it.",
      proof: "Built against failure modes, not the happy path.",
      branches: [
        "Volume grows without headcount",
        "Tested on your real exceptions",
        "One architecture across every offering",
      ],
    },
  ],

  /**
   * The shared engineering core every offering is built on. This is what makes
   * "one standard" a structural claim rather than a heading:
   * each offering declares which of these layers it leans on (see `layers` in
   * data/offerings.ts) and the architecture diagram draws the connection.
   */
  architecture: {
    heading: "One engineering standard",
    lead: "Every Stallwart build, product or engagement, moves through the same four layers. That is why a governance guarantee in one system is a governance guarantee in all of them.",
    layers: [
      {
        name: "Intelligence",
        role: "Where a judgment is made",
        plain: "Where the AI actually makes a call.",
        detail:
          "Models are selected and constrained for the decision at hand, and calibrated to report their own uncertainty rather than assert through it.",
      },
      {
        name: "Orchestration",
        role: "Where work is routed",
        plain: "What keeps the work moving without a person pushing it.",
        detail:
          "State, retries, and sequencing. The layer that makes a system run unattended instead of needing a person to advance it.",
      },
      {
        name: "Governance",
        role: "Where limits are enforced",
        plain: "What keeps it inside your rules, with a record of every step.",
        detail:
          "Policy expressed as runtime controls, not documentation. Approval gates, escalation paths, and an audit trail written as work happens.",
      },
      {
        name: "Production",
        role: "Where it meets reality",
        plain: "What keeps it reliable once real work hits it.",
        detail:
          "Observability, rollback, and load behavior. The difference between a system that demonstrated well and a system that is still correct on a Tuesday.",
      },
    ],
  },



  contact: {
    email: "contact@stallwart.in", // public inbox; shows in the footer + schema
    address: "India",
  },
  /**
   * Where the company is based and who it serves. Country + region only, no
   * street: NDA-safe and privacy-preserving. Feeds Organization schema's
   * `address` (PostalAddress) and `areaServed`. This describes the company,
   * not any one offering.
   */
  location: {
    country: "India",
    region: "Tamil Nadu",
    areaServed: ["United States", "United Kingdom", "India", "Worldwide"],
  },
  cta: {
    primary: "Build with us",
  },
  social: {
    // Empty until real accounts exist. Both consumers (footer icons and the
    // Organization sameAs schema) render only when a URL is set, so nothing
    // links to a non-existent profile.
    linkedin: "",
    twitter: "",
  },
} as const;

// Case studies live inside the blog, so the nav says "Blog" (the plainest,
// most-understood word, and it matches the /blog route). Contact is intentionally
// omitted from the nav: the "Book a Call" CTA already covers /contact.
// /case-studies redirects to /blog (see next.config.ts).
export const navLinks = [
  { label: "Our Story", href: "/story" },
  { label: "What We Offer", href: "/offer" },
  { label: "Blog", href: "/blog" },
  { label: "Partner with us", href: "/partner" },
] as const;
