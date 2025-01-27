import React, { useState } from 'react';

const ProductGrid = ({ products }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-3 gap-x-12 gap-y-10 p-8">
      {products.map((product, index) => (
        <React.Fragment key={index}>
          {/* Grid Item */}
          <div
            className="flex flex-col items-center text-center"
            onClick={() => handleToggle(index)}
          >
            <img
              src={`/menuAssets/${product.image}`}
              alt={product.name}
              className="w-[210px] h-[320px] object-contain cursor-pointer rounded-lg"
            />
            <h3 className="mt-2 text-lg font-bold text-gray-800 capitalize">
              {product.name}
            </h3>
          </div>

          {/* Expanded Description Box */}
          {expandedIndex !== null &&
            Math.floor(expandedIndex / 3) === Math.floor(index / 3) &&
            ((index % 3 === 2) || (index === products.length - 1)) && ( // Include last item in an incomplete row
              <div
                className="col-span-3 transition-all duration-300 ease-in-out"
                style={{ gridColumn: '1 / -1' }}
              >
                <hr className="w-full" />
                <div className="mt-4 p-5 flex max-w-5xl mx-auto rounded-lg bg-white">
                  {/* Product Image on the Left */}
                  <img
                    src={`/menuAssets/${products[expandedIndex].image}`}
                    alt={products[expandedIndex].name}
                    className="w-[300px] h-[400px] object-contain rounded-lg mr-6"
                  />
                  {/* Product Details on the Right */}
                  <div className="border-l p-10">
                    <h3 className="text-2xl font-bold text-gray-900 text-left mb-4">
                      {products[expandedIndex].name}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Description:</strong> {products[expandedIndex].description}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Calories:</strong> {products[expandedIndex].calories || 'N/A'} kcal
                    </p>
                    <p className="text-gray-700">
                      <strong>Price:</strong> ${products[expandedIndex].price ? products[expandedIndex].price.toFixed(2) : 'N/A'}
                    </p>
                  </div>
                </div>
                <hr className="w-full" />
              </div>
            )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductGrid;
