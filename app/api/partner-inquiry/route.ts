import { NextResponse } from "next/server";

// Partner inquiry intake. Same shape and safety as /api/demo-request: validate,
// length-cap, forward server-side to a webhook, never expose the webhook or log
// PII. Backend-agnostic on purpose.
//
// FIREBASE (later): to move persistence to Google Firebase, replace the webhook
// forward below with a Firestore write (e.g. addDoc(collection(db, "partners"),
// payload)); add Firebase Auth for an internal review view. Nothing else on the
// page has to change, because the browser only ever talks to this route.
type PartnerBody = {
  name?: string;
  email?: string;
  company?: string;
  partnerType?: string;
  website?: string;
  message?: string;
};

const MAX_FIELD = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PARTNER_TYPES = ["Referral", "Delivery or implementation"];

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

export async function POST(request: Request) {
  let body: PartnerBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const partnerType = clean(body.partnerType);
  const website = clean(body.website);
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

  // Only accept a known partner type, so the downstream record is clean.
  const type = PARTNER_TYPES.includes(partnerType) ? partnerType : "Unspecified";

  const id = crypto.randomUUID();

  const webhookUrl = process.env.PARTNER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      "[partner-inquiry] PARTNER_WEBHOOK_URL is not set, submission accepted but NOT delivered anywhere."
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
        partnerType: type,
        website,
        message,
        submittedAt: new Date().toISOString(),
        source: "stallwart.in/partner",
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error(`[partner-inquiry] webhook rejected: ${res.status}`);
      return NextResponse.json(
        { error: "We couldn't submit your inquiry. Please try again shortly." },
        { status: 502 }
      );
    }
  } catch {
    console.error("[partner-inquiry] webhook unreachable or timed out.");
    return NextResponse.json(
      { error: "We couldn't submit your inquiry. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, id });
}
