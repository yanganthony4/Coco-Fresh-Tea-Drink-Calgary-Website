import React, { useState } from 'react';

const ProductGrid = ({ products }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <img
            src={`/menuAssets/${product.image}`}
            alt={product.name}
            className="w-[200px] h-[300px] object-contain cursor-pointer"
            onClick={() => handleToggle(index)}
          />
          <h3 className="mt-2 text-lg font-bold text-gray-800 capitalize">
            {product.name}
          </h3>
            
          {expandedIndex === index && (//click and expand drink description
            <div className="mt-4 p-5 border border-orange-300 rounded-lg w-full text-left bg-orange-100">
              <p className="text-gray-700"><strong>Description:</strong> {product.description}</p>
              <p className="text-gray-700"><strong>Calories:</strong> {product.calories || 'N/A'} kcal</p>
              <p className="text-gray-700"><strong>Price:</strong> ${product.price ? product.price.toFixed(2) : 'N/A'}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
