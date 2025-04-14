"use client"

import { useEffect, useRef, useState } from "react"
import PromotionsList from "../components/promotions/PromotionsList"
import Image from "next/image"

// TypeScript for the component state and refs
export default function Promotions() {
  const [isEmojiVisible, setIsEmojiVisible] = useState(false) //boolean type but in ts
  const cocoRef = useRef<HTMLDivElement | null>(null) // type the ref for a div element

  useEffect(() => {
    if (!cocoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsEmojiVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(cocoRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="pt-20 h-auto flex flex-col">
      <div className="flex-1 flex flex-col relative">
        {/* Visually hidden H1 for SEO/accessibility */}
        <h1 className="sr-only">CoCo Bubble Tea - Premium Bubble Tea and Drinks</h1>
        {/* Promotions Banner Section */}
        <section className="w-full relative overflow-hidden bg-white">
          <div className="relative w-full max-w-[1555px] mx-auto">
            <div className="relative w-full">
              <Image
                src="/images/Promotionsbanner.png"
                alt="Promotions Background"
                width={1000}
                height={500}
                className="w-full h-auto object-contain pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="container mx-auto px-4 lg:px-6 pt-4 sm:pt-6 lg:pt-8 pb-10">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-4 sm:gap-8">
            {/* Left Side Content */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center lg:sticky lg:top-8">
              {/* Emoji Animation and CoCo text */}
              <div className="flex flex-col items-center py-6 sm:py-8 lg:py-12 px-4 sm:px-16 w-full" ref={cocoRef}>
                <div className={`${isEmojiVisible ? "animate-bounce" : ""} mb-2 sm:mb-4 px-7`}>
                  <Image
                    src="/images/cocoemoji.png"
                    alt="Coco Fresh Tea and Juice Logo"
                    width={50}
                    height={50}
                    className="w-16 sm:w-24 lg:w-32"
                    loading="lazy"
                  />
                </div>
                <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black font-museo flex">
                  {["C", "o", "C", "o"].map((letter, index) => (
                    <span
                      key={index}
                      className={`${isEmojiVisible ? "animate-bounce" : ""}`}
                      style={{ animationDelay: `${index * 0.2}s`, animationDuration: "1s" }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="hidden lg:block w-0.5 bg-[#E7D4B5] h-auto self-stretch" />

            {/* Promotions List Component */}
            <PromotionsList />
          </div>
        </div>
      </div>
    </div>
  )
}
