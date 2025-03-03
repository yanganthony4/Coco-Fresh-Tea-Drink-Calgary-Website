"use client"

import LazyImage from "../LazyImage"
import { useEffect, useRef, useState } from "react"

export default function Page() {
  const canvasRef = useRef(null)
  const [hoveredYear, setHoveredYear] = useState(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up", "opacity-100")
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    })

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Canvas wave animation setup and rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    let offset = 0

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const drawSineWave = (baseOffset, color, amplitude, frequency, speed) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 5

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

      drawSineWave(0, "rgba(255, 166, 89, 0.4)", 30, 50, 1)
      drawSineWave(100, "rgba(173, 209, 158, 0.4)", 40, 60, 0.8)
      drawSineWave(200, "rgba(255, 145, 87, 0.4)", 35, 40, 1.2)

      offset += 0.25
      animationFrameId = requestAnimationFrame(drawWave)
    }

    const handleResize = () => {
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

  const timelineEvents = [
    { year: "1997", text: "The first CoCo store opened in Taipei", left: "5%", top: "50%" },
    { year: "2005", text: "100th store opened", left: "20%", top: "0" },
    { year: "2007", text: "The first CoCo store opened in Suzhou, China", left: "35%", top: "50%" },
    { year: "2012", text: "1000th store opened worldwide", left: "50%", top: "0" },
    { year: "2014", text: "The first CoCo store opened in Toronto, Canada", left: "65%", top: "50%" },
    { year: "2019", text: "3500+ store opened worldwide", left: "80%", top: "0" },
    { year: "2025", text: "5000+ store opened worldwide", left: "95%", top: "50%" },
  ]

  return (
    <div className="min-h-screen bg-[#ffe5d1] text-[#653128]">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <div className="w-full h-full max-w-[2000px] mx-auto">
          <LazyImage src="/images/image4.webp" alt="CoCo Hero Image" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-16 opacity-0 animate-fade-in text-center px-4">
              About CoCo
            </h1>
          </div>
        </div>
      </div>

      {/* Secondary Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center my-8 md:my-16 opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700">
        CoCo&apos;s Story
      </h2>

      <div className="w-full h-full py-4 space-y-8">
        {/* Main Content Section */}
        <div className="w-full px-4 md:px-6 relative space-y-8 md:space-y-32">
          {/* First Content Block */}
          <div className="relative min-h-[400px] flex flex-col md:block items-center opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700 max-w-[2000px] mx-auto">
            <div className="w-full md:w-[45%] md:absolute md:left-[10%]">
              <LazyImage
                src="/images/122b2bb7-e065-4676-9692-86ff09443f32-retina-large.webp"
                alt="First Flexbox Image"
                className="w-full h-[300px] object-cover rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              />
            </div>
            <div className="w-full md:w-[60%] md:absolute md:right-[10%] md:-ml-[5%] z-10 mt-4 md:mt-16">
              <div className="bg-white p-6 md:p-8 rounded-lg text-left md:text-right shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-lg">
                  CoCo Bubble Tea, founded in 1997 by Chairman Tommy Hung, is a global leader in bubble tea, known for
                  its commitment to quality and innovation. With a mission of &quot;Consistency and Continuity,&quot;
                  CoCo has become a favorite among bubble tea lovers worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Second Content Block */}
          <div className="relative min-h-[400px] flex flex-col md:block items-center opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700 max-w-[2000px] mx-auto">
            <div className="w-full md:w-[60%] md:absolute md:left-[10%] z-10 order-2 md:order-none mt-4 md:mt-16">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-lg">
                  In Canada, CoCo Bubble Tea offers a diverse menu of creative drinks made with fresh ingredients,
                  served in stylish and welcoming stores. From classic milk teas to bold fruit infusions, CoCo brings an
                  authentic and innovative bubble tea experience to communities across the country.
                </p>
              </div>
            </div>
            <div className="w-full md:w-[45%] md:absolute md:right-[10%] order-1 md:order-none">
              <LazyImage
                src="/images/image3.webp"
                alt="Second Flexbox Image"
                className="w-full h-[300px] object-cover rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              />
            </div>
          </div>

          {/* Third Content Block */}
          <div className="relative min-h-[400px] flex flex-col md:block items-center opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700 max-w-[2000px] mx-auto">
            <div className="w-full md:w-[45%] md:absolute md:left-[10%]">
              <LazyImage
                src="/images/image1.webp"
                alt="Third Flexbox Image"
                className="w-full h-[300px] object-cover rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              />
            </div>
            <div className="w-full md:w-[60%] md:absolute md:right-[10%] md:-ml-[5%] z-10 mt-4 md:mt-16">
              <div className="bg-white p-6 md:p-8 rounded-lg text-left md:text-right shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-lg">
                  As CoCo expands in Canada, it remains dedicated to inclusivity, sustainability, and a passion for tea.
                  Discover your nearest CoCo location and join the bubble tea revolution today!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative shadow-lg bg-[#ffe5d1] w-full mt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center pt-8 px-4">
            From Taiwan to Canada, and the World
          </h2>
          <div className="relative max-w-[2000px] mx-auto">
            <canvas ref={canvasRef} className="w-full h-[310px]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-x-auto">
              <div className="relative h-full min-w-[768px]">
                {timelineEvents.map((point) => (
                  <div
                    key={point.year}
                    className="absolute transform -translate-x-1/2 transition-all duration-300"
                    style={{
                      left: point.left,
                      top: point.top === "0" ? "20%" : "70%",
                    }}
                    onMouseEnter={() => setHoveredYear(point.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-4 h-4 bg-[#FF6B35] rounded-full mx-auto mb-2 transition-transform duration-300 ${
                          hoveredYear === point.year ? "scale-150" : ""
                        }`}
                      />
                      <div className="text-[#653128] font-bold text-lg mb-1">{point.year}</div>
                      <div
                        className={`absolute z-10 transition-all duration-300 ${
                          hoveredYear === point.year ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                        }`}
                        style={{
                          top: point.top === "0" ? "100%" : "auto",
                          bottom: point.top === "50%" ? "100%" : "auto",
                        }}
                      >
                        <div className="max-w-[150px] text-sm text-[#653128] leading-tight bg-white/90 p-2 rounded-lg shadow-lg">
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
    </div>
  )
}

