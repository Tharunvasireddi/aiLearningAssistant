import {
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import {
	deleteDocument,
	getDocumentById,
	getDocuments,
	uploadDocument,
} from "../services/documentservice";
import { useApiMutation } from "./useApiMutation";

export const useDocumentsQuery = () =>
	useQuery({
		queryKey: QUERY_KEYS.documents,
		queryFn: getDocuments,
		select: (response) => response?.data || [],
	});

export const useDocumentQuery = (documentId) =>
	useQuery({
		queryKey: [...QUERY_KEYS.documents, documentId],
		queryFn: () => getDocumentById(documentId),
		enabled: Boolean(documentId),
		select: (response) => response?.data,
	});

export const useInfiniteDocumentsQuery = () =>
	useInfiniteQuery({
		queryKey: [...QUERY_KEYS.documents, "infinite"],
		initialPageParam: 1,
		queryFn: async ({ pageParam }) => {
			const response = await getDocuments();
			const items = response?.data || [];
			const pageSize = 6;
			const start = (pageParam - 1) * pageSize;
			const pageItems = items.slice(start, start + pageSize);
			return {
				items: pageItems,
				nextPage: start + pageSize < items.length ? pageParam + 1 : undefined,
			};
		},
		getNextPageParam: (lastPage) => lastPage?.nextPage,
	});

export const useUploadDocumentMutation = () => {
	const queryClient = useQueryClient();

	return useApiMutation(uploadDocument, {
		successMessage: "Document uploaded",
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.documents });
		},
	});
};
export const useDeleteDocumentMutation = () => {
	const queryClient = useQueryClient();

	return useApiMutation(deleteDocument, {
		successMessage: "Document deleted",
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.documents });
		},
	});
};
