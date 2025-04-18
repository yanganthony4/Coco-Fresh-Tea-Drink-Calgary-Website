"use client";

import { useState } from "react";
import CategoryList from "./CategoryList";
import ProductGrid from "./ProductGrid";
import Image from "next/image";
import Data from "../json/menu-items.json";

// Define the shape of a drink item based on the JSON format
type Drink = {
  image: string;
  name: string;
  description: string;
  category: string | string[];
  calories?: string;
  price?: string;
};

const MenuPage = () => {
  const drinks: Drink[] = Data.drinks;

  const categories: string[] = [
    "All",
    "Favorites",
    "Milk Tea",
    "Fresh Tea",
    "Fresh Milk",
    "Fruit Tea",
    "Slush",
    "Salty Cream",
    "Yakult",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredDrinks: Drink[] =
    selectedCategory === "All"
      ? drinks
      : drinks.filter((drink) => {
          if (selectedCategory === "Favorites") {
            if (typeof drink.category === "string") {
              return drink.category === "Favourites";
            }
            return (
              Array.isArray(drink.category) &&
              drink.category.includes("Favourites")
            );
          }
          if (typeof drink.category === "string") {
            return drink.category === selectedCategory;
          }
          return (
            Array.isArray(drink.category) &&
            drink.category.includes(selectedCategory)
          );
        });

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <CategoryList
          categories={categories}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <div className="flex-1 lg:pl-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 uppercase flex items-center">
            {selectedCategory}
            <Image
              src="/images/art/cocoemoji.webp"
              alt="CoCo Emoji"
              width={24}
              height={24}
              className="ml-2 animate-jump"
              priority
            />
          </h1>
          <ProductGrid products={filteredDrinks} />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
