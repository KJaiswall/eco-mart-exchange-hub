
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '../contexts/EcommerceContext';
import { Upload, Check, AlertCircle, Info, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SellPage = () => {
  const { addNewProduct } = useEcommerce();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    image: null,
    carbonSaved: '', // Estimated carbon savings
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'carbonSaved' ? 
        (value === '' ? '' : parseFloat(value)) : 
        value
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
      setFormData(prev => ({
        ...prev,
        image: event.target.result
      }));
      setError(''); // Clear any previous errors
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.description || !formData.price || 
        !formData.category || !formData.condition || !formData.image) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      // In a real app, we would upload the image to a storage service
      // and get back a URL. For this demo, we'll just use the base64 data directly.
      
      // Add the new product (would typically involve an API call)
      const newProduct = await addNewProduct({
        ...formData,
        carbonSaved: formData.carbonSaved || 10, // Default value if not provided
      });
      
      setFormSubmitted(true);
      toast.success("Product listing created successfully!");
      
      // In a real app, we would redirect to the product page
      setTimeout(() => {
        navigate('/buy');
      }, 3000);
    } catch (err) {
      setError('Failed to add product. Please try again.');
      toast.error("Failed to add product. Please try again.");
    }
  };
  
  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Listing submitted successfully!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your product has been added to our marketplace. Redirecting you to the buy page...
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => navigate('/buy')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-eco-primary hover:bg-eco-accent focus:outline-none"
              >
                View All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-eco-dark mb-2">Sell Your Electronics</h1>
          <p className="text-gray-600">
            Give your electronics a second life and help reduce e-waste. Fill out the form below to list your item.
          </p>
        </div>
        
        {/* Info Card */}
        <div className="bg-eco-light border-l-4 border-eco-primary p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-eco-primary" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-eco-dark">
                By selling your unused electronics, you're helping to reduce e-waste and carbon emissions. 
                Each device reused can save up to 80% of its lifetime energy consumption and raw materials.
              </p>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Sell Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 focus:ring-eco-primary focus:border-eco-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 focus:ring-eco-primary focus:border-eco-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="focus:ring-eco-primary focus:border-eco-primary block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 focus:ring-eco-primary focus:border-eco-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Phones">Phones</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Audio">Audio</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="mt-1 focus:ring-eco-primary focus:border-eco-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  >
                    <option value="" disabled>Select condition</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Refurbished">Refurbished</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="carbonSaved" className="block text-sm font-medium text-gray-700">
                    Estimated Carbon Saved (kg)
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="carbonSaved"
                      id="carbonSaved"
                      min="0"
                      value={formData.carbonSaved}
                      onChange={handleChange}
                      className="focus:ring-eco-primary focus:border-eco-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., 10"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank for automatic estimation
                  </p>
                </div>
              </div>
              
              {/* Image Upload Section */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Product Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex flex-col items-center space-y-4">
                  {previewImage ? (
                    <div className="relative w-full max-w-md aspect-video">
                      <img 
                        src={previewImage} 
                        alt="Product preview" 
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-eco-primary transition-colors"
                      onClick={() => document.getElementById('image').click()}
                    >
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                  
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image').click()}
                    className="w-full md:w-auto"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-eco-primary hover:bg-eco-accent focus:outline-none transition-colors"
              >
                <Upload className="mr-2 h-5 w-5" />
                List for Sale
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
