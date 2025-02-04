'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const DynamicImageSection = () => {
  // State for the main image
  const [mainImage, setMainImage] = useState({ src: '/images/main-image.jpg', alt: 'Main Image' })

  // State for the small images
  const [smallImages, setSmallImages] = useState([
    { src: '/images/ubereats.png', alt: 'Uber Eats', link: 'https://www.ubereats.com/' },
    { src: '/images/doordash.png', alt: 'DoorDash', link: 'https://www.doordash.com/' },
    { src: '/images/skipthedishes.png', alt: 'SkipTheDishes', link: 'https://www.skipthedishes.com/' },
  ])

  // State to track the currently active small image for scaling animation
  const [activeIndex, setActiveIndex] = useState(0)

  // Automatically cycle through small images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % smallImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [smallImages.length])

  // Handle image loading errors by replacing with a fallback image
  const handleImageError = (index) => {
    const fallbackSrc = '/images/deliverydriver.png'
    if (index === -1) {
      setMainImage((prev) => ({ ...prev, src: fallbackSrc }))
    } else {
      setSmallImages((prev) =>
        prev.map((img, i) => (i === index ? { ...img, src: fallbackSrc } : img))
      )
    }
  }

  return (
    <section className="flex items-center justify-center bg-white py-20"> {/* Reduced padding */}
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full"> {/* Reduced gap and max width */}
        {/* Main Image */}
        <div className="flex-1">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            width={500} // Reduced width
            height={220} // Reduced height
            className="rounded-lg object-cover transition-transform duration-500 hover:scale-105"
            onError={() => handleImageError(-1)}
          />
        </div>

        {/* Small Images */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-20 mb-4"> {/* Reduced gap */}
            {smallImages.map((img, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-500 ${
                  index === activeIndex ? 'scale-105 z-10' : 'scale-100 opacity-80'
                }`}
              >
                <a
                  href={img.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[300px] h-[110px]" // Adjusted size for smaller images
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={200} // Reduced size
                    height={150}
                    className="rounded-lg object-contain w-full h-full"
                    onError={() => handleImageError(index)}
                  />
                </a>
                <p className="mt-1 text-center text-xs font-medium text-[#653128]"> {/* Reduced font size */}
                  {img.alt}
                </p>
              </div>
            ))}
          </div>

          {/* Animated Text */}
          <p className="text-center text-xs md:text-sm font-medium text-[#653128] animate-pulse mt-2 leading-relaxed max-w-md mx-auto"> {/* Reduced text size and margin */}
            Enjoy the refreshing taste of Coco's Bubble Tea and Fresh Juice delivered straight to your door. 
            Sip on your favorites without leaving the comfort of home!
          </p>
        </div>
      </div>
    </section>
  )
}

export default DynamicImageSection
