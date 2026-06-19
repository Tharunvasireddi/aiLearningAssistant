import mongoose from "mongoose";

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
					enum: ["easy", "medium", "meduim", "hard"],
					default: "medium",
				},
				lastReviewed: {
					type: Date,
					default: null,
				},
				reviewCount: {
					type: Number,
					default: 0,
				},
				isStarred: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{ timestamps: true },
);

flashCardSchema.index({ UserId: 1, documentId: 1 });

export const FlashCard = mongoose.model("FlashCard", flashCardSchema);
