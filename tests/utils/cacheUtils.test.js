import { describe, test, expect, vi } from 'vitest';
import { getCache, setCache, isCacheValid } from '../../src/utils/cacheUtils';
import { productsMockData } from '../mock/products';

const VITE_CACHE_DURATION_MILLIS = import.meta.env.VITE_CACHE_DURATION_MILLIS;

describe('Cache Utilities:', () => {

  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should retrieve cached data if it exists', () => {
    const mockData = productsMockData;
    const timestamp = Date.now();
    const cachedData = JSON.stringify({ timestamp, data: mockData });

    localStorage.getItem.mockReturnValue(cachedData);

    const result = getCache('products_cache');

    expect(result.data).toEqual(mockData);
    expect(result.timestamp).toEqual(timestamp);

    expect(localStorage.getItem).toHaveBeenCalledWith('products_cache');
  });

  test('Should return null if no cached data exists', () => {
    localStorage.getItem.mockReturnValue(null);

    const result = getCache('products_cache');

    expect(result).toBeNull();
    expect(localStorage.getItem).toHaveBeenCalledWith('products_cache');
  });

  test('Should store data in cache with timestamp', () => {
    const mockData = productsMockData;

    setCache('products_cache', mockData);

    expect(localStorage.setItem).toHaveBeenCalledWith('products_cache', expect.any(String));
    const storedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);

    expect(storedData.data).toEqual(mockData);
    expect(storedData.timestamp).toBeDefined();
  });

  test('Should validate cache expiration correctly', () => {
    const timeInMillis = Date.now();
    const validTimestamp = timeInMillis - 10000;
    const expiredTimestamp = timeInMillis - (VITE_CACHE_DURATION_MILLIS + 10000);
 
    expect(isCacheValid(validTimestamp)).toBe(true);
    expect(isCacheValid(expiredTimestamp)).toBe(false);
  });
});
