"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import type { HeroBanner } from "@/lib/types"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ANKARA_CAROUSEL_IMAGES = [
  "/banners/women-collection.jpg",
  "/banners/women-page-banner.jpg",
  "/banners/men-collection.jpg",
]

const FALLBACK_BANNERS: HeroBanner[] = [
  {
    id: "ankara-suits",
    title: "Ankara Suits Collection",
    subtitle: "Premium ready-made Ankara suits. Perfect for weddings, events, and celebrations. Handcrafted excellence.",
    collection: "ankara-suits",
    bannerImage: "/banners/men-collection.jpg",
    linkUrl: "/shop/ankara-suits",
    buttonText: "Explore Suits",
    sortOrder: 0,
  },
  {
    id: "ankara-dresses",
    title: "Ankara Dresses",
    subtitle: "Stunning Ankara dresses for every occasion. From casual to formal, find your perfect style.",
    collection: "ankara-dresses",
    bannerImage: "/banners/women-collection.jpg",
    linkUrl: "/shop/ankara-dresses",
    buttonText: "Shop Dresses",
    sortOrder: 1,
  },
  {
    id: "ankara-kimonos",
    title: "Ankara Kimonos",
    subtitle: "Trendy Ankara kimonos with matching accessories. Versatile pieces for modern African style.",
    collection: "ankara-kimonos",
    bannerImage: "/banners/kids-collection.jpg",
    linkUrl: "/shop/ankara-kimonos",
    buttonText: "View Kimonos",
    sortOrder: 2,
  },
]

function AnkaraCarousel({ banner }: { banner: HeroBanner }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % ANKARA_CAROUSEL_IMAGES.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <Link
      href={banner.linkUrl}
      className="lg:col-span-8 relative overflow-hidden rounded-sm min-h-[400px] lg:min-h-[520px] flex items-end group"
    >
      <div className="absolute inset-0 z-0">
        {ANKARA_CAROUSEL_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`${banner.title} - carousel slide ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
      </div>
      <div className="relative z-10 p-8 lg:p-12 w-full">
        <p className="text-background/80 text-xs tracking-[0.3em] uppercase mb-2">African Fashion</p>
        <h1 className="text-background text-4xl lg:text-5xl font-serif font-bold leading-tight text-balance">
          {banner.title}
        </h1>
        <p className="text-background/70 text-sm mt-3 leading-relaxed max-w-md">
          {banner.subtitle}
        </p>
        <span className="inline-flex items-center gap-2 mt-5 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 text-sm font-medium transition-colors">
          {banner.buttonText}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}

function BabyshopCarousel({ banner }: { banner: HeroBanner }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % ANKARA_CAROUSEL_IMAGES.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <Link
      href={banner.linkUrl}
      className="lg:col-span-8 relative overflow-hidden rounded-sm min-h-[400px] lg:min-h-[520px] flex items-end group"
    >
      <div className="absolute inset-0 z-0">
        {ANKARA_CAROUSEL_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`${banner.title} - carousel slide ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
      </div>
      <div className="relative z-10 p-8 lg:p-12 w-full">
        <p className="text-background/80 text-xs tracking-[0.3em] uppercase mb-2">Baby Essentials</p>
        <h1 className="text-background text-4xl lg:text-5xl font-serif font-bold leading-tight text-balance">
          {banner.title}
        </h1>
        <p className="text-background/70 text-sm mt-3 leading-relaxed max-w-md">
          {banner.subtitle}
        </p>
        <span className="inline-flex items-center gap-2 mt-5 bg-background text-foreground px-7 py-3 text-sm font-medium group-hover:bg-background/90 transition-colors">
          {banner.buttonText}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}

export function Hero() {
  const { data: banners } = useSWR<HeroBanner[]>("/api/hero-banners", fetcher)
  const items = banners && banners.length >= 3 ? banners : FALLBACK_BANNERS

  const mainBanner = items[0]
  const sideBanners = items.slice(1, 3)

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          {/* Main Banner - Ankara Suits with Carousel */}
          {mainBanner.collection === "ankara-suits" ? (
            <AnkaraCarousel banner={mainBanner} />
          ) : (
            <Link
              href={mainBanner.linkUrl}
              className="lg:col-span-8 relative overflow-hidden rounded-sm min-h-[400px] lg:min-h-[520px] flex items-end group"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={mainBanner.bannerImage}
                  alt={mainBanner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              </div>
              <div className="relative z-10 p-8 lg:p-12 w-full">
                <p className="text-background/80 text-xs tracking-[0.3em] uppercase mb-2">
                  {mainBanner.collection === "ankara-suits" ? "African Fashion" : "Ankara Collection"}
                </p>
                <h1 className="text-background text-4xl lg:text-5xl font-serif font-bold leading-tight text-balance">
                  {mainBanner.title}
                </h1>
                <p className="text-background/70 text-sm mt-3 leading-relaxed max-w-md">
                  {mainBanner.subtitle}
                </p>
                <span className="inline-flex items-center gap-2 mt-5 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 text-sm font-medium transition-colors">
                  {mainBanner.buttonText}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          )}

          {/* Side Banners - Ankara Dresses & Kimonos */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
            {sideBanners.map((banner) => (
              <Link
                key={banner.id}
                href={banner.linkUrl}
                className="relative overflow-hidden rounded-sm flex-1 min-h-[200px] lg:min-h-0 group flex items-end"
              >
                <Image
                  src={banner.bannerImage}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                <div className="relative z-10 p-5 w-full">
                  <h3 className="text-background font-serif text-lg font-semibold leading-snug">
                    {banner.title}
                  </h3>
                  <p className="text-background/70 text-xs mt-1 line-clamp-2">
                    {banner.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-background text-xs font-medium tracking-wide uppercase group-hover:underline">
                    {banner.buttonText}
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
