"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { qcStages } from "@/lib/content";
import { GarmentFlat } from "./GarmentFlat";
import { Eyebrow } from "./SectionHead";
import { Reveal } from "./Reveal";

const mono = { fontFamily: "var(--font-mono)" } as const;

/** One marker per stage, drawn over the jacket flat. Coordinates match GarmentFlat. */
function Marker({ index }: { index: number }) {
  const g = { stroke: "var(--green-deep)", fill: "none", strokeWidth: 1.4, vectorEffect: "non-scaling-stroke" as const };
  const label = (x: number, y: number, t: string, anchor: "start" | "middle" | "end" = "start") => (
    <text x={x} y={y} fontSize={6} letterSpacing={0.6} textAnchor={anchor} fill="var(--green-deep)" style={mono}>
      {t}
    </text>
  );
  switch (index) {
    case 0:
      return (
        <g>
          <rect x={-2} y={8} width={204} height={212} strokeDasharray="4 3" {...g} />
          {[
            [-2, 8],
            [202, 8],
            [-2, 220],
            [202, 220],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.4} fill="var(--green-deep)" />
          ))}
          {label(206, 22, "SPEC ·")}
          {label(206, 30, "SAMPLE ·")}
          {label(206, 38, "TRIMS")}
        </g>
      );
    case 1:
      return (
        <g>
          <rect x={150} y={112} width={40} height={40} {...g} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M${150 + i * 6} 152 L${156 + i * 6 > 190 ? 190 : 156 + i * 6} ${i * 6 + 118 > 152 ? 152 : 118}`} {...g} strokeWidth={0.7} />
          ))}
          {label(206, 128, "SHADE ·")}
          {label(206, 136, "WEIGHT")}
        </g>
      );
    case 2:
      return (
        <g>
          <motion.circle cx={127} cy={94} r={22} {...g} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ transformOrigin: "127px 94px" }} />
          <circle cx={127} cy={94} r={2.6} fill="var(--green-deep)" />
          {label(206, 92, "FIRST PIECES")}
          {label(206, 100, "OFF THE LINE")}
        </g>
      );
    case 3:
      return (
        <g>
          <motion.rect
            x={150}
            width={16}
            height={26}
            {...g}
            fill="var(--green-deep)"
            fillOpacity={0.25}
            initial={{ y: 44 }}
            animate={{ y: [44, 186, 44] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {label(206, 126, "SEAMS ·")}
          {label(206, 134, "STITCHING")}
        </g>
      );
    case 4:
      return (
        <g>
          <path d="M44 118 H156" {...g} />
          <path d="M44 113 V123 M156 113 V123" {...g} />
          <path d="M-6 26 V212" {...g} />
          <path d="M-11 26 H-1 M-11 212 H-1" {...g} />
          {label(100, 112, "CHEST", "middle")}
          <text x={-9} y={120} fontSize={6} letterSpacing={0.6} fill="var(--green-deep)" style={mono} transform="rotate(-90 -9 120)" textAnchor="middle">
            LENGTH
          </text>
          {label(206, 118, "MEASURED")}
          {label(206, 126, "AGAINST SPEC")}
        </g>
      );
    case 5:
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const cx = 212 + (i % 3) * 22;
            const cy = 70 + Math.floor(i / 3) * 22;
            const hit = i === 4;
            return (
              <rect
                key={i}
                x={cx}
                y={cy}
                width={16}
                height={16}
                {...g}
                strokeWidth={hit ? 1.8 : 0.9}
                fill={hit ? "var(--green-deep)" : "none"}
                fillOpacity={hit ? 0.3 : 0}
              />
            );
          })}
          {label(212, 62, "CARTONS")}
          {label(212, 128, "RANDOM SAMPLE")}
        </g>
      );
    default:
      return (
        <g>
          <motion.circle cx={100} cy={122} r={30} {...g} strokeWidth={1.8} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 160, damping: 14 }} style={{ transformOrigin: "100px 122px" }} />
          <motion.path d="M86 122 L96 132 L116 110" {...g} strokeWidth={2.4} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.25 }} />
          {label(100, 168, "APPROVED FOR SHIPMENT", "middle")}
        </g>
      );
  }
}

export function QualityStages() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(qcStages.length - 1, Math.max(0, Math.floor(v * qcStages.length)));
    setActive((p) => (p === i ? p : i));
  });

  const s = qcStages[active];

  return (
    <section id="quality" ref={ref} className="relative bg-parchment lg:h-[560vh]">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Desktop: pinned inspection */}
      <div className="sticky top-0 hidden h-screen items-center overflow-hidden lg:flex">
        <div className="mx-auto grid w-full max-w-[1520px] grid-cols-12 items-center gap-10 px-10 pt-16">
          <div className="col-span-5">
            <Eyebrow>04 — Quality control · seven stages</Eyebrow>

            <div className="relative mt-8 min-h-[27rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="font-display block text-[9rem] italic leading-[0.8] text-transparent"
                    style={{ WebkitTextStroke: "1px rgb(6 18 14 / 0.4)" }}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-display mt-6 text-[3.2rem] leading-[1] tracking-[-0.02em] text-ink">{s.title}</h3>
                  <p className="mt-6 max-w-[28rem] text-[16.5px] leading-[1.7] text-ink/70">{s.text}</p>
                  <ul className="mt-7 space-y-2.5 border-t border-[var(--line-light)] pt-6">
                    {s.checks.map((c) => (
                      <li key={c} className="flex items-center gap-3 text-[14.5px] text-ink/80">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7.5L5.5 11L12 3" stroke="var(--green-deep)" strokeWidth="1.8" strokeLinecap="square" />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="mt-8 flex items-center gap-2" aria-label="Progress through the seven stages">
              {qcStages.map((q, i) => (
                <li key={q.n} className="h-1 flex-1 bg-ink/10">
                  <motion.span
                    className="block h-full bg-green-deep"
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-7">
            <div className="relative mx-auto aspect-[296/240] w-full max-w-[52rem] border border-[var(--line-light)] bg-ivory/60 p-8">
              <p className="eyebrow absolute left-4 top-4 text-moss">Inspection sheet · {s.label}</p>
              <p className="eyebrow absolute right-4 top-4 text-moss">Stage {s.n} / 07</p>
              <div className="absolute inset-x-8 inset-y-12 text-ink [--stitch:var(--green-deep)]">
                <GarmentFlat kind="jacket" showNotes={false} className="h-full w-full overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.g key={s.n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                      <Marker index={active} />
                    </motion.g>
                  </AnimatePresence>
                </GarmentFlat>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked stages */}
      <div className="relative px-5 py-24 md:px-10 lg:hidden">
        <Eyebrow>04 — Quality control · seven stages</Eyebrow>
        <h2 className="h-section mt-5">
          Inspection at <em>every stage</em>, not just at the end.
        </h2>
        <ol className="mt-14 divide-y divide-[var(--line-light)] border-y border-[var(--line-light)]">
          {qcStages.map((q) => (
            <Reveal key={q.n}>
              <li className="grid gap-4 py-8 md:grid-cols-[6rem_1fr]">
                <span className="font-display text-5xl italic text-moss/60">{q.n}</span>
                <div>
                  <h3 className="font-display text-[1.75rem] leading-tight">{q.title}</h3>
                  <p className="eyebrow mt-2 text-moss">{q.label}</p>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-ink/70">{q.text}</p>
                  <ul className="mt-4 space-y-1.5">
                    {q.checks.map((c) => (
                      <li key={c} className="flex items-center gap-3 text-[14.5px] text-ink/80">
                        <span className="h-1.5 w-1.5 bg-green-deep" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
