"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Layout from "./components/Layout"
import DrinkImageSlider from "./components/DrinkImageSlider"
import Boxes from "./components/boxes"
import DynamicImageSection from "./components/DynamicImageSection"
import ImageSlider from "./components/ImageSlider"

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    "/images/homebanner.png",
    "/images/cremebruleeposter.png",
    "/images/strawberryPromo.png",
    "/images/mangodream.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <div className="w-full overflow-x-hidden">
        <div className="max-w-[2000px] mx-auto">
          <ImageSlider images={images} />

          {/* Build-a-Drink Feature Promo */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-[#653128] text-center mb-8">Our Signature Drinks</h2>
              <DrinkImageSlider />
              <div className="flex justify-center items-center mt-6">
                <Link href="/menu" className="group flex items-center space-x-2 text-2xl font-bold text-[#653128]">
                  <span className="underline">Explore More</span>
                  <span className="text-2xl no-underline transition-transform duration-300 transform group-hover:translate-x-2">
                    &#8594;
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* Boxes Section - Constrained width orange background */}
          <div className="relative">
            <div className="absolute inset-0 bg-orange-300" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <section className="py-12">
                <Boxes />
              </section>
            </div>
          </div>
        </div>

        {/* Dynamic Image Section - Full width orange background */}
            <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DynamicImageSection />
          </div>
        </section>
      </div>
    </Layout>
  )
}

