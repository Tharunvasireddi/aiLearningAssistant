import express from "express";
import { protectMiddleware } from "../middlewares/auth";
import {
  chatController,
  explianConceptController,
  generateFlashController,
  generateQuizController,
  generateSummaryController,
  getChatHistoryController,
} from "../controllers/aiController";

const aiRouter = express.Router();

aiRouter.use(protectMiddleware);

aiRouter.post("/generate-flashcarda", generateFlashController);
aiRouter.post("/generate-quiz", generateQuizController);
aiRouter.post("/generate-summary", generateSummaryController);
aiRouter.post("chat", chatController);
aiRouter.post("/explain-concept", explianConceptController);
aiRouter.get("chat-history/:documentId", getChatHistoryController);

export default aiRouter;
