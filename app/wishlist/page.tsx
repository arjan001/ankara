import type { Metadata } from "next"
import { WishlistPage } from "@/components/store/wishlist-page"

export const metadata: Metadata = {
  title: "My Wishlist | Classy Collections",
  description:
    "Save your favourite Ankara fashion pieces to your Classy Collections wishlist. Curate your perfect collection of premium African dresses, suits, kimonos, and more. Shop when ready with fast delivery across Kenya and East Africa.",
  alternates: { canonical: "https://classycollections.com/wishlist" },
  keywords: [
    "Classy Collections wishlist", "saved Ankara dresses", "favourite Ankara pieces",
    "Ankara wishlist Kenya", "African fashion collection", "Classy Collections saved items",
    "buy later Ankara fashion", "curated fashion picks", "Classy Collections wishlist",
  ],
  authors: [
    { name: "Classy Collections", url: "https://classycollections.com" },
  ],
  creator: "Classy Collections",
  publisher: "Classy Collections",
  openGraph: {
    title: "My Wishlist | Classy Collections",
    description: "Your saved Ankara fashion favourites at Classy Collections. Curate your perfect premium African collection.",
    url: "https://classycollections.com/wishlist",
    siteName: "Classy Collections",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary",
    title: "My Wishlist | Classy Collections",
    description: "Your saved Ankara fashion favourites at Classy Collections.",
    creator: "@_classycollections",
  },
}

export default function Page() {
  return <WishlistPage />
}
