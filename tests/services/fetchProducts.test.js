import { afterEach, describe, test, vi } from 'vitest';
import { fetchProducts } from '../../src/services/fetchProducts';
import { productsMockData } from '../mock/products';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Fetch Products:', () => {
    test('Should fetch and return products data when response is ok', async () => {
        const mockData = [...productsMockData];
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        ));

        const data = await fetchProducts();
        expect(data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/product`);
    });

    test('Should throw an error when response is not ok', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ));

        await expect(fetchProducts()).rejects.toThrow('Failed to fetch products');
        expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/product`);
    });
});