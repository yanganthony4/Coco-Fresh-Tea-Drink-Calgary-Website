"use client";

import React from "react";
import { Drink } from "./DrinkBuilderTypes";

interface DrinkVisualizationProps {
  currentDrink?: Drink;
  selectedIce: string;
  selectedSugar: string;
  selectedToppings: string[];
  iceMarkers: { label: string; percent: number }[];
  sugarMarkers: { label: string; percent: number }[];
  iceLevelPercentage: (level: string) => number;
  sugarLevelPercentage: (level: string) => number;
}

export default function DrinkVisualization({
  currentDrink,
  selectedIce,
  selectedSugar,
  selectedToppings,
  iceMarkers,
  sugarMarkers,
  iceLevelPercentage,
  sugarLevelPercentage,
}: DrinkVisualizationProps) {
  return (
    <div className="flex-1 flex flex-col items-center relative">
      <div className="flex items-center">
        {/* ICE Bar */}
        <div className="w-8 h-96 flex flex-col justify-end relative mr-2">
          <div className="absolute inset-0 bg-gray-200">
            {iceMarkers.map((marker) => (
              <div
                key={marker.label}
                className="absolute left-0 right-0 border-t border-gray-400"
                style={{ bottom: `${marker.percent}%` }}
              />
            ))}
          </div>
          <div
            className="bg-blue-300 w-full absolute bottom-0"
            style={{
              height: `${selectedIce ? iceLevelPercentage(selectedIce) : 0}%`,
            }}
          ></div>
        </div>

        {/* Drink Image */}
        <div className="relative w-64 h-96 border border-gray-300 rounded overflow-hidden">
          {currentDrink ? (
            <img
              src={`/images/${currentDrink.image}`}
              alt={currentDrink.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Select a drink to preview
            </div>
          )}
          {/* Toppings Bubbles */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2">
            {selectedToppings.map((topping, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-gray-100 border border-gray-300 rounded flex items-center justify-center"
              >
                <span className="text-xs text-gray-500">
                  {topping.charAt(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SUGAR Bar */}
        <div className="w-8 h-96 flex flex-col justify-end relative ml-2">
          <div className="absolute inset-0 bg-gray-200">
            {sugarMarkers.map((marker) => (
              <div
                key={marker.label}
                className="absolute left-0 right-0 border-t border-gray-400"
                style={{ bottom: `${marker.percent}%` }}
              />
            ))}
          </div>
          <div
            className="bg-amber-300 w-full absolute bottom-0"
            style={{
              height: `${selectedSugar ? sugarLevelPercentage(selectedSugar) : 0}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-semibold text-lg text-black">
          {currentDrink ? currentDrink.name : "Select your drink"}
        </h3>
        <p className="text-sm text-black">
          {selectedIce || "Select Ice Level"} • {selectedSugar || "Select Sugar Level"}
        </p>
      </div>
    </div>
  );
}
