import ItemModel from "../models/itemsModel.js"; // Import the Mongoose model
import { logger } from "../../server/config/logger-config.js";

const itemsRepository = (function () {
  return {
    getAllItems: async () => {
      try {
        const items = await ItemModel.find(); // Fetch all documents
        return items; // Return as an array of JSON objects
      } catch (error) {
        logger.error("Error fetching all items:", error.toString());
        throw error;
      }
    },

    getItemsByCategory: async (category) => {
      try {
        const items = await ItemModel.find({ category }); // Filter by category
        return items; // Return as an array of JSON objects
      } catch (error) {
        logger.error(`Error fetching items in category '${category}':`, error.toString());
        throw error;
      }
    },
  };
})();

export default itemsRepository;
