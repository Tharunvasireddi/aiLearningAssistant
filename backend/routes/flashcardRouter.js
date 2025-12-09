import express from "express";
import { protectMiddleware } from "../middlewares/auth.js";
import {
  getAllFlashCardController,
  getFlashCards,
  reviewFlashCard,
  toggleStarFlashCard,
} from "../controllers/flashcardController.js";
import { deleteDocumentController } from "../controllers/documentController.js";

const flashCardRouter = express.Router();

flashCardRouter.use(protectMiddleware);

flashCardRouter.get("/", getAllFlashCardController);
flashCardRouter.get("/:documentId", getFlashCards);
flashCardRouter.post("/:cardId/review", reviewFlashCard);
flashCardRouter.put("/:cardId/star", toggleStarFlashCard);
flashCardRouter.delete("/:id", deleteDocumentController);

export default flashCardRouter;
