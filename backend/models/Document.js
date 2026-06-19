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
		fileSize: {
			type: Number,
			required: true,
		},
		extractedText: {
			type: String,
			default: "",
		},
		chunks: [
			{
				content: {
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
			default: Date.now,
		},
		lastAccessed: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			enum: ["processing", "ready", "failed"],
			default: "processing",
		},
	},
	{ timestamps: true },
);

documentSchema.index({ UserId: 1, uploadDate: -1 });

export const Document = mongoose.model("Document", documentSchema);
