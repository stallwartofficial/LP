export type Testimonial = {
  /** Real reviewer name. All quotes below are from real clients, rewritten and
   *  approved for use. */
  name: string;
  role: string;
  company: string;
  quote: string;
  /** The single sharpest phrase in the quote, pulled out as the card headline. */
  highlight: string;
  /** Group tag: kept for future filtering, not surfaced in the UI. */
  group: "thinking" | "building" | "standing";
};

// Real client testimonials. Ordered by IMPACT-FIRST: the top of the list opens
// the section on desktop (first marquee row) and mobile (start of the swipe).
// Order prioritises specifics — a moment, a number, a decision that got named —
// so a skeptic hits the strongest quotes first.
export const testimonials: Testimonial[] = [
  // ---- Impact opener: specific technical reframe, hints at range ----
  {
    name: "Sukanthen",
    role: "Data Scientist",
    company: "NautilusPrinciple",
    highlight: "The questions changed the problem",
    quote:
      "We had a pipeline problem we thought was about scale. Stallwart kept asking why it needed to be real-time. Two calls in, we realized half the pipeline didn't need to exist. That was worth the entire engagement.",
    group: "thinking",
  },
  // ---- Authority + ownership: US CEO, post-launch reliability ----
  {
    name: "Ken Morford",
    role: "Founder & CEO",
    company: "Morford Digital Marketing & Consulting",
    highlight: "'Done' was a starting point",
    quote:
      "I've hired plenty of people to build websites. Stallwart is the first team that treated 'done' as a starting point. Every issue I raised after launch was fixed the next week, no pushback, and I own the whole thing outright.",
    group: "standing",
  },
  // ---- Range signal: multi-project + AI work, for technical buyers ----
  {
    name: "Pradeep",
    role: "Director",
    company: "Sofelit Solutions",
    highlight: "Never the same playbook twice",
    quote:
      "Three projects in and Stallwart has never used the same playbook twice. A marketing site got one approach, an internal tool got another, an AI workflow got another again. They design for the problem, not their preferred solution.",
    group: "standing",
  },
  // ---- Concrete decision: named a specific cut ----
  {
    name: "Dharshan",
    role: "Founder",
    company: "Advensify",
    highlight: "Built lean, and built to last",
    quote:
      "They challenged every page like engineers, not decorators. What we shipped is leaner than I would have built, faster, and I own all of it. Nothing about it needs them to keep it running.",
    group: "building",
  },
  // ---- Narrative arc: frustration -> conviction ----
  {
    name: "Rashmi",
    role: "Founder",
    company: "Trendieviera Academy",
    highlight: "Clarity first, then speed",
    quote:
      "The first two weeks were about the questions we'd been putting off: who the academy is for, what it stands for, why now. Once those were answered, the build moved fast, and I knew exactly where we were taking the academy.",
    group: "building",
  },
  // ---- Specific number: '6 issues' ----
  {
    name: "Kaviarasu",
    role: "Founder",
    company: "SucceedEx",
    highlight: "Bug report worth acting on",
    quote:
      "They spent a day using our product like a first-time customer. Found six things we'd stopped seeing because we'd built them. The report was ranked and specific, no 'this could be better'. Every item was actionable.",
    group: "standing",
  },
  // ---- First-call moment ----
  {
    name: "Aditya",
    role: "Founder",
    company: "Tessux Digital",
    highlight: "Not a pitch, a conversation",
    quote:
      "First call, no deck, no proposal. Just questions about what we were building. It was the first agency conversation that actually felt like a conversation.",
    group: "thinking",
  },
  // ---- Craft-focused ----
  {
    name: "Ambrose Dass",
    role: "Founder & Principal Architect",
    company: "AMDA Architects",
    highlight: "Restraint, and it runs itself",
    quote:
      "Most agencies would have pushed something showy and left me depending on them to change it. Stallwart stripped the interface back until the projects carried the page, handed me something fast that I own outright, and walked away. Clients open it and talk about the buildings, not the buttons.",
    group: "building",
  },
  // ---- Warm, plan-shaping ----
  {
    name: "Uma",
    role: "Founder",
    company: "Uma Healthy Lifestyle",
    highlight: "Idea in, plan out",
    quote:
      "I came in with an idea and left with a plan. They walked me through the business, the customer, and the site as one thing, not three separate briefs. First time I felt like I actually knew what I was building.",
    group: "thinking",
  },
  // ---- Short and direct ----
  {
    name: "Arunkumar",
    role: "Founder",
    company: "Medfins International LLP",
    highlight: "Nobody made it about them",
    quote:
      "I've paid a lot of people to sound smart on calls with me. Stallwart just asked questions. Real ones, the kind I'd been quietly avoiding, and then they sat there while I worked through them. No pitch, no next deck. I got off the call and knew what to do.",
    group: "thinking",
  },
  // ---- Brand voice, closer ----
  {
    name: "Jeevitha",
    role: "Founder",
    company: "House Of Nirangal",
    highlight: "A system, not a content calendar",
    quote:
      "We used to post whatever was on the calendar. Stallwart built us a system that starts from what Nirangal stands for and produces the content from there. It runs the same way whether or not I'm watching. The feed finally sounds like us, and it keeps sounding like us.",
    group: "building",
  },
];

// Sectors we build for. Naming fictional companies under "our customers" reads
// as fabricated proof; naming the kinds of teams we serve is honest and still
// fills the trust bar.
export const logoMarks = [
  "SaaS",
  "Fintech",
  "Healthcare",
  "Logistics",
  "Marketplaces",
  "Operations",
  "Agencies",
  "B2B",
];
