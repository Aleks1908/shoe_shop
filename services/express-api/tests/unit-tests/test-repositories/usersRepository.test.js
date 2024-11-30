import mockingoose from "mockingoose";
import userModel from "../../../src/database/models/usersModel.js";
import usersRepository from "../../../src/database/repositories/userRepository.js";

describe("usersRepository", () => {
  beforeEach(() => {
    mockingoose.resetAll(); // Reset mock state before each test
  });

  describe("addUser", () => {
    it("should add a new user successfully", async () => {
      const user = { user_name: "john_doe", email: "john@example.com" };

      // Mock the userModel.create method
      mockingoose(userModel).toReturn(user, "save");

      // Call the repository method
      const result = await usersRepository.addUser(user);

      // Assertions: Compare only `user_name` and `email`
      expect(result.user_name).toBe(user.user_name);
      expect(result.email).toBe(user.email);
    });

    it("should throw an error if adding a user fails", async () => {
      const user = { user_name: "john_doe", email: "john@example.com" };
      const mockError = new Error("Database error");

      // Mock the userModel.create method to throw an error
      mockingoose(userModel).toReturn(mockError, "save");

      // Expect the method to throw
      await expect(usersRepository.addUser(user)).rejects.toThrow("Database error");
    });
  });

  describe("userExists", () => {
    it("should return user data if the user exists", async () => {
      const user_name = "john_doe";
      const mockUser = { user_name, email: "john@example.com" };

      // Mock the userModel.findOne method
      mockingoose(userModel).toReturn(mockUser, "findOne");

      // Call the repository method
      const result = await usersRepository.userExists(user_name);

      // Assertions: Compare only `user_name` and `email`
      expect(result.user_name).toBe(mockUser.user_name);
      expect(result.email).toBe(mockUser.email);
    });

    it("should return null if the user does not exist", async () => {
      const user_name = "john_doe";

      // Mock the userModel.findOne method to return null
      mockingoose(userModel).toReturn(null, "findOne");

      // Call the repository method
      const result = await usersRepository.userExists(user_name);

      // Assertions
      expect(result).toBeNull();
    });

    it("should throw an error if checking user existence fails", async () => {
      const user_name = "john_doe";
      const mockError = new Error("Database error");

      // Mock the userModel.findOne method to throw an error
      mockingoose(userModel).toReturn(mockError, "findOne");

      // Expect the method to throw
      await expect(usersRepository.userExists(user_name)).rejects.toThrow("Database error");
    });
  });

  describe("findById", () => {
    it("should return user data if the user is found by ID", async () => {
      const _id = "674b14a685d65a318e2742ed";
      const mockUser = { user_name: "john_doe", email: "john@example.com" };

      // Mock the userModel.findOne method
      mockingoose(userModel).toReturn(mockUser, "findOne");

      // Call the repository method
      const result = await usersRepository.findById(_id);

      // Assertions: Compare only `user_name` and `email`
      expect(result.user_name).toBe(mockUser.user_name);
      expect(result.email).toBe(mockUser.email);
    });

    it("should return null if the user is not found by ID", async () => {
      const _id = "674b14a685d65a318e2742ed";

      // Mock the userModel.findOne method to return null
      mockingoose(userModel).toReturn(null, "findOne");

      // Call the repository method
      const result = await usersRepository.findById(_id);

      // Assertions
      expect(result).toBeNull();
    });

    it("should throw an error if finding user by ID fails", async () => {
      const _id = "674b14a685d65a318e2742ed";
      const mockError = new Error("Database error");

      // Mock the userModel.findOne method to throw an error
      mockingoose(userModel).toReturn(mockError, "findOne");

      // Expect the method to throw
      await expect(usersRepository.findById(_id)).rejects.toThrow("Database error");
    });
  });
});
