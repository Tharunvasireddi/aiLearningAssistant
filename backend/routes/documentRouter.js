import express from "express";
import { protectMiddleware } from "../middlewares/auth.js";
import {
  createDocumentController,
  deleteDocumentController,
  getDocumentController,
  getDocumentsController,
  updateDocumentController,
} from "../controllers/documentController.js";
import upload from "../config/multer.js";
const documentRouter = express.Router();

// all routes are protect so use the protect middleware as middlware for all routes
documentRouter.use(protectMiddleware);

documentRouter.post("/upload", upload.single("file"), createDocumentController);
documentRouter.get("/getdocuments", getDocumentsController);
documentRouter.get("/:id", getDocumentController);
documentRouter.put("/:id", updateDocumentController);
documentRouter.delete("/:id", deleteDocumentController);

export default documentRouter;
