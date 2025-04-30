import { afterEach, describe, test, vi } from 'vitest';
import { fetchAddToCart } from '../../src/services/fetchAddToCart';
const VITE_API_URL = import.meta.env.VITE_API_URL;

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Fetch Add To Cart:', () => {

    test('Should fetch and return a quantity of products in cart', async () => {
        const mockData = {
            id: "ZmGrkLRPXOTpxsU4jjAcv",
            colorCode: 1,
            storageCode: 2
        };

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ count: 1 }),
            })
        ));

        const data = await fetchAddToCart(mockData);

        expect(data).toEqual({ count: 1 });
        expect(fetch).toHaveBeenCalledWith(`${VITE_API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockData),
        });
    });

});