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
    highlight: "Meetings booked, not chased",
    quote:
      "It researches the account, writes the outreach, and follows up on its own. We turned it on and meetings started landing on the calendar without a rep building a single list.",
    role: "VP of Sales",
    industry: "Mid Market SaaS",
    initials: "VS",
    offering: "extrovert-ai",
  },
  {
    highlight: "Research on every account",
    quote:
      "The outreach actually references the company. Reps used to skip the research to hit send. Now it happens on every account, and the reply rate shows it.",
    role: "Head of Growth",
    industry: "B2B Agency",
    initials: "HG",
    offering: "extrovert-ai",
  },
  {
    highlight: "Output without headcount",
    quote:
      "As a five person team we needed pipeline, not more headcount. It runs the whole outbound motion end to end, so we cover the accounts a team three times our size would.",
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
