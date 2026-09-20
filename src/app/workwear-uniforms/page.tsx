import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { GarmentFlat } from "@/components/GarmentFlat";
import { Reveal } from "@/components/Reveal";
import { TechPackCta } from "@/components/TechPackCta";
import { garments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Workwear & uniforms",
  description:
    "Professional clothing programmes: work jackets, work trousers, bib & brace, coveralls, work vests, shorts, polo shirts, T-shirts and sweatshirts, developed and sourced in Bangladesh.",
  alternates: { canonical: "/workwear-uniforms" },
};

export default function WorkwearPage() {
  return (
    <>
      <PageHero
        eyebrow="Workwear & Uniforms"
        lines={[{ text: "Professional clothing" }, { text: "programmes.", className: "italic text-sage" }]}
        intro={
          <p>
            Workwear, corporate wear and uniforms are bought in programmes, not seasons: repeat
            orders, matched fabrics and specifications that must hold over years. Here is the range
            we develop and source, garment by garment.
          </p>
        }
      >
        <nav aria-label="Garments" className="mt-14 flex flex-wrap gap-2">
          {garments.map((g) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="eyebrow border border-[var(--line-dark)] px-3.5 py-2.5 text-ivory/80 transition-colors hover:border-green hover:text-ivory"
            >
              {g.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="grain relative bg-ivory">
        <div className="relative mx-auto max-w-[1520px] px-5 md:px-10">
          {garments.map((g, i) => (
            <article
              id={g.slug}
              key={g.slug}
              className="grid scroll-mt-24 items-center gap-10 border-b border-[var(--line-light)] py-16 last:border-b-0 md:grid-cols-2 md:gap-20 md:py-28"
            >
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <div className="group relative aspect-square bg-parchment p-6 text-ink [--stitch:var(--green-deep)] stitch-live md:p-10">
                  <span className="eyebrow absolute left-5 top-5 text-moss">{String(i + 1).padStart(2, "0")} / 09</span>
                  <span className="eyebrow absolute right-5 top-5 text-moss">{g.family}</span>
                  <GarmentFlat kind={g.kind} title={g.name} alwaysNotes className="h-full w-full" />
                </div>
              </Reveal>

              <div className={i % 2 ? "md:order-1" : ""}>
                <Reveal>
                  <p className="eyebrow text-moss">{g.family}</p>
                  <h2 className="h-section mt-4">{g.name}</h2>
                  <p className="mt-6 max-w-[32rem] text-[1.0625rem] leading-[1.7] text-ink/70">{g.summary}</p>
                  <ul className="mt-8 max-w-[32rem] divide-y divide-[var(--line-light)] border-y border-[var(--line-light)]">
                    {g.points.map((p) => (
                      <li key={p} className="flex items-center gap-4 py-3.5 text-[15px] text-ink/85">
                        <span className="h-1.5 w-1.5 shrink-0 bg-green-deep" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-8">
                    <Link
                      href={`/start-a-project?garment=${g.slug}`}
                      className="group inline-flex items-center gap-3 text-[15px] font-medium"
                    >
                      <span className="underline decoration-green decoration-2 underline-offset-[7px]">
                        Enquire about {g.name.toLowerCase()}
                      </span>
                      <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                  <p className="eyebrow mt-8 text-moss">Indicative copy — to be confirmed with Green Channels</p>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TechPackCta />
    </>
  );
}
