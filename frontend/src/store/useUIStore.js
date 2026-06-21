import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUIStore = create(
	persist(
		(set) => ({
			theme: "dark",
			sidebarOpen: true,
			activeModal: null,
			setTheme: (theme) => set({ theme }),
			toggleTheme: () =>
				set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
			setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
			toggleSidebar: () =>
				set((state) => ({ sidebarOpen: !state.sidebarOpen })),
			openModal: (activeModal) => set({ activeModal }),
			closeModal: () => set({ activeModal: null }),
		}),
		{
			name: "ai-learning-assistant-ui",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
