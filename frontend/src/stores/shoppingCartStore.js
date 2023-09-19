import { create } from "zustand";

export const useShoppingCartStore = create((set) => ({
  items: [],
  setItems: (newItems) => set(() => ({ items: newItems })),
  getDbItems: async (userToken) => {
    const response = await fetch("/buyer/cart", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const json = await response.json();
    const cartItems = json.cartItems;
    set({ items: cartItems });
  },
}));
