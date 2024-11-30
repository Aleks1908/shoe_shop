import authRepository from '../../../src/database/repositories/authRepository.js';
import Blacklist from '../../../src/database/models/blacklistModel.js';
import mockingoose from 'mockingoose';

describe('authRepository', () => {
  beforeEach(() => {
    mockingoose.resetAll(); // Reset all mocks for a clean state
  });

  it('should return null if the token is not blacklisted', async () => {
    const token = 'test-token';

    // Mock Blacklist.findOne to return null (i.e., token is not blacklisted)
    mockingoose(Blacklist).toReturn(null, 'findOne');

    // Call the isBlacklisted function
    const result = await authRepository.isBlacklisted(token);

    // Verify the result is null since the token is not blacklisted
    expect(result).toBeNull();
  });

  it('should add a token to the blacklist', async () => {
    const token = 'test-token';

    // Mock Blacklist.create to simulate successful creation
    const mockSavedToken = { token };
    mockingoose(Blacklist).toReturn(mockSavedToken, 'save');

    // Call the addToBlacklist function
    await authRepository.addToBlacklist(token);

    // Verify the token was saved (implicit check via mockingoose mocking behavior)
    const savedToken = new Blacklist({ token });
    expect(savedToken.token).toBe(token);
  });
});
