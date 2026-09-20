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

      <div className="mx-auto flex min-h-[100svh] max-w-[1520px] flex-col justify-end px-5 pb-0 pt-28 md:px-10">
        <div className="max-w-[980px]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="eyebrow eyebrow-lg mb-8 flex items-center gap-3 text-sage"
          >
            <span className="h-2 w-2 bg-green" aria-hidden="true" />
            <span>
              Specialist buying house · Dhaka<span className="hidden sm:inline">, Bangladesh</span>
            </span>
          </motion.p>

          {/* One headline, two levels: the offer is large, the promise sits beneath it as a calmer subtitle. */}
          <h1 className="h-display text-[clamp(1.95rem,5.4vw,5.25rem)]">
            <Lines
              immediate
              delay={0.25}
              lines={[{ text: "Workwear, corporate wear" }, { text: "and uniforms." }]}
            />
            <Lines
              immediate
              delay={0.6}
              className="mt-6 text-[clamp(1.25rem,2.2vw,2.125rem)] italic leading-[1.25] tracking-[0.005em] text-sage md:mt-8"
              lines={[{ text: "Developed, sourced and controlled in Bangladesh." }]}
            />
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="mt-9 max-w-[36rem] text-[1.125rem] leading-[1.7] text-ivory/80 md:mt-10"
          >
            We develop the product, source fabric and trims, run sampling, select the factory, follow
            production and control quality, through to shipment. 35+ years on your side of the table.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.15 }}
            className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
          >
            <Button href="/start-a-project" tone="light">
              Send Us Your Tech Pack
            </Button>
            <TextLink href="#process">See How We Work</TextLink>
          </motion.div>
        </div>

        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.35 }}
          className="mt-14 grid grid-cols-2 border-t border-[var(--line-dark)] lg:mt-20 lg:grid-cols-4"
        >
          {credentials.map((c, i) => (
            <div
              key={c.label}
              className={`py-6 pr-4 ${i % 2 === 1 ? "pl-5" : ""} ${i > 0 ? "lg:border-l lg:border-[var(--line-dark)] lg:pl-8" : ""} ${i === 1 || i === 3 ? "border-l border-[var(--line-dark)] lg:border-l" : ""} ${i >= 2 ? "border-t border-[var(--line-dark)] lg:border-t-0" : ""}`}
            >
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <span className="font-display block text-[1.375rem] leading-tight text-ivory md:text-[1.625rem]">
                  {c.value}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] text-sage">{c.detail}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
