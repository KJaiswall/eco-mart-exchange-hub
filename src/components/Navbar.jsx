
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Leaf } from 'lucide-react';
import { useEcommerce } from '../contexts/EcommerceContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useEcommerce();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-eco-primary" />
              <span className="ml-2 text-xl font-bold text-eco-primary">Eco-Mart</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-eco-dark hover:text-eco-primary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/buy" className="text-eco-dark hover:text-eco-primary px-3 py-2 text-sm font-medium">
                Buy
              </Link>
              <Link to="/sell" className="text-eco-dark hover:text-eco-primary px-3 py-2 text-sm font-medium">
                Sell
              </Link>
              <Link to="/about" className="text-eco-dark hover:text-eco-primary px-3 py-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center">
            <div className="relative rounded-md shadow-sm mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-eco-primary focus:border-eco-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 pr-3"
                placeholder="Search products..."
              />
            </div>
            
            <Link to="/cart" className="relative p-2 rounded-full text-gray-600 hover:text-eco-primary focus:outline-none">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-eco-primary text-white text-xs font-medium text-center leading-5">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-eco-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-eco-dark hover:bg-eco-light" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/buy" className="block px-3 py-2 text-base font-medium text-eco-dark hover:bg-eco-light" onClick={toggleMenu}>
              Buy
            </Link>
            <Link to="/sell" className="block px-3 py-2 text-base font-medium text-eco-dark hover:bg-eco-light" onClick={toggleMenu}>
              Sell
            </Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-eco-dark hover:bg-eco-light" onClick={toggleMenu}>
              About
            </Link>
            
            <div className="relative rounded-md shadow-sm mx-3 mt-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-eco-primary focus:border-eco-primary block w-full pl-10 text-sm border-gray-300 rounded-md py-2"
                placeholder="Search products..."
              />
            </div>
            
            <Link to="/cart" className="flex items-center px-3 py-2 text-base font-medium text-eco-dark hover:bg-eco-light" onClick={toggleMenu}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="ml-2 h-5 w-5 rounded-full bg-eco-primary text-white text-xs font-medium text-center leading-5">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
