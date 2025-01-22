import React from 'react';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <img
            src={`/menuAssets/${product.image}`}
            alt={product.name}
            className="w-[200px] h-[300px] object-contain rounded-lg"
          />
          <h3 className="mt-2 text-lg font-bold text-gray-800 capitalize">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {product.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
