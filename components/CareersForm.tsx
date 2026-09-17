"use client";

import { useState } from "react";

// The application card. It lives in the hero, on the right, as the page's main
// action. Builders over résumés: the "what you built" field is the one that
// matters, with links around it.
//
// On submit it inserts one row into public.career_applications via the browser
// Supabase client (anon key). RLS allows anon INSERT only, so the key is safe to
// ship; created_at and status ('new') are set by the table defaults.

type Field = "name" | "email" | "built" | "linkedin" | "github" | "portfolio" | "resume";

const RESUME_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function CareersForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    github: "",
    portfolio: "",
    built: "",
  });
  const [resume, setResume] = useState<File | null>(null);
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
    if (form.linkedin.trim() && !form.linkedin.toLowerCase().includes("linkedin.com"))
      next.linkedin = "That's not a linkedin.com link.";
    if (form.github.trim() && !form.github.toLowerCase().includes("github.com"))
      next.github = "That's not a github.com link.";
    if (form.portfolio.trim() && !/^https?:\/\/|\./.test(form.portfolio.trim()))
      next.portfolio = "Paste a full link (with a dot in it).";
    if (resume) {
      if (!RESUME_TYPES.includes(resume.type)) next.resume = "PDF or Word doc only.";
      else if (resume.size > RESUME_MAX_BYTES) next.resume = "Keep it under 5 MB.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result);
        resolve(result.slice(result.indexOf(",") + 1)); // strip data: prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Guard against double-clicks / a second submit while one is in flight.
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      // Server Action: inserts server-side and notifies the team (email +
      // WhatsApp). Keeps the anon key and supabase-js out of the browser bundle.
      const { submitCareer } = await import("@/app/careers/actions");
      const resumePayload = resume
        ? {
            filename: resume.name,
            type: resume.type,
            contentBase64: await fileToBase64(resume),
          }
        : undefined;
      const res = await submitCareer({
        name: form.name.trim(),
        email: form.email.trim(),
        linkedin: form.linkedin.trim(),
        github: form.github.trim(),
        portfolio: form.portfolio.trim(),
        built: form.built.trim(),
        resume: resumePayload,
      });
      if ("error" in res) {
        setSubmitError(res.error);
      } else {
        setSent(true);
      }
    } catch (err) {
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
            setForm({ name: "", email: "", linkedin: "", github: "", portfolio: "", built: "" });
            setResume(null);
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
      <p className="mt-2 text-sm text-[var(--fg)]/72">
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

        <div className="grid gap-5 sm:grid-cols-3">
          <Text
            label="LinkedIn"
            optional
            value={form.linkedin}
            onChange={set("linkedin")}
            error={errors.linkedin}
            placeholder="linkedin.com/in/…"
          />
          <Text
            label="GitHub"
            optional
            value={form.github}
            onChange={set("github")}
            error={errors.github}
            placeholder="github.com/…"
          />
          <Text
            label="Portfolio"
            optional
            value={form.portfolio}
            onChange={set("portfolio")}
            error={errors.portfolio}
            placeholder="your-work.com"
          />
        </div>

        {/* The field that actually matters: big on purpose. */}
        <div>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg)]/72">
              Something you built, shipped, or are proud of
            </span>
            <span className="mt-1 block text-xs text-[var(--fg)]/50">
              Take your time here, this is the part we actually read. What was it,
              what was hard, and what did you do about it? It doesn&apos;t have to
              be code.
            </span>
            <textarea
              value={form.built}
              onChange={(e) => set("built")(e.target.value)}
              rows={8}
              placeholder="In your own words. A few real paragraphs beat a résumé bullet."
              className={`mt-2 min-h-[240px] w-full resize-y rounded-2xl border bg-[var(--bg)] px-4 py-3 text-[length:var(--text-step-0)] leading-relaxed text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--placeholder-fg)] focus:border-[var(--accent)] ${
                errors.built ? "border-red-500/60" : "border-[var(--hairline-strong)]"
              }`}
            />
          </label>
          {errors.built && (
            <p className="mt-1.5 text-xs text-red-500/90">{errors.built}</p>
          )}
        </div>

        {/* Resume / any attachment */}
        <div>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg)]/72">
              Resume
              <span className="normal-case tracking-normal text-[var(--fg)]/40">
                {" "}
                (optional, or a portfolio, a case study, a napkin sketch, whatever makes your case)
              </span>
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => {
                setResume(e.target.files?.[0] ?? null);
                setErrors((x) => ({ ...x, resume: undefined }));
              }}
              className={`mt-2 w-full rounded-2xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)]/80 outline-none transition-colors file:mr-4 file:rounded-full file:border-0 file:bg-[var(--accent)] file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-[var(--color-ink)] hover:file:brightness-110 focus:border-[var(--accent)] ${
                errors.resume ? "border-red-500/60" : "border-[var(--hairline-strong)]"
              }`}
            />
          </label>
          <p className="mt-1.5 text-xs text-[var(--fg)]/45">
            PDF or Word, up to 5 MB.
          </p>
          {errors.resume && (
            <p className="mt-1 text-xs text-red-500/90">{errors.resume}</p>
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
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-[var(--fg)]/72">
        We read every application, every journey. You&apos;ll hear back from us,
        always.
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
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg)]/72">
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
          className={`mt-2 w-full rounded-2xl border bg-[var(--bg)] px-4 py-3 text-[length:var(--text-step-0)] text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--placeholder-fg)] focus:border-[var(--accent)] ${
            error ? "border-red-500/60" : "border-[var(--hairline-strong)]"
          }`}
        />
      </label>
      {error && <p className="mt-1.5 text-xs text-red-500/90">{error}</p>}
    </div>
  );
}
