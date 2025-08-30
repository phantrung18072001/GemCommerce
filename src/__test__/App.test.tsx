import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

let container: HTMLElement;

describe('App Component', () => {
  beforeEach(() => {
    ({ container } = render(<App />));
  });

  it('renders correctly', async () => {
    await waitFor(() => {
      expect(container).toMatchSnapshot();
      expect(screen.getByText('Unit')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
    });
  });

  describe('Test Unit Field', () => {
    it('should display both % and px unit options', () => {
      const percentageRadio = screen.getByDisplayValue('PERCENTAGE');
      const pixelRadio = screen.getByDisplayValue('PIXEL');

      expect(percentageRadio).toBeInTheDocument();
      expect(pixelRadio).toBeInTheDocument();

      // Check labels
      expect(screen.getByText('%')).toBeInTheDocument();
      expect(screen.getByText('px')).toBeInTheDocument();
    });

    it('should allow switching between % and px units', async () => {
      const percentageRadio = screen.getByDisplayValue('PERCENTAGE');
      const pixelRadio = screen.getByDisplayValue('PIXEL');

      // % by default
      expect(percentageRadio).toBeChecked();
      expect(pixelRadio).not.toBeChecked();

      // Switch to px
      await userEvent.click(pixelRadio);
      expect(pixelRadio).toBeChecked();
      expect(percentageRadio).not.toBeChecked();

      // Switch back to %
      await userEvent.click(percentageRadio);
      expect(percentageRadio).toBeChecked();
      expect(pixelRadio).not.toBeChecked();
    });
  });

  describe('Test Value Field', () => {
    it('should allow integer and float values', async () => {
      const inputElement = screen.getByTestId('number-input');
      await userEvent.type(inputElement, '12');
      fireEvent.blur(inputElement);
      expect(inputElement).toHaveValue('12');

      await userEvent.clear(inputElement);
      await userEvent.type(inputElement, '12.5');
      fireEvent.blur(inputElement);
      expect(inputElement).toHaveValue('12.5');
    });

    it('should replace comma with dot', async () => {
      const inputElement = screen.getByTestId('number-input');
      await userEvent.type(inputElement, '12,3');
      fireEvent.blur(inputElement);
      expect(inputElement).toHaveValue('12.3');
    });

    it('should remove non-numeric characters on blur', async () => {
      const pixelRadio = screen.getByDisplayValue('PIXEL');
      await userEvent.click(pixelRadio);
      const testCases = [
        { testInput: '123a', expected: '123' },
        { testInput: '12a3', expected: '12' },
        { testInput: 'a123', expected: '123' },
        { testInput: '12.4.5', expected: '12.4' },
      ];
      const inputElement = screen.getByTestId('number-input');

      for (const { testInput, expected } of testCases) {
        await userEvent.clear(inputElement);
        await userEvent.type(inputElement, testInput);
        fireEvent.blur(inputElement);
        expect(inputElement).toHaveValue(expected);
      }
    });

    it('should set value to 0 when input is less than 0', async () => {
      const input = screen.getByTestId('number-input');
      await userEvent.type(input, '-5');
      fireEvent.blur(input);
      expect(input).toHaveValue('0');
    });
  });

  describe('Percentage Unit Test', () => {
    it('should disable decrease button when value is 0', async () => {
      const input = screen.getByTestId('number-input');
      const decreaseBtn = screen.getByTestId('decrease-btn');

      await userEvent.clear(input);
      await userEvent.type(input, '0');
      fireEvent.blur(input);

      expect(decreaseBtn).toBeDisabled();
    });

    it('should update value to 100 when switching from px to % and current value > 100', async () => {
      const pixelRadio = screen.getByDisplayValue('PIXEL');
      await userEvent.click(pixelRadio);

      const input = screen.getByTestId('number-input');
      await userEvent.clear(input);
      await userEvent.type(input, '200');
      fireEvent.blur(input);
      expect(input).toHaveValue('200');

      const percentageRadio = screen.getByDisplayValue('PERCENTAGE');
      await userEvent.click(percentageRadio);

      expect(input).toHaveValue('100');
    });
  });
});
