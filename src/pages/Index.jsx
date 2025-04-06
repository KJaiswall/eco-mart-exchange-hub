
import React from 'react';
import { Link } from 'react-router-dom';
import { useEcommerce } from '../contexts/EcommerceContext';
import { ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import ProductShowcase from '../components/ProductShowcase';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const { products } = useEcommerce();
  
  // Get featured products (limited to 3)
  const featuredProducts = products.slice(0, 3);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Activist",
      text: "I've been looking for a platform like this for years! Not only am I saving money on electronics, but I'm also reducing my carbon footprint. The transparency around carbon savings makes me feel good about every purchase.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "David Chen",
      role: "Tech Enthusiast",
      text: "The quality of electronics I've purchased through Eco-Mart has been incredible. You'd never know they're pre-loved! Plus, the verification process gives me confidence that everything works perfectly.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Amira Patel",
      role: "College Student",
      text: "As a student on a budget, I love that I can get high-quality electronics at affordable prices. The fact that it's also good for the planet is a huge bonus. I've already recommended Eco-Mart to all my friends!",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    }
  ];
  
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

      {/* Product Showcase Carousel */}
      <section className="py-16 bg-gray-50">
        <ProductShowcase />
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
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-eco-primary" />
              </div>
              <h3 className="text-xl font-semibold text-eco-dark mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                Each purchase prevents electronic waste and reduces carbon emissions
                associated with manufacturing new devices.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-12 w-12 text-eco-primary" />
              </div>
              <h3 className="text-xl font-semibold text-eco-dark mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All products are thoroughly checked and verified to ensure they meet
                our quality standards before being listed.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
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

      {/* Testimonials */}
      <section className="py-16 bg-eco-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-dark mb-2">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are making a difference with every purchase
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="py-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-eco-dark">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 flex-grow">"{testimonial.text}"</p>
                    <div className="flex mt-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-4">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static ml-2" />
            </div>
          </Carousel>
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
