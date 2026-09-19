"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/leadSchema";
import { notifySubmission } from "@/lib/notify";

// Contact lead Server Action. Re-validates (untrusted entry point), inserts into
// the existing public.inquiries table via the server-only Supabase client, sends
// the acknowledgment + team notification + WhatsApp, then redirects to the
// thank-you page. Notifications are best-effort and never block the redirect.
const CAL_URL = `https://cal.com/${process.env.NEXT_PUBLIC_CAL_LINK || "stallwart/stallwart-discovery-call"}`;

function esc(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Branded acknowledgment to the person who submitted the contact form.
function ackHtml(name: string, about: string): string {
  const topic = about.trim() ? esc(about.trim()) : "what you are looking to build or solve";
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;line-height:1.6;font-size:15px">
  <p>Hi ${esc(name)},</p>
  <p>Thank you for reaching out to Stallwart.</p>
  <p>We have received your message regarding <strong>${topic}</strong>, and we appreciate you taking the time to tell us a little about what you are looking to build or solve.</p>
  <p>Someone from our team will review the details you shared and get back to you shortly. We will look at what you are trying to achieve, understand the context around your requirement, and make sure the right person follows up with you.</p>
  <p>If you would rather not wait and would like to speak with us directly, you can choose a time that works best for you:</p>
  <p style="margin:24px 0">
    <a href="${CAL_URL}" style="display:inline-block;background:#c9a24b;color:#111;text-decoration:none;padding:12px 22px;border-radius:9999px;font-weight:600">Book a quick call with Stallwart →</a>
  </p>
  <p>The call is simply a chance to understand what you have in mind, talk through the problem, and see where we can be useful. You do not need to prepare anything elaborate. If you already have requirements, ideas, documents, technical details, or even a rough description, that is more than enough to get started.</p>
  <p>If you have already booked a time, there is nothing else you need to do. We will see you on the call. Otherwise, sit tight, we have your message and we will take it from here.</p>
  <p>Looking forward to speaking with you.</p>
  <p style="margin-top:24px">Talk soon,<br/>Team Stallwart</p>
</div>`;
}

export async function submitLead(
  raw: unknown
): Promise<{ error: string } | void> {
  // Honeypot: bots fill the hidden "hp" field; humans never see it. Silently
  // accept (redirect as if sent) without persisting or notifying.
  const hp = (raw as { hp?: unknown } | null)?.hp;
  if (typeof hp === "string" && hp.trim()) redirect("/contact/thank-you");

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return { error: "Please check the form and try again." };
  const lead = parsed.data;

  // 1. Persist to public.inquiries (message -> pain_point; utm/source added).
  try {
    const { error } = await supabaseAdmin().from("inquiries").insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      team_size: lead.teamSize || null,
      interest: lead.interest || null,
      pain_point: lead.message || null,
      utm: lead.utm,
      source_page: lead.page || null,
    });
    if (error) console.error("[lead] inquiries insert:", error.code ?? error.message);
    // Completed: remove the partial draft so lead_drafts holds only abandoned ones.
    if (lead.sid) await supabaseAdmin().from("lead_drafts").delete().eq("sid", lead.sid);
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
      ["Phone", lead.phone],
      ["Company", lead.company],
      ["Team size", lead.teamSize || "-"],
      ["Interest", lead.interest || "-"],
      ["Message", lead.message || "-"],
      ["Source", lead.page || "-"],
      ["UTM", Object.entries(lead.utm || {}).map(([k, v]) => `${k}=${v}`).join(", ") || "-"],
    ],
    whatsapp: `New Stallwart lead: ${lead.name} (${lead.company}) ${lead.email} / ${lead.phone}. Interest: ${lead.interest || "n/a"}.`,
    ack: {
      to: lead.email,
      name: lead.name,
      subject: "Stallwart | We got your message. We'll be in touch soon.",
      html: ackHtml(lead.name, lead.interest || lead.message || ""),
    },
  });

  redirect("/contact/thank-you");
}
