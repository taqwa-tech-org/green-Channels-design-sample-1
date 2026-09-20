import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { site } from "@/lib/content";

const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Green Channels is a specialist buying house for professional clothing programmes. We develop the product, source fabric and trims, run sampling, select the factory, follow production and control quality, through to shipment. 35+ years in Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Green Channels — Workwear, corporate wear & uniforms, sourced in Bangladesh",
    template: "%s · Green Channels",
  },
  description,
  applicationName: "Green Channels",
  openGraph: {
    type: "website",
    siteName: "Green Channels",
    title: "Workwear, corporate wear and uniforms. Developed, sourced and controlled in Bangladesh.",
    description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#06120e",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Road 102, House 4, Apart H3, Gulshan 2",
    addressLocality: "Dhaka",
    postalCode: "1212",
    addressCountry: "BD",
  },
  description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyCta />
        </SmoothScroll>
      </body>
    </html>
  );
}
