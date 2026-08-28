import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

type DemoRequestBody = {
  name?: string;
  email?: string;
  company?: string;
  teamSize?: string;
  interest?: string;
  message?: string;
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

  let body: DemoRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const teamSize = clean(body.teamSize);
  const interest = clean(body.interest);
  const message = clean(body.message);

  if (!name || !email || !company) {
    return NextResponse.json(
      { error: "Name, email, and company are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Persist to Supabase (public.inquiries). The database defaults handle id,
  // created_at, status ("new"), and source ("website"), so we send only the
  // mapped fields. message maps to pain_point; teamSize to team_size.
  try {
    const { error } = await supabaseAdmin().from("inquiries").insert({
      name,
      email,
      company,
      team_size: teamSize,
      interest,
      pain_point: message,
    });

    if (error) {
      // Log the code only, never the submitted PII.
      console.error(
        `[demo-request] insert failed: ${error.code ?? error.message}`
      );
      return NextResponse.json(
        { error: "We couldn't submit your request. Please email us instead." },
        { status: 502 }
      );
    }
  } catch {
    // Missing env or client error. Never leak infrastructure state to the user.
    console.error("[demo-request] Supabase client error.");
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
