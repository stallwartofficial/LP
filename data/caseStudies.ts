export type CaseStudySummary = {
  slug: string;
  industry: string;
  title: string;
  excerpt: string;
};

// v1 ships 3 deep case studies rather than many thin ones (SEO/AEO depth > breadth)
export const caseStudies: CaseStudySummary[] = [
  {
    slug: "saas-sales",
    industry: "SaaS Sales",
    title: "How a mid-market SaaS team cut lead response time to minutes",
    excerpt:
      "An illustrative walkthrough of how automatic scoring and follow-up changes the math for a SaaS sales team drowning in inbound.",
  },
  {
    slug: "agencies",
    industry: "Agencies",
    title: "Turning agency pipeline chaos into a repeatable system",
    excerpt:
      "Agencies juggle client acquisition across many channels at once — here's how autopilot follow-up keeps every thread alive.",
  },
  {
    slug: "smb-market",
    industry: "SMB Market",
    title: "Small team, enterprise-grade follow-up",
    excerpt:
      "How a five-person sales team used automation to compete with teams five times their size, without new hires.",
  },
];
