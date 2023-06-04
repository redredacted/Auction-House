import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
    test('Should be defined', () => {
        expect(Button).toBeDefined();
    });
    test('should render the button with label', () => {
        render(<Button label="Test" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});