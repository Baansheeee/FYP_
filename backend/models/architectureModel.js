/** @format */

const mongoose = require("mongoose");

const architectureSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			default: "",
		},
		nodes: {
			type: Array,
			default: [],
		},
		edges: {
			type: Array,
			default: [],
		},
		status: {
			type: String,
			enum: ["Draft", "Production", "Staging", "Development"],
			default: "Draft",
		},
		components: {
			type: Number,
			default: 0,
		},
		estimatedCost: {
			type: String,
			default: "$0/month",
		},
		tags: {
			type: [String],
			default: [],
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
		templateUsed: {
			type: String,
			default: null,
		},
		version: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true, collection: "architectures" }
);

module.exports = mongoose.model("Architecture", architectureSchema);
