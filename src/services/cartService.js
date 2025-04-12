
import { getCollection } from '../utils/dbConnect';
import { toast } from "sonner";

export async function getCartItems(userId = 'guest') {
  try {
    const collection = await getCollection('cart');
    const items = await collection.find({ userId }).toArray();
    return items.map(item => ({
      ...item,
      id: item.productId // Map _id to id to match our application structure
    }));
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    toast.error("Failed to load your cart");
    return [];
  }
}

export async function addToCart(userId = 'guest', product) {
  try {
    const collection = await getCollection('cart');
    
    // Check if product already exists in cart
    const existingItem = await collection.findOne({ 
      userId, 
      productId: product.id 
    });
    
    if (existingItem) {
      // Update quantity
      await collection.updateOne(
        { userId, productId: product.id },
        { $inc: { quantity: 1 } }
      );
      toast.success("Item quantity updated");
    } else {
      // Add new item
      await collection.insertOne({
        userId,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        condition: product.condition,
        carbonSaved: product.carbonSaved,
        seller: product.seller,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
      toast.success("Item added to cart");
    }
    
    return await getCartItems(userId);
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    toast.error("Failed to add item to cart");
    throw error;
  }
}

export async function removeFromCart(userId = 'guest', productId) {
  try {
    const collection = await getCollection('cart');
    await collection.deleteOne({ userId, productId });
    toast.success("Item removed from cart");
    return await getCartItems(userId);
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    toast.error("Failed to remove item");
    throw error;
  }
}

export async function updateCartItemQuantity(userId = 'guest', productId, quantity) {
  try {
    if (quantity < 1) return await getCartItems(userId);
    
    const collection = await getCollection('cart');
    await collection.updateOne(
      { userId, productId },
      { $set: { quantity } }
    );
    toast.success("Quantity updated");
    return await getCartItems(userId);
  } catch (error) {
    console.error("Failed to update item quantity:", error);
    toast.error("Failed to update quantity");
    throw error;
  }
}

export async function clearCart(userId = 'guest') {
  try {
    const collection = await getCollection('cart');
    await collection.deleteMany({ userId });
    toast.success("Cart cleared");
    return [];
  } catch (error) {
    console.error("Failed to clear cart:", error);
    toast.error("Failed to clear cart");
    throw error;
  }
}
