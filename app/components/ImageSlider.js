"use client"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

const ImageSlider = () => {
  // Images array moved from page.js to component
  const images = [
    "/images/homebanner_resized.png",
    "/images/cremebruleeposter.png",
    "/images/strawberryPromo.png",
    "/images/mangodream.png",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }, [currentIndex, images.length])

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
  }, [currentIndex, images.length])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide()
    }
    if (touchStart - touchEnd < -50) {
      prevSlide()
    }
  }

  return (
    <div
      className="relative w-full bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image Container */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Promotional Banner ${currentIndex + 1}`}
            fill
            priority={true}
            quality={100}
            sizes="100vw"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentIndex ? "bg-orange-500 scale-110" : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider

