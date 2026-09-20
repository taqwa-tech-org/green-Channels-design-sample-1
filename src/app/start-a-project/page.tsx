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
                <h2 className="text-[1.25rem] font-semibold">What happens next</h2>
                <ol className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
                  {next.map(([t, d], i) => (
                    <li key={t} className="flex gap-4 py-6">
                      <span
                        className="font-display flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-[1.125rem] text-ivory"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.5rem] leading-tight">
                          <span className="sr-only">Step {i + 1}: </span>
                          {t}
                        </h3>
                        <p className="mt-2 text-base leading-[1.65] text-ink/80">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 bg-forest p-7 text-ivory">
                  <h2 className="text-[1.25rem] font-semibold">Prefer to talk?</h2>
                  <dl className="mt-4 space-y-4 text-[1.0625rem]">
                    <div>
                      <dt className="text-[0.9375rem] text-sage">Email</dt>
                      <dd className="mt-0.5">
                        <a className="break-all underline decoration-green decoration-2 underline-offset-4 hover:text-green" href={`mailto:${site.email}`}>
                          {site.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.9375rem] text-sage">WhatsApp</dt>
                      <dd className="mt-0.5">
                        <a
                          className="underline decoration-green decoration-2 underline-offset-4 hover:text-green"
                          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {site.whatsapp}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
