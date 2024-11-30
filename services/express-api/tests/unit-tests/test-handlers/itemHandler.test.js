import itemsHandler from "../../../src/server/handlers/itemHandler.js";
import itemsController from "../../../src/controllers/itemsController.js";
import { jest } from "@jest/globals";

// Mock the itemsController module
itemsController.fetchItems = jest.fn();

describe("itemsHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchItems", () => {
    it("should fetch all items when no category is provided", async () => {
      const mockItems = [
        { id: 1, name: "Item 1", category: "Category A" },
        { id: 2, name: "Item 2", category: "Category B" },
      ];

      // Mock the itemsController.fetchItems method to return all items
      itemsController.fetchItems.mockResolvedValue(mockItems);

      const result = await itemsHandler.fetchItems();

      // Verify that fetchItems was called with an empty string as the default category
      expect(itemsController.fetchItems).toHaveBeenCalledWith("");
      expect(result).toEqual(mockItems);
    });

    it("should fetch items by category when a category is provided", async () => {
      const mockCategory = "Category A";
      const mockItems = [
        { id: 1, name: "Item 1", category: "Category A" },
      ];

      // Mock the itemsController.fetchItems method to return items of the given category
      itemsController.fetchItems.mockResolvedValue(mockItems);

      const result = await itemsHandler.fetchItems(mockCategory);

      // Verify that fetchItems was called with the correct category
      expect(itemsController.fetchItems).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual(mockItems);
    });

    it("should handle errors thrown by itemsController", async () => {
      const mockCategory = "Invalid Category";
      const mockError = new Error("Category not found");

      // Mock the itemsController.fetchItems method to throw an error
      itemsController.fetchItems.mockRejectedValue(mockError);

      await expect(itemsHandler.fetchItems(mockCategory)).rejects.toThrow("Category not found");

      // Verify that fetchItems was called with the correct category
      expect(itemsController.fetchItems).toHaveBeenCalledWith(mockCategory);
    });
  });
});
