import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { ProductListPage } from '../../src/pages/ProductListPage';
import { useProducts } from '../../src/hooks/useProducts';
import { productsMockData } from '../mock/products';
import { BrowserRouter } from 'react-router';

vi.mock('../../src/hooks/useProducts', () => ({
    useProducts: vi.fn(),
}));

describe("ProductListPage:", () => {
    test('Shows loader when loading', () => {
        useProducts.mockReturnValue({
            products: [],
            searchTerm: '',
            setSearchTerm: vi.fn(),
            loading: true,
            error: null,
        });

        render(<ProductListPage />);

        expect(screen.getByRole('status')).toBeInTheDocument();
    });
    
    test('Shows error message when error exists', () => {
        useProducts.mockReturnValue({
            products: [],
            searchTerm: '',
            setSearchTerm: vi.fn(),
            loading: false,
            error: "Failed to fetch products",
        });

        render(<ProductListPage />);

        expect(screen.getByText('Error: Failed to fetch products')).toBeInTheDocument();
    });

    test('Renders products list', () => {
        useProducts.mockReturnValue({
            products: productsMockData,
            searchTerm: '',
            setSearchTerm: vi.fn(),
            loading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <ProductListPage />
            </BrowserRouter>
        );

        expect(screen.getByText(/Liquid Z6 Plus/i)).toBeInTheDocument();
        expect(screen.getByText(/Iconia Tab 10 A3-A40/i)).toBeInTheDocument();
    });
});