"use client"
import { useEffect, useRef, useState } from "react"

interface TimelineEvent {
  year: string
  text: string
  left: string
  mobileLeft: string
  top: string
}

export default function TimelineSection(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hoveredYear, setHoveredYear] = useState<string | null>(null)
  const [activeYear, setActiveYear] = useState<string | null>(null) // New state for clicked/tapped year
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const timelineEvents: TimelineEvent[] = [
    { year: "1997", text: "The first CoCo store opened in Taipei", left: "5%", mobileLeft: "5%", top: "50%" },
    { year: "2005", text: "100th store opened", left: "20%", mobileLeft: "20%", top: "0" },
    {
      year: "2007",
      text: "The first CoCo store opened in Suzhou, China",
      left: "35%",
      mobileLeft: "35%",
      top: "50%",
    },
    { year: "2012", text: "1000th store opened worldwide", left: "50%", mobileLeft: "50%", top: "0" },
    {
      year: "2014",
      text: "The first CoCo store opened in Toronto, Canada",
      left: "65%",
      mobileLeft: "65%",
      top: "50%",
    },
    { year: "2019", text: "3500+ stores opened worldwide", left: "80%", mobileLeft: "80%", top: "0" },
    { year: "2025", text: "5000+ stores opened worldwide", left: "95%", mobileLeft: "95%", top: "50%" },
  ]

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let offset = 0

    const drawWave = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const drawSineWave = (
        baseOffset: number,
        color: string,
        amplitude: number,
        frequency: number,
        speed: number,
      ): void => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 3

        // Start from left edge of screen on mobile with more extension
        const startX = isMobile ? -100 : 0
        // Extend to right edge of screen on mobile with more extension
        const endX = isMobile ? canvas.width + 100 : canvas.width

        for (let x = startX; x < endX; x++) {
          const y = amplitude * Math.sin((x + baseOffset + offset * speed) / frequency) + canvas.height / 2
          if (x === startX) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      // Draw 3 animated waves
      drawSineWave(0, "rgba(255, 166, 89, 0.3)", 25, 50, 1)
      drawSineWave(100, "rgba(173, 209, 158, 0.3)", 30, 60, 0.8)
      drawSineWave(200, "rgba(255, 145, 87, 0.3)", 28, 40, 1.2)
    }

    const animate = (): void => {
      drawWave()
      offset += 0.25
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = (): void => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawWave()
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    animate() // Always animate on all devices

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  // Handle click/tap on timeline dots
  const handleDotClick = (year: string): void => {
    if (activeYear === year) {
      setActiveYear(null) // Toggle off if already active
    } else {
      setActiveYear(year) // Set as active
    }
  }

  // Helper function to determine tooltip position
  const getTooltipPosition = (left: string): string => {
    const leftValue = Number.parseFloat(left)
    if (leftValue <= 15) return "left-0"
    if (leftValue >= 85) return "right-0"
    return ""
  }

  return (
    <div
      className="w-full py-10 reveal-on-scroll opacity-100 transition-all duration-700"
      style={{ transform: "translateY(40px)" }}
    >
      <div className="max-w-7xl mx-auto px-0 md:px-6">
        {/* Section heading */}
        <div className="px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:text-center text-left animated-underline inline-block">
            OUR GLOBAL JOURNEY
          </h2>
        </div>

        <div className="relative bg-white/50 px-0 md:px-8 py-10 backdrop-blur-sm">
          {/* Smaller canvas height on mobile */}
          <canvas ref={canvasRef} className="w-full h-[120px] md:h-[280px]" />

          {/* Timeline container scaled down on mobile to fit screen */}
          <div className="absolute top-0 left-0 w-full h-full overflow-visible py-8">
            <div className="relative h-full w-full scale-100 md:scale-100">
              {timelineEvents.map((point) => {
                const leftValue = Number.parseFloat(isMobile ? point.mobileLeft : point.left)
                const isLeftEdge = leftValue <= 15
                const isRightEdge = leftValue >= 85

                return (
                  <div
                    key={point.year}
                    className="absolute transform -translate-x-1/2 transition-all duration-300"
                    style={{
                      left: isMobile ? point.mobileLeft : point.left,
                      top: point.top === "0" ? "20%" : "75%",
                    }}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Timeline dot - larger touch target on mobile */}
                      <button
                        className={`w-6 h-6 md:w-5 md:h-5 flex items-center justify-center transition-transform duration-300 ${
                          hoveredYear === point.year || activeYear === point.year ? "scale-125" : ""
                        }`}
                        onMouseEnter={() => setHoveredYear(point.year)}
                        onMouseLeave={() => setHoveredYear(null)}
                        onClick={() => handleDotClick(point.year)}
                        aria-label={`${point.year}: ${point.text}`}
                      >
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-[#FF6B35] rounded-full" />
                      </button>

                      {/* Year label with enhanced mobile readability */}
                      <div className="text-[black] font-bold text-[9.5px] md:text-lg mb-1 scale-100">{point.year}</div>

                      {/* Tooltip box - show on hover or when active (clicked/tapped) */}
                      <div
                        className={`absolute z-10 transition-all duration-300 ${
                          hoveredYear === point.year || activeYear === point.year
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                        style={{
                          top: point.top === "0" ? "100%" : "auto",
                          bottom: point.top === "50%" ? "100%" : "auto",
                          // Adjust horizontal position for edge dots
                          left: isLeftEdge ? "0" : "auto",
                          right: isRightEdge ? "0" : "auto",
                          transform: isLeftEdge ? "translateX(0)" : isRightEdge ? "translateX(0)" : "translateX(-50%)",
                        }}
                      >
                        <div className="min-w-[120px] max-w-[220px] md:max-w-[260px] text-xs md:text-sm text-[black] leading-tight bg-white p-3 rounded-lg text-center shadow-md whitespace-normal break-words">
                          {point.text}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
