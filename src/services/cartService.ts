import type {Product } from "../types/product";
import type {CartItem} from "../types/cart";
import {STORAGE_KEYS } from "../constants/storageKeys";
import{
    getStorageItem,
    setStorageItem,
}from "../utils/storage";
function getCart():CartItem[]{
    return(getStorageItem<CartItem[]>(STORAGE_KEYS.CART)??[]);
}
function saveCart(cart:CartItem[]):void {
    setStorageItem(STORAGE_KEYS.CART,cart);
}
export const cartService={
    get():CartItem[]{
        return getCart();
    },
    add(product:Product, qty:number):CartItem[]{
        const cart=getCart();
        const existingIndex=cart.findIndex(
            (item)=>item.productId===product.id);
        if(existingIndex>=0){
            cart[existingIndex].qty+=qty;
        }
        else{
            cart.push({
                productId:product.id,
                title:product.title,
                price:product.price,
                image:product.images?.[0],
                slug:product.slug,qty
            });
        }
        saveCart(cart);
        return cart;
    },
        updateQty(productId:number,qty:number):CartItem[]{
            let cart=getCart();
            if(qty<1){
                cart=cart.filter(item=>item.productId!==productId);
            }
            else{
                cart=cart.map((item)=>
                    item.productId===productId
                ?{...item,qty}:item
                );
            }
            saveCart(cart);
            return cart;
        }
        remove(productId:number):CartItem[]{
            const cart=getCart().filter(
                (item)=>item.productId!==productId 
            );
            saveCart(cart);
            return cart;
        },
     clear():void{ saveCart([])},
     subtotal():number{
        return getCart().reduce(
            (total,item)=>total+item.price+item.qty,0
        );
     }, 
}