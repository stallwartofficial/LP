import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// Partial lead capture. The contact wizard beacons its current answers here as
// the user advances steps and when they leave the tab, so an abandoned form is
// still captured. Rows are keyed by a client draft id (sid) and upserted, so
// repeated beacons update one row. On a full submit, the action deletes the
// matching draft, leaving lead_drafts = only the abandoned ones. Best-effort:
// any failure is swallowed so this never affects the user.
type Body = {
  sid?: string;
  name?: string;
  email?: string;
  company?: string;
  teamSize?: string;
  interest?: string;
  message?: string;
  utm?: Record<string, string>;
  page?: string;
};

const MAX = 2000;
const s = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    !/^https?:\/\/(www\.)?stallwart\.in$/.test(origin) &&
    !/^http:\/\/localhost(:\d+)?$/.test(origin)
  ) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sid = s(body.sid);
  if (!sid) return NextResponse.json({ ok: false }, { status: 400 });

  // Only bother if they have actually typed something identifying.
  if (!s(body.name) && !s(body.email) && !s(body.company) && !s(body.message)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await supabaseAdmin()
      .from("lead_drafts")
      .upsert(
        {
          sid,
          name: s(body.name) || null,
          email: s(body.email) || null,
          company: s(body.company) || null,
          team_size: s(body.teamSize) || null,
          interest: s(body.interest) || null,
          pain_point: s(body.message) || null,
          utm: body.utm ?? {},
          source_page: s(body.page) || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "sid" }
      );
  } catch {
    // ignore: draft capture is best-effort
  }

  return NextResponse.json({ ok: true });
}
