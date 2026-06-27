import React from 'react';

interface Sale {
  productName: string;
  amount: number;
  date: string;
}

interface SalesListProps {
  sales: Sale[];
}

export const SalesList: React.FC<SalesListProps> = ({ sales }) => {
  if (!Array.isArray(sales) || sales.length === 0) {
    return <div className="text-red-500">No sales data available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sales List</h2>
      <ul className="space-y-2">
        {sales.map((sale, index) => (
          <li key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-semibold">{sale.productName}</span>
              <span className="text-gray-600">{sale.amount} GHS</span>
            </div>
            <div className="text-gray-500">{sale.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};