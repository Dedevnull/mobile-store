import { act, renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useForm } from '../../src/hooks/useForm';

describe('useForm:', () => {
    test('should initialize with given initial form values', () => {
        const initialForm = { colorCode: 2000, storgeCode: 3000, };
        const { result } = renderHook(() => useForm(initialForm));

        expect(result.current.form).toEqual(initialForm);
    });

    test('Should update the form state on onChange call', () => {
        const initialForm = {};
        const { result } = renderHook(() => useForm(initialForm));
        
        act(() => {
            result.current.onChange({ name: "colorCode", value: 3000 });
        });

        expect(result.current.form).toEqual({ colorCode: 3000 });

        act(() => {
            result.current.onChange({ name: "storgeCode", value: 4000 });
        });

        expect(result.current.form).toEqual({ colorCode: 3000, storgeCode: 4000, });
    });
});
