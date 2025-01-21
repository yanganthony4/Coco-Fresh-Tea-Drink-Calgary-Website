"use client";
import React, { useEffect, useRef, useState } from "react";
import Toolbar from "../components/Toolbar";

export default function Promotions() {
  

    const [isEmojiVisible, setIsEmojiVisible] = useState(false);
    const cocoRef = useRef(null); // Correctly initialize cocoRef
  
    useEffect(() => {
        if (!cocoRef.current) return;
      
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsEmojiVisible(true); // Start animation when visible
              } else {
                setIsEmojiVisible(false); // Stop animation when out of view
              }
            });
          },
          { threshold: 0.5 } // Trigger when 50% of the emoji is visible
        );
      
        observer.observe(cocoRef.current);
      
        return () => observer.disconnect();
      }, []);
  

  const promotions = [
    {
      id: 1,
      title: "Strawberry Series",
      description: "Dive into berry delights at participating locations!",
      timeFrame: "Available until March 31, 2025",
      images: ["/images/strawberryPromo.png"],
      price: "$6.64",
    },
    {
      id: 2,
      title: "Grapefruit Series",
      description: "A refreshing escape at participating locations!",
      timeFrame: "Available until April 15, 2025",
      images: ["/images/cremebruleeposter.png"],
      price: "$6.80",
    },
    {
      id: 3,
      title: "Brown Sugar Series",
      description: "Indulge in caramel flavors at selected locations!",
      timeFrame: "Available all year round",
      images: ["/images/mangodream.png"],
      price: "$6.80",
    },
  ];

  return (
    <div>
      <Toolbar />
      {/* Promotions Layout Section */}
      <section className="relative">
        <div className="relative">
          <img
            src="/images/promobackground.png"
            alt="Promotions Background"
            className="absolute top-[20%] right-[%] transform translate-y-[24%] w-[-40%] h-auto pointer-events-none z-0"
          />
          <div className="absolute inset-0">
            <img
              src="/images/promotionstext.png"
              alt="Promotions Text"
              className="absolute top-[30%] left-[50%] transform translate-x-[-50%] translate-y-[-6%] w-[90%] h-auto pointer-events-none z-0"
            />
          </div>
          <div className="absolute inset-0">
            <img
              src="/images/left splash.png"
              alt="Left Splash"
              className="absolute top-[20%] left-[%] transform translate-y-[-15%] w-[60%] h-auto pointer-events-none z-0"
            />
          </div>
          <div className="absolute inset-0">
            <img
              src="/images/right splash.png"
              alt="Right Splash"
              className="absolute top-[20%] right-[5%] transform translate-y-[-20%] w-[62%] h-auto pointer-events-none z-0"
            />
          </div>
          <div className="absolute inset-0">
            <img
              src="/images/bbgg.png"
              alt="Bubblegaga"
              className="absolute top-[25%] left-[50%] transform translate-x-[-50%] translate-y-[1%] w-[25%] h-auto pointer-events-none z-0"
            />
          </div>
        </div>
      </section>


    {/* Emoji, CoCo Text, and Line Section */}
<div className="relative flex flex-col items-center right-[37%] mt-[90vh]" ref={cocoRef}>
  {/* Group for Emoji and CoCo Text */}
  <div className="flex flex-col items-center z-50">
    {/* Emoji Image */}
    <div
      className={`relative mb-4 ${
        isEmojiVisible ? "animate-bounce-scroll" : ""
      }`} // Add bounce animation only when visible
    >
      <img
        src="/images/cocoemoji.png"
        alt="Coco Emoji"
        className="w-60 h-50 mt-[70%] object-contain"
      />
    </div>

    {/* CoCo Text */}
    <div className="flex space-x-2">
      {["C", "o", "C", "o"].map((letter, index) => (
        <span
          key={index}
          className={`text-6xl font-bold text-black font-museo ${
            isEmojiVisible ? "animate-bounce-scroll" : ""
          }`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: "1s",
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  </div>

  {/* Vertical Line */}
  <div className="relative h-[115vh] w-0.5 left-[10%] bg-[#E7D4B5] z-50 mt-[-35%]"></div>
</div>



      {/* Promotional Sections */}
      <div className="absolute top-[75%] right-[10%] flex flex-col space-y-10">
        {promotions.map(({ id, title, description, timeFrame, images, price }) => (
          <section
            key={id}
            className="relative w-[85%] lg:w-[110%] bg-[#fbf2d7] p-8 shadow-lg mt-[5rem] rounded-lg ml-auto"
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex-shrink-0 flex items-center justify-center">
                {images.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`${title} Promotion`}
                    className="w-full h-full max-w-[200px] lg:max-w-[400px] object-contain"
                  />
                ))}
              </div>
              <div className="h-[200px] w-0.5 bg-[#E7D4B5] opacity-100 mx-7"></div>
              <div className="text-left flex-1">
                <h2 className="text-3xl font-bold text-[#7c3d14] mb-2 font-caveat">
                  {title} <span className="text-[#f04e23]">NEW!</span>
                </h2>
                <p className="text-lg text-gray-700 font-medium mb-2 font-signika">
                  Refresh with choices from <span className="font-bold">{price}</span>.
                </p>
                <p className="text-gray-600 font-signika">{description}</p>
                <p className="text-sm text-gray-500 mt-4 font-signika">{timeFrame}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
