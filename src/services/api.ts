import { Product, Sale } from '../types'

const API_URL = 'http://localhost:5000/api'

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export const fetchSales = async (): Promise<Sale[]> => {
  const response = await fetch(`${API_URL}/sales`)
  if (!response.ok) {
    throw new Error('Failed to fetch sales')
  }
  return response.json()
}

export const createSale = async (sale: Sale): Promise<Sale> => {
  const response = await fetch(`${API_URL}/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sale),
  })
  if (!response.ok) {
    throw new Error('Failed to create sale')
  }
  return response.json()
}

export const updateSale = async (saleId: string, sale: Sale): Promise<Sale> => {
  const response = await fetch(`${API_URL}/sales/${saleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sale),
  })
  if (!response.ok) {
    throw new Error('Failed to update sale')
  }
  return response.json()
}

export const deleteSale = async (saleId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/sales/${saleId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete sale')
  }
}