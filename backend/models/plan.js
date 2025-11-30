/** @format */

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const planModel = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		features: {
			type: [String],
			default: [],
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		activeUsers: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("plan", planModel);
