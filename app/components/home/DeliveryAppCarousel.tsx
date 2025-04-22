"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type MainImage = { src: string; alt: string }
type SmallImage = { src: string; alt: string; link: string }

export default function DeliveryAppCarouselMap() {
  const [mainImage, setMainImage] = useState<MainImage>({
    src: "/images/art/deliveryimage.webp",
    alt: "Main Image",
  })

  const [smallImages, setSmallImages] = useState<SmallImage[]>([
    { src: "/images/webps/ubereats.webp",     alt: "Uber Eats Logo",     link: "https://www.ubereats.com/" },
    { src: "/images/webps/doordash.webp",     alt: "DoorDash Logo",      link: "https://www.doordash.com/" },
    { src: "/images/webps/skipthedishes.webp",alt: "SkipTheDishes Logo", link: "https://www.skipthedishes.com/" },
    { src: "/images/webps/fantuan.webp",      alt: "Fantuan Logo",       link: "https://www.fantuan.ca/en/" },
  ])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setActiveIndex(i => (i + 1) % smallImages.length), 2500)
    return () => clearInterval(iv)
  }, [smallImages.length])

  const handleError = (i: number) => {
    const fallback = "/images/main-image.webp"
    if (i === -1) setMainImage(m => ({ ...m, src: fallback }))
    else setSmallImages(imgs => imgs.map((img, idx) => idx === i ? { ...img, src: fallback } : img))
  }

  return (
    <section className="flex items-center justify-center bg-white py-4 md:py-8">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 w-full px-4 md:px-0">
        {/* Main image */}
        <div className="flex-1">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            width={500}
            height={220}
            className="rounded-lg object-cover transition-transform duration-500 hover:scale-105"
            onError={() => handleError(-1)}
          />
        </div>

        {/* Logos */}
        <div className="flex-1 border-t-4 md:border-l-4 md:border-t-0 border-grey-500 pt-5 md:pt-0 md:pl-5 mt-5 md:mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 mb-4">
            {smallImages.map((img, idx) => (
              <div key={idx} className="flex items-center justify-center">
                <a
                  href={img.link}
                  target="_blank"
                  rel="noopener"
                  className={`
                    relative 
                    w-64 h-64            /* base size */
                    sm:w-72 sm:h-72      /* small screens */
                    md:w-80 md:h-80      /* medium+ screens */
                  `}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={`
                      object-contain rounded-lg
                      transition-transform duration-500
                      ${idx === activeIndex ? "scale-105" : "opacity-80"}
                    `}
                    onError={() => handleError(idx)}
                  />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs md:text-sm font-medium text-[#653128] animate-pulse mt-2 leading-relaxed max-w-md mx-auto">
            Enjoy the refreshing taste of Coco&apos;s Bubble Tea and Fresh Juice delivered straight to your door. Sip on your favorites without leaving the comfort of home!
          </p>
        </div>
      </div>
    </section>
  )
}
