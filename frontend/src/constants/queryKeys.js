export const queryKeys = {
	auth: ["auth"],
	profile: ["profile"],
	documents: ["documents"],
	document: (id) => ["documents", id],
	flashcards: ["flashcards"],
	flashcardsByDocument: (documentId) => ["flashcards", documentId],
	quizzes: ["quizzes"],
	quiz: (quizId) => ["quizzes", quizId],
	chatHistory: (documentId) => ["chat-history", documentId],
};
