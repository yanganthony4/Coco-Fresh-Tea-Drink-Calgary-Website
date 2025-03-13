"use client"

import Image from "next/image"

const DeliveryAppLogos = () => {
 
  const deliveryApps = [
    { src: "/images/ubereats.svg", alt: "Uber Eats", link: "https://www.ubereats.com/" },
    { src: "/images/doordash.svg", alt: "DoorDash", link: "https://www.doordash.com/" },
    { src: "/images/skipthedishes.svg", alt: "SkipTheDishes", link: "https://www.skipthedishes.com/" },
    { src: "", alt: "", link: "" }, 
  ]

 
  const handleImageError = (index) => {
    const fallbackSrc = "/images/deliverydriver.webp"
    
  }

  return (
    <section className="flex items-center justify-center bg-white py-4 sm:py-8 md:py-12 lg:py-20 mx-2 sm:mx-4 md:mx-6 lg:mx-10">
      {/* Flex container for 4 images in a row, wrapping on smaller screens */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl w-full">
        {deliveryApps.map((app, index) => (
          <a
            key={index}
            href={app.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            // On hover, scale the image container with a smooth animation.
            className="block transition-transform duration-500 hover:scale-110"
          >
            {app.src ? (
              <Image
                src={app.src || "/placeholder.svg"}
                alt={app.alt}
                width={200}
                height={150}
                className="rounded-lg object-contain w-[100px] h-[75px] sm:w-[150px] sm:h-[112px] md:w-[175px] md:h-[131px] lg:w-[200px] lg:h-[150px]"
                onError={() => handleImageError(index)}
              />
            ) : (
              // For the empty item, show a placeholder container.
              <div className="w-[100px] h-[75px] sm:w-[150px] sm:h-[112px] md:w-[175px] md:h-[131px] lg:w-[200px] lg:h-[150px] rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-xs sm:text-sm text-gray-500">Coming Soon</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  )
}

export default DeliveryAppLogos

