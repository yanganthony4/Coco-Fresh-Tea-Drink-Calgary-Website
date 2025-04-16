"use client";

import React from "react";
import { Drink, IceLevel, SugarLevel } from "./DrinkBuilderTypes";
import { Select, SelectItem } from "./DrinkBuilderSelect";
import { Button } from "./DrinkBuilderButton";
import { Coffee, Snowflake, Candy, Coins } from "lucide-react";

// Inline Textarea component (as provided)
export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full p-2 border rounded-md bg-white text-gray-900 resize-none ${className}`}
      {...props}
    />
  );
}

interface OptionsPanelProps {
  allDrinks: Drink[];
  selectedDrink: string;
  setSelectedDrink: (s: string) => void;
  drinkSearchTerm: string;
  setDrinkSearchTerm: (s: string) => void;
  isSearchDropdownOpen: boolean;
  setIsSearchDropdownOpen: (b: boolean) => void;
  selectedIce: string;
  setSelectedIce: (s: string) => void;
  selectedSugar: string;
  setSelectedSugar: (s: string) => void;
  selectedToppings: string[];
  setSelectedToppings: (s: string[]) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  milkOption: string;
  setMilkOption: (s: string) => void;
  addOns: string;
  setAddOns: (s: string) => void;
  onSaveDrink: () => void;
}

export default function OptionsPanel({
  allDrinks,
  selectedDrink,
  setSelectedDrink,
  drinkSearchTerm,
  setDrinkSearchTerm,
  isSearchDropdownOpen,
  setIsSearchDropdownOpen,
  selectedIce,
  setSelectedIce,
  selectedSugar,
  setSelectedSugar,
  selectedToppings,
  setSelectedToppings,
  selectedSize,
  setSelectedSize,
  milkOption,
  setMilkOption,
  addOns,
  setAddOns,
  onSaveDrink,
}: OptionsPanelProps) {
  // Filter the available drinks based on the search term.
  const filteredDrinks = drinkSearchTerm
    ? allDrinks.filter((drink) =>
        drink.name.toLowerCase().includes(drinkSearchTerm.toLowerCase())
      )
    : allDrinks;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Base Drink Search */}
      <div className="relative w-full">
        <div className="flex items-center gap-2 mb-1">
            <Coffee size={18} className="text-orange-300" />
            <span className="text-md font-medium text-black">Base Drink</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search and select a base drink"
            className="w-full p-2 pl-10 border border-amber-500 rounded-md text-black"
            value={drinkSearchTerm}
            onChange={(e) => setDrinkSearchTerm(e.target.value)}
            onClick={() => setIsSearchDropdownOpen(true)}
          />
        </div>
        {isSearchDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredDrinks.length > 0 ? (
              filteredDrinks.map((drink) => (
                <div
                  key={drink.name}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedDrink(drink.name);
                    setDrinkSearchTerm(drink.name);
                    setIsSearchDropdownOpen(false);
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-black">{drink.name}</span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No drinks found</div>
            )}
          </div>
        )}
      </div>

      {/* Ice Level Dropdown */}
      <div className="relative w-full">
        <div className="flex items-center gap-2 mb-1">
            <Snowflake size={18} className="text-blue-300" />
            <span className="text-md font-medium text-black">Ice Level</span>
        </div>
        <div className="relative">
            <Select value={selectedIce} onValueChange={setSelectedIce}>
            {Object.values(IceLevel).map((level) => (
                <SelectItem key={level} value={level}>
                <span className="text-black">{level}</span>
                </SelectItem>
            ))}
            </Select>
        </div>
        </div>

      {/* Sugar Level Dropdown */}
      <div className="relative w-full">
        <div className="flex items-center gap-2 mb-1">
            <Candy size={18} className="text-yellow-300" />
            <span className="text-md font-medium text-black">Sugar Level</span>
        </div>
        <div className="relative">
          <Select value={selectedSugar} onValueChange={setSelectedSugar}>
            {Object.values(SugarLevel).map((level) => (
              <SelectItem key={level} value={level}>
                <span className="text-black">{level}</span>
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Toppings (Multiple Selection) */}
      <div className="relative w-full">
        <div className="flex items-center gap-2 mb-1">
            <Coins size={18} className="text-black" />
            <span className="text-md font-medium text-black">Toppings</span>
        </div>
        <div className="relative">
          <Select multiple value={selectedToppings} onValueChange={setSelectedToppings}>
            {["Pearls", "Sago", "Pudding", "Grass Jelly", "Coconut Jelly", "Red Bean"].map(
              (topping) => (
                <SelectItem key={topping} value={topping}>
                  <span className="text-black">{topping}</span>
                </SelectItem>
              )
            )}
          </Select>
        </div>
      </div>

      {/* Size Options */}
      <div className="w-full">
        <label className="block text-sm font-medium text-black mb-2">Size</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedSize("Regular")}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              selectedSize === "Regular"
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 text-black"
            }`}
            aria-label="Regular size (16oz)"
          >
            R
          </button>
          <div className="text-sm text-black">
            <p className="font-medium">Regular</p>
            <p className="text-xs">16 oz</p>
          </div>
          <button
            onClick={() => setSelectedSize("Large")}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              selectedSize === "Large"
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 text-black"
            }`}
            aria-label="Large size (22oz)"
          >
            L
          </button>
          <div className="text-sm text-black">
            <p className="font-medium">Large</p>
            <p className="text-xs">22 oz</p>
          </div>
        </div>
      </div>

      {/* Milk Option */}
      <div className="w-full">
        <label className="block text-sm font-medium text-black mb-1">
          Milk Option
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMilkOption("Regular Milk Tea")}
            className={`flex items-center justify-center px-3 py-2 rounded-full border-2 transition-colors ${
              milkOption === "Regular Milk Tea"
                ? "border-[#8B4513] bg-[#f7f1eb] text-[#8B4513]"
                : "border-gray-300 text-black"
            }`}
          >
            Regular Milk Tea
          </button>
          <button
            onClick={() => setMilkOption("Milk")}
            className={`flex items-center justify-center px-3 py-2 rounded-full border-2 transition-colors ${
              milkOption === "Milk"
                ? "border-[#8B4513] bg-[#f7f1eb] text-[#8B4513]"
                : "border-gray-300 text-black"
            }`}
          >
            Milk
          </button>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="w-full">
        <label htmlFor="add-ons" className="block text-sm font-medium text-black mb-1">
          Special Instructions
        </label>
        <Textarea
          id="add-ons"
          placeholder="Any special requests? (e.g., less ice on top, extra sweet)"
          value={addOns}
          onChange={(e) => setAddOns(e.target.value)}
          className="min-h-[80px] text-black"
        />
      </div>

      {/* Save Drink Button */}
      <Button
        onClick={onSaveDrink}
        className="mt-4 w-full py-3 text-lg"
        disabled={!selectedDrink}
      >
        Save Drink!
      </Button>
    </div>
  );
}
