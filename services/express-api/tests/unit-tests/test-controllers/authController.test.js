import authController from '../../../src/controllers/authController.js';
import { hashManager } from '../../../src/utils.js';
import usersRepository from '../../../src/database/repositories/userRepository.js';
import authRepository from '../../../src/database/repositories/authRepository.js';
import { jest } from '@jest/globals';

//Mock hashManger functions
hashManager.generateHash = jest.fn();
hashManager.hashMatch = jest.fn();
hashManager.generateSessionToken = jest.fn();

// Mock userRepository functions
usersRepository.userExists = jest.fn();
usersRepository.addUser = jest.fn();

// Mock authRepository functions
authRepository.isBlacklisted = jest.fn()
authRepository.addToBlacklist = jest.fn()

// Example Test
describe('loginUserController', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mocks before each test
  });

  it('should throw an error if user does not exist', async () => {
    // Mock userExists to return `null` (user does not exist)
    usersRepository.userExists.mockResolvedValue(null);

    // Test loginUserController
    await expect(
      authController.loginUserController({ user_name: 'nonexistent_user', password: 'password123' })
    ).rejects.toThrow('User does not exist.');

    // Ensure the mock was called
    expect(usersRepository.userExists).toHaveBeenCalledWith('nonexistent_user');
  });

  it('should throw an error if passwords do not match', async () => {
    // Mock userExists to return a valid user
    usersRepository.userExists.mockResolvedValue({
      user_name: 'existing_user',
      password: 'hashed_password',
    });

    // Mock hashMatch to return `false` (password mismatch)
    hashManager.hashMatch.mockResolvedValue(false);

    // Test loginUserController
    await expect(
      authController.loginUserController({ user_name: 'existing_user', password: 'wrong_password' })
    ).rejects.toThrow('Incorrect Password.');

    // Ensure the mocks were called
    expect(usersRepository.userExists).toHaveBeenCalledWith('existing_user');
    expect(hashManager.hashMatch).toHaveBeenCalledWith('wrong_password', 'hashed_password');
  });

  it('should log in user successfully', async () => {
    // Mock userExists to return a valid user
    usersRepository.userExists.mockResolvedValue({
      _doc: {},
      user_name: 'existing_user',
      password: 'hashed_password',
    });

    // Mock hashMatch to return `true` (password match)
    hashManager.hashMatch.mockResolvedValue(true);

    // Mock generateSessionToken to return a dummy session token
    hashManager.generateSessionToken.mockReturnValue('dummy_session_token');

    // Test loginUserController
    const user = await authController.loginUserController({
      user_name: 'existing_user',
      password: 'correct_password',
    });

    // Verify the returned user object
    expect(user._doc.sessionID).toBe('dummy_session_token');

    // Ensure the mocks were called
    expect(usersRepository.userExists).toHaveBeenCalledWith('existing_user');
    expect(hashManager.hashMatch).toHaveBeenCalledWith('correct_password', 'hashed_password');
    expect(hashManager.generateSessionToken).toHaveBeenCalledWith(user);
  });
});
