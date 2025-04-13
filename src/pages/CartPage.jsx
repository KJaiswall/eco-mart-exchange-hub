
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEcommerce } from '../contexts/EcommerceContext';
import { Trash2, Plus, Minus, CreditCard, AlertCircle, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useEcommerce();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckout = () => {
    // In a real app, this would handle the Stripe or Razorpay integration
    setIsCheckingOut(true);
    setCheckoutError('');
    
    // Simulate payment processing
    setTimeout(() => {
      // For demo purposes, we'll simulate success
      setIsCheckingOut(false);
      // In a real app, would redirect to confirmation page or show success message
      alert('For this demo, we are simulating a successful payment! In a real app, this would integrate with Stripe or Razorpay.');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-eco-dark mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/buy"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-eco-primary hover:bg-eco-accent"
            >
              Browse Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-8 text-center md:text-left">Your Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="px-4 py-6 sm:px-6">
                    <div className="flex items-center sm:items-start">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      
                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="flex-1">
                            <h4 className="text-sm sm:text-base font-medium">
                              <Link to={`/product/${item.id}`} className="text-eco-dark hover:text-eco-primary">
                                {item.title}
                              </Link>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500 hidden sm:block">
                              {item.condition} · {item.carbonSaved}kg CO₂ saved
                            </p>
                          </div>
                          
                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm font-medium text-eco-accent hover:text-eco-primary"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex-1 pt-4 flex items-end justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className={`p-2 ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600 hover:text-eco-primary'}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-eco-primary"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <p className="ml-4 text-sm sm:text-base font-medium text-eco-dark">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            </div>
            
            {/* Environment Impact */}
            <div className="mt-6 bg-eco-light p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-eco-dark mb-2">Your Environmental Impact</h3>
              <p className="text-sm text-gray-700 mb-4">
                By purchasing pre-owned electronics through Eco-Mart, you're helping to reduce e-waste and carbon emissions.
              </p>
              
              <div className="flex items-center text-eco-dark">
                <span className="font-medium">Total CO₂ saved:</span>
                <span className="ml-2 font-bold">
                  {cart.reduce((total, item) => total + (item.carbonSaved * item.quantity), 0)} kg
                </span>
              </div>
            </div>
          </div>
          
          {/* Order Summary and Checkout */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Subtotal</div>
                    <div className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Shipping</div>
                    <div className="text-sm font-medium text-gray-900">$5.00</div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Tax</div>
                    <div className="text-sm font-medium text-gray-900">${(cartTotal * 0.07).toFixed(2)}</div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <div className="text-base font-medium text-gray-900">Order total</div>
                      <div className="text-base font-medium text-gray-900">
                        ${(cartTotal + 5 + (cartTotal * 0.07)).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {checkoutError && (
                  <div className="mt-4 p-3 bg-red-50 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="ml-2 text-sm text-red-700">{checkoutError}</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-eco-primary hover:bg-eco-accent focus:outline-none transition-colors ${
                      isCheckingOut ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isCheckingOut ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Checkout
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-6">
                  <Link
                    to="/buy"
                    className="text-sm font-medium text-eco-primary hover:text-eco-accent flex justify-center"
                  >
                    Continue Shopping <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                {/* Payment methods info */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">We accept</h3>
                  <div className="flex space-x-3">
                    {/* Payment icons would go here in a real app */}
                    <div className="h-8 w-12 bg-gray-100 rounded-md flex items-center justify-center text-xs font-medium text-gray-600">Visa</div>
                    <div className="h-8 w-12 bg-gray-100 rounded-md flex items-center justify-center text-xs font-medium text-gray-600">MC</div>
                    <div className="h-8 w-12 bg-gray-100 rounded-md flex items-center justify-center text-xs font-medium text-gray-600">Stripe</div>
                    <div className="h-8 w-12 bg-gray-100 rounded-md flex items-center justify-center text-xs font-medium text-gray-600">PayPal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
