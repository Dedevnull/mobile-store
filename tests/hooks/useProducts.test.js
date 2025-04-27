import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { useProducts } from '../../src/hooks/useProducts';
import * as fetchProductsService from '../../src/services/fetchProducts';
import { productsMockData } from '../mock/products';

// Mocks
const mockProducts = productsMockData;

describe('useProducts:', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Should fetch and return products', async () => {
        vi.spyOn(fetchProductsService, 'fetchProducts').mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.products.length).toBe(4);
        expect(result.current.error).toBe(null);
    });

    test('Should handle fetch error', async () => {
        vi.spyOn(fetchProductsService, 'fetchProducts').mockRejectedValue(new Error('Failed to fetch'));

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe('Failed to fetch');
    });

    test('Should filter products by search term', async () => {
        vi.spyOn(fetchProductsService, 'fetchProducts').mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.setSearchTerm('Iconia Talk');
        });

        expect(result.current.products.length).toBe(1);
        expect(result.current.products[0].model).toBe('Iconia Talk S');
    });
});
