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
      // Phase 1A: force the www canonical. Any request to the apex host
      // (stallwart.in) 301s to the www host, so search engines consolidate all
      // signal on one origin instead of splitting it across apex + www.
      {
        source: "/:path*",
        has: [{ type: "host", value: "stallwart.in" }],
        destination: "https://www.stallwart.in/:path*",
        permanent: true,
      },
      // Products (Extrovert AI, Sillage) were removed from the site during the
      // AI-first repositioning; they now appear only in the footer family line.
      // Their old detail URLs fold into the capability overview.
      { source: "/offer/extrovert-ai", destination: "/offer", permanent: true },
      { source: "/offer/sillage", destination: "/offer", permanent: true },
      {
        source: "/offer/ai-compliance-and-governance",
        destination: "/offer",
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
      // Phase 1C: this SDR/outbound-era orphan still shows in GSC but is not in
      // the blog index. It folds into the blog index under the new positioning.
      {
        source: "/blog/speed-to-lead-is-the-whole-funnel",
        destination: "/blog",
        permanent: true,
      },
      // Phase 2: product-specific / cannibalising SDR + cost posts fold into
      // their evergreen equivalents. (The SDR post may be reslugged in a later
      // reframing pass; these will chain through it at that point.)
      {
        source: "/blog/what-is-an-ai-sdr",
        destination: "/blog/ai-sdr-vs-human-sdr-when-each-wins",
        permanent: true,
      },
      {
        source: "/blog/how-much-does-an-ai-sdr-cost",
        destination: "/blog/how-much-does-custom-ai-development-cost",
        permanent: true,
      },
      {
        source: "/blog/ai-gtm-engine-autonomous-outbound",
        destination: "/blog/ai-sdr-vs-human-sdr-when-each-wins",
        permanent: true,
      },
      {
        source: "/blog/what-custom-ai-development-costs-fixed-price-per-phase",
        destination: "/blog/how-much-does-custom-ai-development-cost",
        permanent: true,
      },
      // Phase 3: marketer-focused SEO/AEO/GEO posts retired (deleted + 301).
      // They targeted marketers, not AI-engineering buyers, and diluted
      // positioning. Zero clicks / zero impressions, so no equity is lost.
      { source: "/blog/aeo-vs-seo-vs-geo", destination: "/blog", permanent: true },
      { source: "/blog/geo-checklist-get-cited-by-ai-answers", destination: "/blog", permanent: true },
      { source: "/blog/ai-seo-what-changed-in-2026", destination: "/blog", permanent: true },
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
        // Point straight at /offer, not /offer/sillage, to avoid a redirect
        // chain (sillage itself redirects to /offer).
        source: "/offer/ai-compliance-office",
        destination: "/offer",
        permanent: true,
      },
      // Agent-discoverable conventional URLs. Autonomous agents probe these
      // standard paths before reading nav links. Without redirects every one
      // 404s, wasting crawl budget and lowering confidence. Each points at the
      // real page that holds the content the agent is looking for.
      { source: "/about", destination: "/story", permanent: true },
      { source: "/team", destination: "/story", permanent: true },
      { source: "/services", destination: "/offer", permanent: true },
      { source: "/solutions", destination: "/offer", permanent: true },
      { source: "/products", destination: "/offer", permanent: true },
      { source: "/capabilities", destination: "/offer", permanent: true },
      { source: "/pricing", destination: "/how-it-works", permanent: true },
      { source: "/process", destination: "/how-it-works", permanent: true },
      { source: "/engagement", destination: "/how-it-works", permanent: true },
      { source: "/getting-started", destination: "/how-it-works", permanent: true },
      { source: "/start", destination: "/how-it-works", permanent: true },
      { source: "/integration", destination: "/how-it-works", permanent: true },
      { source: "/how-to-work-with-us", destination: "/how-it-works", permanent: true },
      { source: "/work-with-us", destination: "/contact", permanent: true },
      { source: "/docs", destination: "/guides", permanent: true },
      { source: "/portfolio", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
