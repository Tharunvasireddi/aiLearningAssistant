import { Navigate, Outlet } from "@tanstack/react-router";
import AppLayout from "../../layouts/AppLayout";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingScreen from "../loaders/LoadingScreen";

const ProtectedRoutes = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const hydrated = useAuthStore((state) => state.hydrated);

	if (!hydrated) {
		return <LoadingScreen />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return (
		<AppLayout>
			<Outlet />
		</AppLayout>
	);
};

export default ProtectedRoutes;
