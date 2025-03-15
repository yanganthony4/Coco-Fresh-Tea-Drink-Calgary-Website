"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Textarea } from "../components/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../lib/utils"

// Data arrays for drink options
const baseOptions = [
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
]

const iceLevels = ["Extra Ice", "Regular Ice", "Less Ice", "No Ice"]
const sugarLevels = ["Extra Sugar", "100% Sugar", "70%", "50%", "30%", "No Sugar"]
const toppings = [
  { name: "Pearls", color: "#000000" },
  { name: "Salty Cream", color: "#FFFACD" },
  { name: "Sago", color: "#FFFFFF" },
  { name: "Pudding", color: "#FFD700" },
  { name: "Grass Jelly", color: "#2F4F4F" },
  { name: "Coconut Jelly", color: "#FFFFFF" },
  { name: "Strawberry Popping Pearls", color: "#FF69B4" },
  { name: "Lychee Popping Pearls", color: "#FFC0CB" },
  { name: "Jasmine Tea Jelly", color: "#D2B48C" },
  { name: "Fresh Taro", color: "#9370DB" },
  { name: "Red Bean", color: "#8B0000" },
  { name: "White Pearls", color: "#F5F5F5" },
  { name: "BrownSugar Pearls", color: "#8B4513" },
]

export default function BuildADrink() {
  const [selectedBase, setSelectedBase] = useState("")
  const [selectedIce, setSelectedIce] = useState("Regular Ice")
  const [selectedSugar, setSelectedSugar] = useState("100% Sugar")
  const [selectedToppings, setSelectedToppings] = useState([])
  const [addOns, setAddOns] = useState("")
  const [cupFill, setCupFill] = useState({
    base: "",
    baseColor: "transparent",
    iceLevel: 80,
    toppings: [],
  })

  // Update cup fill when selections change
  useEffect(() => {
    // Find the selected base drink
    const baseOption = baseOptions.find((option) => option.name === selectedBase)

    // Calculate ice level percentage
    let icePercentage = 80
    if (selectedIce === "Extra Ice") icePercentage = 90
    if (selectedIce === "Less Ice") icePercentage = 60
    if (selectedIce === "No Ice") icePercentage = 50

    // Update cup fill state
    setCupFill({
      base: selectedBase,
      baseColor: baseOption?.color || "transparent",
      iceLevel: icePercentage,
      toppings: selectedToppings.map((name) => {
        const topping = toppings.find((t) => t.name === name)
        return { name, color: topping?.color || "#000000" }
      }),
    })
  }, [selectedBase, selectedIce, selectedSugar, selectedToppings])

  // Toggle topping selection
  const handleToppingToggle = (toppingName) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName) ? prev.filter((t) => t !== toppingName) : [...prev, toppingName],
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <h1 className="text-3xl font-bold text-amber-900 mt-8 mb-6">Build Your Perfect Bubble Tea</h1>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
        {/* Cup Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-64 h-80">
            {/* Straw - Moved to be rendered last to appear on top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-96 flex justify-center z-10">
              <div className="w-2 h-full bg-gradient-to-b from-pink-500 to-pink-600 rounded-full -translate-y-16"></div>
            </div>

            {/* Cup outline */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-56 h-72 border-4 border-gray-300 rounded-b-[100px] rounded-t-lg overflow-hidden">
              {/* Base liquid */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out"
                style={{
                  height: `${cupFill.iceLevel}%`,
                  backgroundColor: cupFill.baseColor,
                  opacity: selectedBase ? 0.8 : 0,
                }}
              ></div>

              {/* Ice cubes */}
              {selectedIce !== "No Ice" && (
                <>
                  <div className="absolute w-8 h-8 bg-white/40 rounded-lg rotate-12 top-10 right-6 border border-white/80"></div>
                  <div className="absolute w-6 h-6 bg-white/40 rounded-lg -rotate-12 top-20 left-8 border border-white/80"></div>
                  <div className="absolute w-7 h-7 bg-white/40 rounded-lg rotate-45 top-28 right-10 border border-white/80"></div>
                </>
              )}

              {/* Toppings */}
              {cupFill.toppings.length > 0 && (
                <div className="absolute top-2 left-0 right-0 h-16 flex justify-center items-end overflow-hidden">
                  {cupFill.toppings.map((topping, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 mx-1 rounded-full"
                      style={{ backgroundColor: topping.color }}
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Cup lid */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-60 h-6 bg-gray-300 rounded-t-lg"></div>
          </div>

          <div className="mt-4 text-center">
            <h3 className="font-semibold text-amber-900">{selectedBase || "Select your drink"}</h3>
            <p className="text-sm text-gray-600">
              {selectedIce} • {selectedSugar}
            </p>
            {selectedToppings.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Toppings:</p>
                <ul className="list-disc list-inside">
                  {selectedToppings.map((topping) => (
                    <li key={topping}>{topping}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Rest of the component remains the same, but with updated button and text colors */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Base Selection */}
          <div className="relative">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-amber-500"></div>
            <Select value={selectedBase} onValueChange={setSelectedBase}>
              <SelectTrigger className="w-full border-amber-500 text-gray-900">
                <SelectValue placeholder="Select base drink" />
              </SelectTrigger>
              <SelectContent>
                {baseOptions.map((option) => (
                  <SelectItem key={option.name} value={option.name}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }}></div>
                      <span className="text-gray-900">{option.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ice Level Selection */}
          <div className="relative">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-blue-300"></div>
            <Select value={selectedIce} onValueChange={setSelectedIce}>
              <SelectTrigger className="w-full border-blue-300 text-gray-900">
                <SelectValue placeholder="Select ice level" />
              </SelectTrigger>
              <SelectContent>
                {iceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    <span className="text-gray-900">{level}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sugar Level Selection */}
          <div className="relative">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-amber-300"></div>
            <Select value={selectedSugar} onValueChange={setSelectedSugar}>
              <SelectTrigger className="w-full border-amber-300 text-gray-900">
                <SelectValue placeholder="Select sugar level" />
              </SelectTrigger>
              <SelectContent>
                {sugarLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    <span className="text-gray-900">{level}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toppings Selection */}
          <div className="relative">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-purple-400"></div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between border-purple-400 text-gray-900">
                  {selectedToppings.length === 0 ? "Select toppings" : `${selectedToppings.length} toppings selected`}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
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
                      <span className="text-gray-900">{topping.name}</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Add-ons Text Box */}
          <div className="mt-2">
            <label htmlFor="add-ons" className="block text-sm font-medium text-gray-900 mb-1">
              Special Instructions
            </label>
            <Textarea
              id="add-ons"
              placeholder="Any special requests? (e.g., less ice on top, extra sweet)"
              value={addOns}
              onChange={(e) => setAddOns(e.target.value)}
              className="min-h-[80px] text-gray-900"
            />
          </div>

          {/* Confirm Button */}
          <Button
            className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            disabled={!selectedBase}
          >
            Add to Cart
          </Button>
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

