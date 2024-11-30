import mockingoose from "mockingoose";
import ItemModel from "../../../src/database/models/itemsModel.js";
import itemsRepository from "../../../src/database/repositories/itemsRepository.js";

describe("itemsRepository", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe("getAllItems", () => {
    it("should fetch all items successfully", async () => {
      // Mock data
      const mockItems = [
        { _id: "1", name: "Item 1", category: "Category A" },
        { _id: "2", name: "Item 2", category: "Category B" },
      ];

      // Mock the ItemModel.find method
      mockingoose(ItemModel).toReturn(mockItems, "find");

      // Call the repository method
      const result = await itemsRepository.getAllItems();

      // Assertions: Ignore `_id` field
      expect(result).toMatchObject(mockItems.map(({ _id, ...item }) => item));
    });

    it("should throw an error if fetching all items fails", async () => {
      const mockError = new Error("Database error");

      // Mock the ItemModel.find method to throw an error
      mockingoose(ItemModel).toReturn(mockError, "find");

      // Expect the method to throw
      await expect(itemsRepository.getAllItems()).rejects.toThrow("Database error");
    });
  });

  describe("getItemsByCategory", () => {
    it("should fetch items by category successfully", async () => {
      const category = "Category A";

      // Mock data
      const mockItems = [
        { _id: "1", name: "Item 1", category },
        { _id: "2", name: "Item 2", category },
      ];

      // Mock the ItemModel.find method
      mockingoose(ItemModel).toReturn(mockItems, "find");

      // Call the repository method
      const result = await itemsRepository.getItemsByCategory(category);

      // Assertions: Ignore `_id` field
      expect(result).toMatchObject(mockItems.map(({ _id, ...item }) => item));
    });

    it("should throw an error if fetching items by category fails", async () => {
      const category = "Category A";
      const mockError = new Error("Database error");

      // Mock the ItemModel.find method to throw an error
      mockingoose(ItemModel).toReturn(mockError, "find");

      // Expect the method to throw
      await expect(itemsRepository.getItemsByCategory(category)).rejects.toThrow(
        "Database error"
      );
    });
  });
});
