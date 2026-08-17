import { NextResponse } from "next/server";

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

  const id = crypto.randomUUID();

  // Server-side only, never expose this URL to the browser (constraint 12).
  // Set DEMO_WEBHOOK_URL in .env.local / Vercel env vars. Accepts any generic
  // webhook receiver: Zapier, Make, n8n, or a CRM intake endpoint.
  const webhookUrl = process.env.DEMO_WEBHOOK_URL;

  if (!webhookUrl) {
    // Fail loudly in the server log but never to the visitor, a prospect
    // should not see infrastructure state. Without this warning a
    // misconfigured deploy silently discards real leads.
    console.error(
      "[demo-request] DEMO_WEBHOOK_URL is not set, submission accepted but NOT delivered anywhere."
    );
    return NextResponse.json({ success: true, id });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name,
        email,
        company,
        teamSize,
        interest,
        message,
        submittedAt: new Date().toISOString(),
        source: "stallwart.in/contact",
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      // Log status only, never the response body or the submitted PII.
      console.error(`[demo-request] webhook rejected: ${res.status}`);
      return NextResponse.json(
        { error: "We couldn't submit your request. Please email us instead." },
        { status: 502 }
      );
    }
  } catch {
    console.error("[demo-request] webhook unreachable or timed out.");
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, id });
}
