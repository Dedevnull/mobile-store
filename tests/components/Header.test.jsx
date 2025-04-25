import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Header } from '../../src/components/Header';

test('Header: renders content', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
    expect(screen.getByText(/Mobile Store/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
})