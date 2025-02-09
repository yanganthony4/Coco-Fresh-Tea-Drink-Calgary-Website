"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import DrinkImageSlider from "./components/DrinkImageSlider"
import Boxes from "./components/Boxes"
import DeliveryAppCarousel from "./components/DeliveryAppCarousel"
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
      <div className="w-full overflow-x-hidden">
        <ImageSlider images={images} />
        <div className="mx-auto w-4/5">
          <hr className="border-2 border-grey-500 w-4/5 mx-auto mt-20" />
          {/* Build-a-Drink Feature Promo */}
          <section>
            <div className="w-4/5 relative mx-auto px-4 sm:px-6 lg:px-8">
              <DrinkImageSlider />
              <div className="flex justify-center items-center">
                <Link href="/menu" className="group flex items-center text-2xl space-x-2 font-bold text-black ml-[87.5%]">
                  <span className="font-sora absolute right-0 text-3xl pt-2 whitespace-nowrap mr-10">EXPLORE OUR MENU</span>
                  <span className="text-2xl absolute right-0 no-underline transition-transform duration-300 transform group-hover:translate-x-2">
                    &#8594;
                  </span>
                </Link>
              </div>
            </div>
          </section>
          <hr className="border-2 border-grey-500 my-8 w-4/5 mx-auto my-20" />
          {/* Boxes Section - Constrained width orange background */}
          <div className="relative">
            <div className="absolute inset-0" />
                <div className="relative  mx-auto px-4 sm:px-6 lg:px-8">
                    <section>
                        <Boxes />
                    </section>
                </div>
            </div>
          </div>

        {/* Dynamic Image Section - Full width orange background */}
            <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <DeliveryAppCarousel />
          </div>
        </section>
      </div>
  )
}

