import { FlashCard } from "../models/FlashCard.js";

// get all flashcards of the user

const getAllFlashCardController = async (req, res) => {
  try {
    const allFlashCards = await FlashCard.find({
      UserId: req.user._id,
    })
      .populate("documentId", "title")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "all flash cards are feched successfully",
      data: allFlashCards,
      count: allFlashCards.length,
    });
  } catch (error) {
    console.log("error while fetching the flashcards :", error);
  }
};

const getFlashCards = async (req, res) => {
  try {
    const flashCards = await flashCards
      .find({ UserId: req.user._id, documentId: req.params.documentId })
      .populate("document", "title filename")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "flash card is fetched successfully",
      data: flashCards,
      count: flashCards.length,
    });
  } catch (error) {
    console.log("error while fectching flash card", error);
  }
};

const reviewFlashCard = async (req, res) => {
  try {
    const flashCardSet = await FlashCard.findOne({
      "cards._id": req.params._id,
      userId: req.user._id,
    });

    const flashCardIndex = flashCardSet.cards.findIndex(
      (card) => card._id.toString() === req.params._id
    );
    if (flashCardIndex === -1) {
      res.status(404).json({
        success: true,
        message: "flash card is not found",
      });
    }
    const flashCard = flashCardSet.cards[flashCardIndex];
    flashCard.lastReviewed = Date.now();
    flashCard.reviewCount = flashCard.reviewCount + 1;

    await flashCardSet.save();
    res.status(200).json({
      success: true,
      message: "flash card is reviewed successfully",
      data: flashCardSet,
    });
  } catch (error) {
    console.log("error while reviweing flashcards", error);
  }
};

const toggleStarFlashCard = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteFlashCard = async (req, res) => {
  try {
  } catch (error) {}
};

export {
  getAllFlashCardController,
  getFlashCards,
  toggleStarFlashCard,
  reviewFlashCard,
  deleteFlashCard,
};
