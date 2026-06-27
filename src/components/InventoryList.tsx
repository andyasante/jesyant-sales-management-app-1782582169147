import React from 'react';
import { useInventory } from '../hooks/useInventory';

export const InventoryList = () => {
  const { inventory, removeInventoryItem } = useInventory();

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => removeInventoryItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};