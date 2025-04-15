"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import type { JSX } from "react/jsx-runtime"
import { Button } from "../components/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Textarea } from "../components/textarea"
import { Check, X, Snowflake, Candy, CupSoda, ChevronDown } from "lucide-react"
import { cn } from "../lib/utils"
import { motion } from "framer-motion"

// ------------------------------------------------------------------
// Interfaces
// ------------------------------------------------------------------
interface DrinkOption {
  readonly name: string
  readonly color: string
  readonly category: string
}

interface Topping {
  readonly name: string
  readonly color: string
  readonly shape: string
  readonly size: number
  isAnimating?: boolean
}

interface CupFill {
  base: string
  baseColor: string
  sugarLevel: string
  toppings: Topping[]
}

interface SavedDrink {
  id: number
  base: string
  baseColor: string
  ice: string
  sugar: string
  toppings: string[]
  addOns: string
  size: string
  date: string
}

interface IceCube {
  readonly top: number
  readonly left: number
  readonly size: number
  readonly rotate: number
  readonly opacity: number
  readonly delay: number
}

interface RandomPosition {
  readonly top: number
  readonly left: number
  readonly rotate: number
  readonly delay: number
}

interface FAQ {
  readonly question: string
  readonly answer: string
}

// ------------------------------------------------------------------
// Enums for constant sets
// ------------------------------------------------------------------
export enum IceLevel {
  EXTRA_ICE = "Extra Ice",
  REGULAR_ICE = "Regular Ice",
  LESS_ICE = "Less Ice",
  NO_ICE = "No Ice",
}

export enum SugarLevel {
  EXTRA_SUGAR = "Extra Sugar",
  HUNDRED_PERCENT = "100% Sugar",
  SEVENTY = "70%",
  FIFTY = "50%",
  THIRTY = "30%",
  NO_SUGAR = "No Sugar",
}

// ------------------------------------------------------------------
// Data Arrays
// ------------------------------------------------------------------

// Flattened drink list (with categories but all in a single array).
const allDrinks: readonly DrinkOption[] = [
  { name: "CoCo Milk Tea", color: "#8B4513", category: "Milk Tea" },
  { name: "Jasmine Milk Tea", color: "#A0522D", category: "Milk Tea" },
  { name: "Oolong Milk Tea", color: "#8B4513", category: "Milk Tea" },
  { name: "Taro Milk Tea", color: "#9463A8", category: "Milk Tea" },
  { name: "Mango Green Tea", color: "#FFA500", category: "Fruit Tea" },
  { name: "Passion Fruit Green Tea", color: "#FF8C00", category: "Fruit Tea" },
  { name: "Matcha Latte", color: "#89FA80", category: "Milk" },
  { name: "Avocado Smoothie", color: "#7CB342", category: "Slush" },
  { name: "Chocolate Slush", color: "#6D4C41", category: "Slush" },
  { name: "Fresh Black Tea", color: "#3E2723", category: "Fresh Tea" },
  { name: "Fresh Jasmine Tea", color: "#5D4037", category: "Fresh Tea" },
]

const iceLevels: readonly IceLevel[] = Object.values(IceLevel)
const sugarLevels: readonly SugarLevel[] = Object.values(SugarLevel)

const toppings: readonly Topping[] = [
  { name: "Pearls", color: "#000000", shape: "circle", size: 4 },
  { name: "Sago", color: "#C2B280", shape: "circle", size: 3 },
  { name: "Pudding", color: "#FFD700", shape: "square", size: 6 },
  { name: "Grass Jelly", color: "#2F4F4F", shape: "rectangle", size: 5 },
  { name: "Coconut Jelly", color: "#FFFFFF", shape: "rectangle", size: 5 },
  { name: "Red Bean", color: "#8B0000", shape: "bean", size: 3 },
  { name: "Brown Sugar Pearls", color: "#8B4513", shape: "circle", size: 4 },
  // Extra toppings
  { name: "Honey Jelly", color: "#FBE7A1", shape: "rectangle", size: 5 },
  { name: "Crystal Pearls", color: "#F8F8F8", shape: "circle", size: 4 },
  { name: "Popping Pearls", color: "#FFA07A", shape: "circle", size: 3 },
  { name: "Strawberry", color: "#FF69B4", shape: "chunk", size: 4 },
  { name: "Lychee", color: "#FFC0CB", shape: "chunk", size: 4 },
]

// Nutritional info
const nutritionalInfo = {
  base: {
    "CoCo Milk Tea": { calories: 226, sugar: 24, fat: 3 },
    "Jasmine Milk Tea": { calories: 212, sugar: 22, fat: 3 },
    "Oolong Milk Tea": { calories: 218, sugar: 23, fat: 3 },
    "Taro Milk Tea": { calories: 280, sugar: 30, fat: 4 },
    "Mango Green Tea": { calories: 160, sugar: 27, fat: 0 },
    "Passion Fruit Green Tea": { calories: 148, sugar: 26, fat: 0 },
    "Matcha Latte": { calories: 230, sugar: 22, fat: 5 },
    "Avocado Smoothie": { calories: 310, sugar: 20, fat: 15 },
    "Chocolate Slush": { calories: 340, sugar: 38, fat: 9 },
    "Fresh Black Tea": { calories: 92, sugar: 14, fat: 0 },
    "Fresh Jasmine Tea": { calories: 87, sugar: 13, fat: 0 },
  },
  sugar: {
    "Extra Sugar": 1.2,
    "100% Sugar": 1.0,
    "70%": 0.7,
    "50%": 0.5,
    "30%": 0.3,
    "No Sugar": 0,
  },
  toppings: {
    Pearls: { calories: 200, sugar: 0, fat: 0 },
    Sago: { calories: 220, sugar: 0, fat: 0 },
    Pudding: { calories: 140, sugar: 0, fat: 2 },
    "Grass Jelly": { calories: 80, sugar: 0, fat: 0 },
    "Coconut Jelly": { calories: 80, sugar: 0, fat: 0 },
    "Red Bean": { calories: 180, sugar: 0, fat: 0 },
    "Brown Sugar Pearls": { calories: 350, sugar: 0, fat: 0 },
    "Honey Jelly": { calories: 0, sugar: 0, fat: 0 },
    "Crystal Pearls": { calories: 100, sugar: 0, fat: 0 },
    "Popping Pearls": { calories: 90, sugar: 0, fat: 0 },
    Strawberry: { calories: 30, sugar: 5, fat: 0 },
    Lychee: { calories: 40, sugar: 8, fat: 0 },
  },
  sizeMultiplier: {
    Regular: 1,
    Large: 1.375,
  },
}

// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const getSugarHeight = (_sugarLevel: string): number => 90

// For the sugar bar in the dropdown
const getSugarBarWidth = (sugarLevel: string): number => {
  switch (sugarLevel) {
    case "Extra Sugar":
      return 120
    case "100% Sugar":
      return 100
    case "70%":
      return 70
    case "50%":
      return 50
    case "30%":
      return 30
    case "No Sugar":
      return 0
    default:
      return 100
  }
}

const getIceCubeCount = (iceLevel: string): number => {
  switch (iceLevel) {
    case IceLevel.EXTRA_ICE:
      return 6
    case IceLevel.REGULAR_ICE:
      return 4
    case IceLevel.LESS_ICE:
      return 2
    case IceLevel.NO_ICE:
      return 0
    default:
      return 4
  }
}

const generateIceCubePositions = (iceLevel: string): IceCube[] => {
  const count = getIceCubeCount(iceLevel)
  const positions: IceCube[] = []
  const topMin = 15
  const topMax = 30
  for (let i = 0; i < count; i++) {
    const size = (Math.random() * 6 + 8) * 3
    positions.push({
      top: Math.random() * (topMax - topMin) + topMin,
      left: Math.random() * 80 + 10,
      size,
      rotate: Math.random() * 360,
      opacity: Math.random() * 0.3 + 0.4,
      delay: Math.random() * 0.5,
    })
  }
  return positions
}

const generateRandomPositions = (count: number, shape: string): RandomPosition[] => {
  const positions: RandomPosition[] = []
  for (let i = 0; i < count; i++) {
    // Let's keep 'wave' logic the same, but remove crazy transforms
    if (shape === "wave") {
      positions.push({
        top: Math.random() * 10 + 2,
        left: Math.random() * 80 + 10,
        rotate: 0,
        delay: Math.random() * 0.5 + 0.2,
      })
    } else {
      positions.push({
        top: Math.random() * 60 + 20,
        left: Math.random() * 80 + 10,
        rotate: 0, // remove random rotation
        delay: Math.random() * 0.8 + 0.3,
      })
    }
  }
  return positions
}

// ------------------------------------------------------------------
// Main Component: BuildADrink
// ------------------------------------------------------------------
export default function BuildADrink(): JSX.Element {
  // Single dropdown for base drink + search
  const [selectedDrink, setSelectedDrink] = useState<string>("")
  const [drinkSearchTerm, setDrinkSearchTerm] = useState<string>("")
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState<boolean>(false)
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)

  const [selectedIce, setSelectedIce] = useState<string>("")
  const [selectedSugar, setSelectedSugar] = useState<string>("")
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [showToppings, setShowToppings] = useState<boolean>(false)
  const [addOns, setAddOns] = useState<string>("")
  const [cupFill, setCupFill] = useState<CupFill>({
    base: "",
    baseColor: "transparent",
    sugarLevel: "",
    toppings: [],
  })
  const [iceCubes, setIceCubes] = useState<IceCube[]>([])
  const [animateIce, setAnimateIce] = useState<boolean>(false)
  const [animateToppings, setAnimateToppings] = useState<boolean>(false)
  const [animateSugar, setAnimateSugar] = useState<boolean>(false)
  const [savedDrinks, setSavedDrinks] = useState<SavedDrink[]>([])

  // Size & milk
  const [selectedSize, setSelectedSize] = useState<string>("Regular")
  const [milkOption, setMilkOption] = useState<string>("Regular Milk Tea")

  // Refs for detecting changes
  const prevIceRef = useRef<string>(selectedIce)
  const prevSugarRef = useRef<string>(selectedSugar)
  const prevToppingsRef = useRef<string[]>(selectedToppings)

  // Flattened array is already "allDrinks"
  // Filter based on search term
  const filteredDrinks: DrinkOption[] = drinkSearchTerm
    ? allDrinks.filter((drink) => drink.name.toLowerCase().includes(drinkSearchTerm.toLowerCase()))
    : allDrinks

  // Load saved drinks on mount
  useEffect(() => {
    const storedDrinks = localStorage.getItem("savedDrinks")
    if (storedDrinks) {
      setSavedDrinks(JSON.parse(storedDrinks))
    }
  }, [])

  // If no drink selected, clear toppings
  useEffect(() => {
    if (!selectedDrink) {
      setSelectedToppings([])
    }
  }, [selectedDrink])

  // Update cup fill if a drink is selected
  useEffect(() => {
    if (selectedDrink) {
      const foundDrink = allDrinks.find((d) => d.name === selectedDrink)
      setCupFill((prev) => ({
        ...prev,
        base: selectedDrink,
        baseColor: foundDrink?.color ?? "transparent",
      }))
      setDrinkSearchTerm(selectedDrink) // Update search term when drink is selected
    } else {
      setCupFill((prev) => ({
        ...prev,
        base: "",
        baseColor: "transparent",
      }))
    }
  }, [selectedDrink])

  // Animate ice
  useEffect(() => {
    if (prevIceRef.current !== selectedIce) {
      setAnimateIce(true)
      setIceCubes([])
      setTimeout(() => {
        if (selectedIce) {
          setIceCubes(generateIceCubePositions(selectedIce))
        }
        setTimeout(() => {
          setAnimateIce(false)
        }, 800)
      }, 500)
      prevIceRef.current = selectedIce
    }
  }, [selectedIce])

  // Animate sugar
  useEffect(() => {
    if (prevSugarRef.current !== selectedSugar) {
      setAnimateSugar(true)
      setTimeout(() => {
        setCupFill((prev) => ({
          ...prev,
          sugarLevel: selectedSugar || "",
        }))
        setAnimateSugar(false)
      }, 300)
      prevSugarRef.current = selectedSugar
    }
  }, [selectedSugar])

  // Animate toppings (basic fall in)
  useEffect(() => {
    if (JSON.stringify(prevToppingsRef.current) !== JSON.stringify(selectedToppings)) {
      const prevSet = new Set(prevToppingsRef.current)
      const currentSet = new Set(selectedToppings)
      const addedToppings = selectedToppings.filter((t) => !prevSet.has(t))
      const removedToppings = prevToppingsRef.current.filter((t) => !currentSet.has(t))
      const existingToppings = cupFill.toppings.filter(
        (t) => !removedToppings.includes(t.name) && !addedToppings.includes(t.name),
      )

      if (addedToppings.length > 0) {
        setAnimateToppings(true)
        setTimeout(() => {
          const newToppings = addedToppings.map((name) => {
            const topping = toppings.find((t) => t.name === name)
            return {
              ...(topping || { name, color: "#000000", shape: "circle", size: 4 }),
              isAnimating: true,
            }
          })
          setCupFill((prev) => ({
            ...prev,
            toppings: [...existingToppings, ...newToppings],
          }))
          setTimeout(() => {
            setAnimateToppings(false)
            setCupFill((prev) => ({
              ...prev,
              toppings: prev.toppings.map((t) => ({ ...t, isAnimating: false })),
            }))
          }, 800)
        }, 100)
      } else {
        // Removed toppings
        setCupFill((prev) => ({
          ...prev,
          toppings: existingToppings,
        }))
      }
      prevToppingsRef.current = [...selectedToppings]
    }
  }, [selectedToppings, cupFill.toppings])

  // Topping toggle
  const handleToppingToggle = (toppingName: string): void => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName) ? prev.filter((t) => t !== toppingName) : [...prev, toppingName],
    )
  }

  // Calculate nutrition
  const calculateNutrition = (): { calories: number; sugar: number; fat: number } => {
    if (!selectedDrink) return { calories: 0, sugar: 0, fat: 0 }
    const baseNutrition = nutritionalInfo.base[selectedDrink] || { calories: 0, sugar: 0, fat: 0 }
    const sugarMultiplier = nutritionalInfo.sugar[selectedSugar] || 0
    let totalCalories = baseNutrition.calories
    let totalSugar = baseNutrition.sugar * sugarMultiplier
    let totalFat = baseNutrition.fat

    selectedToppings.forEach((topping) => {
      const toppingNutrition = nutritionalInfo.toppings[topping] || { calories: 0, sugar: 0, fat: 0 }
      totalCalories += toppingNutrition.calories
      totalSugar += toppingNutrition.sugar
      totalFat += toppingNutrition.fat
    })

    const sizeMultiplier = selectedSize === "Large" ? nutritionalInfo.sizeMultiplier.Large : 1
    return {
      calories: Math.round(totalCalories * sizeMultiplier),
      sugar: Math.round(totalSugar * sizeMultiplier),
      fat: Math.round(totalFat * sizeMultiplier),
    }
  }

  // ------------------------------------------------------------------
  // Render Topping Animation
  // ------------------------------------------------------------------
  const renderSaltyCream = (topping: Topping, index: number, position: RandomPosition): JSX.Element => {
    const { color, isAnimating } = topping
    const animationStyle =
      isAnimating && animateToppings
        ? {
            animation: `fallIn 0.6s ease-out forwards`,
            animationDelay: `${position.delay}s`,
          }
        : { height: "15%" }
    return (
      <div
        key={`${topping.name}-${index}`}
        className="absolute"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "0%",
          backgroundColor: color,
          zIndex: 10,
          opacity: 0.95,
          borderRadius: 0,
          ...animationStyle,
        }}
      />
    )
  }

  const renderTopping = (topping: Topping, index: number, position: RandomPosition): JSX.Element => {
    const { shape, color, size, isAnimating, name } = topping
    if (name === "Salty Cream") {
      return renderSaltyCream(topping, index, position)
    }
    const biggerSize = size * 2.8
    const animationStyle =
      isAnimating && animateToppings
        ? {
            animation: `fallIn 0.6s ease-out forwards`,
            animationDelay: `${position.delay}s`,
          }
        : {}
    switch (shape) {
      case "circle":
      case "square":
      case "rectangle":
      case "wave":
      case "chunk":
      case "bean":
        // They all do the same simple "fall in" now
        return (
          <div
            key={`${name}-${index}`}
            className="absolute"
            style={{
              backgroundColor: color,
              borderRadius: shape === "circle" ? "50%" : shape === "wave" ? "50%" : shape === "chunk" ? "6%" : "0",
              width: shape === "rectangle" ? `${biggerSize + 2}px` : `${biggerSize}px`,
              height: shape === "rectangle" ? `${biggerSize}px` : `${biggerSize}px`,
              top: `${position.top}%`,
              left: `${position.left}%`,
              opacity: 0.9,
              zIndex: 6,
              ...animationStyle,
            }}
          />
        )
      default:
        // fallback for unknown shape
        return (
          <div
            key={`${name}-${index}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: `${biggerSize}px`,
              height: `${biggerSize}px`,
              top: `${position.top}%`,
              left: `${position.left}%`,
              opacity: 0.9,
              zIndex: 6,
              ...animationStyle,
            }}
          />
        )
    }
  }

  const renderIceCube = (cube: IceCube, index: number): JSX.Element => {
    return (
      <div
        key={`ice-${index}`}
        className="absolute rounded-md border border-white/80"
        style={{
          width: `${cube.size}px`,
          height: `${cube.size}px`,
          top: `${cube.top}%`,
          left: `${cube.left}%`,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          opacity: cube.opacity,
          boxShadow: "inset 0 0 2px rgba(255, 255, 255, 0.8)",
          zIndex: 8,
          animation: animateIce ? `smoothFall 1s ease-in-out forwards` : "none",
          animationDelay: `${cube.delay}s`,
          transform: animateIce ? "translateY(-50px)" : `rotate(${cube.rotate}deg)`,
        }}
      />
    )
  }

  // ------------------------------------------------------------------
  // Save & Delete
  // ------------------------------------------------------------------
  const handleSaveDrink = (): void => {
    if (!selectedDrink) return
    const fullBaseName = `${selectedDrink} - ${milkOption}`

    const newDrink: SavedDrink = {
      id: Date.now(),
      base: fullBaseName,
      baseColor: cupFill.baseColor,
      ice: selectedIce || IceLevel.REGULAR_ICE,
      sugar: selectedSugar || SugarLevel["100% Sugar"],
      toppings: selectedToppings,
      addOns,
      size: selectedSize,
      date: new Date().toLocaleDateString(),
    }

    const updatedDrinks = [newDrink, ...savedDrinks]
    if (updatedDrinks.length > 12) {
      updatedDrinks.pop()
    }
    setSavedDrinks(updatedDrinks)
    localStorage.setItem("savedDrinks", JSON.stringify(updatedDrinks))

    // Reset
    setSelectedDrink("")
    setSelectedIce("")
    setSelectedSugar("")
    setSelectedToppings([])
    setAddOns("")
    setSelectedSize("Regular")
    setMilkOption("Regular Milk Tea")
    setCupFill({ base: "", baseColor: "transparent", sugarLevel: "", toppings: [] })
    setDrinkSearchTerm("")
  }

  const handleDeleteSavedDrink = (id: number): void => {
    const updatedDrinks = savedDrinks.filter((drink) => drink.id !== id)
    setSavedDrinks(updatedDrinks)
    localStorage.setItem("savedDrinks", JSON.stringify(updatedDrinks))
  }

  // ------------------------------------------------------------------
  // Render Cup Content
  // ------------------------------------------------------------------
  const renderedCupContent = useMemo((): JSX.Element => {
    return (
      <>
        {cupFill.base && (
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out"
            style={{
              height: `${getSugarHeight(cupFill.sugarLevel)}%`,
              backgroundColor: cupFill.baseColor,
              zIndex: 5,
            }}
          />
        )}
        {selectedIce && selectedIce !== IceLevel.NO_ICE && iceCubes.map((cube, index) => renderIceCube(cube, index))}

        {cupFill.toppings.length > 0 &&
          cupFill.toppings.map((topping) => {
            if (topping.name === "Salty Cream") {
              return renderTopping(topping, 0, { top: 0, left: 0, rotate: 0, delay: 0 })
            }
            const count = topping.shape === "wave" ? 4 : Math.floor(Math.random() * 5) + 3
            const positions = generateRandomPositions(count, topping.shape)
            return positions.map((position, posIndex) => renderTopping(topping, posIndex, position))
          })}
      </>
    )
  }, [cupFill, selectedIce, iceCubes, animateIce, animateToppings])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (!target.closest('input[type="text"]') && !target.closest(".absolute.z-10")) {
        setIsSearchDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // ------------------------------------------------------------------
  // Main UI
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="max-w-4xl w-full px-4 sm:px-8">
        {/* Saved Drinks Cart */}
        <div className="mb-8 border border-gray-200 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-bold text-black mb-2">Your Saved Drinks</h2>
          {savedDrinks.length === 0 ? (
            <p className="text-center py-4 text-black">No Saved Drinks Yet. It&apos;s Time To Get Creative!</p>
          ) : (
            <div className="space-y-4">
              {savedDrinks.map((drink) => (
                <div key={drink.id} className="relative border rounded-lg p-4 bg-white shadow-sm flex flex-col">
                  <button
                    className="absolute top-2 right-2 text-black hover:text-black"
                    onClick={() => handleDeleteSavedDrink(drink.id)}
                  >
                    <X size={16} />
                  </button>
                  <div className="flex gap-4 flex-1">
                    <div className="w-10 flex-shrink-0 flex items-center justify-center">
                      <div
                        className="w-8 h-12 border border-gray-300 rounded-b-full rounded-t-sm"
                        style={{ backgroundColor: drink.baseColor }}
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="text-sm font-medium text-black mb-1">{drink.base}</div>
                      <div className="flex items-center flex-wrap gap-2 text-xs text-black">
                        <span>
                          <strong>Ice:</strong> {drink.ice}
                        </span>
                        <span className="mx-1">|</span>
                        <span>
                          <strong>Sugar:</strong> {drink.sugar}
                        </span>
                        <span className="mx-1">|</span>
                        <span>
                          <strong>Size:</strong> {drink.size}
                        </span>
                      </div>
                      {drink.toppings.length > 0 && (
                        <p className="text-xs text-black mt-1">
                          <strong>Toppings:</strong> {drink.toppings.join(", ")}
                        </p>
                      )}
                      {drink.addOns && (
                        <div className="mt-1 text-xs text-black">
                          <strong>Special Instructions:</strong> <em>{drink.addOns}</em>
                        </div>
                      )}
                      <div className="mt-auto text-xs text-black">{drink.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drink Builder Box */}
        <div className="border border-gray-200 bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-black mb-6 text-center w-full">Build Your Perfect Bubble Tea</h1>
          <div className="flex-1 flex flex-col md:flex-row gap-8 items-start mt-4">
            {/* Left: Cup Visualization */}
            <div className="flex-1 flex flex-col items-center justify-start relative">
              <div className="relative w-64 h-96 mt-6">
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-56 h-72 border-4 border-gray-300 rounded-b-[100px] rounded-t-lg overflow-hidden">
                  {renderedCupContent}
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 flex justify-center z-10">
                  <div className="w-2 h-16 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full -translate-y-8" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-56 h-10 overflow-visible" />
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: selectedDrink ? cupFill.baseColor : "#FF9800" }}
                  >
                    {selectedDrink || "Select your drink"}
                  </h3>
                </div>
                <p className="text-sm text-black">
                  {selectedIce || "Select Ice Level"} • {selectedSugar || "Select Sugar Level"} • {selectedSize}
                </p>
                {selectedDrink && (
                  <div className="mt-2 p-3 bg-white border border-amber-200 rounded-md text-left">
                    <h4 className="font-medium text-sm mb-1 text-black">Nutritional Information</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="font-medium text-black">Calories</p>
                        <p className="text-black">{calculateNutrition().calories}</p>
                      </div>
                      <div>
                        <p className="font-medium text-black">Sugar (g)</p>
                        <p className="text-black">{calculateNutrition().sugar}</p>
                      </div>
                      <div>
                        <p className="font-medium text-black">Fat (g)</p>
                        <p className="text-black">{calculateNutrition().fat}</p>
                      </div>
                    </div>
                    <p className="text-xs text-black mt-2">Values are approximate and may vary.</p>
                  </div>
                )}
                {selectedToppings.length > 0 && (
                  <div className="mt-2 text-sm text-black">
                    <div className="flex items-center cursor-pointer" onClick={() => setShowToppings(!showToppings)}>
                      <p className="font-medium">Toppings:</p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-1 transition-transform ${showToppings ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {showToppings && (
                      <ul className="list-disc list-inside mt-1 text-left text-black">
                        {selectedToppings.map((topping) => (
                          <li key={topping}>{topping}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Right: Customization Options */}
            <div className="flex-1 flex flex-col gap-6 items-start">
              {/* Single dropdown for base drink w/ search */}
              <div className="relative w-full">
                <label className="block text-sm font-medium text-black mb-1">Base Drink</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search and select a base drink"
                    className={`w-full p-2 border border-amber-500 rounded-md pr-10 ${
                      isSearchDropdownOpen && !drinkSearchTerm ? "text-gray-500" : "text-black"
                    }`}
                    value={drinkSearchTerm}
                    onChange={(e) => {
                      setDrinkSearchTerm(e.target.value)
                    }}
                    onClick={() => {
                      setIsSearchDropdownOpen(true)
                    }}
                    onFocus={() => {
                      setIsSearchDropdownOpen(true)
                    }}
                    style={{
                      color: isSearchDropdownOpen && !drinkSearchTerm ? "#6b7280" : "#000000",
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {isSearchDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredDrinks.length > 0 ? (
                      filteredDrinks.map((drink) => (
                        <div
                          key={drink.name}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedDrink(drink.name)
                            setDrinkSearchTerm(drink.name)
                            setIsSearchDropdownOpen(false)
                            setIsSearchFocused(false)
                          }}
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: drink.color }}></div>
                          <span className="text-black">{drink.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No drinks found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Ice Level */}
              <div className="relative w-full">
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                  <Snowflake size={18} className="text-blue-300" />
                </div>
                <Select value={selectedIce} onValueChange={setSelectedIce}>
                  <SelectTrigger className="w-full border-blue-300 text-black">
                    <SelectValue>{selectedIce || "Select Ice Level"}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {iceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {/* Level bars */}
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-300"
                              style={{
                                width:
                                  level === IceLevel.EXTRA_ICE
                                    ? "100%"
                                    : level === IceLevel.REGULAR_ICE
                                      ? "75%"
                                      : level === IceLevel.LESS_ICE
                                        ? "35%"
                                        : "0%",
                              }}
                            ></div>
                          </div>
                          <span className="text-black">{level}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sugar Level */}
              <div className="relative w-full">
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                  <Candy size={18} className="text-amber-300" />
                </div>
                <Select value={selectedSugar} onValueChange={setSelectedSugar}>
                  <SelectTrigger className="w-full border-amber-300 text-black">
                    <SelectValue>{selectedSugar || "Select Sugar Level"}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {sugarLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {/* Level bars */}
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400" style={{ width: `${getSugarBarWidth(level)}%` }}></div>
                          </div>
                          <span className="text-black">{level}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Toppings */}
              <div className="relative w-full">
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                  <CupSoda size={18} className="text-purple-400" />
                </div>
                {selectedDrink ? (
                  <Select
                    multiple
                    value={selectedToppings}
                    onValueChange={(values: string[] | string) =>
                      setSelectedToppings(Array.isArray(values) ? values : [values])
                    }
                  >
                    <SelectTrigger className="w-full border-purple-400 text-black">
                      <SelectValue>
                        {selectedToppings.length === 0
                          ? "Select toppings"
                          : `${selectedToppings.length} toppings selected`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {toppings.map((topping) => (
                        <SelectItem key={topping.name} value={topping.name}>
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 h-4 w-4 rounded-sm border flex items-center justify-center">
                              {selectedToppings.includes(topping.name) && <Check className="h-3 w-3 text-purple-600" />}
                            </div>
                            <div
                              className={cn(
                                "w-3 h-3",
                                topping.shape === "circle"
                                  ? "rounded-full"
                                  : topping.shape === "square"
                                    ? ""
                                    : topping.shape === "rectangle"
                                      ? "w-4 h-3"
                                      : "rounded-sm",
                              )}
                              style={{ backgroundColor: topping.color }}
                            />
                            <span className="text-black">{topping.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="w-full border border-gray-300 text-black p-2 rounded">
                    Please select a base drink to choose toppings.
                  </div>
                )}
              </div>

              {/* Size */}
              <div className="relative mt-4 w-full">
                <label className="block text-sm font-medium text-black mb-2">Size</label>
                <div className="flex items-center gap-4">
                  <button
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      selectedSize === "Regular"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 text-black hover:border-green-300",
                    )}
                    onClick={() => setSelectedSize("Regular")}
                    aria-label="Regular size (16oz)"
                  >
                    R
                  </button>
                  <div className="text-sm text-black">
                    <p className="font-medium">Regular</p>
                    <p className="text-black text-xs">16 oz</p>
                  </div>
                  <button
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      selectedSize === "Large"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 text-black hover:border-green-300",
                    )}
                    onClick={() => setSelectedSize("Large")}
                    aria-label="Large size (22oz)"
                  >
                    L
                  </button>
                  <div className="text-sm text-black">
                    <p className="font-medium">Large</p>
                    <p className="text-black text-xs">22 oz</p>
                  </div>
                </div>
              </div>

              {/* Milk Option */}
              <div className="relative mt-4 w-full">
                <label className="block text-sm font-medium text-black mb-1">Milk Option</label>
                <div className="flex items-center gap-4">
                  <button
                    className={cn(
                      "flex items-center justify-center px-3 py-2 rounded-full border-2 transition-colors",
                      milkOption === "Regular Milk Tea"
                        ? "border-[#8B4513] bg-[#f7f1eb] text-[#8B4513]"
                        : "border-gray-300 text-black hover:border-[#8B4513]",
                    )}
                    onClick={() => setMilkOption("Regular Milk Tea")}
                  >
                    Regular Milk Tea
                  </button>
                  <button
                    className={cn(
                      "flex items-center justify-center px-3 py-2 rounded-full border-2 transition-colors",
                      milkOption === "Milk"
                        ? "border-[#8B4513] bg-[#f7f1eb] text-[#8B4513]"
                        : "border-gray-300 text-black hover:border-[#8B4513]",
                    )}
                    onClick={() => setMilkOption("Milk")}
                  >
                    Milk
                  </button>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mt-2 w-full">
                <label htmlFor="add-ons" className="block text-sm font-medium text-black mb-1">
                  Special Instructions
                </label>
                <Textarea
                  id="add-ons"
                  placeholder="Any special requests? (e.g., less ice on top, extra sweet)"
                  value={addOns}
                  onChange={(e) => setAddOns(e.target.value)}
                  className="min-h-[80px] text-black w-full"
                />
              </div>

              {/* Save Drink */}
              <Button
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-white w-full py-3 text-lg"
                disabled={!selectedDrink}
                onClick={handleSaveDrink}
              >
                Save Drink!
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>

      <style jsx global>{`
        @keyframes smoothFall {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fillTopLayer {
          0% {
            height: 0%;
            opacity: 0;
          }
          100% {
            height: 15%;
            opacity: 1;
          }
        }
        @keyframes smoothFallFromTop {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }
        @keyframes fallIn {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <style jsx>{`
        input::placeholder {
          color: black;
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

// ------------------------------------------------------------------
// FAQItem Component
// ------------------------------------------------------------------
function FAQItem({ faq, index }: { faq: FAQ; index: number }): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-amber-500 p-5 cursor-pointer transition-all duration-300 mb-6 last:mb-12"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
        <span className={`text-white text-lg transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▲</span>
      </div>
      <motion.p
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="text-white text-left mt-2 overflow-hidden"
      >
        {faq.answer}
      </motion.p>
    </motion.div>
  )
}

// ------------------------------------------------------------------
// FAQSection Component
// ------------------------------------------------------------------
function FAQSection(): JSX.Element {
  const faqs: readonly FAQ[] = [
    {
      question: "How Do I Use This?",
      answer:
        "Pick a base drink from the dropdown (use the search bar to filter), choose your ice & sugar levels, milk option, and optional toppings. The visualization will update in real-time. Save up to 12 of your favourite combinations!",
    },
    {
      question: "Are The Nutritional Values Accurate?",
      answer: "We've researched closely to ensure high accuracy for our customers.",
    },
    {
      question: "Need help with the Coco app?",
      answer: "Contact support@gosnappy.io for any issues with your account or points.",
    },
    {
      question: "Have Any Other Questions?",
      answer: "For more specific questions please navigate to our Contact Us page for more help!",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-24 max-w-3xl mx-auto text-center relative z-10 pb-32"
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-[#FF9800] uppercase tracking-wide">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
