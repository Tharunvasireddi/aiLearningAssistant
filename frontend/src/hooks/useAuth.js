import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import {
	changePassword,
	getProfile,
	loginUser,
	registerUser,
	updateProfile,
} from "../services/authservice";
import { useAuthStore } from "../store/useAuthStore";
import { useApiMutation } from "./useApiMutation";

export const useProfileQuery = () =>
	useQuery({
		queryKey: QUERY_KEYS.auth,
		queryFn: getProfile,
		select: (response) => response?.user,
	});

export const useLoginMutation = () => {
	const setAuth = useAuthStore((state) => state.setAuth);

	return useApiMutation(loginUser, {
		successMessage: "Logged in successfully",
		onSuccess: (response, variables) => {
			setAuth({
				user: { email: variables.email, id: response?.userId },
				token: response?.token,
			});
		},
	});
};

export const useRegisterMutation = () =>
	useApiMutation(registerUser, {
		successMessage: "Account created successfully",
	});

export const useUpdateProfileMutation = () =>
	useApiMutation(updateProfile, { successMessage: "Profile updated" });

export const useChangePasswordMutation = () =>
	useApiMutation(changePassword, { successMessage: "Password updated" });
