import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: true, follow: true } };

const sections = [
  ["Who we are", `${site.name}, ${site.address.join(", ")}. Contact: ${site.email}.`],
  [
    "What we collect",
    "When you submit a request for quotation we collect the details you enter (name, company, email, phone, country, website and product information) and any files you attach.",
  ],
  [
    "How we use it",
    "We use this information only to respond to your enquiry and to manage the resulting business relationship. We do not sell personal data.",
  ],
  [
    "Your rights",
    "If you are in the EU or UK you have the right to access, correct, delete or restrict the use of your personal data. Write to us at the address above.",
  ],
  ["Retention", "Enquiry data is kept only as long as needed for the purpose above, or as required by law."],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" lines={[{ text: "Privacy Policy" }]} intro={<p>Draft text for the prototype; to be reviewed by Green Channels before launch.</p>} />
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
