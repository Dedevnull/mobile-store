import { afterEach, describe, test, vi } from 'vitest';
import { fetchProducts } from '../../src/services/fetchProducts';
import { getCache, isCacheValid, setCache } from '../../src/utils/cacheUtils';
import { productsMockData } from '../mock/products';

vi.mock('../../src/utils/cacheUtils', () => ({
    getCache: vi.fn(),
    setCache: vi.fn(),
    isCacheValid: vi.fn(),
}));

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Fetch Products:', () => {
    test('Should fetch and return products data when response is ok', async () => {
        const mockData = [...productsMockData];

        getCache.mockReturnValue(null);
        isCacheValid.mockReturnValue(false);

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ));

        const data = await fetchProducts();

        expect(data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/product`);
        expect(setCache).toHaveBeenCalledWith('products_cache', mockData);
    });
    
    test('Should return products from cache if valid', async () => {
        const cacheData = { timestamp: Date.now(), data: productsMockData };

        getCache.mockReturnValue(cacheData);
        isCacheValid.mockReturnValue(true);

        const data = await fetchProducts();

        expect(fetch).not.toHaveBeenCalled();
        expect(setCache).not.toHaveBeenCalled();
        expect(data).toEqual(productsMockData);

    });

    test('Should re-fetch products if cache is expired', async () => {
        const expiredCacheData = { timestamp: Date.now() - 3600001, data: productsMockData }; // Expirado

        getCache.mockReturnValue(expiredCacheData);
        isCacheValid.mockReturnValue(false);

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(productsMockData),
            })
        ));

        const data = await fetchProducts();

        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/product`);
        expect(setCache).toHaveBeenCalledWith('products_cache', productsMockData);
        expect(data).toEqual(productsMockData);
    });

    test('Should throw an error when response is not ok', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ));

        await expect(fetchProducts()).rejects.toThrow('Failed to fetch products');
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/product`);
    });
});