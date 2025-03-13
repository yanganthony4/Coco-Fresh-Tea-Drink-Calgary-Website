"use client"
import Link from "next/link"
import DrinkImageSlider from "./components/DrinkImageSlider"
import Boxes from "./components/HomePageInformationalBoxes"
import DeliveryAppCarousel from "./components/DeliveryAppCarousel"
import ImageSlider from "./components/ImageSlider"

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Centralized container for consistency */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Image Slider */}
        <div className="w-full">
          <ImageSlider />
        </div>

        {/* Section Divider */}
        <hr className="border-1 sm:border-2 border-gray-500 w-full mx-auto mt-6 sm:mt-8 md:mt-12 lg:mt-20" />

        {/* Drink Image Slider Section */}
        <section className="w-full flex flex-col items-center text-center py-4 sm:py-6 md:py-8">
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
            <DrinkImageSlider />
            <div className="flex justify-center items-center mt-4 sm:mt-6">
              <Link
                href="/menu"
                className="group flex items-center text-lg sm:text-xl md:text-2xl space-x-1 sm:space-x-2 font-bold text-black"
              >
                <span className="font-sora text-lg sm:text-xl md:text-3xl pt-1 sm:pt-2">EXPLORE OUR MENU</span>
                <span className="text-lg sm:text-xl md:text-2xl transition-transform duration-300 transform group-hover:translate-x-2 ml-1 sm:ml-2">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <hr className="border-1 sm:border-2 border-gray-500 w-full mx-auto my-6 sm:my-10 md:my-16 lg:my-20" />

        {/* Informational Boxes Section */}
        <div className="w-full flex justify-center px-2 sm:px-4">
          <div className="max-w-5xl w-full">
            <Boxes />
          </div>
        </div>

        {/* Delivery App Carousel */}
        <section className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center px-2 sm:px-4">
          <div className="max-w-7xl w-full">
            <DeliveryAppCarousel />
          </div>
        </section>
      </div>
    </div>
  )
}

