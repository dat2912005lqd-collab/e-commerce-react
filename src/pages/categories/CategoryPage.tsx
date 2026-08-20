import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, ArrowLeft, Grid, PackageCheck } from 'lucide-react';
import { PlatziApi } from '../../services/api';
import { Category, Product } from '../../types';
import  ProductCard from '../../components/product/ProductCard';
import { ApiEndpointBadge } from '../../components/common/ApiEndpointBadge';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // Load all categories
  useEffect(() => {
    PlatziApi.getCategories().then((cats) => {
      setCategories(cats);
      if (id) {
        const found = cats.find((c) => c.id === Number(id));
        setActiveCategory(found || null);
      }
    });
  }, [id]);

  // Load products for category if ID is present
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        if (id) {
          const prods = await PlatziApi.getProductsByCategory(id);
          setProducts(prods);
        }
      } catch (err) {
        console.error('Failed to load category products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [id]);

  // If no ID is passed, show All Categories Grid
  if (!id) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" /> Taxonomy & Groupings
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Product Categories
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Browse our entire product catalog organized by Platzi Fake Store categories.
              </p>
            </div>
            <ApiEndpointBadge method="GET" endpoint="/api/v1/categories" />
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                    <span className="text-xs font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      Category ID #{cat.id}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Explore collection</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-[#0b132b] transition-all">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // Otherwise, render specific Category products
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb & Endpoint badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Categories
          </Link>
          <ApiEndpointBadge method="GET" endpoint={`/api/v1/categories/${id}/products`} />
        </div>

        {/* Category Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0b132b] text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
              Category #{id}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {activeCategory?.name || `Category ${id}`}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Browse all items cataloged under {activeCategory?.name || 'this department'}. Real-time items queried from Platzi Fake Store API.
            </p>
          </div>

          {activeCategory?.image && (
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
              <img src={activeCategory.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Category Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                Number(id) === cat.id
                  ? 'bg-emerald-500 text-[#0b132b] border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
                <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-3">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No products found in this category
            </h3>
            <p className="text-xs text-slate-400">Try selecting another department above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
