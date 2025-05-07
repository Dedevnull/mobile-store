import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { ProductActions } from '../../src/components/ProductActions';
import { CartContext } from '../../src/contexts/CartContext';
import * as service from '../../src/services/fetchAddToCart';

const productMock = {
    id: '001',
    options: {
        colors: [
            { code: 1, name: 'Red' },
            { code: 2, name: 'Blue' }
        ],
        storages: [
            { code: 10, name: '64GB' },
            { code: 20, name: '128GB' }
        ]
    }
};

const increaseCount = vi.fn();

vi.mock('../../src/services/fetchAddToCart', () => ({
    fetchAddToCart: vi.fn()
}));

const renderWithContext = () => {
    return render(
        <CartContext.Provider value={{ increaseCount }}>
            <ProductActions product={productMock} />
        </CartContext.Provider>
    );
};

describe("ProductActions:", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Should renders color and storage select inputs', () => {
        renderWithContext();

        expect(screen.getByText('Colors')).toBeInTheDocument();
        expect(screen.getByText('Storages')).toBeInTheDocument();
    });

    test('Should alert when form is submitted without selecting options', () => {
        vi.stubGlobal('alert', vi.fn());
        render(
            <CartContext.Provider value={{ increaseCount }}>
                <ProductActions product={{
                    id: '001',
                    options: {
                        colors: [],
                        storages: []
                    }
                }} />
            </CartContext.Provider>
        );

        fireEvent.submit(screen.getByRole('button'));

        expect(alert).toHaveBeenCalledWith("Please select a color or storage");
    });

    test('Should submits the form and calls increaseCount on success', async () => {
        service.fetchAddToCart.mockResolvedValue({ count: 1 });

        const { container } = renderWithContext();

        // Select values

        const colorSelect = container.querySelector('select[name="colorCode"]');
        const storageSelect = container.querySelector('select[name="storageCode"]');

        fireEvent.change(colorSelect, {
            target: { value: JSON.stringify({ code: 2, name: 'Blue' }) }
        });

        fireEvent.change(storageSelect, {
            target: { value: JSON.stringify({ code: 20, name: '128GB' }) }
        });

        fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));

        await screen.findByText(/Add to Cart/i);

        expect(service.fetchAddToCart).toHaveBeenCalledWith({
            id: '001',
            colorCode: 2,
            storageCode: 20
        });

        expect(increaseCount).toHaveBeenCalledWith(1);
    });
});