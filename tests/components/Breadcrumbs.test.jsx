import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../../src/components/Breadcrumbs';
import { MemoryRouter } from 'react-router';

const renderWithRouter = (path) => render(
    <MemoryRouter initialEntries={[path]}>
        <Breadcrumbs />
    </MemoryRouter>
);

test('Breadcrumbs: renders Home on root route', () => {
    renderWithRouter('/');
    expect(screen.getByText('Home')).toBeInTheDocument();
})

test('Breadcrumbs: renders Products breadcrumb', () => {
    renderWithRouter('/products');
    expect(screen.getByText('products')).toBeInTheDocument();
})

test('Breadcrumbs: has correct links for intermediate breadcrumbs', () => {
    renderWithRouter('/products/123');
    expect(screen.getByText('products').closest('a')).toHaveAttribute('href', '/products');
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
})

test('Breadcrumbs: does not make the last breadcrumb a link', () => {
    renderWithRouter('/products/123');
    expect(screen.queryByText('123').closest('a')).not.toBeInTheDocument();
})