import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

vi.mock('@hooks/useMemo', () => ({
    useMemo: (fn: any) => fn(),
}));

describe('Button', () => {
    test('Should be defined', () => {
        expect(Button).toBeDefined();
    });
    test('should render the button with label', () => {
        render(<Button label="Test" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});