"use client";
import { useEffect, useRef, useState } from "react";

export default function TimelineSection() {
  const canvasRef = useRef(null);
  const [hoveredYear, setHoveredYear] = useState(null);

  const timelineEvents = [
    { year: "1997", text: "The first CoCo store opened in Taipei", left: "5%", top: "50%" },
    { year: "2005", text: "100th store opened", left: "20%", top: "0" },
    { year: "2007", text: "The first CoCo store opened in Suzhou, China", left: "35%", top: "50%" },
    { year: "2012", text: "1000th store opened worldwide", left: "50%", top: "0" },
    { year: "2014", text: "The first CoCo store opened in Toronto, Canada", left: "65%", top: "50%" },
    { year: "2019", text: "3500+ stores opened worldwide", left: "80%", top: "0" },
    { year: "2025", text: "5000+ stores opened worldwide", left: "95%", top: "50%" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let offset = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawSineWave = (baseOffset, color, amplitude, frequency, speed) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;

        for (let x = 0; x < canvas.width; x++) {
          const y =
            amplitude * Math.sin((x + baseOffset + offset * speed) / frequency) +
            canvas.height / 2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      };

      // Draw 3 animated waves
      drawSineWave(0, "rgba(255, 166, 89, 0.3)", 25, 50, 1);
      drawSineWave(100, "rgba(173, 209, 158, 0.3)", 30, 60, 0.8);
      drawSineWave(200, "rgba(255, 145, 87, 0.3)", 28, 40, 1.2);
    };

    const animate = () => {
      drawWave();
      offset += 0.25;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawWave();
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate(); // Always animate on all devices

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full py-10 reveal-on-scroll opacity-100 transition-all duration-700" style={{ transform: "translateY(40px)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:text-center text-left animated-underline inline-block">
            OUR GLOBAL JOURNEY
          </h2>
        </div>

        <div className="relative bg-white/50 px-4 py-8 md:px-8 backdrop-blur-sm">
          {/* Smaller canvas height on mobile */}
          <canvas ref={canvasRef} className="w-full h-[80px] md:h-[280px]" />

          {/* Timeline container scaled down on mobile to fit screen */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden py-8">
          <div className="relative h-full w-full scale-100 md:scale-100 grid grid-cols-7 gap-2">
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
                    {/* Timeline dot */}
                    <div
                      className={`w-3 h-3 md:w-5 md:h-5 bg-[#FF6B35] rounded-full mx-auto mb-1 transition-transform duration-300 ${
                        hoveredYear === point.year ? "scale-125" : ""
                      }`}
                    />


                    {/* Year label with enhanced mobile readability */}
                    <div className="text-[black] font-bold text-[9.5px] md:text-lg mb-1 scale-100">
                      {point.year}
                    </div>


                    {/* Tooltip box */}
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
  );
}
