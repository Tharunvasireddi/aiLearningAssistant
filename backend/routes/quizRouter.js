import express from "express";
import { protectMiddleware } from "../middlewares/auth";
import {
  deleteQuizController,
  getQuizByIdController,
  getQuizResultsController,
  getQuizzesController,
  submitQuizController,
} from "../controllers/quizContoller";

const quizRouter = express.Router();

quizRouter.use(protectMiddleware);
quizRouter.get("/:documentId", getQuizzesController);
quizRouter.get("/quiz/:quizId", getQuizByIdController);
quizRouter.post("/:id/submit", submitQuizController);
quizRouter.get(":id/results", getQuizResultsController);
quizRouter.delete("/:id", deleteQuizController);

export default quizRouter;
