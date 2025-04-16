"use client";

import { JSX, useState, useEffect } from "react";
import drinksData from "../components/json/menu-items.json";

// Import components
import SavedDrinksCart from "../components/drink-builder/SavedDrinksCart";
import DrinkVisualization from "../components/drink-builder/DrinkVisualization";
import OptionsPanel from "../components/drink-builder/OptionsPanel";

// Import types and enums
import { Drink, SavedDrink, IceLevel, SugarLevel } from "../components/drink-builder/DrinkBuilderTypes";

// Helper functions for calculating bar fill percentages
const iceLevelPercentage = (level: string): number => {
  switch (level) {
    case IceLevel.EXTRA_ICE:
      return 100;
    case IceLevel.REGULAR_ICE:
      return 75;
    case IceLevel.LESS_ICE:
      return 35;
    case IceLevel.NO_ICE:
      return 0;
    default:
      return 0;
  }
};

const sugarLevelPercentage = (level: string): number => {
  switch (level) {
    case SugarLevel.EXTRA_SUGAR:
      return 110;
    case SugarLevel.HUNDRED_PERCENT:
      return 100;
    case SugarLevel.SEVENTY:
      return 70;
    case SugarLevel.FIFTY:
      return 50;
    case SugarLevel.THIRTY:
      return 30;
    case SugarLevel.NO_SUGAR:
      return 0;
    default:
      return 0;
  }
};

const iceMarkers = [
  { label: "No Ice", percent: 0 },
  { label: "Less Ice", percent: 35 },
  { label: "Regular Ice", percent: 75 },
  { label: "Extra Ice", percent: 100 },
];

const sugarMarkers = [
  { label: "No Sugar", percent: 0 },
  { label: "30%", percent: 30 },
  { label: "50%", percent: 50 },
  { label: "70%", percent: 70 },
  { label: "100% Sugar", percent: 100 },
];

export default function DrinkBuilder(): JSX.Element {
  // Shared state for customization
  const [savedDrinks, setSavedDrinks] = useState<SavedDrink[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string>("");
  // Default sugar level is now set to "100% Sugar"
  const [selectedSugar, setSelectedSugar] = useState<string>("100% Sugar");
  const [drinkSearchTerm, setDrinkSearchTerm] = useState<string>("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState<boolean>(false);
  const [selectedIce, setSelectedIce] = useState<string>("");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("Regular");
  const [milkOption, setMilkOption] = useState<string>("Regular Milk Tea");
  const [addOns, setAddOns] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("savedDrinks");
    if (stored) {
      setSavedDrinks(JSON.parse(stored));
    }
  }, []);

  const allDrinks: Drink[] = drinksData.drinks;

  const handleSaveDrink = (): void => {
    // Require a base drink to be selected.
    const currentDrink = allDrinks.find((d) => d.name === selectedDrink);
    if (!currentDrink) return;

    const newDrink: SavedDrink = {
      id: Date.now(),
      base: selectedDrink,
      image: currentDrink.image, // Save the drink image
      baseColor: "", // No longer used
      ice: selectedIce || IceLevel.REGULAR_ICE,
      sugar: selectedSugar || SugarLevel.HUNDRED_PERCENT,
      toppings: selectedToppings,
      addOns,
      size: selectedSize,
      milk: milkOption,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newDrink, ...savedDrinks];
    if (updated.length > 12) {
      updated.pop();
    }
    setSavedDrinks(updated);
    localStorage.setItem("savedDrinks", JSON.stringify(updated));

    // Reset fields
    setSelectedDrink("");
    setDrinkSearchTerm("");
    setIsSearchDropdownOpen(false);
    setSelectedIce("Regular");
    setSelectedSugar("100% Sugar"); // Reset sugar back to default.
    setSelectedToppings([]);
    setSelectedSize("Regular");
    setMilkOption("Regular Milk Tea");
    setAddOns("");
  };

  const handleDeleteSavedDrink = (id: number): void => {
    const updated = savedDrinks.filter((d) => d.id !== id);
    setSavedDrinks(updated);
    localStorage.setItem("savedDrinks", JSON.stringify(updated));
  };

  const currentDrink: Drink | undefined = allDrinks.find(
    (d) => d.name === selectedDrink
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="max-w-4xl w-full px-4 sm:px-8">
        {/* Saved Drinks Cart at the top */}
        <SavedDrinksCart savedDrinks={savedDrinks} onDelete={handleDeleteSavedDrink} />

        {/* Main Builder Area: Two columns */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Drink Visualization */}
          <DrinkVisualization
            currentDrink={currentDrink}
            selectedIce={selectedIce}
            selectedSugar={selectedSugar}
            selectedToppings={selectedToppings}
            iceMarkers={iceMarkers}
            sugarMarkers={sugarMarkers}
            iceLevelPercentage={iceLevelPercentage}
            sugarLevelPercentage={sugarLevelPercentage}
          />

          {/* Right: Options Panel */}
          <OptionsPanel
            allDrinks={allDrinks}
            selectedDrink={selectedDrink}
            setSelectedDrink={setSelectedDrink}
            drinkSearchTerm={drinkSearchTerm}
            setDrinkSearchTerm={setDrinkSearchTerm}
            isSearchDropdownOpen={isSearchDropdownOpen}
            setIsSearchDropdownOpen={setIsSearchDropdownOpen}
            selectedIce={selectedIce}
            setSelectedIce={setSelectedIce}
            selectedSugar={selectedSugar}
            setSelectedSugar={setSelectedSugar}
            selectedToppings={selectedToppings}
            setSelectedToppings={setSelectedToppings}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            milkOption={milkOption}
            setMilkOption={setMilkOption}
            addOns={addOns}
            setAddOns={setAddOns}
            onSaveDrink={handleSaveDrink}
          />
        </div>
      </div>
    </div>
  );
}
