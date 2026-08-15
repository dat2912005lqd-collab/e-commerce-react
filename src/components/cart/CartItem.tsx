import type { CartItem as CartItemType } from "../../types/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQty: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  item,
  onUpdateQty,
  onRemove,
}: CartItemProps) {
  return (
    <div>
      <img
        src={item.image}
        alt={item.title}
        width={80}
      />

      <div>
        <h3>{item.title}</h3>
        <p>${item.price.toFixed(2)}</p>

        <button
          type="button"
          onClick={() =>
            onUpdateQty(item.productId, item.qty - 1)
          }
        >
          -
        </button>

        <span>{item.qty}</span>

        <button
          type="button"
          onClick={() =>
            onUpdateQty(item.productId, item.qty + 1)
          }
        >
          +
        </button>

        <button
          type="button"
          onClick={() => onRemove(item.productId)}
        >
          Xóa
        </button>
      </div>

      <strong>
        ${(item.price * item.qty).toFixed(2)}
      </strong>
    </div>
  );
}