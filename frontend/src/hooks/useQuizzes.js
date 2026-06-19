import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import {
	deleteQuiz,
	getQuizById,
	getQuizResults,
	getQuizzesByDocument,
	submitQuiz,
} from "../services/quizservice";
import { useApiMutation } from "./useApiMutation";

export const useQuizzesByDocumentQuery = (documentId) =>
	useQuery({
		queryKey: [...QUERY_KEYS.quizzes, documentId],
		queryFn: () => getQuizzesByDocument(documentId),
		enabled: Boolean(documentId),
		select: (response) => response?.data || [],
	});

export const useQuizQuery = (quizId) =>
	useQuery({
		queryKey: [...QUERY_KEYS.quizzes, quizId],
		queryFn: () => getQuizById(quizId),
		enabled: Boolean(quizId),
		select: (response) => response?.data,
	});

export const useQuizResultsQuery = (quizId) =>
	useQuery({
		queryKey: [...QUERY_KEYS.quizzes, quizId, "results"],
		queryFn: () => getQuizResults(quizId),
		enabled: Boolean(quizId),
		select: (response) => response?.data,
	});

export const useSubmitQuizMutation = () =>
	useApiMutation(({ quizId, payload }) => submitQuiz(quizId, payload), {
		successMessage: "Quiz submitted",
	});
export const useDeleteQuizMutation = () =>
	useApiMutation(deleteQuiz, { successMessage: "Quiz deleted" });
