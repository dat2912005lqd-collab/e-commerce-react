import type {CartItem} from "./cart";
export type OrderStatus="confirmed";
export interface CheckoutForm{
customerName:string;
phone:string;
address:string;
note?:string;
}
export interface LocalOrder {
    id: string;
    userId: number;
    items: CartItem[];
    subtotal: number;
    customerName: string;
    phone: string;
    address: string;
    note?: string;
    status:"confirmed";
    createdAt: string;
}