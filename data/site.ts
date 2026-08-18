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
  tagline: "Built Beyond.",

  /** What the company is, in one line. No em dash: this feeds the tab title. */
  companyDescriptor: "AI and Software Engineering, Built Beyond",

  /** Expanded positioning line, used under the wordmark and in the footer. */
  positioning:
    "We build systems with AI that are reliable, honest, and built to scale.",

  domain: "https://stallwart.in", // TODO: confirm, drives every canonical URL

  /**
   * Company description. Feeds Organization schema and default metadata.
   * Deliberately in step with the hero copy: a meta description that
   * contradicts the h1 splits the ranking signal for the same query.
   */
  description:
    "Stallwart is an AI and software engineering company building production grade AI systems, intelligent automation, and custom software products for complex problems that demand more than off the shelf solutions. Engineered for reliability, security, and scale.",

  hero: {
    headline: "Engineering the impossible into production.",
    /**
     * The one word set in gold. The headline is split around it, so changing
     * either string keeps the emphasis in the right place. Must appear in
     * `headline` verbatim or the headline simply renders unemphasised.
     */
    headlineEmphasis: "impossible",
    /**
     * Two paragraphs rather than one wall: the first states what the company
     * is, the second states how it works. Original copy carried an em dash
     * before "built for the real world"; replaced with a comma per the
     * punctuation rule above.
     */
    subhead: [
      "Stallwart is an AI and software engineering company that builds production grade AI systems, intelligent automation, and custom software products for complex problems that demand more than off the shelf solutions.",
      "We take ambitious ideas from first principles to production, engineering technology for reliability, security, scalability, and continuous evolution, built for the real world and not just the demo.",
    ],
    primaryCta: { label: "Book a Call", href: "/contact" },
    secondaryCta: { label: "See What We Build", href: "/offer" },
    scrollCue: "How we build",
  },

  /**
   * The founder origin, told in third person. Attributed by name and role only:
   * no quoted words are put in a real person's mouth.
   *
   * TODO(owner): if you want a signed pull quote from Nuras, send the wording
   * and it goes in the Story page beside this narrative.
   */
  founder: {
    name: "Nuras",
    role: "Founder",
    conviction:
      "Reliable, honest, and scalable. In that order, and without exception.",
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
        "Confidence without calibration is the expensive failure mode in AI. Our systems surface their own uncertainty, escalate what they should not decide, and leave an auditable trail behind every judgement they make.",
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
        role: "Where a judgement is made",
        detail:
          "Models are selected and constrained for the decision at hand, and calibrated to report their own uncertainty rather than assert through it.",
      },
      {
        name: "Orchestration",
        role: "Where work is routed",
        detail:
          "State, retries, and sequencing. The layer that makes a system run unattended instead of needing a person to advance it.",
      },
      {
        name: "Governance",
        role: "Where limits are enforced",
        detail:
          "Policy expressed as runtime controls, not documentation. Approval gates, escalation paths, and an audit trail written as work happens.",
      },
      {
        name: "Production",
        role: "Where it meets reality",
        detail:
          "Observability, rollback, and load behaviour. The difference between a system that demonstrated well and a system that is still correct on a Tuesday.",
      },
    ],
  },


  areaServed: ["United States", "United Arab Emirates"],

  contact: {
    email: "hello@stallwart.in", // placeholder, swap with real inbox
    phone: "+1 (000) 000-0000", // placeholder
    address: "Address on file, contact us for details", // placeholder
  },
  cta: {
    primary: "Book a Call",
  },
  social: {
    linkedin: "https://linkedin.com/company/stallwart", // placeholder
    twitter: "https://twitter.com/stallwart", // placeholder
  },
} as const;

// Case studies now live inside the blog, so there is no separate nav item.
// /case-studies redirects to /blog (see next.config.ts).
export const navLinks = [
  { label: "Our Story", href: "/story" },
  { label: "What We Offer", href: "/offer" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
