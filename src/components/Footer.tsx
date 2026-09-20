import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-28 pt-24 text-ivory md:pb-12">
      <div className="grain-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1520px] px-5 md:px-10">
        <div className="grid gap-16 border-b border-[var(--line-dark)] pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="font-display mt-8 max-w-md text-[1.65rem] leading-[1.2] text-ivory/90">
              Specialist buying house for professional clothing programmes.{" "}
              <em className="text-sage">Developed, sourced and controlled in Bangladesh.</em>
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5 text-sage">Office</p>
            <address className="space-y-1 text-[15px] not-italic leading-relaxed text-ivory/85">
              {site.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </address>
          </div>

          <div>
            <p className="eyebrow mb-5 text-sage">Contact</p>
            <ul className="space-y-1 text-[15px] leading-relaxed text-ivory/85">
              <li>
                <a className="hover:text-green" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>WhatsApp {site.whatsapp}</li>
              <li>Office {site.phone}</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-sage">Explore</p>
            <ul className="space-y-1 text-[15px] leading-relaxed text-ivory/85">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link className="hover:text-green" href={n.href}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="hover:text-green" href="/start-a-project">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="eyebrow flex flex-col justify-between gap-4 pt-8 text-sage md:flex-row">
          <p>© 2026 {site.name}</p>
          <p className="flex gap-6">
            <Link href="/privacy" className="hover:text-ivory">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory">
              Terms
            </Link>
          </p>
          <p className="max-w-md md:text-right">
            Design prototype by Taqwa Tech · imagery and descriptors are placeholders
          </p>
        </div>
      </div>
    </footer>
  );
}
