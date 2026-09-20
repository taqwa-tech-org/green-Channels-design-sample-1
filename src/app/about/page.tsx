import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TechPackCta } from "@/components/TechPackCta";
import { certifications, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Green Channels is a Bangladesh buying house with 35+ years of experience, working on the buyer’s side of the table for professional clothing programmes.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    n: "01",
    title: "On the buyer’s side of the table",
    text: "We work for the buyer, managing the chain rather than selling one factory’s capacity. That is what a buying house is for.",
  },
  {
    n: "02",
    title: "Development to shipment",
    text: "Product development, sourcing, sampling, factory selection, merchandising, production follow-up and quality control sit with one team.",
  },
  {
    n: "03",
    title: "A long-established network",
    text: "We work through partner factories selected for each garment and programme, not a single factory of our own.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Green Channels"
        lines={[{ text: "On your side" }, { text: "of the table.", className: "italic text-sage" }]}
        intro={
          <p>
            Green Channels is a buying house in Dhaka with more than 35 years of experience in
            Bangladesh, working with international apparel buyers on professional clothing
            programmes.
          </p>
        }
      />

      <section className="grain relative bg-ivory py-24 md:py-36">
        <div className="relative mx-auto max-w-[1520px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-moss">01 — How we work</p>
          </Reveal>
          <ol className="mt-10 grid border-y border-[var(--line-light)] md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <li className={`h-full p-8 md:p-10 ${i > 0 ? "border-t border-[var(--line-light)] md:border-l md:border-t-0" : ""}`}>
                  <span className="font-display text-5xl italic text-moss/50">{p.n}</span>
                  <h3 className="font-display mt-8 text-[1.9rem] leading-[1.05] tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-5 text-[15.5px] leading-[1.7] text-ink/70">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-parchment py-24 md:py-32">
        <div className="mx-auto grid max-w-[1520px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-moss">02 — Responsible sourcing</p>
            <h2 className="h-section mt-5">
              Claims are shown <em>only when verified.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[1.0625rem] leading-[1.75] text-ink/75">
              Our factory selection considers compliance, worker welfare and environmental practice.
              Certifications within the network — including {certifications.join(", ")} — are held by
              the partner factories themselves, vary by factory and programme, and are published on
              this website only after individual verification, always with their holder named.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-[1520px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-moss">03 — The team</p>
            <h2 className="h-section mt-5">
              The people <em>on the ground.</em>
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {["Managing Director", "Merchandising & production follow-up"].map((role, i) => (
              <Reveal key={role} delay={i * 0.1}>
                <div className="border border-dashed border-ink/25 p-8">
                  <div className="aspect-[4/5] bg-parchment" aria-hidden="true" />
                  <p className="eyebrow mt-5 text-moss">Placeholder</p>
                  <p className="font-display mt-2 text-[1.6rem] leading-tight">{role}</p>
                  <p className="mt-1 text-[14px] text-moss">Team details to be provided by Green Channels.</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-ivory">
        <div className="mx-auto grid max-w-[1520px] gap-10 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-sage">Contact</p>
            <p className="font-display mt-4 text-[2.2rem] leading-tight">Green Channels Ltd</p>
          </div>
          <address className="space-y-1 text-[15px] not-italic leading-relaxed text-ivory/85 lg:col-span-3">
            {site.address.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </address>
          <ul className="space-y-1 text-[15px] leading-relaxed text-ivory/85 lg:col-span-4">
            <li>
              <a className="hover:text-green" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>WhatsApp {site.whatsapp}</li>
            <li>Office {site.phone}</li>
          </ul>
        </div>
      </section>

      <TechPackCta />
    </>
  );
}
