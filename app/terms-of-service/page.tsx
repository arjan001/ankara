import { createClient } from "@supabase/supabase-js"
import type { Metadata } from "next"
import { TopBar } from "@/components/store/top-bar"
import { Navbar } from "@/components/store/navbar"
import { Footer } from "@/components/store/footer"

async function getPolicy() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data } = await supabase.from("policies").select("*").eq("slug", "terms-of-service").single()
  return data
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPolicy()
  return {
    title: p?.meta_title || "Terms of Service | Classy Collections",
    description: p?.meta_description || "Read the terms and conditions governing your use of the Classy Collections website.",
    alternates: { canonical: "https://classycollections.com/terms-of-service" },
    keywords: p?.meta_keywords?.split(",").map((k: string) => k.trim()) || ["terms of service", "classy collections"],
    authors: [{ name: "Classy Collections", url: "https://classycollections.com" }],
    creator: "Classy Collections",
    openGraph: {
      title: p?.meta_title || "Terms of Service | Classy Collections",
      description: p?.meta_description || "Read the terms and conditions governing your use of the Classy Collections website.",
      url: "https://classycollections.com/terms-of-service",
      siteName: "Classy Collections",
      type: "website",
    },
  }
}

export default async function TermsOfServicePage() {
  const policy = await getPolicy()
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopBar />
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-balance">{policy?.title || "Terms of Service"}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: {policy?.last_updated ? new Date(policy.last_updated).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" }) : "February 2026"}
        </p>
        <div
          className="mt-10 prose prose-sm max-w-none text-muted-foreground prose-headings:text-lg prose-headings:font-serif prose-headings:font-semibold prose-headings:text-foreground prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 prose-ul:list-disc prose-ul:pl-5 prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: policy?.content || "<p>Content not available.</p>" }}
        />
      </main>
      <Footer />
    </div>
  )
}
