import apiClient from "../api/axiosInstance";
import { endpoints } from "../api/endpoints";

export const generateFlashcards = async (payload) =>
	(await apiClient.post(endpoints.ai.flashcards, payload)).data;
export const generateQuiz = async (payload) =>
	(await apiClient.post(endpoints.ai.quiz, payload)).data;
export const generateSummary = async (payload) =>
	(await apiClient.post(endpoints.ai.summary, payload)).data;
export const chatWithDocument = async (payload) =>
	(await apiClient.post(endpoints.ai.chat, payload)).data;
export const explainConcept = async (payload) =>
	(await apiClient.post(endpoints.ai.explainConcept, payload)).data;
export const getChatHistory = async (documentId) =>
	(await apiClient.get(endpoints.ai.chatHistory(documentId))).data;
