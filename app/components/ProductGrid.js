"use client"

import React, { useState } from "react"
import LazyImage from "../LazyImage"

const ProductGrid = ({ products }) => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
      {products.map((product, index) => (
        <React.Fragment key={index}>
          {/* Grid Item */}
          <div className="flex flex-col items-center text-center" onClick={() => handleToggle(index)}>
            <LazyImage
              src={`/menuAssets/${product.image}`}
              alt={product.name}
              className="w-full h-48 sm:h-64 lg:h-80 object-contain cursor-pointer rounded-lg"
            />
            <h3 className="mt-2 text-base sm:text-lg font-bold text-gray-800 capitalize">{product.name}</h3>
          </div>

          {/* Expanded Description Box */}
          {expandedIndex === index && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 transition-all duration-300 ease-in-out mt-4">
              <hr className="w-full" />
              <div className="mt-4 p-4 sm:p-5 flex flex-col sm:flex-row max-w-5xl mx-auto rounded-lg bg-white">
                {/* Product Image */}
                <LazyImage
                  src={`/menuAssets/${product.image}`}
                  alt={product.name}
                  className="w-full sm:w-1/3 h-48 sm:h-64 object-contain rounded-lg mb-4 sm:mb-0 sm:mr-6"
                />
                {/* Product Details */}
                <div className="sm:border-l sm:pl-6 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-left mb-4">{product.name}</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {product.description}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Calories:</strong> {product.calories || "N/A"} kcal
                  </p>
                  <p className="text-gray-700">
                    <strong>Price:</strong> ${product.price ? product.price.toFixed(2) : "N/A"}
                  </p>
                </div>
              </div>
              <hr className="w-full mt-4" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ProductGrid

