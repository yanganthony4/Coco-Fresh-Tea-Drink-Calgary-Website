import React from 'react';

const CategoryList = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="w-1/4 pl-8 pr-6 ml-6 border-r border-gray-300 h-screen">
      <ul className="space-y-4 text-lg font-semibold">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onSelectCategory(category)}
            className={`cursor-pointer hover:text-orange-600 ${
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
