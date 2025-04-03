
import React from 'react';
import { Link } from 'react-router-dom';
import { useEcommerce } from '../contexts/EcommerceContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Recycle, ShoppingBag, Upload, BarChart3, Leaf } from 'lucide-react';

const Index = () => {
  const { products, addToCart } = useEcommerce();

  // Get featured products (first 3 for this demo)
  const featuredProducts = products.slice(0, 3);

  // Calculate total carbon saved across all products
  const totalCarbonSaved = products.reduce((total, product) => total + (product.carbonSaved || 0), 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="eco-gradient text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:w-3/4 lg:w-2/3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
                Sustainable Electronics Marketplace
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Buy and sell pre-loved electronics to reduce e-waste and your carbon footprint.
                Make a difference with every transaction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/buy" 
                  className="px-6 py-3 bg-white text-eco-primary rounded-md font-medium 
                            hover:bg-eco-light transition-colors shadow-lg"
                >
                  Shop Now
                </Link>
                <Link
                  to="/sell"
                  className="px-6 py-3 bg-transparent text-white border border-white rounded-md font-medium
                            hover:bg-white/10 transition-colors"
                >
                  Sell Item
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-eco-light">
              <div className="inline-flex items-center justify-center p-3 bg-eco-primary bg-opacity-20 rounded-full mb-4">
                <Recycle className="h-8 w-8 text-eco-primary" />
              </div>
              <h3 className="text-2xl font-bold text-eco-dark">{totalCarbonSaved}kg</h3>
              <p className="text-eco-accent">CO₂ Emissions Saved</p>
            </div>
            
            <div className="p-6 rounded-lg bg-eco-light">
              <div className="inline-flex items-center justify-center p-3 bg-eco-primary bg-opacity-20 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-eco-primary" />
              </div>
              <h3 className="text-2xl font-bold text-eco-dark">{products.length}</h3>
              <p className="text-eco-accent">Products Available</p>
            </div>
            
            <div className="p-6 rounded-lg bg-eco-light">
              <div className="inline-flex items-center justify-center p-3 bg-eco-primary bg-opacity-20 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-eco-primary" />
              </div>
              <h3 className="text-2xl font-bold text-eco-dark">100%</h3>
              <p className="text-eco-accent">Sustainable Packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-eco-dark">Featured Products</h2>
            <Link to="/buy" className="text-eco-primary hover:text-eco-accent flex items-center text-sm font-medium">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-eco-dark mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join our community of environmentally conscious tech enthusiasts. Buy sustainable electronics 
              or give your devices a second life by selling them.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/buy" 
                className="px-6 py-3 bg-eco-primary text-white rounded-md font-medium 
                          hover:bg-eco-accent transition-colors shadow-md flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Shop Green
              </Link>
              <Link 
                to="/sell" 
                className="px-6 py-3 bg-white text-eco-primary rounded-md font-medium border border-eco-primary
                          hover:bg-eco-light transition-colors flex items-center justify-center"
              >
                <Upload className="mr-2 h-5 w-5" /> List Your Item
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
