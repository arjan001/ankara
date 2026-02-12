import { LandingPage } from "@/components/store/landing-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Classy Collections | Premium African Ankara Print Clothing - Suits, Dresses, Kimonos",
  description:
    "Shop authentic Ankara fashion at Classy Collections. Premium ready-made Ankara suits, dresses, kimonos, palazzo, shirts, and tops for men and women. Celebrate African style with quality fabrics. Delivered across Kenya and East Africa.",
  keywords: [
    "classy collections",
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
  alternates: { canonical: "https://classycollections.com" },
  openGraph: {
    title: "Classy Collections | Premium African Ankara Print Clothing",
    description: "Shop authentic Ankara fashion - suits, dresses, kimonos, and more. Premium African style delivered across Kenya and East Africa.",
    url: "https://classycollections.com",
    type: "website",
    siteName: "Classy Collections",
    locale: "en_KE",
    images: [{ url: "https://classycollections.com/logo.png", width: 512, height: 512, alt: "Classy Collections Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Classy Collections | Premium African Ankara Fashion",
    description: "Authentic Ankara suits, dresses, kimonos, and more. Celebrate African style.",
    images: ["https://classycollections.com/logo.png"],
    creator: "@classycollections",
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
            name: "Classy Collections",
            description: "Premium authentic Ankara fashion online store in Kenya",
            url: "https://classycollections.com",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Classy Collections",
              description: "Premium authentic Ankara fashion, suits, dresses, kimonos & more in Kenya",
              image: "https://classycollections.com/logo.png",
              address: {
                "@type": "PostalAddress",
                addressCountry: "KE",
              },
              telephone: "+254 702 642 324",
              url: "https://classycollections.com",
            },
          }),
        }}
      />
      <LandingPage />
    </>
  )
}
