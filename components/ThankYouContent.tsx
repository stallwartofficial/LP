"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// The Cal.com booking link, e.g. "stallwart/stallwart-discovery-call". Public by
// nature, so a NEXT_PUBLIC_ env var is correct. Falls back to a plain note if unset.
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || "";

export function ThankYouContent() {
  // Personalization passed via sessionStorage on submit (no PII in the URL).
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  useEffect(() => {
    try {
      setName(sessionStorage.getItem("ty_name") || "");
      setTopic(sessionStorage.getItem("ty_topic") || "");
    } catch {
      // ignore
    }
  }, []);

  // GA4 conversion: this page loads only after a real, successful submission.
  useEffect(() => {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
      "event",
      "generate_lead",
      { method: "contact_form" }
    );
  }, []);

  // Official Cal.com inline embed (responsive + themed), instead of a raw iframe.
  useEffect(() => {
    if (!CAL_LINK) return;
    /* eslint-disable */
    // Standard Cal embed loader.
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal; let ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
          else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    const Cal = (window as any).Cal;
    Cal("init", { origin: "https://cal.com" });
    Cal("inline", { elementOrSelector: "#cal-inline", calLink: CAL_LINK, layout: "month_view" });
    Cal("ui", {
      theme: "dark",
      layout: "month_view",
      hideEventTypeDetails: false,
      cssVarsPerTheme: { dark: { "cal-brand": "#c9a24b" } },
    });
    /* eslint-enable */
  }, []);

  const firstName = name.split(" ")[0];

  return (
    <section className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-28 lg:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <span
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-lg text-[var(--color-ink)]"
        >
          ✓
        </span>

        <h1 className="font-display mt-6 text-display-lg font-light leading-[1.05]">
          Got it{firstName ? ", " : ""}
          {firstName && <span className="text-gold-sheen italic">{firstName}</span>}.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/80">
          Your query{topic ? <> about <span className="text-[var(--fg)]">{topic}</span></> : ""} is
          noted, and someone from our team will get to you shortly.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
          A confirmation is on its way to your inbox.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-[length:var(--text-step-1)] text-[var(--fg)]/70">
          In the meantime, if you would rather talk sooner, grab a time that works for you below.
        </p>

      </div>

      {/* Calendar: fills the width of the page, tall enough to feel primary. */}
      <div className="mx-auto mt-12 max-w-[100rem]">
        {CAL_LINK ? (
          <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]">
            <div id="cal-inline" style={{ width: "100%", height: "80vh", minHeight: 620, overflow: "auto" }} />
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-8 text-center">
            <p className="text-[var(--fg)]/75">
              The booking calendar is being set up. We will reach out by email to
              find a time.
            </p>
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 flex max-w-[100rem] flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <Link href="/offer" className="link-draw text-sm font-medium text-[var(--accent-text)]">
          See what we build
        </Link>
        <Link href="/" className="link-draw text-sm font-medium text-[var(--fg)]/70 hover:text-[var(--fg)]">
          Back home
        </Link>
      </div>
    </section>
  );
}
