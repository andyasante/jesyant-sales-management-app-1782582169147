import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'inventory';

export const useInventory = () => {
  const [inventory, setInventory] = useState(() => {
    const storedInventory = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedInventory ? JSON.parse(storedInventory) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (item: { id: number; name: string; quantity: number }) => {
    setInventory((prev) => [...prev, item]);
  };

  const editItem = (updatedItem: { id: number; name: string; quantity: number }) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const removeItem = (id: number) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  return { inventory, addItem, editItem, removeItem };
};