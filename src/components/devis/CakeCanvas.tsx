import type { CakeConfig } from "@/lib/devis/config";
import { findChoice, findPalette, GANACHES, INSERTS, SPONGES } from "@/lib/devis/options";

const CX = 160;

function band(y: number, h: number, hw: number, fill: string, key: string) {
  return (
    <rect
      key={key}
      x={CX - hw}
      y={y}
      width={hw * 2}
      height={h}
      rx={Math.min(10, h / 2)}
      fill={fill}
    />
  );
}

/** Aperçu vectoriel du gâteau, piloté par la config (sans animation). */
export default function CakeCanvas({
  config,
  className,
}: {
  config: CakeConfig;
  className?: string;
}) {
  const sponge = findChoice(SPONGES, config.sponge).color ?? "#ecd3a0";
  const ganache = findChoice(GANACHES, config.ganache).color ?? "#3b2416";
  const insertChoice = findChoice(INSERTS, config.insert);
  const insert =
    config.insert === "aucun" ? "#fbf3e4" : insertChoice.color ?? "#a83c54";
  const palette = findPalette(config.palette);
  const cream = "#fbf3e4";

  const isCoated = config.frosting === "buttercream";
  const isDrip = config.frosting === "drip";

  return (
    <svg
      viewBox="0 0 320 360"
      className={className}
      role="img"
      aria-label="Aperçu du gâteau personnalisé"
    >
      <defs>
        <filter id="cc-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="9" stdDeviation="11" floodColor="#3a2a1e" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* présentoir */}
      <ellipse cx={CX} cy="342" rx="108" ry="9" fill="#3a2a1e" opacity="0.09" />
      <ellipse cx={CX} cy="330" rx="116" ry="13" fill="#efe5d4" stroke="#d3bf9c" strokeWidth="1.5" />
      <path d="M138 332 L144 352 L176 352 L182 332 Z" fill="#e6d7bd" />
      <ellipse cx={CX} cy="354" rx="38" ry="7" fill="#dcc8a4" />

      <g filter="url(#cc-shadow)">
        {isCoated ? (
          <>
            {/* couverture lisse */}
            <path
              d={`M ${CX - 108} 318
                  L ${CX - 96} 162
                  Q ${CX - 96} 150 ${CX - 78} 150
                  L ${CX + 78} 150
                  Q ${CX + 96} 150 ${CX + 96} 162
                  L ${CX + 108} 318
                  Q ${CX + 108} 322 ${CX + 100} 322
                  L ${CX - 100} 322
                  Q ${CX - 108} 322 ${CX - 108} 318 Z`}
              fill={palette.icing}
            />
            <ellipse cx={CX} cy="152" rx="92" ry="12" fill="#ffffff" opacity="0.35" />
            <path
              d={`M ${CX - 86} 176 L ${CX - 78} 310`}
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.16"
            />
            {/* liseré ganache visible en bas */}
            <rect x={CX - 104} y="308" width="208" height="12" rx="6" fill={ganache} opacity="0.9" />
          </>
        ) : (
          <>
            {band(286, 34, 108, sponge, "b0")}
            {band(274, 15, 104, cream, "b1")}
            {band(244, 33, 106, sponge, "b2")}
            {band(233, 14, 102, insert, "b3")}
            {band(203, 33, 100, sponge, "b4")}
            {band(191, 15, 96, cream, "b5")}
            {band(160, 33, 92, sponge, "b6")}
            {/* fines ombres de tranche */}
            {[300, 268, 250, 227, 196].map((y, i) => (
              <line
                key={i}
                x1={CX - 96}
                x2={CX + 96}
                y1={y}
                y2={y}
                stroke={ganache}
                strokeWidth="2"
                opacity="0.25"
              />
            ))}
          </>
        )}

        {/* drip */}
        {isDrip ? (
          <>
            <rect x={CX - 96} y="150" width="192" height="18" rx="9" fill={palette.icing} />
            {[-70, -30, 12, 52, 78].map((dx, i) => (
              <path
                key={i}
                d={`M ${CX + dx - 5} 154 Q ${CX + dx - 6} ${168 + (i % 2 ? 22 : 12)} ${CX + dx} ${172 + (i % 2 ? 22 : 12)} Q ${CX + dx + 6} ${168 + (i % 2 ? 22 : 12)} ${CX + dx + 5} 154 Z`}
                fill={palette.accent}
              />
            ))}
          </>
        ) : null}

        {/* ornement : ruban */}
        {config.ornament === "ruban" ? (
          <g>
            <rect x={CX - 100} y="246" width="200" height="11" rx="3" fill={palette.accent} />
            <path
              d={`M ${CX - 6} 257 l -14 14 l 14 -4 l 14 4 z`}
              fill={palette.accent}
              opacity="0.92"
            />
          </g>
        ) : null}

        {/* ornement : feuille d'or */}
        {config.ornament === "dore"
          ? [
              [CX - 60, 176],
              [CX + 44, 190],
              [CX - 20, 168],
              [CX + 20, 210],
              [CX - 74, 220],
              [CX + 68, 232],
              [CX + 4, 150],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 2.4} fill="#c9a86f" />
            ))
          : null}

        {/* ornement : fleurs en sucre */}
        {config.ornament === "fleurs"
          ? [
              [CX - 26, 150],
              [CX + 8, 142],
              [CX + 34, 154],
            ].map(([x, y], i) => (
              <g key={i}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <circle
                    key={a}
                    cx={x + Math.cos((a * Math.PI) / 180) * 7}
                    cy={y + Math.sin((a * Math.PI) / 180) * 7}
                    r="5"
                    fill="#fff7ec"
                  />
                ))}
                <circle cx={x} cy={y} r="4" fill={palette.accent} />
              </g>
            ))
          : null}

        {/* ornement : fleurs fraîches */}
        {config.ornament === "fleurs-fraiches" ? (
          <g>
            <path
              d={`M ${CX} 152 C ${CX - 10} 138 ${CX - 10} 124 ${CX - 2} 112`}
              stroke="#7f9b6d"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path d={`M ${CX - 10} 132 q -12 -4 -14 -16 q 12 2 14 16 z`} fill="#7f9b6d" />
            <path d={`M ${CX + 6} 124 q 12 -6 16 -18 q -12 0 -16 18 z`} fill="#8aa678" />
            <circle cx={CX - 10} cy="118" r="6.5" fill="#a83c54" />
            <circle cx={CX + 4} cy="110" r="6" fill="#b8465e" />
            <circle cx={CX + 14} cy="121" r="5.5" fill="#8f3049" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
