import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
	persist(
		(set) => ({
			items: [],
			addItem: (item) =>
				set((state) => ({
					items: state.items.some((current) => current.id === item.id)
						? state.items
						: [...state.items, item],
				})),
			removeItem: (id) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== id),
				})),
			clearCart: () => set({ items: [] }),
		}),
		{
			name: "ai-learning-assistant-cart",
		},
	),
);
