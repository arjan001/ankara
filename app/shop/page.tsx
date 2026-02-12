import { Suspense } from "react"
import { ShopPage } from "@/components/store/shop-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Premium Ankara Fashion | Classy Collections Kenya",
  description:
    "Browse Classy Collections full selection of premium Ankara fashion. Men's suits, women's dresses, kimonos, palazzo, tops, and shirts. Quality African print clothing with new arrivals weekly. Delivered across Kenya and East Africa.",
  alternates: { canonical: "https://classycollections.com/shop" },
  keywords: [
    "classy collections shop", "ankara fashion Kenya", "shop ankara dresses", "buy ankara suits",
    "women ankara dresses", "men ankara suits", "ankara kimonos Kenya", "ankara palazzo pants",
    "african print clothing", "authentic ankara fashion", "best ankara designs Kenya",
    "ankara fashion online", "premium ankara wear", "ready-made ankara suits",
    "casual ankara outfits", "formal ankara wear", "affordable ankara fashion",
  ],
  openGraph: {
    title: "Shop Premium Ankara Fashion | Classy Collections",
    description: "Premium Ankara suits, dresses, kimonos, and more. Quality African print fashion delivered across Kenya and East Africa.",
    url: "https://classycollections.com/shop",
    type: "website",
    siteName: "Classy Collections",
    locale: "en_KE",
    images: [{ url: "https://classycollections.com/logo.png", width: 512, height: 512, alt: "Classy Collections Shop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Premium Ankara Fashion | Classy Collections",
    description: "Premium Ankara suits, dresses, kimonos, and more delivered across Kenya and East Africa.",
    images: ["https://classycollections.com/logo.png"],
  },
}

export default function Page() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  )
}
