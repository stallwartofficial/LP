export type Testimonial = {
  quote: string;
  role: string;
  industry: string;
};

// NOTE: Illustrative example outcomes — role/industry-based, not attributed to
// real named companies. Swap for real customer testimonials once available.
export const testimonials: Testimonial[] = [
  {
    quote:
      "We stopped losing leads to slow follow-up the week we turned this on. Our reps now spend their time closing, not chasing.",
    role: "VP of Sales",
    industry: "Mid-Market SaaS",
  },
  {
    quote:
      "Scoring alone paid for itself — we finally know which leads are worth a call before we make it.",
    role: "Head of Growth",
    industry: "B2B Agency",
  },
  {
    quote:
      "As a five-person sales team, we needed leverage, not more headcount. This gave us both.",
    role: "Founder",
    industry: "SMB Software",
  },
];

// Placeholder marks for the logo marquee — generic geometric marks until
// real customer logos are available.
export const logoMarks = [
  "NORTHPEAK", "VERALIS", "ORBITAL", "CASTWELL", "MERIDIAN",
  "HALCYON", "FORGEWORKS", "ATLASBAY",
];
