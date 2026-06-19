import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import LoadingScreen from "../components/loaders/LoadingScreen";
import RouteErrorBoundary from "../components/shared/RouteErrorBoundary";

const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/Auth/RegisterPage"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const DashboardPage = lazy(() => import("../pages/Dashboard/DashBoardPage"));
const DocumentListPage = lazy(
	() => import("../pages/Documents/DocumentListPage"),
);
const DocumentDetailsPage = lazy(
	() => import("../pages/Documents/DocumentDetailsPage"),
);
const FlashcardListPage = lazy(
	() => import("../pages/flashcards/FlashcardListPage"),
);
const QuizTakePage = lazy(() => import("../pages/Quizes/QuizTakePage"));
const QuizResultPage = lazy(() => import("../pages/Quizes/QuizResultPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const RootLayout = () => (
	<Suspense fallback={<LoadingScreen />}>
		<Outlet />
	</Suspense>
);

const rootRoute = createRootRoute({
	component: RootLayout,
	errorComponent: RouteErrorBoundary,
	notFoundComponent: () => <NotFoundPage />,
});

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "login",
	component: () => <LoginPage />,
});

const landingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <LandingPage />,
});

const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "register",
	component: () => <RegisterPage />,
});

const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "protected",
	component: ProtectedRoutes,
});

const dashboardRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "dashboard",
	component: () => <DashboardPage />,
});

const documentsRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "documents",
	component: () => <DocumentListPage />,
});

const documentDetailsRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "documents/$documentId",
	component: () => <DocumentDetailsPage />,
});

const flashcardsRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "documents/$documentId/flashcards",
	component: () => <FlashcardListPage />,
});

const quizTakeRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "quizzes/$quizId",
	component: () => <QuizTakePage />,
});

const quizResultsRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "quizzes/$quizId/results",
	component: () => <QuizResultPage />,
});

const profileRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "profile",
	component: () => <ProfilePage />,
});

const routeTree = rootRoute.addChildren([
	landingRoute,
	loginRoute,
	registerRoute,
	protectedRoute.addChildren([
		dashboardRoute,
		documentsRoute,
		documentDetailsRoute,
		flashcardsRoute,
		quizTakeRoute,
		quizResultsRoute,
		profileRoute,
	]),
]);

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});
