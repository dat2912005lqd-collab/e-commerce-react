import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  userId: number;
  subtotal: number;
  createdAt: string;
  address: string;
}

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) {
      // Fetch orders from localStorage or API
      setOrders([]);
    }
  }, [user?.id]);

  if (!user) return <div className="text-center py-8"><Link to="/login" className="text-blue-500">Đăng nhập</Link> để xem lịch sử</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Lịch sử đơn hàng</h2>
      {!orders.length ? <p>Chưa có đơn hàng</p> : orders.map(order => (
        <div key={order.id} className="border p-4 rounded mb-4 shadow">
          <div className="flex justify-between"><span className="font-bold">#{order.id}</span><span>${order.subtotal}</span></div>
          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
          <p className="text-sm">Địa chỉ: {order.address}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;