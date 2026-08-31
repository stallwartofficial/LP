"use client";

import { useState } from "react";

// The application card. It lives in the hero, on the right, as the page's main
// action. Builders over résumés: the "what you built" field is the one that
// matters, with links around it.
//
// On submit it inserts one row into public.career_applications via the browser
// Supabase client (anon key). RLS allows anon INSERT only, so the key is safe to
// ship; created_at and status ('new') are set by the table defaults.

type Field = "name" | "email" | "built";

export function CareersForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    github: "",
    built: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) next.name = "Your name, so we know who we're talking to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "An email we can actually reach you at.";
    if (form.built.trim().length < 20)
      next.built = "A couple of sentences is plenty. Tell us the real thing.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Guard against double-clicks / a second submit while one is in flight.
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      // Load the Supabase client on demand so supabase-js stays out of the
      // page's initial JS bundle.
      const { supabaseBrowser } = await import("@/lib/supabase/client");
      const { error } = await supabaseBrowser()
        .from("career_applications")
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          linkedin_url: form.linkedin.trim() || null,
          github_url: form.github.trim() || null,
          project_description: form.built.trim(),
        });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      // Log the real error for debugging; never surface DB internals to the user.
      console.error("Career application submit failed:", err);
      setSubmitError(
        "Something went wrong sending your application. Please try again in a moment."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-8 text-center sm:p-10">
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent-text)]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-display mt-6 text-display-sm font-light">
          Thanks, {form.name.split(" ")[0] || "friend"}.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)]/70">
          It&apos;s in front of a person now, not a keyword scanner. We read
          every one, so give us a little time. You&apos;ll hear back either way.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: "", email: "", linkedin: "", github: "", built: "" });
            setErrors({});
            setSubmitError(null);
            setSent(false);
          }}
          className="link-draw mt-6 text-sm font-medium text-[var(--accent-text)]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] sm:p-8"
    >
      <p className="eyebrow">Apply now</p>
      <p className="mt-2 text-sm text-[var(--fg)]/60">
        Two minutes, and a real person reads it.
      </p>

      <div className="mt-6 space-y-5">
        <Text
          label="Your name"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Text
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Text
            label="LinkedIn"
            optional
            value={form.linkedin}
            onChange={set("linkedin")}
            placeholder="linkedin.com/in/…"
          />
          <Text
            label="GitHub"
            optional
            value={form.github}
            onChange={set("github")}
            placeholder="github.com/…"
          />
        </div>

        {/* The field that actually matters. */}
        <div>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg)]/60">
              Something you built, shipped, or are proud of
            </span>
            <textarea
              value={form.built}
              onChange={(e) => set("built")(e.target.value)}
              rows={4}
              placeholder="What was it, and why are you proud of it? It doesn't have to be code. In your own words."
              className={`mt-2 w-full resize-y rounded-2xl border bg-[var(--bg)] px-4 py-3 text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg)]/35 focus:border-[var(--accent)] ${
                errors.built ? "border-red-500/60" : "border-[var(--hairline-strong)]"
              }`}
            />
          </label>
          {errors.built && (
            <p className="mt-1.5 text-xs text-red-500/90">{errors.built}</p>
          )}
        </div>
      </div>

      {submitError && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-wipe mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--fg)] px-8 py-4 text-sm font-medium text-[var(--bg)] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Apply now"}
        {!submitting && <span aria-hidden="true">→</span>}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-[var(--fg)]/55">
        We read every one. You&apos;ll hear back from a person, not an
        autoresponder.
      </p>
    </form>
  );
}

function Text({
  label,
  value,
  onChange,
  error,
  type = "text",
  optional = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg)]/60">
          {label}
          {optional && (
            <span className="normal-case tracking-normal text-[var(--fg)]/40">
              {" "}
              (optional)
            </span>
          )}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`mt-2 w-full rounded-2xl border bg-[var(--bg)] px-4 py-3 text-[length:var(--text-step-0)] text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg)]/35 focus:border-[var(--accent)] ${
            error ? "border-red-500/60" : "border-[var(--hairline-strong)]"
          }`}
        />
      </label>
      {error && <p className="mt-1.5 text-xs text-red-500/90">{error}</p>}
    </div>
  );
}
