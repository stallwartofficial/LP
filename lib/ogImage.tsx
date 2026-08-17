import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Shared OG card renderer so every route type produces a visually consistent
// social image without duplicating layout code.
export function renderOgCard({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c9a24b",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: title.length > 70 ? 52 : 64,
              lineHeight: 1.15,
              color: "#f5f1e8",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: "#d9d3c4" }}>
            {site.company} · {site.tagline}
          </div>
          <div
            style={{ display: "flex", height: 6, width: 140, background: "#c9a24b" }}
          />
        </div>
      </div>
    ),
    ogSize
  );
}
