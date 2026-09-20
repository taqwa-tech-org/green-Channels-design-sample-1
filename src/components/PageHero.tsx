import type { ReactNode } from "react";
import { Lines, Reveal, type Line } from "./Reveal";
import { Eyebrow } from "./SectionHead";

/** Dark opening band for inner pages: twill texture, serif title, hairline thread. */
export function PageHero({
  eyebrow,
  lines,
  intro,
  children,
}: {
  eyebrow: string;
  lines: Line[];
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-20 pt-40 text-ivory md:pb-28 md:pt-52">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(115deg,rgb(245_241_232/0.035)_0_1px,transparent_1px_7px)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-0 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(47_191_107/0.2),transparent)]"
      />
      <div className="grain-dark absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-[1520px] px-5 md:px-10">
        <Reveal>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="h-display mt-8 text-[clamp(2.75rem,7vw,6.5rem)]">
          <Lines immediate delay={0.1} lines={lines} />
        </h1>
        {intro && (
          <Reveal delay={0.5}>
            <div className="mt-10 max-w-[40rem] text-[1.0625rem] leading-[1.7] text-ivory/75 md:text-lg">
              {intro}
            </div>
          </Reveal>
        )}
        {children}
      </div>

      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 1"
      >
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--thread)" strokeWidth="1" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" opacity="0.4" className="dash-run" />
      </svg>
    </section>
  );
}
