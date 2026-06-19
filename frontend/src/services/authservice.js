import apiClient from "../api/axiosInstance";
import { endpoints } from "../api/endpoints";

export const loginUser = async (payload) => {
	const response = await apiClient.post(endpoints.auth.login, payload);
	console.log(response.data);
	return response.data;
};

export const registerUser = async (payload) =>
	(await apiClient.post(endpoints.auth.register, payload)).data;
export const getProfile = async () =>
	(await apiClient.get(endpoints.auth.profile)).data;
export const updateProfile = async (payload) =>
	(await apiClient.put(endpoints.auth.updateProfile, payload)).data;
export const changePassword = async (payload) =>
	(await apiClient.post(endpoints.auth.changePassword, payload)).data;
