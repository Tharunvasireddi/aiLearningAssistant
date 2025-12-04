import mongoose from " mongoose";

const flashCardSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    cards: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        difficulty: {
          type: String,
          enum: ["easy", "meduim", "hard"],
          defualt: "medium",
        },
        lastReviewed: {
          type: Date,
          defualt: null,
        },
        reviewCount: {
          type: Number,
          defualt: 0,
        },
        isStarred: {
          type: Boolean,
          defualt: false,
        },
      },
    ],
  },
  { timestamps: true }
);

flashCardSchema.index({ UserId: 1, documentId: 1 });
