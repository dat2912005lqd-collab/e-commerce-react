import { useCart } from '../../hooks/useCart';
import CartList from './CartList';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items, subtotal, clearCart } = useCart();

  if (!items.length) return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold">Giỏ hàng trống</h2>
      <Link to="/products" className="text-blue-500 mt-4 inline-block">Tiếp tục mua sắm</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2"><CartList items={items} /></div>
      <div>
        <CartSummary subtotal={subtotal} />
        <Link to="/checkout" className="block w-full bg-green-500 text-white py-2 rounded text-center mt-4">Thanh toán</Link>
        <button onClick={clearCart} className="w-full bg-red-500 text-white py-2 rounded mt-2">Xóa giỏ</button>
      </div>
    </div>
  );
};

export default CartPage;