import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/site.config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.company }],
  publisher: site.company,
  keywords: ["billing app", "GST billing", "invoice app", "thermal printer billing", "kirana billing", "crackers billing", "POS app India", site.name],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/logo-full.png", alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description, images: ["/logo-full.png"] },
};

// Lets search engines show Galla Peti as a free Android app (schema.org MobileApplication).
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: site.name,
  description: site.description,
  operatingSystem: "ANDROID",
  applicationCategory: "BusinessApplication",
  url: site.url,
  installUrl: site.playStoreUrl || undefined,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  publisher: { "@type": "Organization", name: site.company },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
