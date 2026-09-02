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
      "I've hired plenty of people to build websites. Stallwart is the first team that treated 'done' as a starting point. Every issue I raised after launch was fixed the next week, no pushback.",
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
    highlight: "Smaller site, ten times the work",
    quote:
      "I wanted seven pages. They talked me down to four. I thought I needed a founder photo and a mission section. They convinced me to cut both. The site is smaller than I would have built and it works ten times harder.",
    group: "building",
  },
  // ---- Narrative arc: frustration -> conviction ----
  {
    name: "Rashmi",
    role: "Founder",
    company: "Trendieviera Academy",
    highlight: "They refused to start too early",
    quote:
      "For the first two weeks I thought I was paying them to not build. They kept asking who the academy is for, what it stands for, why now. Frustrating at the time. Then the build started and everything moved fast because we'd already answered the hard questions.",
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
    highlight: "Quiet, so the work speaks",
    quote:
      "In architecture, the drawings do the work. A loud website gets in the way. Stallwart understood that without me having to say it. The result is quiet, and it makes the projects look bigger than the site does.",
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
    highlight: "Helped me think",
    quote:
      "They didn't try to sound smart. They helped me think. I've spent a lot of money on consultants who did the opposite.",
    group: "thinking",
  },
  // ---- Brand voice, closer ----
  {
    name: "Jeevitha",
    role: "Founder",
    company: "House Of Nirangal",
    highlight: "The feed finally sounds like us",
    quote:
      "We used to post whatever was on the calendar. Stallwart made us start with the brand, what Nirangal actually stands for, and only then figure out the content. Now the feed sounds like us. It didn't before.",
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
