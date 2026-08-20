export type Testimonial = {
  quote: string;
  role: string;
  industry: string;
  /** Initials for the card avatar. Role based, not a real person. */
  initials: string;
  /** The single sharpest phrase in the quote, pulled out as the card headline. */
  highlight: string;
  /** Which offering the quote concerns, so a company page never implies one product. */
  offering: string;
};

// NOTE: illustrative, role and industry attributed. NOT real named companies,
// and NOT fabricated named companies. Swap for real customer testimonials once
// they exist and are approved for use (see CLAUDE_CODE_INSTRUCTIONS.md #7).
export const testimonials: Testimonial[] = [
  {
    highlight: "Reps closing, not chasing",
    quote:
      "We stopped losing leads to slow follow up the week we turned it on. The queue reviews itself now, so the team spends its day in conversations instead of assembling a list.",
    role: "VP of Sales",
    industry: "Mid Market SaaS",
    initials: "VS",
    offering: "extrovert-ai",
  },
  {
    highlight: "Scoring paid for itself",
    quote:
      "Scoring alone justified the whole thing. We finally know which leads are worth a call before we make it, which changed how we staff the week.",
    role: "Head of Growth",
    industry: "B2B Agency",
    initials: "HG",
    offering: "extrovert-ai",
  },
  {
    highlight: "Leverage without headcount",
    quote:
      "As a five person team we needed output, not more people. This gave us the follow up persistence of a company three times our size.",
    role: "Founder",
    industry: "SMB Software",
    initials: "F",
    offering: "extrovert-ai",
  },
];

// Sectors we build for, not invented client logos. Naming fictional companies
// under "our customers" reads as fabricated proof; naming the kinds of teams we
// serve is honest and still fills the trust bar. Swap for real customer logos
// (with permission) once they exist.
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
