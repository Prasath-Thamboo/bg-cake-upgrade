"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { type ReactNode } from "react";

/**
 * Layer cake vectoriel dont chaque strate s'écarte au fil du scroll
 * (effet « déballage »). Piloté par une MotionValue de progression 0 → 1.
 * `progress = null` → gâteau assemblé, immobile (mode réduit).
 *
 * La construction en couches sert aussi de socle au futur aperçu SVG
 * du configurateur.
 */

const CX = 170;
const PIVOT = 3; // strate autour de laquelle l'éventail s'ouvre

type BandDef = {
  top: number;
  bot: number;
  hw: number; // demi-largeur
  fill: string;
  shade: string; // liseré bas (ombre de tranche)
  crumb?: string; // couleur des miettes ; absent = pas de texture
};

// De bas en haut : génoise / crème / génoise chocolat / insert / génoise / crème / génoise
const BANDS: BandDef[] = [
  { top: 300, bot: 338, hw: 114, fill: "#ecd3a0", shade: "#d8b980", crumb: "#cfab6f" },
  { top: 288, bot: 303, hw: 109, fill: "#fbf3e4", shade: "#eadfc7" },
  { top: 254, bot: 291, hw: 111, fill: "#8a5a3a", shade: "#6f462c", crumb: "#6b432a" },
  { top: 244, bot: 257, hw: 106, fill: "#a83c54", shade: "#8c3044" },
  { top: 210, bot: 247, hw: 104, fill: "#ecd3a0", shade: "#d8b980", crumb: "#cfab6f" },
  { top: 198, bot: 213, hw: 100, fill: "#fbf3e4", shade: "#eadfc7" },
  { top: 166, bot: 201, hw: 96, fill: "#ecd3a0", shade: "#d8b980", crumb: "#cfab6f" },
];

// Miettes : décalages fixes (x relatif au centre en fraction de hw, y en fraction de hauteur)
const CRUMBS = [
  [-0.62, 0.35, 1.3],
  [-0.28, 0.7, 1],
  [0.1, 0.28, 1.4],
  [0.44, 0.6, 1.1],
  [0.7, 0.3, 0.9],
  [-0.05, 0.82, 1],
  [-0.8, 0.66, 0.8],
  [0.3, 0.85, 1.2],
];

function bandPath(top: number, bot: number, hw: number): string {
  const l = CX - hw;
  const r = CX + hw;
  return `M ${l} ${top} Q ${CX} ${top - 4} ${r} ${top} L ${r} ${bot} Q ${CX} ${bot + 4} ${l} ${bot} Z`;
}

function Band({
  progress,
  k,
  gap,
}: {
  progress: MotionValue<number>;
  k: number;
  gap: number;
}) {
  const b = BANDS[k];
  const raw = useTransform(progress, [0, 0.8], [0, 1], { clamp: true });
  const s = useTransform(raw, (v) => v * v * (3 - 2 * v)); // smoothstep
  const dir = k % 2 === 0 ? -1 : 1;

  const y = useTransform(s, (v) => (PIVOT - k) * v * gap);
  const x = useTransform(s, (v) => dir * v * 12);
  const rotate = useTransform(s, (v) => dir * v * 3);
  const opacity = useTransform(progress, [0, 0.72, 0.92], [1, 1, 0]);

  const h = b.bot - b.top;

  return (
    <motion.g
      style={{ x, y, rotate, opacity, transformBox: "fill-box", transformOrigin: "center" }}
    >
      <path d={bandPath(b.top, b.bot, b.hw)} fill={b.fill} />
      {/* liseré d'ombre en bas de tranche */}
      <path
        d={`M ${CX - b.hw} ${b.bot - 3} Q ${CX} ${b.bot + 1} ${CX + b.hw} ${b.bot - 3}`}
        stroke={b.shade}
        strokeWidth="3"
        fill="none"
        opacity="0.7"
      />
      {/* lumière sur l'arête haute */}
      <path
        d={`M ${CX - b.hw} ${b.top + 1.5} Q ${CX} ${b.top - 2.5} ${CX + b.hw} ${b.top + 1.5}`}
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        opacity="0.22"
      />
      {b.crumb
        ? CRUMBS.map(([fx, fy, r], i) => (
            <circle
              key={i}
              cx={CX + fx * b.hw * 0.86}
              cy={b.top + fy * h}
              r={r}
              fill={b.crumb}
              opacity="0.4"
            />
          ))
        : null}
    </motion.g>
  );
}

function DriftGroup({
  progress,
  range,
  toY,
  toRotate = 0,
  fadeAt,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  toY: number;
  toRotate?: number;
  fadeAt: number[];
  children: ReactNode;
}) {
  const y = useTransform(progress, range, [0, toY], { clamp: true });
  const rotate = useTransform(progress, range, [0, toRotate], { clamp: true });
  const opacity = useTransform(progress, fadeAt, [1, 1, 0], { clamp: true });
  return (
    <motion.g style={{ y, rotate, opacity, transformBox: "fill-box", transformOrigin: "center" }}>
      {children}
    </motion.g>
  );
}

export default function LayerCake({
  progress,
  gap = 46,
  className,
}: {
  progress: MotionValue<number> | null;
  gap?: number;
  className?: string;
}) {
  const zero = useMotionValue(0);
  const p = progress ?? zero;

  const standY = useTransform(p, [0, 0.68], [0, 64], { clamp: true });
  const standOpacity = useTransform(p, [0.3, 0.78], [1, 0], { clamp: true });

  return (
    <svg
      viewBox="0 0 340 400"
      className={className}
      role="img"
      aria-label="Layer cake artisanal : génoises, crème, insert framboise et glaçage"
    >
      <defs>
        <filter id="cake-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#3a2a1e" floodOpacity="0.16" />
        </filter>
        <linearGradient id="stand-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5ecdb" />
          <stop offset="1" stopColor="#e2d0ae" />
        </linearGradient>
      </defs>

      {/* Présentoir */}
      <motion.g style={{ y: standY, opacity: standOpacity }}>
        <ellipse cx={CX} cy="358" rx="120" ry="11" fill="#3a2a1e" opacity="0.09" />
        <ellipse cx={CX} cy="344" rx="128" ry="15" fill="url(#stand-glass)" stroke="#d3bf9c" strokeWidth="1.5" />
        <ellipse cx={CX} cy="341" rx="122" ry="10" fill="#fffaf0" opacity="0.5" />
        <path d="M146 346 L152 372 L188 372 L194 346 Z" fill="#e8d9bd" />
        <ellipse cx={CX} cy="374" rx="44" ry="9" fill="#dcc8a4" />
      </motion.g>

      {/* Gâteau */}
      <g filter="url(#cake-soft)">
        {BANDS.map((_, k) => (
          <Band key={k} progress={p} k={k} gap={gap} />
        ))}

        {/* Glaçage + coulure or */}
        <DriftGroup progress={p} range={[0, 0.56]} toY={-200} toRotate={-6} fadeAt={[0, 0.5, 0.78]}>
          {/* coulures : gouttes effilées, longueurs variées */}
          {[
            [-66, 30],
            [-24, 16],
            [16, 36],
            [40, 12],
            [66, 24],
          ].map(([dx, len], i) => (
            <path
              key={i}
              d={`M ${CX + dx - 6} 154 Q ${CX + dx - 7} ${156 + len} ${CX + dx} ${160 + len} Q ${CX + dx + 7} ${156 + len} ${CX + dx + 6} 154 Z`}
              fill="#fdf6ea"
            />
          ))}
          {/* calotte */}
          <path
            d={`M ${CX - 102} 172
                Q ${CX - 102} 153 ${CX - 78} 152
                L ${CX + 78} 152
                Q ${CX + 102} 153 ${CX + 102} 172
                Q ${CX + 102} 177 ${CX + 95} 177
                L ${CX - 95} 177
                Q ${CX - 102} 177 ${CX - 102} 172 Z`}
            fill="#fdf6ea"
          />
          <path
            d={`M ${CX - 92} 160 Q ${CX - 40} 154 ${CX + 20} 157`}
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />
          <path
            d={`M ${CX - 96} 173 Q ${CX} 168 ${CX + 96} 173`}
            stroke="#b89152"
            strokeWidth="2.5"
            fill="none"
            opacity="0.55"
          />
        </DriftGroup>

        {/* Décor : sprig, feuilles, baies, éclats dorés */}
        <DriftGroup progress={p} range={[0, 0.46]} toY={-300} toRotate={12} fadeAt={[0, 0.3, 0.44]}>
          <path d={`M ${CX} 158 C ${CX - 10} 144 ${CX - 10} 130 ${CX - 2} 118`} stroke="#7f9b6d" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M ${CX - 10} 138 q -13 -4 -15 -17 q 13 2 15 17 z`} fill="#7f9b6d" />
          <path d={`M ${CX + 6} 130 q 13 -6 17 -19 q -13 0 -17 19 z`} fill="#8aa678" />
          <circle cx={CX - 10} cy="123" r="6.5" fill="#a83c54" />
          <circle cx={CX + 4} cy="115" r="6" fill="#b8465e" />
          <circle cx={CX + 14} cy="126" r="5.5" fill="#8f3049" />
          <circle cx={CX - 12} cy="121" r="1.7" fill="#ffffff" opacity="0.7" />
          <circle cx={CX - 40} cy="156" r="2" fill="#c9a86f" />
          <circle cx={CX + 34} cy="150" r="1.7" fill="#c9a86f" />
          <circle cx={CX + 12} cy="160" r="1.4" fill="#c9a86f" />
        </DriftGroup>
      </g>
    </svg>
  );
}
