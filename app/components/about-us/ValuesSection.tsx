"use client"
import { ReactElement } from "react";
import { JSX } from "react/jsx-runtime";

interface ValueItem {
  title: string
  description: string
  icon: ReactElement
}

const values: ValueItem[] = [
  {
    title: "Quality",
    description: "We source only the finest ingredients and maintain strict quality control to ensure every cup is perfect.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-[#FF6B35]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "We continuously explore new flavors and techniques to bring exciting bubble tea experiences to our customers.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-[#FF6B35]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Consistency",
    description: "Whether you visit us in Calgary or Taipei, you can expect the same delicious taste and exceptional service.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-[#FF6B35]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ValuesSection(): JSX.Element {
  return (
    <div className="w-full py-14 bg-white/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Center-aligned title with animated underline */}
        <div className="flex">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 md:text-center text-left animated-underline inline-block reveal-on-scroll opacity-100 transition-all duration-700"
            style={{ transform: "translateY(40px)" }}
          >
            OUR VALUES
          </h2>
        </div>

        <div
          className="grid md:grid-cols-3 gap-8 reveal-on-scroll opacity-100 transition-all duration-700"
          style={{ transform: "translateY(40px)" }}
        >
          {values.map((value, index) => (
            <div key={index} className="bg-[#FF6B35]/10 p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-[black]/80">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
