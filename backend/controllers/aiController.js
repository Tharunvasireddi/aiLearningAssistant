import Document from "../models/Document.js";
import Flashcard from "../models/FlashCard.js";
import Quiz from "../models/ChatHistory.js";
import ChatHistory from "../models/ChatHistory.js";
import * as geminiServices from "../utils/geminiService.js";
import { findReleventChunks } from "../utils/textChunker.js";

// @desc Generate flashCards from document
// @route Post/api/ai/generate-flashcards
// @access Private

export const generateFlashController = async (req, res) => {
  try {
  } catch (error) {}
};

// @desc Generate quiz from document
// @route Post/api/ai/generate-quiz
// @acess Private

export const generateQuizController = async (req, res) => {};

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
export const explianConceptController = async(req,res)=>{
    
}

// @desc Get chat history fro a document
// @Qroute Get/api/ai/chat-history/:documentId
// @access Private
export const getChatHistoryController = async (req, res) => {};
