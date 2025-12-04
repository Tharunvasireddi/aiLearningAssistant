import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
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
    message: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        relevantChunks: {
          type: [Number],
          defualt: [],
        },
      },
    ],
  },
  { timestamps: true }
);

chatHistorySchema.index({ UserId: 1, documentId: 1 });

export const Chat = mongoose.model("Chat", chatHistorySchema);
