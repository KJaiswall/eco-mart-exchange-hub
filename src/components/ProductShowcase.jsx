
import React from 'react';
import { useEcommerce } from '../contexts/EcommerceContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductShowcase = () => {
  const { products } = useEcommerce();
  
  // Get featured products (limited to 6)
  const featuredProducts = products.slice(0, 6);
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-eco-dark">Featured Products</h2>
        <p className="text-gray-600">Browse our eco-friendly electronics</p>
      </div>
      
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {featuredProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="bg-white rounded-lg overflow-hidden shadow-md h-full p-4 m-1 flex flex-col eco-card-hover">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {product.condition}
                  </div>
                </div>
                <div className="p-2 flex-grow">
                  <h3 className="text-lg font-semibold mb-1 text-eco-dark">{product.title}</h3>
                  <p className="text-eco-primary font-bold">${product.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center text-gray-600 text-sm">
                    <span className="text-eco-primary">Saves {product.carbonSaved}kg CO₂e</span>
                  </div>
                </div>
                <Link 
                  to={`/buy`} 
                  className="mt-3 block text-center bg-eco-light text-eco-primary py-2 rounded font-medium
                          hover:bg-eco-primary hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center mt-4">
          <CarouselPrevious className="relative static mr-2" />
          <CarouselNext className="relative static ml-2" />
        </div>
      </Carousel>
      
      <div className="text-center mt-6">
        <Link 
          to="/buy"
          className="inline-flex items-center text-eco-primary hover:text-eco-primary/80 font-medium"
        >
          View All Products <ArrowRight className="ml-1 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default ProductShowcase;
