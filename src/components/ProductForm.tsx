import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export const ProductForm = ({ product }) => {
  const { addProduct, updateProduct } = useProducts();
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [quantity, setQuantity] = useState(product ? product.quantity : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, price, quantity };
    if (product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
    }
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};