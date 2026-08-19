import { Outlet, Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'; // Cài heroicons: npm install @heroicons/react

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">ShopZone</Link>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
            <Link to="/login">
              <UserIcon className="h-6 w-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </header>
      {/* Nội dung trang */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2026 ShopZone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}