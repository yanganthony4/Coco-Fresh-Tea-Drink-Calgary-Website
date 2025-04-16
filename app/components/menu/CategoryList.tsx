"use client"

import { useCallback } from "react"

interface CategoryListProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const CategoryList = ({ categories, selectedCategory, onSelectCategory }: CategoryListProps): JSX.Element => {
  const handleCategoryClick = useCallback(
    (category: string): void => {
      onSelectCategory(category)
    },
    [onSelectCategory],
  )

  return (
    <div className="mb-6 lg:mb-0 w-full lg:w-64">
      <h2 className="sr-only">Categories</h2>
      
      {/* 
        For mobile: a horizontally scrollable bar.
        For desktop: fallback to vertical (or keep horizontal if you prefer).
      */}
      <ul className="
          flex 
          lg:block
          gap-2       /* spacing between items */
          lg:gap-0
          overflow-x-auto  /* enables horizontal scroll on smaller screens */
          whitespace-nowrap
      ">
        {categories.map((category) => (
          <li 
            key={category} 
            className="inline-block lg:block" /* ensures horizontal on mobile, vertical on desktop */
          >
            <button
              onClick={() => handleCategoryClick(category)}
              className={`
                inline-block px-4 py-3 rounded-lg transition-all duration-200 relative group
                ${selectedCategory === category 
                  ? "bg-orange-100 text-orange-600 font-medium" 
                  : "hover:bg-gray-50 text-gray-700"
                }
              `}
            >
              <span className="text-lg relative inline-block">
                {category}
                <span
                  className={`
                    absolute left-0 bottom-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full 
                    ${selectedCategory === category ? "w-full" : ""}
                  `}
                ></span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
