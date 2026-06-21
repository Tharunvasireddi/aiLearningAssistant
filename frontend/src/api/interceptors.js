import { storage } from "../utils/storage";

export const attachInterceptors = (client) => {
	client.interceptors.request.use((config) => {
		const auth = storage.getAuth();
		const token = auth?.token;
		const isFormData =
			typeof FormData !== "undefined" && config.data instanceof FormData;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		if (isFormData && config.headers) {
			delete config.headers["Content-Type"];
			delete config.headers["content-type"];
		}

		return config;
	});

	client.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error?.response?.status === 401) {
				storage.clearAuth();
			}

			return Promise.reject(error);
		},
	);
};
