import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: without this Turbopack walks up past the repo and
  // picks up an unrelated lockfile from the user's home directory.
  turbopack: { root: import.meta.dirname },

  async redirects() {
    return [
      // Case studies were consolidated into /blog so one namespace carries the
      // ranking signal. Permanent redirects preserve any existing inbound
      // links and pass authority to the new location.
      { source: "/case-studies", destination: "/blog", permanent: true },
      {
        source: "/case-studies/saas-sales",
        destination: "/blog/saas-inbound-triage-case-study",
        permanent: true,
      },
      {
        source: "/case-studies/agencies",
        destination: "/blog/agency-pipeline-case-study",
        permanent: true,
      },
      {
        source: "/case-studies/smb-market",
        destination: "/blog/small-team-follow-up-case-study",
        permanent: true,
      },
      // The old AI Editing slug became AI Video Creation.
      {
        source: "/offer/ai-editing",
        destination: "/offer/ai-video-creation",
        permanent: true,
      },
      {
        source: "/offer/ai-compliance-office",
        destination: "/offer/ai-compliance-and-governance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
