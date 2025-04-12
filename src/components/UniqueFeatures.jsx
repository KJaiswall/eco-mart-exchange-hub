
import React from 'react';
import { Sparkles, Leaf, Recycle, Send, PieChart, Truck, Award, BarChart3 } from 'lucide-react';

const UniqueFeatures = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-eco-dark mb-6 text-center">What Makes QuickCart Different</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Feature 1: Carbon Footprint Tracking */}
        <div className="bg-eco-light rounded-lg p-5 transition-transform hover:scale-105">
          <div className="flex items-center mb-3">
            <PieChart className="h-6 w-6 text-eco-primary mr-2" />
            <h3 className="font-semibold text-eco-dark">Carbon Tracking</h3>
          </div>
          <p className="text-sm text-gray-600">
            Real-time tracking of your environmental impact with every purchase.
          </p>
        </div>
        
        {/* Feature 2: Verified Eco Credentials */}
        <div className="bg-eco-light rounded-lg p-5 transition-transform hover:scale-105">
          <div className="flex items-center mb-3">
            <Award className="h-6 w-6 text-eco-primary mr-2" />
            <h3 className="font-semibold text-eco-dark">Verified Sellers</h3>
          </div>
          <p className="text-sm text-gray-600">
            All our sellers are verified for authenticity and sustainability practices.
          </p>
        </div>
        
        {/* Feature 3: Extended Warranties */}
        <div className="bg-eco-light rounded-lg p-5 transition-transform hover:scale-105">
          <div className="flex items-center mb-3">
            <Sparkles className="h-6 w-6 text-eco-primary mr-2" />
            <h3 className="font-semibold text-eco-dark">Extended Warranty</h3>
          </div>
          <p className="text-sm text-gray-600">
            Up to 2-year warranty on refurbished electronics - better than most retailers.
          </p>
        </div>
        
        {/* Feature 4: Carbon-Neutral Shipping */}
        <div className="bg-eco-light rounded-lg p-5 transition-transform hover:scale-105">
          <div className="flex items-center mb-3">
            <Truck className="h-6 w-6 text-eco-primary mr-2" />
            <h3 className="font-semibold text-eco-dark">Eco Delivery</h3>
          </div>
          <p className="text-sm text-gray-600">
            Carbon-neutral shipping on all orders with eco-friendly packaging.
          </p>
        </div>
      </div>
      
      {/* Impact Stats */}
      <div className="mt-8 bg-gradient-to-r from-eco-primary to-eco-accent rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4 text-center">Our Community Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <BarChart3 className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">2.5K+</div>
            <div className="text-sm opacity-90">Products Reused</div>
          </div>
          <div>
            <Leaf className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">120+</div>
            <div className="text-sm opacity-90">Tons CO₂ Saved</div>
          </div>
          <div>
            <Recycle className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">15K+</div>
            <div className="text-sm opacity-90">Kg E-Waste Diverted</div>
          </div>
          <div>
            <Send className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-sm opacity-90">Seller Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueFeatures;
