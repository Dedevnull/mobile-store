import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../../src/components/Breadcrumbs';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

describe("Breadcrumbs:", () => {
    const renderWithRouter = (path) => render(
        <MemoryRouter initialEntries={[path]}>
            <Breadcrumbs />
        </MemoryRouter>
    );

    test('Renders Home on root route', () => {
        renderWithRouter('/');
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    test('Renders Products breadcrumb', () => {
        renderWithRouter('/products');
        expect(screen.getByText('products')).toBeInTheDocument();
    });

    test('Has correct links for intermediate breadcrumbs', () => {
        renderWithRouter('/products/123');
        expect(screen.getByText('products').closest('a')).toHaveAttribute('href', '/products');
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    });

    test('Does not make the last breadcrumb a link', () => {
        renderWithRouter('/products/123');
        expect(screen.queryByText('123').closest('a')).not.toBeInTheDocument();
    });
});
