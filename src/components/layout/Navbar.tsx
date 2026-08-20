import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut, 
  Layers, 
  Code2,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b132b] border-b border-slate-800 text-slate-100 shadow-md">
      {/* Top micro-bar for Platzi Fake Store API status */}
      <div className="bg-[#070d1e] text-xs text-slate-400 border-b border-slate-800/80 px-4 py-1.5 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Platzi Fake Store REST API: <code className="text-emerald-400 font-mono">api.escuelajs.co/api/v1</code></span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>API & CRUD Dashboard</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Free E-Commerce Playground</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-[#0b132b] font-black text-xl tracking-tighter">P</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Platzi
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded">
                  Store API
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline -mt-0.5">
                E-Commerce React Explorer
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, shoes, electronics..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-[#0b132b] text-xs font-semibold rounded-lg transition-colors"
                >
                  Go
                </button>
              )}
            </div>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-emerald-400 bg-slate-800/80 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/products')
                  ? 'text-emerald-400 bg-slate-800/80 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/categories') || isActive('/category')
                  ? 'text-emerald-400 bg-slate-800/80 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/admin"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/admin')
                  ? 'text-emerald-400 bg-slate-800/80 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Admin
            </Link>
          </nav>

          {/* Actions: Cart & User Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-[#0b132b] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Auth Button / User Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-400/50"
                  />
                  <span className="text-sm font-medium hidden sm:inline max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  {isAdmin && (
                    <span className="hidden md:inline bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                      ADMIN
                    </span>
                  )}
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded border border-emerald-500/30 uppercase">
                        Role: {user.role || 'customer'}
                      </span>
                    </div>

                    <Link
                      to="/admin"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Admin Dashboard
                    </Link>

                    <Link
                      to="/cart"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-slate-400" />
                      Shopping Cart ({itemCount})
                    </Link>

                    <div className="border-t border-slate-800 my-1"></div>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
          </form>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070d1e] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm ${
              isActive('/') && location.pathname === '/' ? 'text-emerald-400 bg-slate-800/80 font-bold' : 'text-slate-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm ${
              isActive('/products') ? 'text-emerald-400 bg-slate-800/80 font-bold' : 'text-slate-300'
            }`}
          >
            All Products
          </Link>
          <Link
            to="/categories"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm ${
              isActive('/categories') ? 'text-emerald-400 bg-slate-800/80 font-bold' : 'text-slate-300'
            }`}
          >
            Categories
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
              isActive('/admin') ? 'text-emerald-400 bg-slate-800/80 font-bold' : 'text-slate-300'
            }`}
          >
            <span>Admin Dashboard</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </Link>
          <Link
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-300 flex items-center justify-between"
          >
            <span>Shopping Cart</span>
            <span className="bg-emerald-500 text-[#0b132b] text-xs font-bold px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          </Link>

          {/* Fast Demo switcher */}
          <div className="pt-3 border-t border-slate-800">
            <p className="text-[11px] font-mono text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Quick Demo Role Switcher:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  demoLogin('admin');
                  setMobileMenuOpen(false);
                }}
                className="px-2 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-lg text-center"
              >
                Log as Admin
              </button>
              <button
                onClick={() => {
                  demoLogin('customer');
                  setMobileMenuOpen(false);
                }}
                className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg text-center"
              >
                Log as User
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
