"use client"
import Link from "next/link"
import DrinkImageSlider from "./components/DrinkImageSlider"
import Boxes from "./components/HomePageInformationalBoxes"
import DeliveryAppCarousel from "./components/DeliveryAppCarousel"
import ImageSlider from "./components/ImageSlider"

export default function Home() {
  const images = [
    "/images/homebanner.png",
    "/images/cremebruleeposter.png",
    "/images/strawberryPromo.png",
    "/images/mangodream.png",
  ]

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full">
        <ImageSlider images={images} />
      </div>
      <div className="mx-auto w-full px-4 md:w-4/5">
        <hr className="border-2 border-grey-500 w-full md:w-4/5 mx-auto mt-10 md:mt-20" />
        {/* Build-a-Drink Feature Promo */}
        <section>
          <div className="w-4/5 relative mx-auto px-4 sm:px-6 lg:px-8">
            <DrinkImageSlider />
            <div className="flex justify-center items-center relative w-full">
              <Link href="/menu" className="group flex items-center text-2xl space-x-2 font-bold text-black">
                <span className="font-sora text-xl md:text-3xl pt-2 whitespace-nowrap">EXPLORE OUR MENU</span>
                <span className="text-xl md:text-2xl no-underline transition-transform duration-300 transform group-hover:translate-x-2 ml-2">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>
        <hr className="border-2 border-grey-500 my-8 w-full md:w-4/5 mx-auto my-20" />
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

