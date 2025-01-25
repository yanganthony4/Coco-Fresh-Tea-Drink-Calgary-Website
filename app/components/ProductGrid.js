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
          <div 
            className="flex flex-col items-center text-center" 
            onClick={() => handleToggle(index)}
          >
            <img
              src={`/menuAssets/${product.image}`}
              alt={product.name}
              className="w-[210px] h-[320px] object-contain cursor-pointer rounded-lg "
            />
            <h3 className="mt-2 text-lg font-bold text-gray-800 capitalize">
              {product.name}
            </h3>
          </div>

          {/* Expanded description box positioned below the correct row */}
          {(index + 1) % 3 === 0 && expandedIndex !== null && (
            <div className="col-span-3 flex justify-center">
              {expandedIndex >= index - 2 && expandedIndex <= index && (
               <div className="mt-2 p-5 w-3/4 border border-orange-300 rounded-lg bg-orange-100 shadow-md">
               <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                 {products[expandedIndex].name}
               </h3>
               <p className="text-gray-700"><strong>Description:</strong> {products[expandedIndex].description}</p>
               <p className="text-gray-700"><strong>Calories:</strong> {products[expandedIndex].calories || 'N/A'} kcal</p>
               <p className="text-gray-700"><strong>Price:</strong> ${products[expandedIndex].price ? products[expandedIndex].price.toFixed(2) : 'N/A'}</p>
             </div>
             
              )}
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Handle last row separately */}
      {expandedIndex !== null && products.length % 3 !== 0 && expandedIndex >= products.length - (products.length % 3) && (
        <div className="col-span-3 flex justify-center">
          <div className="mt-2 p-5 w-3/4 border border-orange-300 rounded-lg bg-orange-100 shadow-md">
            <p classname="text-grey-900"><strong>{products.name}</strong></p>
            <p className="text-gray-700"><strong>Description:</strong> {products[expandedIndex].description}</p>
            <p className="text-gray-700"><strong>Calories:</strong> {products[expandedIndex].calories || 'N/A'} kcal</p>
            <p className="text-gray-700"><strong>Price:</strong> ${products[expandedIndex].price ? products[expandedIndex].price.toFixed(2) : 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
