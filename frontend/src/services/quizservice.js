import apiClient from "../api/axiosInstance";
import { endpoints } from "../api/endpoints";

export const getQuizzesByDocument = async (documentId) =>
	(await apiClient.get(endpoints.quizzes.byDocument(documentId))).data;
export const getQuizById = async (quizId) =>
	(await apiClient.get(endpoints.quizzes.byId(quizId))).data;
export const submitQuiz = async (quizId, payload) =>
	(await apiClient.post(endpoints.quizzes.submit(quizId), payload)).data;
export const getQuizResults = async (quizId) =>
	(await apiClient.get(endpoints.quizzes.results(quizId))).data;
export const deleteQuiz = async (quizId) =>
	(await apiClient.delete(endpoints.quizzes.remove(quizId))).data;
