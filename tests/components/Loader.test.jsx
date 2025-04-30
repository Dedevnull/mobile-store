import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Loader } from '../../src/components/Loader';

describe('Loader', () => {
    test('should render with role="status"', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });