import type { CheckoutForm,LocalOrder } from "../types/order";
import type{ CartItem} from "../types/cart";
import {STORAGE_KEYS} from "../constants/storageKeys";
import {getStorageItem,setStorageItem} from "../utils/storage";
function getOrders():LocalOrder[]{
    return(getStorageItem<LocalOrder[]>(STORAGE_KEYS.ORDER)??[]);
}
function generateOrderId():string{
    const date= new Date()
    .toString()
    .slice(0,10)
    .replace(/-/g,"");
    const random=Math.random()
    .toString(36)
    .substring(2,6)
    .toUpperCase();
     return `ORD-${date}-${random}`;
}
export const orderService={
    create(form:CheckoutForm, cart:CartItem[], userId:number):LocalOrder{
        const subtotal=cart.reduce(
            (total,item)=>total+item.price*item.qty,0);
        const order:LocalOrder={
            id:generateOrderId(), 
            userId,
            items:cart, 
            subtotal,
            customerName:form.customerName,
            phone:form.phone,
            address:form.address,
            note:form.note??"",
            status:"confirmed",
            createdAt:new Date().toISOString(),
        };
        const orders=getOrders();
        orders.push(order);
        setStorageItem(STORAGE_KEYS.ORDER,orders);
        return order;
    },
    listByUser(userId:number):LocalOrder[]{
        return getOrders().filter((order)=>order.userId===userId);
    },
};