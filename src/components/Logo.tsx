import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 40"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {[0, 10, 20, 30].map((x) => (
        <polygon key={x} points={`${x},40 ${x + 6},40 ${x + 22},0 ${x + 16},0`} />
      ))}
    </svg>
  );
}

export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const text = tone === "light" ? "text-ivory" : "text-ink";
  return (
    <Link
      href="/"
      aria-label="Green Channels — home"
      className={`group inline-flex shrink-0 items-center gap-2 md:gap-3 ${className}`}
    >
      <LogoMark
        className={`h-[17px] w-auto md:h-[22px] ${tone === "light" ? "text-green" : "text-green-deep"} transition-transform duration-500 group-hover:-skew-x-6`}
      />
      <span
        className={`font-display whitespace-nowrap text-[10.5px] font-medium uppercase tracking-[0.1em] md:text-[15px] md:tracking-[0.16em] ${text}`}
      >
        Green Channels
      </span>
    </Link>
  );
}
