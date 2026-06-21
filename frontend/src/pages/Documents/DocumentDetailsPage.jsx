import { Link, useParams, useRouter } from "@tanstack/react-router";
import { Brain, FileText, MessageCircleMore, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import PageSkeleton from "../../components/loaders/PageSkeleton";
import EmptyState from "../../components/shared/EmptyState";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import {
	useGenerateFlashcardsMutation,
	useGenerateQuizMutation,
	useGenerateSummaryMutation,
} from "../../hooks/useAi";
import { useDocumentQuery } from "../../hooks/useDocuments";
import { useFlashcardsByDocumentQuery } from "../../hooks/useFlashcards";
import { useQuizzesByDocumentQuery } from "../../hooks/useQuizzes";

const DocumentDetailsPage = () => {
	const { documentId } = useParams({ strict: false });
	const router = useRouter();
	const [summary, setSummary] = useState("");
	const { data: document, isLoading, isError } = useDocumentQuery(documentId);
	const { data: flashcards = [] } = useFlashcardsByDocumentQuery(documentId);
	const { data: quizzes = [] } = useQuizzesByDocumentQuery(documentId);
	const latestQuizId = quizzes[0]?._id;
	const summaryMutation = useGenerateSummaryMutation();
	const flashcardsMutation = useGenerateFlashcardsMutation();
	const quizMutation = useGenerateQuizMutation();

	const metrics = useMemo(
		() => [
			{ label: "Flashcard sets", value: flashcards.length },
			{ label: "Quizzes", value: quizzes.length },
			{ label: "Status", value: document?.status || "unknown" },
		],
		[document?.status, flashcards.length, quizzes.length],
	);

	if (isLoading) return <PageSkeleton rows={3} />;
	if (isError || !document)
		return (
			<EmptyState
				title="Document not found"
				description="The requested document could not be loaded."
				actionLabel="Back to documents"
				onAction={() => router.navigate({ to: "/documents" })}
			/>
		);

	const handleGenerateSummary = async () => {
		const response = await summaryMutation.mutateAsync({ documentId });
		setSummary(response?.summary || "");
	};

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Document detail"
				title={document.title}
				description={document.fileName}
				actions={
					<>
						<Link
							to="/documents/$documentId/flashcards"
							params={{ documentId }}
						>
							<Button variant="secondary">
								<Brain size={16} /> Flashcards
							</Button>
						</Link>
						<Link to="/quizzes/$quizId" params={{ quizId: latestQuizId }}>
							<Button>
								<MessageCircleMore size={16} /> Quiz
							</Button>
						</Link>
						{/* (
						<Button variant="secondary" disabled>
							<MessageCircleMore size={16} /> Quiz
						</Button>
						) */}
					</>
				}
			/>

			<div className="grid gap-4 md:grid-cols-3">
				{metrics.map((metric) => (
					<Card key={metric.label}>
						<p className="text-sm text-slate-400">{metric.label}</p>
						<p className="mt-3 text-3xl font-black text-white">
							{metric.value}
						</p>
					</Card>
				))}
			</div>

			<div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
				<Card>
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div>
							<h2 className="text-xl font-bold text-white">AI actions</h2>
							<p className="text-sm text-slate-400">
								Generate study aids from the document text.
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<Button
								variant="secondary"
								onClick={handleGenerateSummary}
								loading={summaryMutation.isPending}
							>
								<WandSparkles size={16} /> Summary
							</Button>
							<Button
								variant="secondary"
								onClick={() =>
									flashcardsMutation.mutate({ documentId, count: 10 })
								}
								loading={flashcardsMutation.isPending}
							>
								<Brain size={16} /> Flashcards
							</Button>
							<Button
								onClick={() =>
									quizMutation.mutate({
										documentId,
										numQuestion: 5,
										title: `${document.title}-quiz`,
									})
								}
								loading={quizMutation.isPending}
							>
								<FileText size={16} /> Quiz
							</Button>
						</div>
					</div>

					<div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
						<p>
							<span className="font-semibold text-white">File URL:</span>{" "}
							{document.filepath}
						</p>
						<p>
							<span className="font-semibold text-white">
								Extracted chunks:
							</span>{" "}
							{document.chunks?.length || 0}
						</p>
						<p>
							<span className="font-semibold text-white">Uploaded:</span>{" "}
							{new Date(
								document.createdAt || document.uploadDate,
							).toLocaleString()}
						</p>
					</div>
				</Card>

				<Card>
					<h2 className="text-xl font-bold text-white">Summary</h2>
					<div className="mt-4 min-h-48 rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
						{summary ||
							document.extractedText?.slice(0, 700) ||
							"Generate a summary to see the AI output here."}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default DocumentDetailsPage;
