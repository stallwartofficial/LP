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
  /** Name of the inline SVG diagram to render under the intro (see
   *  components/BlogDiagram.tsx). Optional. */
  diagram?: string;
  /** Section headed body. Every post reads as structured, scannable editorial.
   *  An optional `list` renders as a checklist/framework under the paragraphs. */
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  /** Scannable summary, rendered as a highlighted block and strong GEO snippet
   *  bait. Optional. */
  keyTakeaways?: string[];
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

const rawBlogPosts: BlogPost[] = [
  {
    slug: "why-ai-pilots-dont-reach-production",
    kind: "article",
    title: "Why AI pilots fail to reach production (and how to fix it)",
    excerpt:
      "Most enterprise AI never ships, and the model is rarely the reason. Here is the load-bearing 80 percent every pilot skips, and the checklist that separates a demo from a system you can actually run.",
    topic:
      "why AI projects fail, AI pilot to production, AI proof of concept to production, enterprise AI in production, production AI engineering, MLOps, AI POC to production",
    offering: "custom-ai-engineering",
    publishedAt: "2026-02-18",
    readingMinutes: 8,
    diagram: "pilot-production",
    sections: [
      {
        heading: "The pilot proves the wrong thing",
        paragraphs: [
          "Most enterprise AI never reaches durable production, and the reason is almost never the model. The pilot proves the interesting 20 percent works; production is the load-bearing 80 percent the pilot was allowed to skip. That is the whole story, and everything below is why.",
          "A pilot is built to answer one question: can the model do the interesting part at all. It almost always can. So the pilot succeeds, the demo lands, and everyone concludes the hard part is done. It is not. The hard part was never the clever bit. It is malformed inputs, partial failures, retries, permissions, audit trails, rollback, cost ceilings, and the request that fits no category you planned for.",
          "That is why industry surveys keep putting the share of enterprise AI that reaches production in the minority, and why the failures cluster after the pilot rather than during it. Nothing was wrong with the model. The system around it was never built. A working prototype is real evidence about the problem. It is almost never the foundation of the thing that survives contact with production.",
        ],
      },
      {
        heading: "A demo and a production system are different problems",
        paragraphs: [
          "A demo runs once, on input you chose, with a human watching and ready to explain away anything odd. Production runs continuously, on input nobody vetted, with nobody watching. These are not two points on one scale. They are different engineering problems, and the second one is what you are actually paying for.",
          "Consider a support agent that summarizes tickets. In the demo it reads three clean tickets and writes three clean summaries. In production it meets a ticket with a pasted stack trace, a customer writing in two languages, a thread that references an attachment that no longer exists, and a spike of ten thousand tickets in an hour because something upstream broke. The model is the same. The system is not, and the system is what decides whether this ships.",
          "The move that changes outcomes is unglamorous: treat observability, evaluation, and rollback as part of the build, not a later phase. A system you cannot watch is a system you cannot trust, and a system you cannot roll back is one you can only deploy once.",
        ],
      },
      {
        heading: "The load-bearing 80 percent, itemized",
        paragraphs: [
          "When a pilot stalls on the way to production, it is usually missing some of these. None of them are glamorous. All of them are the difference between a demo and a system.",
        ],
        list: [
          "Input validation and guardrails, so malformed or adversarial input fails safely instead of silently.",
          "Retries, timeouts, and fallbacks for every part that calls a model or an external service.",
          "Permissions and data boundaries, so the system can only see and do what it should.",
          "Observability: logs, traces, and evaluations that tell you what the system did and whether it was right.",
          "Rollback and versioning, so a bad change can be undone without taking everything else down.",
          "Cost and rate controls, so a loop or a spike does not produce a surprise invoice.",
          "Human escalation paths for the request that fits no category, because there is always one.",
        ],
      },
      {
        heading: "A checklist before you fund the path to production",
        paragraphs: [
          "Before you scale a pilot, make it answer these. If it cannot, it has been demonstrated, not de-risked, and the gap is exactly where the budget disappears.",
        ],
        list: [
          "What does it do when the input is wrong? A shrug is not an answer; a safe, logged failure is.",
          "Who is paged when it fails, and what can they actually do about it at 2am?",
          "How do you turn it off in isolation, without turning off everything around it?",
          "How do you know it is still correct next month, not just correct in the demo?",
          "What does one unit of work cost, and what stops that cost from running away?",
        ],
      },
      {
        heading: "How to build for production from the start",
        paragraphs: [
          "The teams that ship do not bolt this on at the end. They scope from first principles: what the system must never do, how it fails, who owns each failure, and what correct means, all before a line is written. The prototype informs that scope. It does not define it.",
          "That is how Stallwart builds. We treat the interesting 20 percent as the easy part, because it is, and put the engineering into the 80 percent that decides whether the thing runs unattended, stays auditable, and remains yours to own and extend. A system you cannot maintain without us is not a system we would ship.",
        ],
      },
    ],
    keyTakeaways: [
      "Most enterprise AI fails after the pilot, not during it, and the model is rarely the cause.",
      "A demo and a production system are different engineering problems; the second is what you are buying.",
      "The 80 percent that decides it: validation, retries, permissions, observability, rollback, cost control, and escalation.",
      "De-risk a pilot by making it answer what it does on bad input, who is paged, how to turn it off, how you know it stays correct, and what it costs.",
    ],
    qa: [
      {
        question: "Why do most enterprise AI projects fail to reach production?",
        answer:
          "Because the pilot proves the model can do the interesting part, which was never the real risk. The failure lives in the surrounding system: input validation, retries, permissions, observability, audit, rollback, and cost control. That load-bearing 80 percent is skipped in a pilot and is exactly what production requires.",
      },
      {
        question:
          "What is the difference between an AI demo and an AI system in production?",
        answer:
          "A demo runs once on chosen input with a person watching. Production runs continuously on unpredictable input with nobody watching. They are different engineering problems, and observability, evaluation, rollback, and safe failure are what separate them.",
      },
      {
        question: "How do you take an AI proof of concept to production?",
        answer:
          "Scope from first principles rather than from the prototype: define what the system must never do, how it fails, who owns each failure, and what correct means. Then build the 80 percent a pilot skips, validation, retries, permissions, observability, and rollback, and treat evaluation as continuous rather than a one-time check.",
      },
      {
        question: "How do you de-risk an AI pilot before scaling it?",
        answer:
          "Require it to answer five questions: what it does when input is wrong, who is paged on failure and what they can do, how it can be turned off in isolation, how you know it stays correct over time, and what one unit of work costs. A pilot that cannot answer these has been demonstrated, not de-risked.",
      },
      {
        question: "Is the model the reason most AI projects stall?",
        answer:
          "Rarely. In practice the model does the interesting part well; the project stalls on the engineering around it. That is why swapping models seldom rescues a stalled project, and why the durable fix is building the production system, not tuning the demo.",
      },
    ],
  },
  {
    slug: "ai-governance-before-the-audit",
    kind: "article",
    title: "AI governance checklist: audit-ready for SOC 2, ISO 42001, EU AI Act",
    excerpt:
      "Most teams assemble AI governance the week a regulator, customer, or board asks, and by then the finding is already written. Here is what SOC 2, ISO 42001, and the EU AI Act actually want, and the checklist that keeps you ready before the question comes.",
    topic:
      "AI governance, AI governance checklist, AI compliance, EU AI Act, EU AI Act compliance, ISO 42001, ISO/IEC 42001, SOC 2, AI audit readiness, AI risk management, AI governance framework",
    offering: "sillage",
    publishedAt: "2026-02-25",
    readingMinutes: 8,
    diagram: "governance-layers",
    sections: [
      {
        heading: "The exposure is not that AI makes mistakes",
        paragraphs: [
          "Every model makes mistakes; that is priced in. The exposure that ends careers is different: when a regulator, an enterprise customer, or a board member asks how a specific decision was reached, nobody can answer. The absence of an answer is the finding. It does not matter that the decision was probably fine. Governance is being able to account for it, on demand, in writing.",
          "So the real question is not whether your AI is accurate. It is whether, on the day you are asked, you can produce the record: what was running, what data it saw, what it decided, who was accountable, and what stopped it from doing something it should not. If that record has to be assembled after the question, you have already lost the argument.",
        ],
      },
      {
        heading: "What SOC 2, ISO 42001, and the EU AI Act actually ask for",
        paragraphs: [
          "The three frameworks people worry about are asking for the same underlying thing in different vocabularies. SOC 2 is about controls: which ones you operate around access, change, and monitoring, and evidence that they held over a period. It cares less about your AI being clever and more about whether the controls around it are real and documented.",
          "ISO/IEC 42001 asks for an AI management system: a governed, repeatable way of deciding what AI you deploy, how you assess its risks, who is accountable, and how you review it over time. It rewards a system, not a memo written the night before.",
          "The EU AI Act is risk-tiered. Many business uses are limited or minimal risk with light transparency duties, but higher-risk uses carry real obligations: documentation, risk management, human oversight, logging, and traceability. The through-line across all three is the same, an evidence trail that already exists when someone asks for it.",
        ],
      },
      {
        heading: "Governance assembled after the fact is theatre",
        paragraphs: [
          "The common pattern is a scramble. The week before a review, a team reconstructs what its AI systems do from memory, screenshots, and hope. What they produce is a snapshot, not a control. It describes what the system was that week, not what it does, and an auditor who has seen it before knows the difference.",
          "The alternative is to make the record a byproduct of running the system rather than a project. An inventory that updates as systems ship. A written basis for each decision, kept current. Runtime controls that actually intervene, so policy is enforced rather than filed. Logs and approvals assembled continuously, so an audit becomes a query against evidence that already exists.",
        ],
      },
      {
        heading: "An AI governance checklist you can keep current",
        paragraphs: [
          "You do not need all of this on day one. You need each item to be a byproduct of running the system, not a document you regenerate under pressure.",
        ],
        list: [
          "A live inventory of every model in use, the data it touches, and the decisions it influences.",
          "A written, current basis for how each system decides, and what it is explicitly not allowed to decide.",
          "Risk classification per use case, mapped to the obligations that tier actually triggers.",
          "Human oversight and escalation built in, so high-stakes decisions route to a person by design, not by luck.",
          "Runtime controls that enforce policy at the moment of the decision, not a policy document that describes it.",
          "Continuous logging of inputs, outputs, approvals, and overrides, retained and queryable.",
          "Rollback, so any automated action can be reversed and re-run under review.",
          "A named owner for each system and each control.",
        ],
      },
      {
        heading: "What a governable AI system looks like",
        paragraphs: [
          "Put simply, a governable system does four things. It knows what is running: a live register of every model, the data each touches, and the decisions each influences. It can explain itself: a plain-language account of how each system decides and what it is not permitted to decide. It escalates: the decisions it should never make alone route to a human by design. And it is reversible: every automated action is logged and can be rolled back.",
          "This is the layer Sillage is being built to stand up, and it is the same governance layer every Stallwart system ships with. Governance you can produce on the day you are asked is the only kind that counts.",
        ],
      },
    ],
    keyTakeaways: [
      "The costly exposure is not that AI errs; it is being unable to account for a decision when asked.",
      "SOC 2, ISO 42001, and the EU AI Act reward the same thing: an evidence trail that already exists.",
      "Governance assembled the week of a review is a snapshot, not a control, and auditors can tell.",
      "A governable system knows what is running, explains itself, escalates, and is reversible.",
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
        question: "What belongs on an AI governance checklist?",
        answer:
          "A live model inventory, a written basis for how each system decides and what it may not decide, per-use-case risk classification, human oversight and escalation, runtime policy enforcement, continuous logging of inputs, outputs, and approvals, rollback, and a named owner for each system and control.",
      },
      {
        question: "Does the EU AI Act apply to my AI system?",
        answer:
          "It depends on the use case, because the Act is risk-tiered. Many business uses are limited or minimal risk with light transparency duties, while higher-risk uses carry documentation, risk-management, human-oversight, and logging obligations. The practical move is to classify each use case early and map it to the obligations that tier triggers.",
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
    title: "AI SDR: why outbound is a research problem, not a sending one",
    excerpt:
      "Most teams try to fix outbound by sending more. The constraint was never volume. It is the account research every good message depends on, and that is exactly the step an AI SDR can finally carry at scale.",
    topic:
      "AI SDR, what is an AI SDR, AI sales development rep, AI outbound, autonomous outbound, outbound sales automation, account research, AI GTM engine, cold email personalization, personalization at scale",
    offering: "extrovert-ai",
    publishedAt: "2026-02-04",
    readingMinutes: 9,
    diagram: "outbound-research",
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
        list: [
          "Reply rates are falling while send volume is flat or rising.",
          "Reps describe outreach as a numbers game rather than an account game.",
          "For a given campaign, nobody can say what the messages actually said about the accounts.",
        ],
      },
    ],
    keyTakeaways: [
      "Outbound tools scaled sending; the constraint was always research, which does not scale by hand.",
      "An AI SDR automates the research a rep skips under quota, not just the sending, which is why it moves the number.",
      "Once research scales, personalization and volume stop being a trade-off, and relevance protects deliverability.",
      "The human still takes the meeting; the system runs the motion up to it.",
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
      "How a mid-market SaaS team booked meetings without hiring SDRs",
    excerpt:
      "A SaaS team was blasting a bought list and getting almost nothing. What changed when every account was researched before a word went out, and the whole motion ran itself to a booked meeting.",
    topic:
      "SaaS outbound, AI SDR for SaaS, B2B outbound automation, account based outbound, how to improve outbound reply rates, booked meetings, cold email deliverability",
    offering: "extrovert-ai",
    industry: "SaaS Sales",
    persona: "VP of Sales at a 40 to 150 employee B2B SaaS company",
    publishedAt: "2026-01-15",
    readingMinutes: 7,
    diagram: "before-after",
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
    title: "How an agency kept its pipeline full through delivery crunches",
    excerpt:
      "Agency new business dies every time delivery gets busy. What changes when researched outbound runs continuously, whether or not anyone has the hours to do it.",
    topic:
      "agency outbound, how to keep agency pipeline full, agency business development, AI SDR for agencies, outbound automation, pipeline consistency",
    offering: "extrovert-ai",
    industry: "Agencies",
    persona: "Head of Growth or founder at a 10 to 60 person B2B agency",
    publishedAt: "2026-01-15",
    readingMinutes: 6,
    diagram: "agency-continuity",
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
      "Dormant targets and past conversations are re engaged automatically, turning a back catalog of near misses into a renewable pipeline source without new headcount.",
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
    title: "How a 5-person team ran enterprise-grade outbound, no sales ops",
    excerpt:
      "Small teams lose outbound to the research and follow up they have no hours for, not to product. What changes when the whole motion runs without a sales ops function.",
    topic:
      "small business outbound, SMB outbound automation, SMB sales automation, AI SDR for small teams, outbound without headcount, founder led sales",
    offering: "extrovert-ai",
    industry: "SMB",
    persona: "Founder or sales lead at a 5 to 25 person B2B company",
    publishedAt: "2026-01-15",
    readingMinutes: 6,
    diagram: "small-team-stack",
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
  {
    slug: "what-is-an-ai-sdr",
    kind: "article",
    title: "What is an AI SDR? A plain-English guide",
    excerpt:
      "An AI SDR runs the outbound motion a sales development rep does before the conversation, research, writing, sending, follow-up, and booking, across every account at once. Here is what that means, how it differs from a sequencer, and where a human still belongs.",
    topic:
      "what is an AI SDR, AI SDR, AI sales development rep, AI SDR vs human SDR, autonomous outbound, AI GTM engine, AI outbound automation",
    offering: "extrovert-ai",
    publishedAt: "2026-03-04",
    readingMinutes: 7,
    diagram: "outbound-research",
    sections: [
      {
        heading: "The short definition",
        paragraphs: [
          "An AI SDR is a system that runs the work a sales development rep does before a conversation happens: it researches target accounts, writes and sends outreach grounded in that research, follows up, scores replies on real intent, and books qualified meetings. The difference from a human SDR is not that it is faster at any one step. It is that it runs the whole motion across every account at once, instead of one list at a time.",
          "The name is a useful shorthand, but the important word is not SDR. It is research. Outbound underperforms almost never because of sending; it underperforms because nobody had time to learn enough about each account to say something worth reading. An AI SDR carries exactly that step, at a scale no human team can staff.",
        ],
      },
      {
        heading: "What an AI SDR actually does",
        paragraphs: [
          "Point it at a target company and its website, and it runs the full sequence without a person driving each step.",
        ],
        list: [
          "Researches the account: what the business does, what it runs, what changed recently, and why now.",
          "Builds the target list and the specific angle for each contact worth reaching.",
          "Writes personalized outreach grounded in that research, in your team's voice.",
          "Sends it, then follows up on the cadence each account's engagement justifies.",
          "Scores replies on real buying intent rather than politeness.",
          "Books qualified meetings straight onto a rep's calendar.",
        ],
      },
      {
        heading: "AI SDR vs a sequencer vs a human SDR",
        paragraphs: [
          "A sequencer sends. It automates the delivery of a message you already wrote, to a list you already built. It does nothing about whether the message is worth sending, which is why bolting more sequencing onto weak outbound just scales the weakness.",
          "A human SDR can research deeply, but only a handful of accounts a day, and research is the first thing that gets cut under quota. An AI SDR sits where the constraint actually is: it does the research on every account and writes from it, then handles the sending and follow-up a sequencer would, and the qualification a human would, up to the point a live conversation begins.",
        ],
      },
      {
        heading: "When a team needs an AI SDR",
        paragraphs: [
          "The clearest signal is reply rates falling while send volume holds or climbs, which means the channel is sending more of something that no longer works. Other signals: reps spending the day assembling outreach rather than talking to buyers, follow-up that dies because someone forgot the fourth touch, and outbound that pauses entirely whenever the team gets busy.",
          "If those are true, the fix is not a bigger list or another SDR hire, which scale the part that was never the problem. It is automating the research and persistence so every account gets the outreach a strong rep would send on their best day.",
        ],
      },
      {
        heading: "Where the human still belongs",
        paragraphs: [
          "An AI SDR does not replace the rep; it relocates them. Discovery, reading the room, judgment about what to offer, and negotiation stay with a person, because those are the parts that genuinely need one. The system runs the motion up to the meeting; the human runs the meeting. It should also decline: an account that is plainly not a fit is skipped rather than blasted, which protects the sending reputation the whole channel depends on.",
        ],
      },
    ],
    keyTakeaways: [
      "An AI SDR runs the pre-conversation outbound motion, research, writing, sending, follow-up, scoring, and booking, across every account at once.",
      "The value is automating research, the step humans skip under quota, not automating sending, which was never the constraint.",
      "It differs from a sequencer (which only sends) and from a human SDR (who can only research a few accounts a day).",
      "A person still takes the meeting; the system runs everything up to it.",
    ],
    qa: [
      {
        question: "What is an AI SDR?",
        answer:
          "An AI SDR is a system that runs the outbound work a sales development rep does before the conversation: researching accounts, writing and sending grounded outreach, following up, scoring replies, and booking meetings, across every account at once. A person still takes the booked conversation.",
      },
      {
        question: "How is an AI SDR different from a sequencer?",
        answer:
          "A sequencer only automates sending a message you already wrote to a list you already built. An AI SDR does the research that decides whether a message is worth sending, writes from it, then handles sending, follow-up, and qualification. Sequencing scales delivery; an AI SDR scales relevance.",
      },
      {
        question: "Does an AI SDR replace human sales reps?",
        answer:
          "No. It removes the research, sending, and follow-up that consume a rep's day and hands them the booked conversation. Discovery, judgment, and negotiation stay with the person.",
      },
      {
        question: "How does an AI SDR personalize outreach at scale?",
        answer:
          "By automating account research. Given a company and its website, it researches the business, its market, and recent signals to find a specific reason to reach out, then writes from that research, so the thousandth message is as grounded as the first.",
      },
      {
        question: "When should a team use an AI SDR?",
        answer:
          "When reply rates are falling despite steady or rising send volume, when reps spend the day assembling outreach instead of selling, or when outbound pauses whenever delivery gets busy. Those signal a research and persistence gap, which is exactly what an AI SDR closes.",
      },
    ],
  },
  {
    slug: "ai-production-readiness-checklist",
    kind: "article",
    title: "AI production readiness checklist: is your AI ready to ship?",
    excerpt:
      "A working demo is not a shippable system. This is the production readiness checklist that separates the two, the questions to answer before you deploy, and the failure modes that sink AI projects after the pilot.",
    topic:
      "AI production readiness, AI readiness checklist, is my AI ready for production, AI production checklist, deploy AI to production, MLOps checklist, LLM in production",
    offering: "custom-ai-engineering",
    publishedAt: "2026-03-11",
    readingMinutes: 8,
    diagram: "pilot-production",
    sections: [
      {
        heading: "What production readiness actually means",
        paragraphs: [
          "Production readiness is not whether the model works on a good day. It is whether the system around the model keeps working on a bad one: when the input is malformed, a dependency times out, traffic spikes, or a request arrives that fits no category you planned for. A demo answers can it work. Production readiness answers will it keep working, unattended, when nobody is watching.",
          "The gap between the two is where most AI projects die, and it is almost never the model's fault. The pilot proves the interesting 20 percent; readiness is the load-bearing 80 percent the pilot skipped. Use the checklist below as a go or no-go gate before you fund a path to production.",
        ],
      },
      {
        heading: "The AI production readiness checklist",
        paragraphs: [
          "If you cannot answer yes to each of these, the system has been demonstrated, not readied. Treat any no as a build item, not a footnote.",
        ],
        list: [
          "Inputs: malformed and adversarial input fails safely and is logged, never silently mishandled.",
          "Reliability: every model and external call has timeouts, retries, and a defined fallback.",
          "Evaluation: you can measure whether outputs are correct, and you run that continuously, not once.",
          "Observability: logs and traces show what the system did and why, at the level of a single request.",
          "Permissions: the system can only read and act within explicit data and access boundaries.",
          "Rollback and versioning: any change can be reverted without taking down everything around it.",
          "Cost and rate control: a loop or a spike cannot produce a runaway bill.",
          "Human escalation: high-stakes or out-of-category requests route to a person by design.",
          "Ownership: a named person is paged on failure and can act on it.",
        ],
      },
      {
        heading: "The go or no-go questions",
        paragraphs: [
          "Behind the checklist sit five questions any pilot must answer before it earns a production budget.",
        ],
        list: [
          "What does it do when the input is wrong?",
          "Who is paged when it fails, and what can they do at 2am?",
          "How do you turn it off in isolation, without turning off everything around it?",
          "How do you know it is still correct next month, not just correct in the demo?",
          "What does one unit of work cost, and what stops that cost from running away?",
        ],
      },
      {
        heading: "The failure modes that sink AI after the pilot",
        paragraphs: [
          "The common ones are predictable. Silent failure, where a bad output looks like a good one and nobody notices until a customer does. No evaluation, so quality drifts and the team finds out from complaints. No rollback, so a bad change means an outage instead of an undo. And runaway cost, where a retry loop or a traffic spike turns a small feature into a large invoice. Every one of these is a system problem, not a model problem, which is why swapping models rarely fixes them.",
        ],
      },
      {
        heading: "How to get to production, not just to a demo",
        paragraphs: [
          "Scope from first principles rather than from the prototype: define what the system must never do, how it fails, who owns each failure, and what correct means, before a line is written. Build the checklist items as part of the system, not a later phase. And treat evaluation as continuous, so you learn about drift from a dashboard rather than a customer.",
          "That is how Stallwart builds. The interesting 20 percent is the easy part; the engineering goes into the 80 percent that decides whether the thing runs unattended, stays auditable, and remains yours to own and extend.",
        ],
      },
    ],
    keyTakeaways: [
      "Production readiness is about the system around the model, not the model on a good day.",
      "Work the checklist: safe inputs, reliability, evaluation, observability, permissions, rollback, cost control, escalation, and ownership.",
      "Answer five go or no-go questions before funding production: bad input, paging, isolation, ongoing correctness, and cost.",
      "The failure modes that sink AI after the pilot, silent failure, no evals, no rollback, runaway cost, are system problems, not model problems.",
    ],
    qa: [
      {
        question: "What is AI production readiness?",
        answer:
          "Production readiness is whether the system around a model keeps working under bad conditions, malformed input, failed dependencies, spikes, and out-of-category requests, unattended. It is distinct from a demo, which only proves the model can work on chosen input with a person watching.",
      },
      {
        question: "What is on an AI production readiness checklist?",
        answer:
          "Safe handling of malformed and adversarial input, timeouts and retries and fallbacks, continuous evaluation, request-level observability, explicit permissions, rollback and versioning, cost and rate control, human escalation, and a named owner who is paged on failure.",
      },
      {
        question: "How do I know if my AI is ready for production?",
        answer:
          "Make it answer five questions: what it does on wrong input, who is paged on failure and what they can do, how to turn it off in isolation, how you know it stays correct over time, and what one unit of work costs. If it cannot, it has been demonstrated, not readied.",
      },
      {
        question: "Why do AI projects fail after the pilot?",
        answer:
          "Because the pilot proves the model, which was never the risk, and skips the system: input validation, reliability, evaluation, observability, rollback, and cost control. Those show up only in production, which is why failures cluster after the pilot rather than during it.",
      },
    ],
  },
  {
    slug: "ai-gtm-engine-autonomous-outbound",
    kind: "article",
    title: "AI GTM engine: how autonomous outbound replaces the SDR stack",
    excerpt:
      "The outbound stack automated sending and left the hard part, research and judgment, to people who ran out of hours. An AI GTM engine runs the whole motion instead. Here is what autonomous outbound means, and what it does not.",
    topic:
      "AI GTM engine, autonomous outbound, AI outbound, outbound automation, go to market automation, replace SDR stack, AI SDR, AI go to market",
    offering: "extrovert-ai",
    publishedAt: "2026-03-18",
    readingMinutes: 8,
    diagram: "small-team-stack",
    sections: [
      {
        heading: "What an AI GTM engine is",
        paragraphs: [
          "An AI GTM engine is a single system that runs the outbound go-to-market motion end to end: it researches accounts, decides who to contact and why, writes and sends grounded outreach, follows up, scores replies, and books meetings. It replaces a stack of disconnected tools, and the coordination work between them, with one system that owns the whole sequence.",
          "The distinction that matters is not that it uses AI. It is where the AI is applied. Bolting a language model onto a sequencer to generate email variants is still a sending tool. An engine applies the intelligence to the step that actually decides outcomes, the research and judgment about each account, and then carries the message all the way to a booked conversation.",
        ],
      },
      {
        heading: "The old stack versus one engine",
        paragraphs: [
          "The typical outbound stack is a data provider, an enrichment tool, a sequencer, a deliverability layer, a scheduler, and a CRM, stitched together by a person. Every tool optimizes sending; none of them owns whether the message was worth sending, and the human in the middle is the one expected to supply the research and judgment the tools cannot.",
          "An AI GTM engine collapses that. Instead of a person coordinating six tools and supplying the missing research, one system runs the motion and does the research itself. The output is not more sends. It is booked meetings, which is the number the stack was never actually optimizing for.",
        ],
      },
      {
        heading: "What autonomous actually means",
        paragraphs: [
          "Autonomous does not mean unaccountable. A good engine runs on a dial. At one end, it drafts everything and holds each message for a one-click approval, so a person stays in the loop while trust is built. At the other, it runs the full motion on its own. Teams usually start with approval on and move the dial as they see the outreach hold up.",
          "It also has to know when not to act. An account that is plainly not a fit should be skipped, not messaged, because every irrelevant send spends a little sending reputation. Autonomy without that judgment is just faster spam, which is the opposite of the point.",
        ],
      },
      {
        heading: "Why this protects the channel, not just the number",
        paragraphs: [
          "Generic outreach at volume trains inbox providers to distrust the sending domain, which quietly buries the legitimate messages too. Because an engine researches before it writes and declines poor-fit accounts, it generates engagement rather than complaints, and the sending reputation the whole channel depends on survives contact with scale. Relevance and deliverability turn out to be the same lever seen from two sides.",
        ],
      },
      {
        heading: "Where an AI GTM engine fits",
        paragraphs: [
          "It fits any team where sending was never the bottleneck and research was: founder-led sales with no hours for it, SDR teams losing the day to admin, revenue leaders who want more accounts worked without more headcount, agencies running outbound for clients, and lean teams scaling without a sales-ops hire. The engine runs the motion; people take the conversations it produces.",
        ],
      },
    ],
    keyTakeaways: [
      "An AI GTM engine runs the outbound motion end to end and replaces the coordinated tool stack, not just the sequencer.",
      "The intelligence belongs on research and judgment, the step that decides outcomes, not on generating more email variants.",
      "Autonomous means a dial: hold every message for approval, or run the full motion, and move between them as trust builds.",
      "Because it researches and declines poor-fit accounts, it protects sending reputation instead of burning it.",
    ],
    qa: [
      {
        question: "What is an AI GTM engine?",
        answer:
          "An AI GTM engine is a single system that runs the outbound go-to-market motion end to end, research, targeting, writing, sending, follow-up, reply scoring, and booking, replacing a stack of disconnected tools and the person who used to coordinate them.",
      },
      {
        question: "What is autonomous outbound?",
        answer:
          "Outbound that runs the full motion without a person driving each step, on a dial from holding every message for approval to running entirely on its own. Autonomous does not mean unaccountable: a good engine also declines poor-fit accounts rather than messaging everyone.",
      },
      {
        question:
          "How is an AI GTM engine different from adding AI to a sequencer?",
        answer:
          "A sequencer with AI still only sends; it generates variants of a message to a list you built. An engine applies the intelligence to the research and judgment that decide whether a message is worth sending, then carries it to a booked meeting. One scales sending, the other scales relevance.",
      },
      {
        question: "Does autonomous outbound hurt email deliverability?",
        answer:
          "Done badly, any high-volume outbound hurts deliverability. Done well, an engine that researches before it writes and skips poor-fit accounts generates engagement instead of spam complaints, which protects the sending domain. The differentiator is relevance, not volume.",
      },
    ],
  },
  {
    slug: "adding-ai-to-your-product",
    kind: "article",
    title: "Adding AI to your product without the pilot graveyard",
    excerpt:
      "A working AI demo inside your product is the easy part. The reason most AI features never ship is the scaffolding around them. Here is how to add AI to a product so it survives real users, and how to scope the feature so it ships.",
    topic:
      "how to add AI to your product, building AI features, AI product development, AI native product, ship AI features, AI feature engineering, LLM feature in product",
    offering: "custom-ai-engineering",
    publishedAt: "2026-03-25",
    readingMinutes: 8,
    diagram: "ai-in-product",
    sections: [
      {
        heading: "Why most AI features never ship",
        paragraphs: [
          "Adding AI to a product usually starts well. Someone wires a model to a promising use case, the demo lands in a review, and the feature is declared nearly done. Then it meets real users, and the gap opens: the model that summarized three clean inputs now faces pasted noise, missing context, prompt injection, a spike of traffic, and an output that is confidently wrong in a way a customer will screenshot. The feature was built; the feature that ships was not.",
          "This is the product version of why AI pilots do not reach production. The interesting part, the model doing something clever, is the 20 percent. The 80 percent that decides whether it ships is the scaffolding around it, and that scaffolding is exactly what a demo is allowed to skip.",
        ],
      },
      {
        heading: "The feature is the easy part",
        paragraphs: [
          "For an AI feature to survive contact with users, the work is mostly around the model, not inside it. Treat these as part of the feature, not a later hardening phase, because retrofitting them after launch is how features get pulled.",
        ],
        list: [
          "Input handling: validate, bound, and sanitize what reaches the model, including hostile input and prompt injection.",
          "Evaluation: a way to measure whether outputs are good, run continuously, so quality drift is visible before customers find it.",
          "Guardrails: constraints on what the feature can output or do, and a safe response when it hits them.",
          "Fallbacks: a defined behavior when the model is slow, wrong, or unavailable, so the product degrades gracefully.",
          "Observability: request-level logs and traces, so you can explain and debug a specific bad output.",
          "Cost and latency control, so a feature does not become an unpredictable line on the bill or a slow path in the UI.",
        ],
      },
      {
        heading: "Buy the model, build the system",
        paragraphs: [
          "The model is increasingly a commodity you rent: a managed API, or an open-weight model you host where data residency requires it. That choice matters, but it is not the moat and it is not the risk. The defensible, hard part is the system that turns a general model into a feature your users trust: the data you ground it on, the evaluation that keeps it honest, and the product surface around it. Swapping the underlying model should be a config change, not a rebuild, which is only true if the system was built to make it so.",
        ],
      },
      {
        heading: "How to scope an AI feature so it ships",
        paragraphs: [
          "Start from the failure, not the demo. Define what the feature must never do, how it behaves when the model is wrong, and what correct looks like well enough to measure. Decide where a human stays in the loop for the high-stakes cases. Then build the smallest version that is genuinely production-ready, rather than the most impressive version that is only demo-ready. A narrow feature that users trust beats a broad one they learn to distrust.",
        ],
      },
      {
        heading: "Building more with AI, safely",
        paragraphs: [
          "The upside is real. Once a team can ship AI features that survive users, AI stops being a risky one-off and becomes a way to build more product, faster. Capabilities that were previously too fuzzy to attempt become tractable, because the scaffolding that makes fuzzy things reliable already exists. That is the position worth reaching, and it is what Stallwart builds toward: AI-native products where the interesting part is the feature and the part that decides whether it ships is handled.",
        ],
      },
    ],
    keyTakeaways: [
      "A working AI demo inside a product is the easy 20 percent; the scaffolding around it is what ships.",
      "Build input handling, evaluation, guardrails, fallbacks, observability, and cost control as part of the feature, not later.",
      "Buy the model, build the system: model choice should be a config change, not the moat or the risk.",
      "Scope from the failure, ship the smallest genuinely production-ready version, and keep a human in the loop for high-stakes cases.",
    ],
    qa: [
      {
        question: "How do you add AI to a product?",
        answer:
          "Wire a model to a specific use case, then build the scaffolding that makes it trustworthy with real users: input validation, continuous evaluation, guardrails, fallbacks, observability, and cost control. The model is the easy part; the system around it is what decides whether the feature ships.",
      },
      {
        question: "Why do AI features fail to ship?",
        answer:
          "Because the demo proves the model on clean input, and real users bring noise, missing context, prompt injection, spikes, and confidently wrong outputs. Without evaluation, guardrails, fallbacks, and observability, the feature works in review and breaks in production, so it gets pulled.",
      },
      {
        question: "Should you build or buy the AI model for a product feature?",
        answer:
          "Rent the model, whether a managed API or a self-hosted open-weight model for data residency, and build the system around it. The model is a commodity; the defensible, hard part is grounding data, evaluation, and the product surface. Model choice should be a config change, not a rebuild.",
      },
      {
        question: "How do you scope an AI feature so it actually ships?",
        answer:
          "Start from failure: define what the feature must never do, how it behaves when the model is wrong, and what correct means, measurably. Keep a human in the loop for high-stakes cases, and ship the smallest version that is genuinely production-ready rather than the most impressive demo.",
      },
    ],
  },
  // ---------------- Case study: regulated AI outbound ----------------
  {
    slug: "ai-outbound-for-regulated-industries",
    kind: "case-study",
    title:
      "How a regulated fintech ran AI outbound without a compliance rewrite",
    excerpt:
      "In healthcare finance every outbound message crosses a compliance desk. Here is what changed when the research, the writing, and the guardrails all sat inside one system, and legal reviewed the framework once instead of every send.",
    topic:
      "AI outbound for regulated industries, compliant cold email, AI SDR compliance, healthcare finance outbound, fintech outbound automation, HIPAA cold email, regulated B2B outbound, AI outbound guardrails, compliance-safe AI sales, cost of AI SDR in regulated industry",
    offering: "extrovert-ai",
    industry: "Healthcare Finance",
    persona:
      "Founder or head of growth at a regulated fintech, healthcare finance, or insurance platform",
    publishedAt: "2026-08-05",
    readingMinutes: 7,
    diagram: "before-after",
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "Every outbound message this team wanted to send had to survive two audiences before it survived the buyer: internal legal, and the regulator standing behind them. A single line about outcomes could be read as a health claim. A single line about savings could be read as a financial promise. So the marketing lead drafted, legal redlined, marketing redrafted, legal redlined again, and the message went out three weeks late to a moment that had already passed.",
          "The workaround the team had settled on was worse than the delay. To keep legal exposure low, outbound had been reduced to a bland, generic template that said almost nothing. It was compliance-safe because it was content-empty, and it converted accordingly. The channel was technically running and functionally dead, which is the specific failure mode a lot of regulated teams end up in.",
          "The root cause was not legal being slow. It was that every message was a fresh legal object. Nothing was reusable, nothing was pre-approved, and the same three questions were being answered again on every draft. Under that setup, either outbound was too generic to work, or it was too specific to ship.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Extrovert AI was pointed at the same market with one structural change: legal reviewed the framework once, not each message. That framework covers what the system may claim, what phrasings trigger a health or financial promise, which numbers require a disclaimer, and which topics are off limits entirely. Those rules are enforced inside the system at generation time, not caught at the end by a person.",
          "Given that guardrail, the research and writing run the same way any AI outbound should: for each target account, the system reads the business, finds a specific angle a compliant message can be built on, and writes outreach grounded in it. Every draft is checked against the guardrail before it leaves. Anything that would trip a rule is either rewritten to comply or held for a human review, with the reason surfaced.",
          "The audit trail is a byproduct, not a project. Every message, every claim, every source used to ground it, and every guardrail check is logged and queryable. When legal or a regulator asks how a specific claim was reached and on what basis, the answer already exists.",
        ],
      },
      {
        heading: "Why regulated teams can now run relevant outbound",
        paragraphs: [
          "The old trade-off in regulated outbound was that specificity created risk, so teams generalized until risk was low and reply rates followed. Once the guardrail is enforced at generation time, that trade-off flips. Specific, researched messages can go out at volume because none of them can violate a rule the system enforces before send.",
          "This is the same lever as consumer-facing AI safety, but pointed at growth. Guardrails do not exist to slow the system down; they exist so the system can be allowed to run faster. In a regulated business, that is the whole difference between AI outbound being a legal fight every week and being a channel the compliance team is comfortable letting scale.",
        ],
      },
      {
        heading: "What changed for the team",
        paragraphs: [
          "Legal's involvement moved from every draft to the quarterly framework review. Marketing stopped drafting to survive redlines and started writing to earn replies. The compliance officer got a searchable log instead of a screenshot inbox, and the sales team stopped waiting three weeks for approvals to reach a moment the market had already moved past.",
          "The other quiet win was hiring. The team no longer needed to hire an SDR who understood healthcare finance regulation well enough to self-police, because the guardrail was in the system rather than in a person's head. That is a role most founders describe as impossible to fill anyway.",
        ],
      },
    ],
    outcomes: [
      "Legal reviewed the framework once, not every send. Approval time dropped from weeks per message to zero per message inside the pre-approved rules.",
      "Outbound stopped being generic. Researched, specific outreach is now the default because the guardrail catches violations at generation, not at review.",
      "The audit trail is a byproduct of the system running. Every claim, source, and guardrail check is logged, so a regulator or auditor gets an answer, not a fire drill.",
    ],
    metrics: [],
    qa: [
      {
        question: "Can AI outbound be compliant in a regulated industry?",
        answer:
          "Yes, when the compliance rules are enforced inside the system at generation time rather than reviewed after the fact. Legal approves the framework once (what may be claimed, which numbers require disclaimers, which topics are off limits), and every draft is checked against it before send. Specific, researched outreach becomes safe to run at volume because nothing that violates a rule can leave the system.",
      },
      {
        question: "How does an AI SDR handle HIPAA or financial compliance rules?",
        answer:
          "By treating the rules as first-class configuration, not prompt suggestions. Prohibited claims, required disclaimers, and off-limits topics are enforced at message generation and blocked or flagged for human review before send, and every check is logged for the audit trail.",
      },
      {
        question: "Will compliance slow down AI outbound in healthcare finance or fintech?",
        answer:
          "Only if the review is happening at each draft. When the guardrail is enforced by the system, legal reviews the framework once and outreach runs on it, so approval time per message drops effectively to zero inside the pre-approved rules.",
      },
      {
        question: "How do you audit AI outbound after it has been sent?",
        answer:
          "By making the audit trail a byproduct of the send, not a project. A compliant AI outbound system logs every message, the sources it grounded on, and every guardrail check, and makes them queryable, so a regulator or internal auditor asking how a claim was reached gets a specific answer from evidence that already exists.",
      },
      {
        question: "Do we still need a compliance-trained SDR to run outbound?",
        answer:
          "The role that becomes hard to fill (an SDR who is also a compliance expert) becomes unnecessary when the guardrail lives in the system rather than a person's head. The compliance function still exists; it just moves from policing every send to owning the framework the system enforces.",
      },
    ],
  },
  // ---------------- Case study: founder-led outbound without SDR ----------------
  {
    slug: "founder-outbound-without-hiring-an-sdr",
    kind: "case-study",
    title:
      "How a founder-led services firm hit outbound targets without hiring an SDR",
    excerpt:
      "Hiring a sales development rep is a six figure decision that pays off in year two. Here is what a founder-led firm did instead: a researched, in-the-owner's-voice motion that runs on its own and books meetings the founder still takes personally.",
    topic:
      "founder led sales, founder led outbound, replace SDR with AI, AI SDR cost vs hiring, cheaper than hiring an SDR, outbound without sales team, AI outbound for services firm, AI SDR for small business, first sales hire, sales development for founders, founder led B2B",
    offering: "extrovert-ai",
    industry: "Professional Services",
    persona:
      "Founder-CEO of a US-based services, consulting, or marketing firm doing the outbound themselves",
    publishedAt: "2026-08-12",
    readingMinutes: 7,
    diagram: "before-after",
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "The founder was the outbound engine. He wrote the messages, he ran the follow-ups, he took the calls, and he closed the work. On the good weeks that produced a pipeline nobody else in the market could match, because every message was thoughtful and every reply landed on the same person who would take the meeting. On every other week, delivery ate the day and outbound stopped.",
          "The obvious answer, hire an SDR, had already been costed. A US-based SDR would run six figures fully loaded, would take four to six months to be productive, and would produce outreach that sounded like an SDR rather than like the founder. Buyers who had been signing on the strength of a personal note from the owner would notice. The economics of the hire were harder than they looked, because the thing being scaled was not volume; it was voice.",
          "That is the specific trap founder-led firms sit in. Their advantage in outbound is that the owner writes and the owner replies. The only way to keep the advantage while scaling volume is either to clone the owner or to build a system that runs in the owner's voice, does the research the owner would have done, and hands the owner the conversation to take.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Extrovert AI was configured against the founder's actual body of past outreach, so the voice was his, not a template. For each target account, it researches the business the way the founder would have on a quiet day, finds a specific angle, and drafts outreach grounded in it. Follow-ups run on a cadence the founder set, adapt to replies, and stop the moment the account signals fit.",
          "The rule that made this workable for a founder-led firm was simple: the meeting always lands on the founder's calendar. The system runs the motion right up to the booked call and then hands over, because the reason buyers were signing was the conversation with the owner. Automating anything after the booking would have removed the exact thing that was working.",
          "Because the research is automated, the founder gets weekly digests of what the system said about which accounts and why, so the voice stays his over time. When he wants a phrase changed, a topic added, or an account skipped, those inputs update the system rather than getting emailed to an SDR who might forget them next Tuesday.",
        ],
      },
      {
        heading: "Why this beats hiring an early SDR",
        paragraphs: [
          "The math on a first SDR hire is worse than it looks. Fully loaded cost lands well into six figures, ramp is four to six months, and the reason the founder was winning (a personal owner-signed note) does not survive the transition. Most founder-led firms who make that hire spend a year rebuilding what they had before it.",
          "An AI outbound system running in the founder's voice is a different economic curve. It costs a fraction of an SDR per month, runs from day one instead of six months in, and preserves the exact thing that was converting. The founder can also keep taking every meeting because there is one of them and the volume is calibrated to what one person can actually handle, which is another quiet win.",
        ],
      },
      {
        heading: "What changed for the founder",
        paragraphs: [
          "Outbound stopped competing with delivery for the same hours. The motion runs whether or not the founder had a heads-down week, so the pipeline no longer collapses a quarter after every busy stretch. The calendar stays full of meetings the founder still takes personally, which is the reason the firm is winning them.",
          "The other change was psychological. The founder stopped feeling like every quiet week was a failure of discipline, because it was no longer his job to remember to send. The system remembered. He got to run the business and take the calls, which is what he was doing when the firm was growing fastest in the first place.",
        ],
      },
    ],
    outcomes: [
      "Outbound decouples from the founder's available hours. The motion runs during delivery peaks and quiet weeks alike, so pipeline stops collapsing after every busy stretch.",
      "The owner's voice is preserved. Every message is grounded in real research and written in the founder's voice, so buyers still get the personal note that was converting.",
      "The first-SDR hire is deferred. The firm scales outbound volume without a six-figure hire, a four-to-six-month ramp, and the loss of owner-signed authenticity.",
    ],
    metrics: [],
    qa: [
      {
        question: "Is an AI SDR cheaper than hiring an SDR?",
        answer:
          "By a wide margin at the founder-led stage. A US-based SDR fully loaded runs well into six figures a year, ramps for four to six months, and generic templated outreach cannot replicate a founder's voice, which was often the reason early outbound was converting. An AI SDR costs a fraction of that per month, runs from day one, and can be tuned to the founder's actual voice.",
      },
      {
        question: "Can AI outbound sound like the founder rather than a template?",
        answer:
          "Yes, when the system is grounded in the founder's real past outreach and reviewed by the founder weekly rather than a generic tone prompt. The output reads like the founder wrote it because the system was configured against how the founder actually writes, and the founder still owns the voice over time.",
      },
      {
        question: "Should a founder-led firm hire an SDR or use AI outbound?",
        answer:
          "For most founder-led services firms, AI outbound is the honest first move. The advantage the firm has is that the owner writes and the owner replies, and a first SDR hire tends to erase that advantage while the ramp is being paid for. AI outbound preserves the voice, scales volume, and defers the sales hire to when the pipeline actually justifies it.",
      },
      {
        question: "Do I still take the meetings if AI runs the outbound?",
        answer:
          "Yes, and for a founder-led firm you should. The reason buyers replied is a conversation with the owner. The system runs the motion up to the booked meeting and stops there. Discovery, judgment, and closing remain with the person, and that person should be the founder while the founder is still the one closing the work.",
      },
      {
        question: "How long does it take AI outbound to start producing meetings for a founder?",
        answer:
          "Days, not months. Once the system has the founder's past outreach for voice, a target account list, and a warmed sending setup, it runs from day one. That is the largest structural difference from a human SDR hire, which typically needs four to six months to ramp before producing meetings reliably.",
      },
    ],
  },
  // ---------------- Case study: custom AI workflow shipped ----------------
  {
    slug: "ai-workflow-that-actually-shipped",
    kind: "case-study",
    title:
      "How an operations team shipped an AI workflow that survived contact with production",
    excerpt:
      "Most internal AI workflows die between the demo and the desk. This one runs every day. Here is what got engineered into the system that pilots skip, and what the operations team stopped doing by hand as a result.",
    topic:
      "custom AI development, AI workflow automation, AI for operations, internal AI tool, LLM in production, AI system integration, AI production deployment, enterprise AI integration, build AI workflow, AI workflow that shipped, operations AI automation, AI back office automation",
    offering: "custom-ai-engineering",
    industry: "Operations",
    persona:
      "Head of operations, COO, or technical program manager at a services or B2B company",
    publishedAt: "2026-08-19",
    readingMinutes: 8,
    diagram: "pilot-production",
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "The team ran a review process every business day: an operator opened a queue, read a document, cross-referenced two systems, made a judgement call, wrote a summary, and routed the item. On a normal day it took four hours across two people. On a busy day it took the whole day and things sat in the queue overnight, which is where problems tended to compound.",
          "A previous vendor had built a demo. It worked beautifully on the three examples in the pitch. It fell apart the first week it saw real input: the documents were malformed, the second system was down for a windowed maintenance, the judgement rule the operators actually used was more nuanced than the version that had been encoded, and there was no way to see why the model had chosen what it chose. Within a month the team quietly went back to doing the work by hand.",
          "That is the pattern that kills most internal AI workflows. The pilot proved the interesting 20 percent. Nobody built the 80 percent that lets the workflow survive a real day: input handling, retries, fallbacks, permissions, observability, escalation for the request that fits no category, and a rollback path when the model is confidently wrong.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Stallwart scoped the workflow from failure first. Before a line was written, the team defined what the system must never do (route a high-value item without a human sign-off), how it should behave when its inputs were missing or malformed (log, hold, escalate), and what correct meant, measurably, for each type of item in the queue. The demo was informative; it was not the spec.",
          "Under that spec, the model does the reading and drafting. The system does everything else: it validates the incoming document, pulls the cross-referenced data with retries and fallbacks when the second system is down, runs the model against the current judgement rule, checks the output against evaluations that run on every item (not just on a quarterly sample), routes low-confidence items to a human review queue with the reasoning attached, and logs every step so the operations lead can answer any question about any decision on demand.",
          "The judgement rule is a piece of configuration owned by the operations team, not code owned by an engineer. When the rule changes, the team edits it and the system picks it up. That decoupling is what makes the workflow theirs to run, and it is the single most common reason internal AI workflows outlive the team that built them.",
        ],
      },
      {
        heading: "Why this one survived when the last one did not",
        paragraphs: [
          "The previous demo optimized for the impressive path. This one optimized for the failure paths, which is where real workflows spend most of their time. Every failure mode the operators had learned to work around in the manual process was made a first-class case: retry, fallback, escalate, hold, or defer to a human, each with a reason surfaced in the log.",
          "That is the difference between an AI workflow that ships and one that gets quietly turned off. The interesting 20 percent is table stakes; the 80 percent decides whether an operations lead is willing to bet the queue on it every day. Ownership of the judgement rule by the operations team, rather than an engineering team on a change-request cadence, is what makes the bet sustainable.",
        ],
      },
      {
        heading: "What changed for the team",
        paragraphs: [
          "Two operators used to spend four hours a day on the queue on a normal day, and a full day on a busy one. Now the routine cases flow through and land on the right desk without a human touch. The exceptions, the ones that used to be lost in the flood, are the only ones the operators see, which is exactly the work where their judgement was valuable to begin with.",
          "The evening slippage stopped. Items no longer sit overnight because the queue keeps moving whether or not a person is watching, and when the second system is out for maintenance the workflow holds and resumes rather than dying. The operations lead can answer any question about any decision from the log without having to ask the team to reconstruct what happened, which is the audit trail she used to build by hand every quarter.",
        ],
      },
    ],
    outcomes: [
      "The workflow survives real input. Malformed documents, upstream outages, and the request that fits no category all have first-class handling, logged and reviewable, rather than causing a silent failure.",
      "The judgement rule is owned by operations, not engineering. The team edits the rule directly and the system picks it up, so the workflow outlives the initial build.",
      "The queue keeps moving without a person watching. Routine cases route themselves; the exceptions, where human judgement is actually needed, are the only ones operators see.",
    ],
    metrics: [],
    qa: [
      {
        question: "Why do most internal AI workflows fail to reach production?",
        answer:
          "Because the pilot proves the model can do the interesting 20 percent and nobody builds the 80 percent the workflow needs to survive a real day: input validation, retries, fallbacks, permissions, observability, escalation, and rollback. The workflow ships as a demo, breaks the first week it sees real input, and gets quietly turned off.",
      },
      {
        question: "How do you build an AI workflow that survives production?",
        answer:
          "Scope from failure. Define what the system must never do, how it behaves when inputs are wrong or upstream systems are down, and what correct means, measurably. Then build input validation, retries, fallbacks, evaluations on every item, escalation for the request that fits no category, and a log the operations team can query.",
      },
      {
        question: "Who should own the business logic of an AI workflow?",
        answer:
          "The team who runs the process, not the engineering team who built the system. The judgement rule should be configuration the operations team edits directly, so the workflow outlives the original build and no change requires an engineering cycle.",
      },
      {
        question: "What is the difference between an AI proof of concept and an AI workflow in production?",
        answer:
          "A proof of concept runs once on clean input with a person watching. A production workflow runs continuously on unpredictable input, handles upstream failures gracefully, logs every decision, escalates the ambiguous cases, and is reversible when it is wrong. The gap between the two is the engineering that separates a demo from a system.",
      },
      {
        question: "How is a custom AI workflow different from an off-the-shelf tool?",
        answer:
          "An off-the-shelf tool solves the general case with a general judgement rule. A custom workflow encodes the specific judgement rule the operations team actually uses, integrates with the systems they already run, and gives them the ownership and audit trail an outside tool cannot. It is the right choice when the process is load-bearing and the judgement is proprietary.",
      },
    ],
  },
  // ---------------- Article: AEO vs SEO vs GEO ----------------
  {
    slug: "aeo-vs-seo-vs-geo",
    kind: "article",
    title: "AEO vs SEO vs GEO: what actually differs, in plain English",
    excerpt:
      "SEO is being findable, AEO is being quotable, GEO is being cited by generative answers. All three matter, and none of them replaces the others. Here is what changes about how you write when the reader is a machine.",
    topic:
      "AEO vs SEO, GEO vs SEO, generative engine optimization, answer engine optimization, AI search optimization, how to rank on ChatGPT, how to rank on Perplexity, AI Overviews SEO, AEO checklist, GEO strategy, AI search visibility",
    offering: "custom-ai-engineering",
    publishedAt: "2026-09-02",
    readingMinutes: 9,
    diagram: "three-endpoints",
    sections: [
      {
        heading: "The three practices, in one sentence each",
        paragraphs: [
          "SEO is the practice of writing and structuring content so a search engine ranks it in a list of results for the query a person typed. AEO, answer engine optimization, is the practice of writing that same content so an answer engine can lift a self-contained sentence out of it and quote it as the answer. GEO, generative engine optimization, is the practice of writing so a generative search surface (Google's AI Overviews, Perplexity, ChatGPT search) selects the page as a source and cites it inside a generated answer.",
          "They are not the same problem. SEO fights for a click. AEO fights to be the quoted paragraph. GEO fights to be one of the three or four sources a language model actually pulls from when it composes an answer. A page can win one and lose the others, which is why teams that treat this as a single practice keep drifting away from the traffic that used to arrive.",
        ],
      },
      {
        heading: "What each practice actually asks of a page",
        paragraphs: [
          "SEO asks for the classic checklist: the query intent is answered, the page is technically sound, the topic is covered with real depth, and other sites link to it. Ranking is a function of relevance, authority, and structure, and the tie-breakers move around, but the shape has not changed in years.",
          "AEO asks for one additional thing: the answer has to exist inside the page as a self-contained sentence a machine can lift without paraphrasing. FAQ blocks with clean question-and-answer pairs work because they hand the machine exactly the right shape. Long paragraphs that only imply an answer often get ignored, even when they rank well.",
          "GEO asks for a third thing on top: the page has to be selected as a source by a language model composing an answer. Selection favours pages that are specific, verifiable, well-cited, and not obviously written to game the system. It also favours pages the model has already seen: coverage from other trusted sites, mentions in domain-specific corpora, presence in llms.txt-style manifests. This is closer to public-relations logic than to link-building.",
        ],
      },
      {
        heading: "The single-page checklist for all three",
        paragraphs: [
          "Most content teams do not want three separate content strategies; they want a single page that does the job of all three. That page has a specific shape.",
        ],
        list: [
          "One question per page, answered in the first paragraph in a single self-contained sentence.",
          "Structured FAQ block at the end, phrased as buyers actually type, with each answer a paragraph that stands alone.",
          "Explicit definitions of the jargon on the page, written to be quoted (this is what a glossary is for).",
          "Verifiable specifics: numbers with sources, direct quotes with attribution, dates on claims that decay.",
          "FAQPage and Article JSON-LD schema on every post; BreadcrumbList so the hierarchy is machine-readable.",
          "A canonical URL and a stable slug; do not move pages that already earn citations.",
          "An llms.txt file at the root that inventories the site's canonical URLs for language-model crawlers.",
          "Internal links that point from money pages to the source page, so authority flows to the pages you want cited.",
        ],
      },
      {
        heading: "What actually changed in the shift from SEO to GEO",
        paragraphs: [
          "The old game had one destination: a person clicking through to your page. The new game has two: a person clicking through, and a language model reading your page to compose an answer someone else reads. The traffic reads differently in both directions, and the second one does not always leave a footprint in analytics.",
          "That is why brand mentions and citations in AI answers have started to matter as much as clicks. A citation in an answer engine is not a link visit; it is a distribution channel that puts your name in front of a buyer who never lands on your site. Measure both, or you will optimize away the second and not notice.",
        ],
      },
      {
        heading: "What Stallwart does for this",
        paragraphs: [
          "Every page on this site is engineered for all three. Articles carry FAQ blocks and Article schema; the glossary is written to be quoted; llms.txt is generated from the same data as the site so it never drifts; canonical URLs never move. The blog is a single namespace, not split across `/blog` and `/case-studies`, because splitting ranking signal across two identical namespaces is a self-inflicted GEO problem.",
          "The point is not that this list is exhaustive. It is that the shift to generative answers is a shape change, not a tactic swap, and the pages built for it look different from pages built for ten blue links five years ago.",
        ],
      },
    ],
    keyTakeaways: [
      "SEO is being findable, AEO is being quotable, GEO is being cited by generative answers. They are three problems, not one.",
      "A single page can serve all three if it leads with a self-contained answer, carries an FAQ block, uses FAQPage and Article schema, and cites verifiable specifics.",
      "Citations in AI answer engines are a distribution channel that does not always show up as a click; measure them alongside traffic.",
      "The canonical URL and a stable slug matter more in the GEO era, not less; moving cited pages is now a self-inflicted wound.",
    ],
    qa: [
      {
        question: "What is the difference between SEO, AEO, and GEO?",
        answer:
          "SEO ranks a page in a list of search results. AEO structures the page so an answer engine can lift a self-contained sentence and quote it as the answer. GEO makes the page one of the sources a generative search surface (AI Overviews, Perplexity, ChatGPT search) cites inside a generated answer. All three matter and a page can win one while losing the others.",
      },
      {
        question: "What is Generative Engine Optimization (GEO)?",
        answer:
          "GEO is the practice of writing content so language-model-based search surfaces select it as a source when composing an answer. Selection favours pages that are specific, verifiable, well-cited, and already visible in the trusted corpora the model draws from.",
      },
      {
        question: "How do you get cited by ChatGPT, Perplexity, or AI Overviews?",
        answer:
          "Publish content that is specific, verifiable, and structurally clean: one question per page, answered up front in a self-contained sentence, with an FAQ block, Article and FAQPage JSON-LD, stable canonical URLs, and coverage from other trusted sites. Generative engines lean on structure and authority, not clever phrasing.",
      },
      {
        question: "Do FAQ schemas and llms.txt still matter for AI search?",
        answer:
          "Yes. FAQ blocks with FAQPage JSON-LD hand answer engines the exact shape they lift as a quoted answer, and llms.txt gives language-model crawlers a canonical inventory of the site. Neither is optional if the site is written to be quoted rather than only ranked.",
      },
      {
        question: "Is SEO dead now that AI answers questions directly?",
        answer:
          "No, but its endpoint changed. SEO used to end at a click; it now also ends at being one of the sources a generative answer cites. Pages built only for the click miss the second endpoint, and that is where the visibility loss shows up.",
      },
    ],
  },
  // ---------------- Article: GEO checklist ----------------
  {
    slug: "geo-checklist-get-cited-by-ai-answers",
    kind: "article",
    title:
      "GEO checklist: how to get your page cited by ChatGPT, Perplexity, and AI Overviews",
    excerpt:
      "A practical, page-level checklist for generative engine optimization. What to put on the page, in the head, in the schema, and in the site infrastructure so a language model picks it as a source when it composes an answer.",
    topic:
      "GEO checklist, generative engine optimization, get cited by AI, AI answer sources, how to rank on ChatGPT, Perplexity SEO, AI Overviews optimization, llms.txt, FAQPage schema, structured data for AI, LLM-friendly content, brand mentions in AI",
    offering: "custom-ai-engineering",
    publishedAt: "2026-09-01",
    readingMinutes: 8,
    diagram: "geo-checklist",
    sections: [
      {
        heading: "What generative engines are actually picking",
        paragraphs: [
          "A generative answer engine composes its response from a small set of sources it selects out of the corpus it can reach. The selection is not a leaderboard; it is closer to a research assistant grabbing the two or three pages that best answer this specific question with the least ambiguity. That means the pages that win are not always the pages that rank first in classical search. They are the pages that are specific, verifiable, and structurally easy to quote.",
          "Everything on the checklist below flows from that. If a page can hand a machine a clean, self-contained answer with a source attached, it is more useful to the answer engine than a longer, better-ranked page that only implies the answer inside three paragraphs of prose.",
        ],
      },
      {
        heading: "On-page: what the reader (and the model) sees",
        paragraphs: [
          "The body of the page carries most of the weight. These are the moves that reliably help.",
        ],
        list: [
          "Lead with the answer. First paragraph contains a single self-contained sentence that answers the question the page is about.",
          "One question per page. Do not bury three unrelated answers in one URL; each deserves its own home.",
          "FAQ block at the end, phrased the way buyers type, with each answer a standalone paragraph.",
          "Cite the specifics: numbers with sources, standards with the exact name, dates on claims that decay.",
          "Define the jargon on the page instead of assuming the reader arrived with it.",
          "Use clean headings that describe what each section actually answers.",
          "Publish plain-language variants of anything technical, so a summary can quote them cleanly.",
        ],
      },
      {
        heading: "In the head: what the crawler sees",
        paragraphs: [
          "Structured data is the seatbelt for GEO. It does not decide whether you are picked, but its absence often decides whether you are not.",
        ],
        list: [
          "Article and FAQPage JSON-LD on every post. Answer engines lift FAQPage answers verbatim.",
          "BreadcrumbList so the hierarchy is machine-readable.",
          "Organization schema on the site root, with a stable name and canonical URL.",
          "Canonical URL on every page; never move a page that already earns citations.",
          "Open Graph tags for accurate previews when the page is quoted in chat surfaces.",
        ],
      },
      {
        heading: "Site infrastructure: what the model's crawler expects",
        paragraphs: [
          "A well-run site makes it easier for a language model to include you. Two files do most of the work.",
        ],
        list: [
          "A live sitemap.xml that lists every canonical URL, generated from the same data as the site so it never drifts.",
          "An llms.txt at the root that inventories what the site is, what it offers, and the URLs of its canonical content.",
          "A robots.txt that permits the crawlers you want to be cited by; blocking them silently is the most common own-goal.",
          "Stable, semantic URLs. /blog/how-to-x beats /post?id=1287; do not change either once cited.",
          "Internal links from money pages to the source page, so authority concentrates on the pages you want quoted.",
        ],
      },
      {
        heading: "Off-page: coverage the model already trusts",
        paragraphs: [
          "The GEO shift makes brand mentions and citations elsewhere disproportionately valuable, because language models were pre-trained on the trusted corpora those mentions live in. Get named on the sites and podcasts your target reader treats as authoritative, and the model will pick your page over similar ones without those references.",
          "This does not replace on-page work. It is what compounds it. A specific, verifiable, well-structured page with three trusted mentions elsewhere gets cited far more often than an equivalent page nobody has heard of.",
        ],
      },
    ],
    keyTakeaways: [
      "Lead every page with a single self-contained answer; buried answers do not get quoted.",
      "FAQPage and Article JSON-LD are the seatbelts of GEO; their absence often decides you out.",
      "sitemap.xml, llms.txt, and stable canonical URLs are the site-infrastructure moves that matter most.",
      "Brand mentions on trusted sites compound the on-page work; a specific page with a few trusted references gets cited over an equivalent page without them.",
    ],
    qa: [
      {
        question: "How do you get cited by AI answer engines?",
        answer:
          "Lead with a self-contained answer, structure the page with FAQPage and Article schema, publish a sitemap and an llms.txt at the root, keep canonical URLs stable, and earn coverage from trusted sites in your space. Generative engines lean on specificity, verifiability, and structural cleanliness.",
      },
      {
        question: "Does llms.txt actually matter?",
        answer:
          "It matters as a canonical inventory for language-model crawlers, the way sitemap.xml matters for search-engine crawlers. Absence rarely disqualifies a site, but presence makes it easier for models to reach the right URLs and reduces the noise around what your site is.",
      },
      {
        question: "What schema should every article carry for AI search?",
        answer:
          "Article for the piece itself, FAQPage for any Q&A block, and BreadcrumbList for the hierarchy. Organization schema belongs on the site root. All should carry stable IDs and match what appears on the page.",
      },
      {
        question: "How important are brand mentions for GEO?",
        answer:
          "Very. Language models leaned on trusted corpora during training and continue to weight them in retrieval, so a page from a site that gets mentioned by other trusted sources is disproportionately more likely to be cited. On-page structure gets you eligible; off-page mentions get you selected.",
      },
      {
        question: "Do I need to write differently for AI answer engines?",
        answer:
          "Slightly. Lead every page with a self-contained answer, keep one question per URL, and cite specifics with sources. The rest of the writing rules do not change. What changes is that a machine is reading, and it is grading you on whether it could lift a clean sentence and stand behind the source.",
      },
    ],
  },
  // ---------------- Article: AI SEO in 2026 ----------------
  {
    slug: "ai-seo-what-changed-in-2026",
    kind: "article",
    title: "AI SEO in 2026: what changed, what still works, and what to stop doing",
    excerpt:
      "Generative search did not kill SEO; it changed the endpoint. Traffic that used to land as a click now sometimes lands as a mention in a generated answer. Here is what to keep doing, what to add, and what to stop.",
    topic:
      "AI SEO, AI SEO 2026, SEO for AI search, ChatGPT SEO, Perplexity SEO, AI Overviews SEO, generative search optimization, AI content strategy, LLM SEO, AI visibility, AEO, GEO, SEO changes 2026",
    offering: "custom-ai-engineering",
    publishedAt: "2026-08-31",
    readingMinutes: 8,
    diagram: "two-endpoints",
    sections: [
      {
        heading: "The endpoint changed, not the game",
        paragraphs: [
          "For a long time SEO had one endpoint: a person clicked through to your page. Generative search added a second one. Some queries never leave the answer surface at all; the reader gets a composed response and moves on, and if your page was one of the sources, your brand was in front of them without a click ever landing. Traffic did not stop; it split into a channel you measure and a channel you do not.",
          "That is the whole shift, and everything worth doing in AI SEO flows from it. The pages that work now are the ones that earn a click when the reader wants to go deep and earn a mention when the reader just wants a fast answer. They are different jobs on the same page, and most sites are still doing one and not the other.",
        ],
      },
      {
        heading: "What still works",
        paragraphs: [
          "The fundamentals did not move. High-intent queries still convert best. Deep, specific pages still beat broad, thin ones. Authoritative external coverage still compounds everything. Technically sound sites still rank; broken ones still do not. Anyone selling you a total reset for the AI era is charging for a rewrite you probably did not need.",
        ],
        list: [
          "Answering the query the reader actually typed, not the topic the SEO tool suggested.",
          "Original writing with a point of view. Rehashed listicles were losing ground already; AI accelerated it.",
          "Internal links that concentrate authority on the pages you want to be found for.",
          "Fast, accessible, mobile-first pages. Core Web Vitals still rank; they just no longer decide.",
          "Coverage from trusted sites in the same space. Backlinks matter, brand mentions matter more.",
        ],
      },
      {
        heading: "What to add",
        paragraphs: [
          "The new work is not another SEO gimmick. It is engineering the page so a machine can quote it and citing sources cleanly enough that the machine trusts it. The specifics come out of the AEO and GEO playbooks: lead with a self-contained answer, publish an FAQ block with FAQPage schema, cite numbers and standards by name, keep canonical URLs stable.",
        ],
        list: [
          "Lead every page with a single self-contained answer to the question the page is about.",
          "FAQPage and Article JSON-LD schema on every post.",
          "An llms.txt at the root, inventoried from the same data as the site so it never drifts.",
          "Plain-language variants of anything technical, so a summary can quote them cleanly.",
          "Measurement that captures citations and mentions in AI answers, not only clicks.",
        ],
      },
      {
        heading: "What to stop",
        paragraphs: [
          "Some habits that used to be neutral or mildly helpful are now actively damaging in a world where a language model is reading and composing.",
        ],
        list: [
          "Publishing thin content on adjacent long-tail keywords. Language models collapse them into one answer and the padding stops helping.",
          "Splitting the same content across parallel URL namespaces (`/blog/x` and `/insights/x`). Ranking signal splits; citations become inconsistent.",
          "Moving cited URLs to freshen them. A moved URL is a broken citation somewhere else.",
          "Aggressive keyword stuffing. Answer engines read for meaning, and they punish pages that read as spam even when older ranking models ignored it.",
          "Blocking AI crawlers by default in robots.txt. That is a decision to opt out of the second endpoint; make it deliberately, not by copy-paste.",
        ],
      },
      {
        heading: "How to measure the new endpoint",
        paragraphs: [
          "The traffic that never becomes a click is real but harder to see. A workable stack: a light branded-search monitor to see if your name is trending in the wake of a topic, a periodic manual check across the major answer engines for the queries you sell against, and a review of referral traffic from AI surfaces where they do send clicks. None of it is a perfect metric. All of it is better than measuring only what analytics has always shown.",
          "The point is not to obsess about attribution. The point is to notice, early, when you are being cited more or less often, and to have some idea why. That signal changes what you write next, which is the whole loop.",
        ],
      },
    ],
    keyTakeaways: [
      "Generative search added a second endpoint: a mention inside a composed answer. Traffic split; it did not stop.",
      "Fundamentals still hold: high-intent queries, deep pages, authoritative coverage, technically sound sites.",
      "Add: self-contained answers up front, FAQPage and Article schema, an llms.txt at the root, measurement that captures citations.",
      "Stop: thin adjacent-keyword pages, split URL namespaces, moving cited URLs, keyword stuffing, and blocking AI crawlers by copy-paste.",
    ],
    qa: [
      {
        question: "Did AI kill SEO?",
        answer:
          "No. It added a second endpoint. Traffic that used to always end at a click now sometimes ends at a citation in a generated answer. Pages built for both endpoints do fine; pages built only for the click miss the second half.",
      },
      {
        question: "What still works in SEO in 2026?",
        answer:
          "The fundamentals: answering the query the reader actually typed, deep and specific pages, coverage from trusted sites, sound technical hygiene, and internal links that concentrate authority. None of that moved with the shift to AI search.",
      },
      {
        question: "What should I stop doing for SEO in the AI era?",
        answer:
          "Stop publishing thin adjacent-keyword pages, splitting content across parallel URL namespaces, moving cited URLs to freshen them, keyword stuffing, and blocking AI crawlers by default. Each of those actively hurts a site whose second endpoint is a language model composing an answer.",
      },
      {
        question: "How do you measure AI SEO visibility?",
        answer:
          "Combine a branded-search monitor, periodic manual queries across the major answer engines for the questions you sell against, and referral analytics from AI surfaces that do send clicks. None of these is perfect; together they show whether citations and mentions are growing over time.",
      },
      {
        question: "Should I block AI crawlers in robots.txt?",
        answer:
          "Only as a deliberate choice, not by default. Blocking AI crawlers is a decision to opt out of the second endpoint (citation inside a generated answer), which for most B2B sites is a visibility loss they did not intend.",
      },
    ],
  },
  // ---------------- Case study: passed first AI governance audit ----------------
  {
    slug: "passed-first-ai-governance-audit",
    kind: "case-study",
    title:
      "How a SaaS platform passed its first AI-in-scope audit without a scramble",
    excerpt:
      "The AI features were finally in scope for SOC 2 and the enterprise procurement questionnaire kept getting longer. Here is what changed when the evidence became a byproduct of the systems running, not a document assembled the week before.",
    topic:
      "AI governance audit, SOC 2 with AI, AI in SOC 2 scope, ISO 42001 audit, EU AI Act compliance, AI audit readiness, AI compliance for SaaS, enterprise AI procurement, AI governance framework, AI risk assessment, AI vendor questionnaire, AI compliance evidence",
    offering: "sillage",
    industry: "Enterprise SaaS",
    persona:
      "Head of security, head of compliance, or engineering lead at a SaaS company shipping AI features",
    publishedAt: "2026-08-26",
    readingMinutes: 8,
    diagram: "governance-layers",
    sections: [
      {
        heading: "Where the work was breaking",
        paragraphs: [
          "The security team had passed SOC 2 twice on the same playbook: a spreadsheet inventory, a folder of policies, and a two-week scramble with screenshots before each audit window. The renewal year was different. Two AI features had shipped, the auditor had signalled they were in scope, an enterprise customer had sent a forty-question AI-specific questionnaire, and the board had asked whether the company was ready for ISO/IEC 42001 next year. The playbook that had worked twice was about to stop working.",
          "The specific gap was evidence. The team could describe what the AI features did, in general, in a policy document. They could not, on demand, tell an auditor what a specific model version had been running on a specific date, what data it had seen, what decisions it had influenced, who had approved the change, or what stopped it from doing something it should not. The absence of that evidence, not the presence of AI, was the finding waiting to happen.",
          "That is the specific bind teams end up in. Governance done at the policy layer alone reads as governance to an auditor who has not seen much AI, and reads as theatre to an auditor who has. Once AI is in scope, the auditor is going to ask for the evidence trail, and the only defensible answer is one that already exists.",
        ],
      },
      {
        heading: "What the system does instead",
        paragraphs: [
          "Sillage was pointed at the two AI features and stood up the governance layer as a byproduct of running them, not a project alongside them. A live inventory of every model in use updates as systems ship, so there is no gap between what the team believes is running and what is actually running. Each system carries a plain-language written basis for how it decides and what it is not permitted to decide, kept current in the same repo as the code.",
          "Every high-stakes decision routes to a human by design rather than by luck. Runtime controls enforce policy at the moment of the decision, so a violation is prevented rather than caught after. Inputs, outputs, approvals, and overrides are logged continuously, retained, and queryable. Any automated action is reversible, and every system and every control has a named owner.",
          "The auditor's questions become queries against evidence that already exists. What version was running on this date. What was the accuracy on the evaluation set that quarter. Which decisions were human-reviewed and which were fully automated. How was override used and by whom. The answers are produced in minutes because the record is a byproduct of the system, not a document reconstructed after the request.",
        ],
      },
      {
        heading: "Why this survives the questionnaire too",
        paragraphs: [
          "The enterprise procurement questionnaire and the auditor are asking for the same underlying thing in different vocabularies: an evidence trail that already exists, per system, in a form that can be produced on demand. When the governance layer is real, the same evidence answers both audiences, and the same answers hold up when the next auditor arrives with a slightly different vocabulary (ISO/IEC 42001 today, the EU AI Act's higher-risk obligations tomorrow).",
          "That is the whole return on investment on getting governance into the system layer rather than the policy layer. A control that produces evidence as a byproduct is answered once and holds for years. A control that lives in a policy document has to be re-evidenced every audit cycle, and the effort scales linearly with the number of AI features shipped.",
        ],
      },
      {
        heading: "What changed for the team",
        paragraphs: [
          "The audit was answered from the log, not from a screenshot inbox. The enterprise questionnaire that used to consume a security engineer for a week was answered in hours because most of the questions were already covered by evidence the system was generating anyway. Legal stopped drafting bespoke language per customer because the same governance narrative now covered the same questions across customers.",
          "The board question about ISO/IEC 42001 stopped being a project to start and became a scope conversation about what to certify against. Nothing new had to be built; the underlying evidence was already the shape that certification asks for. That is the outcome of putting governance in the system layer rather than the policy layer, and it is the specific reason Sillage exists.",
        ],
      },
    ],
    outcomes: [
      "The audit answered itself. Model inventory, decision basis, approvals, and overrides were produced from the log in minutes rather than reconstructed from screenshots and memory across two weeks.",
      "The enterprise AI questionnaire stopped consuming a week per customer. The same evidence trail answered SOC 2, procurement, and forward-looking ISO/IEC 42001 and EU AI Act questions from one source.",
      "Governance stopped being a policy layer and became a system layer. Runtime controls prevent violations at the moment of the decision, not after, and every automated action is reversible.",
    ],
    metrics: [],
    qa: [
      {
        question: "How do you prepare for an AI-in-scope SOC 2 audit?",
        answer:
          "By making the evidence trail a byproduct of the AI systems running, not a document assembled the week of the audit. A live model inventory, a written basis for how each system decides, human oversight for high-stakes decisions, runtime policy enforcement, continuous logging of inputs, outputs, approvals, and overrides, and rollback for every automated action are what an experienced auditor asks for once AI is in scope.",
      },
      {
        question: "What does ISO/IEC 42001 require for an AI management system?",
        answer:
          "A governed, repeatable way of deciding what AI you deploy, how you assess its risks, who is accountable, and how you review it over time. It rewards evidence that already exists rather than a memo written before the review, which is the same underlying requirement as the AI-in-scope portions of SOC 2 and the higher-risk provisions of the EU AI Act.",
      },
      {
        question: "How should we answer enterprise AI vendor questionnaires?",
        answer:
          "From the same evidence trail the auditor asks for, not from bespoke narrative language written per customer. Once the governance layer generates evidence as a byproduct of the AI systems running, the answers to the procurement questionnaire come out of the same source in a fraction of the time, and stay consistent across customers.",
      },
      {
        question: "Does AI governance need to be a project or can it be a byproduct?",
        answer:
          "A byproduct is the only kind that survives an audit. Governance assembled the week of a review is a snapshot, not a control, and an experienced auditor can tell the difference. The evidence trail has to be generated continuously by the systems in production so it already exists when a regulator, customer, or board asks.",
      },
      {
        question: "How much AI compliance work is needed before the EU AI Act applies?",
        answer:
          "That depends on the use case, because the EU AI Act is risk-tiered. Limited and minimal-risk uses carry light transparency duties; higher-risk uses require documentation, risk management, human oversight, logging, and traceability. The practical move is to classify each AI use early and map it to the obligations that tier actually triggers, so the compliance work is scoped to what applies.",
      },
    ],
  },
];

// Reading time is computed from the actual body, not hand-typed, so it stays
// correct whenever content changes. The `readingMinutes` in the raw data above
// is a seed and is overwritten here. ~220 words per minute.
function estimateReadingMinutes(post: BlogPost): number {
  const text = [
    ...post.sections.flatMap((s) => [...s.paragraphs, ...(s.list ?? [])]),
    ...(post.keyTakeaways ?? []),
    ...(post.outcomes ?? []),
    ...post.qa.flatMap((q) => [q.question, q.answer]),
  ].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const blogPosts: BlogPost[] = rawBlogPosts.map((p) => ({
  ...p,
  readingMinutes: estimateReadingMinutes(p),
}));

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const caseStudyPosts = blogPosts.filter((p) => p.kind === "case-study");
export const articlePosts = blogPosts.filter((p) => p.kind === "article");
