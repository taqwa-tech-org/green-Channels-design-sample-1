import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { RfqForm } from "@/components/RfqForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Send Green Channels your tech pack: request a quotation, upload specifications and reference images, and start a professional clothing programme.",
  alternates: { canonical: "/start-a-project" },
};

const next = [
  ["We review", "Your enquiry and tech pack are read by the team who would run the programme."],
  ["We respond", "You receive questions and a development plan, not a form letter."],
  ["We agree", "Samples, specification and quotation are settled before anything goes into production."],
];

export default function StartProjectPage() {
  return (
    <>
      <PageHero
        eyebrow="Request for quotation"
        lines={[{ text: "Start a" }, { text: "project.", className: "italic text-sage" }]}
        intro={<p>Tell us the garment, the quantity and the delivery you are aiming for, then attach your tech pack or references.</p>}
      />

      <section className="grain relative bg-ivory py-20 md:py-28">
        <div className="relative mx-auto grid max-w-[1520px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-96" />}>
              <RfqForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow text-moss">What happens next</p>
                <ol className="mt-6 divide-y divide-[var(--line-light)] border-y border-[var(--line-light)]">
                  {next.map(([t, d], i) => (
                    <li key={t} className="flex gap-5 py-6">
                      <span className="font-display text-3xl italic text-moss/50">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-display text-[1.5rem] leading-tight">{t}</h3>
                        <p className="mt-2 text-[14.5px] leading-[1.65] text-ink/70">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-10 bg-forest p-7 text-ivory">
                  <p className="eyebrow text-sage">Prefer to talk?</p>
                  <p className="mt-3 text-[15px] leading-relaxed">
                    <a className="hover:text-green" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    <br />
                    WhatsApp {site.whatsapp}
                  </p>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
