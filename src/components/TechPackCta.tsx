import Link from "next/link";
import { Button } from "./Button";
import { Lines, Reveal } from "./Reveal";
import { Eyebrow } from "./SectionHead";
import { secondaryCapabilities, site } from "@/lib/content";

export function AlsoSourced() {
  return (
    <div className="border-t border-[var(--line-light)] bg-ivory">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:gap-10 md:px-10">
        <p className="eyebrow text-moss">Also sourced</p>
        <ul className="flex flex-wrap gap-x-10 gap-y-2">
          {secondaryCapabilities.map((c) => (
            <li key={c.id}>
              <Link
                href={`/capabilities#${c.id}`}
                className="font-display group inline-flex items-center gap-2 text-[1.35rem] text-ink/70 transition-colors hover:text-ink"
              >
                {c.title}
                <span aria-hidden="true" className="text-green-deep transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TechPackCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-ivory md:py-40">
      <div className="grain-dark absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(47_191_107/0.16),transparent)]"
      />
      <div className="relative mx-auto grid max-w-[1520px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow tone="dark">06 — Start a project</Eyebrow>
          </Reveal>
          <h2 className="h-section mt-6 text-[clamp(2.75rem,6.4vw,6rem)]">
            <Lines
              lines={[
                { text: "Send us your" },
                { text: "tech pack.", className: "italic text-sage" },
              ]}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-ivory/75">
              Tell us the garment, the quantity and the delivery you are aiming for. Upload a tech
              pack or a reference. We come back with a development plan, not a form letter.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Button href="/start-a-project" tone="light">
              Start a Project
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="text-[15px] text-ivory/70 underline decoration-green decoration-2 underline-offset-[7px] hover:text-ivory"
            >
              or write to {site.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5">
          <Link
            href="/start-a-project"
            className="group relative block aspect-[5/4] w-full text-ivory"
            aria-label="Go to the request-for-quotation form"
          >
            <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <rect
                x="2"
                y="2"
                width="496"
                height="396"
                fill="none"
                stroke="var(--thread)"
                strokeWidth="1.2"
                strokeDasharray="8 8"
                className="dash-run"
                opacity="0.55"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center transition-transform duration-700 group-hover:-translate-y-1">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="text-green">
                <path d="M22 30V8M13 17l9-9 9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                <path d="M6 30v6h32v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
              </svg>
              <p className="font-display text-[1.9rem] leading-tight">Drop your tech pack here</p>
              <p className="eyebrow text-sage">PDF · XLSX · JPG · PNG · ZIP · up to 10 MB each</p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
