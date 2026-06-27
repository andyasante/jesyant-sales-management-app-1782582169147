import { useEffect, useState } from 'react';

const STORAGE_KEY = 'salesData';

export const useSales = () => {
  const [sales, setSales] = useState(() => {
    const storedSales = localStorage.getItem(STORAGE_KEY);
    return storedSales ? JSON.parse(storedSales) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  }, [sales]);

  const addSale = (sale) => {
    setSales((prevSales) => [...prevSales, sale]);
  };

  const removeSale = (index) => {
    setSales((prevSales) => prevSales.filter((_, i) => i !== index));
  };

  return { sales, addSale, removeSale };
};