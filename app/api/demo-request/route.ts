import { NextResponse } from "next/server";

type DemoRequestBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: DemoRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, company } = body;

  if (!name || !email || !company) {
    return NextResponse.json(
      { error: "Name, email, and company are required." },
      { status: 400 }
    );
  }

  // TODO: wire to real CRM/email webhook (e.g. Extrovert AI's own intake API,
  // or a transactional email service). For now this validates and accepts
  // the submission so the frontend flow is fully testable end to end.
  // Never log/store secrets or PII beyond what's needed here.

  return NextResponse.json({ success: true, id: crypto.randomUUID() });
}
