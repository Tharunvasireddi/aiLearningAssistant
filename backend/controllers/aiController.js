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
    const { documentId, numQuestion = 5, title } = req.body;

    if (!documentId) {
      return res.status(404).json({
        success: false,
        message: "document id is not foound,please provide the doucment",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      UserId: req.user._id,
      status: "ready",
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "document is not found",
      });
    }
    const questions = await geminiService.generateQuiz(
      document.extractedText,
      parseInt(numQuestion)
    );
    console.log("qestions of the quiz is :", questions);

    const quiz = await Quiz.create({
      UserId: req.user._id,
      documentId: documentId,
      title: title || `${document.title}-quiz`,
      questions: questions,
      totalQuestions: questions.length,
      userAnswer: [],
      score: 0,
    });

    res.status(201).json({
      success: true,
      message: "quiz generated Succesfully",
      data: quiz,
    });
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
export const generateSummaryController = async (req, res) => {
  try {
    const { documentId } = req.body;
    if (!documentId) {
      return res.status(404).json({
        success: false,
        message: "document ID is not found",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      UserId: req.user._id,
      status: "ready",
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "document is not found",
      });
    }

    const generatedSummary = await geminiService.generateSummary(
      document.extractedText
    );
    console.log("generated Summary :", generatedSummary);
    res.status(200).json({
      success: false,
      message: "summary is generated successfully",
      summary: generatedSummary,
    });
  } catch (error) {
    console.log("error while generating Summary :", error);
    res.status(400).json({
      success: false,
      message: "error while generating summary",
      error: error,
    });
  }
};

// @desec chat with document
// @route Post/api/ai/chat
// @access Private
export const chatController = async (req, res) => {
  try {
    const { documentId, question } = req.body;
    if (!documentId || !question) {
      return res.status(404).json({
        success: false,
        message: "please provide the documentId or question",
      });
    }
    const document = await Document.findOne({
      _id: documentId,
      UserId: req.user._id,
      status: "ready",
    }).populate("chunks");
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "document is not found",
      });
    }

    console.log("this document chunks :", document);
    // FInd the revelant chunks
    const relevantChunks = findReleventChunks(document.chunks, question, 3);
    const chunkIndices = relevantChunks.map((c) => c.chunkIndex);

    // get or create chat history
    let chatHistory = await Chat.findOne({
      UserId: req.user._id,
      documentId: documentId,
    });

    if (!chatHistory) {
      chatHistory = await Chat.create({
        UserId: req.user._id,
        documentId: documentId,
        message: [],
      });
    }

    // generate response using geminni
    const answer = await geminiService.chatWithContext(
      question,
      relevantChunks
    );

    // save conversation
    chatHistory.message.push(
      {
        role: "user",
        content: question,
        timestamp: new Date(),
        relevantChunks: [],
      },
      {
        role: "assistant",
        content: answer,
        timestamp: new Date(),
        relevantChunks: chunkIndices,
      }
    );

    await chatHistory.save();

    res.status(200).json({
      success: true,
      message: "chat is generaed successfully",
      data: {
        question,
        answer,
        relevantChunks: chunkIndices,
        chatHistoryId: chatHistory._id,
      },
    });
  } catch (error) {
    console.log("error while chat history controller :", error);
    res.status(400).json({
      success: false,
      message: "error while generating chat history",
      error: error,
    });
  }
};

// @desec explain fro document
// @route Post/api/ai/explain-concept
// @access Private
export const explianConceptController = async (req, res) => {
  try {
    const { documentId, concept } = req.body;

    if (!documentId || !concept) {
      return res.status(404).json({
        success: false,
        message: "please provide document Id and concept",
      });
    }
    const document = await Document.findOne({
      _id: documentId,
      UserId: req.user._id,
      status: "ready",
    }).populate("chunks");

    const relevantChunks = findReleventChunks(document.chunks, concept, 3);
    const context = relevantChunks.map((c) => c.content).join("\n\n");

    // genraing the explaination  using gemini
    const explaination = await geminiService.explainConcept(concept, context);
    res.status(200).json({
      success: true,
      data: [concept, explaination, relevantChunks.map((c) => c.chunkIndex)],
      message: "explaination is generting successfully",
    });
  } catch (error) {
    console.log("error while generating explaination :", error);
    return res.status(400).json({
      success: false,
      message: "error while generating explaination",
    });
  }
};

// @desc Get chat history fro a document
// @Qroute Get/api/ai/chat-history/:documentId
// @access Private
export const getChatHistoryController = async (req, res) => {
  try {
    const { documentId } = req.body;
  } catch (error) {}
};
