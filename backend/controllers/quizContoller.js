import { Quiz } from "../models/Quiz.js";

// @desc get all quizzes for document

// @desc Get/api/quizzess/:documentId

// @access Private

export const getQuizzesController = async (req, res) => {
	try {
		const quizzes = await Quiz.find({
			UserId: req.user._id,
			documentId: req.params.documentId,
		})
			.populate("documentId", "title fileName")
			.sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			message: "quizzes are fetched success fully",
			data: quizzes,
		});
	} catch (error) {
		console.log("error while getting quizes :", error);
		res.status(400).json({
			success: false,
			message: "error while getting quizes",
			error: error,
		});
	}
};

export const getQuizByIdController = async (req, res) => {
	try {
		const quiz = await Quiz.findOne({
			_id: req.params.quizId,
			UserId: req.user._id,
		}).populate("documentId", "title fileName");

		if (!quiz) {
			return res.status(400).json({
				success: false,
				message: "quiz  is not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "quiz is fetched successfully",
			data: quiz,
		});
	} catch (error) {
		console.log("error while getting quizes :", error);
		res.status(400).json({
			success: false,
			message: "error while getting quizes",
			error: error,
		});
	}
};

export const submitQuizController = async (req, res) => {
	try {
		const { answers } = req.body;

		if (!Array.isArray(answers)) {
			return res.status(400).json({
				success: false,
				message: "please provide the answers in Array",
			});
		}
		const quiz = await Quiz.findOne({
			_id: req.params.id,
			UserId: req.user._id,
		});

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: "quiz is not found",
			});
		}
		if (quiz.completedAt) {
			return res.status(400).json({
				success: false,
				error: "Quiz already completed",
			});
		}

		// process answers
		let correctCount = 0;
		const userAnswer = [];

		answers.forEach((answer) => {
			const { questionIndex, selectedAnswer } = answer;
			if (questionIndex < quiz.questions.length) {
				const question = quiz.questions[questionIndex];
				const isCorrect = selectedAnswer === question.correctAnswer;

				if (isCorrect) correctCount++;

				userAnswer.push({
					questionIndex,
					selectedAnswer,
					isCorrect,
					answeredAt: new Date(),
				});
			}
		});

		// Calculate score

		const score = Math.round((correctCount / quiz.totalQuestions) * 100);

		// Upadate quiz
		quiz.userAnswer = userAnswer;
		quiz.score = score;
		quiz.completedAt = new Date();

		await quiz.save();

		res.status(200).json({
			success: true,
			data: {
				quizId: quiz._id,
				score,
				correctCount,
				totalQuestions: quiz.totalQuestions,
				percentage: score,
				userAnswer,
			},
			message: "Quiz submitted successfully",
		});
	} catch (error) {
		console.log("error while getting quizes :", error);
		res.status(400).json({
			success: false,
			message: "error while getting quizes",
			error: error,
		});
	}
};

export const getQuizResultsController = async (req, res) => {
	try {
		const quiz = await Quiz.findOne({
			_id: req.params.id,
			UserId: req.user._id,
		}).populate("documentId", "title");

		if (!quiz) {
			return res.status(404).json({
				success: false,
				message: "Quiz is not found",
			});
		}

		if (!quiz.completedAt) {
			return res.status(400).json({
				success: false,
				message: "Quiz is not completed yet",
			});
		}
		// Buid detailed quiz results
		const detailedResults = quiz.questions.map((question, index) => {
			const userAnswer = quiz.userAnswer.find((a) => a.questionIndex === index);

			return {
				questionIndex: index,
				question: question.question,
				options: question.options,
				correctAnswer: question.correctAnswer,
				selectedAnswer: userAnswer?.selectedAnswer || null,
				isCorrect: userAnswer?.isCorrect || false,
				explaination: question.explianation,
			};
		});
		res.status(200).json({
			success: true,
			data: {
				id: quiz._id,
				title: quiz.title,
				document: quiz.documentId,
				score: quiz.score,
				totalQuestions: quiz.totalQuestions,
				completedAt: quiz.completedAt,
				result: detailedResults,
			},
		});
	} catch (error) {
		console.log("error while getting quizes :", error);
		res.status(400).json({
			success: false,
			message: "error while getting quizes",
			error: error,
		});
	}
};

export const deleteQuizController = async (req, res) => {
	try {
		const quiz = await Quiz.findOne({
			_id: req.params.id,
			UserId: req.user._id,
		});

		if (!quiz) {
			return res.status(404).json({
				success: false,
				error: "quiz is not found",
			});
		}

		await quiz.deleteOne();

		res.status(200).json({
			success: true,
			message: "quiz is deleted successfully",
		});
	} catch (error) {
		console.log("error while getting quizes :", error);
		res.status(400).json({
			success: false,
			message: "error while getting quizes",
			error: error,
		});
	}
};
