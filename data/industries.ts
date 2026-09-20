// The 14 industries Stallwart builds AI for. SINGLE SOURCE OF TRUTH: the
// homepage/offer explorer, the industriesSchema (AEO), the /industries hub, the
// per-industry pages (/industries/[slug]), and the sitemap all read from here,
// so copy, schema, and pages can never drift. Icons live in the explorer
// component keyed by slug (JSX cannot live in a data module).
//
// Voice: plain English, benefit-first, no em dashes, no unverifiable claims.
export type Industry = {
  slug: string;
  name: string;
  /** Completes "In {short}, we build AI that {title}". */
  title: string;
  detail: string;
  tags: string[];
  outcomes: string[];
  closer: string;
};

const industriesRaw: Industry[] = [
  {
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    title: "handles bookings, itineraries, and guest questions on its own, day and night.",
    detail: "Guests get instant answers in any language, at any hour, without a bigger front desk. Prices move with demand on their own, and every trip is planned around what each traveller actually wants.",
    tags: ["Concierge agents", "Dynamic pricing", "Itinerary planners", "Review analysis", "Upsell automation", "Multilingual chat"],
    outcomes: ["Answer guests instantly, in any language", "Fill more rooms with demand-based pricing", "Plan trips tailored to each traveller", "Stop losing bookings to slow replies", "Turn every stay into an upsell"],
    closer: "From first search to checkout, the experience runs itself.",
  },
  {
    slug: "real-estate-construction",
    name: "Real Estate & Construction",
    title: "reads plans, tracks sites, and turns documents into decisions.",
    detail: "Contracts, drawings, and permits are read and summarised in seconds instead of days. Cameras track site progress automatically, and every lead is scored so your team chases the deals worth chasing.",
    tags: ["Document intelligence", "Site progress vision", "Lead qualifiers", "Valuation models", "Delay alerts", "Bid estimation"],
    outcomes: ["Read contracts and plans in seconds", "Track site progress from camera feeds", "Score and prioritise every lead", "Catch cost overruns before they hit you", "Win more bids with faster estimates"],
    closer: "Less paperwork, tighter sites, and a pipeline that sorts itself.",
  },
  {
    slug: "aerospace",
    name: "Aerospace",
    title: "watches complex systems and catches faults before they ground anything.",
    detail: "Sensor data is watched around the clock, so small faults are caught long before they become failures. Engineers find the exact regulation or manual page in one question instead of an afternoon.",
    tags: ["Predictive maintenance", "Compliance search", "Ops copilots", "Anomaly detection", "Parts forecasting", "Inspection vision"],
    outcomes: ["Catch faults before they ground fleets", "Find any regulation in one question", "Cut unplanned downtime", "Stop grounded aircraft draining your revenue", "Keep the right parts on the shelf"],
    closer: "Safety and uptime, backed by systems that never look away.",
  },
  {
    slug: "banking",
    name: "Banking",
    title: "moves money safely, catches fraud, and answers customers instantly.",
    detail: "Suspicious activity is flagged in real time, before money leaves. New customers are verified in minutes, and everyday questions are answered instantly without a queue.",
    tags: ["Fraud detection", "KYC automation", "Support agents", "AML monitoring", "Dispute resolution", "Chargeback defense"],
    outcomes: ["Flag fraud in real time, before money leaves", "Verify new customers in minutes", "Answer customers without a queue", "Stop losing money to fraud caught too late", "Resolve disputes without the backlog"],
    closer: "Safer money movement and faster service, at the same time.",
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    title: "personalises every shopper and keeps shelves and prices right.",
    detail: "Every shopper sees the products most likely to suit them, which lifts each basket. Stock is forecast so you rarely sell out or over-order, and your catalogue keeps itself tidy and searchable.",
    tags: ["Recommendation engines", "Demand forecasting", "Catalog automation", "Visual search", "Cart recovery", "Return reduction"],
    outcomes: ["Lift baskets with personal recommendations", "Forecast stock to avoid sell-outs", "Keep the catalogue clean automatically", "Win back the carts shoppers abandon", "Cut the returns eating your margin"],
    closer: "More per shopper, less waste on the shelf.",
  },
  {
    slug: "education",
    name: "Education",
    title: "tutors each learner and takes the busywork off educators.",
    detail: "Each learner gets a patient tutor that adapts to their pace. Grading and lesson prep happen in the background, so teachers spend their time teaching, not on paperwork.",
    tags: ["Adaptive tutors", "Grading assistants", "Course generation", "Progress analytics", "Dropout alerts", "Parent updates"],
    outcomes: ["Give every learner a personal tutor", "Grade and prep lessons in the background", "Free teachers to teach", "Spot struggling students before they drop out", "Keep parents updated without the emails"],
    closer: "Better outcomes for students, hours back for educators.",
  },
  {
    slug: "fintech",
    name: "Fintech",
    title: "underwrites, scores, and reconciles faster than any manual team.",
    detail: "Credit decisions come back in seconds with a clear reason attached. Accounts reconcile themselves, and risk is modelled continuously instead of once a quarter.",
    tags: ["Credit scoring", "Reconciliation agents", "Risk models", "Transaction insights", "Default prediction", "Audit trails"],
    outcomes: ["Decide credit in seconds, with reasons", "Reconcile accounts automatically", "Model risk continuously", "Stop bad loans before they default", "Close the books without the month-end scramble"],
    closer: "Faster decisions your compliance team can still defend.",
  },
  {
    slug: "insurtech",
    name: "Insurtech",
    title: "reads claims, prices risk, and settles the simple cases itself.",
    detail: "Claims are read, sorted, and the straightforward ones settled without a human touching them. Risk is priced on real data, and policy questions are answered from your own documents.",
    tags: ["Claims triage", "Underwriting copilots", "Policy search", "Fraud checks", "Renewal automation", "Leakage control"],
    outcomes: ["Settle simple claims automatically", "Price risk on real data", "Answer policy questions instantly", "Stop paying out on fraudulent claims", "Keep renewals from quietly slipping away"],
    closer: "Lower loss ratios and claims that close in hours.",
  },
  {
    slug: "media-advertising",
    name: "Media & Advertising",
    title: "creates, targets, and measures campaigns at machine speed.",
    detail: "Drafts, variations, and creative are generated in minutes, not weeks. Audiences are matched to the right message, and what works is measured and doubled down on automatically.",
    tags: ["Content generation", "Audience targeting", "Creative testing", "Performance analytics", "Budget optimisation", "Brand safety"],
    outcomes: ["Generate creative in minutes, not weeks", "Match audiences to the right message", "Double down on what works", "Stop burning budget on ads that flop", "Keep your brand off the wrong pages"],
    closer: "More output, sharper targeting, measurable spend.",
  },
  {
    slug: "physical-ai",
    name: "Physical AI",
    title: "gives machines eyes and judgement in the real world.",
    detail: "Robots and cameras understand what they are looking at and act on it. Quality is inspected at line speed, and machines navigate real spaces safely on their own.",
    tags: ["Robotics perception", "Vision QA", "Autonomy stacks", "Edge inference", "Defect detection", "Safety monitoring"],
    outcomes: ["See and act in the real world", "Inspect quality at line speed", "Navigate spaces safely", "Catch defects before they ship to customers", "Stop costly downtime on the line"],
    closer: "Judgement and vision, built into the machines themselves.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    title: "handles records, triage, and paperwork so clinicians treat people.",
    detail: "Notes and records are written up automatically, giving clinicians their time back. Patients are triaged to the right care faster, and any record is found with a simple question.",
    tags: ["Clinical documentation", "Triage agents", "Records search", "Prior-auth automation", "Scheduling agents", "Coding assistants"],
    outcomes: ["Write clinical notes automatically", "Triage patients to the right care", "Find any record in one question", "Cut the after-hours charting that burns out clinicians", "Fill the gaps left by no-shows"],
    closer: "More time with patients, less time on paperwork.",
  },
  {
    slug: "communication",
    name: "Communication",
    title: "routes, drafts, and answers across every channel automatically.",
    detail: "Messages are answered, routed, and drafted across chat, email, and voice without a bigger team. Common requests are resolved on their own, and the hard ones reach the right person instantly.",
    tags: ["Support automation", "Voice agents", "Smart routing", "Sentiment analysis", "Escalation alerts", "Knowledge search"],
    outcomes: ["Answer across chat, email, and voice", "Resolve common requests automatically", "Route the hard ones instantly", "Stop customers waiting on hold and leaving", "Catch angry customers before they churn"],
    closer: "Every channel covered, without growing the team.",
  },
  {
    slug: "automotive",
    name: "Automotive",
    title: "powers assistants, diagnostics, and the software inside the vehicle.",
    detail: "Drivers get a natural assistant that actually understands them. Faults are diagnosed early, and fleets are watched and optimised from a single place.",
    tags: ["In-car assistants", "Diagnostics AI", "Fleet intelligence", "ADAS vision", "Warranty analysis", "Recall detection"],
    outcomes: ["Give drivers a natural assistant", "Diagnose faults early", "Optimise fleets from one place", "Catch defects before they become recalls", "Cut warranty claims eating your profit"],
    closer: "Smarter vehicles and fleets that look after themselves.",
  },
  {
    slug: "mobility",
    name: "Mobility",
    title: "optimises routes, fleets, and demand in real time.",
    detail: "Routes and dispatch adjust to traffic and demand as it happens. You know where demand will be before it arrives, so vehicles are in the right place at the right time.",
    tags: ["Route optimisation", "Demand prediction", "Dispatch agents", "Pricing engines", "Idle-time reduction", "ETA accuracy"],
    outcomes: ["Adjust routes to live conditions", "Predict demand before it arrives", "Place vehicles where they are needed", "Stop vehicles sitting idle and losing money", "Give riders ETAs they can trust"],
    closer: "Right vehicle, right place, right time, automatically.",
  },
];

// Display order: highest AI-industry search demand first, so the most-looked-for
// industries are seen and reached first. Edit this list to re-rank everywhere
// (explorer, hub, schema, sitemap) at once. Any slug missing here sorts last.
const SEARCH_RANK = [
  "healthcare",
  "banking",
  "retail-ecommerce",
  "fintech",
  "education",
  "real-estate-construction",
  "insurtech",
  "automotive",
  "media-advertising",
  "travel-hospitality",
  "communication",
  "mobility",
  "aerospace",
  "physical-ai",
];

const rank = (slug: string) => {
  const i = SEARCH_RANK.indexOf(slug);
  return i === -1 ? SEARCH_RANK.length : i;
};

export const industries: Industry[] = [...industriesRaw].sort(
  (a, b) => rank(a.slug) - rank(b.slug),
);

/** Short industry label for "In {short}, we build AI that ..." lines. */
export function industryShort(name: string): string {
  return name.split(" & ")[0].toLowerCase();
}

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
