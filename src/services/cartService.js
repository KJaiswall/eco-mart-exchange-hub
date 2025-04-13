import { getCollection } from '../utils/dbConnect';
import { toast } from "sonner";

export async function getCartItems(userId = 'guest') {
  try {
    const collection = await getCollection('cart');
    const cursor = collection.find({ userId });
    
    let items = [];
    if (cursor.toArray) {
      items = await cursor.toArray();
    } else {
      items = await new Promise((resolve) => {
        const results = [];
        const processNext = () => {
          cursor.next().then(doc => {
            if (doc) {
              results.push(doc);
              processNext();
            } else {
              resolve(results);
            }
          }).catch(() => resolve(results));
        };
        processNext();
      });
    }
    
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
    
    let existingItem = null;
    const cursor = collection.find({ userId, productId: product.id });
    
    if (cursor.toArray) {
      const items = await cursor.toArray();
      existingItem = items[0];
    } else {
      existingItem = await cursor.next();
    }
    
    if (existingItem) {
      await collection.updateOne(
        { userId, productId: product.id },
        { $inc: { quantity: 1 } }
      );
      toast.success("Item quantity updated");
    } else {
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
    
    return await getCartItems(userId);
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
    return await getCartItems(userId);
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
    return await getCartItems(userId);
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
    return [];
  }
}
