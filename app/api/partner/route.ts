import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { notifySubmission } from "@/lib/notify";

// Partner application intake. The Partner form posts here; we validate, apply the
// same cheap CSRF/origin guard as the demo-request route, then insert into
// public.partner_submissions using the server-only Supabase client (the SECRET
// key bypasses RLS, and never ships to the browser).
type PartnerBody = {
  name?: string;
  email?: string;
  company?: string; // form field is "company" (labelled Organization)
  role?: string;
  website?: string;
  partnerType?: string; // form field is "partnerType"
  message?: string;
  hp?: string; // honeypot
};

const MAX_FIELD = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

export async function POST(request: Request) {
  // Reject cross-site browser POSTs (a cheap CSRF / form-spam guard). Same-origin
  // and local dev are allowed; non-browser callers send no Origin and pass.
  const origin = request.headers.get("origin");
  if (
    origin &&
    !/^https?:\/\/(www\.)?stallwart\.in$/.test(origin) &&
    !/^http:\/\/localhost(:\d+)?$/.test(origin)
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: PartnerBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: silently accept spam (hidden "hp" field filled) without storing.
  if (clean(body.hp)) return NextResponse.json({ ok: true });

  const name = clean(body.name);
  const email = clean(body.email);
  const organization = clean(body.company);
  const role = clean(body.role);
  const website = clean(body.website);
  const partnershipType = clean(body.partnerType);
  const message = clean(body.message);

  if (!name || !email || !organization) {
    return NextResponse.json(
      { error: "Name, email, and organization are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Persist to Supabase (public.partner_submissions). Database defaults handle id,
  // created_at, status ("new"), and source ("partner-page"), so we send only the
  // mapped fields. company maps to organization; partnerType to partnership_type.
  try {
    const { error } = await supabaseAdmin().from("partner_submissions").insert({
      name,
      email,
      organization,
      role,
      website,
      partnership_type: partnershipType,
      message,
    });

    if (error) {
      // Log the code only, never the submitted PII.
      console.error(
        `[partner] insert failed: ${error.code ?? error.message}`
      );
      return NextResponse.json(
        { error: "We couldn't submit your application. Please email us instead." },
        { status: 502 }
      );
    }
  } catch {
    // Missing env or client error. Never leak infrastructure state to the user.
    console.error("[partner] Supabase client error.");
    return NextResponse.json(
      { error: "We couldn't submit your application. Please email us instead." },
      { status: 502 }
    );
  }

  // Notify the team (email + WhatsApp) + acknowledge the partner. Best-effort.
  await notifySubmission({
    kind: "partner request",
    subject: `New partner request: ${organization}`,
    rows: [
      ["Name", name],
      ["Email", email],
      ["Organization", organization],
      ["Role", role || "-"],
      ["Website", website || "-"],
      ["Partnership type", partnershipType || "-"],
      ["Message", message || "-"],
    ],
    whatsapp: `New Stallwart partner request: ${name} (${organization}) ${email}.`,
    ack: {
      to: email,
      name,
      body: "Thanks for your interest in partnering with Stallwart. We will review and get back to you shortly.",
    },
  });

  return NextResponse.json({ success: true });
}
