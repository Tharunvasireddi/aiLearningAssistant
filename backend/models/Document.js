import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "please provide document title"],
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    filesize: {
      type: Number,
      required: true,
    },
    extractText: {
      type: String,
      defualt: "",
    },
    chunks: [
      {
        contents: {
          type: String,
          required: true,
        },
        pageNumber: {
          type: Number,
          required: true,
        },
      },
    ],
    uploadDate: {
      type: Date,
      defualt: Date.now,
    },
    lastAccessed: {
      type: Date,
      defualt: Date.now,
    },
    status: {
      type: String,
      enum: ["processing", "reades", "failed"],
      defualt: "processing",
    },
  },
  { timestamps: true }
);

documentSchema.index({ userId: 1, uploadDate: -1 });

export const Document = mongoose.model("Document", documentSchema);
