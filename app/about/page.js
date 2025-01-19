"use client"

import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const canvasRef = useRef(null)
  const [hoveredYear, setHoveredYear] = useState(null) // Dynamic Timeline Hover

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let offset = 0

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Sine Waves That Make Up The Dynamic Animation
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

      drawSineWave(0, 'rgba(255, 166, 89, 0.4)', 30, 50, 1)
      drawSineWave(100, 'rgba(173, 209, 158, 0.4)', 40, 60, 0.8)
      drawSineWave(200, 'rgba(255, 145, 87, 0.4)', 35, 40, 1.2)

      offset += 0.25 // Increment wave offset
      animationFrameId = requestAnimationFrame(drawWave) // Requests next frame
    }

    // Lines 49 - 50 Adjust width and height to display size
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawWave() // Redraws waves after resize
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    drawWave()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const timelineEvents = [
    // Different timelines for different events
    { year: '1997', text: 'The first CoCo store opened in Taipei', left: '5%', top: '50%' },
    { year: '2005', text: '100th store opened', left: '20%', top: '0' },
    { year: '2007', text: 'The first CoCo store opened in Suzhou, China', left: '35%', top: '50%' },
    { year: '2012', text: '1000th store opened worldwide', left: '50%', top: '0' },
    { year: '2014', text: 'The first CoCo store opened in Toronto, Canada', left: '65%', top: '50%' },
    { year: '2019', text: '3500+ store opened worldwide', left: '80%', top: '0' },
    { year: '2025', text: '5000+ store opened worldwide', left: '95%', top: '50%' }
  ]
// Let box colour be #FFD9A0
  return (
    <div className="min-h-screen bg-[#FFFF]"> 
      <div className="width-100% height-100% py-8 space-y-16">
        {/* About Section */}
        <div className="w-full max-w-[1750px] mx-auto pl-[35px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-6 text-center bg-[#FFD9A0] rounded-xl shadow-lg w-[80%]" style={{ margin: '35px' }}>
              <h2 className="text-3xl font-bold text-black text-center px-20 pt-5">About CoCo</h2>
              <div className="space-y-4 text-gray-800 px-20 pb-8">
                <p>
                  CoCo was established in 1997 by Chairman Tommy Hung with a vision to revolutionize the world of tea. 
                  In a global landscape where diverse cultures converge over a shared love for tea, CoCo discovered its 
                  guiding principle: "Consistency and Continuity." This philosophy drives the brand's unwavering commitment 
                </p>
                <p>
                  For decades, CoCo has upheld its dedication to quality and service, delivering on its promises with unwavering passion. 
                  Through innovative beverage creations, chic and inviting store designs, the use of fresh, high-quality fruits, and unique 
                  recipes, CoCo has consistently set itself apart. Blending the art of traditional craftsmanship with bold innovation and a 
                </p>
                <p>
                  CoCo is committed to fostering a vibrant and sustainable community for its customers, offering visually appealing and refreshingly 
                  delightful products. Guided by its enduring mission to "Embrace Tradition, Unleash Innovation, and Seize the World," CoCo strives 
                  to honor its roots while continuously pushing boundaries to redefine the bubble tea experience for a global audience.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="/placeholder.svg?height=360&width=495" // Current placeholder for image *** CHANGE TO PROPER IMAGE ***
                alt="CoCo Store"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="w-full">
          <div className="relative shadow-lg flex justify-center items-center flex-col bg-[#FFD9A0] rounded-xl" style={{ margin: '35px' }}>
            {/* Heading inside the flexbox with shadow */}
            <h1 className="text-3xl font-bold mb-12 text-center text-black">From Taiwan to Canada, and the World</h1>
            
            {/* Canvas for the timeline */}
            <canvas 
              ref={canvasRef} 
              className="w-full h-[310px]"
            />
            
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative h-full">
                {timelineEvents.map((point, index) => (
                  <div
                    key={point.year}
                    className="absolute transform -translate-x-1/2 transition-all duration-300"
                    style={{
                      left: point.left,
                      top: point.top === '0' ? '20%' : '70%',
                    }}
                    onMouseEnter={() => setHoveredYear(point.year)} // Lines 124 & 125 show and hide hover animations
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className={`w-4 h-4 bg-[#FF6B35] rounded-full mx-auto mb-2 transition-transform duration-300 ${hoveredYear === point.year ? 'scale-150' : ''}`} />
                      {/* Static year display */}
                      <div className="text-[#FF6B35] font-bold text-lg mb-1">
                        {point.year}
                      </div>
                      {/* Hoverable event text */}
                      <div className={` top-full mt-2 transition-all duration-300 ${hoveredYear === point.year ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                        <div className="max-w-[150px] text-sm text-gray-800 leading-tight bg-white/80 p-2 rounded-lg">
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
