import apiClient from "../api/axiosInstance";
import { endpoints } from "../api/endpoints";

export const getDocuments = async () =>
	(await apiClient.get(endpoints.documents.list)).data;
export const getDocumentById = async (documentId) =>
	(await apiClient.get(endpoints.documents.byId(documentId))).data;
export const uploadDocument = async (formData) =>
	(await apiClient.post(endpoints.documents.upload, formData)).data;
export const deleteDocument = async (documentId) =>
	(await apiClient.delete(endpoints.documents.remove(documentId))).data;
