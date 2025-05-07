import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProductImage } from '../../src/components/ProductImage';

describe("ProductImage:", () => {
    test('renders content', () => {
        const mockProduct =  {
            id: "ZmGrkLRPXOTpxsU4jjAcv",
            brand: "Acer",
            model: "Iconia Talk S",
            imgUrl: "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
        }
        render(
            <ProductImage product={mockProduct} />,
        );

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', mockProduct.imgUrl);
        expect(img).toHaveAttribute('alt', `${mockProduct.brand}_${mockProduct.model}`);
    });
});