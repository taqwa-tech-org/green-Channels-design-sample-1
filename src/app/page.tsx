import { Hero } from "@/components/Hero";
import { GarmentGrid } from "@/components/GarmentGrid";
import { SectionHead } from "@/components/SectionHead";
import { ProcessRail } from "@/components/ProcessRail";
import { QualityStages } from "@/components/QualityStages";
import { PartnerNetwork } from "@/components/PartnerNetwork";
import { AlsoSourced, TechPackCta } from "@/components/TechPackCta";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="garments" className="grain relative bg-ivory py-24 md:py-36">
        <div className="relative mx-auto max-w-[1520px] px-5 md:px-10">
          <SectionHead
            eyebrow="02 — What we make"
            lines={[{ text: "We know how" }, { text: "workwear is built.", className: "italic" }]}
            intro={
              <p>
                Professional clothing programmes, developed garment by garment: fabric, trims,
                construction and fit specified with you before production begins.
              </p>
            }
          />
          <div className="mt-16 md:mt-24">
            <GarmentGrid />
            <p className="eyebrow mt-5 text-moss">
              Drawings and descriptors are indicative and will be confirmed with Green Channels.
            </p>
          </div>
        </div>
      </section>

      <ProcessRail />
      <QualityStages />
      <PartnerNetwork />
      <AlsoSourced />
      <TechPackCta />
    </>
  );
}
