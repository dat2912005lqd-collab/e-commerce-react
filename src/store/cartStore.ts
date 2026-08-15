import { create } from "zustand";
import type { CartItem } from "../types/cart";
import {
  getStorageItem,
  setStorageItem,
} from "../utils/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (
    productId: number,
    Quantity: number
  ) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalQuantity: () => number;
}
const initialItems =
  getStorageItem<CartItem[]>(
    STORAGE_KEYS.CART
  ) ?? [];
export const useCartStore = create<CartState>(
  (set, get) => ({
    items: initialItems,
    addItem: (item) => {
      const currentItems = get().items;
      const existingItem = currentItems.find(
        (cartItem) =>
          cartItem.productId === item.productId
      );
      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = currentItems.map(
          (cartItem) =>
            cartItem.productId === item.productId
              ? {
                  ...cartItem,
                  qty:
                    cartItem.qty + item.qty,
                }
              : cartItem
        );
      } else {
        updatedItems = [...currentItems, item];
      }
      set({
        items: updatedItems,
      });
      setStorageItem(STORAGE_KEYS.CART,updatedItems);
    },
    updateQuantity: (productId, qty) => {
      if (qty < 1) {
        return;
      }
      const updatedItems =
        get().items.map((item) =>
          item.productId === productId
            ? { ...item, qty }
            : item
        );
      set({items: updatedItems, });
      setStorageItem( STORAGE_KEYS.CART, updatedItems);
    },
    removeItem: (productId) => {
      const updatedItems =
        get().items.filter(
          (item) =>
            item.productId !== productId
        );

      set({
        items: updatedItems,
      });

      setStorageItem(
        STORAGE_KEYS.CART,
        updatedItems
      );
    },

    clearCart: () => {
      set({
        items: [],
      });

      setStorageItem(
        STORAGE_KEYS.CART,
        []
      );
    },

    getSubtotal: () => {
      return get().items.reduce(
        (total, item) =>
          total + item.price * item.qty,
        0
      );
    },

    getTotalQuantity: () => {
      return get().items.reduce(
        (total, item) =>
          total + item.qty,
        0
      );
    },
  })
);
