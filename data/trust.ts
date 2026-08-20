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
      "We do not sell or share your data, and we do not train shared or public models on it. What you bring into a Stallwart system stays yours and leaves with you.",
  },
  {
    title: "Encrypted in transit and at rest",
    description:
      "TLS 1.2 or higher in transit, AES-256 at rest. Credentials and keys are held server side only and are never shipped to the browser.",
  },
  {
    title: "Human override, always",
    description:
      "Every automated action is logged and reversible. Any running system can be paused or overridden by your team, and the audit trail exports on request.",
  },
  {
    title: "Regional data handling",
    description:
      "Data resident in the region you choose, with processing kept to the jurisdictions you approve. A current sub-processor list is available on request.",
  },
];


/**
 * THE QUESTIONS EVERY BUYER ASKS AND THE SITE PREVIOUSLY DID NOT ANSWER.
 *
 * Cost, duration, and ownership were absent everywhere, so no visitor could
 * self qualify and the only path forward was to book a call and hope.
 *
 * These state a POSTURE rather than a number. A posture is honest pre-launch and
 * still lets a buyer decide whether to start a conversation; a fabricated price
 * would be neither.
 */
export const engagementTerms = [
  {
    question: "What it costs",
    answer:
      "Fixed price per phase, approved before work starts. Not billed hourly, so the estimate is our risk rather than yours. Scope sets the figure, which is why the first conversation is about the problem instead of a rate card.",
  },
  {
    question: "How long it takes",
    answer:
      "Scoping and technical design run in weeks, not months, and produce a written architecture you can take elsewhere. We commit to a build date at the end of design rather than guessing before it.",
  },
  {
    question: "What you own",
    answer:
      "Everything. Source, infrastructure as code, runbooks, documentation. We do not retain licenses to work you paid for, and we do not build in dependencies on us.",
  },
  {
    question: "When we say NO",
    answer:
      "When off the shelf software already solves it, when the data to make it work does not exist yet, or when the spend cannot be justified. We would rather lose the engagement than ship something you regret.",
  },
] as const;
