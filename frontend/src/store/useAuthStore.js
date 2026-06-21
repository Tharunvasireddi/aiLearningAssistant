import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "../utils/storage";

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
	hydrated: false,
};

export const useAuthStore = create(
	persist(
		(set) => ({
			...initialState,
			setAuth: ({ user, token }) => {
				const nextState = {
					user: user || null,
					token: token || null,
					isAuthenticated: Boolean(token),
				};

				storage.setAuth(nextState);
				set(nextState);
			},
			updateUser: (user) => set({ user }),
			logout: () => {
				storage.clearAuth();
				set({ ...initialState, hydrated: true });
			},
			setHydrated: () => set({ hydrated: true }),
		}),
		{
			name: "ai-learning-assistant-auth",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.setHydrated();
				}
			},
		},
	),
);
