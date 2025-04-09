"use client"

import { useEffect, useRef, useState } from "react"

interface TimelineEvent {
  readonly year: string
  readonly text: string
  readonly left: string
  readonly top: "0" | "50%" // only allowed values
}

export default function TimelineSection(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hoveredYear, setHoveredYear] = useState<string | null>(null)

  const timelineEvents: readonly TimelineEvent[] = [
    { year: "1997", text: "The first CoCo store opened in Taipei", left: "5%", top: "50%" },
    { year: "2005", text: "100th store opened", left: "20%", top: "0" },
    { year: "2007", text: "The first CoCo store opened in Suzhou, China", left: "35%", top: "50%" },
    { year: "2012", text: "1000th store opened worldwide", left: "50%", top: "0" },
    { year: "2014", text: "The first CoCo store opened in Toronto, Canada", left: "65%", top: "50%" },
    { year: "2019", text: "3500+ stores opened worldwide", left: "80%", top: "0" },
    { year: "2025", text: "5000+ stores opened worldwide", left: "95%", top: "50%" },
  ]

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
        speed: number
      ): void => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 3
  
        for (let x = 0; x < canvas.width; x++) {
          const y = amplitude * Math.sin((x + baseOffset + offset * speed) / frequency) + canvas.height / 2
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
  
        ctx.stroke()
      }
  
      drawSineWave(0, "rgba(255, 166, 89, 0.3)", 30, 50, 1)
      drawSineWave(100, "rgba(173, 209, 158, 0.3)", 40, 60, 0.8)
      drawSineWave(200, "rgba(255, 145, 87, 0.3)", 35, 40, 1.2)
  
      offset += 0.25
      animationFrameId = requestAnimationFrame(drawWave)
    }
  
    const handleResize = (): void => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawWave()
    }
  
    window.addEventListener("resize", handleResize)
    handleResize()
    drawWave()
  
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="w-full py-10 reveal-on-scroll opacity-100 transition-all duration-700" style={{ transform: "translateY(40px)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center animated-underline inline-block">
            OUR GLOBAL JOURNEY
          </h2>
        </div>

        <div className="relative bg-white/50 p-8 backdrop-blur-sm">
          <canvas ref={canvasRef} className="w-full h-[280px]" />

          <div className="absolute top-0 left-0 w-full h-full overflow-x-auto py-8">
            <div className="relative h-full min-w-[768px]">
              {timelineEvents.map((point: TimelineEvent): JSX.Element => (
                <div
                  key={point.year}
                  className="absolute transform -translate-x-1/2 transition-all duration-300"
                  style={{
                    left: point.left,
                    top: point.top === "0" ? "20%" : "70%",
                  }}
                  onMouseEnter={(): void => setHoveredYear(point.year)}
                  onMouseLeave={(): void => setHoveredYear(null)}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-5 h-5 bg-[#FF6B35] rounded-full mx-auto mb-2 transition-transform duration-300 ${
                        hoveredYear === point.year ? "scale-150" : ""
                      }`}
                    />
                    <div className="text-[black] font-bold text-lg mb-1">{point.year}</div>
                    <div
                      className={`absolute z-10 transition-all duration-300 ${
                        hoveredYear === point.year ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                      }`}
                      style={{
                        top: point.top === "0" ? "100%" : "auto",
                        bottom: point.top === "50%" ? "100%" : "auto",
                      }}
                    >
                      <div className="min-w-[120px] max-w-[220px] md:max-w-[260px] text-sm text-[black] leading-tight bg-white p-3 rounded-lg text-center shadow-md whitespace-normal break-words">
                        {point.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
