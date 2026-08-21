import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: without this Turbopack walks up past the repo and
  // picks up an unrelated lockfile from the user's home directory.
  turbopack: { root: import.meta.dirname },

  async redirects() {
    return [
      {
        source: "/offer/ai-compliance-and-governance",
        destination: "/offer/sillage",
        permanent: true,
      },
      {
        source: "/offer/ai-video-creation",
        destination: "/offer",
        permanent: true,
      },
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
      // Retired slugs. Point straight at the live destination rather than
      // chaining through another redirect, which search engines penalize.
      // The video offering was removed from the portfolio; send it to /offer.
      {
        source: "/offer/ai-editing",
        destination: "/offer",
        permanent: true,
      },
      {
        source: "/offer/ai-compliance-office",
        destination: "/offer/sillage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
