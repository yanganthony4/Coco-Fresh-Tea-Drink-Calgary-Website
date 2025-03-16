"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function DrinkImageSlider() {
  const drinks = [
    {src: "/images/Chocodream.png" },
    {src: "/images/grapefruit.png" },
    {src: "/images/bsmt.png" },
    {src: "/images/popping.png" },
    {src: "/images/matcha.png" },
    {src: "/images/popping.png" },
    {src: "/images/matcha.png" },
    {src: "/images/grapefruit.png" },
  ]

  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const calculatePosition = (index) => {
    const position = (index - currentDrinkIndex + drinks.length) % drinks.length
    const totalItems = drinks.length
    const radius = isMobile ? 110 : 200
    const baseAngle = (2 * Math.PI) / totalItems

    // Rotate the circle by adjusting the starting angle and direction
    const startAngle = Math.PI / 300 // Start from bottom (π/2) instead of top (-π/2)
    const angle = startAngle - baseAngle * position // Subtract to rotate clockwise

    // Calculate base coordinates
    const x = Math.sin(angle) * radius
    const y = Math.cos(angle) * radius * 0.35  // Compress vertically for perspective

    // Highlighted drink position (bottom center)
    if (position === 0) {
      return {
        transform: `
          translate(${x}px, ${y * 1.2}px)
          scale(1.2)
        `,
        zIndex: totalItems + 1,
        opacity: 1,
      }
    }

    // Lower opacity for non-highlighted drinks
    const opacity = 0.3

    // Calculate z-index to ensure proper layering
    const zIndex = Math.round((y / radius) * 10) + totalItems

    return {
      transform: `
        translate(${x}px, ${y}px)
        scale(0.8)
      `,
      zIndex,
      opacity,
    }
  }

  return (
    <div className="relative h-[400px] md:h-[500px] flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-[1200px] h-full flex justify-center items-center">
        {drinks.map((drink, index) => {
          const style = calculatePosition(index)
          const isHighlighted = (index - currentDrinkIndex + drinks.length) % drinks.length === 0

          return (
            <div key={index} className="absolute transition-all duration-700 ease-in-out" style={style}>
              <div className="relative">
                <Image
                  src={drink.src || "/placeholder.svg"}
                  alt={drink.name}
                  width={isMobile ? 90 : 160}
                  height={isMobile ? 130 : 240}
                  className="w-[80px] h-[120px] md:w-[160px] md:h-[240px] object-contain"
                  priority={isHighlighted}
                  loading={isHighlighted ? "eager" : "lazy"}
                />
                {isHighlighted && (
                  <p className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-black text-sm md:text-base font-bold whitespace-nowrap">
                    {drink.name}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

