"use client"

import { useState } from "react"
import CategoryList from "./CategoryList"
import ProductGrid from "./ProductGrid"
import Data from "./data.json"
import { useForm, usePlugin } from "tinacms"

const MenuPage = () => {
  // Define editable fields with TinaCMS
  const [formData, form] = useForm({
    initialValues: {
      categories: ["All", "Favourites", "Milk Tea", "Fresh Tea", "Fresh Milk", "Fruit Tea", "Slush"],
      drinks: Data.drinks,
    },
    onSubmit: (data) => {
      console.log("Updated Menu Data:", data)
//logic for saving to backend
    },
    fields: [
      {
        name: "categories",
        label: "Categories",
        component: "group-list",
        itemProps: (item) => ({
          key: item,
          label: item,
        }),
        defaultItem: () => "New Category",
        fields: [
          {
            name: "category",
            label: "Category Name",
            component: "text",
          },
        ],
      },
      {
        name: "drinks",
        label: "Drinks",
        component: "group-list",
        itemProps: (item) => ({
          key: item.name,
          label: item.name,
        }),
        defaultItem: () => ({
          name: "New Drink",
          category: "All",
          description: "Description of the new drink",
          calories: "N/A",
          price: 0.0,
          image: "/placeholder.svg",
        }),
        fields: [
          {
            name: "name",
            label: "Drink Name",
            component: "text",
          },
          {
            name: "category",
            label: "Category",
            component: "text",
          },
          {
            name: "description",
            label: "Description",
            component: "textarea",
          },
          {
            name: "calories",
            label: "Calories",
            component: "text",
          },
          {
            name: "price",
            label: "Price",
            component: "number",
          },
          {
            name: "image",
            label: "Image",
            component: "text",
          },
        ],
      },
    ],
  })

  // Connect the form to TinaCMS
  usePlugin(form)

  // Extract categories and drinks from formData
  const categories = formData.categories
  const drinks = formData.drinks

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