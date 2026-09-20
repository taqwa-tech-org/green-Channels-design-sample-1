"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { certifications, partnerUnits, type PartnerUnit } from "@/lib/content";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

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
      className={`eyebrow border px-3.5 py-2.5 transition-colors duration-300 ${
        active
          ? "border-ink bg-ink text-ivory"
          : "border-[var(--line-light)] text-ink/70 hover:border-ink/50 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function PartnerCard({ u }: { u: PartnerUnit }) {
  const [flipped, setFlipped] = useState(false);
  const verified = u.status === "Verified";
  const face = "absolute inset-0 flex flex-col justify-between border border-[var(--line-light)] bg-ivory p-6";
  const hide = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-[26rem]"
      style={{ perspective: 1400 }}
    >
      <div
        className="relative h-full w-full transition-transform duration-[900ms] ease-[var(--ease-out-expo)]"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className={face} style={hide} aria-hidden={flipped}>
          <div>
            <div className="eyebrow flex items-start justify-between text-moss">
              <span>Partner unit {u.id}</span>
              <span className="border border-[var(--line-light)] px-2 py-1 text-[10px]">Illustrative</span>
            </div>
            <h3 className="font-display mt-6 text-[2rem] leading-none tracking-[-0.01em]">{u.title}</h3>
            <p className="eyebrow mt-2 text-moss">{u.type} · Location withheld</p>

            <dl className="mt-7 space-y-5 text-[14px]">
              <div>
                <dt className="eyebrow text-moss">Specialisation</dt>
                <dd className="mt-1.5 text-ink/85">{u.specialisation.join(" · ")}</dd>
              </div>
              <div>
                <dt className="eyebrow text-moss">Certifications</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {u.certs.map((c) => (
                    <span
                      key={c}
                      className={`eyebrow border px-2 py-1 text-[10px] ${
                        verified ? "border-green-deep/50 text-green-deep" : "border-[var(--line-light)] text-moss"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </dd>
                <dd className="mt-2.5 flex gap-2 text-[12.5px] leading-snug text-moss">
                  <span aria-hidden="true">▸</span>
                  Held by this partner factory. Verified per programme.
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col items-start gap-3 border-t border-[var(--line-light)] pt-4">
            <span className="eyebrow flex items-center gap-2 text-ink/80">
              <span className={`h-2 w-2 ${verified ? "bg-green-deep" : "border border-moss"}`} aria-hidden="true" />
              {u.status}
            </span>
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="eyebrow text-ink underline decoration-green decoration-2 underline-offset-[6px] hover:text-green-deep"
              tabIndex={flipped ? -1 : 0}
            >
              Verification record ↻
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className={`${face} bg-forest text-ivory`}
          style={{ ...hide, transform: "rotateY(180deg)" }}
          aria-hidden={!flipped}
        >
          <div>
            <p className="eyebrow flex items-center justify-between text-sage">
              <span>Verification record</span>
              <span>Unit {u.id}</span>
            </p>
            <ul className="mt-6 divide-y divide-[var(--line-dark)] text-[14px]">
              {[
                ["Certificate on file", verified ? "Yes — illustrative" : "Awaiting document"],
                ["Scope", verified ? "Per programme" : "—"],
                ["Reviewed by Green Channels", verified ? "Yes — illustrative" : "Not yet"],
                ["Shown on the website", verified ? "Yes, with the factory named as holder" : "No, until verified"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-sage">{k}</span>
                  <span className="text-right text-ivory">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[12.5px] leading-relaxed text-sage">
              Green Channels coordinates testing and verification between the factory, the laboratory
              and you. It does not issue certificates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="eyebrow self-start text-ivory underline decoration-green decoration-2 underline-offset-[6px] hover:text-green"
            tabIndex={flipped ? 0 : -1}
          >
            ↺ Back to unit
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function PartnerNetwork({
  showHead = true,
  eyebrow = "05 — Partner network & responsible sourcing",
}: {
  showHead?: boolean;
  eyebrow?: string;
}) {
  const [type, setType] = useState<"All" | "Knit" | "Woven">("All");
  const [cert, setCert] = useState<string | null>(null);

  const usedCerts = useMemo(() => Array.from(new Set(partnerUnits.flatMap((u) => u.certs))), []);
  const list = partnerUnits.filter((u) => (type === "All" || u.type === type) && (!cert || u.certs.includes(cert)));

  return (
    <section id="network" className="grain relative bg-ivory py-24 md:py-36">
      <div className="relative mx-auto max-w-[1520px] px-5 md:px-10">
        {showHead && (
          <SectionHead
            eyebrow={eyebrow}
            lines={[{ text: "A network," }, { text: "not a factory.", className: "italic" }]}
            intro={
              <p>
                Green Channels works through a long-established network of partner factories, chosen
                for each garment and programme. Certifications belong to those factories. We show
                them only once verified, and always with their holder named.
              </p>
            }
          />
        )}

        <Reveal className="mt-14 flex flex-col gap-6 border-t border-[var(--line-light)] pt-8 md:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-3 text-moss">Category</span>
            {(["All", "Knit", "Woven"] as const).map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>
                {t}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-3 text-moss">Certification</span>
            <Chip active={cert === null} onClick={() => setCert(null)}>
              Any
            </Chip>
            {usedCerts.map((c) => (
              <Chip key={c} active={cert === c} onClick={() => setCert(cert === c ? null : c)}>
                {c}
              </Chip>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {list.map((u) => (
              <PartnerCard key={u.id} u={u} />
            ))}
          </AnimatePresence>
          {list.length === 0 && (
            <p className="eyebrow col-span-full border border-dashed border-[var(--line-light)] p-10 text-center text-moss">
              No illustrative unit matches this filter.
            </p>
          )}
        </div>

        <Reveal className="mt-14 grid gap-8 border-t border-[var(--line-light)] pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-moss">Certifications present in the network</p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">
              Held by partner factories and varying by factory and programme. These are not
              certifications of Green Channels itself.
            </p>
          </div>
          <ul className="flex flex-wrap content-start items-start gap-2 self-start lg:col-span-8 lg:justify-end">
            {certifications.map((c) => (
              <li key={c} className="eyebrow border border-[var(--line-light)] px-3.5 py-2.5 text-ink/80">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="eyebrow mt-8 text-moss">
          Units shown are illustrative, not real data. The mechanism is the point: nothing is displayed
          until it has been verified.
        </p>
      </div>
    </section>
  );
}
