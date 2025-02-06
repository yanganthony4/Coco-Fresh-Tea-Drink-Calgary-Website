"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ImageSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative bg-white w-full">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt="Promotional Background"
          fill
          style={{ objectFit: "cover" }}
          priority={currentImageIndex === 0}
          loading={currentImageIndex === 0 ? "eager" : "lazy"}
        />
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-4 h-4 rounded-full ${
              currentImageIndex === index ? "bg-orange-500" : "bg-orange-200"
            } transition-colors duration-300`}
          ></button>
        ))}
      </div>
    </section>
  )
}

