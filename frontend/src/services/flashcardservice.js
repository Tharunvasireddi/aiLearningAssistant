import apiClient from "../api/axiosInstance";
import { endpoints } from "../api/endpoints";

export const getAllFlashcards = async () =>
	(await apiClient.get(endpoints.flashcards.list)).data;
export const getFlashcardsByDocument = async (documentId) =>
	(await apiClient.get(endpoints.flashcards.byDocument(documentId))).data;
export const reviewFlashcard = async (cardId) =>
	(await apiClient.post(endpoints.flashcards.review(cardId))).data;
export const toggleStarFlashcard = async (cardId) =>
	(await apiClient.put(endpoints.flashcards.star(cardId))).data;
export const deleteFlashcardSet = async (setId) =>
	(await apiClient.delete(endpoints.flashcards.remove(setId))).data;
