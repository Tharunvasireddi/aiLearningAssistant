import { Link, useParams, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import PageSkeleton from "../../components/loaders/PageSkeleton";
import EmptyState from "../../components/shared/EmptyState";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useQuizQuery, useSubmitQuizMutation } from "../../hooks/useQuizzes";

const QuizTakePage = () => {
	const { quizId } = useParams({ strict: false });
	const router = useRouter();
	const { data: quiz, isLoading } = useQuizQuery(quizId);
	const submitMutation = useSubmitQuizMutation();
	const [answers, setAnswers] = useState({});

	const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

	if (isLoading) return <PageSkeleton rows={3} />;
	if (!quiz)
		return (
			<EmptyState
				title="Quiz not found"
				description="Unable to load the quiz."
			/>
		);

	const handleSubmit = async () => {
		const payload = {
			answers: Object.entries(answers).map(
				([questionIndex, selectedAnswer]) => ({
					questionIndex: Number(questionIndex),
					selectedAnswer,
				}),
			),
		};

		await submitMutation.mutateAsync({ quizId, payload });
		router.navigate({ to: "/quizzes/$quizId/results", params: { quizId } });
	};

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Quiz"
				title={quiz.title}
				description={`Answer ${quiz.questions.length} questions and submit to get an instant score.`}
				actions={
					<Link
						to="/documents/$documentId"
						params={{ documentId: quiz.documentId?._id || quiz.documentId }}
					>
						<Button variant="secondary">Back to document</Button>
					</Link>
				}
			/>

			<Card>
				<div className="flex items-center justify-between gap-4">
					<p className="text-sm text-slate-400">
						Answered {answeredCount}/{quiz.questions.length}
					</p>
					<Button onClick={handleSubmit} loading={submitMutation.isPending}>
						Submit quiz
					</Button>
				</div>

				<div className="mt-6 space-y-4">
					{quiz.questions.map((question, index) => (
						<div
							key={question._id || index}
							className="rounded-2xl border border-white/10 bg-white/5 p-4"
						>
							<p className="font-semibold text-white">
								{index + 1}. {question.question}
							</p>
							<div className="mt-4 grid gap-3 md:grid-cols-2">
								{question.options.map((option) => (
									<button
										key={option}
										className={`safe-focus rounded-2xl border px-4 py-3 text-left text-sm transition ${answers[index] === option ? "border-emerald-400 bg-emerald-400/15 text-emerald-100" : "border-white/10 bg-slate-950/70 text-slate-200 hover:border-white/20"}`}
										onClick={() =>
											setAnswers((state) => ({ ...state, [index]: option }))
										}
									>
										{option}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

export default QuizTakePage;
