"use client";

import React from "react";
import Image from "next/image";
import { Drink, IceLevel, SugarLevel } from "./DrinkBuilderTypes";

interface DrinkVisualizationProps {
  currentDrink?: Drink;
  selectedIce: IceLevel | "";
  selectedSugar: SugarLevel | "";
  selectedToppings: string[];
}

export default function DrinkVisualization({
  currentDrink,
  selectedIce,
  selectedSugar,
  selectedToppings,
}: DrinkVisualizationProps) {
  const getIceImage = (level: IceLevel | ""): string => {
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

  const getSugarImage = (level: SugarLevel | ""): string => {
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

  const getToppingIconPath = (topping: string): string =>
    `/images/drinkbuilder/${topping.toLowerCase().replace(/\s+/g, " ")}.webp`;

  const displayName = currentDrink?.name ?? "Select your drink";
  const displayIce = selectedIce || "Select Ice Level";
  const displaySugar = selectedSugar || "Select Sugar Level";

  return (
    <section
      aria-labelledby="drink-visualization-title"
      className="w-full"
    >
      {/* Visual Row */}
      <div className="flex items-center justify-center gap-2 ">
        {/* ICE */}
        <figure className="flex-shrink-0 flex items-center justify-center max-h-[80vh] w-10">
          <Image
            src={getIceImage(selectedIce)}
            alt={`Ice Level: ${displayIce}`}
            width={64}
            height={256}
            className="h-auto max-h-[70vh]"
            priority={false}
          />
          <figcaption className="sr-only">
            Ice level: {displayIce}
          </figcaption>
        </figure>

        {/* DRINK */}
        <figure className="relative flex-shrink-0 md:w-58 md:w-64 w-4/5 h-96 md:h-98 border-4 border-black rounded overflow-hidden">
          {currentDrink ? (
            <Image
              src={currentDrink.image}
              alt={currentDrink.name}
              fill
              className="object-cover h-auto "
              priority={true}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-sora text-gray-400">
              SELECT A BASE
            </div>
          )}

          {/* TOPPINGS */}
          {selectedToppings.length > 0 && (
            <ul
              role="list"
              aria-label="Selected toppings"
              className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-1 p-1"
            >
              {selectedToppings.slice(0, 5).map((topping, i) => (
                <li
                  key={i}
                  className="w-14 h-14 md:w-10 md:h-10 bg-white border border-black rounded-md overflow-hidden flex items-center justify-center p-1"
                >
                  <Image
                    src={getToppingIconPath(topping)}
                    alt={topping}
                    width={64}
                    height={64}
                    className="h-auto"
                    priority={false}
                  />
                </li>
              ))}
            </ul>
          )}
        </figure>

        {/* SUGAR */}
        <figure className="flex-shrink-0 flex items-center justify-center max-h-[70vh] w-10">
          <Image
            src={getSugarImage(selectedSugar)}
            alt={`Sugar Level: ${displaySugar}`}
            width={64}
            height={256}
            className="h-auto max-h-[70vh]"
            priority={false}
          />
          <figcaption className="sr-only">
            Sugar level: {displaySugar}
          </figcaption>
        </figure>
      </div>

      {/* LABELS */}
      <div className="hidden md:mt-4 md:text-center md:font-sora">
        <h3
          id="drink-visualization-title"
          className="font-semibold text-lg text-black"
        >
          {displayName}
        </h3>
        <p className="text-sm text-black">
          {displayIce} • {displaySugar}
        </p>
      </div>
    </section>
  );
}
