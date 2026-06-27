import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSale } from '../redux/productSlice';
import './SaleForm.css';

const SaleForm: React.FC = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || quantity <= 0 || !customerName) {
      setError('All fields are required and quantity must be greater than zero.');
      return;
    }
    setError('');

    const saleData = {
      productId,
      quantity,
      customerName,
    };

    try {
      await dispatch(createSale(saleData)).unwrap();
      setProductId('');
      setQuantity(1);
      setCustomerName('');
    } catch (err) {
      setError('Failed to process sale. Please try again.');
    }
  };

  return (
    <div className="sale-form">
      <h2>Process Sale</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Sale</button>
      </form>
    </div>
  );
};

export default SaleForm;