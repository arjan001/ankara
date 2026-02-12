import { ProductDetailPage } from "@/components/store/product-detail-page"
import { getProductBySlug } from "@/lib/supabase-data"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

const SITE_URL = "https://classycollections.com"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProductBySlug(slug)
    if (!product) return { title: "Product Not Found | Classy Collections" }
    const desc = product.description.slice(0, 155) + (product.description.length > 155 ? "..." : "")
    return {
      title: `${product.name} | Classy Collections`,
      description: `${desc} | Shop premium Ankara fashion at Classy Collections.`,
      keywords: [
        product.name, "Classy Collections", "ankara fashion Kenya",
        "authentic ankara", "african print", "buy ankara online Kenya",
        product.category || "", "ankara dresses", "ankara suits",
      ],
      alternates: {
        canonical: `${SITE_URL}/product/${slug}`,
      },
      openGraph: {
        title: `${product.name} | Classy Collections`,
        description: `${desc} Premium African Ankara Fashion.`,
        url: `${SITE_URL}/product/${slug}`,
        images: product.images[0] ? [{ url: product.images[0], width: 600, height: 800, alt: `${product.name} - Classy Collections` }] : [],
        type: "website",
        siteName: "Classy Collections",
        locale: "en_KE",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | Classy Collections`,
        description: desc,
        images: product.images[0] ? [product.images[0]] : [],
        creator: "@_classycollections",
      },
    }
  } catch {
    return { title: "Product Not Found | Classy Collections" }
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Fetch product for structured data
  let jsonLd = null
  try {
    const product = await getProductBySlug(slug)
    if (product) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        url: `${SITE_URL}/product/${slug}`,
        image: product.images,
        brand: { "@type": "Brand", name: "Classy Collections" },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "KES",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Classy Collections",
            url: SITE_URL,
          },
          itemCondition: product.condition === "thrift"
            ? "https://schema.org/UsedCondition"
            : "https://schema.org/NewCondition",
        },
        category: product.category,
      }
    }
  } catch {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailPage slug={slug} />
    </>
  )
}
