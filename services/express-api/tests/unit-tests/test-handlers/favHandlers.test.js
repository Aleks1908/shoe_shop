import favHandler from "../../../src/server/handlers/favHandler.js";
import favController from "../../../src/controllers/favController.js";
import { jest } from "@jest/globals";

// Mock the favController module
favController.addItemToUser = jest.fn();
favController.deleteItemFromUser = jest.fn();
favController.retrieveFavoriteItems = jest.fn();

describe("favHandler", () => {
  let mockUser;
  let mockItemId;
  let mockUpdatedUser;
  let mockFavoriteItems;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Create mock data
    mockUser = {
      _id: "user123",
      favorites: ["item1", "item2"],
    };

    mockItemId = "item3";
    mockUpdatedUser = {
      _id: "user123",
      favorites: ["item1", "item2", "item3"],
    };

    mockFavoriteItems = [
      { _id: "item1", name: "Item 1", category: "Category A" },
      { _id: "item2", name: "Item 2", category: "Category B" },
    ];
  });

  describe("addItem", () => {
    it("should add an item to the user's favorites", async () => {
      // Mock the addItemToUser method of favController to return updatedUser
      favController.addItemToUser.mockResolvedValue(mockUpdatedUser);

      const result = await favHandler.addItem(mockUser, mockItemId);

      expect(favController.addItemToUser).toHaveBeenCalledWith(mockUser, mockItemId);
      expect(result).toEqual(mockUpdatedUser);
    });

    it("should handle errors thrown by addItemToUser", async () => {
      const mockError = new Error("Failed to add item");
      favController.addItemToUser.mockRejectedValue(mockError);

      await expect(favHandler.addItem(mockUser, mockItemId)).rejects.toThrow("Failed to add item");

      expect(favController.addItemToUser).toHaveBeenCalledWith(mockUser, mockItemId);
    });
  });

  describe("removeItem", () => {
    it("should remove an item from the user's favorites", async () => {
      const mockItemIdToRemove = "item2";
      const updatedUserAfterRemoval = {
        _id: "user123",
        favorites: ["item1"],
      };

      // Mock the deleteItemFromUser method of favController to return updatedUserAfterRemoval
      favController.deleteItemFromUser.mockResolvedValue(updatedUserAfterRemoval);

      const result = await favHandler.removeItem(mockUser, mockItemIdToRemove);

      expect(favController.deleteItemFromUser).toHaveBeenCalledWith(mockUser, mockItemIdToRemove);
      expect(result).toEqual(updatedUserAfterRemoval);
    });

    it("should handle errors thrown by deleteItemFromUser", async () => {
      const mockError = new Error("Failed to remove item");
      favController.deleteItemFromUser.mockRejectedValue(mockError);

      await expect(favHandler.removeItem(mockUser, mockItemId)).rejects.toThrow("Failed to remove item");

      expect(favController.deleteItemFromUser).toHaveBeenCalledWith(mockUser, mockItemId);
    });
  });

  describe("getFavorites", () => {
    it("should retrieve the user's favorite items", async () => {
      // Mock the retrieveFavoriteItems method of favController to return mockFavoriteItems
      favController.retrieveFavoriteItems.mockResolvedValue(mockFavoriteItems);

      const result = await favHandler.getFavorites(mockUser);

      expect(favController.retrieveFavoriteItems).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockFavoriteItems);
    });

    it("should handle errors thrown by retrieveFavoriteItems", async () => {
      const mockError = new Error("Failed to retrieve favorites");
      favController.retrieveFavoriteItems.mockRejectedValue(mockError);

      await expect(favHandler.getFavorites(mockUser)).rejects.toThrow("Failed to retrieve favorites");

      expect(favController.retrieveFavoriteItems).toHaveBeenCalledWith(mockUser);
    });
  });
});
