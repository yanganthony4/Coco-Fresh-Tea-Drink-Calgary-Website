import Image from "next/image"
import { useState, useEffect } from "react"

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index) => {
    setCurrentIndex(index) // Updates the image when dot is clicked
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex justify-center items-center bg-gray-100">
      
      {/* Image Container */}
      <div className="relative w-full max-w-screen-xl mx-auto h-full">
        <Image
          src={images[currentIndex]}
          alt={`Banner ${currentIndex}`}
          width={1920}
          height={600}
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentIndex ? "bg-orange-500 scale-110" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  )
}

export default ImageSlider
