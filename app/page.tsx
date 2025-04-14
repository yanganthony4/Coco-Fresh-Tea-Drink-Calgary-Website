"use client"
import Link from "next/link"
import DrinkImageSlider from "./components/home/DrinkImageSlider"
import Boxes from "./components/home/HomeBoxes"
import DeliveryAppCarousel from "./components/home/DeliveryAppCarousel"
import ImageSlider from "./components/home/ImageSlider"

const HomeImages: string[] = [
  "/images/homebanner.webp",
  "/images/strawberryPromo.webp",
  "/images/mangodream.webp",
  "/images/cremebruleeposter.webp"
]

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/*This div forces 100% screen width edge-to-edge */}
      <div className="w-screen">
        <ImageSlider images={HomeImages} />
      </div>

      {/*Content container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="sr-only">CoCo Bubble Tea - Premium Bubble Tea and Drinks</h1>

        <hr className="border-2 border-grey-500 w-full mx-auto mt-10 md:mt-20" />

        {/* Drink Image Slider Section */}
        <section className="w-full flex flex-col items-center text-center">
          <div className="w-full max-w-5xl mx-auto px-4">
            <DrinkImageSlider />
            <div className="flex justify-center items-center">
              <Link href="/menu" className="group flex items-center text-2xl space-x-2 font-bold text-black">
                <span className="font-sora text-xl md:text-3xl pt-2">EXPLORE OUR MENU</span>
                <span className="text-xl md:text-2xl transition-transform duration-300 transform group-hover:translate-x-2 ml-2">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>

        <hr className="border-2 border-grey-500 w-full mx-auto my-20" />

        {/* Informational Boxes Section */}
        <div className="w-full flex justify-center">
          <div className="max-w-5xl w-full">
            <Boxes />
          </div>
        </div>

        {/* Delivery App Carousel */}
        <section className="w-full mt-20 flex justify-center">
          <div className="max-w-7xl w-full">
            <DeliveryAppCarousel />
          </div>
        </section>
      </div>
    </div>
  )
}
