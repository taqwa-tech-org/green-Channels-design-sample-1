"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { processSteps } from "@/lib/content";
import { Eyebrow } from "./SectionHead";
import { Reveal, Lines } from "./Reveal";

function Step({
  s,
  mark,
  progress,
  reduce,
}: {
  s: (typeof processSteps)[number];
  mark: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const light = useTransform(progress, [Math.max(0, mark - 0.09), mark + 0.01], [0.28, 1]);
  const lift = useTransform(progress, [Math.max(0, mark - 0.09), mark + 0.01], [18, 0]);
  return (
    <motion.li
      style={reduce ? undefined : { opacity: light, y: lift }}
      className="relative flex w-[min(78vw,30rem)] shrink-0 flex-col justify-between border-l border-[var(--line-dark)] pl-8 pr-6"
    >
      <div>
        <span
          className="font-display block text-[clamp(6rem,11vw,10rem)] italic leading-[0.85] text-transparent"
          style={{ WebkitTextStroke: "1px rgb(245 241 232 / 0.4)" }}
        >
          {s.n}
        </span>
        <h3 className="font-display mt-8 text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] tracking-[-0.01em] text-ivory">
          {s.title}
        </h3>
        <p className="mt-5 max-w-[24rem] text-[15.5px] leading-[1.7] text-ivory/70">{s.text}</p>
      </div>
      <p className="eyebrow mt-10 text-sage">
        Step {s.n} / {String(processSteps.length).padStart(2, "0")}
      </p>
    </motion.li>
  );
}

export function ProcessRail() {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0);
  const [marks, setMarks] = useState<number[]>(() => processSteps.map((_, i) => i / (processSteps.length - 1)));
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      const w = t.scrollWidth;
      const d = Math.max(0, w - window.innerWidth + 80);
      setDist(d);
      const items = Array.from(t.children) as HTMLElement[];
      setMarks(items.map((el) => Math.min(1, (el.offsetLeft + 40) / Math.max(w, 1))));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const x = useTransform(smooth, [0, 1], [0, -dist]);
  const needle = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const line = useTransform(smooth, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(processSteps.length - 1, Math.floor(v * processSteps.length));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <section id="process" ref={sectionRef} className="relative bg-forest text-ivory md:h-[430vh]">
      <div className="grain-dark pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Desktop: pinned, horizontal */}
      <div className="sticky top-0 hidden h-screen flex-col justify-between overflow-hidden pb-10 pt-28 md:flex">
        <div className="mx-auto flex w-full max-w-[1520px] items-end justify-between gap-10 px-10">
          <div>
            <Eyebrow tone="dark">03 — From concept to shipment</Eyebrow>
            <h2 className="h-section mt-5 text-ivory">
              <span className="block">One accountable team,</span>
              <span className="block italic text-sage">end to end.</span>
            </h2>
          </div>
          <p className="eyebrow hidden pb-3 text-sage lg:block">Scroll to follow the thread →</p>
        </div>

        <div className="relative flex-1 py-10">
          <motion.ul
            ref={trackRef}
            style={reduce ? undefined : { x }}
            className="absolute inset-y-10 left-0 flex pl-10"
          >
            {processSteps.map((s, i) => (
              <Step key={s.n} s={s} mark={marks[i] ?? i / 7} progress={smooth} reduce={reduce} />
            ))}
            <li aria-hidden="true" className="w-24 shrink-0" />
          </motion.ul>
        </div>

        {/* The thread */}
        <div className="relative mx-auto w-full max-w-[1520px] px-10">
          <div className="relative h-8">
            <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-[var(--line-dark)]" />
            <motion.div
              style={{ scaleX: reduce ? 1 : line }}
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-green"
            />
            <motion.span
              style={{ left: reduce ? "100%" : needle }}
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green shadow-[0_0_0_6px_rgb(47_191_107/0.18)]"
            />
          </div>
          <div className="eyebrow mt-3 flex justify-between text-sage">
            <span>Product development</span>
            <span>
              {String(active + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}
            </span>
            <span>Shipment</span>
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="relative px-5 py-24 md:hidden">
        <Eyebrow tone="dark">03 — From concept to shipment</Eyebrow>
        <h2 className="h-section mt-5 text-ivory">
          <Lines lines={[{ text: "One accountable team," }, { text: "end to end.", className: "italic text-sage" }]} />
        </h2>
        <ol className="relative mt-14 space-y-12 border-l border-dashed border-[var(--line-dark)] pl-8">
          {processSteps.map((s) => (
            <Reveal key={s.n}>
              <li className="relative">
                <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-green" aria-hidden="true" />
                <span className="eyebrow text-sage">Step {s.n}</span>
                <h3 className="font-display mt-2 text-[1.9rem] leading-tight">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-ivory/70">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
