import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { test } from 'vitest';
import { ProductCard } from '../../src/components/ProductCard';
import { productsMockData } from '../mock/products';

const mockProduct = productsMockData[0];

describe('ProductCard:', () => {
  test('Renders product details correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Acer, Iconia Talk S/i)).toBeInTheDocument();
    expect(screen.getByText(/170 €/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.imgUrl);
  });

  test('Wraps content inside a link to product details', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  test('Does not crash if price is empty', () => {
    const productWithoutPrice = { ...mockProduct, price: '' };

    render(
      <MemoryRouter>
        <ProductCard product={productWithoutPrice} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Acer, Iconia Talk S/i)).toBeInTheDocument();
    expect(screen.queryByText(/170 €/)).not.toBeInTheDocument();
  });
});
