import { Document } from "../models/Document.js";
import fs from "fs/promises";
import extractTextFromPdf from "../utils/pdfParser.js";
import { chunkText } from "../utils/textChunker.js";
import mongoose from "mongoose";
import { FlashCard } from "../models/FlashCard.js";
import { Quiz } from "../models/Quiz.js";
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

    console.log("this is file ", req.file);
    // Create document record
    const document = await Document.create({
      UserId: req.user._id,
      title,
      fileName: req.file.originalname,
      filepath: fileUrl,
      fileSize: req.file.size,
      status: "processing",
    });

    // process PDF in background (in production,use a queue like blue)

    processPDF(document._id, req.file.path).catch((err) => {
      console.error(`PDF processing error`, err);
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
    console.log("hi ghello ", error);
    next(error);
  }
};

// @desc get all user documents
// @route get /api/documents
// @access private

const getDocumentsController = async (req, res, next) => {
  try {
    console.log("hie helooooo");
    const documents = await Document.aggregate([
      {
        $match: { UserId: new mongoose.Types.ObjectId(req.user._id) },
      },
      {
        $lookup: {
          from: "flashcards",
          localField: "_id",
          foreignField: "documentId",
          as: "flashcardSets",
        },
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "_id",
          foreignField: "documentId",
          as: "quizzes",
        },
      },
      {
        $addFields: {
          flashcardCount: { $size: "$flashcardSets" },
          quizCount: { $size: "$quizzes" },
        },
      },
      {
        $project: {
          extractedText: 0,
          chunks: 0,
          flashcardSets: 0,
          quizzes: 0,
        },
      },
      {
        $sort: { uploadDate: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    console.log("error while getting documents", error);

    next(error);
  }
};

const getDocumentController = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      UserId: req.user._id,
    });
    if (!document) {
      res.status(404).json({
        success: false,
        message: "document is not found",
      });
    }
    // now we have to count the no of flash cards and quizes associated with this  doucment
    const flashCardCount = await FlashCard.countDocuments({
      documentId: document._id,
      UserId: req.user._id,
    });

    const quizCardCount = await Quiz.countDocuments({
      documentId: document._id,
      UserId: req.user._id,
    });

    //  upadating the last accessing date
    document.lastAccessed = Date.now();
    await document.save();

    const documentData = document.toObject();
    documentData.flashCardCount = flashCardCount;
    documentData.quizCardCount = quizCardCount;

    res.status(200).json({
      success: true,
      message: "document is fetched successfuly",
      data: documentData,
    });
  } catch (error) {
    console.log("error while fetching the single document");
    next(error);
  }
};

// helper function to process pdf
const processPDF = async (documentId, filePath) => {
  try {
    const { text } = await extractTextFromPdf(filePath);

    // create chunk
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

const deleteDocumentController = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      UserId: req.user._id,
    });
    if (!document) {
      res.status(404).json({
        success: false,
        message: "document is not found",
      });
    }

    // unlink the file from the file system
    await fs.unlink(document.filepath).catch(() => {});

    await document.deleteOne();
    res.status(200).json({
      success: true,
      message: "document is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createDocumentController,
  getDocumentsController,
  getDocumentController,
  deleteDocumentController,
};
