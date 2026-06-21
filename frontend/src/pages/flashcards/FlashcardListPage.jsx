import { Link, useParams } from "@tanstack/react-router";
import { Star } from "lucide-react";
import PageSkeleton from "../../components/loaders/PageSkeleton";
import EmptyState from "../../components/shared/EmptyState";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import {
	useFlashcardsByDocumentQuery,
	useReviewFlashcardMutation,
	useToggleFlashcardStarMutation,
} from "../../hooks/useFlashcards";

const FlashcardListPage = () => {
	const { documentId } = useParams({ strict: false });
	const { data: flashcardSets = [], isLoading } =
		useFlashcardsByDocumentQuery(documentId);
	const reviewMutation = useReviewFlashcardMutation();
	const starMutation = useToggleFlashcardStarMutation();

	if (isLoading) return <PageSkeleton rows={3} />;

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Flashcards"
				title="Study decks"
				description="Review generated flashcards and mark key cards as starred for quick revision."
				actions={
					<Link to="/documents/$documentId" params={{ documentId }}>
						<Button variant="secondary">Back to document</Button>
					</Link>
				}
			/>

			{flashcardSets.length === 0 ? (
				<EmptyState
					title="No flashcards yet"
					description="Generate flashcards from the document detail page."
				/>
			) : (
				<div className="grid gap-4">
					{flashcardSets.map((set) => (
						<Card key={set._id}>
							<div className="flex flex-wrap items-center justify-between gap-3">
								<div>
									<h2 className="text-xl font-bold text-white">
										{set.documentId?.title || "Flashcard set"}
									</h2>
									<p className="text-sm text-slate-400">
										{set.cards.length} cards
									</p>
								</div>
							</div>
							<div className="mt-5 grid gap-4 md:grid-cols-2">
								{set.cards.map((card) => (
									<div
										key={card._id}
										className="rounded-2xl border border-white/10 bg-white/5 p-4"
									>
										<div className="flex items-start justify-between gap-3">
											<p className="font-semibold text-white">
												{card.question}
											</p>
											<button
												className="text-slate-400 transition hover:text-amber-300"
												onClick={() => starMutation.mutate(card._id)}
											>
												<Star
													size={16}
													fill={card.isStarred ? "currentColor" : "none"}
												/>
											</button>
										</div>
										<p className="mt-3 text-sm text-slate-300">{card.answer}</p>
										<Button
											className="mt-4"
											variant="secondary"
											size="sm"
											onClick={() => reviewMutation.mutate(card._id)}
										>
											Mark reviewed
										</Button>
									</div>
								))}
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default FlashcardListPage;
