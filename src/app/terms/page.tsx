import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Terms", robots: { index: true, follow: true } };

const sections = [
  ["Use of this website", `This website is operated by ${site.name}. By using it you agree to these terms.`],
  [
    "Information",
    "Content on this website is provided for general information about Green Channels’ services. It is not an offer. Quotations are provided separately and in writing.",
  ],
  [
    "Certifications and claims",
    "Certifications shown on this website are held by the named partner factories, not by Green Channels, and are displayed only after verification.",
  ],
  [
    "Uploaded files",
    "Files you upload with a request for quotation are used only to respond to that enquiry. Do not upload material you do not have the right to share.",
  ],
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" lines={[{ text: "Terms" }]} intro={<p>Draft text for the prototype; to be reviewed by Green Channels before launch.</p>} />
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          {sections.map(([t, d]) => (
            <div key={t} className="border-b border-[var(--line-light)] py-8">
              <h2 className="font-display text-[1.9rem] leading-tight">{t}</h2>
              <p className="mt-3 text-[16px] leading-[1.75] text-ink/75">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
