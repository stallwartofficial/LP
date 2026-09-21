import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.redirect(
    new URL("/.well-known/ard.json", "https://www.stallwart.in"),
    301
  );
}
