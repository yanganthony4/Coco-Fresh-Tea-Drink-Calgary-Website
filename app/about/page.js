"use client";

import { useEffect, useRef, useState } from "react";

export default function Page() {
  const canvasRef = useRef(null);
  const [hoveredYear, setHoveredYear] = useState(null);

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
        ctx.lineWidth = 5;

        for (let x = 0; x < canvas.width; x++) {
          const y =
            amplitude *
              Math.sin((x + baseOffset + offset * speed) / frequency) +
            canvas.height / 2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      };

      drawSineWave(0, "rgba(255, 166, 89, 0.4)", 30, 50, 1);
      drawSineWave(100, "rgba(173, 209, 158, 0.4)", 40, 60, 0.8);
      drawSineWave(200, "rgba(255, 145, 87, 0.4)", 35, 40, 1.2);

      offset += 0.25;
      animationFrameId = requestAnimationFrame(drawWave);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawWave();
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    drawWave();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const timelineEvents = [
    { year: "1997", text: "The first CoCo store opened in Taipei", left: "5%", top: "50%" },
    { year: "2005", text: "100th store opened", left: "20%", top: "0" },
    { year: "2007", text: "The first CoCo store opened in Suzhou, China", left: "35%", top: "50%" },
    { year: "2012", text: "1000th store opened worldwide", left: "50%", top: "0" },
    { year: "2014", text: "The first CoCo store opened in Toronto, Canada", left: "65%", top: "50%" },
    { year: "2019", text: "3500+ store opened worldwide", left: "80%", top: "0" },
    { year: "2025", text: "5000+ store opened worldwide", left: "95%", top: "50%" },
  ];

  return (
    <div className="min-h-screen bg-[white] text-[#653128]">
      <div className="w-full h-full py-8 space-y-16">
        {/* About Section */}
        <div className="w-full max-w-[1750px] mx-auto pl-[35px] relative space-y-16">
          {/* First Flexbox */}
          <div className="relative flex items-center justify-end space-x-8 hover:scale-105 transition-transform duration-300 z-10">
            <img
              src="/images/first-image.jpg"
              alt="First Flexbox Image"
              className="absolute w-[50%] h-auto object-cover rounded-lg z-0 left-0 top-1/2 transform -translate-y-1/2"
            />
            <p className="relative w-[50%] text-lg bg-[#f78a39] p-4 rounded-lg text-right shadow-lg">
              CoCo Bubble Tea, founded in 1997 by Chairman Tommy Hung, is a global leader in bubble tea, known for its
              commitment to quality and innovation. With a mission of "Consistency and Continuity," CoCo has become a
              favorite among bubble tea lovers worldwide.
            </p>
          </div>
          {/* Second Flexbox */}
          <div className="relative flex items-center space-x-8 hover:scale-105 transition-transform duration-300 z-10">
            <p className="relative w-[50%] text-lg bg-[#f78a39] p-4 rounded-lg mr-[50%] shadow-lg">
              In Canada, CoCo Bubble Tea offers a diverse menu of creative drinks made with fresh ingredients, served in
              stylish and welcoming stores. From classic milk teas to bold fruit infusions, CoCo brings an authentic and
              innovative bubble tea experience to communities across the country.
            </p>
            <img
              src="/images/second-image.jpg"
              alt="Second Flexbox Image"
              className="absolute w-[50%] h-auto object-cover rounded-lg z-0 right-0 top-1/2 transform -translate-y-1/2"
            />
          </div>
          {/* Third Flexbox */}
          <div className="relative flex items-center justify-end space-x-8 hover:scale-105 transition-transform duration-300 z-10">
            <img
              src="/images/third-image.jpg"
              alt="Third Flexbox Image"
              className="absolute w-[50%] h-auto object-cover rounded-lg z-0 left-0 top-1/2 transform -translate-y-1/2"
            />
            <p className="relative w-[50%] text-lg bg-[#f78a39] p-4 rounded-lg text-right shadow-lg">
              As CoCo expands in Canada, it remains dedicated to inclusivity, sustainability, and a passion for tea.
              Discover your nearest CoCo location and join the bubble tea revolution today!
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="w-full">
          <div className="relative shadow-lg flex justify-center items-center flex-col bg-[#f5d3ba] rounded-md mx-[35px] p-8">
            <h1 className="text-3xl font-bold mb-12 text-center">From Taiwan to Canada, and the World</h1>
            <canvas ref={canvasRef} className="w-full h-[310px]" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative h-full">
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
                          hoveredYear === point.year
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"
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
    </div>
  );
}
