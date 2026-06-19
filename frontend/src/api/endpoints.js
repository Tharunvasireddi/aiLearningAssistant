const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const endpoints = {
	baseUrl: API_BASE_URL,
	auth: {
		login: "/api/auth/login",
		register: "/api/auth/register",
		profile: "/api/auth/getprofile",
		updateProfile: "/api/auth/updateprofile",
		changePassword: "/api/auth/changepassword",
	},
	documents: {
		list: "/api/document/getdocuments",
		byId: (documentId) => `/api/document/${documentId}`,
		upload: "/api/document/upload",
		remove: (documentId) => `/api/document/${documentId}`,
	},
	flashcards: {
		list: "/api/flashcards",
		byDocument: (documentId) => `/api/flashcards/${documentId}`,
		review: (cardId) => `/api/flashcards/${cardId}/review`,
		star: (cardId) => `/api/flashcards/${cardId}/star`,
		remove: (setId) => `/api/flashcards/${setId}`,
	},
	quizzes: {
		byDocument: (documentId) => `/api/quizes/${documentId}`,
		byId: (quizId) => `/api/quizes/quiz/${quizId}`,
		submit: (quizId) => `/api/quizes/${quizId}/submit`,
		results: (quizId) => `/api/quizes/${quizId}/results`,
		remove: (quizId) => `/api/quizes/${quizId}`,
	},
	ai: {
		flashcards: "/api/aiRoutes/generate-flashcards",
		quiz: "/api/aiRoutes/generate-quiz",
		summary: "/api/aiRoutes/generate-summary",
		chat: "/api/aiRoutes/chat",
		explainConcept: "/api/aiRoutes/explain-concept",
		chatHistory: (documentId) => `/api/aiRoutes/chat-history/${documentId}`,
	},
};

export { API_BASE_URL };
