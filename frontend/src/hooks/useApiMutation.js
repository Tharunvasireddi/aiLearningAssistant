import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useApiMutation = (mutationFn, options = {}) => {
	const {
		successMessage,
		errorMessage = "Request failed",
		onSuccess,
		onError,
		...mutationOptions
	} = options;

	return useMutation({
		mutationFn,
		...mutationOptions,
		onSuccess: (data, variables, context) => {
			if (successMessage) {
				toast.success(successMessage);
			}
			onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			const message =
				error?.response?.data?.message || error?.message || errorMessage;
			toast.error(message);
			onError?.(error, variables, context);
		},
	});
};
