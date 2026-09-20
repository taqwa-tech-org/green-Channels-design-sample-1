import type { ReactNode } from "react";
import type { GarmentKind } from "@/lib/content";

/**
 * Technical "flat" drawings, the way a tech pack shows a garment.
 * Each is drawn as the right half of the garment and mirrored.
 * Coordinates: garment spans x 0–200, y 0–240; annotation area sits to the right.
 */

type Note = { x: number; y: number; label: string };
type Flat = {
  outline: string;
  lines: string[];
  stitches: string[];
  circles?: [number, number, number][];
  bartacks?: [number, number][];
  notes: Note[];
};

const flats: Record<GarmentKind, Flat> = {
  tee: {
    outline: "M100 50 C112 50 120 44 122 30 L150 38 L186 72 L172 98 L156 90 L152 214 L100 214",
    lines: ["M100 58 C114 58 124 47 126 31"],
    stitches: ["M100 206 L152 206", "M181 79 L167 102", "M150 38 C158 58 160 76 156 90"],
    notes: [
      { x: 124, y: 40, label: "RIB COLLAR" },
      { x: 130, y: 206, label: "TWIN-NEEDLE HEM" },
    ],
  },
  polo: {
    outline: "M100 46 L122 30 L150 38 L186 72 L172 98 L156 90 L152 214 L100 214",
    lines: ["M100 46 L121 25 L140 42 L112 66 L100 72", "M100 46 L100 124", "M106 62 L106 122"],
    stitches: ["M100 206 L152 206", "M181 79 L167 102", "M150 38 C158 58 160 76 156 90"],
    circles: [
      [103, 84, 1.7],
      [103, 104, 1.7],
    ],
    notes: [
      { x: 106, y: 92, label: "PLACKET" },
      { x: 131, y: 38, label: "KNIT COLLAR" },
    ],
  },
  sweat: {
    outline: "M100 48 C112 48 120 42 122 30 L150 38 L184 64 L198 170 L172 174 L158 104 L154 206 L100 206",
    lines: ["M100 56 C114 56 124 46 126 32", "M100 190 L154 190", "M196 154 L172 158"],
    stitches: ["M150 38 C160 60 162 88 158 104", "M100 198 L154 198"],
    notes: [
      { x: 185, y: 156, label: "RIB CUFF" },
      { x: 130, y: 190, label: "RIB HEM" },
    ],
  },
  jacket: {
    outline: "M100 40 L124 30 L156 40 L190 74 L198 180 L172 184 L160 110 L158 212 L100 212",
    lines: [
      "M100 40 L106 22 L126 20 L124 32 L100 44",
      "M100 44 L100 212",
      "M112 84 L142 84 L142 100 L127 106 L112 100 Z",
      "M112 150 L146 150 L146 184 L112 184 Z",
      "M100 198 L158 198",
      "M197 168 L173 172",
    ],
    stitches: ["M124 30 L156 40", "M100 206 L158 206", "M118 92 L136 92"],
    bartacks: [
      [112, 84],
      [142, 84],
      [112, 150],
      [146, 150],
    ],
    notes: [
      { x: 142, y: 96, label: "BARTACKED POCKET" },
      { x: 132, y: 130, label: "FRONT ZIP" },
    ],
  },
  vest: {
    outline: "M100 44 L118 26 L140 30 C152 48 152 72 150 92 L154 206 L100 206",
    lines: [
      "M100 44 L100 206",
      "M110 84 L138 84 L138 102 L110 102 Z",
      "M108 146 L146 146 L146 180 L108 180 Z",
      "M138 30 C148 48 148 70 146 92",
    ],
    stitches: ["M100 198 L154 198"],
    bartacks: [
      [110, 84],
      [138, 84],
    ],
    notes: [
      { x: 138, y: 94, label: "CHEST POCKET" },
      { x: 128, y: 164, label: "UTILITY POCKETS" },
    ],
  },
  trousers: {
    outline: "M100 18 L154 18 L160 82 L153 226 L116 226 L106 98 L100 90",
    lines: [
      "M100 32 L156 32",
      "M108 32 L108 68 C108 78 104 86 100 88",
      "M155 34 C142 40 134 52 134 68",
      "M138 110 L158 110 L158 142 L138 142 Z",
      "M118 150 L152 150 L150 188 L118 188 Z",
      "M120 14 L120 34",
      "M144 14 L144 34",
    ],
    stitches: ["M116 216 L153 216", "M100 38 L156 38"],
    bartacks: [
      [138, 110],
      [158, 110],
    ],
    notes: [
      { x: 148, y: 126, label: "CARGO POCKET" },
      { x: 135, y: 170, label: "KNEE PANEL" },
    ],
  },
  shorts: {
    outline: "M100 18 L154 18 L162 84 L160 156 L112 156 L106 104 L100 92",
    lines: [
      "M100 32 L156 32",
      "M108 32 L108 70 C108 80 104 88 100 90",
      "M155 34 C142 40 134 52 134 68",
      "M138 100 L161 100 L161 132 L138 132 Z",
      "M120 14 L120 34",
      "M144 14 L144 34",
    ],
    stitches: ["M112 148 L160 148", "M100 38 L156 38"],
    bartacks: [
      [138, 100],
      [161, 100],
    ],
    notes: [
      { x: 150, y: 116, label: "CARGO POCKET" },
      { x: 136, y: 149, label: "REINFORCED HEM" },
    ],
  },
  bib: {
    outline: "M100 46 L128 46 L128 104 L154 106 L160 150 L152 232 L116 232 L106 152 L100 144",
    lines: [
      "M118 46 L124 6 L136 6 L130 46",
      "M106 60 L124 60 L124 82 L106 82 Z",
      "M100 104 L154 106",
      "M118 172 L152 172 L150 208 L118 208 Z",
    ],
    stitches: ["M116 224 L152 224", "M106 66 L124 66"],
    circles: [[141, 109, 2.2]],
    bartacks: [
      [106, 60],
      [124, 60],
    ],
    notes: [
      { x: 115, y: 71, label: "BIB POCKET" },
      { x: 136, y: 190, label: "KNEE PANEL" },
    ],
  },
  coverall: {
    outline:
      "M100 42 C112 42 120 36 122 26 L152 36 L186 68 L194 152 L170 156 L158 98 L156 130 L160 152 L152 236 L114 236 L104 152 L100 142",
    lines: [
      "M100 42 L106 22 L124 20 L122 32",
      "M100 46 L100 142",
      "M110 74 L134 74 L134 92 L110 92 Z",
      "M100 128 L156 130",
      "M193 140 L171 144",
    ],
    stitches: ["M114 226 L152 226", "M152 36 L158 98"],
    bartacks: [
      [110, 74],
      [134, 74],
    ],
    notes: [
      { x: 122, y: 82, label: "CHEST POCKET" },
      { x: 132, y: 129, label: "WAIST SEAM" },
    ],
  },
};

function Half({ f }: { f: Flat }) {
  return (
    <>
      <path d={f.outline} fill="currentColor" fillOpacity={0.07} stroke="none" />
      <path
        d={f.outline}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {f.lines.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.7}
          strokeWidth={1}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {f.stitches.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          className="stitch"
          style={{ stroke: "var(--stitch, var(--green-deep))" }}
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {f.circles?.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
      {f.bartacks?.map(([x, y], i) => (
        <path
          key={i}
          d={`M${x - 3} ${y - 1.6}h6M${x - 3} ${y}h6M${x - 3} ${y + 1.6}h6`}
          fill="none"
          style={{ stroke: "var(--stitch, var(--green-deep))" }}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}

export function GarmentFlat({
  kind,
  className = "",
  showNotes = true,
  title,
  children,
  alwaysNotes = false,
}: {
  kind: GarmentKind;
  className?: string;
  showNotes?: boolean;
  title?: string;
  children?: ReactNode;
  alwaysNotes?: boolean;
}) {
  const f = flats[kind];
  return (
    <svg
      viewBox="-6 0 296 240"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Half f={f} />
      <g transform="translate(200 0) scale(-1 1)">
        <Half f={f} />
      </g>
      {children}
      {showNotes && (
        <g className={alwaysNotes ? "opacity-100" : "opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"}>
          {f.notes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={1.8} fill="var(--stitch, var(--green-deep))" />
              <path
                d={`M${n.x} ${n.y} L${n.y > 0 ? 214 : 214} ${n.y}`}
                stroke="currentColor"
                strokeOpacity={0.55}
                strokeWidth={0.6}
                vectorEffect="non-scaling-stroke"
                fill="none"
              />
              <text
                x={217}
                y={n.y + 2}
                fill="currentColor"
                fontSize={5.6}
                letterSpacing={0.5}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {n.label}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
