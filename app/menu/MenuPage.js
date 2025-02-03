"use client";

import { useState } from 'react';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';
import Data from './data.json';

const MenuPage = () => {
  const drinks = Data.drinks;

  // Define categories
  const categories = ["All", "Favourites", "Milk Tea", "Fresh Tea", "Fresh Milk", "Fruit Tea", "Slush"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter drinks based on selected category
  const filteredDrinks =
    selectedCategory === "All"
      ? drinks
      : drinks.filter((drink) => drink.category === selectedCategory);

  return (
    <div className="max-w-screen-2xl mx-auto px-16 py-12 min-h-screen flex flex-col">
      <div className="flex flex-grow">
        {/* Category List with Border */}
        <div className="w-1/4 pr-10 border-r border-gray-300">
          <CategoryList
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Product Grid Section */}
        <div className="flex-1 px-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
            {selectedCategory}
          </h1>
          <ProductGrid products={filteredDrinks} />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
