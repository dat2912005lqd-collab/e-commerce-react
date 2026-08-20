import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Providers & Layout
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import   { Navbar } from './components/layout/Navbar';
import  Footer from './components/layout/Footer';
import Toast from './components/common/Toast';

// Import pages
import HomePage  from './pages/HomePage';
import {LoginPage} from './pages/auth/LoginPage';
import {RegisterPage } from './pages/auth/RegisterPage';
import {AdminPage} from './pages/admin/AdminPage';
import {ProductsPage}  from './pages/products/ProductsPage';
import  {ProductDetailPage } from './pages/product-detail/ProductDetailPage';
import  {CartPage } from './pages/cart/CartPage';
import  {CategoryPage}  from './pages/categories/CategoryPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-[#0b132b]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
