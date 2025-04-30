import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import { useProductList } from '../../src/hooks/useProductList';
import { ProductListPage } from '../../src/pages/ProductListPage';
import { productsMockData } from '../mock/products';

vi.mock('../../src/hooks/useProductList', () => ({
    useProductList: vi.fn(),
}));

describe("ProductListPage:", () => {
    test('Shows loader when loading', () => {
        useProductList.mockReturnValue({
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
        useProductList.mockReturnValue({
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
        useProductList.mockReturnValue({
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