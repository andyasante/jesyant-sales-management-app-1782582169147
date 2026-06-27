import React, { useState } from 'react';
import { Customer } from '../types';

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addCustomer = () => {
    const newCustomer: Customer = { id: Date.now(), name, email };
    setCustomers([...customers, newCustomer]);
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>Customer Management</h2>
      <form onSubmit={(e) => { e.preventDefault(); addCustomer(); }}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Customer Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add Customer</button>
      </form>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
};