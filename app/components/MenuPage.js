"use client"

import { useState } from "react"
import CategoryList from "./CategoryList"
import ProductGrid from "./ProductGrid"
import Data from "./data.json"

const MenuPage = () => {
  const drinks = Data.drinks

  // Define categories
  const categories = ["All", "Favourites", "Milk Tea", "Fresh Tea", "Fresh Milk", "Fruit Tea", "Slush"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter drinks based on selected category
  const filteredDrinks =
    selectedCategory === "All" ? drinks : drinks.filter((drink) => drink.category === selectedCategory)

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <CategoryList
          categories={categories}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <div className="flex-1 lg:pl-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 capitalize">{selectedCategory}</h1>
          <ProductGrid products={filteredDrinks} />
        </div>
      </div>
    </div>
  )
}

export default MenuPage

