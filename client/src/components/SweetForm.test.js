/* eslint-env jest */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SweetForm from './SweetForm';

describe('SweetForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
    render(<SweetForm onSubmit={mockSubmit} />);
  });

  it('renders form fields', () => {
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByTestId('category-select')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Add Sweet')).toBeInTheDocument();
  });

  it('submits form with correct data', () => {
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Kaju Katli' }
    });
    fireEvent.change(screen.getByTestId('category-select'), {
      target: { value: 'Nut-Based' }
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '50' }
    });
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '20' }
    });

    fireEvent.click(screen.getByText('Add Sweet'));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    });
  });

  it('resets form after submission', () => {
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Kaju Katli' }
    });
    fireEvent.change(screen.getByTestId('category-select'), {
      target: { value: 'Nut-Based' }
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '50' }
    });
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '20' }
    });

    fireEvent.click(screen.getByText('Add Sweet'));

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByTestId('category-select')).toHaveValue('');
    expect(screen.getByLabelText('Price')).toHaveValue(null);
    expect(screen.getByLabelText('Quantity')).toHaveValue(null);
  });
});
