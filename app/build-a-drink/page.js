"use client"

import { useState, useEffect } from "react"
import Toolbar from "../components/Toolbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Textarea } from "../components/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../lib/utils"

// Data arrays for drink options
const baseOptions = [
  { name: "No Base", color: "transparent", category: "None" },
  { name: "CoCo Milk Tea", color: "#8B4513", category: "Milk Tea" },
  { name: "Jasmine Milk Tea", color: "#A0522D", category: "Milk Tea" },
  { name: "Oolong Milk Tea", color: "#8B4513", category: "Milk Tea" },
  { name: "Fresh Black Tea", color: "#3E2723", category: "Fresh Tea" },
  { name: "Fresh Jasmine Tea", color: "#5D4037", category: "Fresh Tea" },
  { name: "Mango Green Tea", color: "#FFA500", category: "Fruit Tea" },
  { name: "Passion Fruit Green Tea", color: "#FF8C00", category: "Fruit Tea" },
  { name: "Matcha Latte", color: "#4CAF50", category: "Fresh Milk" },
  { name: "Avocado Smoothie", color: "#7CB342", category: "Slush" },
  { name: "Chocolate Slush", color: "#6D4C41", category: "Slush" },
  { name: "Caramel Milk Tea", color: "#E67E22", category: "Milk Tea" },
]

const iceLevels = ["Extra Ice", "Regular Ice", "Less Ice", "No Ice"]
const sugarLevels = ["Extra Sugar", "100% Sugar", "70%", "50%", "30%", "No Sugar"]
const toppings = [
  { name: "Pearls", color: "#000000", type: "pearl" },
  { name: "Salty Cream", color: "#FFFACD", type: "cream" },
  { name: "Sago", color: "#FFFFFF", type: "pearl" },
  { name: "Pudding", color: "#FFD700", type: "jelly" },
  { name: "Grass Jelly", color: "#2F4F4F", type: "jelly" },
  { name: "Coconut Jelly", color: "#FFFFFF", type: "jelly" },
  { name: "Strawberry Popping Pearls", color: "#FF69B4", type: "popping" },
  { name: "Lychee Popping Pearls", color: "#FFC0CB", type: "popping" },
  { name: "Jasmine Tea Jelly", color: "#D2B48C", type: "jelly" },
  { name: "Fresh Taro", color: "#9370DB", type: "chunk" },
  { name: "Red Bean", color: "#8B0000", type: "bean" },
  { name: "White Pearls", color: "#F5F5F5", type: "pearl" },
  { name: "BrownSugar Pearls", color: "#8B4513", type: "pearl" },
]

export default function BuildADrink() {
  const [selectedBase, setSelectedBase] = useState("")
  const [selectedIce, setSelectedIce] = useState("Regular Ice")
  const [selectedSugar, setSelectedSugar] = useState("100% Sugar")
  const [selectedToppings, setSelectedToppings] = useState([])
  const [addOns, setAddOns] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [cupFill, setCupFill] = useState({
    base: "",
    baseColor: "transparent",
    iceLevel: 80, // percentage of cup filled
    sugarLevel: 100, // percentage of sugar
    toppings: [],
  })

  // Update cup fill when selections change
  useEffect(() => {
    // Find the selected base drink
    const baseOption = baseOptions.find((option) => option.name === selectedBase)

    // Calculate ice level percentage
    let icePercentage = 0
    if (selectedIce === "Extra Ice") icePercentage = 100
    if (selectedIce === "Regular Ice") icePercentage = 70
    if (selectedIce === "Less Ice") icePercentage = 30
    if (selectedIce === "No Ice") icePercentage = 0

    // Calculate sugar level percentage
    let sugarPercentage = 0
    if (selectedSugar === "Extra Sugar") sugarPercentage = 120
    if (selectedSugar === "100% Sugar") sugarPercentage = 100
    if (selectedSugar === "70%") sugarPercentage = 70
    if (selectedSugar === "50%") sugarPercentage = 50
    if (selectedSugar === "30%") sugarPercentage = 30
    if (selectedSugar === "No Sugar") sugarPercentage = 0

    // Update cup fill state
    setCupFill({
      base: selectedBase,
      baseColor: baseOption?.color || "transparent",
      iceLevel: selectedBase === "No Base" ? 0 : icePercentage,
      sugarLevel: selectedBase === "No Base" ? 0 : sugarPercentage,
      toppings: selectedToppings.map((name) => {
        const topping = toppings.find((t) => t.name === name)
        return { name, color: topping?.color || "#000000", type: topping?.type || "pearl" }
      }),
    })
  }, [selectedBase, selectedIce, selectedSugar, selectedToppings])

  // Toggle topping selection
  const handleToppingToggle = (toppingName) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName) ? prev.filter((t) => t !== toppingName) : [...prev, toppingName],
    )
  }

  // Get topping object by name
  const getToppingByName = (name) => {
    return toppings.find((t) => t.name === name) || { color: "#000000", type: "pearl" }
  }

  // Toggle dropdown for toppings summary
  const toggleToppingsDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6">

      <h1 className="text-3xl font-bold text-amber-900 mt-8 mb-6">Build Your Perfect Bubble Tea</h1>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="relative">
          {/* Cup Container with plenty of space around it for dropdowns */}
          <div className="relative h-[450px] flex justify-center items-center">
            {/* Cup - styled like the Caramel Milk Tea image but wider at top, narrower at bottom */}
            <div className="relative w-48 h-80">
              {/* Cup outline - wider at top, narrower at bottom */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 200" preserveAspectRatio="none">
                <path
                  d="M10,0 L90,0 L70,180 C70,190 30,190 30,180 L10,0"
                  fill="transparent"
                  stroke="#ccc"
                  strokeWidth="2"
                />
              </svg>

              {/* Drink contents container - follows cup shape */}
              <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 200" preserveAspectRatio="none">
                  <defs>
                    <clipPath id="cup-shape">
                      <path d="M10,0 L90,0 L70,180 C70,190 30,190 30,180 L10,0" />
                    </clipPath>
                  </defs>

                  {/* Base liquid */}
                  {selectedBase && selectedBase !== "No Base" && (
                    <rect
                      x="0"
                      y="0"
                      width="100"
                      height="200"
                      fill={cupFill.baseColor}
                      opacity="0.9"
                      clipPath="url(#cup-shape)"
                    />
                  )}
                </svg>

                {/* Sugar visualization - WHITE small bubbles/particles */}
                {selectedBase && selectedBase !== "No Base" && cupFill.sugarLevel > 0 && (
                  <div className="absolute inset-0" style={{ clipPath: "polygon(10% 0%, 90% 0%, 70% 100%, 30% 100%)" }}>
                    {[...Array(Math.floor(cupFill.sugarLevel / 8))].map((_, i) => (
                      <div
                        key={`sugar-${i}`}
                        className="absolute rounded-full bg-white opacity-70"
                        style={{
                          width: `${Math.random() * 4 + 2}px`,
                          height: `${Math.random() * 4 + 2}px`,
                          left: `${Math.random() * 60 + 20}%`,
                          top: `${Math.random() * 80 + 10}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {/* Ice cubes - quantity based on ice level, BIGGER size */}
                {selectedBase && selectedBase !== "No Base" && cupFill.iceLevel > 0 && (
                  <div
                    className="absolute top-0 left-0 right-0 h-40"
                    style={{ clipPath: "polygon(12% 0%, 88% 0%, 82% 100%, 18% 100%)" }}
                  >
                    {[...Array(Math.floor(cupFill.iceLevel / 15))].map((_, i) => (
                      <div
                        key={`ice-${i}`}
                        className="absolute bg-white/70 rounded-md border border-white/90"
                        style={{
                          width: `${Math.random() * 15 + 10}px`, // Slightly smaller to avoid overflow
                          height: `${Math.random() * 15 + 10}px`, // Slightly smaller to avoid overflow
                          left: `${Math.random() * 40 + 30}%`, // More centered positioning
                          top: `${Math.random() * 30}%`,
                          transform: `rotate(${Math.random() * 45}deg)`,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // Add shadow for depth
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {/* Toppings visualization - IMPROVED with better containment */}
                {cupFill.toppings.length > 0 && (
                  <div className="absolute inset-0" style={{ clipPath: "polygon(12% 0%, 88% 0%, 68% 100%, 32% 100%)" }}>
                    {/* Group toppings by type for better visualization */}
                    {cupFill.toppings.map((topping, index) => {
                      // Different topping visualizations based on type
                      if (topping.type === "pearl" || topping.type === "bean") {
                        // Pearls and beans - round shapes at bottom
                        return [...Array(Math.min(12, Math.max(6, cupFill.toppings.length)))].map((_, i) => (
                          <div
                            key={`${topping.name}-${index}-${i}`}
                            className="rounded-full absolute"
                            style={{
                              backgroundColor: topping.color,
                              width: `${Math.random() * 6 + 8}px`, // Slightly smaller pearls
                              height: `${Math.random() * 6 + 8}px`, // Slightly smaller pearls
                              left: `${Math.random() * 40 + 30}%`, // More centered positioning
                              bottom: `${Math.random() * 15 + 5}%`, // Position at bottom with some margin
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)", // Add shadow for depth
                            }}
                          ></div>
                        ))
                      } else if (topping.type === "jelly") {
                        // Jellies - square shapes in middle
                        return [...Array(Math.min(6, Math.max(3, cupFill.toppings.length)))].map((_, i) => (
                          <div
                            key={`${topping.name}-${index}-${i}`}
                            className="absolute"
                            style={{
                              backgroundColor: topping.color,
                              width: `${Math.random() * 10 + 8}px`, // Slightly smaller jellies
                              height: `${Math.random() * 10 + 8}px`, // Slightly smaller jellies
                              left: `${Math.random() * 40 + 30}%`, // More centered positioning
                              top: `${40 + Math.random() * 20}%`, // Position in middle
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)", // Add shadow for depth
                            }}
                          ></div>
                        ))
                      } else if (topping.type === "cream") {
                        // Cream as a layer on top
                        return (
                          <div
                            key={`${topping.name}-${index}`}
                            className="absolute top-0 left-0 right-0"
                            style={{
                              backgroundColor: topping.color,
                              height: "20px",
                              opacity: 0.8,
                            }}
                          ></div>
                        )
                      } else if (topping.type === "popping") {
                        // Popping pearls - colorful round shapes
                        return [...Array(Math.min(8, Math.max(4, cupFill.toppings.length)))].map((_, i) => (
                          <div
                            key={`${topping.name}-${index}-${i}`}
                            className="absolute rounded-full"
                            style={{
                              backgroundColor: topping.color,
                              width: `${Math.random() * 6 + 8}px`, // Slightly smaller pearls
                              height: `${Math.random() * 6 + 8}px`, // Slightly smaller pearls
                              left: `${Math.random() * 40 + 30}%`, // More centered positioning
                              top: `${30 + Math.random() * 30}%`, // Position in middle
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)", // Add shadow for depth
                              border: "1px solid rgba(255,255,255,0.3)", // Highlight for popping pearls
                            }}
                          ></div>
                        ))
                      } else {
                        // Other toppings - random shapes
                        return [...Array(Math.min(6, Math.max(3, cupFill.toppings.length)))].map((_, i) => (
                          <div
                            key={`${topping.name}-${index}-${i}`}
                            className="absolute"
                            style={{
                              backgroundColor: topping.color,
                              width: `${Math.random() * 10 + 8}px`, // Slightly smaller toppings
                              height: `${Math.random() * 8 + 6}px`, // Slightly smaller toppings
                              borderRadius: "50%",
                              left: `${Math.random() * 40 + 30}%`, // More centered positioning
                              top: `${20 + Math.random() * 40}%`, // Better vertical distribution
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)", // Add shadow for depth
                            }}
                          ></div>
                        ))
                      }
                    })}
                  </div>
                )}
              </div>

              {/* Connection points for lines - positioned at the OUTSIDE of the cup */}
              <div className="absolute top-[10%] left-0 w-1 h-1 bg-amber-300 rounded-full"></div>
              <div className="absolute top-[40%] left-0 w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="absolute top-[10%] right-0 w-1 h-1 bg-purple-400 rounded-full"></div>
              <div className="absolute top-[60%] right-0 w-1 h-1 bg-amber-500 rounded-full"></div>
            </div>

            {/* Base Selection - Z-shaped line coming from OUTSIDE of the cup */}
            <div className="absolute right-0 top-[60%] w-[300px]">
              <div className="relative">
                {/* Z-shaped line */}
                <svg
                  className="absolute top-1/2 left-0 transform -translate-y-1/2"
                  width="300"
                  height="30"
                  viewBox="0 0 300 30"
                >
                  <path d="M0,15 L20,15 L20,5 L280,5 L280,15 L300,15" stroke="#f59e0b" strokeWidth="2" fill="none" />
                </svg>

                {/* Dropdown resting on the line */}
                <div className="absolute top-0 right-0 w-48">
                  <Select value={selectedBase} onValueChange={setSelectedBase}>
                    <SelectTrigger className="w-full border-amber-500 border-b-0 rounded-b-none">
                      <SelectValue placeholder="Select base" />
                    </SelectTrigger>
                    <SelectContent>
                      {baseOptions.map((option) => (
                        <SelectItem key={option.name} value={option.name}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }}></div>
                            <span>{option.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Ice Level Selection - Z-shaped line coming from OUTSIDE of the cup */}
            <div className="absolute left-0 top-[40%] w-[300px]">
              <div className="relative">
                {/* Z-shaped line */}
                <svg
                  className="absolute top-1/2 right-0 transform -translate-y-1/2"
                  width="300"
                  height="30"
                  viewBox="0 0 300 30"
                >
                  <path d="M300,15 L280,15 L280,5 L20,5 L20,15 L0,15" stroke="#93c5fd" strokeWidth="2" fill="none" />
                </svg>

                {/* Dropdown resting on the line */}
                <div className="absolute top-0 left-0 w-48">
                  <Select value={selectedIce} onValueChange={setSelectedIce}>
                    <SelectTrigger className="w-full border-blue-300 border-b-0 rounded-b-none">
                      <SelectValue placeholder="Select ice level" />
                    </SelectTrigger>
                    <SelectContent>
                      {iceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sugar Level Selection - Z-shaped line coming from OUTSIDE of the cup */}
            <div className="absolute left-0 top-[10%] w-[300px]">
              <div className="relative">
                {/* Z-shaped line */}
                <svg
                  className="absolute top-1/2 right-0 transform -translate-y-1/2"
                  width="300"
                  height="30"
                  viewBox="0 0 300 30"
                >
                  <path d="M300,15 L280,15 L280,5 L20,5 L20,15 L0,15" stroke="#fcd34d" strokeWidth="2" fill="none" />
                </svg>

                {/* Dropdown resting on the line */}
                <div className="absolute top-0 left-0 w-48">
                  <Select value={selectedSugar} onValueChange={setSelectedSugar}>
                    <SelectTrigger className="w-full border-amber-300 border-b-0 rounded-b-none">
                      <SelectValue placeholder="Select sugar level" />
                    </SelectTrigger>
                    <SelectContent>
                      {sugarLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Toppings Selection - Z-shaped line coming from OUTSIDE of the cup */}
            <div className="absolute right-0 top-[10%] w-[300px]">
              <div className="relative">
                {/* Z-shaped line */}
                <svg
                  className="absolute top-1/2 left-0 transform -translate-y-1/2"
                  width="300"
                  height="30"
                  viewBox="0 0 300 30"
                >
                  <path d="M0,15 L20,15 L20,5 L280,5 L280,15 L300,15" stroke="#c084fc" strokeWidth="2" fill="none" />
                </svg>

                {/* Dropdown resting on the line */}
                <div className="absolute top-0 right-0 w-48">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex w-full items-center justify-between rounded-md rounded-b-none border border-purple-400 border-b-0 bg-white px-3 py-2 text-sm">
                        {selectedToppings.length === 0 ? "Select toppings" : `${selectedToppings.length} toppings`}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="grid grid-cols-2 gap-2 p-4 max-h-[300px] overflow-y-auto">
                        {toppings.map((topping) => (
                          <div
                            key={topping.name}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors",
                              selectedToppings.includes(topping.name) ? "bg-purple-100" : "hover:bg-gray-100",
                            )}
                            onClick={() => handleToppingToggle(topping.name)}
                          >
                            <div className="flex-shrink-0 h-4 w-4 rounded-sm border flex items-center justify-center">
                              {selectedToppings.includes(topping.name) && <Check className="h-3 w-3 text-purple-600" />}
                            </div>
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: topping.color }}></div>
                            <span className="text-sm">{topping.name}</span>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drink Name Display with Toppings Dropdown */}
        <div className="mt-2 text-center">
          <h3 className="font-semibold text-amber-900 text-xl">{selectedBase || "Select your drink"}</h3>
          <p className="text-sm text-gray-600">
            {selectedIce} • {selectedSugar}
          </p>

          {/* Toppings dropdown in summary - CENTERED and CLICKABLE */}
          {selectedToppings.length > 0 && (
            <div className="mt-2 flex justify-center">
              <div className="relative w-48">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex w-full items-center justify-between rounded-md border border-purple-400 bg-white px-3 py-2 text-sm">
                      <span>{selectedToppings.length} toppings</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-2" align="center">
                    <ul className="text-xs text-left">
                      {selectedToppings.map((toppingName) => {
                        const topping = getToppingByName(toppingName)
                        return (
                          <li key={toppingName} className="flex items-center gap-2 py-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topping.color }}></div>
                            {toppingName}
                          </li>
                        )
                      })}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>

        {/* Add-ons Text Box - Reduced spacing */}
        <div className="mt-4 max-w-md mx-auto">
          <label htmlFor="add-ons" className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions
          </label>
          <Textarea
            id="add-ons"
            placeholder="Any special requests? (e.g., less ice on top, extra sweet)"
            value={addOns}
            onChange={(e) => setAddOns(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
      </div>

      {/* SEO-friendly content (hidden visually but available to search engines) */}
      <div className="sr-only">
        <h2>Customize Your Bubble Tea</h2>
        <p>
          Create your perfect bubble tea drink with our interactive customizer. Choose from a variety of bases including
          milk tea, fresh tea, fruit tea, fresh milk, and slush options. Customize your ice level, sugar level, and add
          delicious toppings like pearls, pudding, jellies, and more.
        </p>
        <p>
          Our bubble tea is made with premium ingredients for the perfect refreshing drink. Customize every aspect of
          your drink from the base to the toppings for a personalized experience.
        </p>
      </div>
    </div>
  )
}

