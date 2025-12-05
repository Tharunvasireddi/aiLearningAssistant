import express from "express";
import { protectMiddleware } from "../middlewares/auth";
import {
  createDocumentController,
  deleteDocumentController,
  getDocumentController,
  getDocumentsController,
  updateDocumentController,
} from "../controllers/documentController";
const documentRouter = express.Router();

// all routes are protect so use the protect middleware as middlware for all routes
documentRouter.use(protectMiddleware);

documentRouter.post("/create", createDocumentController);
documentRouter.get("/", getDocumentsController);
documentRouter.get("/:id", getDocumentController);
documentRouter.put("/:id", updateDocumentController);
documentRouter.delete("/:id", deleteDocumentController);

export default documentRouter;
