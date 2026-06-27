import React, { useState } from 'react';
import { useSales } from '../hooks/useSales';

export const SaleTracker = () => {
  const { sales, addSale } = useSales();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleAddSale = () => {
    if (productId && quantity > 0) {
      addSale({ productId, quantity });
      setProductId('');
      setQuantity(0);
    }
  };

  return (
    <div>
      <h2>Sales Tracker</h2>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity Sold"
      />
      <button onClick={handleAddSale}>Add Sale</button>
      <h3>Sales List</h3>
      <ul>
        {sales.map((sale, index) => (
          <li key={index}>
            {sale.productId}: {sale.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};