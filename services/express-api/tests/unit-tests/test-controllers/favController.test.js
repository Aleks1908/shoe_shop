import favController from "../../../src/controllers/favController.js";
import itemsRepository from "../../../src/database/repositories/itemsRepository.js";
import usersRepository from "../../../src/database/repositories/userRepository.js";
import { jest } from "@jest/globals";

// Mock the dependencies
itemsRepository.getAllSpecifiedItems = jest.fn();
usersRepository.updateUser = jest.fn();

describe("favController", () => {
  let mockUser;
  let mockItem;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Create mock data
    mockUser = {
      _id: "user123",
      favorites: ["item1", "item2"],
    };

    mockItem = {
      _id: "item3",
      name: "Item 3",
      category: "Category A",
    };
  });

  describe("addItemToUser", () => {
    it("should add an item to the user's favorites if it doesn't exist already", async () => {
      const newItemId = "item3";
      const updatedUser = { ...mockUser, favorites: [...mockUser.favorites, newItemId] };

      // Mock the updateUser method to return the updated user
      usersRepository.updateUser.mockResolvedValue(updatedUser);

      const result = await favController.addItemToUser(mockUser, newItemId);

      expect(usersRepository.updateUser).toHaveBeenCalledWith(mockUser._id, updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it("should not add an item if it already exists in the user's favorites", async () => {
      const existingItemId = "item1"; // Item already in favorites
      const result = await favController.addItemToUser(mockUser, existingItemId);

      // Ensure that updateUser is not called
      expect(usersRepository.updateUser).not.toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe("deleteItemFromUser", () => {
    it("should delete an item from the user's favorites if it exists", async () => {
      const itemToDeleteId = "item2";
      const updatedUser = { ...mockUser, favorites: ["item1"] };

      // Mock the updateUser method to return the updated user
      usersRepository.updateUser.mockResolvedValue(updatedUser);

      const result = await favController.deleteItemFromUser(mockUser, itemToDeleteId);

      expect(usersRepository.updateUser).toHaveBeenCalledWith(mockUser._id, {
        ...mockUser,
        favorites: ["item1"],
      });
      expect(result).toEqual(updatedUser);
    });

    it("should not delete an item if it doesn't exist in the user's favorites", async () => {
      const nonExistentItemId = "item4"; // Item not in favorites
      const result = await favController.deleteItemFromUser(mockUser, nonExistentItemId);

      // Ensure that updateUser is not called
      expect(usersRepository.updateUser).not.toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe("retrieveFavoriteItems", () => {
    it("should return the correct items from the repository", async () => {
      const itemIds = mockUser.favorites; // ['item1', 'item2']
      const mockItems = [
        { _id: "item1", name: "Item 1" },
        { _id: "item2", name: "Item 2" },
      ];

      // Mock the getAllSpecifiedItems method to return the mockItems
      itemsRepository.getAllSpecifiedItems.mockResolvedValue(mockItems);

      const result = await favController.retrieveFavoriteItems(mockUser);

      expect(itemsRepository.getAllSpecifiedItems).toHaveBeenCalledWith(itemIds);
      expect(result).toEqual(mockItems);
    });

    it("should return an empty array if the user has no favorites", async () => {
      const userWithNoFavorites = { ...mockUser, favorites: [] };

      // No favorites to retrieve, should return an empty array
      itemsRepository.getAllSpecifiedItems.mockResolvedValue([]);

      const result = await favController.retrieveFavoriteItems(userWithNoFavorites);

      expect(itemsRepository.getAllSpecifiedItems).toHaveBeenCalledWith([]);
      expect(result).toEqual([]);
    });
  });
});
