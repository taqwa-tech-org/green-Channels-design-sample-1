"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { certifications, partnerUnits, type PartnerUnit } from "@/lib/content";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

/* Readability rules for this section: sentence case, sans-serif, nothing under 14px,
   44px tap targets, and state is never shown by colour alone. */

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 4.75V8l2.25 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center gap-2 border px-4 text-[0.9375rem] font-medium transition-colors duration-200 ${
        active
          ? "border-ink bg-ink text-ivory"
          : "border-ink/25 bg-white/50 text-ink hover:border-ink/70 hover:bg-white"
      }`}
    >
      {active && <CheckIcon className="shrink-0" />}
      {children}
    </button>
  );
}

function StatusBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center gap-2 bg-green-deep/12 px-3 py-1.5 text-[0.9375rem] font-semibold text-[#0d5c33]">
      <CheckIcon />
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 bg-thread/55 px-3 py-1.5 text-[0.9375rem] font-semibold text-[#5a4408]">
      <ClockIcon />
      Pending verification
    </span>
  );
}

function PartnerCard({ u }: { u: PartnerUnit }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const verified = u.status === "Verified";

  const record: [string, string][] = [
    ["Certificate on file", verified ? "Yes" : "Waiting for the document"],
    ["Covers", verified ? "This programme" : "Not known yet"],
    ["Checked by Green Channels", verified ? "Yes" : "Not yet"],
    ["Shown on this website", verified ? "Yes, with the factory named as holder" : "No, hidden until verified"],
  ];

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col border border-ink/20 bg-white/55 p-6"
    >
      <div>
        <StatusBadge verified={verified} />
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        <p className="text-[0.9375rem] text-ink/70">Partner unit {u.id}</p>
        <span className="border border-dashed border-ink/35 px-2 py-0.5 text-[0.875rem] text-ink/70">Example only</span>
      </div>
      <h3 className="font-display mt-2 text-[1.75rem] leading-tight tracking-[-0.01em]">{u.title}</h3>
      <p className="mt-1.5 text-[0.9375rem] text-ink/70">
        {u.type} · Location not shown
      </p>

      <div className="mt-6">
        <h4 className="text-[0.9375rem] font-semibold text-ink">What it makes</h4>
        <ul className="mt-2 space-y-1 text-base text-ink/85">
          {u.specialisation.map((s) => (
            <li key={s} className="flex gap-2.5">
              <span className="mt-[0.7em] h-1 w-1 shrink-0 bg-green-deep" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-[0.9375rem] font-semibold text-ink">Certifications held by this factory</h4>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {u.certs.map((c) => (
            <li
              key={c}
              className={`px-3 py-1.5 text-[0.9375rem] font-medium ${
                verified
                  ? "border border-green-deep/60 bg-green-deep/8 text-[#0d5c33]"
                  : "border border-dashed border-ink/40 text-ink/80"
              }`}
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.9375rem] leading-snug text-ink/75">
          {verified
            ? "We have checked these documents for this programme."
            : "Not shown as certified until we have checked the documents."}
        </p>
      </div>

      <div className="mt-6 border-t border-ink/15 pt-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group inline-flex min-h-11 w-full items-center justify-between gap-3 text-left text-base font-semibold text-ink"
        >
          <span className="underline decoration-green decoration-2 underline-offset-[6px] group-hover:text-green-deep">
            {open ? "Hide verification details" : "See verification details"}
          </span>
          <svg
            viewBox="0 0 16 16"
            width="18"
            height="18"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path d="m3.5 6 4.5 4.5L12.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-[0.875rem] text-ink/70">Example record, not real data.</p>
              <dl className="mt-2 divide-y divide-ink/12">
                {record.map(([k, v]) => (
                  <div key={k} className="py-3">
                    <dt className="text-[0.875rem] text-ink/70">{k}</dt>
                    <dd className="mt-0.5 flex items-start gap-2 text-base font-medium text-ink">
                      {verified ? (
                        <CheckIcon className="mt-1 shrink-0 text-green-deep" />
                      ) : (
                        <ClockIcon className="mt-1 shrink-0 text-[#7a5c0c]" />
                      )}
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 bg-ink/5 p-3 text-[0.9375rem] leading-relaxed text-ink/80">
                Green Channels coordinates testing and verification between the factory, the laboratory and
                you. It does not issue certificates.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

const steps = [
  {
    n: "1",
    title: "Choose what you need",
    text: "Filter by garment type or by a certification.",
  },
  {
    n: "2",
    title: "Read the cards",
    text: "Each card is one partner factory: what it makes and which certifications it holds.",
  },
  {
    n: "3",
    title: "Check the status",
    text: "“Verified” means we have checked the documents. “Pending” means we are still waiting, so it is not shown as certified.",
  },
];

export function PartnerNetwork({
  showHead = true,
  eyebrow = "05 — Partner network & responsible sourcing",
}: {
  showHead?: boolean;
  eyebrow?: string;
}) {
  const [type, setType] = useState<"All" | "Knit" | "Woven">("All");
  const [cert, setCert] = useState<string | null>(null);
  const typeLabelId = useId();
  const certLabelId = useId();

  const usedCerts = useMemo(() => Array.from(new Set(partnerUnits.flatMap((u) => u.certs))), []);
  const list = partnerUnits.filter((u) => (type === "All" || u.type === type) && (!cert || u.certs.includes(cert)));
  const filtered = type !== "All" || cert !== null;
  const reset = () => {
    setType("All");
    setCert(null);
  };

  return (
    <section id="network" className="grain relative bg-ivory py-24 md:py-36">
      <div className="relative mx-auto max-w-[1520px] px-5 md:px-10">
        {showHead && (
          <SectionHead
            eyebrow={eyebrow}
            eyebrowLarge
            lines={[{ text: "A network," }, { text: "not a factory.", className: "italic" }]}
            intro={
              <p className="text-[1.125rem] leading-[1.65] text-ink/80">
                Green Channels works through a long-established network of partner factories, chosen
                for each garment and programme. Certifications belong to those factories. We show
                them only once verified, and always with their holder named.
              </p>
            }
          />
        )}

        {/* How to read this section */}
        <Reveal className="mt-14 border-t border-ink/15 pt-10 md:mt-20">
          <h3 className="text-[1.125rem] font-semibold">How to read this section</h3>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4 border border-ink/15 bg-white/45 p-5">
                <span
                  className="font-display flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-[1.125rem] text-ivory"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div>
                  <p className="text-base font-semibold">
                    <span className="sr-only">Step {s.n}: </span>
                    {s.title}
                  </p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Filters */}
        <Reveal className="mt-8 border border-ink/15 bg-white/45 p-5 md:p-6">
          <div className="space-y-5">
            <div
              role="group"
              aria-labelledby={typeLabelId}
              className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6"
            >
              <p id={typeLabelId} className="text-base font-semibold lg:w-44 lg:shrink-0">
                Garment type
              </p>
              <div className="flex flex-wrap gap-2">
                {(["All", "Knit", "Woven"] as const).map((t) => (
                  <Chip key={t} active={type === t} onClick={() => setType(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="border-t border-ink/12" />

            <div
              role="group"
              aria-labelledby={certLabelId}
              className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6"
            >
              <p id={certLabelId} className="text-base font-semibold lg:w-44 lg:shrink-0">
                Certification
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip active={cert === null} onClick={() => setCert(null)}>
                  Any
                </Chip>
                {usedCerts.map((c) => (
                  <Chip key={c} active={cert === c} onClick={() => setCert(cert === c ? null : c)}>
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Result summary */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3" aria-live="polite">
          <p className="text-base text-ink/85">
            Showing <strong className="font-semibold text-ink">{list.length}</strong> of {partnerUnits.length}{" "}
            example partner units
            {type !== "All" && <> · {type}</>}
            {cert && <> · {cert}</>}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center text-base font-semibold text-ink underline decoration-green decoration-2 underline-offset-[6px] hover:text-green-deep"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Cards */}
        <div className="mt-4 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((u) => (
              <PartnerCard key={u.id} u={u} />
            ))}
          </AnimatePresence>
          {list.length === 0 && (
            <div className="col-span-full border border-dashed border-ink/30 p-10 text-center">
              <p className="text-[1.125rem] font-medium">No example unit matches these filters.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-3 inline-flex min-h-11 items-center bg-ink px-5 text-base font-medium text-ivory hover:bg-forest"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Certifications present in the network (reference list, not filters) */}
        <Reveal className="mt-14 grid gap-6 border-t border-ink/15 pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h3 className="text-[1.125rem] font-semibold">Certifications found across the network</h3>
            <p className="mt-2 text-base leading-relaxed text-ink/80">
              These are held by partner factories and vary by factory and programme.{" "}
              <strong className="font-semibold text-ink">They are not certifications of Green Channels itself.</strong>
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-7">
            {certifications.map((c) => (
              <li key={c} className="bg-ink/6 px-3.5 py-2 text-[0.9375rem] font-medium text-ink/85">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-8 max-w-3xl text-[0.9375rem] leading-relaxed text-ink/70">
          The units above are examples, not real data. They show how it will work: nothing is displayed as
          certified until it has been verified.
        </p>
      </div>
    </section>
  );
}
