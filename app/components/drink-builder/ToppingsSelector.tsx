// src/components/ToppingsSelector.tsx
"use client";

import React from "react";
import type { Topping } from "./DrinkBuilderTypes";

export interface ToppingsSelectorProps {
  /** All toppings from your JSON */
  toppingsList: readonly Topping[];
  /** Currently selected toppings */
  selectedToppings: Topping[];
  /** Called with a topping name whenever it’s clicked */
  onToggle: (topping: Topping) => void;
}

// List of toppings to disable (greyed out and non-clickable)
const disabledToppings = new Set([
  "Sago",
  "Pudding",
  "Red Bean",
  "Tea Jelly",
  "Fresh Taro",
  "Salty Cream",
  "Grass Jelly",
  "White Pearls",
  "Brown Sugar Pearls",
  "Popping Lychee Pearls",
  "Popping Strawberry Pearls",
]);

export default function ToppingsSelector({
  toppingsList,
  selectedToppings,
  onToggle,
}: ToppingsSelectorProps) {
  return (
    <div role="group" aria-label="Toppings" className="flex flex-wrap gap-2">
      {toppingsList.map((t) => {
        const selected = selectedToppings.includes(t);
        const disabled = disabledToppings.has(t);

        return (
          <div
            key={t}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={() => {
              if (!disabled) {
                onToggle(t);
              }
            }}
            onKeyDown={(e) => {
              if (!disabled && (e.key === " " || e.key === "Enter")) {
                e.preventDefault();
                onToggle(t);
              }
            }}
            className={`px-3 py-1 border rounded-full select-none transition-colors
              ${disabled
                ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                : selected
                ? "bg-orange-500 text-white border-orange-500 cursor-pointer"
                : "bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer"}
              ${!disabled ? "focus:outline-none focus:ring-2 focus:ring-offset-1" : ""}
            `}
            aria-pressed={!disabled && selected ? true : undefined}
            aria-disabled={disabled}
          >
            {t}
          </div>
        );
      })}
    </div>
  );
}
