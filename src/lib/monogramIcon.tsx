import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Icône carrée recadrée sur le monogramme « BG » du logo (le logo complet,
 * avec sa couronne de texte, est illisible à 16–32 px dans un onglet).
 */
export async function monogramIcon(px: number) {
  const logo = await readFile(join(process.cwd(), "public/image/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  // Monogramme ≈ centré en (250, 248) sur 500 px, haut d'environ 150 px.
  const scale = (px * 0.8) / 150;
  const full = 500 * scale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f6f2ea",
          borderRadius: px * 0.22,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          width={full}
          height={full}
          alt=""
          style={{
            position: "absolute",
            left: px / 2 - 250 * scale,
            top: px / 2 - 248 * scale,
          }}
        />
      </div>
    ),
    { width: px, height: px },
  );
}
