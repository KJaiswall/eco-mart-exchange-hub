
import { useState, useEffect } from 'react';

export const useProductFilters = (products) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('');
  const [carbonSavingsFilter, setCarbonSavingsFilter] = useState('');
  const [sustainabilityFilter, setSustainabilityFilter] = useState('');

  // Extract unique categories and conditions for filters
  const categories = [...new Set(products.map(p => p.category))];
  const conditions = [...new Set(products.map(p => p.condition))];
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  
  // Max price for range calculation
  const maxPrice = Math.max(...products.map(p => p.price), 1000);

  // Initialize price range on first load
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

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
    
    // Apply sustainability filter
    if (sustainabilityFilter) {
      switch(sustainabilityFilter) {
        case 'excellent':
          // Products that are refurbished and have high carbon savings
          results = results.filter(product => 
            product.condition === 'Refurbished' && product.carbonSaved >= 50
          );
          break;
        case 'good':
          // Products that are either refurbished or have decent carbon savings
          results = results.filter(product => 
            product.condition === 'Refurbished' || 
            (product.condition === 'Like New' && product.carbonSaved >= 20)
          );
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
  }, [searchTerm, categoryFilter, conditionFilter, priceFilter, products, priceRange, sortBy, carbonSavingsFilter, sustainabilityFilter, brands]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setConditionFilter('');
    setPriceFilter('');
    setPriceRange([0, maxPrice]);
    setSortBy('');
    setCarbonSavingsFilter('');
    setSustainabilityFilter('');
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    conditionFilter,
    setConditionFilter,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    carbonSavingsFilter,
    setCarbonSavingsFilter,
    sustainabilityFilter,
    setSustainabilityFilter,
    resetFilters,
    handlePriceChange,
    categories,
    conditions,
    maxPrice
  };
};
