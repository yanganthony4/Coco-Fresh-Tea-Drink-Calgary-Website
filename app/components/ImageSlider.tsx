import Image from "next/image"
import { useState, useEffect } from "react"

type ImageSliderProps = {
  images: string[]
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] xl:h-[800px] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {images.length > 0 && (
          <Image
            src={images[currentIndex]}
            alt={`Banner ${currentIndex}`}
            fill
            //Responsive object-fit: contain on mobile, cover on sm+
            className="object-contain sm:object-cover w-full h-full"
            priority
          />
        )}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentIndex ? "bg-orange-500 scale-110" : "bg-gray-400 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
