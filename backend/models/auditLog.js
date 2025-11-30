/** @format */

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const auditLogModel = mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		action: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ["Deployment", "Policy", "Auth", "User", "Lecture", "System"],
			default: "System",
		},
		status: {
			type: String,
			enum: ["success", "failed", "warning"],
			default: "success",
		},
		details: {
			type: String,
		},
		ipAddress: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("auditLog", auditLogModel);
