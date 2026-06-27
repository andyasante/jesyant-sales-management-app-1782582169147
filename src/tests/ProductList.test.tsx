import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';

describe('ProductList Component', () => {
  const mockProducts = [
    { id: 1, name: 'Aspirin', price: 5.0, quantity: 10 },
    { id: 2, name: 'Ibuprofen', price: 7.0, quantity: 15 },
  ];

  test('renders product list correctly', () => {
    render(<ProductList products={mockProducts} />);

    const productElements = screen.getAllByRole('listitem');
    expect(productElements).toHaveLength(mockProducts.length);
    
    mockProducts.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`Price: $${product.price}`)).toBeInTheDocument();
      expect(screen.getByText(`Quantity: ${product.quantity}`)).toBeInTheDocument();
    });
  });

  test('displays message when no products are available', () => {
    render(<ProductList products={[]} />);
    
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });
});