import { Document } from "../models/Document.js";
import { FlashCard } from "../models/FlashCard.js";
import { Quiz } from "../models/Quiz.js";
import { Chat } from "../models/ChatHistory.js";
import * as geminiService from "../utils/geminiService.js";
import { findReleventChunks } from "../utils/textChunker.js";

// @desc Generate flashCards from document
// @route Post/api/ai/generate-flashcards
// @access Private

export const generateFlashController = async (req, res) => {
  try {
    const { documentId, count = 10 } = req.body;
    if (!documentId) {
      return res.status(404).json({
        success: false,
        error: "Please prvide documentId",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      UserId: req.user._id,
      status: "ready",
    }).select("+extractedText");
    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document is not found or not ready",
      });
    }
    // console.log("this is the docment that we go:", document);
    // generate flashcards using gemini
    const cards = await geminiService.generateFlashcards(
      document.extractedText,
      parseInt(count)
    );
    // save to data base
    const flashcardSet = await FlashCard.create({
      UserId: req.user._id,
      documentId: document._id,
      cards: cards.map((card) => ({
        question: card.question,
        answer: card.answer,
        difficulty: card.difficulty,
        reviewCount: 0,
        isStarred: false,
      })),
    });

    res.status(200).json({
      success: true,
      message: "flashcards are generated successfully",
      data: flashcardSet,
    });
  } catch (error) {
    console.log("error while generating flashcards :", error);
    res.status(400).json({
      success: false,
      message: "error while generating flashcards",
    });
  }
};

// @desc Generate quiz from document
// @route Post/api/ai/generate-quiz
// @acess Private

export const generateQuizController = async (req, res) => {
  try {
       

  } catch (error) {
    console.log("error while generate Quizes", error);
    res.status(400).json({
      success: false,
      message: "error while generating quiz",
    });
  }
};

// @desec Generate document summary
// @route Post/api/ai/generate-summary
// @access Private
export const generateSummaryController = async (req, res) => {};

// @desec chat with document
// @route Post/api/ai/chat
// @access Private
export const chatController = async (req, res) => {};

// @desec explain fro document
// @route Post/api/ai/explain-concept
// @access Private
export const explianConceptController = async (req, res) => {};

// @desc Get chat history fro a document
// @Qroute Get/api/ai/chat-history/:documentId
// @access Private
export const getChatHistoryController = async (req, res) => {};
