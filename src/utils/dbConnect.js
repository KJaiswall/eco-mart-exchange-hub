
// Database connection utility
import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string
const MONGODB_URI = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(MONGODB_URI);
let dbInstance = null;

export async function connectToDatabase() {
  if (dbInstance) return dbInstance;
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    dbInstance = client.db("quickcart");
    return dbInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Helper functions for collections
export async function getCollection(collectionName) {
  const db = await connectToDatabase();
  return db.collection(collectionName);
}

// Close connection when application shuts down
window.addEventListener('beforeunload', async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
});
