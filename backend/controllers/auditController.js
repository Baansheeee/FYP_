/** @format */

const AuditLog = require("../models/auditLog");

// ------------------- GET ALL AUDIT LOGS -------------------
const getAllAuditLogs = async (req, res) => {
	try {
		const logs = await AuditLog.find()
			.populate("userId", "name email")
			.sort({ createdAt: -1 })
			.limit(100);

		res.status(200).json({
			success: true,
			message: "Audit logs fetched successfully",
			logs: logs.map((log) => ({
				id: log._id,
				user: log.user,
				action: log.action,
				category: log.category,
				status: log.status,
				details: log.details,
				timestamp: new Date(log.createdAt).toLocaleString(),
				createdAt: log.createdAt,
			})),
			total: await AuditLog.countDocuments(),
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- CREATE AUDIT LOG -------------------
const createAuditLog = async (req, res) => {
	try {
		const {
			user,
			action,
			category,
			status = "success",
			details,
			ipAddress,
		} = req.body;

		if (!user || !action) {
			return res
				.status(400)
				.json({ success: false, message: "User and action are required" });
		}

		const newLog = await AuditLog.create({
			user,
			action,
			category,
			status,
			details,
			ipAddress,
			userId: req.userId || null,
		});

		res.status(201).json({
			success: true,
			message: "Audit log created successfully",
			log: newLog,
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- DELETE AUDIT LOG -------------------
const deleteAuditLog = async (req, res) => {
	try {
		const { logId } = req.params;

		if (!logId) {
			return res
				.status(400)
				.json({ success: false, message: "Log ID is required" });
		}

		const log = await AuditLog.findByIdAndDelete(logId);

		if (!log) {
			return res
				.status(404)
				.json({ success: false, message: "Audit log not found" });
		}

		res.status(200).json({
			success: true,
			message: "Audit log deleted successfully",
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- GET AUDIT LOG STATS -------------------
const getAuditStats = async (req, res) => {
	try {
		const total = await AuditLog.countDocuments();
		const successCount = await AuditLog.countDocuments({ status: "success" });
		const failedCount = await AuditLog.countDocuments({ status: "failed" });
		const warningCount = await AuditLog.countDocuments({ status: "warning" });

		res.status(200).json({
			success: true,
			stats: {
				total,
				success: successCount,
				failed: failedCount,
				warning: warningCount,
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

module.exports = {
	getAllAuditLogs,
	createAuditLog,
	deleteAuditLog,
	getAuditStats,
};
