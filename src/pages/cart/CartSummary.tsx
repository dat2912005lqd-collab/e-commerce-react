interface CartSummaryProps {
  subtotal: number;
}

const CartSummary = ({ subtotal }: CartSummaryProps) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-bold text-lg">Tóm tắt</h3>
    <div className="flex justify-between py-2 border-b"><span>Tạm tính</span><span>${subtotal}</span></div>
    <div className="flex justify-between font-bold text-lg py-2"><span>Tổng</span><span>${subtotal}</span></div>
  </div>
);

export default CartSummary;