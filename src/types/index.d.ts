export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  date: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'staff';
}

export interface Customer {
  id: number;
  name: string;
  contactInfo: string;
}

export interface DashboardData {
  totalSales: number;
  totalProducts: number;
  totalCustomers: number;
}