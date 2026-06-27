import React from 'react';
import { useProducts } from '../hooks/useProducts';

export const ProductList = () => {
  const { products } = useProducts();

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} GHS
          </li>
        ))}
      </ul>
    </div>
  );
};