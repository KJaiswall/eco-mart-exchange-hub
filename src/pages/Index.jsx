
import React from 'react';
import { Link } from 'react-router-dom';
import { useEcommerce } from '../contexts/EcommerceContext';
import { ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

const Index = () => {
  const { products } = useEcommerce();
  
  // Get featured products (limited to 3)
  const featuredProducts = products.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-eco-primary to-eco-primary/50 opacity-90"></div>
        <div className="relative eco-gradient py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Buy & Sell Electronics Sustainably
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-10 animate-fade-in">
              Reduce e-waste and your carbon footprint with our marketplace for pre-loved electronics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
              <Link 
                to="/buy" 
                className="px-6 py-3 bg-white text-eco-primary rounded-md font-medium 
                          hover:bg-eco-light transition-colors flex items-center justify-center"
              >
                Browse Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/sell" 
                className="px-6 py-3 bg-transparent text-white border border-white rounded-md font-medium
                          hover:bg-white/10 transition-colors"
              >
                Sell Your Device
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-eco-dark mb-2">Featured Products</h2>
            <p className="text-gray-600">Quality electronics that are better for the planet</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md eco-card-hover">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {product.condition}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-eco-dark">{product.title}</h3>
                  <p className="text-eco-primary font-bold">${product.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center text-gray-600 text-sm">
                    <Leaf className="h-4 w-4 text-eco-primary mr-1" />
                    <span>Saves {product.carbonSaved}kg CO₂e</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Link 
                    to="/buy" 
                    className="w-full block text-center bg-eco-light text-eco-primary py-2 rounded font-medium
                             hover:bg-eco-primary hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/buy"
              className="inline-flex items-center text-eco-primary hover:text-eco-primary/80 font-medium"
            >
              View All Products <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-dark mb-2">Why Choose Eco-Mart?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just another marketplace. We're on a mission to reduce e-waste
              and make sustainable choices accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-eco-primary" />
              </div>
              <h3 className="text-xl font-semibold text-eco-dark mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                Each purchase prevents electronic waste and reduces carbon emissions
                associated with manufacturing new devices.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-12 w-12 text-eco-primary" />
              </div>
              <h3 className="text-xl font-semibold text-eco-dark mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All products are thoroughly checked and verified to ensure they meet
                our quality standards before being listed.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <svg 
                  className="h-12 w-12 text-eco-primary" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-eco-dark mb-2">Carbon Transparency</h3>
              <p className="text-gray-600">
                We display the carbon savings for each product so you can see the
                positive environmental impact of your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-eco-dark mb-6">Ready to Make a Difference?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/about" 
              className="px-6 py-3 bg-transparent border border-eco-primary text-eco-primary rounded-md font-medium
                       hover:bg-eco-primary hover:text-white transition-colors"
            >
              Learn More About Us
            </Link>
            <Link 
              to="/buy" 
              className="px-6 py-3 bg-eco-primary text-white rounded-md font-medium
                       hover:bg-eco-primary/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
