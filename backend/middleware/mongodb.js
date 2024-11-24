import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.DATABASE_URI;
const DATABASE_NAME = process.env.DATABASE_NAME || "blogDB";

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log("Using cached database instance");
    return cachedDb;
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
    cachedDb = client.db(DATABASE_NAME);
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw new Error("Could not connect to the database");
  }
}

export default connectToDatabase;
