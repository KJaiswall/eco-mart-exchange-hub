
import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../contexts/EcommerceContext';
import ProductCard from '../components/ProductCard';
import { Filter, Search, ChevronDown, Sliders, SlidersHorizontal } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

const BuyPage = () => {
  const { products, addToCart } = useEcommerce();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('');
  const [carbonSavingsFilter, setCarbonSavingsFilter] = useState('');

  // Extract unique categories and conditions for filters
  const categories = [...new Set(products.map(p => p.category))];
  const conditions = [...new Set(products.map(p => p.condition))];
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  
  // Max price for range calculation
  const maxPrice = Math.max(...products.map(p => p.price), 1000);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let results = products;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      results = results.filter(product => product.category === categoryFilter);
    }
    
    // Apply condition filter
    if (conditionFilter) {
      results = results.filter(product => product.condition === conditionFilter);
    }
    
    // Apply brand filter
    if (brands.length && sortBy === 'brand') {
      results = results.filter(product => product.brand === sortBy);
    }
    
    // Apply price range filter
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply carbon savings filter
    if (carbonSavingsFilter) {
      switch(carbonSavingsFilter) {
        case 'low':
          results = results.filter(product => product.carbonSaved < 5);
          break;
        case 'medium':
          results = results.filter(product => product.carbonSaved >= 5 && product.carbonSaved < 15);
          break;
        case 'high':
          results = results.filter(product => product.carbonSaved >= 15);
          break;
        default:
          break;
      }
    }
    
    // Apply sorting
    if (sortBy) {
      switch(sortBy) {
        case 'price-low':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          results.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
          break;
        case 'carbon':
          results.sort((a, b) => b.carbonSaved - a.carbonSaved);
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(results);
  }, [searchTerm, categoryFilter, conditionFilter, priceFilter, products, priceRange, sortBy, carbonSavingsFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setConditionFilter('');
    setPriceFilter('');
    setPriceRange([0, maxPrice]);
    setSortBy('');
    setCarbonSavingsFilter('');
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-eco-dark mb-4">Sustainable Electronics</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our selection of eco-friendly and pre-loved electronics. 
            Each purchase contributes to reducing e-waste and carbon emissions.
          </p>
        </div>
        
        {/* Search and Mobile Filters Toggle */}
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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
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
                
                <button 
                  onClick={resetFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showMobileFilters && (
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
                  {/* Repeat the desktop filter options for mobile */}
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
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
