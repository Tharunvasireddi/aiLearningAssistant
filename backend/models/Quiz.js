import mongoose, { mongo } from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
          validate: [(array) => array.length === 4, "options must be required"],
        },
        correctAnswer: {
          type: String,
          required: true,
        },
        explianation: {
          type: String,
          defualt: "",
        },
        difficulty: {
          type: String,
          enum: ["easy", "meduim", "hard"],
          defualt: "meduim",
        },
      },
    ],
    userAnswer: [
      {
        questionIndex: {
          type: Number,
          required: true,
        },
        selectedAnswer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        answeredAt: {
          type: Date,
          defualt: Date.now,
        },
      },
    ],
    score: {
      type: Number,
      defualt: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

quizSchema.index({ UserId: 1, documentId: 1 });

export const Quiz = mongoose.model("Quiz", quizSchema);
