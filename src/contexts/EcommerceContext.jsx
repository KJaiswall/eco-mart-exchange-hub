
import React, { createContext, useState, useEffect, useContext } from 'react';

// Initial sample products data
const initialProducts = [
  {
    id: 1,
    title: "Refurbished Laptop",
    description: "High-performance laptop with eco-friendly refurbishment. 16GB RAM, 512GB SSD.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    category: "Laptops",
    condition: "Refurbished",
    carbonSaved: 120,
    seller: "EcoTech"
  },
  {
    id: 2,
    title: "Wireless Noise Cancelling Headphones",
    description: "High-quality sound with active noise cancellation in an environmentally conscious design.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Audio",
    condition: "Like New",
    carbonSaved: 15,
    seller: "SoundGreen"
  },
  {
    id: 3,
    title: "Smart Thermostat",
    description: "Energy-efficient thermostat that helps reduce your carbon footprint and save on energy bills.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1567789884742-f3dadf944118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Smart Home",
    condition: "New",
    carbonSaved: 45,
    seller: "GreenHome"
  },
  {
    id: 4,
    title: "Solar Power Bank",
    description: "10,000 mAh power bank with solar charging capabilities for sustainable on-the-go power.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    category: "Accessories",
    condition: "New",
    carbonSaved: 10,
    seller: "SolarPower"
  },
  {
    id: 5,
    title: "Refurbished Smartphone",
    description: "Professionally refurbished smartphone with 12-month warranty and eco-friendly packaging.",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    category: "Phones",
    condition: "Refurbished",
    carbonSaved: 80,
    seller: "RenewTech"
  },
  {
    id: 6,
    title: "LED Smart Lighting",
    description: "Energy-efficient LED smart bulbs that reduce energy consumption while providing customizable lighting.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    category: "Smart Home",
    condition: "New",
    carbonSaved: 25,
    seller: "BrightEco"
  }
];

const EcommerceContext = createContext();

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};

export const EcommerceProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const [products, setProducts] = useState(() => {
    // Here we would typically fetch from an API or database
    return initialProducts;
  });
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('eco_mart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eco_mart_cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product is already in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // If it exists, increase quantity
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If not, add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update quantity of product in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear entire cart (for after successful order)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('eco_mart_cart');
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Add a new product (for sell functionality)
  const addNewProduct = (newProduct) => {
    // In a real app, this would involve API calls
    const productWithId = {
      ...newProduct,
      id: products.length + 1, // Simple ID generation for demo
      seller: "User" // In real app, this would be the logged-in user
    };
    
    setProducts(prevProducts => [...prevProducts, productWithId]);
    return productWithId;
  };

  const value = {
    products,
    cart,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addNewProduct
  };

  return (
    <EcommerceContext.Provider value={value}>
      {children}
    </EcommerceContext.Provider>
  );
};

export default EcommerceContext;
