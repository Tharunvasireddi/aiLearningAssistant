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
    res.status(404).json({
      success: false,
      message: "error while fetching the single flashcard",
      error: error,
    });
  }
};

const getFlashCards = async (req, res) => {
  try {
    const flashCards = await FlashCard.find({
      UserId: req.user._id,
      documentId: req.params.documentId,
    })
      .populate("documentId", "title filename")
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
      "cards._id": req.params.cardId,
      UserId: req.user._id,
    });
    console.log("this flashcards set :", flashCardSet);

    const flashCardIndex = flashCardSet.cards.findIndex(
      (card) => card._id.toString() === req.params.cardId
    );
    if (flashCardIndex === -1) {
      res.status(404).json({
        success: flase,
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
    res.status(404).json({
      success: false,
      message: "error while reviewing the flashcards",
      error: error,
    });
  }
};

const toggleStarFlashCard = async (req, res) => {
  try {
    const flashcardSet = await FlashCard.findOne({
      "cards._id": req.params.cardId,
      UserId: req.user._id,
    });

    if (!flashcardSet) {
      return res.status(404).json({
        success: false,
        error: "Flashcard set or card not found",
      });
    }

    const cardIndex = flashcardSet.cards.findIndex(
      (card) => card._id.toString() === req.params.cardId
    );

    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Card not found in set",
        statusCode: 404,
      });
    }
    // toggle star
    flashcardSet.cards[cardIndex].isStarred =
      !flashcardSet.cards[cardIndex].isStarred;
    await flashcardSet.save();
    res.status(200).json({
      success: false,
      data: flashcardSet,
      message: "Flashcard is toggled successfully",
    });
  } catch (error) {
    console.log("error while toggling the flash cards :", error);
    res.status(400).json({
      success : false,
      message :"error while toggleStarFlashcards",
      error : error
    })
  }
};

const deleteFlashCard = async (req, res) => {
  try {
    const flashcardSet = await FlashCard.findOne({
      _id: req.params.Id,
      UserId: req.user._id,
    });
    if (!flashcardSet) {
      return res.status(404).json({
        success: false,
        message: "flash card is not found",
      });
    }

    await flashcardSet.deleteOne();
    res.status(200).json({
      success: false,
      message: "flashcardset is deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting the flashcardses :", error);
  }
};

export {
  getAllFlashCardController,
  getFlashCards,
  toggleStarFlashCard,
  reviewFlashCard,
  deleteFlashCard,
};
