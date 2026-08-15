import { useCart } from '../../hooks/useCart';

interface CartItemType {
  productId: number;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQty, removeItem } = useCart();
  const { productId, title, price, image, qty } = item;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <img src={image || 'https://placehold.co/100x100'} alt={title} className="w-16 h-16 object-cover rounded" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">${price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => updateQty(productId, qty - 1)} className="px-2 border rounded">-</button>
        <span>{qty}</span>
        <button onClick={() => updateQty(productId, qty + 1)} className="px-2 border rounded">+</button>
        <button onClick={() => removeItem(productId)} className="text-red-500 ml-2">✕</button>
      </div>
    </div>
  );
};

export default CartItem;