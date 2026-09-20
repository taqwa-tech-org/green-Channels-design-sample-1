"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { GarmentFlat } from "./GarmentFlat";
import { Reveal } from "./Reveal";
import { garments, type Garment } from "@/lib/content";

function Tile({ g, i }: { g: Garment; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 110, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 110, damping: 16 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 110, damping: 16 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Reveal delay={(i % 3) * 0.08} className={`bg-ivory ${i === garments.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
      <Link
        ref={ref}
        href={`/workwear-uniforms#${g.slug}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative flex aspect-[4/4.7] flex-col justify-between overflow-hidden p-4 transition-colors duration-700 [--stitch:var(--green-deep)] hover:bg-forest hover:text-ivory hover:[--stitch:var(--thread)] focus-visible:bg-forest focus-visible:text-ivory md:p-6"
      >
        <div className="eyebrow flex items-start justify-between text-moss transition-colors duration-700 group-hover:text-sage">
          <span>{String(i + 1).padStart(2, "0")}</span>
          <span className="hidden sm:inline">{g.family}</span>
        </div>

        <motion.div
          style={{ rotateX: rx, rotateY: ry, x: tx, transformPerspective: 900 }}
          className="pointer-events-none absolute inset-x-3 top-[12%] bottom-[24%] flex items-center justify-center md:inset-x-5"
        >
          <GarmentFlat kind={g.kind} className="h-full w-full" />
        </motion.div>

        <div className="relative">
          <h3 className="font-display max-w-[calc(100%-3rem)] text-[1.2rem] leading-[1.05] tracking-[-0.01em] md:text-[1.9rem]">
            {g.name}
          </h3>
          <p className="eyebrow mt-3 hidden text-moss transition-colors duration-700 group-hover:text-sage md:block">
            {g.note}
          </p>
          <span className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center border border-current/25 transition-all duration-500 group-hover:border-green group-hover:bg-green group-hover:text-ink">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 14L14 4M6 4h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function GarmentGrid() {
  return (
    <div className="grid grid-cols-2 gap-px border-y border-[var(--line-light)] bg-[var(--line-light)] md:grid-cols-3">
      {garments.map((g, i) => (
        <Tile key={g.slug} g={g} i={i} />
      ))}
    </div>
  );
}
