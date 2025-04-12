
import React from 'react';
import { Search, Sliders } from 'lucide-react';

const SearchSortBar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showMobileFilters,
  setShowMobileFilters
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="focus:ring-eco-primary focus:border-eco-primary block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
            placeholder="Search for products..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="focus:ring-eco-primary focus:border-eco-primary border border-gray-300 rounded-md py-2 pr-8 pl-3 text-sm"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="carbon">Carbon Savings</option>
          </select>
          
          <button 
            className="md:hidden flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Sliders className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSortBar;
