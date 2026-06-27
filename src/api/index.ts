import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchSalesReport = async () => {
  const response = await axios.get(`${API_URL}/sales/report`);
  return response.data;
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const fetchCustomers = async () => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};