"use client"

import { useEffect, useRef, useState } from "react"
import PromotionsList from "../components/PromotionsList"
import { useForm, usePlugin } from "tinacms"

export default function Promotions() {
  const [isEmojiVisible, setIsEmojiVisible] = useState(false)
  const cocoRef = useRef(null)

  // Define editable fields with TinaCMS (only banner image)
  const [formData, form] = useForm({
    initialValues: {
      bannerImage: "/images/Promotionsbanner.png",
    },
    onSubmit: (data) => {
      console.log("Updated Banner Image:", data.bannerImage)
      // Add logic to save the updated banner image URL to your backend
    },
    fields: [
      {
        name: "bannerImage",
        label: "Banner Image URL",
        component: "text",
      },
    ],
  })

  // Connect the form to TinaCMS
  usePlugin(form)

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col relative">
        {/* Editable Promotions Banner Section */}
        <section className="w-full relative overflow-hidden bg-white">
          <div className="relative w-full max-w-[1555px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "51.45%" }}>
              <img
                src={formData.bannerImage}
                alt="Promotions Background"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="container mx-auto px-4 lg:px-6 pt-4 sm:pt-8 lg:pt-12 pb-20">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-4 sm:gap-8">
            {/* Left Side Content (Static Elements) */}
            <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start lg:sticky lg:top-8">
              <div
                className="flex flex-col items-center py-8 sm:py-12 lg:py-20 px-4 sm:px-24 lg:items-start"
                ref={cocoRef}
              >
                {/* Static Emoji */}
                <div className={`${isEmojiVisible ? "animate-bounce" : ""} mb-2 sm:mb-4 px-7`}>
                  <img 
                    src="/images/cocoemoji.png" 
                    alt="Coco Emoji" 
                    className="w-16 sm:w-24 lg:w-32" 
                    loading="lazy" 
                  />
                </div>
                
                {/* Static Coco Text */}
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

            {/* Vertical Line (Static) */}
            <div className="hidden lg:block w-0.5 bg-[#E7D4B5] h-auto self-stretch" />

            {/* Promotions List (Already Editable via its own component) */}
            <PromotionsList />
          </div>
        </div>
      </div>
    </div>
  )
}