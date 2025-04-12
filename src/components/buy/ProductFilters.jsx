
import React from 'react';
import { Filter, Leaf } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

const ProductFilters = ({ 
  categories, 
  conditions, 
  maxPrice,
  categoryFilter, 
  setCategoryFilter, 
  conditionFilter, 
  setConditionFilter, 
  priceRange, 
  handlePriceChange,
  carbonSavingsFilter,
  setCarbonSavingsFilter,
  sustainabilityFilter,
  setSustainabilityFilter,
  resetFilters
}) => {
  return (
    <div className="hidden md:block w-64 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        
        <div className="space-y-5">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="all-categories"
                  type="radio"
                  name="category"
                  checked={categoryFilter === ''}
                  onChange={() => setCategoryFilter('')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="all-categories" className="ml-2 text-sm text-gray-700">
                  All Categories
                </label>
              </div>
              
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="radio"
                    name="category"
                    checked={categoryFilter === category}
                    onChange={() => setCategoryFilter(category)}
                    className="h-4 w-4 text-eco-primary"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Condition</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="all-conditions"
                  type="radio"
                  name="condition"
                  checked={conditionFilter === ''}
                  onChange={() => setConditionFilter('')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="all-conditions" className="ml-2 text-sm text-gray-700">
                  All Conditions
                </label>
              </div>
              
              {conditions.map(condition => (
                <div key={condition} className="flex items-center">
                  <input
                    id={`condition-${condition}`}
                    type="radio"
                    name="condition"
                    checked={conditionFilter === condition}
                    onChange={() => setConditionFilter(condition)}
                    className="h-4 w-4 text-eco-primary"
                  />
                  <label htmlFor={`condition-${condition}`} className="ml-2 text-sm text-gray-700">
                    {condition}
                  </label>
                </div>
              ))}
            </div>
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
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="all-carbon"
                  type="radio"
                  name="carbon"
                  checked={carbonSavingsFilter === ''}
                  onChange={() => setCarbonSavingsFilter('')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="all-carbon" className="ml-2 text-sm text-gray-700">
                  All
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="carbon-high"
                  type="radio"
                  name="carbon"
                  checked={carbonSavingsFilter === 'high'}
                  onChange={() => setCarbonSavingsFilter('high')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="carbon-high" className="ml-2 text-sm text-gray-700">
                  High Impact (15kg+ CO₂e)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="carbon-medium"
                  type="radio"
                  name="carbon"
                  checked={carbonSavingsFilter === 'medium'}
                  onChange={() => setCarbonSavingsFilter('medium')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="carbon-medium" className="ml-2 text-sm text-gray-700">
                  Medium Impact (5-15kg CO₂e)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="carbon-low"
                  type="radio"
                  name="carbon"
                  checked={carbonSavingsFilter === 'low'}
                  onChange={() => setCarbonSavingsFilter('low')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="carbon-low" className="ml-2 text-sm text-gray-700">
                  Low Impact (&lt;5kg CO₂e)
                </label>
              </div>
            </div>
          </div>
          
          {/* Sustainability Rating Filter */}
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Sustainability Rating</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="all-sustainability"
                  type="radio"
                  name="sustainability"
                  checked={sustainabilityFilter === ''}
                  onChange={() => setSustainabilityFilter('')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="all-sustainability" className="ml-2 text-sm text-gray-700">
                  All Ratings
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sustainability-excellent"
                  type="radio"
                  name="sustainability"
                  checked={sustainabilityFilter === 'excellent'}
                  onChange={() => setSustainabilityFilter('excellent')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="sustainability-excellent" className="ml-2 text-sm text-gray-700 flex items-center">
                  <Leaf className="h-3 w-3 text-green-500 mr-1" />
                  <Leaf className="h-3 w-3 text-green-500 mr-1" />
                  <Leaf className="h-3 w-3 text-green-500" />
                  <span className="ml-1">Excellent</span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sustainability-good"
                  type="radio"
                  name="sustainability"
                  checked={sustainabilityFilter === 'good'}
                  onChange={() => setSustainabilityFilter('good')}
                  className="h-4 w-4 text-eco-primary"
                />
                <label htmlFor="sustainability-good" className="ml-2 text-sm text-gray-700 flex items-center">
                  <Leaf className="h-3 w-3 text-green-500 mr-1" />
                  <Leaf className="h-3 w-3 text-green-500" />
                  <span className="ml-1">Good</span>
                </label>
              </div>
            </div>
          </div>
          
          <button 
            onClick={resetFilters}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
