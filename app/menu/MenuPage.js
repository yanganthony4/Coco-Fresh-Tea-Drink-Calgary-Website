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

  // Filter drinks based on the selected category
  const filteredDrinks =
    selectedCategory === "All"
      ? drinks
      : drinks.filter((drink) => drink.category === selectedCategory);

  return (
    <div className="flex">
      <CategoryList
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
          {selectedCategory} 
        </h1>
        <ProductGrid products={filteredDrinks} />
      </div>
    </div>
  );
};

export default MenuPage;
