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
    const flashcardSet = await Flashcard.findone({
      "card._id": req.params.cardId,
      userId: req.user._id,
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
  }
};

const deleteFlashCard = async (req, res) => {
  try {
    const flashcardSet = await FlashCard.findOne({
      _id: req.params.id,
      userId: req.user._id,
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
