import mongoose from "mongoose";
import { logger } from "../server/config/logger-config.js";

const connectToDB = async () => {
  const connectionString = process.env.ATLAS_URI || "";

  // Check if the connection string is empty
  if (!connectionString) {
    logger.error("Database connection string is missing.");
    throw new Error("Database connection string is missing.");
  }

  try {
    logger.debug("Trying to connect to MongoDB with Mongoose...");
    await mongoose.connect(connectionString);
    logger.debug("Mongoose connection successful.");
  } catch (e) {
    logger.error(`Error connecting to MongoDB: ${e.message}`);
    throw e;
  }
};

// No need for `getDB` since Mongoose handles models directly
export { connectToDB };
