import { render, screen } from '@testing-library/react';
import { describe, expect, test } from "vitest";
import { ProductDetailDescription } from "../../src/components/ProductDetailsDescription";

describe('ProductDetailDescription', () => {
    test('Renders all product details correctly for a full product', () => {
        const fullProduct = {
            brand: 'TestBrand',
            model: 'X100',
            price: '499',
            cpu: 'Octa-core 2.0GHz',
            ram: '8GB',
            os: 'TestOS 1.0',
            displayResolution: '1080x2400',
            battery: '4000mAh',
            primaryCamera: ['12MP', '8MP'],
            secondaryCmera: '5MP',
            dimentions: '150x75x8mm',
            weight: '180g',
        };
        render(<ProductDetailDescription product={fullProduct} />);

        // Heading
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TestBrand, X100');
        // Price heading
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('499');

        // List items
        expect(screen.getByText('TestBrand')).toBeInTheDocument();
        expect(screen.getByText('X100')).toBeInTheDocument();
        expect(screen.getByText('499')).toBeInTheDocument();
        expect(screen.getByText('Octa-core 2.0GHz')).toBeInTheDocument();
        expect(screen.getByText('8GB')).toBeInTheDocument();
        expect(screen.getByText('TestOS 1.0')).toBeInTheDocument();
        expect(screen.getByText('1080x2400')).toBeInTheDocument();
        expect(screen.getByText('4000mAh')).toBeInTheDocument();

        // Cameras
        expect(screen.getByText('12MP, 8MP')).toBeInTheDocument();
        expect(screen.getByText('5MP')).toBeInTheDocument();
        // Dimensions and weight
        expect(screen.getByText('150x75x8mm')).toBeInTheDocument();
        expect(screen.getByText('180g')).toBeInTheDocument();
    });

    test('Renders fallback values for missing fields', () => {
        const minimalProduct = {};

        render(<ProductDetailDescription product={minimalProduct} />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(',');
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/---\s*€/);

        const listItems = screen.getAllByRole('listitem');
        const allHasFallback = listItems.every(li => {
            return li.textContent.includes('N/A');
        });

        expect(allHasFallback).toBe(true);
    });
});