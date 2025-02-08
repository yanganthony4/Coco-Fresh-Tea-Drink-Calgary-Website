"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function DrinkImageSlider() {
  const drinks = [
    { name: "ChocoDream", src: "/images/ChocoDream.png" },
    { name: "Grapefruit", src: "/images/grapefruit.png" },
    { name: "BSMT", src: "/images/bsmt.png" },
    { name: "Popping", src: "/images/popping.png" },
    { name: "Matcha", src: "/images/matcha.png" },
  ]

  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const calculatePosition = (index) => {
    const position = (index - currentDrinkIndex + drinks.length) % drinks.length

    // Mobile positions
    if (window.innerWidth < 640) {
      switch (position) {
        case 0:
          return "translate-x-0 translate-y-0 scale-100 z-10 opacity-100"
        case 1:
          return "translate-x-[150px] translate-y-[-10px] scale-90 z-5 opacity-90"
        case drinks.length - 1:
          return "translate-x-[-150px] translate-y-[-10px] scale-90 z-5 opacity-90"
        case 2:
          return "translate-x-[300px] translate-y-[-20px] scale-80 z-0 opacity-75"
        case drinks.length - 2:
          return "translate-x-[-300px] translate-y-[-20px] scale-80 z-0 opacity-75"
        default:
          return "translate-y-[-30px] scale-70 opacity-50 z-0"
      }
    }

    // Desktop positions
    switch (position) {
      case 0:
        return "translate-x-0 translate-y-0 scale-125 z-10 opacity-100"
      case 1:
        return "translate-x-[200px] translate-y-[-20px] scale-110 z-5 opacity-90"
      case drinks.length - 1:
        return "translate-x-[-200px] translate-y-[-20px] scale-110 z-5 opacity-90"
      case 2:
        return "translate-x-[400px] translate-y-[-40px] scale-100 z-0 opacity-75"
      case drinks.length - 2:
        return "translate-x-[-400px] translate-y-[-40px] scale-100 z-0 opacity-75"
      default:
        return "translate-y-[-50px] scale-90 opacity-50 z-0"
    }
  }

  return (
    <div className="relative h-[300px] sm:h-[500px] flex justify-center items-center overflow-hidden bg-white">
      {drinks.map((drink, index) => {
        const positionClasses = calculatePosition(index)
        const isCenter = (index - currentDrinkIndex + drinks.length) % drinks.length === 0

        return (
          <div key={index} className={`absolute transition-transform duration-700 ease-in-out ${positionClasses}`}>
            <Image
              src={drink.src || "/placeholder.svg"}
              alt={drink.name}
              width={280}
              height={360}
              className="w-[180px] h-[240px] sm:w-[280px] sm:h-[360px] rounded-lg object-contain"
              priority={isCenter}
              loading={isCenter ? "eager" : "lazy"}
            />
            {isCenter && (
              <p className="text-center mt-2 sm:mt-4 text-[#653128] text-base sm:text-lg font-bold">{drink.name}</p>
            )}
          </div>
        )
      })}

     
    </div>
  )
}

