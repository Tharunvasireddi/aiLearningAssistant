// import { Link, useParams } from "@tanstack/react-router";
// import PageSkeleton from "../../components/loaders/PageSkeleton";
// import EmptyState from "../../components/shared/EmptyState";
// import PageHeader from "../../components/shared/PageHeader";
// import Button from "../../components/ui/Button";
// import Card from "../../components/ui/Card";
// import { useQuizResultsQuery } from "../../hooks/useQuizzes";

// const getReadableAnswer = (answer, options = []) => {
// 	if (answer == null) return "Not provided";

// 	if (typeof answer === "number" && options[answer - 1]) {
// 		return options[answer - 1];
// 	}

// 	const normalizedAnswer = String(answer).trim();
// 	const numericMatch = normalizedAnswer.match(/^(?:o)?([1-4])$/i);

// 	if (numericMatch) {
// 		const optionIndex = Number(numericMatch[1]) - 1;
// 		return options[optionIndex] || normalizedAnswer;
// 	}

// 	return normalizedAnswer;
// };

// const QuizResultPage = () => {
// 	const { quizId } = useParams({ strict: false });
// 	const { data, isLoading } = useQuizResultsQuery(quizId);

// 	if (isLoading) return <PageSkeleton rows={3} />;
// 	if (!data)
// 		return (
// 			<EmptyState
// 				title="No results found"
// 				description="Complete the quiz to see results."
// 			/>
// 		);

// 	return (
// 		<div className="space-y-6">
// 			<PageHeader
// 				eyebrow="Results"
// 				title={data.title}
// 				description={`Score: ${data.score}/${data.totalQuestions}`}
// 				actions={
// 					<Link
// 						to="/documents/$documentId"
// 						params={{ documentId: data.document?._id || data.document }}
// 					>
// 						<Button variant="secondary">Back to document</Button>
// 					</Link>
// 				}
// 			/>

// 			<Card>
// 				<p className="text-sm text-slate-400">
// 					Completed at {new Date(data.completedAt).toLocaleString()}
// 				</p>
// 				<div className="mt-5 space-y-4">
// 					{data.result?.map((item) => (
// 						<div
// 							key={item.questionIndex}
// 							className={`rounded-2xl border p-4 transition ${item.isCorrect ? "border-emerald-400/40 bg-emerald-400/10" : "border-rose-400/40 bg-rose-400/10"}`}
// 						>
// 							<p
// 								className={`font-semibold ${item.isCorrect ? "text-emerald-100" : "text-rose-100"}`}
// 							>
// 								{item.question}
// 							</p>
// 							<p className="mt-2 text-sm text-slate-200">
// 								Your answer: {item.selectedAnswer || "Not answered"}
// 							</p>
// 							<p className="text-sm text-slate-300">
// 								Correct answer:{" "}
// 								{getReadableAnswer(item.correctAnswer, item.options)}
// 							</p>
// 						</div>
// 					))}
// 				</div>
// 			</Card>
// 		</div>
// 	);
// };

// export default QuizResultPage;

import { Link, useParams } from "@tanstack/react-router";
import PageSkeleton from "../../components/loaders/PageSkeleton";
import EmptyState from "../../components/shared/EmptyState";
import PageHeader from "../../components/shared/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useQuizResultsQuery } from "../../hooks/useQuizzes";

const getReadableAnswer = (answer, options = []) => {
	if (answer == null) return "Not provided";

	if (typeof answer === "number" && options[answer - 1]) {
		return options[answer - 1];
	}

	const normalizedAnswer = String(answer).trim();
	const numericMatch = normalizedAnswer.match(/^(?:o)?([1-4])$/i);

	if (numericMatch) {
		const optionIndex = Number(numericMatch[1]) - 1;
		return options[optionIndex] || normalizedAnswer;
	}

	return normalizedAnswer;
};

const QuizResultPage = () => {
	const { quizId } = useParams({ strict: false });
	const { data, isLoading } = useQuizResultsQuery(quizId);

	if (isLoading) return <PageSkeleton rows={3} />;

	if (!data)
		return (
			<EmptyState
				title="No results found"
				description="Complete the quiz to see results."
			/>
		);

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Results"
				title={data.title}
				description={`Score: ${data.score}/${data.totalQuestions}`}
				actions={
					<Link
						to="/documents/$documentId"
						params={{ documentId: data.document?._id || data.document }}
					>
						<Button variant="secondary">Back to document</Button>
					</Link>
				}
			/>

			<Card>
				<p className="text-sm text-slate-400">
					Completed at {new Date(data.completedAt).toLocaleString()}
				</p>

				<div className="mt-5 space-y-4">
					{data.result?.map((item) => (
						<div
							key={item.questionIndex}
							className={`rounded-2xl border p-5 transition ${
								item.isCorrect
									? "border-emerald-400/40 bg-emerald-500/10"
									: "border-rose-400/40 bg-rose-500/10"
							}`}
						>
							{/* Question */}
							<p
								className={`font-semibold text-lg ${
									item.isCorrect ? "text-emerald-100" : "text-rose-100"
								}`}
							>
								{item.question}
							</p>

							{/* Selected Answer */}
							<div className="mt-4">
								<p className="text-sm text-slate-300 mb-1">Your Answer</p>
								<span
									className={`inline-flex rounded-lg px-3 py-1 text-sm font-medium ${
										item.isCorrect
											? "bg-emerald-500/20 text-emerald-300"
											: "bg-rose-500/20 text-rose-300"
									}`}
								>
									{item.selectedAnswer
										? getReadableAnswer(item.selectedAnswer, item.options)
										: "Not answered"}
								</span>
							</div>

							{/* Correct Answer */}
							<div className="mt-4">
								<p className="text-sm text-slate-300 mb-1">Correct Answer</p>
								<span className="inline-flex rounded-lg bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">
									{getReadableAnswer(item.correctAnswer, item.options)}
								</span>
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

export default QuizResultPage;
