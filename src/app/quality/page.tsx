import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QualityStages } from "@/components/QualityStages";
import { Reveal } from "@/components/Reveal";
import { TechPackCta } from "@/components/TechPackCta";

export const metadata: Metadata = {
  title: "Quality control",
  description:
    "Seven inspection stages, from pre-production review to shipment approval, with testing and verification coordinated between the factory, the laboratory and the buyer.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        lines={[{ text: "Inspection at" }, { text: "every stage.", className: "italic text-sage" }]}
        intro={
          <p>
            Quality is not a check at the end. It is a sequence: seven defined stages that follow the
            garment from the specification to the closed carton.
          </p>
        }
      />
      <QualityStages />

      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-[1520px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-moss">Testing &amp; verification</p>
            <h2 className="h-section mt-5">
              Coordinated, <em>not claimed.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[1.0625rem] leading-[1.75] text-ink/75">
              Where specific testing, certification or third-party conformity assessment is required,
              it is handled with the appropriate factory, laboratory or testing organisation and,
              where applicable, the buyer. Green Channels coordinates that process. It does not issue
              certificates or declarations of conformity.
            </p>
          </Reveal>
        </div>
      </section>

      <TechPackCta />
    </>
  );
}
