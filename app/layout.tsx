import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { Toaster } from "@/components/ui/sonner"
import { PageViewTracker } from "@/components/page-view-tracker"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const siteUrl = "https://classycollections.com"

export const metadata: Metadata = {
  title: {
    default: "Classy Collections | Premium African Ankara Fashion - Suits, Dresses, Kimonos",
    template: "%s | Classy Collections",
  },
  description:
    "Classy Collections – Shop premium authentic Ankara fashion for men and women. Ready-made Ankara suits, elegant dresses, trendy kimonos, palazzo, and tops. Celebrate African style with quality fabrics. Delivered across Kenya and East Africa.",
  keywords: [
    // Brand names
    "classy collections", "classy collections ankara", "classy collections fashion",
    "Classy Collections Kenya", "Classy Collections Nairobi", "Classy Collections Ankara",
    // Ankara fashion searches
    "ankara fashion Kenya", "ankara fashion Nairobi", "african ankara print", "ankara clothing",
    "ankara dresses Kenya", "ankara suits for men", "ankara kimonos", "ankara palazzo",
    "ankara tops", "ankara shirts", "authentic ankara fashion", "premium ankara",
    // African fashion
    "african print fashion", "african clothing Kenya", "african fashion online",
    "african designer dresses", "african print dresses", "african fashion store",
    "african style clothing", "authentic african fashion", "modern african wear",
    // Product specific
    "women ankara dresses Kenya", "mens ankara suits", "ankara formal wear",
    "casual ankara outfits", "ankara party dresses", "ankara wedding suits",
    "ankara casual wear", "ankara business attire", "ankara evening wear",
    // Shopping & delivery
    "buy ankara online Kenya", "ankara online store Kenya", "ankara fashion shop Kenya",
    "ankara delivery Kenya", "fashion online Nairobi", "quality ankara clothing",
    "affordable ankara fashion", "premium african fashion", "authentic ankara prints",
    // Regional searches
    "east african fashion", "kenya fashion online", "nairobi fashion boutique",
    "online fashion store Kenya", "african fashion delivery", "fast delivery fashion Kenya",
    // Variations
    "Ankara print clothing", "African geometric patterns", "Traditional African wear",
    "Modern African fashion", "African fashion trends", "Classy African style",
    "Quality African clothing", "Stylish Ankara outfits", "African fashion for all",
    // Social proof
    "Classy Collections reviews", "Classy Collections TikTok", "African fashion brand Kenya",
    "Trusted fashion shop Kenya", "Best Ankara store Kenya", "Premium Ankara seller",
    // Long tail
    "Where to buy ankara dresses in Kenya", "Best ankara fashion store online",
    "Ready-made ankara suits Kenya", "Authentic african print fashion Kenya",
    "Quality ankara clothing delivery Kenya", "Classy Collections authentic ankara",
  ],
  authors: [
    { name: "Classy Collections", url: "https://classycollections.com" },
  ],
  creator: "Classy Collections",
  publisher: "Classy Collections",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Classy Collections",
    title: "Classy Collections | Premium African Ankara Fashion",
    description:
      "Shop premium authentic Ankara fashion. Men's suits, women's dresses, kimonos, and more. Quality African print clothing delivered across Kenya and East Africa.",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: "Classy Collections - Premium African Ankara Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Classy Collections | Premium African Ankara Fashion",
    description:
      "Shop premium authentic Ankara fashion. Suits, dresses, kimonos, and more. Delivered across Kenya and East Africa.",
    images: [`${siteUrl}/logo.png`],
    creator: "@_classycollections",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    "instagram:creator": "@_classycollections",
    "tiktok:creator": "@_classycollections",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://classycollections.com" },
                { "@type": "ListItem", position: 2, name: "Shop", item: "https://classycollections.com/shop" },
                { "@type": "ListItem", position: 3, name: "Men's Collection", item: "https://classycollections.com/shop?category=men" },
                { "@type": "ListItem", position: 4, name: "Women's Collection", item: "https://classycollections.com/shop?category=women" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Classy Collections",
              legalName: "Classy Collections Kenya",
              url: "https://classycollections.com",
              foundingDate: "2025",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+254702642324",
                email: "info@classycollections.com",
                url: "https://wa.me/254702642324",
              },
              location: {
                "@type": "Place",
                name: "Classy Collections",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Nairobi",
                  addressRegion: "Nairobi",
                  addressCountry: "KE",
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Classy Collections",
              description: "Premium authentic African Ankara fashion. Men's suits, women's dresses, kimonos, palazzo, and more. Quality African print clothing delivered across Kenya and East Africa.",
              url: "https://classycollections.com",
              telephone: "+254702642324",
              email: "info@classycollections.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi",
                addressCountry: "KE",
              },
              sameAs: [
                "https://www.instagram.com/_classycollections/",
                "https://www.tiktok.com/@_classycollections",
              ],
              priceRange: "KES 3,500 - KES 15,000",
              image: "https://classycollections.com/logo.png",
              brand: {
                "@type": "Brand",
                name: "Classy Collections",
              },
              paymentAccepted: "M-PESA, Card, Cash on Delivery",
              currenciesAccepted: "KES",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Classy Collections",
              url: "https://classycollections.com",
              description: "Premium authentic African Ankara fashion. Ready-made suits, elegant dresses, kimonos, and more delivered across Kenya and East Africa.",
              publisher: {
                "@type": "Organization",
                name: "Classy Collections",
                logo: {
                  "@type": "ImageObject",
                  url: "https://classycollections.com/logo.png",
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://classycollections.com/shop?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Classy Collections Site Pages",
              itemListElement: [
                { "@type": "SiteNavigationElement", position: 1, name: "Home", url: "https://classycollections.com" },
                { "@type": "SiteNavigationElement", position: 2, name: "Shop All", url: "https://classycollections.com/shop" },
                { "@type": "SiteNavigationElement", position: 3, name: "Men's Collection", url: "https://classycollections.com/shop?category=men" },
                { "@type": "SiteNavigationElement", position: 4, name: "Women's Collection", url: "https://classycollections.com/shop?category=women" },
                { "@type": "SiteNavigationElement", position: 5, name: "New Arrivals", url: "https://classycollections.com/shop?filter=new" },
                { "@type": "SiteNavigationElement", position: 6, name: "Track My Order", url: "https://classycollections.com/track-order" },
                { "@type": "SiteNavigationElement", position: 7, name: "Wishlist", url: "https://classycollections.com/wishlist" },
                { "@type": "SiteNavigationElement", position: 8, name: "Privacy Policy", url: "https://classycollections.com/privacy-policy" },
                { "@type": "SiteNavigationElement", position: 9, name: "Terms of Service", url: "https://classycollections.com/terms-of-service" },
                { "@type": "SiteNavigationElement", position: 10, name: "Refund Policy", url: "https://classycollections.com/refund-policy" },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <WishlistProvider><CartProvider>{children}</CartProvider></WishlistProvider>
        <PageViewTracker />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
