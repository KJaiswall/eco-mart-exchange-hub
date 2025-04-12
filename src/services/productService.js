
import { getCollection } from '../utils/dbConnect';
import { toast } from "sonner";

export async function getAllProducts() {
  try {
    const collection = await getCollection('products');
    const products = await collection.find({}).toArray();
    
    return products.map(product => ({
      ...product,
      id: product._id.toString()
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    toast.error("Failed to load products");
    return [];
  }
}

export async function addProduct(productData) {
  try {
    const collection = await getCollection('products');
    
    const newProduct = {
      ...productData,
      createdAt: new Date(),
      listedDate: new Date()
    };
    
    const result = await collection.insertOne(newProduct);
    
    if (result.insertedId) {
      toast.success("Product listed successfully!");
      return {
        ...newProduct,
        id: result.insertedId.toString()
      };
    } else {
      throw new Error("Failed to add product");
    }
  } catch (error) {
    console.error("Failed to add product:", error);
    toast.error("Failed to list product");
    throw error;
  }
}

export async function getProductById(productId) {
  try {
    const collection = await getCollection('products');
    const product = await collection.findOne({ _id: productId });
    
    if (!product) {
      return null;
    }
    
    return {
      ...product,
      id: product._id.toString()
    };
  } catch (error) {
    console.error(`Failed to fetch product ${productId}:`, error);
    toast.error("Failed to load product details");
    return null;
  }
}

export async function searchProducts(query = {}) {
  try {
    const collection = await getCollection('products');
    let filter = {};
    
    // Build the filter based on the query params
    if (query.searchTerm) {
      filter.$or = [
        { title: { $regex: query.searchTerm, $options: 'i' } },
        { description: { $regex: query.searchTerm, $options: 'i' } }
      ];
    }
    
    if (query.category) {
      filter.category = query.category;
    }
    
    if (query.condition) {
      filter.condition = query.condition;
    }
    
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.price = {};
      if (query.minPrice !== undefined) filter.price.$gte = parseFloat(query.minPrice);
      if (query.maxPrice !== undefined) filter.price.$lte = parseFloat(query.maxPrice);
    }
    
    const products = await collection.find(filter).toArray();
    
    return products.map(product => ({
      ...product,
      id: product._id.toString()
    }));
  } catch (error) {
    console.error("Failed to search products:", error);
    toast.error("Failed to load search results");
    return [];
  }
}
