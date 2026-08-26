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
//
// PERFORMANCE: the session-replay SDK is heavy, so it is loaded on browser idle
// (after the first paint / LCP), never during hydration. It still captures the
// session; it just stops competing with the critical render on mobile.
const CLARITY_PROJECT_ID = "y8aw2l4ocb";

let started = false;

export function ClarityAnalytics() {
  useEffect(() => {
    if (started) return;
    started = true;

    const load = () => {
      import("@microsoft/clarity")
        .then((m) => m.default.init(CLARITY_PROJECT_ID))
        .catch(() => {
          // Analytics must never break the page; swallow load/init failures.
          started = false;
        });
    };

    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(load, { timeout: 4000 });
    } else {
      setTimeout(load, 3000);
    }
  }, []);

  return null;
}
