import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useWishlistStore = create(
	persist(
		(set, get) => ({
			items: [],
			toggleItem: (item) => {
				const exists = get().items.some((entry) => entry.id === item.id);
				set({
					items: exists
						? get().items.filter((entry) => entry.id !== item.id)
						: [...get().items, item],
				});
			},
			removeItem: (id) =>
				set({ items: get().items.filter((item) => item.id !== id) }),
			clearItems: () => set({ items: [] }),
		}),
		{
			name: "ai-learning-assistant-wishlist",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
