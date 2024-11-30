import authHandler from "../../../src/server/handlers/authHander.js";
import authController from "../../../src/controllers/authController.js";
import { jest } from "@jest/globals";

//Auth Controller Mocks
authController.registerUserController = jest.fn();
authController.loginUserController = jest.fn();
authController.logoutUserController = jest.fn();



describe("authHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUserHandler", () => {
    it("should return a successful response when user registration is successful", async () => {
      const mockUser = { user_name: "testuser", password: "password123" };
      const mockResult = { _doc: { user_name: "testuser", favorites: [] } };

      authController.registerUserController.mockResolvedValue(mockResult);

      const response = await authHandler.registerUserHandler(mockUser);

      expect(authController.registerUserController).toHaveBeenCalledWith(mockUser);
      expect(response).toEqual({
        status: 201,
        body: { message: { user_name: "testuser", favorites: [] } },
        success: true,
      });
    });

    it("should return a 400 response if the username already exists", async () => {
      const mockUser = { user_name: "duplicateuser", password: "password123" };

      const duplicateError = new Error("Duplicate key error");
      duplicateError.code = 11000; // MongoDB duplicate key error code
      authController.registerUserController.mockRejectedValue(duplicateError);

      const response = await authHandler.registerUserHandler(mockUser);

      expect(authController.registerUserController).toHaveBeenCalledWith(mockUser);
      expect(response).toEqual({
        status: 400,
        body: { message: "The username already exists." },
        success: false,
      });
    });

    it("should return a 500 response for unexpected errors", async () => {
      const mockUser = { user_name: "testuser", password: "password123" };

      authController.registerUserController.mockRejectedValue(
        new Error("Unexpected error")
      );

      const response = await authHandler.registerUserHandler(mockUser);

      expect(authController.registerUserController).toHaveBeenCalledWith(mockUser);
      expect(response).toEqual({
        status: 500,
        body: { message: "An unexpected error occured." },
        success: false,
      });
    });
  });

  describe("loginUserHandler", () => {
    it("should return a successful response when login is successful", async () => {
      const mockUser = { user_name: "testuser", password: "password123" };
      const mockResult = { _doc: { user_name: "testuser", favorites: [] } };

      authController.loginUserController.mockResolvedValue(mockResult);

      const response = await authHandler.loginUserHandler(mockUser);

      expect(authController.loginUserController).toHaveBeenCalledWith(mockUser);
      expect(response).toEqual({
        status: 200,
        body: { message: { user_name: "testuser", favorites: [] } },
        success: true,
      });
    });

    it("should return a 401 response when the user does not exist", async () => {
      const mockUser = { user_name: "nonexistentuser", password: "password123" };

      authController.loginUserController.mockRejectedValue(
        new Error("User does not exist.")
      );

      const response = await authHandler.loginUserHandler(mockUser);

      expect(authController.loginUserController).toHaveBeenCalledWith(mockUser);
      expect(response).toEqual({
        status: 401,
        body: { message: "User does not exist." },
        success: false,
      });
    });

    it("should return a 401 response for incorrect password", async () => {
      const mockUser = { user_name: "testuser", password: "wrongpassword" };

      authController.loginUserController.mockRejectedValue(
        new Error("Incorrect Password.")
      );

      const response = await authHandler.loginUserHandler(mockUser);

      expect(authController.loginUserController).toHaveBeenCalledWith(mockUser);
      expect(response).toEqual({
        status: 401,
        body: { message: "Incorrect Password." },
        success: false,
      });
    });

    it("should return a 500 response for unexpected errors", async () => {
      const mockUser = { user_name: "testuser", password: "password123" };

      authController.loginUserController.mockRejectedValue(
        new Error("Unexpected error")
      );

      const response = await authHandler.loginUserHandler(mockUser);

      expect(authController.loginUserController).toHaveBeenCalledWith(mockUser);
      expect(response).toEqual({
        status: 500,
        body: { message: "An unexpected error occured." },
        success: false,
      });
    });
  });

  describe("logoutUserHandler", () => {
    it("should return a successful response when logout is successful", async () => {
      const mockReq = { headers: { cookie: "sessionID=abc123" } };
      const mockResult = { status: 200 };

      authController.logoutUserController.mockResolvedValue(mockResult);

      const response = await authHandler.logoutUserHandler(mockReq);

      expect(authController.logoutUserController).toHaveBeenCalledWith(mockReq);
      expect(response).toEqual({
        status: 200,
        body: { message: "Logged out" },
        success: true,
      });
    });

    it("should return a 204 response when no session ID is found", async () => {
      const mockReq = { headers: { cookie: "" } };

      authController.logoutUserController.mockRejectedValue(new Error("204"));

      const response = await authHandler.logoutUserHandler(mockReq);

      expect(authController.logoutUserController).toHaveBeenCalledWith(mockReq);
      expect(response).toEqual({
        status: 204,
        body: { message: "Could not find session ID." },
        success: false,
      });
    });

    it("should return a 500 response for unexpected errors", async () => {
      const mockReq = { headers: { cookie: "sessionID=abc123" } };

      authController.logoutUserController.mockRejectedValue(
        new Error("Unexpected error")
      );

      const response = await authHandler.logoutUserHandler(mockReq);

      expect(authController.logoutUserController).toHaveBeenCalledWith(mockReq);
      expect(response).toEqual({
        status: 500,
        body: { message: "An unexpected error occured." },
        success: false,
      });
    });
  });
});
