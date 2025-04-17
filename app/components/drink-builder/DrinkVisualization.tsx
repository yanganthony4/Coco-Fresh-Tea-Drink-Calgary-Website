"use client";

import React from "react";
import { Drink, IceLevel, SugarLevel } from "./DrinkBuilderTypes";

interface DrinkVisualizationProps {
  currentDrink?: Drink;
  selectedIce: string;
  selectedSugar: string;
  selectedToppings: string[];
}

export default function DrinkVisualization({
  currentDrink,
  selectedIce,
  selectedSugar,
  selectedToppings,
}: DrinkVisualizationProps) {
  const getIceImage = (level: string): string => {
    switch (level) {
      case IceLevel.LESS_ICE:
        return "/images/drinkbuilder/ice level 1.webp";
      case IceLevel.REGULAR_ICE:
        return "/images/drinkbuilder/ice level 2.webp";
      case IceLevel.EXTRA_ICE:
        return "/images/drinkbuilder/ice level 3.webp";
      default:
        return "/images/drinkbuilder/ice level.webp";
    }
  };

  const getSugarImage = (level: string): string => {
    switch (level) {
      case SugarLevel.THIRTY:
        return "/images/drinkbuilder/sugar level 1.webp";
      case SugarLevel.FIFTY:
        return "/images/drinkbuilder/sugar level 2.webp";
      case SugarLevel.SEVENTY:
        return "/images/drinkbuilder/sugar level 3.webp";
      case SugarLevel.HUNDRED_PERCENT:
        return "/images/drinkbuilder/sugar level 4.webp";
      case SugarLevel.EXTRA_SUGAR:
        return "/images/drinkbuilder/sugar level 5.webp";
      default:
        return "/images/drinkbuilder/sugar level.webp";
    }
  };

  const getToppingIconPath = (topping: string): string => {
    return `/images/drinkbuilder/${topping.toLowerCase().replace(/\s+/g, " ")}.webp`;
  };

  return (
    <div className="w-full flex flex-col items-center px-2">
      <div className="flex items-center justify-center gap-4 max-w-full overflow-x-auto">
        {/* ICE (left) */}
        <div className="flex-shrink-0 h-72 md:h-96 w-12 md:w-16 flex items-center justify-center">
          <img
            src={getIceImage(selectedIce)}
            alt={`Ice Level: ${selectedIce}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* DRINK (center) */}
        <div className="relative flex-shrink-0 h-72 md:h-96 w-48 md:w-64 border-4 border-black rounded overflow-hidden">
          {currentDrink ? (
            <img
              src={`${currentDrink.image}`}
              alt={currentDrink.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-sora text-gray-400">
              SELECT A BASE
            </div>
          )}

          {/* TOPPINGS */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 p-1 flex-wrap">
            {selectedToppings.slice(0, 5).map((t, i) => (
              <div
                key={i}
                className="w-8 h-8 md:w-10 md:h-10 bg-white border border-black rounded-md overflow-hidden flex items-center justify-center p-1"
              >
                <img
                  src={getToppingIconPath(t)}
                  alt={t}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SUGAR (right) */}
        <div className="flex-shrink-0 h-72 md:h-96 w-12 md:w-16 flex items-center justify-center">
          <img
            src={getSugarImage(selectedSugar)}
            alt={`Sugar Level: ${selectedSugar}`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* LABEL */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-lg text-black">
          {currentDrink?.name ?? "Select your drink"}
        </h3>
        <p className="text-sm text-black">
          {selectedIce || "Select Ice Level"} • {selectedSugar || "Select Sugar Level"}
        </p>
      </div>
    </div>
  );
}
