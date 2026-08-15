import CartItem from './CartItem';

interface CartItemType {
  productId: number;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

interface CartListProps {
  items: CartItemType[];
}

const CartList = ({ items }: CartListProps) => (
    <div className="bg-white rounder-lg shadow overflow-hidden">
        {items.map(item => <CartItem key={item.productId} item={item}/>)}
    </div>
);

export default CartList;