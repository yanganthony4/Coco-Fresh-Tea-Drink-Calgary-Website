'use client'

import Toolbar from '../components/Toolbar';

import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const canvasRef = useRef(null)
  const [hoveredYear, setHoveredYear] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let offset = 0

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const drawSineWave = (baseOffset, color, amplitude, frequency, speed) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2

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

      offset += 0.25
      animationFrameId = requestAnimationFrame(drawWave)
    }

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawWave()
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
    { year: '1997', text: 'The first CoCo store opened in Taipei', left: '5%', top: '50%' },
    { year: '2005', text: '100th store opened', left: '25%', top: '0' },
    { year: '2007', text: 'The first CoCo store opened in Suzhou, China', left: '45%', top: '50%' },
    { year: '2012', text: '1000th store opened worldwide', left: '65%', top: '0' },
    { year: '2014', text: 'The first CoCo store opened in Toronto, Canada', left: '75%', top: '50%' },
    { year: '2019', text: '3500+ store opened worldwide', left: '95%', top: '0' }
  ]

  return (
    <div className="min-h-screen bg-[#FFD9A0]">
      <div className="container mx-auto px-4 py-8 space-y-16 overflow-y-auto h-screen">
        {/* About Section */}
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">About CoCo</h2>
              <div className="space-y-4 text-gray-800">
                <p>
                  CoCo was founded in 1997 by Chairman Tommy Hung. In a world where culture blends with tea, CoCo found its core mission, 'Consistency and Continuity', to bring the highest quality of tea with unmatchable services to its customers, and began its journey in building the world's biggest bubble tea empire.
                </p>
                <p>
                  Spanning over decades of diligence and consistency, CoCo kept its promises and passions in quality and services with innovative new drinks, stylish store designs, quality fresh fruits and distinctive recipes. With the persistence of traditional craftsmanship, bold innovations and sharp international perspectives, CoCo successfully brought its spirit overseas with the first New York store opening in 2011.
                </p>
                <p>
                  CoCo always aims to create a diverse and sustainable community for its customers, provide eyes-refreshing products, and is dedicated to "Embrace Tradition, Unleash Innovation, and Seize the World."
                </p>
              </div>
            </div>
            <div>
              <img 
                src="/placeholder.svg?height=360&width=495"
                alt="CoCo Store"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="w-full max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-12 text-center">From Taiwan to Canada, and the World</h1>
          
          <div className="relative">
            <canvas 
              ref={canvasRef} 
              className="w-full h-[250px]"
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
                    onMouseEnter={() => setHoveredYear(point.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className={`w-4 h-4 bg-[#FF6B35] rounded-full mx-auto mb-2 transition-transform duration-300 ${hoveredYear === point.year ? 'scale-150' : ''}`} />
                      {/* Static year display */}
                      <div className="text-[#FF6B35] font-bold text-lg mb-1">
                        {point.year}
                      </div>
                      {/* Hoverable event text */}
                      <div className={`absolute top-full mt-2 transition-all duration-300 ${
                        hoveredYear === point.year 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 -translate-y-2'
                      }`}>
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

