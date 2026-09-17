"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/leadSchema";
import { notifySubmission } from "@/lib/notify";

// Contact lead Server Action. Re-validates (untrusted entry point), inserts into
// the existing public.inquiries table via the server-only Supabase client, sends
// the acknowledgment + team notification + WhatsApp, then redirects to the
// thank-you page. Notifications are best-effort and never block the redirect.
export async function submitLead(
  raw: unknown
): Promise<{ error: string } | void> {
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return { error: "Please check the form and try again." };
  const lead = parsed.data;

  // 1. Persist to public.inquiries (message -> pain_point; utm/source added).
  try {
    const { error } = await supabaseAdmin().from("inquiries").insert({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      team_size: lead.teamSize || null,
      interest: lead.interest || null,
      pain_point: lead.message || null,
      utm: lead.utm,
      source_page: lead.page || null,
    });
    if (error) console.error("[lead] inquiries insert:", error.code ?? error.message);
  } catch {
    console.error("[lead] supabase client error");
  }

  // 2. Notify (ack to customer, email + WhatsApp to the team).
  await notifySubmission({
    kind: "lead",
    subject: `New lead: ${lead.company}`,
    rows: [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Company", lead.company],
      ["Team size", lead.teamSize || "-"],
      ["Interest", lead.interest || "-"],
      ["Message", lead.message || "-"],
      ["Source", lead.page || "-"],
      ["UTM", Object.entries(lead.utm || {}).map(([k, v]) => `${k}=${v}`).join(", ") || "-"],
    ],
    whatsapp: `New Stallwart lead: ${lead.name} (${lead.company}) ${lead.email}. Interest: ${lead.interest || "n/a"}.`,
    ack: {
      to: lead.email,
      name: lead.name,
      body: "Thanks for reaching out to Stallwart. We have your note and a real person will reply shortly to find a time. You can also book a slot on the thank-you page you just saw.",
    },
  });

  redirect("/contact/thank-you");
}
