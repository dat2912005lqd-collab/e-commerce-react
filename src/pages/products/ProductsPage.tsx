import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  RotateCcw, 
  PackageX, 
  Layers, 
  Sparkles
} from 'lucide-react';
import { PlatziApi } from '../../services/api';
import { Product, Category } from '../../types';
import  ProductCard from '../../components/product/ProductCard';
import  ProductFilter from '../../components/product/ProductFilter';
import { ApiEndpointBadge }  from '../../components/common/ApiEndpointBadge';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') ? Number(searchParams.get('category')) : null;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync url params if changed externally
  useEffect(() => {
    const s = searchParams.get('search');
    if (s !== null) setSearchQuery(s);
    const c = searchParams.get('category');
    if (c !== null) setSelectedCategory(Number(c));
  }, [searchParams]);

  // Load categories once
  useEffect(() => {
    PlatziApi.getCategories().then(setCategories).catch(console.error);
  }, []);

  // Fetch products with active filters
  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const data = await PlatziApi.getProducts({
          title: searchQuery || undefined,
          categoryId: selectedCategory || undefined,
          price_max: priceRange[1] < 1000 ? priceRange[1] : undefined,
        });
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchFiltered, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, priceRange]);

  // Sort products locally
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
    return 0; // featured default
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setPriceRange([0, 1000]);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleSelectCategory = (id: number | null) => {
    setSelectedCategory(id);
    if (id) {
      setSearchParams(prev => {
        prev.set('category', id.toString());
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.delete('category');
        return prev;
      });
    }
  };

  // Construct active API endpoint string
  const activeEndpoint = `/api/v1/products${
    selectedCategory ? `?categoryId=${selectedCategory}` : ''
  }${searchQuery ? `${selectedCategory ? '&' : '?'}title=${encodeURIComponent(searchQuery)}` : ''}${
    priceRange[1] < 1000 ? `${selectedCategory || searchQuery ? '&' : '?'}price_max=${priceRange[1]}` : ''
  }`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" /> Platzi Fake Store Catalog
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                All Products
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Search, filter, and inspect live REST data from Platzi Fake Store API.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <ApiEndpointBadge method="GET" endpoint={activeEndpoint} />
            </div>
          </div>

          {/* Search & Mobile Filter Toggle */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-[#0b132b] font-bold text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {mobileFilterOpen ? 'Hide Filters' : 'Filters'}
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Products List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filters Sidebar */}
          <div className={`lg:col-span-3 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <ProductFilter
              categories={categories}
              selectedCategoryId={selectedCategory}
              onSelectCategory={handleSelectCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={handleReset}
              totalProductsCount={sortedProducts.length}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* View Bar & Count */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span>
                Showing <strong className="text-slate-900 dark:text-slate-100">{sortedProducts.length}</strong> products
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    viewMode === 'list'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 animate-pulse space-y-3">
                    <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <PackageX className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No Products Found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  We couldn't find any products matching your active filters. Try clearing your search or resetting the price range.
                </p>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 items-center hover:border-emerald-500/50 hover:shadow-lg transition-all"
                  >
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'}
                      alt={product.title}
                      className="w-32 h-32 object-cover rounded-xl bg-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <span className="text-[11px] font-semibold uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {product.category?.name}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="text-lg font-black text-slate-900 dark:text-emerald-400">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
