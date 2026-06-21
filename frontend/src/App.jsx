import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/loaders/LoadingScreen";
import { queryClient } from "./lib/queryClient";
import { router } from "./routes/router";
import { useUIStore } from "./store/useUIStore";

const ThemeSynchronizer = () => {
	const theme = useUIStore((state) => state.theme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		document.documentElement.style.colorScheme = theme;
	}, [theme]);

	return null;
};

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeSynchronizer />
		<Suspense fallback={<LoadingScreen />}>
			<RouterProvider router={router} />
		</Suspense>
		<Toaster
			position="top-right"
			toastOptions={{
				style: {
					background: "#0f172a",
					color: "#e2e8f0",
					border: "1px solid rgba(255,255,255,0.08)",
				},
			}}
		/>
	</QueryClientProvider>
);

export default App;
