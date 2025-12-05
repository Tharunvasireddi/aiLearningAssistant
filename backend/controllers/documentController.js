import { Document } from "../models/Document.js";
import fs from "fs/promises";
import extractTextFromPdf from "../utils/pdfParser.js";
import { chunkText } from "../utils/textChunker.js";

//  @desc upload pdf document
// @route Post /api/document/upload
// @access private
const createDocumentController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "please upload a pdf file",
      });
    }

    const { title } = req.body;
    // delete uploaded file if no title is provided
    if (!title) {
      await fs.unlink(req.file.path);
      return res.status(400).json({
        success: false,
        message: "please provide the tile of the document ",
        statusCode: 400,
      });
    }

    // construct the URL for the uploaded file
    const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
    const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`;

    // Create document record
    const document = await Document.create({
      userId: req.user._id,
      title,
      fileName: req.file.orginalname,
      filepath: fileUrl,
      fileSize: req.file.size,
      status: "processing",
    });

    // process PDF in background (in production,use a queue like blue)

    processPDF(document._id, req.file.path).catch((err) => {
      console.error(`PDF processing error`, error);
    });

    res.status(200).json({
      success: true,
      data: document,
      message: "Document uploaded successfully.processing in progress...",
    });
  } catch (error) {
    // clean up file on error
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    console.log(error);
    next(error);
  }
};

// @desc get all user documents
// @route get /api/documents
// @access private

const getDocumentsController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getDocumentController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// helper function to process pdf
const processPDF = async (documentId, filePath) => {
  try {
    const { text } = await extractTextFromPdf(filePath);

    // create chunks
    const chunks = chunkText(text, 500, 50);

    // update document
    await Document.findByIdAndUpdate(documentId, {
      extractedText: text,
      chunks: chunks,
      status: "ready",
    });
    console.log(`document ${documentId} processed sucessfully`);
  } catch (error) {
    console.log("error while processing the pdf", error);
    await Document.findByIdAndUpdate(documentId, {
      status: "failed",
    });
  }
};

const updateDocumentController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteDocumentController = async (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};

export {
  createDocumentController,
  getDocumentsController,
  getDocumentController,
  updateDocumentController,
  deleteDocumentController,
};
