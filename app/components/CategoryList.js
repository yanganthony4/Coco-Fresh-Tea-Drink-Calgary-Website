import React from 'react';
import { useTina } from 'tinacms/dist/react'; // Use useTina for GraphQL data

// Default data for initial rendering
const defaultData = {
  categories: ["Category 1", "Category 2", "Category 3"], // Example default categories
};

const CategoryList = ({ categories: initialCategories = defaultData.categories, onSelectCategory, selectedCategory }) => {
  // Use TinaCMS data
  const { data: tinaData } = useTina({
    query: `
      query GetCategories {
        categories
      }
    `,
    variables: {},
    data: { categories: initialCategories }, // Fallback data if TinaCMS data is not available
  });

  // Extract categories from tinaData
  const categories = tinaData?.categories || initialCategories;

  return (
    <div className="w-full lg:w-1/4 lg:pr-8 mb-6 lg:mb-0">
      <div className="overflow-x-auto lg:overflow-x-visible -mx-4 px-4 lg:mx-0 lg:px-0 lg:border-r lg:border-gray-300">
        <ul className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-6 min-w-max lg:min-w-0 pb-4 lg:pb-0">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onSelectCategory(category)}
              className={`cursor-pointer text-sm sm:text-base lg:text-xl font-semibold whitespace-nowrap px-4 py-2 rounded-lg transition-all
                ${
                  selectedCategory === category
                    ? "text-orange-600 font-bold bg-orange-100"
                    : "text-gray-800 hover:text-orange-600 hover:bg-orange-50"
                }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;