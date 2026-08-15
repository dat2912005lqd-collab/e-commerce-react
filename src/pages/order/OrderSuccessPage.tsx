import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Order {
  id: string;
  customerName: string;
  address: string;
  subtotal: number;
}

const OrderSuccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order] = useState<Order | null>(id ? {
    id,
    customerName: 'Khách hàng',
    address: 'Địa chỉ nhận hàng',
    subtotal: 0
  } : null);

  if (!order) return <div className="text-center py-8">Không tìm thấy đơn hàng</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
      <div className="bg-green-100 p-4 rounded mb-6"><h2 className="text-2xl font-bold">Đặt hàng thành công!</h2></div>
      <div className="bg-white p-6 rounded shadow text-left">
        <p><strong>Mã đơn:</strong> {order.id}</p>
        <p><strong>Người nhận:</strong> {order.customerName}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <div className="border-t mt-4 pt-4"><strong>Tổng:</strong> ${order.subtotal}</div>
      </div>
      <Link to="/" className="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded">Tiếp tục mua sắm</Link>
    </div>
  );
};

export default OrderSuccessPage;