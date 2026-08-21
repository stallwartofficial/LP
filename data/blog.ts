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
    slug: "why-ai-pilots-dont-reach-production",
    kind: "article",
    title: "Why AI pilots do not reach production",
    excerpt:
      "Most enterprise AI never ships. The reason is rarely the model. It is the 80 percent of the system the pilot was allowed to skip.",
    topic:
      "enterprise AI in production, AI pilot to production, why AI projects fail, production AI engineering",
    offering: "custom-ai-engineering",
    publishedAt: "2026-02-18",
    readingMinutes: 6,
    sections: [
      {
        heading: "The pilot proves the wrong thing",
        paragraphs: [
          "A pilot is built to answer one question: can the model do the interesting part at all. It almost always can. So the pilot succeeds, the demo lands, and everyone concludes the hard part is done. It is not. The hard part was never the interesting 20 percent. It is the load-bearing 80 percent the pilot was allowed to ignore: malformed inputs, partial failures, retries, permissions, audit, rollback, and the request that fits no category.",
          "That gap is why the industry's own numbers are so bleak. A large majority of enterprise AI initiatives never reach durable production, and the failures cluster after the pilot, not during it. The model was fine. The system around it was never built.",
        ],
      },
      {
        heading: "Production is a different discipline",
        paragraphs: [
          "A demo runs once, on chosen input, with a human watching. Production runs continuously, on adversarial input, with nobody watching. Those are not two points on one scale. They are different engineering problems, and the second one is what you are actually buying.",
          "The move that changes outcomes is unglamorous: treat observability, evaluation, and rollback as part of the build, not a later phase. A system you cannot watch is a system you cannot trust, and a system you cannot roll back is one you cannot deploy twice.",
        ],
      },
      {
        heading: "What to require before you scale a pilot",
        paragraphs: [
          "Ask three questions of any pilot before you fund its path to production. What does it do when the input is wrong. Who is paged when it fails, and what can they do. How do you turn it off without turning off everything around it. If a pilot cannot answer those, it has not been de-risked; it has only been demonstrated.",
          "This is why Stallwart scopes from first principles rather than from the prototype. The prototype is useful evidence about the problem. It is almost never the foundation of the system that survives contact with production.",
        ],
      },
    ],
    qa: [
      {
        question: "Why do most enterprise AI projects fail to reach production?",
        answer:
          "Because the pilot proves the model can do the interesting part, which was never the risk. The failure lives in the surrounding system: input validation, retries, permissions, observability, audit, and rollback. That 80 percent is skipped in a pilot and is exactly what production requires.",
      },
      {
        question:
          "What is the difference between an AI demo and an AI system in production?",
        answer:
          "A demo runs once on chosen input with a person watching. Production runs continuously on unpredictable input with nobody watching. They are different engineering problems, and observability, evaluation, and rollback are what separate them.",
      },
      {
        question: "How do you de-risk an AI pilot before scaling it?",
        answer:
          "Require it to answer three questions: what it does when input is wrong, who is paged on failure and what they can do, and how it can be turned off in isolation. A pilot that cannot answer these has been demonstrated, not de-risked.",
      },
    ],
  },
  {
    slug: "ai-governance-before-the-audit",
    kind: "article",
    title: "AI governance before the audit, not after",
    excerpt:
      "Most teams assemble AI governance the week a regulator, customer, or board asks. By then the finding is already written. The absence of an answer is the finding.",
    topic:
      "AI governance, AI compliance, EU AI Act, ISO 42001, SOC 2, AI audit readiness, AI risk management",
    offering: "sillage",
    publishedAt: "2026-02-25",
    readingMinutes: 6,
    sections: [
      {
        heading: "The exposure is not that AI makes mistakes",
        paragraphs: [
          "Every model makes mistakes; that is priced in. The exposure that ends careers is different: when a regulator, an enterprise customer, or a board member asks how a specific decision was reached, nobody can answer. The absence of an answer is the finding. It does not matter that the decision was probably fine. Governance is being able to account for it, on demand, in writing.",
          "Frameworks are converging on exactly this. SOC 2 asks which controls you operate and whether they held. ISO/IEC 42001 asks for a managed AI management system, not a good intention. The EU AI Act asks for documentation, risk classification, human oversight, and logging for higher-risk uses. All three reward the same thing: an evidence trail that already exists.",
        ],
      },
      {
        heading: "Governance assembled after the fact is theatre",
        paragraphs: [
          "The common pattern is a scramble. The week before a review, a team reconstructs what its AI systems do from memory, screenshots, and hope. What they produce is a snapshot, not a control. It describes what the system was that week, not what it does, and an auditor who has seen it before knows the difference.",
          "The alternative is to make the record a byproduct of running the system rather than a project. An inventory that updates as systems ship. A written basis for each decision, kept current. Runtime controls that actually intervene, so policy is enforced rather than filed. Logs and approvals assembled continuously, so an audit is a query against evidence that already exists.",
        ],
      },
      {
        heading: "What a governable AI system looks like",
        paragraphs: [
          "It knows what is running: a live register of every model in use, the data each touches, and the decisions each influences. It can explain itself: a plain-language account of how each system decides and what it is not permitted to decide. It escalates: the decisions it should never make alone route to a human by design, not by luck. And it is reversible: every automated action is logged and can be rolled back.",
          "This is the layer Sillage is being built to stand up, and it is the same governance layer every Stallwart system ships with. Governance you can produce on the day you are asked is the only kind that counts.",
        ],
      },
    ],
    qa: [
      {
        question: "When should a company set up AI governance?",
        answer:
          "Before it is asked, not after. Governance assembled the week of a review is a snapshot, not a control, and an experienced auditor can tell the difference. The evidence trail has to be a byproduct of running the system, so it already exists when a regulator, customer, or board asks.",
      },
      {
        question:
          "What do SOC 2, ISO 42001, and the EU AI Act have in common for AI?",
        answer:
          "They reward the same thing: an evidence trail that already exists. SOC 2 asks which controls you operate and whether they held, ISO/IEC 42001 asks for a managed AI management system, and the EU AI Act asks for documentation, risk classification, human oversight, and logging for higher-risk uses.",
      },
      {
        question: "What makes an AI system governable?",
        answer:
          "Four properties: a live inventory of what is running, a written basis for how each system decides, escalation of decisions it should not make alone, and reversibility so every automated action is logged and can be rolled back.",
      },
    ],
  },
  {
    slug: "outbound-is-a-research-problem",
    kind: "article",
    title: "Outbound was never a sending problem. It is a research problem.",
    excerpt:
      "Most teams try to fix outbound by sending more. The constraint was never volume. It is the account research every good message depends on, and that is exactly the step an AI SDR can finally carry at scale.",
    topic:
      "AI SDR, AI outbound, autonomous outbound, outbound sales automation, account research, AI GTM engine, cold email personalization",
    offering: "extrovert-ai",
    publishedAt: "2026-02-04",
    readingMinutes: 7,
    sections: [
      {
        heading: "The tool stack solved the wrong half of outbound",
        paragraphs: [
          "Over the last decade, outbound sales got a stack. Data providers to build lists, sequencers to send at volume, deliverability tools to land in the inbox, schedulers to book the meeting. Every one of them optimized sending. Almost none of them touched the part that actually decides whether a message works: knowing enough about the account to say something worth reading. So teams became extremely efficient at sending outreach that no longer converts, and reply rates fell across the entire channel.",
          "The reason is structural, not a discipline failure. A sequencer can send a thousand emails a day. A human sales development rep can only research a handful of accounts a day properly. When sending capacity outruns research capacity by two orders of magnitude, the rational move under quota is to skip the research and send anyway. The stack did not cause spray and pray outbound. It made spray and pray the path of least resistance.",
        ],
      },
      {
        heading: "Research is the expensive, invisible, skippable step",
        paragraphs: [
          "Good outbound is specific. It references something true about the account: a recent change in the business, a role that just opened, a system the company clearly runs, a problem their category is facing this quarter. That specificity is the whole difference between a message a buyer answers and one they delete in half a second. And it is expensive to produce, because it means reading the company's website, its recent news, its job posts, and its market before writing a single word.",
          "Because that work is expensive and invisible, research is the first thing to disappear when a rep is behind. Nobody audits whether the research happened. They audit whether the emails went out. So the metric that gets watched, activity, quietly crowds out the input that actually matters, relevance, and the channel degrades one skipped step at a time until the team concludes that outbound is dead. Outbound is not dead. The research was.",
        ],
      },
      {
        heading: "What an AI SDR actually changes",
        paragraphs: [
          "AI SDR is a fair shorthand for what a system like this does, but the important word is not SDR. It is research. An AI SDR does the reading a human skips under time pressure: given a target company and its website, it researches the business, finds the specific angle, and grounds every message in it. Since sending was never the constraint, automating the sending alone was never going to move the number. Automating the research is what changes the output.",
          "This is the line between mail merge and an AI GTM engine. Mail merge drops a company name into a fixed template. An AI GTM engine writes a genuinely different, grounded message because it actually looked at a genuinely different, specific account. The first scales bad outbound faster. The second scales the thing a strong rep does on their best day, across every account instead of the few they had time to research.",
        ],
      },
      {
        heading: "Personalization at scale stopped being a contradiction",
        paragraphs: [
          "For years, personalization and scale were a real trade off. You could send a lot, or you could send relevant, not both. That trade off existed for one reason: research did not scale. Once research scales, the trade off dissolves. A system can run account level research on every prospect and write from it, so the thousandth message is as grounded as the first. That is a different economic curve than any human outbound team has ever operated on.",
          "This matters well beyond reply rate. Generic blasts get marked as spam, which trains inbox providers to bury the whole sending domain, which silently kills deliverability for the legitimate messages too. Relevance is not only a conversion lever. It is how a sending reputation survives contact with volume. A researched message protects the channel; a templated one slowly poisons it.",
        ],
      },
      {
        heading: "Where the human still belongs",
        paragraphs: [
          "Taking research and sending off a rep's plate does not remove the rep. It relocates them to the part that genuinely needs a person: the conversation. When a booked meeting lands on the calendar, a human takes it. The discovery, the reading of a room, the judgment about what to offer, the negotiation, none of that is automated, and none of it should be. The system runs the motion up to the meeting; the person runs the meeting.",
          "The honest version of this also knows when not to reach out. An account that is plainly not a fit should be skipped, not blasted, because every irrelevant send costs a little reputation. A system that researches before it writes can make that call in advance, which is precisely what a rep racing a quota rarely has the time to do.",
        ],
      },
      {
        heading: "How to tell if your outbound is research-starved",
        paragraphs: [
          "Three signs. Reply rates are falling while send volume is flat or rising. Reps describe outreach as a numbers game rather than an account game. And nobody can tell you, for a given campaign, what the messages actually said about the accounts. If those are true, the constraint is not your sequencer or your data provider. It is that the research step was quietly deleted to hit activity targets.",
          "That is the specific gap Extrovert AI exists to close. Not making reps faster at sending, which was never the bottleneck, but doing the account research on every prospect so the message earns the send, then following up on the right cadence, scoring the reply on real intent, and booking the meeting. Outbound stops being a volume game and returns to being an account game, at a scale no human team could ever staff.",
        ],
      },
    ],
    qa: [
      {
        question: "What is an AI SDR?",
        answer:
          "An AI SDR is a system that does the work a sales development rep does before the conversation: researching target accounts, writing and sending outreach grounded in that research, following up, scoring replies, and booking meetings. Unlike a human SDR working one list at a time, it runs the whole outbound motion across every account at once. A person still takes the booked conversation.",
      },
      {
        question: "Why are outbound email reply rates falling?",
        answer:
          "Because sending tools scaled faster than research did. A sequencer can send thousands of messages while a rep can only research a few accounts a day, so under quota the research gets skipped and outreach becomes generic. Buyers ignore generic outreach, so reply rates fall even as send volume rises.",
      },
      {
        question: "Does personalized outbound work better than mass cold email?",
        answer:
          "Yes, and increasingly it is the only outbound that works. Messages grounded in specific account research get answered; templated blasts get deleted and damage sending reputation. The old trade off between relevance and scale existed only because research did not scale, and AI research removes it.",
      },
      {
        question: "Can AI do account research for outbound sales?",
        answer:
          "Yes. Given a company name and website, an AI GTM engine can research the business, its market, and recent signals to find a specific reason to reach out, then write from it. That is the step humans skip under time pressure, and automating it is what actually improves outbound, rather than automating the sending.",
      },
      {
        question: "Does an AI SDR replace human sales reps?",
        answer:
          "No. It removes the research, sending, and follow up that consume a rep's day and hands them the booked conversation. Discovery, judgment, and negotiation stay with the person. The system runs the motion up to the meeting; the human runs the meeting.",
      },
    ],
  },
  {
    slug: "saas-outbound-booked-meetings-case-study",
    kind: "case-study",
    title:
      "Case study: how a mid market SaaS team ran outbound to booked meetings without more SDRs",
    excerpt:
      "A SaaS team was blasting a bought list and getting almost nothing. What changed when every account was researched before a word went out, and the whole motion ran itself to a booked meeting.",
    topic:
      "SaaS outbound, AI SDR for SaaS, B2B outbound automation, account based outbound, booked meetings, cold email deliverability",
    offering: "extrovert-ai",
    industry: "SaaS Sales",
    persona: "VP of Sales at a 40 to 150 employee B2B SaaS company",
    publishedAt: "2026-01-15",
    readingMinutes: 7,
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "On paper the team had an outbound motion. Buy a list, load a sequence, send. In practice it produced activity dashboards and almost no meetings. Reply rates sat below one percent, the sending domain was starting to land in spam, and the two SDRs spent their days loading contacts and pasting templates rather than talking to buyers. The instinct was to buy a bigger list and hire a third SDR, which would have scaled the exact thing that was not working.",
          "The real problem sat upstream of the sequence. Nobody had time to research the accounts, so every message said the same generic thing. To a buyer, a message that could have been sent to any company reads as a message that was sent to every company, and it gets deleted accordingly. Volume was never the constraint. Relevance was, and relevance had been quietly cut to keep the volume up.",
          "This is the trap mid market SaaS teams fall into. Outbound looks like a throughput problem, not enough sends, when it is actually a research problem, nothing worth sending. Throughput is easy to buy. Research is the expensive part, and it was the part being skipped every single day.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Extrovert AI was pointed at the same target market, but the motion inverted. For each target company and website, it researches the account first: what the business does, what it clearly runs, what changed recently, and why now might be the moment. Then it writes outreach grounded in that specific research, in the team's voice, and sends it. Nothing goes out that could have been addressed to anyone else.",
          "Follow up fires on the cadence each account's engagement justifies and adapts to replies, so no thread dies because a rep forgot the fourth touch. Responses are read and scored on real buying intent rather than politeness, and qualified conversations are booked straight onto the reps' calendars.",
          "It also declines. Accounts that are plainly not a fit are skipped rather than blasted, which protects the sending domain the team had been slowly burning. The whole motion optimizes for a booked meeting, not for send count, which is the number that actually pays the team.",
        ],
      },
      {
        heading: "Why researched outbound protects the whole channel",
        paragraphs: [
          "Generic blasts do not merely underperform. They teach inbox providers to distrust the sending domain, which drags down the messages that would have worked. Deliverability is a reputation, and a reputation is spent every time a batch of irrelevant mail generates spam complaints instead of engagement.",
          "By sending fewer, researched messages to accounts that actually fit, the domain's reputation recovers and the good messages start arriving again. Relevance and deliverability are the same lever seen from two sides: the outreach that earns a reply is also the outreach that keeps the channel alive.",
        ],
      },
      {
        heading: "What changed for the reps",
        paragraphs: [
          "The two SDRs stopped loading lists and pasting templates. Their day moved from assembling outbound to taking the conversations outbound produced. The work that genuinely needs a human, discovery and qualification on a live call, is the work they now spend their time on.",
          "The administrative layer that used to eat the day, the research nobody had time for and the follow up nobody remembered, is carried by the system. Outbound volume can now grow without adding SDR headcount, because the part that used to require another person is no longer done by a person.",
        ],
      },
    ],
    outcomes: [
      "Outbound stops being a volume game. Every account is researched before a message is sent, so relevance is the default rather than the exception.",
      "The sending domain recovers, because researched, well-targeted outreach is not what trains inbox providers to route a domain to spam.",
      "Rep time moves from assembling sequences to taking booked conversations, and outbound volume grows without adding SDR headcount.",
    ],
    metrics: [],
    qa: [
      {
        question: "How can a SaaS team improve outbound reply rates?",
        answer:
          "By researching each account before sending rather than blasting a bought list. Reply rates collapse when every message is generic and recover when each references something specific and true about the account. An AI SDR does that research on every prospect, which is the step human reps skip under quota.",
      },
      {
        question: "What is account based outbound?",
        answer:
          "Outreach built from research on the specific account rather than a template sent to a list. Each message references something true about that company, which is what earns a reply. AI makes it possible to run account based outbound at list scale, because the research no longer has to be done by hand.",
      },
      {
        question: "Does AI outbound hurt email deliverability?",
        answer:
          "Done badly, any outbound hurts deliverability, because generic blasts get marked as spam and train inbox providers to bury the domain. Done well, researched outbound to accounts that fit protects deliverability, because it generates engagement instead of complaints. The differentiator is relevance, not volume.",
      },
      {
        question: "Does this replace our SaaS CRM?",
        answer:
          "No. Extrovert AI connects to the CRM the team already keeps and runs the outbound motion on top of it, so reps keep their existing system of record while the research, outreach, follow up, and booking are automated.",
      },
    ],
  },
  {
    slug: "agency-pipeline-case-study",
    kind: "case-study",
    title:
      "Case study: keeping agency pipeline full through delivery crunches, with automated outbound",
    excerpt:
      "Agency new business dies every time delivery gets busy. What changes when researched outbound runs continuously, whether or not anyone has the hours to do it.",
    topic:
      "agency outbound, agency business development, AI SDR for agencies, outbound automation, pipeline consistency",
    offering: "extrovert-ai",
    industry: "Agencies",
    persona: "Head of Growth or founder at a 10 to 60 person B2B agency",
    publishedAt: "2026-01-15",
    readingMinutes: 6,
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "Agency new business competes directly with billable work, and billable work wins every time. So outbound is cyclical: a quiet month triggers a burst of prospecting, the resulting projects consume the team, prospecting stops, and the pipeline empties again a quarter later. The feast and famine cycle is not a motivation problem. It is that the same people do outbound and delivery, and delivery is always the more urgent of the two.",
          "When the agency did run outbound, it was thin by necessity. A founder personalized a few emails between calls, sent them, and never had time for the research that makes outbound land or the follow up that makes it convert. The channel got written off as ineffective when it had never actually been run properly.",
          "The most expensive losses were the quiet ones. A well-fit target the agency could clearly have helped, contacted once during a quiet week, never followed up because delivery got busy, then signed with a competitor who simply kept showing up.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Extrovert AI runs the outbound motion continuously, independent of the team's delivery load. It researches each target account, writes grounded outreach in the agency's voice, sends it, follows up on cadence, scores replies, and books the calls. A delivery crunch no longer silently pauses business development, because the motion is not a task anyone has to remember to run.",
          "Because the research is automated, the outreach is specific rather than the generic template a busy founder would otherwise fire off. It references what the target company does and why the agency is relevant to it right now, which is the difference between a reply and a deletion.",
          "Dormant targets and past conversations are re approached automatically with context aware messaging on the prospect's timeline, so old pipeline is worked continuously rather than rediscovered by accident in the next quiet month.",
        ],
      },
      {
        heading: "Why continuity beats intensity in agency outbound",
        paragraphs: [
          "The agency growth problem is not that outbound does not work. It is that it gets run in bursts. A steady, researched cadence that never pauses beats an occasional heroic push, because buying windows open on the client's schedule, not the agency's.",
          "Being the vendor in front of a prospect when their window opens is a function of showing up consistently. That is exactly what a person juggling delivery cannot do and a system can, which is why decoupling outbound from the team's available hours is the whole game for an agency.",
        ],
      },
    ],
    outcomes: [
      "Outbound stops being cyclical. Researched outreach runs at the same cadence during delivery peaks as during quiet periods, so pipeline no longer collapses a quarter after every busy stretch.",
      "Every target account is researched before contact, so agency outreach is specific rather than the generic template a founder sends between calls.",
      "Dormant targets and past conversations are re engaged automatically, turning a back catalogue of near misses into a renewable pipeline source without new headcount.",
    ],
    metrics: [],
    qa: [
      {
        question: "Why do agencies struggle to keep a consistent pipeline?",
        answer:
          "Because business development competes with billable client work for the same people, and delivery always wins. When projects get busy, outbound and follow up stop, so pipeline arrives in cycles of feast and famine rather than steadily. Automating the outbound motion decouples it from the team's delivery load.",
      },
      {
        question: "How can an agency run outbound without a dedicated sales team?",
        answer:
          "By automating the motion. An AI GTM engine researches target accounts, writes and sends grounded outreach, follows up, and books calls without a person driving each step, so a delivery-focused agency can run continuous outbound it has no headcount to staff by hand.",
      },
      {
        question: "Can outbound keep running during a delivery crunch?",
        answer:
          "Yes, when it does not depend on the team's available hours. Because the research, sending, follow up, and booking are automated, a busy delivery month no longer silently pauses business development, which is the usual cause of the agency feast and famine cycle.",
      },
      {
        question: "Can old agency leads that went quiet be re engaged?",
        answer:
          "Yes. Dormant targets and past conversations are re approached automatically with context aware messaging, which matters for agencies because client side buying windows frequently open months after first contact.",
      },
    ],
  },
  {
    slug: "small-team-follow-up-case-study",
    kind: "case-study",
    title: "Case study: how a five person team ran enterprise grade outbound",
    excerpt:
      "Small teams lose outbound to the research and follow up they have no hours for, not to product. What changes when the whole motion runs without a sales ops function.",
    topic:
      "small business outbound, SMB sales automation, AI SDR for small teams, outbound without headcount, founder led sales",
    offering: "extrovert-ai",
    industry: "SMB",
    persona: "Founder or sales lead at a 5 to 25 person B2B company",
    publishedAt: "2026-01-15",
    readingMinutes: 6,
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "A five person company is not a scaled down enterprise. It is a team where every person does every job: the same person sources, researches, writes, sends, follows up, demos, and onboards. Outbound is the first casualty, because it is the least urgent task on any given day and the most expensive one to skip.",
          "When the team did run outbound, it was shallow by necessity. There was no time to research accounts, so the messages were generic, and no time to follow up, so single-touch outreach died on the vine. Most deals come from a later touch, not the first, so the follow up that never happened was exactly where the pipeline leaked.",
          "Small teams are also told they cannot compete with larger competitors that field dedicated SDRs. On outbound specifically that has been true, because outbound was gated by human hours the small team simply did not have.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Extrovert AI gives a five person team the outbound motion a much larger team runs with headcount. It researches each target account, writes grounded outreach in the team's voice, sends it, follows up persistently, scores replies, and books meetings, all without a sales ops function to configure and babysit it.",
          "Follow up sequences continue whether or not the founder is in a demo, on a delivery call, or on a plane. That removes the single largest source of small team pipeline leakage: the follow up that depends on someone remembering to send it.",
          "Because the research is automated, the small team's outreach is as specific as a well-staffed competitor's. That is the variable where being small used to be a pure disadvantage, and it is now neutralized.",
        ],
      },
      {
        heading: "Why small teams gain the most from automated research",
        paragraphs: [
          "For a large team, automating account research is an efficiency gain. For a five person team, it is the difference between running outbound and not running it at all. There were never enough hours to research accounts by hand, so without automation the channel simply did not happen.",
          "The scarcest resource on a small team is attention. Researched, scored outbound spends that attention only on the conversations worth a live call, instead of spreading it thin across everything, which is how a tiny team gets the reach of a much larger one.",
        ],
      },
    ],
    outcomes: [
      "A five person team runs the same researched outbound motion a much larger team staffs with SDRs, without hiring sales ops.",
      "Follow up persistence stops depending on individual memory and available hours, closing the biggest source of small team pipeline leakage.",
      "Growth in target volume no longer forces an immediate hire, because research, sending, follow up, and booking scale without people.",
    ],
    metrics: [],
    qa: [
      {
        question: "How can a small sales team compete with a larger one on outbound?",
        answer:
          "By automating the layer larger teams solve with headcount. An AI SDR researches accounts, writes and sends grounded outreach, follows up, and books meetings, so a small team matches a larger competitor on relevance and persistence without hiring sales ops or SDR staff.",
      },
      {
        question: "What is the biggest source of lost outbound for small teams?",
        answer:
          "Missing follow up and skipped research. Most deals close on a later touch, and on a small team follow up is the task most often displaced by delivery work, while account research never happens at all. Automating both is what closes the leak.",
      },
      {
        question: "Does a small business need a sales ops person to run AI outbound?",
        answer:
          "No. A system built to run the outbound motion without ongoing manual configuration is specifically what makes it workable for teams with no sales ops function.",
      },
      {
        question: "Can outbound be personalized without time to research each account?",
        answer:
          "Yes, when the research is automated. An AI GTM engine researches each target account and writes from it, so a small team sends account-specific outreach it would never have the hours to produce by hand.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const caseStudyPosts = blogPosts.filter((p) => p.kind === "case-study");
export const articlePosts = blogPosts.filter((p) => p.kind === "article");
