
import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../contexts/EcommerceContext';
import ProductCard from '../components/ProductCard';
import { Filter, Search, ChevronDown } from 'lucide-react';

const BuyPage = () => {
  const { products, addToCart } = useEcommerce();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories and conditions for filters
  const categories = [...new Set(products.map(p => p.category))];
  const conditions = [...new Set(products.map(p => p.condition))];

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
    
    // Apply price filter
    if (priceFilter) {
      switch(priceFilter) {
        case 'low':
          results = results.filter(product => product.price < 50);
          break;
        case 'mid':
          results = results.filter(product => product.price >= 50 && product.price < 200);
          break;
        case 'high':
          results = results.filter(product => product.price >= 200);
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(results);
  }, [searchTerm, categoryFilter, conditionFilter, priceFilter, products]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setConditionFilter('');
    setPriceFilter('');
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
        
        {/* Search and Filters */}
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
            
            <button 
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-md shadow-sm border border-gray-100 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="category"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="focus:ring-eco-primary focus:border-eco-primary block w-full border-gray-300 rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select
                    id="condition"
                    value={conditionFilter}
                    onChange={e => setConditionFilter(e.target.value)}
                    className="focus:ring-eco-primary focus:border-eco-primary block w-full border-gray-300 rounded-md"
                  >
                    <option value="">All Conditions</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <select
                    id="price"
                    value={priceFilter}
                    onChange={e => setPriceFilter(e.target.value)}
                    className="focus:ring-eco-primary focus:border-eco-primary block w-full border-gray-300 rounded-md"
                  >
                    <option value="">All Prices</option>
                    <option value="low">Under $50</option>
                    <option value="mid">$50 - $200</option>
                    <option value="high">$200+</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-eco-primary hover:text-eco-accent"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Products Grid */}
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
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            <button 
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-eco-primary text-white rounded-md hover:bg-eco-accent"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
