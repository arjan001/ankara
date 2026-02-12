import { LandingPage } from "@/components/store/landing-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ankara Fashion | Premium African Print Clothing - Suits, Dresses, Kimonos in Kenya",
  description:
    "Shop authentic Ankara fashion at Ankara Fashion. Premium ready-made Ankara suits, dresses, kimonos, palazzo, shirts, and tops. Celebrate African style with quality fabrics. Delivered across Kenya and East Africa.",
  keywords: [
    "ankara fashion",
    "ankara clothing Kenya",
    "african print fashion",
    "ankara dresses",
    "ankara suits",
    "ankara kimonos",
    "ankara palazzo",
    "african clothing",
    "authentic ankara",
    "fashion Nairobi",
    "east african fashion",
    "online shopping Kenya",
  ],
  alternates: { canonical: "https://ankarafashion.com" },
  openGraph: {
    title: "Ankara Fashion | Premium African Print Clothing in Kenya",
    description: "Shop authentic Ankara fashion - suits, dresses, kimonos, and more. Premium African style delivered across Kenya and East Africa.",
    url: "https://ankarafashion.com",
    type: "website",
    siteName: "Ankara Fashion",
    locale: "en_KE",
    images: [{ url: "https://ankarafashion.com/logo.png", width: 512, height: 512, alt: "Ankara Fashion Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankara Fashion | Premium African Print Clothing",
    description: "Authentic Ankara suits, dresses, kimonos, and more. Celebrate African style.",
    images: ["https://ankarafashion.com/logo.png"],
    creator: "@ankarafashion",
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Kallittos Fashions",
            description: "Curated thrift & brand-new denim online store in Kenya",
            url: "https://kallittofashions.com",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Ankara Fashion",
              description: "Premium authentic Ankara fashion, suits, dresses, kimonos & more in Kenya",
              image: "https://ankarafashion.com/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nairobi CBD",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi",
                postalCode: "00100",
                addressCountry: "KE",
              },
              telephone: "+254 0700 000 000",
              url: "https://ankarafashion.com",
            },
          }),
        }}
      />
      <LandingPage />
    </>
  )
}
