import React ,{ useState, useEffect} from 'react';
import { 
  ShieldCheck, 
  Package, 
  Layers, 
  Users, 
  Activity, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ExternalLink,
  Terminal,
  RefreshCw
} from 'lucide-react';
import { PlatziApi, subscribeToApiLogs } from '../../services/api';
import { Product, Category, User, ApiLog } from '../../types';
import {ApiEndpointBadge} from '../../components/common/ApiEndpointBadge';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'users' | 'logs'>('products');
  
  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form state for Product creation/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: 99,
    description: '',
    categoryId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Subscribe to live API network logs
  useEffect(() => {
    const unsubscribe = subscribeToApiLogs((newLog) => {
      setLogs((prev) => [newLog, ...prev.slice(0, 30)]);
    });
    return unsubscribe;
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [p, c, u] = await Promise.all([
        PlatziApi.getProducts({ limit: 50 }),
        PlatziApi.getCategories(),
        PlatziApi.getUsers(),
      ]);
      setProducts(p);
      setCategories(c);
      setUsers(u);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      price: 99,
      description: '',
      categoryId: categories[0]?.id || 1,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category?.id || 1,
      imageUrl: product.images[0] || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm(`Delete product #${id}? This will execute DELETE /api/v1/products/${id}`)) {
      await PlatziApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      if (editingProduct) {
        // UPDATE
        const updated = await PlatziApi.updateProduct(editingProduct.id, {
          title: formData.title,
          price: Number(formData.price),
          description: formData.description,
          images: [formData.imageUrl],
        });
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        // CREATE
        const created = await PlatziApi.createProduct({
          title: formData.title,
          price: Number(formData.price),
          description: formData.description,
          categoryId: Number(formData.categoryId),
          images: [formData.imageUrl],
        });
        setProducts((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-[#0b132b] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> Platzi Fake Store Admin & CRUD Playground
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              API Management Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Perform live Create, Read, Update, and Delete operations against Platzi Fake Store API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>

            <button
              onClick={openCreateModal}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" /> Create Product
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Total Products</span>
              <Package className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {products.length}
            </div>
            <span className="text-[11px] text-emerald-500 font-mono">GET /products</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Categories</span>
              <Layers className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {categories.length}
            </div>
            <span className="text-[11px] text-blue-500 font-mono">GET /categories</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Active Users</span>
              <Users className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {users.length}
            </div>
            <span className="text-[11px] text-amber-500 font-mono">GET /users</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>API Calls Logged</span>
              <Activity className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {logs.length}
            </div>
            <span className="text-[11px] text-rose-500 font-mono">Real-time Monitor</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" /> Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'users'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'border-emerald-500 text-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" /> Live REST Activity Monitor ({logs.length})
          </button>
        </div>

        {/* TAB 1: PRODUCTS CRUD */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Products Listing & Mutation Controls
              </span>
              <ApiEndpointBadge method="POST / PUT / DELETE" endpoint="/api/v1/products" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80'}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                        />
                        <div className="max-w-xs">
                          <p className="font-bold text-slate-900 dark:text-white truncate">{p.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{p.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                          {p.category?.name || 'General'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-500">
                        ${p.price}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">
                        #{p.id}
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-mono text-emerald-500">ID #{cat.id}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{cat.name}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">/categories/{cat.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: USERS */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Platzi Fake Store API Registered Users
              </span>
              <ApiEndpointBadge method="GET" endpoint="/api/v1/users" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">User ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border border-emerald-500/30"
                        />
                        <span className="font-bold text-slate-900 dark:text-white">{u.name}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                        {u.email}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'admin'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">
                        #{u.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE REST API ACTIVITY LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-[#070d1e] text-slate-300 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">Real-time HTTP Request Stream</span>
              </div>
              <span className="text-[11px] text-slate-500">Auto-logging all applet REST operations</span>
            </div>

            {logs.length === 0 ? (
              <p className="text-slate-500 py-6 text-center">
                Waiting for API requests... Navigate pages, add items, or perform actions to see live traffic!
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          log.method === 'GET'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : log.method === 'POST'
                            ? 'bg-blue-500/20 text-blue-400'
                            : log.method === 'PUT'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {log.method}
                      </span>
                      <span className="text-slate-200">{log.endpoint}</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <span className="text-emerald-400">Status {log.status}</span>
                      <span>{log.durationMs}ms</span>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Product Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingProduct ? `Edit Product #${editingProduct.id}` : 'Create New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Classic Cotton T-Shirt"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the product..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] font-bold shadow-lg shadow-emerald-500/20"
                >
                  {formSubmitting ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
