import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import {
	deleteFlashcardSet,
	getAllFlashcards,
	getFlashcardsByDocument,
	reviewFlashcard,
	toggleStarFlashcard,
} from "../services/flashcardservice";
import { useApiMutation } from "./useApiMutation";

export const useFlashcardsQuery = () =>
	useQuery({
		queryKey: QUERY_KEYS.flashcards,
		queryFn: getAllFlashcards,
		select: (response) => response?.data || [],
	});

export const useFlashcardsByDocumentQuery = (documentId) =>
	useQuery({
		queryKey: [...QUERY_KEYS.flashcards, documentId],
		queryFn: () => getFlashcardsByDocument(documentId),
		enabled: Boolean(documentId),
		select: (response) => response?.data || [],
	});

export const useReviewFlashcardMutation = () =>
	useApiMutation(reviewFlashcard, { successMessage: "Flashcard reviewed" });
export const useToggleFlashcardStarMutation = () =>
	useApiMutation(toggleStarFlashcard, { successMessage: "Flashcard updated" });
export const useDeleteFlashcardSetMutation = () =>
	useApiMutation(deleteFlashcardSet, {
		successMessage: "Flashcard set deleted",
	});
