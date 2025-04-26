import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Header } from '../../src/components/Header';
import { describe, test } from 'vitest';

describe("Header:", () => {
    test('renders content', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        expect(screen.getByText(/Mobile Store/i)).toBeInTheDocument();
        expect(screen.getByText(/Cart/i)).toBeInTheDocument();
    });
});