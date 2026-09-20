import type { ReactNode } from "react";
import { Reveal, Lines, type Line } from "./Reveal";

export function Eyebrow({
  children,
  tone = "light",
  large = false,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  large?: boolean;
}) {
  return (
    <p className={`eyebrow ${large ? "eyebrow-lg" : ""} flex items-center gap-3 ${tone === "dark" ? "text-sage" : "text-moss"}`}>
      <span className="h-2 w-2 bg-green" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  eyebrowLarge = false,
  lines,
  intro,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  eyebrowLarge?: boolean;
  lines: Line[];
  intro?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:gap-12 ${className}`}>
      <div className="lg:col-span-7">
        <Reveal>
          <Eyebrow tone={tone} large={eyebrowLarge}>{eyebrow}</Eyebrow>
        </Reveal>
        <h2 className="h-section mt-6">
          <Lines lines={lines} />
        </h2>
      </div>
      {intro && (
        <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <div className={`text-[1.0625rem] leading-[1.7] ${tone === "dark" ? "text-ivory/75" : "text-ink/70"}`}>
            {intro}
          </div>
        </Reveal>
      )}
    </div>
  );
}
