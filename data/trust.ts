// COMPANY-LEVEL operating commitments. These describe how Stallwart works
// across every offering, not one product's features.
//
// IMPORTANT: `commitments` describes practices, deliberately NOT certifications.
// Do not add "SOC 2 certified", "ISO 27001", "HIPAA compliant" or similar until
// an audit is actually complete, those are legally verifiable claims.
//
// NOTE: the onboarding timeline and integration list that used to live here were
// specific to Extrovert AI's lead pipeline. Integrations moved onto each
// offering in data/offerings.ts; the engagement steps below are written to hold
// for any Stallwart engagement.

export type Commitment = {
  title: string;
  description: string;
};

export const commitments: Commitment[] = [
  {
    title: "Your data stays yours",
    description:
      "We do not sell, share, or train public models on your data. What you bring into a Stallwart system belongs to you and leaves with you.",
  },
  {
    title: "Encrypted in transit and at rest",
    description:
      "All traffic runs over TLS, and stored records are encrypted at rest. Credentials and API keys are held server-side only.",
  },
  {
    title: "Human override, always",
    description:
      "Automation is reviewable and reversible. Every automated action is logged, and anything running can be paused or overridden by your team.",
  },
  {
    title: "Regional data handling",
    description:
      "Built for organisations operating across the US and UAE, with data residency and handling requirements accounted for from the start.",
  },
];

export type EngagementStep = {
  step: string;
  title: string;
  description: string;
};

// How any Stallwart engagement runs, regardless of which offering it involves.
export const engagementSteps: EngagementStep[] = [
  {
    step: "01",
    title: "Understand the work",
    description:
      "We map how the work actually happens inside your business today, where it stalls, who it waits on, and what it costs when it slips.",
  },
  {
    step: "02",
    title: "Scope the system",
    description:
      "We identify which part a system can take over outright, and which part should stay with your team. We won't automate something that shouldn't be.",
  },
  {
    step: "03",
    title: "Build against reality",
    description:
      "The system is built and calibrated on your actual data and edge cases, not a clean sample, so it holds when it meets the real thing.",
  },
  {
    step: "04",
    title: "Hand over the running",
    description:
      "It goes live doing the work unattended. Your team reviews outcomes instead of performing the process.",
  },
];
