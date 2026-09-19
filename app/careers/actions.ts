"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";
import { notifySubmission, type Attachment } from "@/lib/notify";

const RESUME_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const careerSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  linkedin: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default("")
    .refine((v) => v === "" || v.toLowerCase().includes("linkedin.com"), "Enter a linkedin.com link"),
  github: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default("")
    .refine((v) => v === "" || v.toLowerCase().includes("github.com"), "Enter a github.com link"),
  portfolio: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default("")
    .refine((v) => v === "" || /^https?:\/\/|\./.test(v), "Enter a valid link"),
  built: z.string().trim().min(20).max(5000),
  resume: z
    .object({
      filename: z.string().max(200),
      type: z.string().max(120),
      contentBase64: z.string(),
    })
    .optional(),
});

export async function submitCareer(
  raw: unknown
): Promise<{ ok: true } | { error: string }> {
  // Honeypot: silently accept spam (hidden "hp" field filled) without storing.
  const hp = (raw as { hp?: unknown } | null)?.hp;
  if (typeof hp === "string" && hp.trim()) return { ok: true };

  const parsed = careerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }
  const a = parsed.data;

  // Validate the resume server-side (type + size) before doing anything with it.
  let attachments: Attachment[] | undefined;
  if (a.resume && a.resume.contentBase64) {
    if (!RESUME_TYPES.includes(a.resume.type)) {
      return { error: "Resume must be a PDF or Word document." };
    }
    const bytes = Math.floor((a.resume.contentBase64.length * 3) / 4);
    if (bytes > RESUME_MAX_BYTES) {
      return { error: "Resume must be under 5 MB." };
    }
    attachments = [{ filename: a.resume.filename || "resume", content: a.resume.contentBase64 }];
  }

  try {
    const { error } = await supabaseAdmin().from("career_applications").insert({
      name: a.name,
      email: a.email,
      linkedin_url: a.linkedin || null,
      github_url: a.github || null,
      portfolio_url: a.portfolio || null,
      project_description: a.built,
    });
    if (error) {
      console.error("[career] insert:", error.code ?? error.message);
      return { error: "Something went wrong sending your application. Please try again." };
    }
  } catch {
    return { error: "Something went wrong sending your application. Please try again." };
  }

  await notifySubmission({
    kind: "career application",
    subject: `New application: ${a.name}`,
    rows: [
      ["Name", a.name],
      ["Email", a.email],
      ["LinkedIn", a.linkedin || "-"],
      ["GitHub", a.github || "-"],
      ["Portfolio", a.portfolio || "-"],
      ["What they built", a.built],
      ["Resume", attachments ? "attached" : "none"],
    ],
    whatsapp: `New Stallwart application: ${a.name} (${a.email}).`,
    attachments,
    ack: {
      to: a.email,
      name: a.name,
      body: "Thanks for applying to Stallwart. We read every application ourselves and will be in touch if there is a fit.",
    },
  });

  return { ok: true };
}
