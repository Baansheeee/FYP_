/** @format */

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const policyModel = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		enforced: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			enum: ["Security", "Privacy", "Compliance", "Access"],
			default: "Security",
		},
		lastModified: {
			type: Date,
			default: Date.now,
		},
		modifiedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("policy", policyModel);
