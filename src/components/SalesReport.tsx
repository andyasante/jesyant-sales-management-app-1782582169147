import React from 'react';
import { useSales } from '../hooks/useSales';

export const SalesReport = () => {
  const { salesData, loading, error } = useSales();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading sales data: {error.message}</div>;
  }

  return (
    <div>
      <h2>Sales Report</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>{sale.productName}</td>
              <td>{sale.quantity}</td>
              <td>{sale.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};