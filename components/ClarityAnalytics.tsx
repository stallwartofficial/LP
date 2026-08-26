"use client";

import { useEffect } from "react";

// Microsoft Clarity (behavioral analytics: session recordings, heatmaps,
// scroll/click data). Browser-only SDK, so it is dynamically imported inside an
// effect: it never loads during SSR (no hydration risk) and initializes exactly
// once for the app's lifetime, guarded by a module-level flag against React's
// double-invoked effects in development.
//
// Standard behavioral analytics only. No Clarity.identify(), custom tags,
// custom events, or PII, by design. Independent of the GA4 tag.
const CLARITY_PROJECT_ID = "y8aw2l4ocb";

let started = false;

export function ClarityAnalytics() {
  useEffect(() => {
    if (started) return;
    started = true;
    import("@microsoft/clarity")
      .then((m) => m.default.init(CLARITY_PROJECT_ID))
      .catch(() => {
        // Analytics must never break the page; swallow load/init failures.
        started = false;
      });
  }, []);

  return null;
}
