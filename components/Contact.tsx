"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { submitLead } from "@/app/contact/actions";
import { PhoneField } from "@/components/PhoneField";
import { ProofBadge } from "@/components/ProofBadge";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-xl border border-[var(--hairline-strong)] bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-[var(--placeholder-fg)] focus:border-[var(--accent)]";
const labelClass = "block text-sm font-medium text-[var(--fg)]/85";

const INTERESTS = [
  "AI Agents & Automation",
  "AI + SaaS Products",
  "AI Infrastructure & RAG",
  "Custom AI Systems",
  "Not sure yet",
];

// Three short steps convert better than one long form: each screen asks for one
// coherent group, so the reader is never staring at a wall of fields.
const STEPS = [
  { id: "you", title: "You", required: ["name", "email", "phone"] as const },
  { id: "company", title: "Company", required: ["company"] as const },
  { id: "problem", title: "The problem", required: [] as const },
] as const;

type FormShape = {
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  interest: string;
  message: string;
};

const EMPTY: FormShape = {
  name: "",
  email: "",
  phone: "",
  company: "",
  teamSize: "",
  interest: "",
  message: "",
};


// Contact page. Left column carries the argument, what-to-expect, and the proof
// (so none of it hangs unseen); right column holds the multi-step form.
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormShape>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [pagePath, setPagePath] = useState("");
  const [hp, setHp] = useState(""); // honeypot; stays empty for real users
  const [sid, setSid] = useState(""); // client draft id for partial capture

  // A stable draft id per visit, generated on the client only.
  useEffect(() => {
    setSid(
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + Math.random().toString(36).slice(2)
    );
  }, []);

  // Save whatever they have entered, surviving tab-close via sendBeacon. Skips
  // if nothing identifying is filled or the honeypot is set (bot).
  const saveDraft = useCallback(() => {
    if (!sid || hp) return;
    if (!data.name && !data.email && !data.company && !data.message) return;
    try {
      const body = JSON.stringify({ sid, ...data, utm, page: pagePath });
      navigator.sendBeacon?.("/api/lead-draft", new Blob([body], { type: "application/json" }));
    } catch {
      // best-effort
    }
  }, [sid, hp, data, utm, pagePath]);

  // Capture on step change and when the tab is hidden or the page is left.
  useEffect(() => {
    saveDraft();
  }, [step, saveDraft]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") saveDraft();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", saveDraft);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", saveDraft);
    };
  }, [saveDraft]);

  // Capture UTM attribution from the URL once, client-side (avoids the
  // useSearchParams Suspense requirement). Only utm_* keys are kept.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      params.forEach((v, k) => {
        if (k.toLowerCase().startsWith("utm_")) found[k] = v;
      });
      setUtm(found);
      setPagePath(window.location.pathname + window.location.search);
    } catch {
      /* no-op */
    }
  }, []);

  const set = (k: keyof FormShape, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const phoneOk = /^[+()\d][\d\s()-]{6,}$/.test(data.phone.trim());
  const stepValid = STEPS[step].required.every((k) =>
    k === "email" ? emailOk : k === "phone" ? phoneOk : data[k].trim().length > 0
  );

  const isLast = step === STEPS.length - 1;

  async function submit() {
    setStatus("loading");
    setError(null);
    try {
      // On success the action calls redirect() to /contact/thank-you, so it does
      // not return; a returned value means a validation error to surface.
      // Stash name + topic for the thank-you page (avoids PII in the URL).
      try {
        sessionStorage.setItem("ty_name", data.name.trim());
        sessionStorage.setItem("ty_topic", (data.interest || data.message).trim());
      } catch {
        // ignore
      }
      const res = await submitLead({ ...data, hp, sid, utm, page: pagePath });
      if (res?.error) {
        setError(res.error);
        setStatus("error");
      }
    } catch (err) {
      // Let Next handle its own redirect control-flow signal; surface anything
      // else as a normal error.
      if (
        err &&
        typeof err === "object" &&
        "digest" in err &&
        String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
      ) {
        throw err;
      }
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepValid) {
      setTouched(true);
      return;
    }
    if (isLast) {
      submit();
    } else {
      setTouched(false);
      setStep((s) => s + 1);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-[var(--space-gutter)] pb-[var(--space-section)] pt-36 lg:pt-44"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)]">
        {/* ---------------- Left: argument + proof + expectations ---------------- */}
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
            <p className="eyebrow">Get in touch</p>
          </div>

          <h1 id="contact-heading" className="font-display mt-6 text-display-lg font-light leading-[1.03]">
            Tell us what keeps
            <br />
            <span className="text-gold-sheen italic">falling through.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[length:var(--text-step-1)] text-[var(--fg)]/75">
            Have something in your business you think AI could fix? Tell us about it.
            We&apos;ll tell you straight if we can build it, what it would take, and
            whether it&apos;s even worth doing.
          </p>

          {/* Proof: shared badge (same on the homepage). */}
          <div className="mt-8 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
            <ProofBadge />
          </div>
        </div>

        {/* What to expect + direct: on mobile this sits BELOW the form (heading +
            proof, then the form, then this); on desktop it is the left column,
            row 2, under the heading. */}
        <div className="order-3 lg:col-start-1 lg:row-start-2">
          {/* What to expect */}
          <div className="lg:mt-0">
            <p className="eyebrow">What to expect</p>
            <ul className="mt-5 space-y-4">
              {[
                "One reply from a real person, not a drip sequence.",
                "A conversation about the actual problem, not a canned pitch.",
                "A scoped, honest recommendation, including if off-the-shelf already solves it.",
                "Someone who can answer technical questions on the spot, not route them.",
              ].map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-text)]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/75">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {site.contact.email && (
            <div className="rule-t mt-10 hidden pt-8 lg:block">
              <p className="eyebrow">Direct</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="link-draw mt-4 inline-block text-sm text-[var(--fg)]/75 hover:text-[var(--fg)]"
              >
                {site.contact.email}
              </a>
            </div>
          )}
        </div>

        {/* ---------------- Right: the multi-step form ---------------- */}
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-32 lg:self-start">
          {status === "success" ? (
            <div role="status" className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface)] p-8">
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--color-ink)]">
                ✓
              </span>
              <p className="font-display mt-5 text-[length:var(--text-step-2)]">Got it.</p>
              <p className="mt-3 text-[var(--fg)]/70">
                We&apos;ll be in touch shortly to find a time.
              </p>
              <Link href="/offer" className="link-draw mt-6 inline-block text-sm font-medium text-[var(--accent-text)]">
                Meanwhile, see what we build
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-8">
              {/* Honeypot: hidden from humans, tempting to bots. */}
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              {/* Progress */}
              <div className="mb-7 flex items-center gap-3">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex flex-1 flex-col gap-2">
                    <span
                      className={`h-1 rounded-full transition-colors duration-300 ${
                        i <= step ? "bg-[var(--accent)]" : "bg-[var(--hairline-strong)]"
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                        i === step ? "text-[var(--accent-text)]" : "text-[var(--fg)]/45"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} {s.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {step === 0 && (
                  <>
                    <div>
                      <label htmlFor="name" className={labelClass}>Name</label>
                      <input id="name" type="text" autoComplete="name" placeholder="Jordan Mehta" value={data.name} onChange={(e) => set("name", e.target.value)} className={`field ${fieldClass}`} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Work email</label>
                      <input id="email" type="email" autoComplete="email" placeholder="jordan@company.com" value={data.email} onChange={(e) => set("email", e.target.value)} className={`field ${fieldClass}`} />
                      {touched && data.email.length > 0 && !emailOk && (
                        <p className="mt-2 text-xs text-red-500">Enter a valid email address.</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone</label>
                      <div className="mt-2">
                        <PhoneField
                          value={data.phone}
                          onChange={(v) => set("phone", v)}
                          invalid={touched && data.phone.length > 0 && !phoneOk}
                        />
                      </div>
                      {touched && data.phone.length > 0 && !phoneOk && (
                        <p className="mt-2 text-xs text-red-500">Enter a valid phone number.</p>
                      )}
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div>
                      <label htmlFor="company" className={labelClass}>Company</label>
                      <input id="company" type="text" autoComplete="organization" placeholder="Company name" value={data.company} onChange={(e) => set("company", e.target.value)} className={`field ${fieldClass}`} />
                    </div>
                    <div>
                      <label htmlFor="teamSize" className={labelClass}>Team size <span className="font-normal text-[var(--fg)]/60">(optional)</span></label>
                      <select id="teamSize" value={data.teamSize} onChange={(e) => set("teamSize", e.target.value)} className={`field ${fieldClass}`}>
                        <option value="">Select…</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="200+">200+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="interest" className={labelClass}>What are you interested in? <span className="font-normal text-[var(--fg)]/60">(optional)</span></label>
                      <select id="interest" value={data.interest} onChange={(e) => set("interest", e.target.value)} className={`field ${fieldClass}`}>
                        <option value="">Select…</option>
                        {INTERESTS.map((label) => (
                          <option key={label} value={label}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div>
                    <label htmlFor="message" className={labelClass}>What keeps falling through? <span className="font-normal text-[var(--fg)]/60">(optional)</span></label>
                    <textarea id="message" rows={6} placeholder="The process that only works because someone remembers it…" value={data.message} onChange={(e) => set("message", e.target.value)} className={`field ${fieldClass}`} />
                    <p className="mt-3 text-sm text-[var(--fg)]/60">
                      Reviewing for {data.name || "you"}{data.company ? ` at ${data.company}` : ""}. One reply from a person, no drip sequence.
                    </p>
                  </div>
                )}
              </div>

              {status === "error" && (
                <p role="alert" className="mt-5 rounded-xl border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400">
                  {error ?? "Something went wrong."}
                </p>
              )}

              {/* Controls */}
              <div className="mt-7 flex items-center gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => { setTouched(false); setStep((s) => s - 1); }}
                    className="rounded-full border border-[var(--hairline-strong)] px-5 py-3.5 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex-1 overflow-hidden rounded-full bg-[var(--fg)] px-7 py-3.5 text-sm font-medium text-[var(--bg)] disabled:opacity-60"
                >
                  <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                  <span className="relative transition-colors group-hover:text-[var(--color-ink)]">
                    {status === "loading" ? "Sending…" : isLast ? site.cta.primary : "Continue"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
