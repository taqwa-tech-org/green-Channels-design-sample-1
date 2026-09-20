"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { Lines } from "./Reveal";
import { Button, TextLink } from "./Button";
import { credentials } from "@/lib/content";

const FabricCanvas = dynamic(() => import("./FabricCanvas"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-ivory">
      {/* Fallback while WebGL loads, or where it is unavailable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_75%_35%,#0f3626_0%,#08170f_55%,#06120e_100%)]"
      />
      <FabricCanvas
        still={!!reduce}
        seamX={0.75}
        className="absolute inset-0 -z-10"
      />
      {/* Legibility veils */}
      <div aria-hidden="true" className="absolute inset-0 -z-[5] bg-gradient-to-r from-ink via-ink/80 to-ink/30 md:via-ink/55 md:to-ink/0" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-[5] h-[55%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-[5] h-40 bg-gradient-to-b from-ink/80 to-transparent" />

      <div className="mx-auto flex min-h-[100svh] max-w-[1520px] flex-col justify-end px-5 pb-0 pt-28 md:px-10 lg:pt-28">
        <div className="max-w-[1180px]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="eyebrow mb-6 flex items-center gap-3 text-sage"
          >
            <span className="h-2 w-2 bg-green" aria-hidden="true" />
            <span>
              Specialist buying house · Dhaka<span className="hidden sm:inline">, Bangladesh</span>
            </span>
          </motion.p>

          <h1 className="h-display text-[clamp(1.95rem,6.3vw,6.4rem)]">
            <Lines
              immediate
              delay={0.25}
              lines={[
                { text: "Workwear, corporate wear" },
                { text: "and uniforms." },
                { text: "Developed, sourced and", className: "italic text-sage" },
                { text: "controlled in Bangladesh.", className: "italic text-sage" },
              ]}
            />
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="mt-8 max-w-[46rem] text-[1.0625rem] leading-[1.65] text-ivory/80 md:text-[1.0625rem] lg:mt-9"
          >
            Green Channels is a specialist buying house for professional clothing programmes. We
            develop the product, source fabric and trims, run sampling, select the factory, follow
            production and control quality — through to shipment. 35+ years on your side of the
            table.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.15 }}
            className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10 lg:mt-9"
          >
            <Button href="/start-a-project" tone="light">
              Send Us Your Tech Pack
            </Button>
            <TextLink href="#process">See How We Work</TextLink>
          </motion.div>
        </div>

        <div className="relative mt-10 lg:mt-11">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.8 }}
            className="eyebrow absolute -top-8 right-0 hidden items-center gap-3 text-sage/80 lg:flex"
          >
            <span aria-hidden="true" className="scroll-cue inline-block h-3 w-px bg-sage/70" />
            Fig. 01 — Twill, topstitched seam · move your cursor
          </motion.p>
        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.35 }}
          className="grid grid-cols-2 border-t border-[var(--line-dark)] lg:grid-cols-4"
        >
          {credentials.map((c, i) => (
            <div
              key={c.label}
              className={`py-4 pr-4 ${i % 2 === 1 ? "pl-5" : ""} ${i > 0 ? "lg:border-l lg:border-[var(--line-dark)] lg:pl-8" : ""} ${i === 1 || i === 3 ? "border-l border-[var(--line-dark)] lg:border-l" : ""} ${i >= 2 ? "border-t border-[var(--line-dark)] lg:border-t-0" : ""}`}
            >
              <dt className="eyebrow text-sage">{c.label}</dt>
              <dd className="mt-3">
                <span className="font-display block text-[1.5rem] leading-tight text-ivory md:text-[1.75rem]">
                  {c.value}
                </span>
                <span className="mt-1 block text-[13.5px] text-sage">{c.detail}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
        </div>
      </div>
    </section>
  );
}
