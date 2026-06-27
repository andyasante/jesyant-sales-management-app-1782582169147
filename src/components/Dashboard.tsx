import React from 'react';
import { useProducts } from '../hooks/useProducts';

export const Dashboard = ({ products }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Sales Analytics</h2>
      <div>
        <h3>Product List</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.price} GHS
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};