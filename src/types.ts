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
  total: number;
  date: string;
}

export interface Customer {
  id: number;
  name: string;
  contact: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}