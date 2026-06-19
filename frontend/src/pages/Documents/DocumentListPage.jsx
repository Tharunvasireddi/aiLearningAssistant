import { Link } from "@tanstack/react-router";
import { Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import DocumentUploadForm from "../../components/forms/DocumentUploadForm";
import ListSkeleton from "../../components/loaders/ListSkeleton";
import EmptyState from "../../components/shared/EmptyState";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useDebounce } from "../../hooks/useDebounce";
import {
	useDeleteDocumentMutation,
	useDocumentsQuery,
} from "../../hooks/useDocuments";

const DocumentListPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm);
	const deleteMutation = useDeleteDocumentMutation();
	const {
		data: documents = [],
		isLoading,
		isError,
		refetch,
	} = useDocumentsQuery();

	const filteredDocuments = useMemo(() => {
		const query = debouncedSearch.trim().toLowerCase();
		if (!query) return documents;
		return documents.filter((document) =>
			document.title.toLowerCase().includes(query),
		);
	}, [debouncedSearch, documents]);

	if (isLoading) {
		return <ListSkeleton items={5} />;
	}

	if (isError) {
		return (
			<EmptyState
				title="Failed to load documents"
				description="The document list could not be loaded."
				actionLabel="Retry"
				onAction={refetch}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Library"
				title="Manage documents"
				description="Search, upload, and open study sources from a single workspace."
			/>

			<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
				<DocumentUploadForm />

				<Card>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h2 className="text-xl font-bold text-white">Document list</h2>
							<p className="text-sm text-slate-400">
								{filteredDocuments.length} documents available
							</p>
						</div>
						<div className="relative w-full sm:max-w-sm">
							<Search
								className="pointer-events-none absolute left-4 top-3.5 text-slate-500"
								size={16}
							/>
							<Input
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								placeholder="Search documents"
								className="pl-10"
							/>
						</div>
					</div>

					<div className="mt-5 grid gap-3">
						{filteredDocuments.length === 0 ? (
							<EmptyState
								title="No matching documents"
								description="Try a different search term or upload a new PDF."
							/>
						) : (
							filteredDocuments.map((document) => (
								<div
									key={document._id}
									className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
								>
									<div>
										<Link
											to="/documents/$documentId"
											params={{ documentId: document._id }}
											className="text-lg font-semibold text-white hover:text-emerald-300"
										>
											{document.title}
										</Link>
										<p className="mt-1 text-sm text-slate-400">
											{document.status} • {document.fileName}
										</p>
									</div>
									<div className="flex items-center gap-3">
										<Link
											to="/documents/$documentId"
											params={{ documentId: document._id }}
										>
											<Button variant="secondary" size="sm">
												Open
											</Button>
										</Link>
										<Button
											variant="ghost"
											size="sm"
											loading={deleteMutation.isPending}
											onClick={() => deleteMutation.mutate(document._id)}
										>
											<Trash2 size={16} />
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default DocumentListPage;
