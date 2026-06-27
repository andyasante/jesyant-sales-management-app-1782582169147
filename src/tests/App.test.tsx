import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders the application title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Sales Management App/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the navigation bar', () => {
    render(<App />);
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

  test('renders the product list component', () => {
    render(<App />);
    const productListElement = screen.getByText(/Product Inventory/i);
    expect(productListElement).toBeInTheDocument();
  });

  test('renders the sales report component', () => {
    render(<App />);
    const salesReportElement = screen.getByText(/Sales Report/i);
    expect(salesReportElement).toBeInTheDocument();
  });
});