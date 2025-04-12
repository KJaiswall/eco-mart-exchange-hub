
import React from 'react';
import { Slider } from "@/components/ui/slider";

const MobileFilters = ({
  showMobileFilters,
  setShowMobileFilters,
  categories,
  categoryFilter,
  setCategoryFilter,
  conditions,
  conditionFilter,
  setConditionFilter,
  priceRange,
  handlePriceChange,
  maxPrice,
  carbonSavingsFilter,
  setCarbonSavingsFilter,
  resetFilters
}) => {
  if (!showMobileFilters) return null;
  
  return (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button 
            onClick={() => setShowMobileFilters(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Categories</h4>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Condition</h4>
            <select
              value={conditionFilter}
              onChange={e => setConditionFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">All Conditions</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Price Range</h4>
            <div className="px-2">
              <Slider
                defaultValue={[0, maxPrice]}
                value={priceRange}
                max={maxPrice}
                step={10}
                onValueChange={handlePriceChange}
                className="mt-6 mb-4"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Carbon Savings</h4>
            <select
              value={carbonSavingsFilter}
              onChange={e => setCarbonSavingsFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">All</option>
              <option value="high">High Impact (15kg+ CO₂e)</option>
              <option value="medium">Medium Impact (5-15kg CO₂e)</option>
              <option value="low">Low Impact (&lt;5kg CO₂e)</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => {
                resetFilters();
                setShowMobileFilters(false);
              }}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium"
            >
              Reset
            </button>
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="flex-1 px-4 py-2 bg-eco-primary text-white rounded font-medium"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
