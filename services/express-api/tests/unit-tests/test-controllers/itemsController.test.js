import itemsController from '../../../src/controllers/itemsController.js';
import itemsRepository from '../../../src/database/repositories/itemsRepository.js';
import { jest } from '@jest/globals';


//Mock itemsRepository functions
itemsRepository.getAllItems = jest.fn();
itemsRepository.getItemsByCategory = jest.fn();

describe('itemsController', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should fetch all items when no category is provided', async () => {
    // Mock the `getAllItems` method to return some items
    const mockItems = [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }];
    itemsRepository.getAllItems.mockResolvedValue(mockItems);

    // Call the `fetchItems` method with no category
    const items = await itemsController.fetchItems();

    // Check if the `getAllItems` method was called
    expect(itemsRepository.getAllItems).toHaveBeenCalled();
    expect(itemsRepository.getItemsByCategory).not.toHaveBeenCalled();

    // Check if the correct items were returned
    expect(items).toEqual(mockItems);
  });

  it('should fetch items by category when category is provided', async () => {
    const category = 'electronics';
    // Mock the `getItemsByCategory` method to return items of that category
    const mockItemsByCategory = [{ id: 3, name: 'item3', category: 'electronics' }];
    itemsRepository.getItemsByCategory.mockResolvedValue(mockItemsByCategory);

    // Call the `fetchItems` method with a category
    const items = await itemsController.fetchItems(category);

    // Check if `getItemsByCategory` was called with the correct category
    expect(itemsRepository.getItemsByCategory).toHaveBeenCalledWith(category);
    expect(itemsRepository.getAllItems).not.toHaveBeenCalled();

    // Check if the correct items for that category were returned
    expect(items).toEqual(mockItemsByCategory);
  });

  it('should not call getItemsByCategory if category is not provided', async () => {
    const mockItems = [{ id: 1, name: 'item1' }];
    itemsRepository.getAllItems.mockResolvedValue(mockItems);

    // Call `fetchItems` with no category
    const items = await itemsController.fetchItems();

    // Ensure only `getAllItems` is called, not `getItemsByCategory`
    expect(itemsRepository.getAllItems).toHaveBeenCalled();
    expect(itemsRepository.getItemsByCategory).not.toHaveBeenCalled();

    // Assert the returned items are the ones from `getAllItems`
    expect(items).toEqual(mockItems);
  });

  it('should handle errors thrown by getAllItems', async () => {
    itemsRepository.getAllItems.mockRejectedValue(new Error('Database error'));

    // Call `fetchItems` with no category
    await expect(itemsController.fetchItems()).rejects.toThrow('Database error');
  });

  it('should handle errors thrown by getItemsByCategory', async () => {
    const category = 'electronics';
    itemsRepository.getItemsByCategory.mockRejectedValue(new Error('Database error'));

    // Call `fetchItems` with a category
    await expect(itemsController.fetchItems(category)).rejects.toThrow('Database error');
  });
});
