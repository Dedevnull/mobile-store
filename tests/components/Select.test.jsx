
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Select } from '../../src/components/Select';

describe('Select:', () => {
    const options = [
        { code: 1, name: 'Option One' },
        { code: 2, name: 'Option Two' },
    ];

    test('Renders the label when provided', () => {
        render(
            <Select
                options={options}
                name="colors"
                label="Test Label"
            />
        );
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    test('Renders a disabled placeholder option', () => {
        render(
            <Select
                options={[]}
                name="colors"
                placeholder="Choose an option"
            />
        );
        const placeholder = screen.getByRole('option', { name: 'Choose an option' });
        expect(placeholder).toBeDisabled();
        expect(placeholder).toHaveValue('');
    });

    test('Renders all provided options with JSON-stringified values', () => {
        render(
            <Select
                options={options}
                name="colors"
            />
        );
        options.forEach((option) => {
            const optionTag = screen.getByRole('option', { name: option.name });
            expect(optionTag).toBeInTheDocument();
            expect(optionTag).toHaveValue(JSON.stringify(option));
        });
    });

    test('Calls onChange with parsed code when an option is selected', () => {
        const handleChange = vi.fn();
        render(
            <Select
                options={options}
                name="colors"
                onChange={handleChange}
            />
        );
        const select = screen.getByRole('combobox');

        fireEvent.change(select, { target: { value: JSON.stringify(options[1]) } });
        expect(handleChange).toHaveBeenCalledWith({
            name: 'colors',
            value: options[1].code,
        });
    });

    test('Should set by default the first option', () => {
        render(
            <Select
                options={options}
                name="colors"
            />
        );
        const select = screen.getByRole('combobox');
        expect(select).toHaveValue(JSON.stringify(options[0]));
        const opt = screen.getByRole('option', { name: 'Option One' });
        expect(opt.selected).toBe(true);
    });
});