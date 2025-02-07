"use client"

import LazyImage from '../LazyImage';
import { useEffect, useRef, useState } from "react" 
import Layout from "../components/Layout"

export default function Page() {
  // Hook declarations and state management
  const canvasRef = useRef(null)
  const [hoveredYear, setHoveredYear] = useState(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes when element comes into view
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

    // Function to draw the animated wave pattern
    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Helper function to draw individual sine waves
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

      // Draw three overlapping waves with different parameters
      drawSineWave(0, "rgba(255, 166, 89, 0.4)", 30, 50, 1)
      drawSineWave(100, "rgba(173, 209, 158, 0.4)", 40, 60, 0.8)
      drawSineWave(200, "rgba(255, 145, 87, 0.4)", 35, 40, 1.2)

      offset += 0.25
      animationFrameId = requestAnimationFrame(drawWave)
    }

    // Handle canvas resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawWave()
    }

    // Event listeners setup and cleanup
    window.addEventListener("resize", handleResize)
    handleResize()
    drawWave()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Timeline data configuration
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
    <Layout>
      <div className="min-h-screen bg-[#ffe5d1] text-[#653128]">
        {/* Hero Section: Full-width image with overlay and main title */}
        <div className="relative w-full h-[60vh] overflow-hidden">
          <LazyImage src="/images/hero-image.jpg" alt="CoCo Hero Image" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-white mb-16 opacity-0 animate-fade-in">About CoCo</h1>
          </div>
        </div>

        {/* Secondary Title: Appears after hero section */}
        <h2 className="text-4xl font-bold text-center my-16 opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700">
          CoCo's Story
        </h2>

        <div className="w-full h-full py-4 space-y-8">
          {/* Main Content Section: Three alternating image/text blocks */}
          <div className="w-full px-4 md:px-6 relative space-y-8">
            {/* First Content Block: Image left, text right */}
            <div className="relative h-[400px] flex items-center opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700">
              <div className="absolute left-0 md:left-[10%] w-[45%]">
                <LazyImage
                  src="/images/122b2bb7-e065-4676-9692-86ff09443f32-retina-large.webp"
                  alt="First Flexbox Image"
                  className="w-full h-[300px] object-cover rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                />
              </div>
              <div className="absolute right-0 md:right-[10%] w-[60%] -ml-[5%] z-10 transition-all duration-300 hover:scale-105">
                <p className="text-lg bg-white p-8 rounded-lg text-right shadow-lg h-[204px] flex items-center justify-center">
                  CoCo Bubble Tea, founded in 1997 by Chairman Tommy Hung, is a global leader in bubble tea, known for its
                  commitment to quality and innovation. With a mission of "Consistency and Continuity," CoCo has become a
                  favorite among bubble tea lovers worldwide.
                </p>
              </div>
            </div>

            {/* Second Content Block: Text left, image right */}
            <div className="relative h-[400px] flex items-center opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700">
              <div className="absolute left-0 md:left-[10%] w-[60%] z-10 transition-all duration-300 hover:scale-105">
                <p className="text-lg bg-white p-8 rounded-lg shadow-lg h-[204px] flex items-center justify-center">
                  In Canada, CoCo Bubble Tea offers a diverse menu of creative drinks made with fresh ingredients, served
                  in stylish and welcoming stores. From classic milk teas to bold fruit infusions, CoCo brings an
                  authentic and innovative bubble tea experience to communities across the country.
                </p>
              </div>
              <div className="absolute right-0 md:right-[10%] w-[45%]">
                <LazyImage
                  src="/images/second-image.jpg"
                  alt="Second Flexbox Image"
                  className="w-full h-[300px] object-cover rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                />
              </div>
            </div>

            {/* Third Content Block: Image left, text right */}
            <div className="relative h-[400px] flex items-center opacity-0 reveal-on-scroll translate-y-6 transition-all duration-700">
              <div className="absolute left-0 md:left-[10%] w-[45%]">
                <LazyImage
                  src="/images/third-image.jpg"
                  alt="Third Flexbox Image"
                  className="w-full h-[300px] object-cover rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                />
              </div>
              <div className="absolute right-0 md:right-[10%] w-[60%] -ml-[5%] z-10 transition-all duration-300 hover:scale-105">
                <p className="text-lg bg-white p-8 rounded-lg text-right shadow-lg h-[204px] flex items-center justify-center">
                  As CoCo expands in Canada, it remains dedicated to inclusivity, sustainability, and a passion for tea.
                  Discover your nearest CoCo location and join the bubble tea revolution today!
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Section: Interactive historical timeline with wave animation */}
          <div className="relative shadow-lg bg-[#f5d3ba] w-full mt-8">
            <h1 className="text-3xl font-bold mb-12 text-center pt-8">From Taiwan to Canada, and the World</h1>
            {/* Canvas element for wave animation */}
            <canvas ref={canvasRef} className="w-full h-[310px]" />
            {/* Timeline events overlay */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative h-full">
                {/* Map through timeline events to create interactive points */}
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
                        className={`top-full mt-2 transition-all duration-300 ${
                          hoveredYear === point.year ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                        }`}
                      >
                        <div className="max-w-[150px] text-sm text-[#653128] leading-tight bg-#f78a39 p-2 rounded-lg">
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
    </Layout>
  )
}
