declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Sale {
  id: number;
  productId: number;
  customerId: number;
  quantity: number;
  totalPrice: number;
  date: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: number;
  email: string;
  role: 'admin' | 'staff';
}