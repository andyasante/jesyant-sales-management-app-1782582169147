import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

export const InventoryManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const handleAddProduct = (product: Product) => {
    addProduct(product);
  };

  const handleUpdateProduct = (product: Product) => {
    updateProduct(product);
  };

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId);
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.quantity}
            <button onClick={() => handleUpdateProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Add Product Form Component can be included here */}
    </div>
  );
};