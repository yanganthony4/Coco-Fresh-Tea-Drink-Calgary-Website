// src/components/OptionsPanel.tsx
"use client";

import React, {
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Drink,
  IceLevel,
  SugarLevel,
  AvailableToppings,
  Topping,
  Size,
} from "./DrinkBuilderTypes";
import { Select, SelectItem } from "./DrinkBuilderSelect";
import { Button } from "./DrinkBuilderButton";
import { Coffee, Snowflake, Candy, Coins, X } from "lucide-react";
import ToppingsSelector from "./ToppingsSelector";

// ——————————————————————————————————————————————————
// Inline Textarea
// ——————————————————————————————————————————————————
export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full p-2 border rounded-md bg-white text-gray-900 resize-none ${className}`}
      {...props}
    />
  );
}

export interface OptionsPanelProps {
  allDrinks: Drink[];
  selectedDrink: string;
  setSelectedDrink: Dispatch<SetStateAction<string>>;
  drinkSearchTerm: string;
  setDrinkSearchTerm: Dispatch<SetStateAction<string>>;
  isSearchDropdownOpen: boolean;
  setIsSearchDropdownOpen: Dispatch<SetStateAction<boolean>>;
  selectedIce: IceLevel | "";
  setSelectedIce: Dispatch<SetStateAction<IceLevel | "">>;
  selectedSugar: SugarLevel | "";
  setSelectedSugar: Dispatch<SetStateAction<SugarLevel | "">>;
  selectedToppings: Topping[];
  setSelectedToppings: Dispatch<SetStateAction<Topping[]>>;
  selectedSize: Size | "";
  setSelectedSize: Dispatch<SetStateAction<Size | "">>;
  addOns: string;
  setAddOns: Dispatch<SetStateAction<string>>;
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
  addOns,
  setAddOns,
  onSaveDrink,
}: OptionsPanelProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearchDropdownOpen]);

  const filteredDrinks = drinkSearchTerm
    ? allDrinks.filter((d) =>
        d.name.toLowerCase().includes(drinkSearchTerm.toLowerCase())
      )
    : allDrinks;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Base Drink Search */}
      <div
        ref={searchRef}
        className="w-full relative"
        aria-labelledby="base-drink-label"
      >
        <div className="flex items-center gap-2 mb-1">
          <Coffee size={18} className="text-orange-300" />
          <span
            id="base-drink-label"
            className="text-lg uppercase font-sora text-black"
          >
            Base Drink
          </span>
        </div>

        <div className="relative">
          <label htmlFor="drink-search" className="sr-only">
            Base Drink
          </label>
          <input
            id="drink-search"
            type="text"
            role="textbox"
            aria-controls="base-drink-listbox"
            aria-autocomplete="list"
            aria-expanded={isSearchDropdownOpen}
            placeholder="Search and select a base drink"
            className="w-full h-16 text-xl md:h-12 md:text-md px-2 border border-amber-500 rounded-md text-black"
            value={drinkSearchTerm}
            onChange={(e) => setDrinkSearchTerm(e.target.value)}
            onClick={() => setIsSearchDropdownOpen(true)}
          />
          {selectedDrink && (
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              onClick={() => {
                setSelectedDrink("");
                setDrinkSearchTerm("");
                setIsSearchDropdownOpen(false);
              }}
              aria-label="Clear selection"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {isSearchDropdownOpen && (
          <ul
            id="base-drink-listbox"
            role="listbox"
            tabIndex={-1}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {filteredDrinks.length > 0 ? (
              filteredDrinks.map((drink) => (
                <li
                  key={drink.name}
                  role="option"
                  aria-selected={selectedDrink === drink.name}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedDrink(drink.name);
                    setDrinkSearchTerm(drink.name);
                    setIsSearchDropdownOpen(false);
                  }}
                >
                  <span className="text-black">{drink.name}</span>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No drinks found</li>
            )}
          </ul>
        )}
      </div>

      {/* Ice Level */}
      <fieldset className="relative w-full">
        <legend className="flex items-center gap-2 mb-1">
          <Snowflake size={18} className="text-blue-300" />
          <span className="text-lg uppercase font-sora text-black">
            Ice Level
          </span>
        </legend>
        <Select
          aria-label="Ice Level"
          value={selectedIce}
          onValueChange={setSelectedIce}
        >
          {Object.values(IceLevel).map((level) => (
            <SelectItem key={level} value={level}>
              <span className="text-black">{level}</span>
            </SelectItem>
          ))}
        </Select>
      </fieldset>

      {/* Sugar Level */}
      <fieldset className="relative w-full">
        <legend className="flex items-center gap-2 mb-1">
          <Candy size={18} className="text-yellow-300" />
          <span className="text-lg uppercase font-sora text-black">
            Sugar Level
          </span>
        </legend>
        <Select
          aria-label="Sugar Level"
          value={selectedSugar}
          onValueChange={setSelectedSugar}
        >
          {Object.values(SugarLevel).map((level) => (
            <SelectItem key={level} value={level}>
              <span className="text-black">{level}</span>
            </SelectItem>
          ))}
        </Select>
      </fieldset>

      {/* Toppings Selector */}
      <fieldset className="relative w-full">
        <legend id="toppings-legend" className="flex items-center gap-2 mb-1">
          <Coins size={18} className="text-black" />
          <span className="text-lg uppercase font-sora text-black">
            Toppings
          </span>
        </legend>
        <ToppingsSelector
          aria-labelledby="toppings-legend"
          toppingsList={[...AvailableToppings] as Topping[]}
          selectedToppings={selectedToppings}
          onToggle={(t: Topping) =>
            setSelectedToppings((prev) => {
              const already = prev.includes(t);
              if (already) {
                return prev.filter((x) => x !== t);
              }
              return prev.length < 5 ? [...prev, t] : prev;
            })
          }
        />
      </fieldset>

      {/* Size Options */}
      <div className="w-full">
        <label className="block text-lg uppercase font-sora text-black mb-2">
          Size
        </label>
        <div className="flex items-center gap-4">
          {/* Regular */}
          <button
            type="button"
            onClick={() => setSelectedSize(Size.REGULAR)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              selectedSize === Size.REGULAR
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 text-black"
            }`}
            aria-label="Regular size (16 oz)"
          >
            R
          </button>
          <div className="text-sm text-black">
            <p className="font-medium">Regular</p>
            <p className="text-xs">16 oz</p>
          </div>

          {/* Large */}
          <button
            type="button"
            onClick={() => setSelectedSize(Size.LARGE)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              selectedSize === Size.LARGE
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 text-black"
            }`}
            aria-label="Large size (22 oz)"
          >
            L
          </button>
          <div className="text-sm text-black">
            <p className="font-medium">Large</p>
            <p className="text-xs">22 oz</p>
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="w-full">
        <label
          htmlFor="add-ons"
          className="block text-lg uppercase font-sora text-black mb-1"
        >
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

      {/* Save Button */}
      <Button
        type="button"
        onClick={onSaveDrink}
        className="mt-4 w-full py-3 text-lg uppercase font-sora bg-orange-400 md-rounded"
        disabled={!selectedDrink}
      >
        Save Drink
      </Button>
    </div>
  );
}
