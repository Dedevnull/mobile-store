import { afterEach, describe, test, vi } from 'vitest';
import { fetchProductDetails } from '../../src/services/fetchProductDetails';
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

describe('Fetch Product Details:', () => {

    test('Should fetch and return product details data when response is ok', async () => {
        const mockData = productsMockData[0];
        getCache.mockReturnValue(null);
        isCacheValid.mockReturnValue(false);

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ));

        const data = await fetchProductDetails(mockData.id);

        expect(data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/product/${mockData.id}`);
        expect(setCache).toHaveBeenCalledWith(`product_details_cache_${mockData.id}`, mockData);
    });

    test('Should return product details from cache if valid', async () => {
        const mockData = productsMockData[0];
        const cacheData = { timestamp: Date.now(), data: mockData };

        getCache.mockReturnValue(cacheData);
        isCacheValid.mockReturnValue(true);

        const data = await fetchProductDetails();

        expect(fetch).not.toHaveBeenCalled();
        expect(setCache).not.toHaveBeenCalled();
        expect(data).toEqual(mockData);

    });

    test('Should re-fetch product details if cache is expired', async () => {
        const mockData = productsMockData[0];
        const expiredCacheData = { timestamp: Date.now() - 3600001, data: mockData }; // Expirado

        getCache.mockReturnValue(expiredCacheData);
        isCacheValid.mockReturnValue(false);

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ));

        const data = await fetchProductDetails(mockData.id);

        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/product/${mockData.id}`);
        expect(setCache).toHaveBeenCalledWith(`product_details_cache_${mockData.id}`, mockData);
        expect(data).toEqual(mockData);
    });

    test('Should throw an error when response is not ok', async () => {
        const mockData = productsMockData[0];

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ));

        await expect(fetchProductDetails(mockData.id)).rejects.toThrow('Failed to fetch product');
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/product/${mockData.id}`);
    });
});