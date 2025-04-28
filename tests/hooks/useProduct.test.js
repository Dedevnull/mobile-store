import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, expect, vi } from 'vitest';
import { useProduct } from '../../src/hooks/useProduct';
import * as fetchProductsService from '../../src/services/fetchProductDetails';
import { productsMockData } from '../mock/products';

const mockProduct = productsMockData[0];

describe('useProduct:', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Should fetch and return products', async () => {
        vi.spyOn(fetchProductsService, 'fetchProductDetails').mockResolvedValue(mockProduct);

        const { result } = renderHook(() => useProduct(mockProduct.id));

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.product).toEqual(mockProduct);
        expect(result.current.error).toBe(null);
    });

    test('Should handle fetch error', async () => {
        vi.spyOn(fetchProductsService, 'fetchProductDetails').mockRejectedValue(new Error('Failed to fetch product details'));

        const { result } = renderHook(() => useProduct(mockProduct.id));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.product).toEqual(null);
        expect(result.current.error).toBe('Failed to fetch product details');
    });

});
