"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade-and-rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export type Line = { text: string; className?: string };

/** Headline revealed line by line from behind a mask. */
export function Lines({
  lines,
  delay = 0,
  className = "",
  immediate = false,
}: {
  lines: Line[];
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className={`block ${l.className ?? ""}`}
            initial={reduce ? false : { y: "108%" }}
            {...(immediate
              ? { animate: { y: 0 } }
              : { whileInView: { y: 0 }, viewport: { once: true, margin: "0px 0px -8% 0px" } })}
            transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.13 }}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
