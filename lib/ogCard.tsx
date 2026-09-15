import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/data/site";

// Shared per-page social card. One branded template driven by an eyebrow + a
// title, so every route gets its own OG image instead of reusing the homepage
// card. Ink ground, gold accents, the wordmark, and the domain, matching the
// live site. Fonts and emblem are read locally / best-effort so a build never
// breaks on a font-fetch failure.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#0a0a0b";
const GOLD = "#c9a24b";
const CREAM = "#f5f1e8";
const MUTED = "#9c978a";
const HAIR = "rgba(245,241,232,0.14)";

function emblemDataUri() {
  const buf = readFileSync(
    join(process.cwd(), "public/images/stallwart-lion-mark.png")
  );
  return `data:image/png;base64,${buf.toString("base64")}`;
}

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
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)",
      },
    }).then((r) => r.text());
    const url = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(?:woff|truetype|opentype)'\)/
    )?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function renderOgCard(opts: { eyebrow: string; title: string }) {
  const emblem = emblemDataUri();
  const [serif, serifItalic, sans] = await Promise.all([
    googleFont("Spectral", 300),
    googleFont("Spectral", 300, true),
    googleFont("IBM Plex Sans", 500),
  ]);

  const fonts = [
    serif && { name: "Serif", data: serif, weight: 300 as const, style: "normal" as const },
    serifItalic && { name: "Serif", data: serifItalic, weight: 300 as const, style: "italic" as const },
    sans && { name: "Sans", data: sans, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 300 | 500; style: "normal" | "italic" }[];

  const serifFamily = serif ? "Serif" : "serif";
  const sansFamily = sans ? "Sans" : "sans-serif";

  // Title may carry one "|" to force a two-line break.
  const lines = opts.title.split("|").map((s) => s.trim());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: CREAM,
          fontFamily: sansFamily,
          padding: "56px 64px",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={emblem} width={46} height={41} alt="" />
          <span style={{ fontFamily: serifFamily, fontSize: 30 }}>{site.company}</span>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
            <div style={{ display: "flex", width: 40, height: 1, background: GOLD, opacity: 0.7 }} />
            <div
              style={{
                display: "flex",
                fontStyle: "italic",
                fontFamily: serifFamily,
                fontSize: 24,
                color: GOLD,
              }}
            >
              {opts.eyebrow}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: serifFamily,
              fontSize: lines.join(" ").length > 46 ? 58 : 70,
              lineHeight: 1.06,
              maxWidth: 1000,
            }}
          >
            {lines.map((l, i) => (
              <div key={i} style={{ display: "flex" }}>{l}</div>
            ))}
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${HAIR}`,
            paddingTop: 22,
          }}
        >
          <span style={{ display: "flex", color: MUTED, fontSize: 20 }}>
            stallwart.in
          </span>
          <span style={{ display: "flex", color: GOLD, fontSize: 20, fontStyle: "italic", fontFamily: serifFamily }}>
            {site.hero.tagline}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined }
  );
}
