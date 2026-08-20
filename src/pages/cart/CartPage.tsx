import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  CreditCard,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    discount, 
    shipping, 
    total,
    promoCode,
    promoDiscountPercent,
    applyPromoCode
  } = useCart();

  const { user } = useAuth();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; message: string } | null>(null);
  
  // Checkout Modal State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    address: '123 Fake Store Avenue',
    city: 'San Francisco',
    zip: '94103',
  });

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage(res);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      clearCart();
    }, 1200);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 text-slate-900 dark:text-slate-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Your Cart is Empty
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Looks like you haven't added any products to your cart yet. Explore our Platzi Fake Store catalog to get started!
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Review items, apply promo codes, and complete simulated checkout.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear All Items
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              {items.map(({ product, quantity, selectedImage }) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-slate-100 dark:border-slate-800/80 last:border-0"
                >
                  {/* Image */}
                  <img
                    src={selectedImage || product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80'}
                    alt={product.title}
                    className="w-24 h-24 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 flex-shrink-0"
                  />

                  {/* Title & Category */}
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {product.category?.name}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="block font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-500 transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>
                    <div className="text-xs text-slate-400 font-mono">
                      ${product.price} each
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold font-mono">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Total for item */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-black text-slate-900 dark:text-emerald-400">
                      ${(product.price * quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-500 transition-colors pt-2"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Order Summary
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-emerald-500" /> Have a Coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Try PLATZI20 or FREESHIP"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs uppercase font-mono text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] font-medium ${
                      promoMessage.success ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {promoMessage.message}
                  </p>
                )}
                {promoCode && (
                  <div className="flex items-center justify-between text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-mono font-bold">
                    <span>Applied: {promoCode} (-{promoDiscountPercent}%)</span>
                    <span>✓</span>
                  </div>
                )}
              </form>

              {/* Price breakdown */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-bold">
                    <span>Promo Discount ({promoDiscountPercent}%)</span>
                    <span className="font-mono">-${discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Estimated Shipping</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {shipping === 0 ? <span className="text-emerald-500">FREE</span> : `$${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span>Total Due</span>
                  <span className="text-xl font-black text-emerald-500 font-mono">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <CreditCard className="w-4 h-4" /> Proceed to Checkout
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulated Safe Checkout</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            
            {orderComplete ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Order Confirmed!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Thank you for testing the Platzi Fake Store React application! Your simulated order of <strong className="text-emerald-500">${total}</strong> has been successfully processed.
                </p>
                <div className="pt-4">
                  <Link
                    to="/products"
                    onClick={() => setIsCheckingOut(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-[#0b132b] font-bold rounded-xl text-sm shadow-lg shadow-emerald-500/20"
                  >
                    Back to Catalog <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-500" /> Complete Order
                  </h3>
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleCompleteOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.zip}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs font-bold">
                    <span>Amount to Charge:</span>
                    <span className="text-emerald-500 font-mono text-base">${total}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b132b] font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
                  >
                    Confirm & Pay (${total})
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
