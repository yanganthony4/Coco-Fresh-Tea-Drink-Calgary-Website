// src/components/ToppingsSelector.tsx
"use client";

import React from "react";

export interface ToppingsSelectorProps {
  /** All toppings from your JSON */
  toppingsList: string[];
  /** Currently selected toppings */
  selectedToppings: string[];
  /** Called with a topping name whenever it’s clicked */
  onToggle: (topping: string) => void;
}

export default function ToppingsSelector({
  toppingsList,
  selectedToppings,
  onToggle,
}: ToppingsSelectorProps) {
  return (
    <div role="group" aria-label="Toppings" className="flex flex-wrap gap-2">
      {toppingsList.map((t) => {
        const selected = selectedToppings.includes(t);
        return (
          <div
            key={t}
            role="button"
            tabIndex={0}
            onClick={() => onToggle(t)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onToggle(t);
              }
            }}
            className={`cursor-pointer px-3 py-1 border rounded-full select-none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
              ${
                selected
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            aria-pressed={selected}
          >
            {t}
          </div>
        );
      })}
    </div>
  );
}
