"use client"

import Image from "next/image"
import { useCallback } from "react"
import type { JSX } from "react"

interface Product {
  image: string
  name: string
  description: string
  category: string | string[]
  calories?: string
  price?: string
}

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps): JSX.Element => {
  const renderProductCard = useCallback((product: Product): JSX.Element => {
    return (
      <div
        key={product.name}
        className="group bg-white overflow-hidden hover:transition-all duration-300 "
      >
        <div className="flex flex-col w-full h-full">
          <div className="relative w-full aspect-[1/1] overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={`${product.name} - CoCo Bubble Tea`}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* On mobile devices use ml-4 to shift the text a little to the right,
            while using ml-10 on medium screens and larger. */}
          <div className="w-full pt-4 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              {product.calories && <span className="text-xs text-gray-500">{product.calories} cal</span>}
              {product.price && <span className="text-orange-600 font-medium">${product.price}</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }, [])

  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{products.map(renderProductCard)}</div>
}

export default ProductGrid
