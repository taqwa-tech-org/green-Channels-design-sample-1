import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "light" | "dark" | "outline-light" | "outline-dark";

const tones: Record<Tone, { base: string; sweep: string }> = {
  light: { base: "bg-ivory text-ink", sweep: "bg-green" },
  dark: { base: "bg-ink text-ivory", sweep: "bg-green-deep" },
  "outline-light": {
    base: "border border-[var(--line-dark)] text-ivory hover:border-ivory/60",
    sweep: "bg-ivory/10",
  },
  "outline-dark": {
    base: "border border-[var(--line-light)] text-ink hover:border-ink/60",
    sweep: "bg-ink/5",
  },
};

function Arrow({ dir = "right" }: { dir?: "right" | "down" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-500 ${
        dir === "right" ? "group-hover:translate-x-1" : "group-hover:translate-y-1"
      }`}
    >
      <path
        d={dir === "right" ? "M2 9h13M10 4l5 5-5 5" : "M9 2v13M4 10l5 5 5-5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Button({
  href,
  children,
  tone = "light",
  arrow = "right",
  className = "",
  type,
  onClick,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  tone?: Tone;
  arrow?: "right" | "down" | null;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const t = tones[tone];
  const cls = `group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden px-8 text-[15px] font-medium tracking-[0.01em] transition-colors duration-500 ${t.base} ${className} ${disabled ? "pointer-events-none opacity-50" : ""}`;
  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${t.sweep}`}
      />
      <span className="relative z-10 inline-flex items-center gap-3">
        {children}
        {arrow && <Arrow dir={arrow} />}
      </span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

export function TextLink({
  href,
  children,
  tone = "light",
  arrow = "down",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  arrow?: "right" | "down" | null;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[15px] font-medium ${
        tone === "light" ? "text-ivory" : "text-ink"
      }`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={`absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-500 group-hover:scale-x-0 ${
            tone === "light" ? "bg-ivory/70" : "bg-ink/70"
          }`}
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-green transition-transform delay-100 duration-500 group-hover:scale-x-100"
        />
      </span>
      {arrow && <Arrow dir={arrow} />}
    </Link>
  );
}
