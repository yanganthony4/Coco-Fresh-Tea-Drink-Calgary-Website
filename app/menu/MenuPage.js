"use client";

import { useState } from 'react';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';
import menuData from './data.json';

const MenuPage = () => {
  const categories = Object.keys(menuData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const products = menuData[selectedCategory];

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
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default MenuPage;
