import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  open: false,
  setOpen: (open) => set({ open }),
  add: (item) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i,
          ),
          open: true,
        };
      }
      return { items: [...s.items, { ...item, qty: 1 }], open: true };
    }),
  remove: (id, size) =>
    set((s) => ({ items: s.items.filter((i) => !(i.id === id && i.size === size)) })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((n, i) => n + i.qty, 0),
  total: () => get().items.reduce((n, i) => n + i.qty * i.price, 0),
}));
