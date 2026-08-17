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
  companyDescriptor: "AI Systems Built Beyond",

  /** Expanded positioning line, used under the wordmark and in the footer. */
  positioning:
    "We build systems with AI that are reliable, honest, and built to scale.",

  domain: "https://stallwart.in", // TODO: confirm, drives every canonical URL

  /** Company description. Feeds Organization schema and default metadata. */
  description:
    "Stallwart builds systems with AI that carry the operational work a business cannot afford to drop. Reliable, honest about their limits, and engineered to scale. Sales pipelines, AI governance, and video production, built beyond the demo.",

  hero: {
    /** Split on the pipe for line by line reveal. */
    headline: "Systems with AI,|built beyond the demo.",
    subhead:
      "Anything performs on rehearsed input. Stallwart builds systems that hold at real volume, on the exceptions nobody scoped, on the Friday your best operator is out. Reliable, honest, and built to scale.",
    primaryCta: { label: "Book a Call", href: "/contact" },
    secondaryCta: { label: "See what we build", href: "/offer" },
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
   * Structural facts only. Deliberately NOT performance metrics or customer
   * counts, which are unverifiable pre-launch (constraint 7).
   */
  facts: [
    { value: "3", label: "systems in the portfolio" },
    { value: "24/7", label: "how long they run unattended" },
    { value: "0", label: "steps needing a human reminder" },
    { value: "100%", label: "actions logged and reversible" },
  ],

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
