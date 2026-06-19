import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import {
	chatWithDocument,
	explainConcept,
	generateFlashcards,
	generateQuiz,
	generateSummary,
	getChatHistory,
} from "../services/aiservice";
import { useApiMutation } from "./useApiMutation";

export const useGenerateFlashcardsMutation = () =>
	useApiMutation(generateFlashcards, {
		successMessage: "Flashcards generated",
	});
export const useGenerateQuizMutation = () =>
	useApiMutation(generateQuiz, { successMessage: "Quiz generated" });
export const useGenerateSummaryMutation = () =>
	useApiMutation(generateSummary, { successMessage: "Summary generated" });
export const useChatMutation = () =>
	useApiMutation(chatWithDocument, { successMessage: "Response generated" });
export const useExplainConceptMutation = () =>
	useApiMutation(explainConcept, { successMessage: "Explanation generated" });

export const useChatHistoryQuery = (documentId) =>
	useQuery({
		queryKey: [...QUERY_KEYS.ai, documentId, "chat-history"],
		queryFn: () => getChatHistory(documentId),
		enabled: Boolean(documentId),
		select: (response) => response?.data || [],
	});
