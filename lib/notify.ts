// Shared notification pipeline for every form (contact, careers, partner).
// Email via Resend REST (no SDK dep), WhatsApp via CallMeBot (a plain HTTPS
// GET). Every function is best-effort and reads its config from env at call
// time, so an unset key skips that channel instead of throwing. Nothing here is
// a secret in the repo.
//
// Env used:
//   RESEND_API_KEY        Resend API key
//   LEAD_FROM_EMAIL       verified-domain sender, e.g. "Stallwart <noreply@stallwart.in>"
//   LEAD_NOTIFY_EMAILS    comma-separated team recipients
//   CALLMEBOT_RECIPIENTS  comma-separated "phone:apikey" pairs (one per person)
//   NTFY_TOPIC            ntfy.sh topic to push to (no spaces), e.g. "Stallwart-leads"
//   NTFY_CAREERS_TOPIC    separate ntfy topic for careers applications; the
//                         careers form passes it as `pushTopic`. Falls back to
//                         NTFY_TOPIC when unset.

type Row = [label: string, value: string];

export type Attachment = { filename: string; content: string }; // content = base64

export async function notifySubmission(opts: {
  kind: string; // "lead" | "career application" | "partner request"
  subject: string; // notification email subject
  rows: Row[]; // details for the team email
  whatsapp: string; // short WhatsApp line
  // Optional acknowledgment to the submitter. Pass `html`/`subject` for a full
  // custom template, or just `body` for the default wrapper.
  ack?: { to: string; name: string; body?: string; subject?: string; html?: string };
  attachments?: Attachment[]; // e.g. a resume, attached to the team email
  // Override the ntfy topic for this submission (e.g. careers to its own
  // topic). Falls back to NTFY_TOPIC when empty/unset.
  pushTopic?: string;
}) {
  await Promise.allSettled([
    sendTeamEmail(opts.subject, opts.rows, opts.attachments),
    opts.ack ? sendAck(opts.ack) : Promise.resolve(),
    sendWhatsApp(opts.whatsapp),
    sendPush(opts.subject, opts.whatsapp, opts.pushTopic),
  ]);
}

async function resendSend(payload: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
  attachments?: Attachment[];
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key || payload.to.length === 0) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error("[notify] resend:", res.status, await res.text());
  } catch (e) {
    console.error("[notify] resend threw:", e);
  }
}

async function sendTeamEmail(subject: string, rows: Row[], attachments?: Attachment[]) {
  const from = process.env.LEAD_FROM_EMAIL;
  const to = (process.env.LEAD_NOTIFY_EMAILS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!from || to.length === 0) return;
  const body = rows
    .map(
      ([l, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${esc(l)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`
    )
    .join("");
  await resendSend({
    from,
    to,
    subject,
    attachments,
    html: `<div style="font-family:system-ui,sans-serif;max-width:560px;color:#111"><h2 style="margin:0 0 12px">${esc(subject)}</h2><table style="border-collapse:collapse;font-size:14px">${body}</table></div>`,
  });
}

async function sendAck(ack: { to: string; name: string; body?: string; subject?: string; html?: string }) {
  const from = process.env.LEAD_FROM_EMAIL;
  if (!from) return;
  await resendSend({
    from,
    to: [ack.to],
    subject: ack.subject ?? "We got your message, Stallwart",
    html:
      ack.html ??
      `<div style="font-family:system-ui,sans-serif;max-width:520px;color:#111"><p>Hi ${esc(ack.name)},</p><p>${esc(ack.body ?? "")}</p><p>Talk soon,<br/>Stallwart</p></div>`,
  });
}

// CallMeBot: one apikey per recipient phone. Configure as "phone:apikey" pairs.
async function sendWhatsApp(text: string) {
  const recipients = (process.env.CALLMEBOT_RECIPIENTS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  await Promise.allSettled(
    recipients.map(async (pair) => {
      const idx = pair.lastIndexOf(":");
      if (idx < 1) return;
      const phone = pair.slice(0, idx);
      const apikey = pair.slice(idx + 1);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
        phone
      )}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
      try {
        const res = await fetch(url);
        if (!res.ok) console.error("[notify] callmebot:", res.status);
      } catch (e) {
        console.error("[notify] callmebot threw:", e);
      }
    })
  );
}

// ntfy.sh push: a plain POST to the topic URL. Best-effort; skips if unset.
// Title/tag headers must be ASCII, so the body carries the detail.
async function sendPush(title: string, body: string, topicOverride?: string) {
  const topic = (topicOverride || process.env.NTFY_TOPIC || "").trim();
  if (!topic) return;
  try {
    const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: { Title: title, Priority: "high", Tags: "rotating_light" },
      body,
    });
    if (!res.ok) console.error("[notify] ntfy:", res.status);
  } catch (e) {
    console.error("[notify] ntfy threw:", e);
  }
}

function esc(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
