
import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../contexts/EcommerceContext';
import { toast } from "sonner";
import UniqueFeatures from '../components/UniqueFeatures';
import ProductFilters from '../components/buy/ProductFilters';
import MobileFilters from '../components/buy/MobileFilters';
import SearchSortBar from '../components/buy/SearchSortBar';
import ProductGrid from '../components/buy/ProductGrid';
import { useProductFilters } from '../hooks/useProductFilters';

const BuyPage = () => {
  const { products, addToCart, isLoading, errorMessage } = useEcommerce();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    conditionFilter,
    setConditionFilter,
    priceRange,
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
  } = useProductFilters(products);

  // Show connection status toast on first load
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  // Display loading state if products are being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-eco-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-eco-dark font-medium">Loading sustainable products...</p>
        </div>
      </div>
    );
  }

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
        
        {/* Unique Features Section */}
        <UniqueFeatures />
        
        {/* Search and Mobile Filters Toggle */}
        <SearchSortBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <ProductFilters 
            categories={categories}
            conditions={conditions}
            maxPrice={maxPrice}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            conditionFilter={conditionFilter}
            setConditionFilter={setConditionFilter}
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            carbonSavingsFilter={carbonSavingsFilter}
            setCarbonSavingsFilter={setCarbonSavingsFilter}
            sustainabilityFilter={sustainabilityFilter}
            setSustainabilityFilter={setSustainabilityFilter}
            resetFilters={resetFilters}
          />
          
          {/* Mobile Filters */}
          <MobileFilters 
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
            categories={categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            conditions={conditions}
            conditionFilter={conditionFilter}
            setConditionFilter={setConditionFilter}
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            maxPrice={maxPrice}
            carbonSavingsFilter={carbonSavingsFilter}
            setCarbonSavingsFilter={setCarbonSavingsFilter}
            resetFilters={resetFilters}
          />
          
          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid 
              filteredProducts={filteredProducts}
              addToCart={addToCart}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
