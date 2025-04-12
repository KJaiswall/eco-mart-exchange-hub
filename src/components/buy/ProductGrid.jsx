
import React from 'react';
import ProductCard from '../ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const ProductGrid = ({ 
  filteredProducts, 
  addToCart,
  resetFilters 
}) => {
  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <SlidersHorizontal className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-xl text-gray-600 mb-4">No products found matching your criteria.</p>
        <button 
          onClick={resetFilters}
          className="px-4 py-2 bg-eco-primary text-white rounded-md hover:bg-eco-accent"
        >
          Clear Filters
        </button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
