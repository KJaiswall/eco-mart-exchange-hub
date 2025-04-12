import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-eco-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">QuickCart</span>
            </Link>
            <p className="mt-3 text-sm opacity-90">
              Simplifying sustainable shopping with a quick and eco-friendly marketplace.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-white hover:text-eco-light transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-eco-light transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white hover:text-eco-light transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/buy" className="text-sm text-white opacity-90 hover:opacity-100">
                  Buy Products
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-sm text-white opacity-90 hover:opacity-100">
                  Sell Items
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Featured Items
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Electronics
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-white opacity-90 hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Green Principles
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white opacity-90 hover:opacity-100">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-green-600">
          <p className="text-center text-sm opacity-90">
            &copy; {new Date().getFullYear()} QuickCart. All rights reserved.
          </p>
          <p className="text-center text-xs mt-2 opacity-75">
            Helping reduce e-waste one product at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
