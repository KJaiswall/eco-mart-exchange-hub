
// Mock database connection utility for browser environment
// This simulates MongoDB functionality using localStorage

// Collections stored in localStorage
const DB_PREFIX = 'eco_mart_db_';

class MockMongoCollection {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.storageKey = `${DB_PREFIX}${collectionName}`;
    
    // Initialize collection if it doesn't exist
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }
  
  // Get all items from collection
  async find(query = {}) {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    
    // Simple query filtering
    if (Object.keys(query).length === 0) {
      return {
        toArray: async () => items
      };
    }
    
    // Basic filtering (this is a simplified version of MongoDB querying)
    const filteredItems = items.filter(item => {
      for (const key in query) {
        if (key === '$or') {
          // Handle $or operator
          const orConditions = query[key];
          const orResult = orConditions.some(condition => {
            for (const orKey in condition) {
              const orValue = condition[orKey];
              if (typeof orValue === 'object' && orValue.$regex) {
                // Simple regex case-insensitive search
                const regex = new RegExp(orValue.$regex, orValue.$options || '');
                return regex.test(item[orKey]);
              }
              return item[orKey] === orValue;
            }
          });
          if (!orResult) return false;
        } else {
          // Handle direct equality or operators
          const queryValue = query[key];
          
          // Handle operators like $gte, $lte
          if (typeof queryValue === 'object') {
            if (queryValue.$gte !== undefined && !(item[key] >= queryValue.$gte)) return false;
            if (queryValue.$lte !== undefined && !(item[key] <= queryValue.$lte)) return false;
          } else if (item[key] !== queryValue) {
            return false;
          }
        }
      }
      return true;
    });
    
    return {
      toArray: async () => filteredItems
    };
  }
  
  // Find a single item
  async findOne(query = {}) {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return items.find(item => {
      // Simple implementation for _id matching
      if (query._id) {
        return item._id === query._id;
      }
      
      // Generic property matching
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }
  
  // Insert a new item
  async insertOne(document) {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    // Generate a simple ID if none exists
    if (!document._id) {
      document._id = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }
    items.push(document);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    
    return {
      insertedId: document._id,
      acknowledged: true
    };
  }
  
  // Update an existing item
  async updateOne(filter, update) {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    let updated = false;
    
    const updatedItems = items.map(item => {
      // Simple implementation for basic matching
      let matches = true;
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          matches = false;
          break;
        }
      }
      
      if (matches) {
        updated = true;
        // Handle $set operator
        if (update.$set) {
          return { ...item, ...update.$set };
        }
        // Handle $inc operator
        if (update.$inc) {
          const newItem = { ...item };
          for (const key in update.$inc) {
            newItem[key] = (newItem[key] || 0) + update.$inc[key];
          }
          return newItem;
        }
      }
      
      return item;
    });
    
    localStorage.setItem(this.storageKey, JSON.stringify(updatedItems));
    
    return {
      modifiedCount: updated ? 1 : 0,
      acknowledged: true
    };
  }
  
  // Delete an item
  async deleteOne(filter) {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    let deleted = false;
    
    const filteredItems = items.filter(item => {
      // Simple implementation for basic matching
      let matches = true;
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          matches = false;
          break;
        }
      }
      
      if (matches) {
        deleted = true;
        return false; // Remove this item
      }
      
      return true; // Keep this item
    });
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
    
    return {
      deletedCount: deleted ? 1 : 0,
      acknowledged: true
    };
  }
  
  // Delete multiple items
  async deleteMany(filter) {
    const items = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    let deletedCount = 0;
    
    const filteredItems = items.filter(item => {
      // Simple implementation for basic matching
      let matches = true;
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          matches = false;
          break;
        }
      }
      
      if (matches) {
        deletedCount++;
        return false; // Remove this item
      }
      
      return true; // Keep this item
    });
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
    
    return {
      deletedCount,
      acknowledged: true
    };
  }
}

class MockMongoDB {
  collection(name) {
    return new MockMongoCollection(name);
  }
}

// Mock client and DB instance
const dbInstance = new MockMongoDB();

export async function connectToDatabase() {
  console.log("Connected to mock MongoDB (localStorage)");
  return dbInstance;
}

export async function getCollection(collectionName) {
  return dbInstance.collection(collectionName);
}

// Load sample data into localStorage if empty
const initializeSampleData = () => {
  const productsKey = `${DB_PREFIX}products`;
  
  // Only initialize if products collection is empty
  if (!localStorage.getItem(productsKey) || JSON.parse(localStorage.getItem(productsKey)).length === 0) {
    const sampleProducts = [
      {
        _id: "1",
        title: "Refurbished Laptop",
        description: "High-performance laptop with eco-friendly refurbishment. 16GB RAM, 512GB SSD.",
        price: 599.99,
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        category: "Laptops",
        condition: "Refurbished",
        carbonSaved: 120,
        seller: "EcoTech",
        listedDate: new Date().toISOString()
      },
      {
        _id: "2",
        title: "Wireless Noise Cancelling Headphones",
        description: "High-quality sound with active noise cancellation in an environmentally conscious design.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Audio",
        condition: "Like New",
        carbonSaved: 15,
        seller: "SoundGreen",
        listedDate: new Date().toISOString()
      },
      {
        _id: "3",
        title: "Smart Thermostat",
        description: "Energy-efficient thermostat that helps reduce your carbon footprint and save on energy bills.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1567789884742-f3dadf944118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "Smart Home",
        condition: "New",
        carbonSaved: 45,
        seller: "GreenHome",
        listedDate: new Date().toISOString()
      },
      {
        _id: "4",
        title: "Solar Power Bank",
        description: "10,000 mAh power bank with solar charging capabilities for sustainable on-the-go power.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
        category: "Accessories",
        condition: "New",
        carbonSaved: 10,
        seller: "SolarPower",
        listedDate: new Date().toISOString()
      },
      {
        _id: "5",
        title: "Refurbished Smartphone",
        description: "Professionally refurbished smartphone with 12-month warranty and eco-friendly packaging.",
        price: 329.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
        category: "Phones",
        condition: "Refurbished",
        carbonSaved: 80,
        seller: "RenewTech",
        listedDate: new Date().toISOString()
      },
      {
        _id: "6",
        title: "LED Smart Lighting",
        description: "Energy-efficient LED smart bulbs that reduce energy consumption while providing customizable lighting.",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
        category: "Smart Home",
        condition: "New",
        carbonSaved: 25,
        seller: "BrightEco",
        listedDate: new Date().toISOString()
      }
    ];
    
    localStorage.setItem(productsKey, JSON.stringify(sampleProducts));
    console.log("Initialized sample products data");
  }
};

// Initialize sample data
initializeSampleData();
