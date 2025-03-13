"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function AboutPage() {
  const canvasRef = useRef(null)
  const [hoveredYear, setHoveredYear] = useState(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in", "opacity-100")
          entry.target.style.transform = "translateY(0)"
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
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
    <div className="min-h-screen bg-white text-[black]">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffe5d1]/80 z-10" />
        <div className="w-full h-full">
          <Image
            src="/images/image4.webp"
            alt="CoCo Hero Image"
            className="w-full h-full object-cover object-center"
            width={2000}
            height={1200}
            priority
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 opacity-0 animate-fade-in text-center">
              About CoCo
            </h1>
            <div className="w-24 h-1 bg-white rounded-full opacity-0 animate-fade-in animation-delay-300" />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2
          className="text-3xl md:text-5xl font-bold text-center mb-20 reveal-on-scroll opacity-0 transition-all duration-700"
          style={{ transform: "translateY(40px)" }}
        >
          OUR STORY!
        </h2>

        {/* Content Sections */}
        <div className="space-y-32">
          {/* First Content Block */}
          <div
            className="relative grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal-on-scroll opacity-0 transition-all duration-700"
            style={{ transform: "translateY(40px)" }}
          >
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#FF6B35]/10 transform -rotate-2 -z-10" />
                <Image
                  src="/images/122b2bb7-e065-4676-9692-86ff09443f32-retina-large.webp"
                  alt="CoCo Bubble Tea Origin"
                  width={600}
                  height={400}
                  className=" w-full h-[350px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-[#FF6B35] font-medium mb-3 block">Our Beginning</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">A Global Bubble Tea Leader</h3>
              <p className="text-lg leading-relaxed">
                CoCo Bubble Tea is founded in 1997 by Chairman, Tommy Hung. In a world where culture blends with tea,
                CoCo found its core mission, 'Consistency and Continuity', to bring the highest quality of tea with
                unmatchable services to its customers, and began its journey in building the world's biggest bubble tea
                empire. Spanning over decades of diligence and consistency, CoCo kept its promises and passions in
                quality and services with innovative new drinks, stylish store designs, quality fresh fruits and
                distinctive recipes. With the persistent on traditional craftsmanship, bold innovations and sharp
                international perspectives, CoCo has successfully brought its spirit overseas with the first New York
                store opening in 2011. CoCo always aims to create a diversity and sustainable community for its
                customers, provide eyes refreshing products, and is dedicated to "Embrace Tradition, Unleash Innovation,
                and Seize the World."
              </p>
            </div>
          </div>

          {/* Second Content Block */}
          <div
            className="relative grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal-on-scroll opacity-0 transition-all duration-700"
            style={{ transform: "translateY(40px)" }}
          >
            <div>
              <span className="text-[#FF6B35] font-medium mb-3 block">Canadian Experience</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Fresh Ingredients, Creative Drinks</h3>
              <p className="text-lg leading-relaxed">
                In Canada, CoCo Bubble Tea offers a diverse menu of creative drinks made with fresh ingredients, served
                in stylish and welcoming stores. From classic milk teas to bold fruit infusions, CoCo brings an
                authentic and innovative bubble tea experience to communities across the country. As CoCo expands in
                Canada, it remains dedicated to inclusivity, sustainability, and a passion for tea.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#FF6B35]/10  -z-10 transform rotate-2" />
              <Image
                src="/images/image3.webp"
                alt="CoCo Bubble Tea Canada"
                width={600}
                height={400}
                className=" w-full h-[350px] object-cover"
              />
            </div>
          </div>

          {/* Third Content Block */}
          <div
            className="relative grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal-on-scroll opacity-0 transition-all duration-700"
            style={{ transform: "translateY(40px)" }}
          >
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#FF6B35]/10  -z-10 transform -rotate-2" />
                <Image
                  src="/images/image1.webp"
                  alt="CoCo Bubble Tea Future"
                  width={600}
                  height={400}
                  className=" w-full h-[350px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-[#FF6B35] font-medium mb-3 block">Our Vision</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Sustainability & Inclusivity</h3>
              <p className="text-lg leading-relaxed">
                CoCo dedicates to everything we do. We seek high-quality ingredients, we deliver trendy drinks mixed
                with our passion and dedication, and we provide service from the heart and promise to give you the best
                we have
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div
        className="w-full py-20 reveal-on-scroll opacity-0 transition-all duration-700"
        style={{ transform: "translateY(40px)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">OUR GLOBAL JOURNEY</h2>

          <div className="relative bg-white/50  p-8 backdrop-blur-sm">
            <canvas ref={canvasRef} className="w-full h-[280px]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-x-auto py-8">
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
                        <div className="max-w-[180px] text-sm text-[black] leading-tight bg-white p-3 rounded-lg">
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

      {/* Values Section */}
      <div className="w-full py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center reveal-on-scroll opacity-0 transition-all duration-700"
            style={{ transform: "translateY(40px)" }}
          >
            OUR VALUES
          </h2>

          <div
            className="grid md:grid-cols-3 gap-8 reveal-on-scroll opacity-0 transition-all duration-700"
            style={{ transform: "translateY(40px)" }}
          >
            <div className="bg-[#FF6B35]/10 p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#FF6B35]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-[black]/80">
                We source only the finest ingredients and maintain strict quality control to ensure every cup is
                perfect.
              </p>
            </div>

            <div className="bg-[#FF6B35]/10 p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#FF6B35]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-[black]/80">
                We continuously explore new flavors and techniques to bring exciting bubble tea experiences to our
                customers.
              </p>
            </div>

            <div className="bg-[#FF6B35]/10 p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#FF6B35]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Consistency</h3>
              <p className="text-[black]/80">
                Whether you visit us in Calgary or Taipei, you can expect the same delicious taste and exceptional
                service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
