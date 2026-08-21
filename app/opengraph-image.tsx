import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site, navLinks } from "@/data/site";

// The social share card (WhatsApp, Instagram, iMessage, LinkedIn link preview).
//
// DYNAMIC BY DESIGN: this is composed from the SAME data as the live hero and
// nav, not a static screenshot. The wordmark, menu labels, eyebrow tagline,
// headline (with its gold emphasis word), and both CTA labels all read from
// data/site.ts. Change the hero copy or the menu and this card follows on the
// next build. Keep it that way: never hardcode the strings here.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.company}. ${site.hero.tagline}`;

const INK = "#0a0a0b";
const GOLD = "#c9a24b";
const CREAM = "#f5f1e8";
const MUTED = "#9c978a";
const HAIR = "rgba(245,241,232,0.14)";

// Read the emblem off disk (no network), inline as a data URI for Satori.
function emblemDataUri() {
  const buf = readFileSync(join(process.cwd(), "public/images/logo-mark.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

// Fetch a Google font as TTF (Satori cannot read woff2). The archaic UA string
// makes the CSS endpoint hand back a truetype src. Best effort: on any failure
// the card still renders in Satori's default face, so the build never breaks.
async function googleFont(
  family: string,
  weight: number,
  italic = false
): Promise<ArrayBuffer | null> {
  try {
    const axis = italic ? "ital,wght" : "wght";
    const val = italic ? `1,${weight}` : `${weight}`;
    const api = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+"
    )}:${axis}@${val}`;
    const css = await fetch(api, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)" },
    }).then((r) => r.text());
    // The archaic UA yields a woff (not woff2) src, which Satori reads fine.
    const url = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(?:woff|truetype|opentype)'\)/
    )?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const emblem = emblemDataUri();
  const [serif, serifItalic, sans] = await Promise.all([
    googleFont("Fraunces", 300),
    googleFont("Fraunces", 300, true),
    googleFont("IBM Plex Sans", 500),
  ]);

  const fonts = [
    serif && { name: "Fraunces", data: serif, weight: 300 as const, style: "normal" as const },
    serifItalic && { name: "Fraunces", data: serifItalic, weight: 300 as const, style: "italic" as const },
    sans && { name: "Plex", data: sans, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 300 | 500; style: "normal" | "italic" }[];

  const serifFamily = serif ? "Fraunces" : "serif";
  const sansFamily = sans ? "Plex" : "sans-serif";

  // Headline splits on the pipe into lines; the emphasis word is drawn in gold.
  const [line1, line2 = ""] = site.hero.headline.split("|");
  const emphasis = site.hero.headlineEmphasis;

  const renderLine = (line: string, key: number) => {
    if (!emphasis || !line.includes(emphasis)) {
      return (
        <div key={key} style={{ display: "flex" }}>
          {line}
        </div>
      );
    }
    const [before, after] = line.split(emphasis);
    return (
      <div key={key} style={{ display: "flex" }}>
        <span style={{ whiteSpace: "pre" }}>{before}</span>
        <span style={{ color: GOLD, fontStyle: "italic" }}>{emphasis}</span>
        <span style={{ whiteSpace: "pre" }}>{after}</span>
      </div>
    );
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: INK,
          color: CREAM,
          fontFamily: sansFamily,
          padding: "42px 54px",
        }}
      >
        {/* Nav row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={emblem} width={51} height={46} alt="" />
            <span style={{ fontFamily: serifFamily, fontSize: 31 }}>{site.company}</span>
          </div>
          <div style={{ display: "flex", gap: 34, color: MUTED, fontSize: 17 }}>
            {navLinks.map((l) => (
              <span key={l.href} style={{ display: "flex" }}>
                {l.label}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              background: CREAM,
              color: INK,
              borderRadius: 999,
              padding: "11px 24px",
              fontSize: 17,
            }}
          >
            {site.hero.primaryCta.label}
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26 }}>
            <div style={{ display: "flex", width: 46, height: 1, background: GOLD, opacity: 0.6 }} />
            <div style={{ display: "flex", fontFamily: serifFamily, fontStyle: "italic", fontSize: 27, color: GOLD }}>
              {site.hero.tagline}
            </div>
            <div style={{ display: "flex", width: 46, height: 1, background: GOLD, opacity: 0.6 }} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: serifFamily,
              fontSize: 68,
              lineHeight: 1.08,
            }}
          >
            {renderLine(line1, 0)}
            {renderLine(line2, 1)}
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                background: CREAM,
                color: INK,
                borderRadius: 999,
                padding: "14px 28px",
                fontSize: 18,
              }}
            >
              {site.hero.primaryCta.label}
            </div>
            <div
              style={{
                display: "flex",
                border: `1px solid ${HAIR}`,
                color: CREAM,
                borderRadius: 999,
                padding: "14px 28px",
                fontSize: 18,
              }}
            >
              {site.hero.secondaryCta.label} →
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
