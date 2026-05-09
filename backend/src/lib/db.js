import mongoose from "mongoose";
import { logger } from "./logger.js";
import { ENV } from "./env.js";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage in Vercel/Serverless.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const { MONGO_URI } = ENV;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      logger.info("Connected to MongoDB");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    logger.error("Error connecting to MongoDB:", e);
    throw e;
  }

  return cached.conn;
};
