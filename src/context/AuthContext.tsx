
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { PlatziApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; avatar: string }) => Promise<void>;
  logout: () => void;
  demoLogin: (role: 'admin' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'platzi_auth_user';
const AUTH_TOKEN_KEY = 'platzi_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    } catch (e) {
      console.error('Error syncing auth state', e);
    }
  }, [user, token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await PlatziApi.login(email, password);
      setUser(res.user);
      setToken(res.access_token);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string; avatar: string }) => {
    setIsLoading(true);
    try {
      const newUser = await PlatziApi.register(userData);
      setUser(newUser);
      setToken('platzi_token_' + Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      const adminUser: User = {
        id: 1,
        name: 'Platzi Admin',
        email: 'john@mail.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      };
      setUser(adminUser);
      setToken('platzi_demo_admin_token');
    } else {
      const customerUser: User = {
        id: 2,
        name: 'Maria Shopper',
        email: 'maria@mail.com',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      };
      setUser(customerUser);
      setToken('platzi_demo_customer_token');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin' || user?.email.includes('admin') || user?.email === 'john@mail.com';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        register,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = context(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
