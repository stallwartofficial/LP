"use client";

import Script from "next/script";
import { useDeferredLoad } from "@/lib/useDeferredLoad";

// Google Analytics (GA4). Held out of the critical path entirely: the tag is
// only injected after the first user interaction (or a 5s fallback), so it never
// competes with the first paint / LCP. Fires on every page for all visitors
// (owner's decision), independent of the cookie banner.
const GA_ID = "G-332PTXNL6J";

export function GoogleAnalytics() {
  const ready = useDeferredLoad();
  if (!ready) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
