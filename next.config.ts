import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: without this Turbopack walks up past the repo and
  // picks up an unrelated lockfile from the user's home directory.
  turbopack: { root: import.meta.dirname },

  // Long-lived immutable cache for static brand images. Their content is
  // versioned by filename (logo-lion.png etc.), so a year of caching is safe
  // and keeps them off the repeat-view critical path.
  async headers() {
    const securityHeaders = [
      // HSTS now asserts includeSubDomains (only apex + www exist, both HTTPS,
      // no wildcard DNS, so it is safe). Preload deliberately omitted: it is
      // hard to reverse. NOTE(owner): if the Vercel dashboard also sets HSTS,
      // remove it there so this is the single source and there is no duplicate.
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      {
        // Report-Only first: this reports violations to the console without
        // blocking, so the allowlist (self + GA + Clarity + inline) can be
        // verified in the wild before switching to an enforced
        // Content-Security-Policy. Tighten 'unsafe-inline' with a nonce later.
        key: "Content-Security-Policy-Report-Only",
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "frame-ancestors 'none'",
          "form-action 'self'",
          "img-src 'self' data: https://*.google-analytics.com https://*.clarity.ms",
          "font-src 'self'",
          "style-src 'self' 'unsafe-inline'",
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms",
          "connect-src 'self' https://*.google-analytics.com https://*.clarity.ms",
        ].join("; "),
      },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

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
        destination: "/blog/saas-outbound-booked-meetings-case-study",
        permanent: true,
      },
      // Two posts were reslugged when Extrovert AI was repositioned from an
      // inbound CRM to an outbound GTM engine. Preserve the old inbound URLs.
      {
        source: "/blog/speed-to-lead-is-the-whole-funnel",
        destination: "/blog/outbound-is-a-research-problem",
        permanent: true,
      },
      {
        source: "/blog/saas-inbound-triage-case-study",
        destination: "/blog/saas-outbound-booked-meetings-case-study",
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
