"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useForm, usePlugin } from "tinacms"

export default function ImageSlider({ initialImages }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Define editable fields with TinaCMS
  const [formData, form] = useForm({
    initialValues: {
      images: initialImages,
    },
    onSubmit: (data) => {
      console.log("Updated Images Data:", data.images)
    //logic for saving updates to backend
    },
    fields: [
      {
        name: "images",
        label: "Images",
        component: "group-list",
        itemProps: (item) => ({
          key: item,
          label: item,
        }),
        defaultItem: () => "/placeholder.svg",
        fields: [
          {
            name: "image",
            label: "Image URL",
            component: "text",
          },
        ],
      },
    ],
  })

  // Connect the form to TinaCMS
  usePlugin(form)

  // Extract images from formData
  const images = formData.images

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative bg-white w-full overflow-hidden">
      <div className="flex justify-center">
        <div className="relative w-full max-w-[1555px] h-[200px] sm:h-[400px] md:h-[600px] lg:h-[800px]">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt="Promotional Background"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1555px"
            priority={currentImageIndex === 0}
            loading={currentImageIndex === 0 ? "eager" : "lazy"}
          />
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${
              currentImageIndex === index ? "bg-orange-500" : "bg-orange-200"
            } transition-colors duration-300`}
          ></button>
        ))}
      </div>
    </section>
  )
}