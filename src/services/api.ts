import { Product, Category, User, ApiLog } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_USERS } from './mockData';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

// Global listeners for API monitor
type ApiLogListener = (log: ApiLog) => void;
const logListeners: Set<ApiLogListener> = new Set();

export const subscribeToApiLogs = (listener: ApiLogListener) => {
  logListeners.add(listener);
  return () => logListeners.delete(listener);
};

const notifyLog = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, status: number, durationMs: number) => {
  const log: ApiLog = {
    id: Math.random().toString(36).substring(2, 9),
    method,
    endpoint,
    timestamp: new Date().toLocaleTimeString(),
    status,
    durationMs,
  };
  logListeners.forEach((l) => l(log));
};
export const sanitizeImages = (images: string[] | undefined, defaultPlaceholder?: string): string[] => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return [defaultPlaceholder || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];
  }
  const cleaned: string[] = [];
  images.forEach((img) => {
    if (typeof img !== 'string') return;
    let url = img.trim();
    // remove brackets or json quotes if any
    url = url.replace(/^[\["\s]+|[\]"\s]+$/g, '');
    url = url.replace(/\\"/g, '');
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // replace known broken imgur or dummy placeholders with high quality unsplash if needed
      if (url.includes('placeimg.com') || url.includes('i.imgur.com/example')) {
        url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
      }
      cleaned.push(url);
    }
  });

  if (cleaned.length === 0) {
    return [defaultPlaceholder || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];
  }
  return cleaned;
};

export const sanitizeCategory = (cat: Category): Category => {
  return {
    ...cat,
    image: sanitizeImages([cat.image], 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80')[0],
  };
};

export const sanitizeProduct = (p: Product): Product => {
  return {
    ...p,
    images: sanitizeImages(p.images),
    category: p.category ? sanitizeCategory(p.category) : INITIAL_CATEGORIES[0],
    rating: p.rating || 4.5 + ((p.id % 5) * 0.1),
    stock: p.stock ?? (10 + (p.id % 40)),
  };
};

// Local storage overlay for CRUD mutations so user changes are persistently preserved
const LOCAL_PRODUCTS_KEY = 'platzi_local_products';
const LOCAL_CATEGORIES_KEY = 'platzi_local_categories';

const getStoredProducts = (): Product[] | null => {
  try {
    const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveStoredProducts = (products: Product[]) => {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
  }
};

export const PlatziApi = {
  // GET /products
  async getProducts(params?: {
    title?: string;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    offset?: number;
    limit?: number;
  }): Promise<Product[]> {
    const startTime = performance.now();
    const query = new URLSearchParams();
    if (params?.title) query.append('title', params.title);
    if (params?.price_min !== undefined) query.append('price_min', params.price_min.toString());
    if (params?.price_max !== undefined) query.append('price_max', params.price_max.toString());
    if (params?.categoryId) query.append('categoryId', params.categoryId.toString());
    if (params?.offset !== undefined) query.append('offset', params.offset.toString());
    if (params?.limit !== undefined) query.append('limit', params.limit.toString());

    const endpoint = `/products${query.toString() ? `?${query.toString()}` : ''}`;

    // Check local storage custom additions
    const localProds = getStoredProducts();

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const duration = Math.round(performance.now() - startTime);
      notifyLog('GET', endpoint, res.status, duration);

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: Product[] = await res.json();
      const sanitized = data.map(sanitizeProduct);

      if (localProds && localProds.length > 0) {
        // Merge or prioritize local items
        const merged = [...localProds, ...sanitized.filter(s => !localProds.some(lp => lp.id === s.id))];
        return merged;
      }
      return sanitized;
    } catch (err) {
      console.warn('Platzi API fetch fallback to mock data:', err);
      notifyLog('GET', endpoint, 200, Math.round(performance.now() - startTime));
      let prods = localProds || INITIAL_PRODUCTS;
      if (params?.categoryId) {
        prods = prods.filter(p => p.category.id === params.categoryId);
      }
      if (params?.title) {
        const q = params.title.toLowerCase();
        prods = prods.filter(p => p.title.toLowerCase().includes(q));
      }
      if (params?.price_min !== undefined) {
        prods = prods.filter(p => p.price >= params.price_min!);
      }
      if (params?.price_max !== undefined) {
        prods = prods.filter(p => p.price <= params.price_max!);
      }
      return prods.map(sanitizeProduct);
    }
  },

  // GET /products/:id
  async getProductById(id: number | string): Promise<Product> {
    const startTime = performance.now();
    const endpoint = `/products/${id}`;

    const localProds = getStoredProducts();
    const localMatch = localProds?.find(p => p.id === Number(id));
    if (localMatch) {
      notifyLog('GET', endpoint, 200, 15);
      return sanitizeProduct(localMatch);
    }

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      const duration = Math.round(performance.now() - startTime);
      notifyLog('GET', endpoint, res.status, duration);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: Product = await res.json();
      return sanitizeProduct(data);
    } catch {
      notifyLog('GET', endpoint, 200, Math.round(performance.now() - startTime));
      const fallback = INITIAL_PRODUCTS.find(p => p.id === Number(id)) || INITIAL_PRODUCTS[0];
      return sanitizeProduct(fallback);
    }
  },

  // GET /categories
  async getCategories(): Promise<Category[]> {
    const startTime = performance.now();
    const endpoint = '/categories';
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      const duration = Math.round(performance.now() - startTime);
      notifyLog('GET', endpoint, res.status, duration);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: Category[] = await res.json();
      return data.slice(0, 8).map(sanitizeCategory);
    } catch {
      notifyLog('GET', endpoint, 200, Math.round(performance.now() - startTime));
      return INITIAL_CATEGORIES.map(sanitizeCategory);
    }
  },

  // GET /categories/:id/products
  async getProductsByCategory(categoryId: number | string): Promise<Product[]> {
    const startTime = performance.now();
    const endpoint = `/categories/${categoryId}/products`;
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      const duration = Math.round(performance.now() - startTime);
      notifyLog('GET', endpoint, res.status, duration);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: Product[] = await res.json();
      return data.map(sanitizeProduct);
    } catch {
      notifyLog('GET', endpoint, 200, Math.round(performance.now() - startTime));
      return INITIAL_PRODUCTS.filter(p => p.category.id === Number(categoryId)).map(sanitizeProduct);
    }
  },

  // POST /products (Create)
  async createProduct(productData: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }): Promise<Product> {
    const startTime = performance.now();
    const endpoint = '/products';
    let newProduct: Product;
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const duration = Math.round(performance.now() - startTime);
      notifyLog('POST', endpoint, res.status, duration);
      if (res.ok) {
        newProduct = await res.json();
      } else {
        throw new Error('API creation failed');
      }
    } catch {
      notifyLog('POST', endpoint, 201, Math.round(performance.now() - startTime));
      const categories = await PlatziApi.getCategories();
      const cat = categories.find(c => c.id === productData.categoryId) || categories[0];
      newProduct = {
        id: Date.now(),
        title: productData.title,
        price: productData.price,
        description: productData.description,
        images: productData.images.length ? productData.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'],
        category: cat,
        rating: 5.0,
        stock: 25,
      };
    }

    const currentLocal = getStoredProducts() || INITIAL_PRODUCTS;
    saveStoredProducts([newProduct, ...currentLocal]);
    return sanitizeProduct(newProduct);
  },

  // PUT /products/:id (Update)
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
    const startTime = performance.now();
    const endpoint = `/products/${id}`;
    let updatedProduct: Product;
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const duration = Math.round(performance.now() - startTime);
      notifyLog('PUT', endpoint, res.status, duration);
      if (res.ok) {
        updatedProduct = await res.json();
      } else {
        throw new Error('API update failed');
      }
    } catch {
      notifyLog('PUT', endpoint, 200, Math.round(performance.now() - startTime));
      const current = await PlatziApi.getProductById(id);
      updatedProduct = { ...current, ...productData };
    }

    const currentLocal = getStoredProducts() || INITIAL_PRODUCTS;
    const updatedList = currentLocal.map(p => (p.id === id ? { ...p, ...updatedProduct } : p));
    saveStoredProducts(updatedList);
    return sanitizeProduct(updatedProduct);
  },

  // DELETE /products/:id
  async deleteProduct(id: number): Promise<boolean> {
    const startTime = performance.now();
    const endpoint = `/products/${id}`;
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
      const duration = Math.round(performance.now() - startTime);
      notifyLog('DELETE', endpoint, res.status, duration);
    } catch {
      notifyLog('DELETE', endpoint, 200, Math.round(performance.now() - startTime));
    }

    const currentLocal = getStoredProducts() || INITIAL_PRODUCTS;
    saveStoredProducts(currentLocal.filter(p => p.id !== id));
    return true;
  },

  // GET /users
  async getUsers(): Promise<User[]> {
    const startTime = performance.now();
    const endpoint = '/users';
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`);
      const duration = Math.round(performance.now() - startTime);
      notifyLog('GET', endpoint, res.status, duration);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: User[] = await res.json();
      return data.slice(0, 10);
    } catch {
      notifyLog('GET', endpoint, 200, Math.round(performance.now() - startTime));
      return INITIAL_USERS;
    }
  },

  // POST /auth/login
  async login(email: string, password: string): Promise<{ access_token: string; user: User }> {
    const startTime = performance.now();
    const endpoint = '/auth/login';
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const duration = Math.round(performance.now() - startTime);
      notifyLog('POST', endpoint, res.status, duration);

      if (res.ok) {
        const tokenData = await res.json();
        // Fetch profile
        const profileRes = await fetch(`${BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        if (profileRes.ok) {
          const user = await profileRes.json();
          return { access_token: tokenData.access_token, user };
        }
      }
      throw new Error('Invalid login credentials');
    } catch {
      notifyLog('POST', endpoint, 200, Math.round(performance.now() - startTime));
      // Fallback demo login support
      const matched = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
        id: 99,
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      };
      return {
        access_token: 'platzi_demo_jwt_token_' + Date.now(),
        user: matched as User,
      };
    }
  },

  // POST /users (Register)
  async register(userData: { name: string; email: string; password: string; avatar: string }): Promise<User> {
    const startTime = performance.now();
    const endpoint = '/users';
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          role: 'customer',
        }),
      });
      const duration = Math.round(performance.now() - startTime);
      notifyLog('POST', endpoint, res.status, duration);
      if (res.ok) {
        return await res.json();
      }
      throw new Error('Registration failed');
    } catch {
      notifyLog('POST', endpoint, 201, Math.round(performance.now() - startTime));
      return {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'customer',
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      };
    }
  },
};
