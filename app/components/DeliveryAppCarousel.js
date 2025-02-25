"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const DeliveryAppCarouselMap = () => {
  const [mainImage, setMainImage] = useState({ src: "/images/main-image.jpg", alt: "Main Image" })
  const [smallImages, setSmallImages] = useState([
    { src: "/images/ubereats.png", alt: "Uber Eats", link: "https://www.ubereats.com/" },
    { src: "/images/doordash.png", alt: "DoorDash", link: "https://www.doordash.com/" },
    { src: "/images/skipthedishes.png", alt: "SkipTheDishes", link: "https://www.skipthedishes.com/" },
  ])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % smallImages.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [smallImages.length])

  const handleImageError = (index) => {
    const fallbackSrc = "/images/deliverydriver.png"
    if (index === -1) {
      setMainImage((prev) => ({ ...prev, src: fallbackSrc }))
    } else {
      setSmallImages((prev) => prev.map((img, i) => (i === index ? { ...img, src: fallbackSrc } : img)))
    }
  }

  return (
    <section className="flex items-center justify-center bg-white py-4 md:py-8">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 w-full px-4 md:px-0">
        <div className="flex-1">
          <Image
            src={mainImage.src || "/placeholder.svg"}
            alt={mainImage.alt}
            width={500}
            height={220}
            className="rounded-lg object-cover transition-transform duration-500 hover:scale-105"
            onError={() => handleImageError(-1)}
          />
        </div>

        <div className="flex-1 border-t-4 md:border-l-4 md:border-t-0 border-grey-500 pt-5 md:pt-0 md:pl-5 mt-5 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 mb-4">
            {smallImages.map((img, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-500 ${
                  index === activeIndex ? "scale-105 z-10" : "scale-100 opacity-80"
                }`}
              >
                <a
                  href={img.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-[300px] h-[80px] md:h-[110px]"
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    width={200}
                    height={150}
                    className="rounded-lg object-contain w-full h-full"
                    onError={() => handleImageError(index)}
                  />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs md:text-sm font-medium text-[#653128] animate-pulse mt-2 leading-relaxed max-w-md mx-auto">
            Enjoy the refreshing taste of Coco&apos;s Bubble Tea and Fresh Juice delivered straight to your door. Sip on
            your favorites without leaving the comfort of home!
          </p>
        </div>
      </div>
    </section>
  )
}

export default DeliveryAppCarouselMap

