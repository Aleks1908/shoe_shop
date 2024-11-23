import { getDB } from "../db-config.js";
import { logger } from "../../server/config/logger-config.js";

const itemsRepository = (function() {
    // Private function to get all items from a specific collection
    const getItemsFromCollection = async (collectionName) => {
        try {
            const db = await getDB(); // Get the database instance
            const collection = db.collection(collectionName); // Access the specific collection
            const items = await collection.find().toArray(); // Fetch all items as an array

            // Convert the array of items into a JSON representation
            return items; 
        } catch (error) {
            logger.error(`Error fetching items from ${collectionName}:`, error.toString());
            throw error;
        }
    };

    return {
        // Public method to fetch all items from the shoes collection
        getShoes: async () => {
            return await getItemsFromCollection("shoes");
        },

        // Public method to fetch all items from the clothes collection
        getClothes: async () => {
            return await getItemsFromCollection("clothes");
        },

        // Public method to fetch all items from the hats collection
        getHats: async () => {
            return await getItemsFromCollection("hats");
        },

        // Public method to fetch all items from the accessories collection
        getAccessories: async () => {
            return await getItemsFromCollection("accessories");
        },

        // Public method to fetch all items from the limited collection
        getLimited: async () => {
            return await getItemsFromCollection("limited");
        },

        // Public method to fetch all items from the slippers collection
        getSlippers: async () => {
            return await getItemsFromCollection("slippers");
        }
    };
})();

export default itemsRepository;
