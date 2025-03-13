"use client"
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full h-auto flex justify-center items-center">
      <div className="w-full max-w-screen-xl h-full relative">
        {/* Banner image */}
        <div className="w-full h-full">
          <Image
            src="/images/image4.webp"
            alt="CoCo Hero Image"
            className="w-full h-auto md:h-full object-cover"
            width={2000}
            height={1200}
            priority
          />
        </div>

        {/* Text content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 opacity-0 animate-fade-in text-center">
            About CoCo
          </h1>
          <div className="w-24 h-1 bg-white rounded-full opacity-0 animate-fade-in animation-delay-300" />
        </div>
      </div>
    </div>
  );
}
