import { Link } from "@tanstack/react-router";
import { BookOpenText, Brain, FileUp, Sparkles, Trophy } from "lucide-react";
import { createElement, useState } from "react";
import DocumentUploadForm from "../../components/forms/DocumentUploadForm";
import PageSkeleton from "../../components/loaders/PageSkeleton";
import EmptyState from "../../components/shared/EmptyState";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Modal from "../../components/ui/Modal";
import { useDocumentsQuery } from "../../hooks/useDocuments";
import { useFlashcardsQuery } from "../../hooks/useFlashcards";
import { useQuizzesByDocumentQuery } from "../../hooks/useQuizzes";

const StatCard = ({ icon: Icon, label, value, note }) => {
	return (
		<Card>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm text-slate-400">{label}</p>
					<p className="mt-2 text-3xl font-black text-white">{value}</p>
					{note ? <p className="mt-2 text-sm text-slate-400">{note}</p> : null}
				</div>
				<div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
					{createElement(Icon, { size: 18 })}
				</div>
			</div>
		</Card>
	);
};

const DashBoardPage = () => {
	const [isUploadOpen, setIsUploadOpen] = useState(false);
	const { data: documents = [], isLoading: documentsLoading } =
		useDocumentsQuery();
	const { data: flashcards = [], isLoading: flashcardsLoading } =
		useFlashcardsQuery();
	const { data: quizzes = [] } = useQuizzesByDocumentQuery(documents?.[0]?._id);

	if (documentsLoading || flashcardsLoading) {
		return <PageSkeleton rows={4} />;
	}

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Overview"
				title="Learning workspace"
				description="Track uploaded documents, generated study assets, and active revision progress in one place."
				actions={
					<>
						<Button variant="secondary" onClick={() => setIsUploadOpen(true)}>
							<FileUp size={16} /> Upload
						</Button>
						<Link to="/documents">
							<Button>
								<Sparkles size={16} /> Start learning
							</Button>
						</Link>
					</>
				}
			/>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<StatCard
					icon={BookOpenText}
					label="Documents"
					value={documents.length}
					note="Indexed and searchable"
				/>
				<StatCard
					icon={Brain}
					label="Flashcard sets"
					value={flashcards.length}
					note="Ready for spaced revision"
				/>
				<StatCard
					icon={Trophy}
					label="Quizzes"
					value={quizzes.length}
					note="Assess understanding quickly"
				/>
				<StatCard
					icon={Sparkles}
					label="AI tools"
					value="5"
					note="Summary, chat, quiz, cards, explain"
				/>
			</div>

			<div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
				<Card>
					<div className="flex items-center justify-between gap-4">
						<div>
							<h2 className="text-xl font-bold text-white">Recent documents</h2>
							<p className="mt-1 text-sm text-slate-400">
								Your latest uploads and processing status.
							</p>
						</div>
						<Link to="/documents">
							<Button variant="ghost">View all</Button>
						</Link>
					</div>
					<div className="mt-5 space-y-3">
						{documents.slice(0, 5).map((document) => (
							<Link
								key={document._id}
								to="/documents/$documentId"
								params={{ documentId: document._id }}
								className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-emerald-400/30 hover:bg-white/8"
							>
								<div>
									<p className="font-semibold text-white">{document.title}</p>
									<p className="text-sm text-slate-400">
										{document.status} • {document.flashcardCount || 0}{" "}
										flashcards • {document.quizCount || 0} quizzes
									</p>
								</div>
								<span className="text-sm text-emerald-300">Open</span>
							</Link>
						))}
						{documents.length === 0 ? (
							<EmptyState
								title="No documents yet"
								description="Upload a PDF to generate summaries, flashcards, and quizzes."
								actionLabel="Go to documents"
								onAction={() => {}}
							/>
						) : null}
					</div>
				</Card>

				<Card>
					<h2 className="text-xl font-bold text-white">Next steps</h2>
					<div className="mt-5 space-y-4 text-sm text-slate-300">
						<p>1. Upload a document and wait for processing to finish.</p>
						<p>2. Generate study assets from the document detail view.</p>
						<p>3. Review flashcards and complete quizzes to measure recall.</p>
					</div>
				</Card>
			</div>

			<Modal
				open={isUploadOpen}
				title="Upload document"
				onClose={() => setIsUploadOpen(false)}
			>
				<DocumentUploadForm onSuccess={() => setIsUploadOpen(false)} />
			</Modal>
		</div>
	);
};

export default DashBoardPage;
