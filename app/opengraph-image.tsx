import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.company}. ${site.companyDescriptor}.`;

// Generated at build time so social cards never depend on a hand-maintained
// PNG. Palette matches the brand: ink base, gold accent, cream text.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0a0b",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c9a24b",
          }}
        >
          {site.company}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            lineHeight: 1.1,
            color: "#f5f1e8",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 34,
            color: "#d9d3c4",
          }}
        >
          {site.companyDescriptor}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            height: 6,
            width: 200,
            background: "#c9a24b",
          }}
        />
      </div>
    ),
    size
  );
}
