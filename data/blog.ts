// INSIGHTS. One content surface, two kinds of post.
//
// Case studies are posts here, not a separate section. That was a deliberate
// consolidation: one URL namespace concentrates ranking signal instead of
// splitting it, and a reader looking for proof and a reader looking for a point
// of view are the same person. /case-studies redirects to /blog.
//
// AEO NOTE: every post carries a `qa` array. Those render on the page AND emit
// FAQPage structured data, which is the format AI answer engines quote. Each
// question is phrased the way a buyer would actually type it.
//
// PUNCTUATION: no em dashes anywhere.

export type PostKind = "case-study" | "article";

export type QaBlock = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  kind: PostKind;
  title: string;
  /** Meta description and card excerpt. Written to earn the click. */
  excerpt: string;
  /** Target query cluster. Keeps posts intentional rather than filler. */
  topic: string;
  /** Which Stallwart offering this concerns (slug from data/offerings.ts). */
  offering: string;
  /** Case studies only: the industry this scenario describes. */
  industry?: string;
  /** Case studies only: who the scenario is written for. */
  persona?: string;
  publishedAt: string;
  readingMinutes: number;
  /** Section headed body. Every post reads as structured, scannable editorial. */
  sections: { heading: string; paragraphs: string[] }[];
  /** Case studies only: the structural shifts, rendered as a list. */
  outcomes?: string[];
  /**
   * TODO(real-data): empty by design on every case study. Populate ONLY with
   * metrics a named customer has verified and approved. Empty renders no
   * numbers, which is correct pre-launch. Never fill with plausible figures.
   */
  metrics?: { label: string; value: string }[];
  /** Declarative Q&A. Rendered on page and emitted as FAQPage schema. */
  qa: QaBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "speed-to-lead-is-the-whole-funnel",
    kind: "article",
    title: "Speed to lead is not a metric. It is the whole funnel.",
    excerpt:
      "Most B2B teams treat lead response time as a reporting line. Structurally it decides how much of your pipeline you ever get to compete for.",
    topic: "speed to lead, lead response time, B2B sales conversion",
    offering: "extrovert-ai",
    publishedAt: "2026-02-04",
    readingMinutes: 5,
    sections: [
      {
        heading: "The deals you lose before you know they exist",
        paragraphs: [
          "Every B2B sales team measures conversion rate. Far fewer measure how much of their pipeline was decided before a rep ever entered the conversation.",
          "The mechanism is simple. A buyer with a live problem rarely contacts one vendor. They contact several in a single sitting, while the problem is still in front of them. The vendor who answers inside that window is not competing on price, product depth, or references. They are the only participant in the conversation. Everyone who replies the next morning is arguing against a frame someone else already set.",
        ],
      },
      {
        heading: "Why response time behaves like a filter, not a KPI",
        paragraphs: [
          "Improving your demo to close rate optimises the deals you are already in. Improving response time changes how many deals you are in at all. One is an efficiency gain. The other changes the size of the board.",
          "That is why teams with strong close rates and weak response times often read as having a lead quality problem. The pipeline looks thin at the top, so the instinct is to buy more leads. The leads were never the constraint.",
        ],
      },
      {
        heading: "The failure is invisible in your CRM",
        paragraphs: [
          "A lead that goes cold from slow follow up does not appear as a loss. It appears as a lead that never engaged. Nothing in the pipeline report distinguishes a buyer who was not interested from a buyer nobody reached in time.",
          "So the reporting quietly blames the market, and the team responds by increasing spend at the top of the funnel. Volume rises, response time degrades further, and the ratio gets worse while every dashboard says the strategy is working.",
        ],
      },
      {
        heading: "Why hiring does not fix it",
        paragraphs: [
          "The usual answer is headcount: add an SDR to work the queue faster. That works until volume grows, because triage cost scales with lead count and a person's hours do not.",
          "The result is that response time degrades again at exactly the moment marketing starts performing. The better your demand generation gets, the worse your speed to lead becomes. That is not a discipline failure. It is arithmetic.",
        ],
      },
      {
        heading: "The structural fix",
        paragraphs: [
          "Stop making response time a function of queue depth. If every lead is scored on intent at the moment of capture, and follow up fires from that score, then the highest intent lead is contacted first regardless of arrival order or how deep the queue is.",
          "Speed stops being something a team sustains through discipline and becomes a property of the system. That is the specific problem Extrovert AI exists to remove: not making reps faster at triage, but removing triage as the thing standing between a buyer and a conversation.",
        ],
      },
    ],
    qa: [
      {
        question: "What is speed to lead?",
        answer:
          "Speed to lead is the elapsed time between a prospect making contact and a salesperson responding. It matters because buyers typically contact several vendors in one sitting, so the vendor who replies inside that window often frames the entire evaluation.",
      },
      {
        question: "Why is lead response time so important in B2B sales?",
        answer:
          "Because it determines how many deals you compete for at all, rather than how well you compete in the deals you are already in. A slow response does not lower your win rate, it removes you from the opportunity before the win rate applies.",
      },
      {
        question: "Why does hiring more SDRs not fix slow lead response?",
        answer:
          "Triage cost scales with lead volume while a person's available hours do not. Adding headcount improves response time temporarily, then it degrades again as volume grows, which usually happens precisely when demand generation starts working.",
      },
      {
        question: "How do you improve speed to lead permanently?",
        answer:
          "Make response order a function of lead intent rather than arrival order. When leads are scored at capture and follow up fires from that score, the highest intent lead is always contacted first regardless of queue depth.",
      },
    ],
  },
  {
    slug: "saas-inbound-triage-case-study",
    kind: "case-study",
    title: "Case study: cutting a mid market SaaS team's lead response to minutes",
    excerpt:
      "How automatic scoring and follow up change the arithmetic for a SaaS sales team drowning in undifferentiated inbound.",
    topic: "SaaS lead management, inbound triage, lead scoring",
    offering: "extrovert-ai",
    industry: "SaaS Sales",
    persona: "VP of Sales at a 40 to 150 employee B2B SaaS company",
    publishedAt: "2026-01-15",
    readingMinutes: 6,
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "Mid market SaaS teams rarely have a lead problem. They have a lead triage problem. Inbound arrives from trials, demo forms, content downloads, and webinar lists at the same time, and all of it lands in one undifferentiated queue.",
          "The cost is structural rather than dramatic. A trial signup with obvious intent sits behind forty content downloads with none. By the time a rep works down to it, the prospect has already had a conversation with a competitor who replied the same afternoon.",
          "Teams in this position usually respond by hiring an SDR to work the queue faster. That adds cost linearly while inbound volume grows non linearly. The queue wins.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Extrovert AI collapses every inbound channel into one pipeline at the point of capture, so no source keeps a private backlog nobody is watching.",
          "Each lead is scored on observed behaviour: trial activity depth, reply patterns, source quality, and firmographic fit. Not on static point values that stop describing the market within a quarter.",
          "Follow up then fires on the cadence that score justifies. High intent trials are contacted while the product is still open in another tab. Low intent downloads enter nurture instead of consuming a rep's afternoon.",
        ],
      },
    ],
    outcomes: [
      "Response time stops being a function of queue depth and becomes a function of score, so the highest intent lead is contacted first regardless of when it arrived.",
      "Rep time moves from triage to conversation. The queue is reviewed rather than assembled.",
      "Inbound volume can grow without a proportional increase in sales ops headcount, because the triage layer is no longer a person.",
    ],
    metrics: [],
    qa: [
      {
        question:
          "What problem do mid market SaaS teams have with inbound leads?",
        answer:
          "High intent and low intent leads arrive in the same queue, so reps work them in arrival order rather than value order. Genuinely interested prospects wait behind unqualified traffic and go cold before anyone reaches them.",
      },
      {
        question: "How does lead scoring fix slow response time?",
        answer:
          "Scoring every inbound lead on real buying signals at the moment of capture allows follow up to fire by score rather than by arrival order, so the highest intent lead is contacted first even when the queue is deep.",
      },
      {
        question: "Does this require replacing an existing SaaS CRM?",
        answer:
          "No. Extrovert AI connects to existing records and channels and layers automation on top, so the team keeps the system its reps already know.",
      },
    ],
  },
  {
    slug: "agency-pipeline-case-study",
    kind: "case-study",
    title: "Case study: ending the feast and famine cycle in agency pipeline",
    excerpt:
      "Agency new business competes with billable work and loses every time. How automated follow up keeps every thread alive through a delivery crunch.",
    topic: "agency business development, referral follow up, pipeline consistency",
    offering: "extrovert-ai",
    industry: "Agencies",
    persona: "Head of Growth or founder at a 10 to 60 person B2B agency",
    publishedAt: "2026-01-15",
    readingMinutes: 6,
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "Agency new business development competes directly with billable work, and billable work wins every time. Pipeline activity becomes cyclical: a quiet month triggers outreach, the resulting work consumes the team, outreach stops, and the pipeline empties again.",
          "Agency leads also arrive through unusually scattered channels. Referrals in a founder's inbox, conversations on LinkedIn, speaking events, partner introductions, inbound forms. Much of it never reaches a shared system at all.",
          "The most expensive losses are the quiet ones. A warm referral that received one reply and no second follow up, then signed with someone else six weeks later.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Every channel, including forwarded referrals and inbound messaging, is captured into one pipeline, so new business stops living in individual inboxes.",
          "Follow up sequences run independently of team capacity. A delivery crunch no longer silently pauses business development, because nurture is not a task anyone has to remember.",
          "Dormant opportunities are reopened automatically with context aware messaging. Client side buying cycles restart on the client's timeline rather than the agency's, so old pipeline is worked continuously instead of rediscovered.",
        ],
      },
    ],
    outcomes: [
      "Business development stops being cyclical. Outreach continues at the same cadence during delivery peaks as during quiet periods.",
      "Referrals are tracked as pipeline rather than as favours in an inbox, so the highest converting channel finally receives systematic follow up.",
      "Re engagement turns a dormant back catalogue of past conversations into a renewable pipeline source without new headcount.",
    ],
    metrics: [],
    qa: [
      {
        question: "Why do agencies struggle to keep a consistent pipeline?",
        answer:
          "Business development competes with billable client work for the same people. When delivery gets busy, outreach and follow up stop, so pipeline arrives in cycles of feast and famine rather than steadily.",
      },
      {
        question: "How can an agency follow up on referrals more reliably?",
        answer:
          "Capture referrals from inboxes, messaging, and partner introductions into a single pipeline and place them on automatic follow up sequences, so a warm introduction cannot quietly stall after one reply.",
      },
      {
        question: "Can old agency leads that went quiet be reopened?",
        answer:
          "Yes. Dormant opportunities are re approached automatically with context aware messaging, which matters for agencies because client side buying cycles frequently restart months after first contact.",
      },
    ],
  },
  {
    slug: "small-team-follow-up-case-study",
    kind: "case-study",
    title: "Case study: how a five person sales team matched a much larger one",
    excerpt:
      "Small teams lose deals to follow up, not to product. What changes when persistence stops depending on someone's memory.",
    topic: "small business sales, SMB CRM, sales follow up automation",
    offering: "extrovert-ai",
    industry: "SMB",
    persona: "Founder or sales lead at a 5 to 25 person B2B company",
    publishedAt: "2026-01-15",
    readingMinutes: 5,
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "A small sales team is not a scaled down enterprise team. It is a team where every person does every job. The same rep sources, qualifies, demos, negotiates, and onboards.",
          "Follow up is the first casualty. It is the least urgent task on any given day and the most expensive one to skip, because the majority of closes come from a contact after the first.",
          "Small teams are also structurally disadvantaged on response speed against larger competitors with dedicated SDRs. That is the one variable where being small should be an advantage rather than a handicap.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Capture and scoring run without a sales ops function, so a small team gets pipeline hygiene it has no headcount to perform manually.",
          "Multi touch follow up sequences continue whether or not the founder is in a demo, on a delivery call, or on a plane. That removes the single largest source of small team lead leakage.",
          "Scoring lets a very small team spend its scarcest resource, attention, only on the leads worth a live conversation, instead of spreading it evenly across everything.",
        ],
      },
    ],
    outcomes: [
      "Response speed becomes independent of team size. A five person team can reply as fast as a competitor with a dedicated SDR bench.",
      "Follow up persistence stops depending on individual memory and available hours.",
      "Growth in lead volume no longer forces an immediate hire, because the administrative layer scales without people.",
    ],
    metrics: [],
    qa: [
      {
        question: "How can a small sales team compete with a much larger one?",
        answer:
          "By automating the layer larger teams solve with headcount. Automated capture, scoring, and follow up let a small team match a larger competitor on response speed and persistence without hiring sales ops or SDR staff.",
      },
      {
        question: "What is the biggest source of lost leads for small teams?",
        answer:
          "Inconsistent follow up. Most deals close on a later touch rather than the first, and on a small team follow up is the task most often displaced by delivery work.",
      },
      {
        question: "Does a small business need a sales ops person to automate follow up?",
        answer:
          "No. A system built to run the lead lifecycle without ongoing manual configuration is specifically what makes automation workable for teams with no sales ops function.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const caseStudyPosts = blogPosts.filter((p) => p.kind === "case-study");
export const articlePosts = blogPosts.filter((p) => p.kind === "article");
