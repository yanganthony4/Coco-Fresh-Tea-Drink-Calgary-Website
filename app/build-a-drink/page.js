"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "../components/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Textarea } from "../components/textarea"
import { Check, BookmarkIcon, HelpCircle, X, AlertCircle } from "lucide-react"
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
  { name: "Matcha Latte", color: "#89FA80", category: "Fresh Milk" },
  { name: "Avocado Smoothie", color: "#7CB342", category: "Slush" },
  { name: "Chocolate Slush", color: "#6D4C41", category: "Slush" },
]

const iceLevels = ["Extra Ice", "Regular Ice", "Less Ice", "No Ice"]
const sugarLevels = ["Extra Sugar", "100% Sugar", "70%", "50%", "30%", "No Sugar"]
const toppings = [
  { name: "Pearls", color: "#000000", shape: "circle", size: 4 },
  { name: "Salty Cream", color: "#FFFACD", shape: "wave", size: 0 },
  { name: "Sago", color: "#FFFFFF", shape: "circle", size: 2 },
  { name: "Pudding", color: "#FFD700", shape: "square", size: 6 },
  { name: "Grass Jelly", color: "#2F4F4F", shape: "rectangle", size: 5 },
  { name: "Coconut Jelly", color: "#FFFFFF", shape: "rectangle", size: 5 },
  { name: "Strawberry Popping Pearls", color: "#FF69B4", shape: "circle", size: 3 },
  { name: "Lychee Popping Pearls", color: "#FFC0CB", shape: "circle", size: 3 },
  { name: "Jasmine Tea Jelly", color: "#D2B48C", shape: "rectangle", size: 5 },
  { name: "Fresh Taro", color: "#9370DB", shape: "chunk", size: 6 },
  { name: "Red Bean", color: "#8B0000", shape: "bean", size: 3 },
  { name: "White Pearls", color: "#F5F5F5", shape: "circle", size: 4 },
  { name: "BrownSugar Pearls", color: "#8B4513", shape: "circle", size: 4 },
]

// Nutritional information data
const nutritionalInfo = {
  base: {
    "CoCo Milk Tea": { calories: 180, sugar: 22, fat: 4 },
    "Jasmine Milk Tea": { calories: 170, sugar: 20, fat: 4 },
    "Oolong Milk Tea": { calories: 175, sugar: 21, fat: 4 },
    "Fresh Black Tea": { calories: 80, sugar: 18, fat: 0 },
    "Fresh Jasmine Tea": { calories: 75, sugar: 17, fat: 0 },
    "Mango Green Tea": { calories: 120, sugar: 25, fat: 0 },
    "Passion Fruit Green Tea": { calories: 110, sugar: 23, fat: 0 },
    "Matcha Latte": { calories: 200, sugar: 24, fat: 5 },
    "Avocado Smoothie": { calories: 250, sugar: 20, fat: 12 },
    "Chocolate Slush": { calories: 280, sugar: 35, fat: 8 },
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
    Pearls: { calories: 80, sugar: 15, fat: 0 },
    "Salty Cream": { calories: 120, sugar: 8, fat: 10 },
    Sago: { calories: 40, sugar: 8, fat: 0 },
    Pudding: { calories: 90, sugar: 18, fat: 2 },
    "Grass Jelly": { calories: 50, sugar: 10, fat: 0 },
    "Coconut Jelly": { calories: 60, sugar: 12, fat: 2 },
    "Strawberry Popping Pearls": { calories: 70, sugar: 16, fat: 0 },
    "Lychee Popping Pearls": { calories: 65, sugar: 15, fat: 0 },
    "Jasmine Tea Jelly": { calories: 45, sugar: 9, fat: 0 },
    "Fresh Taro": { calories: 85, sugar: 12, fat: 1 },
    "Red Bean": { calories: 95, sugar: 14, fat: 1 },
    "White Pearls": { calories: 75, sugar: 14, fat: 0 },
    "BrownSugar Pearls": { calories: 90, sugar: 20, fat: 0 },
  },
}

// Keep the cup ~90% full (or adapt if you want it to vary with sugar)
const getSugarHeight = (sugarLevel) => {
  return 90
}

// Separate function just for the sugar bar width in the dropdown
const getSugarBarWidth = (sugarLevel) => {
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

// Sugar level sparkle count - increased for more visibility
const getSugarSparkleCount = (sugarLevel) => {
  switch (sugarLevel) {
    case "Extra Sugar":
      return 30
    case "100% Sugar":
      return 20
    case "70%":
      return 15
    case "50%":
      return 10
    case "30%":
      return 6
    case "No Sugar":
      return 0
    default:
      return 20
  }
}

// Get ice cube count based on ice level
const getIceCubeCount = (iceLevel) => {
  switch (iceLevel) {
    case "Extra Ice":
      return 6
    case "Regular Ice":
      return 4
    case "Less Ice":
      return 2
    case "No Ice":
      return 0
    default:
      return 4
  }
}

// Generate ice cube positions
const generateIceCubePositions = (iceLevel) => {
  const count = getIceCubeCount(iceLevel)
  const positions = []

  // Ice cubes will float at the top of the drink
  const topMin = 15
  const topMax = 30

  for (let i = 0; i < count; i++) {
    // Bigger ice cubes
    const size = (Math.random() * 6 + 8) * 3

    positions.push({
      top: Math.random() * (topMax - topMin) + topMin,
      left: Math.random() * 80 + 10,
      size: size,
      rotate: Math.random() * 360,
      // Add slight 3D effect with different opacities
      opacity: Math.random() * 0.3 + 0.4,
      // Animation delay for falling effect
      delay: Math.random() * 0.5,
    })
  }

  return positions
}

// Generate random positions for standard toppings
const generateRandomPositions = (count, shape) => {
  const positions = []
  for (let i = 0; i < count; i++) {
    if (shape === "wave") {
      // For wave shapes (but we handle Salty Cream separately now)
      positions.push({
        top: Math.random() * 10 + 2,
        left: Math.random() * 80 + 10,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.5 + 0.2,
      })
    } else {
      // For other toppings, distribute throughout the drink
      positions.push({
        top: Math.random() * 60 + 20, // Start a bit lower in the cup
        left: Math.random() * 80 + 10,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.8 + 0.3, // Longer delay for more staggered effect
      })
    }
  }
  return positions
}

export default function BuildADrink() {
  const [selectedBase, setSelectedBase] = useState("")
  const [selectedIce, setSelectedIce] = useState("Regular Ice")
  const [selectedSugar, setSelectedSugar] = useState("100% Sugar")
  const [selectedToppings, setSelectedToppings] = useState([])
  const [showToppings, setShowToppings] = useState(false)
  const [addOns, setAddOns] = useState("")
  const [cupFill, setCupFill] = useState({
    base: "",
    baseColor: "transparent",
    sugarLevel: "100% Sugar",
    toppings: [],
  })
  const [iceCubes, setIceCubes] = useState([])
  const [animateIce, setAnimateIce] = useState(false)
  const [animateToppings, setAnimateToppings] = useState(false)
  const [animateSugar, setAnimateSugar] = useState(false)
  const [savedDrinks, setSavedDrinks] = useState([])
  const [showSavedDrinks, setShowSavedDrinks] = useState(false)

  // Add these state variables to your component
  const [selectedSize, setSelectedSize] = useState("Regular")
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false)
  const [showSavedDrinksMenu, setShowSavedDrinksMenu] = useState(false)

  const prevIceRef = useRef(selectedIce)
  const prevToppingsRef = useRef(selectedToppings)
  const prevSugarRef = useRef(selectedSugar)

  // Load saved drinks from localStorage on component mount
  useEffect(() => {
    const storedDrinks = localStorage.getItem("savedDrinks")
    if (storedDrinks) {
      setSavedDrinks(JSON.parse(storedDrinks))
    }
  }, [])

  // Handle clicking outside the saved drinks menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the saved drinks menu
      const menu = document.getElementById("saved-drinks-menu")
      if (showSavedDrinksMenu && menu && !menu.contains(event.target)) {
        // Make sure we're not clicking the bookmark icon itself
        const bookmarkIcon = document.getElementById("bookmark-icon")
        if (!bookmarkIcon || !bookmarkIcon.contains(event.target)) {
          setShowSavedDrinksMenu(false)
        }
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSavedDrinksMenu])

  // Update cup fill when base drink changes
  useEffect(() => {
    if (selectedBase) {
      const baseOption = baseOptions.find((option) => option.name === selectedBase)
      setCupFill((prev) => ({
        ...prev,
        base: selectedBase,
        baseColor: baseOption?.color || "transparent",
      }))
    }
  }, [selectedBase])

  // Handle ice level changes with animation
  useEffect(() => {
    if (prevIceRef.current !== selectedIce) {
      setAnimateIce(true)
      setIceCubes([]) // Clear existing ice cubes

      // Add new ice cubes with a slight delay
      setTimeout(() => {
        setIceCubes(generateIceCubePositions(selectedIce))
        setTimeout(() => {
          setAnimateIce(false)
        }, 800)
      }, 500)

      prevIceRef.current = selectedIce
    }
  }, [selectedIce])

  // Handle sugar level changes with animation
  useEffect(() => {
    if (prevSugarRef.current !== selectedSugar) {
      setAnimateSugar(true)

      setTimeout(() => {
        setCupFill((prev) => ({
          ...prev,
          sugarLevel: selectedSugar,
        }))
        setAnimateSugar(false)
      }, 300)

      prevSugarRef.current = selectedSugar
    }
  }, [selectedSugar])

  // Handle toppings changes with animation
  useEffect(() => {
    if (JSON.stringify(prevToppingsRef.current) !== JSON.stringify(selectedToppings)) {
      // Find which topping was added or removed
      const prevSet = new Set(prevToppingsRef.current)
      const currentSet = new Set(selectedToppings)

      // Find added toppings (in current but not in prev)
      const addedToppings = selectedToppings.filter((t) => !prevSet.has(t))

      // Find removed toppings (in prev but not in current)
      const removedToppings = prevToppingsRef.current.filter((t) => !currentSet.has(t))

      // Keep existing toppings
      const existingToppings = cupFill.toppings.filter(
        (t) => !removedToppings.includes(t.name) && !addedToppings.includes(t.name),
      )

      // Add new toppings with animation
      if (addedToppings.length > 0) {
        setAnimateToppings(true)

        setTimeout(() => {
          const newToppings = addedToppings.map((name) => {
            const topping = toppings.find((t) => t.name === name)
            return {
              ...(topping || { name, color: "#000000", shape: "circle", size: 4 }),
              isAnimating: true, // Mark this topping for animation
            }
          })

          setCupFill((prev) => ({
            ...prev,
            toppings: [...existingToppings, ...newToppings],
          }))

          // Reset animation flag after animation completes
          setTimeout(() => {
            setAnimateToppings(false)
            setCupFill((prev) => ({
              ...prev,
              toppings: prev.toppings.map((t) => ({ ...t, isAnimating: false })),
            }))
          }, 800)
        }, 100)
      } else {
        // Just remove toppings without animation
        setCupFill((prev) => ({
          ...prev,
          toppings: existingToppings,
        }))
      }

      prevToppingsRef.current = [...selectedToppings]
    }
  }, [selectedToppings])

  // Toggle topping selection
  const handleToppingToggle = (toppingName) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName) ? prev.filter((t) => t !== toppingName) : [...prev, toppingName],
    )
  }

  // Get the base drink color
  const getBaseColor = () => {
    const baseOption = baseOptions.find((option) => option.name === selectedBase)
    return baseOption?.color || "#8B4513"
  }

  // Calculate nutritional values
  const calculateNutrition = () => {
    if (!selectedBase) return { calories: 0, sugar: 0, fat: 0 }

    // Base values
    const baseNutrition = nutritionalInfo.base[selectedBase] || { calories: 0, sugar: 0, fat: 0 }

    // Sugar multiplier
    const sugarMultiplier = nutritionalInfo.sugar[selectedSugar] || 0

    // Calculate base nutrition with sugar adjustment
    let totalCalories = baseNutrition.calories
    let totalSugar = baseNutrition.sugar * sugarMultiplier
    let totalFat = baseNutrition.fat

    // Add toppings
    selectedToppings.forEach((topping) => {
      const toppingNutrition = nutritionalInfo.toppings[topping] || { calories: 0, sugar: 0, fat: 0 }
      totalCalories += toppingNutrition.calories
      totalSugar += toppingNutrition.sugar
      totalFat += toppingNutrition.fat
    })

    // Size adjustment
    const sizeMultiplier = selectedSize === "Large" ? 1.375 : 1 // 22oz vs 16oz

    return {
      calories: Math.round(totalCalories * sizeMultiplier),
      sugar: Math.round(totalSugar * sizeMultiplier),
      fat: Math.round(totalFat * sizeMultiplier),
    }
  }

  // Generate sugar sparkles (bigger, more opaque)
  const generateSugarSparkles = () => {
    const count = getSugarSparkleCount(selectedSugar)
    const sparkles = []
    for (let i = 0; i < count; i++) {
      const sparkleSize = Math.random() * 5 + 3 // bigger sparkles
      const sparkleOpacity = Math.random() * 0.3 + 0.7 // more opaque
      sparkles.push({
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
        size: sparkleSize,
        opacity: sparkleOpacity,
        delay: Math.random() * 0.5,
      })
    }
    return sparkles
  }

  // Render Salty Cream as a single top layer
  // We'll animate from height: 0% -> 15% (flat top layer)
  const renderSaltyCream = (topping, index, position) => {
    const { color, isAnimating } = topping
    const animationStyle =
      isAnimating && animateToppings
        ? {
            animation: `fillTopLayer 1s ease-in-out forwards`,
            animationDelay: `${position.delay}s`,
          }
        : {
            height: "15%", // if not animating, show final height
          }

    return (
      <div
        key={`${topping.name}-${index}`}
        className="absolute"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          // We'll start at height: 0 in the keyframe, so set it here as fallback:
          height: "0%",
          backgroundColor: color,
          zIndex: 10,
          opacity: 0.95,
          borderRadius: 0, // flat edges
          ...animationStyle,
        }}
      />
    )
  }

  // Render a topping based on its shape (and name)
  const renderTopping = (topping, index, position) => {
    const { shape, color, size, isAnimating, name } = topping

    // If it's Salty Cream, use the dedicated function:
    if (name === "Salty Cream") {
      return renderSaltyCream(topping, index, position)
    }

    // For all other toppings, keep the existing logic
    // We'll do the standard "smoothFall" with random rotate
    const biggerSize = name === "Salty Cream" ? size * 1.4 : size * 2.8
    const animationStyle =
      isAnimating && animateToppings
        ? {
            animation: `smoothFall 1s ease-in-out forwards`,
            animationDelay: `${position.delay}s`,
            opacity: 0,
            transform: `translateY(-50px) rotate(${position.rotate}deg)`,
          }
        : {}

    switch (shape) {
      case "circle":
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
      case "square":
        return (
          <div
            key={`${name}-${index}`}
            className="absolute"
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
      case "rectangle":
        return (
          <div
            key={`${name}-${index}`}
            className="absolute"
            style={{
              backgroundColor: color,
              width: `${biggerSize + 2}px`,
              height: `${biggerSize}px`,
              top: `${position.top}%`,
              left: `${position.left}%`,
              opacity: 0.9,
              zIndex: 6,
              ...animationStyle,
            }}
          />
        )
      case "wave":
        // Generic wave (if you had others besides Salty Cream)
        return (
          <div
            key={`${name}-${index}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: `${(size + 8) * 1.4}px`,
              height: `${(size + 3) * 1.4}px`,
              top: `${position.top}%`,
              left: `${position.left}%`,
              opacity: 0.9,
              zIndex: 6,
              ...animationStyle,
            }}
          />
        )
      case "chunk":
        return (
          <div
            key={`${name}-${index}`}
            className="absolute rounded-md"
            style={{
              backgroundColor: color,
              width: `${biggerSize + Math.random() * 2}px`,
              height: `${biggerSize + Math.random() * 2}px`,
              top: `${position.top}%`,
              left: `${position.left}%`,
              transform: `skew(${Math.random() * 10}deg, ${Math.random() * 10}deg)`,
              opacity: 0.9,
              zIndex: 6,
              ...animationStyle,
            }}
          />
        )
      case "bean":
        return (
          <div
            key={`${name}-${index}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: `${biggerSize}px`,
              height: `${biggerSize + 1}px`,
              top: `${position.top}%`,
              left: `${position.left}%`,
              opacity: 0.9,
              zIndex: 6,
              ...animationStyle,
            }}
          />
        )
      default:
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

  // Render an ice cube with animation
  const renderIceCube = (cube, index) => {
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
          zIndex: 8, // keep ice above other toppings if desired
          animation: animateIce ? `smoothFall 1s ease-in-out forwards` : "none",
          animationDelay: `${cube.delay}s`,
          transform: animateIce ? "translateY(-50px) rotate(0deg)" : `rotate(${cube.rotate}deg)`,
        }}
      />
    )
  }

  // Render a sugar sparkle with no rotation (for clarity)
  const renderSugarSparkle = (sparkle, index) => {
    return (
      <div
        key={`sparkle-${index}`}
        className="absolute rounded-full"
        style={{
          width: `${sparkle.size}px`,
          height: `${sparkle.size}px`,
          top: `${sparkle.top}%`,
          left: `${sparkle.left}%`,
          backgroundColor: "rgba(255,255,255,0.9)", // more visible
          opacity: sparkle.opacity,
          animation: animateSugar ? `smoothFallNoRotate 1s ease-in-out forwards` : "none",
          animationDelay: `${sparkle.delay}s`,
          transform: animateSugar ? "translateY(-30px)" : "none",
        }}
      />
    )
  }

  const handleSaveDrink = () => {
    if (!selectedBase) return

    const newDrink = {
      id: Date.now(),
      base: selectedBase,
      baseColor: getBaseColor(),
      ice: selectedIce,
      sugar: selectedSugar,
      toppings: selectedToppings,
      addOns: addOns,
      size: selectedSize,
      date: new Date().toLocaleDateString(),
    }

    // Limit to 12 drinks by removing oldest if needed
    const updatedDrinks = [newDrink, ...savedDrinks]
    if (updatedDrinks.length > 12) {
      updatedDrinks.pop()
    }

    setSavedDrinks(updatedDrinks)
    localStorage.setItem("savedDrinks", JSON.stringify(updatedDrinks))
  }

  const handleDeleteSavedDrink = (id) => {
    const updatedDrinks = savedDrinks.filter((drink) => drink.id !== id)
    setSavedDrinks(updatedDrinks)
    localStorage.setItem("savedDrinks", JSON.stringify(updatedDrinks))
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-6">
      <style jsx global>{`
        /* Original "smoothFall" for toppings & ice (includes random rotate at 100%) */
        @keyframes smoothFall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(${Math.random() * 360}deg);
            opacity: 1;
          }
        }

        /* A no-rotate version for sugar sparkles */
        @keyframes smoothFallNoRotate {
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

        /* For Salty Cream: fill from top (height 0% -> 15%) */
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

        /* For the "fallInFromTop" effect used above the cup if needed */
        @keyframes smoothFallFromTop {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(50px) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }

        /* Slide in animation for saved drinks menu */
        @keyframes slideIn {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      <h1 className="text-3xl font-bold text-amber-900 mt-8 mb-6">Build Your Perfect Bubble Tea</h1>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
        {/* Cup Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Help and Saved Drinks Icons */}
          <div className="absolute top-0 left-0 flex items-center gap-3 z-20">
            {/* Help Icon with Tooltip */}
            <div className="relative group">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center cursor-help">
                <HelpCircle size={16} className="text-amber-800" />
              </div>
              <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-white rounded-md shadow-md border border-gray-200 invisible group-hover:visible z-50">
                <p className="text-sm text-gray-700">
                  Build your perfect bubble tea by selecting a base drink, ice level, sugar level, and optional
                  toppings. The visualization will update in real-time. Save up to 12 of your favorite combinations!
                </p>
              </div>
            </div>

            {/* Bookmark Icon for Saved Drinks */}
            <div
              id="bookmark-icon"
              className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center cursor-pointer"
              onClick={() => setShowSavedDrinksMenu(!showSavedDrinksMenu)}
            >
              <BookmarkIcon size={16} className="text-amber-800" />
            </div>
          </div>

          <div className="relative w-64 h-96">
            {/* Cup outline */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-56 h-72 border-4 border-gray-300 rounded-b-[100px] rounded-t-lg overflow-hidden">
              {/* Base liquid */}
              {selectedBase && (
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out"
                  style={{
                    height: `${getSugarHeight(selectedSugar)}%`,
                    backgroundColor: cupFill.baseColor,
                    zIndex: 5, // behind toppings
                  }}
                ></div>
              )}

              {/* Sugar sparkles */}
              {selectedBase &&
                selectedSugar !== "No Sugar" &&
                generateSugarSparkles().map((sparkle, index) => renderSugarSparkle(sparkle, index))}

              {/* Ice cubes */}
              {selectedIce !== "No Ice" && iceCubes.map((cube, index) => renderIceCube(cube, index))}

              {/* Toppings */}
              {cupFill.toppings.length > 0 &&
                cupFill.toppings.map((topping) => {
                  // If Salty Cream, we do a single top layer
                  if (topping.name === "Salty Cream") {
                    // Just 1 item with dummy position
                    return renderTopping(topping, 0, { top: 0, left: 0, rotate: 0, delay: 0 })
                  }

                  // Otherwise, multiple random positions
                  const count = topping.shape === "wave" ? 4 : Math.floor(Math.random() * 5) + 3
                  const positions = generateRandomPositions(count, topping.shape)
                  return positions.map((position, posIndex) => renderTopping(topping, posIndex, position))
                })}
            </div>

            {/* Straw */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 flex justify-center z-10">
              <div className="w-2 h-16 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full -translate-y-8"></div>
            </div>

            {/* Falling animation area above cup (if you want to show ice/toppings falling) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-56 h-10 overflow-visible">
              {/* Example of ice falling from top */}
              {animateIce &&
                selectedIce !== "No Ice" &&
                Array.from({ length: getIceCubeCount(selectedIce) }).map((_, index) => (
                  <div
                    key={`falling-ice-${index}`}
                    className="absolute rounded-md border border-white/80"
                    style={{
                      width: `${Math.random() * 6 + 8}px`,
                      height: `${Math.random() * 6 + 8}px`,
                      left: `${Math.random() * 80 + 10}%`,
                      top: `-${Math.random() * 5 + 5}px`,
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      opacity: Math.random() * 0.3 + 0.4,
                      boxShadow: "inset 0 0 2px rgba(255, 255, 255, 0.8)",
                      animation: `smoothFallFromTop 1s ease-in-out forwards`,
                      animationDelay: `${Math.random() * 0.5}s`,
                    }}
                  />
                ))}

              {/* Example of toppings falling from top */}
              {animateToppings &&
                (() => {
                  const prevSet = new Set(prevToppingsRef.current || [])
                  const currentSet = new Set(selectedToppings)
                  const addedToppings = selectedToppings.filter((t) => !prevSet.has(t))

                  return addedToppings.flatMap((toppingName, idx) => {
                    const topping = toppings.find((t) => t.name === toppingName) || {
                      color: "#000000",
                      shape: "circle",
                      size: 4,
                    }
                    // If it's Salty Cream, we'll drop only 1 from top
                    const dropCount = topping.name === "Salty Cream" ? 1 : 3

                    return Array.from({ length: dropCount }).map((_, index) => (
                      <div
                        key={`falling-topping-${idx}-${index}`}
                        className={`absolute ${
                          topping.shape === "circle" ? "rounded-full" : topping.shape === "square" ? "" : "rounded-sm"
                        }`}
                        style={{
                          width: `${(topping.size + 2) * 1.4}px`,
                          height: `${(topping.size + 2) * 1.4}px`,
                          backgroundColor: topping.color,
                          left: `${Math.random() * 80 + 10}%`,
                          top: `-${Math.random() * 5 + 5}px`,
                          animation: `smoothFallFromTop 1s ease-in-out forwards`,
                          animationDelay: `${Math.random() * 0.5 + idx * 0.1}s`,
                        }}
                      />
                    ))
                  })
                })()}
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-semibold text-lg" style={{ color: selectedBase ? getBaseColor() : "#8B4513" }}>
                {selectedBase || "Select your drink"}
              </h3>
              {selectedBase && (
                <button
                  onClick={() => setShowNutritionalInfo(!showNutritionalInfo)}
                  className="text-amber-600 hover:text-amber-800 transition-colors"
                  aria-label="Show nutritional information"
                >
                  <AlertCircle size={18} />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {selectedIce} • {selectedSugar} • {selectedSize}
            </p>

            {/* Nutritional Info Popup */}
            {showNutritionalInfo && selectedBase && (
              <div className="mt-2 p-3 bg-white border border-amber-200 rounded-md shadow-md text-left">
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
                <p className="text-xs text-gray-700 mt-2">Values are approximate and may vary.</p>
              </div>
            )}

            {/* Toppings dropdown */}
            {selectedToppings.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
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
                  <ul className="list-disc list-inside mt-1 text-left">
                    {selectedToppings.map((topping) => (
                      <li key={topping}>{topping}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Customization Options */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Base Selection */}
          <div className="relative">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-amber-500"></div>
            <Select value={selectedBase} onValueChange={setSelectedBase}>
              <SelectTrigger className="w-full border-amber-500 text-gray-900">
                <SelectValue>{selectedBase || "Select base drink"}</SelectValue>
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
                <SelectValue>{selectedIce || "Select ice level"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {iceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-300"
                          style={{
                            width:
                              level === "Extra Ice"
                                ? "100%"
                                : level === "Regular Ice"
                                  ? "75%"
                                  : level === "Less Ice"
                                    ? "35%"
                                    : "0%",
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-900">{level}</span>
                    </div>
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
                <SelectValue>{selectedSugar || "Select sugar level"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {sugarLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400" style={{ width: `${getSugarBarWidth(level)}%` }}></div>
                      </div>
                      <span className="text-gray-900">{level}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toppings Selection */}
          <div className="relative">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-purple-400"></div>
            <Select
              multiple
              value={selectedToppings}
              onValueChange={(values) => setSelectedToppings(Array.isArray(values) ? values : [values])}
            >
              <SelectTrigger className="w-full border-purple-400 text-gray-900">
                <SelectValue>
                  {selectedToppings.length === 0 ? "Select toppings" : `${selectedToppings.length} toppings selected`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {toppings.map((topping) => (
                  <div
                    key={topping.name}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors",
                      selectedToppings.includes(topping.name) ? "bg-purple-100" : "hover:bg-gray-100",
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleToppingToggle(topping.name)
                    }}
                  >
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
                    ></div>
                    <span className="text-gray-900">{topping.name}</span>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Size Selection */}
          <div className="relative mt-4">
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-green-400"></div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Size</label>
            <div className="flex items-center gap-4">
              <button
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  selectedSize === "Regular"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 text-gray-500 hover:border-green-300"
                }`}
                onClick={() => setSelectedSize("Regular")}
                aria-label="Regular size (16oz)"
              >
                R
              </button>
              <div className="text-sm">
                <p className="font-medium">Regular</p>
                <p className="text-gray-500 text-xs">16 oz</p>
              </div>

              <button
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  selectedSize === "Large"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 text-gray-500 hover:border-green-300"
                }`}
                onClick={() => setSelectedSize("Large")}
                aria-label="Large size (22oz)"
              >
                L
              </button>
              <div className="text-sm">
                <p className="font-medium">Large</p>
                <p className="text-gray-500 text-xs">22 oz</p>
              </div>
            </div>
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

          {/* Save Button */}
          <Button
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white w-full py-3 text-lg"
            disabled={!selectedBase}
            onClick={handleSaveDrink}
          >
            Save Drink!
          </Button>
        </div>
      </div>

      {/* Sliding Saved Drinks Menu */}
      <div
        id="saved-drinks-menu"
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          showSavedDrinksMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-700">Your Saved Drinks</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowSavedDrinksMenu(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-60px)] p-4">
          {savedDrinks.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No Saved Drinks Yet. It's Time To Get Creative!</p>
          ) : (
            <div className="space-y-4">
              {savedDrinks.map((drink) => (
                <div key={drink.id} className="relative border rounded-lg p-3 bg-white shadow-sm">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleDeleteSavedDrink(drink.id)}
                  >
                    <X size={16} />
                  </button>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-14 rounded-b-full rounded-t-sm border border-gray-300 flex-shrink-0 overflow-hidden"
                      style={{ backgroundColor: drink.baseColor }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{drink.base}</h4>
                      <p className="text-xs text-gray-600">
                        {drink.ice} • {drink.sugar} • {drink.size || "Regular"}
                      </p>
                      {drink.toppings.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="font-medium">Toppings:</span> {drink.toppings.join(", ")}
                        </p>
                      )}
                      {drink.addOns && (
                        <div className="mt-1">
                          <p className="text-xs font-medium text-gray-700">Special Instructions:</p>
                          <p className="text-xs text-gray-700 italic">"{drink.addOns}"</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{drink.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

