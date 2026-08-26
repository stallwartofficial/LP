import Script from "next/script";

// Google Analytics (GA4), loaded via next/script with the afterInteractive
// strategy so it never blocks the critical path. Fires on every page for all
// visitors (owner's decision), independent of the cookie banner.
const GA_ID = "G-332PTXNL6J";

export function GoogleAnalytics() {
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
