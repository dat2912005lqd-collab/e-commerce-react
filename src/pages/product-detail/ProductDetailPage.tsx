import React, {useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Code, 
  Layers, 
  Share2, 
  Sparkles 
} from 'lucide-react';
import { PlatziApi } from '../../services/api';
import { Product } from '../../types/index';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [showJsonInspector, setShowJsonInspector] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      setSelectedImageIndex(0);
      setQuantity(1);
      try {
        const data = await PlatziApi.getProductById(id);
        setProduct(data);
        // fetch related
        if (data.category?.id) {
          const related = await PlatziApi.getProductsByCategory(data.category.id);
          setRelatedProducts(related.filter((p) => p.id !== data.id).slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-slate-500">Loading product from Platzi API...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Not Found</h2>
          <p className="text-xs text-slate-400">The requested product #{id} does not exist or was removed.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-[#0b132b] font-bold rounded-xl text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const activeImage = product.images[selectedImageIndex] || product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

  const handleAddToCart = () => {
    addToCart(product, quantity, activeImage);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, activeImage);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation & Endpoint Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
          </Link>
          <ApiEndpointBadge method="GET" endpoint={`/api/v1/products/${product.id}`} />
        </div>

        {/* Main Product Presentation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 relative">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-2.5 py-1 rounded-lg">
                  ID: #{product.id}
                </span>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-emerald-500 scale-105 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Badge */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/category/${product.category?.id}`}
                    className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                  >
                    {product.category?.name || 'Catalog Item'}
                  </Link>
                  <span className="text-xs text-slate-400 font-mono">
                    Stock: {product.stock || 25} available
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {product.title}
                </h1>

                {/* Rating & Social Proof */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {product.rating?.toFixed(1) || '4.8'}
                    </span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    128 verified customer reviews
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <div className="text-3xl font-black text-slate-900 dark:text-emerald-400">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                    Official Platzi Listing
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold font-mono">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] shadow-emerald-500/20'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-xl font-bold text-sm bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 transition-all active:scale-95"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Value Props & API inspector toggle */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-500" /> Free Global Delivery
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-500" /> 30-Day Return Guarantee
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowJsonInspector(!showJsonInspector)}
                    className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 font-mono"
                  >
                    <Code className="w-3.5 h-3.5" />
                    {showJsonInspector ? 'Hide Raw API JSON' : 'Inspect Raw Platzi API JSON'}
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Collapsible API JSON Inspector */}
          {showJsonInspector && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="bg-[#070d1e] rounded-2xl p-4 border border-slate-800 text-xs font-mono overflow-x-auto text-emerald-300">
                <div className="text-slate-400 mb-2 font-bold flex items-center justify-between">
                  <span>GET https://api.escuelajs.co/api/v1/products/{product.id}</span>
                  <span className="text-emerald-400">Status 200 OK</span>
                </div>
                <pre>{JSON.stringify(product, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                More in <span className="text-emerald-500">{product.category?.name}</span>
              </h3>
              <Link
                to={`/category/${product.category?.id}`}
                className="text-xs font-semibold text-emerald-500 hover:underline"
              >
                View Category Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
