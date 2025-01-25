import React from 'react';

const CategoryList = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="w-1/4 pl-12 pr-8 border-gray-300 h-screen">
      <ul className="space-y-6 text-xl font-semibold">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onSelectCategory(category)}
            className={`cursor-pointer hover:text-orange-600 transition-all whitespace-nowrap ${
              selectedCategory === category ? 'text-orange-600 font-bold' : 'text-gray-800'
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
