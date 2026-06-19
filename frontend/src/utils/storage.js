const AUTH_KEY = "ai-learning-assistant-auth-token";
const PERSISTED_AUTH_KEY = "ai-learning-assistant-auth";

const parseAuthPayload = (raw) => {
	if (!raw) {
		return null;
	}

	const parsed = JSON.parse(raw);
	return parsed?.token ? parsed : parsed?.state?.token ? parsed.state : null;
};

export const storage = {
	getAuth: () => {
		try {
			return (
				parseAuthPayload(localStorage.getItem(AUTH_KEY)) ??
				parseAuthPayload(localStorage.getItem(PERSISTED_AUTH_KEY))
			);
		} catch {
			return null;
		}
	},
	setAuth: (value) => {
		localStorage.setItem(AUTH_KEY, JSON.stringify(value));
	},
	clearAuth: () => {
		localStorage.removeItem(AUTH_KEY);
		localStorage.removeItem(PERSISTED_AUTH_KEY);
	},
};

export { AUTH_KEY };
