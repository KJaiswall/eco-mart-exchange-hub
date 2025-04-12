
import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../contexts/EcommerceContext';
import { ArrowRight, ArrowLeft, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";

const ProductShowcase = () => {
  const { products } = useEcommerce();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get featured products (limited to 6)
  const featuredProducts = products.slice(0, 6);

  // Featured electronics banner images
  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
      title: "Cutting-edge Tech, Reduced Footprint",
      description: "Our refurbished laptops perform like new while saving tons of carbon emissions."
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      title: "Sustainable Electronics Revolution",
      description: "Join the movement to reduce e-waste through our certified pre-loved devices."
    },
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80",
      title: "Premium Tech, Earth-Friendly Prices",
      description: "Experience quality computing while making a positive environmental impact."
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      title: "One Device at a Time",
      description: "Every purchase helps divert electronics from landfills and reduces carbon footprint."
    }
  ];

  useEffect(() => {
    // Auto-advance the slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleSlideChange = (value) => {
    setCurrentSlide(value[0]);
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Image Slider */}
      <div className="relative overflow-hidden rounded-xl mb-16 max-w-6xl mx-auto h-[400px] md:h-[500px]">
        {bannerImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <img 
              src={image.url} 
              alt={`Electronics banner ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center z-20 p-8 md:p-16 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">{image.title}</h2>
              <p className="text-lg text-white/90 mb-6 animate-fade-in">{image.description}</p>
              <Link 
                to="/buy" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-eco-primary text-white 
                          font-medium hover:bg-eco-primary/90 transition-all w-fit animate-fade-in"
              >
                Shop Now <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-6 left-0 right-0 z-30 px-8 md:px-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentSlide(prev => prev === 0 ? bannerImages.length - 1 : prev - 1)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="flex-grow">
              <Slider 
                value={[currentSlide]} 
                max={bannerImages.length - 1} 
                step={1} 
                onValueChange={handleSlideChange}
                className="py-1"
              />
            </div>
            
            <button 
              onClick={() => setCurrentSlide(prev => prev === bannerImages.length - 1 ? 0 : prev + 1)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
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
