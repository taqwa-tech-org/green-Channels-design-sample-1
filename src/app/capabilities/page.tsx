import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { PartnerNetwork } from "@/components/PartnerNetwork";
import { TechPackCta } from "@/components/TechPackCta";
import { processSteps, secondaryCapabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Product development, fabric and trim sourcing, sampling, factory selection, merchandising, production follow-up and quality control, through to shipment.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        lines={[{ text: "From the first sketch" }, { text: "to the last carton.", className: "italic text-sage" }]}
        intro={
          <p>
            Our strength is not limited to sourcing finished garments. It includes product
            development, fabric and trim sourcing, sampling, factory selection, merchandising,
            production follow-up and quality control.
          </p>
        }
      />

      <section className="grain relative bg-ivory py-24 md:py-36">
        <div className="relative mx-auto max-w-[1520px] px-5 md:px-10">
          <SectionHead
            eyebrow="01 — The service span"
            lines={[{ text: "One team," }, { text: "eight disciplines.", className: "italic" }]}
            intro={<p>Each programme moves through the same chain, with one accountable team on the buyer’s side of the table.</p>}
          />
          <ol className="mt-16 border-t border-[var(--line-light)] md:mt-24">
            {processSteps.map((s) => (
              <Reveal key={s.n}>
                <li className="grid gap-4 border-b border-[var(--line-light)] py-8 md:grid-cols-12 md:items-baseline md:gap-10 md:py-10">
                  <span className="font-display text-5xl italic text-moss/50 md:col-span-2 md:text-6xl">{s.n}</span>
                  <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight tracking-[-0.01em] md:col-span-5">
                    {s.title}
                  </h3>
                  <p className="text-[16px] leading-[1.7] text-ink/70 md:col-span-5">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-parchment py-24 md:py-32">
        <div className="mx-auto max-w-[1520px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-moss">02 — Also sourced</p>
            <h2 className="h-section mt-5">
              Beyond workwear, <em>without diluting it.</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-[var(--line-light)] bg-[var(--line-light)] md:grid-cols-2">
            {secondaryCapabilities.map((c) => (
              <Reveal key={c.id} className="bg-parchment">
                <article id={c.id} className="scroll-mt-28 p-8 md:p-12">
                  <p className="eyebrow text-moss">Secondary capability</p>
                  <h3 className="font-display mt-4 text-[2.4rem] leading-none tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-ink/70">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="eyebrow mt-6 max-w-2xl text-moss">
            Both are real, indexed pages so existing enquiries keep arriving. The structure lets either
            become its own division later with one new navigation item and no redesign.
          </p>
        </div>
      </section>

      <PartnerNetwork eyebrow="03 — Partner network" />
      <TechPackCta />
    </>
  );
}
