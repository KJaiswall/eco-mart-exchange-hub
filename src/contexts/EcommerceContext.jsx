
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllProducts, addProduct } from '../services/productService';
import { getCartItems, addToCart as addItemToCart, removeFromCart as removeItemFromCart, updateCartItemQuantity, clearCart } from '../services/cartService';
import { toast } from "sonner";

// Initial sample products data (will be used as fallback)
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
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('guest'); // For future authentication

  // Load products from database on initial render
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const dbProducts = await getAllProducts();
        
        // If we have products in the database, use them
        if (dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        } else {
          // If the database is empty, use initial products
          console.log("No products found in database, using initial sample data");
          
          // In a real app, you might want to populate the database with initial products
          // This would typically happen during first setup
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setErrorMessage("Failed to load products. Using sample data instead.");
        toast.error("Failed to connect to database. Using sample data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from database on initial render
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await getCartItems(userId);
        setCart(cartItems);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        
        // Fallback to localStorage if database fails
        const savedCart = localStorage.getItem('eco_mart_cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };

    fetchCart();
  }, [userId]);

  // Save cart to localStorage as backup
  useEffect(() => {
    localStorage.setItem('eco_mart_cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const updatedCart = await addItemToCart(userId, product);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error in addToCart:", error);
      
      // Fallback to local state management if database fails
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        
        if (existingItem) {
          return prevCart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeItemFromCart(userId, productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      
      // Fallback to local state management
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }
  };

  // Update quantity of product in cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    try {
      const updatedCart = await updateCartItemQuantity(userId, productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error in updateQuantity:", error);
      
      // Fallback to local state management
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  // Add a new product (for sell functionality)
  const addNewProduct = async (newProduct) => {
    try {
      const productWithId = await addProduct({
        ...newProduct,
        seller: userId, // In real app, this would be the logged-in user
      });
      
      setProducts(prevProducts => [...prevProducts, productWithId]);
      return productWithId;
    } catch (error) {
      console.error("Error in addNewProduct:", error);
      
      // Fallback to local state management
      const productWithId = {
        ...newProduct,
        id: String(products.length + 1), // Simple ID generation for demo
        seller: "User" // In real app, this would be the logged-in user
      };
      
      setProducts(prevProducts => [...prevProducts, productWithId]);
      return productWithId;
    }
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Add checkout process
  const processCheckout = async () => {
    try {
      // In a real app, this would involve payment processing
      await clearCart(userId);
      setCart([]);
      toast.success("Checkout successful! Thank you for your purchase.");
      return true;
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
      return false;
    }
  };

  const value = {
    products,
    cart,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    addNewProduct,
    processCheckout,
    isLoading,
    errorMessage
  };

  return (
    <EcommerceContext.Provider value={value}>
      {children}
    </EcommerceContext.Provider>
  );
};

export default EcommerceContext;
