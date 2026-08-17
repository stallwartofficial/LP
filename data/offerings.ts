export type Offering = {
  id: string;
  title: string;
  description: string;
  eyebrow: string;
};

export const offerings: Offering[] = [
  {
    id: "capture",
    eyebrow: "Step one",
    title: "Lead Capture",
    description:
      "Every inbound signal — form fill, email reply, site visit, referral — is caught automatically and routed into a single pipeline. Nothing sits in an inbox waiting to be noticed.",
  },
  {
    id: "score",
    eyebrow: "Step two",
    title: "Automatic Scoring",
    description:
      "Extrovert AI ranks every lead by real buying signals, not gut feel — so your team spends time on the 20% that actually convert, not the 80% that never will.",
  },
  {
    id: "followup",
    eyebrow: "Step three",
    title: "Auto Follow-Up",
    description:
      "No lead goes cold from human bandwidth. Follow-ups fire on the right cadence, in the right tone, without a rep having to remember to send them.",
  },
  {
    id: "outreach",
    eyebrow: "Step four",
    title: "Automated Outreach & Re-Engagement",
    description:
      "Cold leads get re-approached on autopilot with context-aware messaging — turning old pipeline into new pipeline without new headcount.",
  },
];
