import { useState, useEffect } from 'react';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../utils/api';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const addCustomer = async (customer) => {
    try {
      const newCustomer = await createCustomer(customer);
      setCustomers((prev) => [...prev, newCustomer]);
    } catch (err) {
      setError(err);
    }
  };

  const editCustomer = async (customer) => {
    try {
      const updatedCustomer = await updateCustomer(customer);
      setCustomers((prev) =>
        prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
      );
    } catch (err) {
      setError(err);
    }
  };

  const removeCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    } catch (err) {
      setError(err);
    }
  };

  return { customers, loading, error, addCustomer, editCustomer, removeCustomer };
};