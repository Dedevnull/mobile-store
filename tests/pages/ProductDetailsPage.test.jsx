import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { useProduct } from '../../src/hooks/useProduct';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';
import { MemoryRouter } from 'react-router';

vi.mock('../../src/hooks/useProduct', () => ({
    useProduct: vi.fn(),
}));

describe("ProductDetailsPage", () => {

    const renderWithRouter = () => render(
        <MemoryRouter>
            <ProductDetailsPage />
        </MemoryRouter>
    );
    test('Should show loader when loading', () => {
        useProduct.mockReturnValue({
            product: null,
            loading: true,
            error: null,
        });

        renderWithRouter();

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('Should shows error message when error exists', () => {
        useProduct.mockReturnValue({
            product: null,
            loading: false,
            error: "Failed to fetch product details",
        });

        renderWithRouter();

        expect(screen.getByText('Error: Failed to fetch product details')).toBeInTheDocument();
    });

    test('Should show product details and actions when data is ready', () => {
        const mockProduct = {
            id: "ZmGrkLRPXOTpxsU4jjAcv",
            brand: "Acer",
            model: "Iconia Talk S",
            imgUrl: "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
            options: { colors: [], storages: [] }
        };

        useProduct.mockReturnValue({
            product: mockProduct,
            loading: false,
            error: null,
        });

        renderWithRouter();

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', mockProduct.imgUrl);
        expect(img).toHaveAttribute('alt', `${mockProduct.brand}_${mockProduct.model}`);
    });
});