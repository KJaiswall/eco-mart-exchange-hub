
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingCart, Recycle, Award, Cpu, Shield } from 'lucide-react';
import SustainabilityScore from './SustainabilityScore';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, title, price, image, condition, carbonSaved, seller } = product;

  // Determine badge for seller verification
  const getSellerBadge = () => {
    // This would typically be based on seller ratings/verification in a real application
    const verifiedSellers = ['EcoTech', 'GreenHome', 'RenewTech', 'SolarPower'];
    const isVerified = verifiedSellers.includes(seller);
    
    if (isVerified) {
      return (
        <div className="absolute top-2 left-2 bg-eco-primary bg-opacity-90 px-2 py-1 rounded-full 
                      text-white text-xs font-medium flex items-center z-10">
          <Award className="w-3 h-3 mr-1" />
          Verified Seller
        </div>
      );
    }
    return null;
  };

  // Determine if product has warranty
  const hasWarranty = condition === 'Refurbished' || condition === 'New';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md eco-card-hover border border-gray-100 relative">
      {getSellerBadge()}
      
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {condition && (
          <div className={`absolute top-0 right-0 m-2 px-2 py-1 rounded-full text-xs font-medium
            ${condition === 'New' ? 'bg-blue-100 text-blue-800' : 
              condition === 'Like New' ? 'bg-green-100 text-green-800' : 
              condition === 'Good' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-orange-100 text-orange-800'}`}
          >
            {condition}
          </div>
        )}
        {carbonSaved && (
          <div className="absolute bottom-0 left-0 m-2 px-2 py-1 bg-eco-primary bg-opacity-90 
                        rounded-full text-xs font-medium text-white flex items-center">
            <Recycle className="w-3 h-3 mr-1" />
            {carbonSaved}kg CO₂ saved
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        
        <SustainabilityScore product={product} />
        
        <div className="flex items-baseline mt-2 mb-2">
          <span className="text-eco-primary text-xl font-semibold">${price.toFixed(2)}</span>
          
          {hasWarranty && (
            <span className="ml-2 text-xs text-gray-600 flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              {condition === 'Refurbished' ? '1yr warranty' : '2yr warranty'}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Link 
            to={`/product/${id}`}
            className="text-sm text-eco-dark hover:text-eco-primary font-medium"
          >
            View Details
          </Link>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs 
                     font-medium rounded-md text-white bg-eco-primary hover:bg-eco-accent transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
