export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
  updatedAt?: string;
  rating?: number;
  stock?: number;
  slug?:string;
  discountPercentage?: number;
  categoryId?: number;
}

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedImage?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiLog {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  timestamp: string;
  status: number;
  durationMs: number;
}
export * from './products';
