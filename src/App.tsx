import { SalesList } from './SalesList'
import { AddSaleForm } from './AddSaleForm'
import { useSales } from './hooks/useSales'

export const App = () => {
  const { sales, addSale } = useSales()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Management App</h1>
      <AddSaleForm addSale={addSale} />
      {sales.length > 0 ? (
        <SalesList sales={sales} />
      ) : (
        <p className="text-gray-600">No sales recorded yet.</p>
      )}
    </div>
  )
}