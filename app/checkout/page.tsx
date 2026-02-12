import { CheckoutPage } from "@/components/store/checkout-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Classy Collections order. Pay via M-PESA or order via WhatsApp. Secure checkout for premium Ankara fashion.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CheckoutPage />
}
