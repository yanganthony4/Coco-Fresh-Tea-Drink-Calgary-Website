"use client";

import React from "react";
import { X } from "lucide-react";
import { SavedDrink } from "./DrinkBuilderTypes";

interface SavedDrinksCartProps {
  savedDrinks: SavedDrink[];
  onDelete: (id: number) => void;
}

export default function SavedDrinksCart({
  savedDrinks,
  onDelete,
}: SavedDrinksCartProps) {
  return (
    <div className="mb-8 border border-gray-200 bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold text-black mb-2">Your Saved Drinks</h2>
      {savedDrinks.length === 0 ? (
        <p className="text-center py-4 text-black">
          No Saved Drinks Yet. It's Time To Get Creative!
        </p>
      ) : (
        <div className="space-y-4">
          {savedDrinks.map((drink) => (
            <div
              key={drink.id}
              className="relative border rounded-lg p-4 bg-white shadow-sm flex flex-col"
            >
              <button
                onClick={() => onDelete(drink.id)}
                className="absolute top-2 right-2 text-black hover:text-black"
              >
                <X size={16} />
              </button>
              <div className="flex gap-4 flex-1">
                <div className="w-10 flex-shrink-0 flex items-center justify-center">
                  {/* Render the drink image */}
                  {drink.image ? (
                    <img
                      src={`/images/${drink.image}`}
                      alt={drink.base}
                      className="w-8 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-12 bg-gray-300 rounded"></div>
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-sm font-medium text-black mb-1">
                    {drink.base}
                  </div>
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
                      <strong>Special Instructions:</strong>{" "}
                      <em>{drink.addOns}</em>
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
  );
}
