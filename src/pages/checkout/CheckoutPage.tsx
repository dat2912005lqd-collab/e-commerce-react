import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ customerName: user?.name || '', phone: '', address: '', note: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.address) {
      return setError('Vui lòng điền đầy đủ thông tin');
    }
    if (!/^\d{9,11}$/.test(form.phone.replace(/\s/g, ''))) {
      return setError('SĐT phải có 9-11 chữ số');
    }

    const orderId = Math.random().toString(36).substr(2, 9);
    navigate(`/order-success/${orderId}`);
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl grid md:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Thông tin nhận hàng</h2>
        <input name="customerName" value={form.customerName} onChange={(e) => setForm({...form, customerName: e.target.value})} className="w-full p-2 border rounded mb-3" placeholder="Họ tên *" required />
        <input name="phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full p-2 border rounded mb-3" placeholder="SĐT *" required />
        <input name="address" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full p-2 border rounded mb-3" placeholder="Địa chỉ *" required />
        <textarea name="note" value={form.note} onChange={(e) => setForm({...form, note: e.target.value})} className="w-full p-2 border rounded mb-3" rows={2} placeholder="Ghi chú" />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Xác nhận đặt hàng</button>
      </form>
      <div className="bg-gray-50 p-4 rounded shadow h-fit">
        <h3 className="font-bold">Đơn hàng</h3>
        {items.map((item: any) => <div key={item.productId} className="flex justify-between text-sm py-1"><span>{item.title} x{item.qty}</span><span>${item.price * item.qty}</span></div>)}
        <div className="font-bold text-lg border-t pt-2 mt-2 flex justify-between"><span>Tổng</span><span>${subtotal}</span></div>
      </div>
    </div>
  );
};

export default CheckoutPage;