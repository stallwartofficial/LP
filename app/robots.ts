import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Explicit allow-list for the AI search and answer-engine crawlers, layered on
// top of the catch-all. Functionally this is the same as `User-agent: * /
// Allow: /` (which still allows every OTHER bot, named or not), but naming the
// engines we care about makes the intent unmistakable and gives us one place to
// tighten later if we ever want to disallow a specific crawler.
//
// User-agent strings are the current documented ones per engine. Grouped by
// operator for readability; robots.txt itself is order-independent.
const AI_CRAWLERS = [
  // Google
  "Googlebot",
  "Google-Extended", // grounds Gemini and AI Overviews
  // Microsoft / Copilot
  "Bingbot",
  // OpenAI
  "OAI-SearchBot", // ChatGPT search results
  "GPTBot", // OpenAI crawler
  "ChatGPT-User", // user-triggered fetch
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Apple
  "Applebot",
  "Applebot-Extended", // Apple Intelligence
  // Other model / answer crawlers
  "Amazonbot",
  "CCBot", // Common Crawl, feeds many open models
  "DuckDuckBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
