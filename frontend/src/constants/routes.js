export const routes = {
	home: "/",
	login: "/login",
	register: "/register",
	dashboard: "/dashboard",
	documents: "/documents",
	documentDetails: (id) => `/documents/${id}`,
	flashcards: (id) => `/document/${id}/flashcards`,
	quizTake: (quizId) => `/quizzes/${quizId}`,
	quizResults: (quizId) => `/quizzes/${quizId}/results`,
	profile: "/profile",
};
