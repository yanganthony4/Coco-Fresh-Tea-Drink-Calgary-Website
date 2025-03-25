"use client"

import dynamic from "next/dynamic"

// Dynamically import the Map component
const Map = dynamic(() => import("../components/Map"), { ssr: false })

export default function Locations() {
  return (
    
    <div className="h-screen w-full">
      <Map />
    {/* Visually hidden H1 for SEO/accessibility */}
    <h1 className="sr-only">CoCo Bubble Tea - Premium Bubble Tea and Drinks</h1>
    </div>
    
  )
}

