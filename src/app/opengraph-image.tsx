import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.brand} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#f6f2ea",
          backgroundImage:
            "linear-gradient(135deg, #e7d6b3 0%, rgba(231,214,179,0) 45%), linear-gradient(300deg, #c9a86f 0%, rgba(201,168,111,0) 40%)",
          color: "#3a2a1e",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#a07d43",
            fontWeight: 600,
          }}
        >
          {site.brand}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Des gâteaux élégants pour vos plus beaux moments.
          </div>
          <div style={{ fontSize: 32, color: "#6b5646" }}>{site.tagline}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#6b5646",
          }}
        >
          <div
            style={{
              width: 64,
              height: 4,
              background: "#a07d43",
              borderRadius: 2,
            }}
          />
          Sur-mesure • Design & goûts • Réponse sous 48 h
        </div>
      </div>
    ),
    { ...size },
  );
}
