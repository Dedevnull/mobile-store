import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test,  } from 'vitest';
import { SearchInput } from '../../src/components/SearchInput';

describe("SearchInput:", () => {
    test('Renders content', () => {
        render(<SearchInput />);
        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    });

    test('Updates search input', () => {
        const setSearchTermMock = vi.fn();

        render(<SearchInput onSearch={setSearchTermMock} />);
    
        const input = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(input, { target: { value: 'Acer' } });
    
        expect(setSearchTermMock).toHaveBeenCalledWith('Acer');
    });
});