import { useCartStore } from "../store/cartStore";
export function useCart(){
    const items=useCartStore((state)=>state.items);
    const addItem=useCartStore((state)=>state.addItem);
    const updateQty=useCartStore((state)=>state.Quantity);
    const removeItem=useCartStore((state)=>state.removeItem);
    const clearCart=useCartStore((state)=>state.clearCart);
    const totalItem=items.reduce((total,item)=>total+item.qty,0);
    const subtotal=items.reduce((total,item)=>total+item.price*item.qty,0);
    return { items, totalItem,subtotal,
        addItem, updateQty,removeItem,clearCart
    }
}