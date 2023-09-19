import { create } from "zustand";

export const useShoppingCartStore = create((set) => ({
  items: [],
  setItems: (newItems) => set(() => ({ items: newItems })),
}));
