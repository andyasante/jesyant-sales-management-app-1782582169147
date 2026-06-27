import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

export const OrderProcessing = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value;
    const product = products.find(p => p.id === productId) || null;
    setSelectedProduct(product);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedProduct) {
      // Process the order here
      console.log(`Order placed for ${quantity} of ${selectedProduct.name}`);
    }
  };

  return (
    <div>
      <h2>Order Processing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Product:
          <select onChange={handleProductChange} value={selectedProduct?.id || ''}>
            <option value="">--Select a product--</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};