import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: Cached;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  try {
    // Already Connected
    if (cached?.conn) {
      return cached.conn;
    }

    // Create connection promise once
    if (!cached?.promise) {
      cached!.promise = mongoose.connect(MONGODB_URI, {
        dbName: "skillverse",
      });
    }

    // Wait for connection
    cached!.conn = await cached!.promise;
    console.log("MongoDB Connected");

    return cached!.conn
  } catch (error) {
    cached!.promise = null;
    console.log("MongoDb Connection Error: ", error);
    throw new Error("Failed to connect to database");
  }
}

export default connectDB;