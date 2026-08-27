"use client";

import { useEffect } from "react";
import { useDeferredLoad } from "@/lib/useDeferredLoad";

// Microsoft Clarity (behavioral analytics: session recordings, heatmaps,
// scroll/click data). Browser-only SDK, so it is dynamically imported inside an
// effect: it never loads during SSR (no hydration risk) and initializes exactly
// once for the app's lifetime, guarded by a module-level flag against React's
// double-invoked effects in development.
//
// Standard behavioral analytics only. No Clarity.identify(), custom tags,
// custom events, or PII, by design. Independent of the GA4 tag.
//
// PERFORMANCE: the session-replay SDK is heavy, so it is held until the first
// user interaction (or a 5s fallback), never during hydration or the first
// paint. It still captures the session; it just stays out of the LCP window.
const CLARITY_PROJECT_ID = "y8aw2l4ocb";

let started = false;

export function ClarityAnalytics() {
  const ready = useDeferredLoad();

  useEffect(() => {
    if (!ready || started) return;
    started = true;
    import("@microsoft/clarity")
      .then((m) => m.default.init(CLARITY_PROJECT_ID))
      .catch(() => {
        // Analytics must never break the page; swallow load/init failures.
        started = false;
      });
  }, [ready]);

  return null;
}
