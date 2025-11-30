/** @format */

const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authmiddleware");
const {
	getAllAuditLogs,
	createAuditLog,
	deleteAuditLog,
	getAuditStats,
} = require("../controllers/auditController");

const router = express.Router();

// ------------------- AUDIT LOG ROUTES -------------------

// Get all audit logs (admin only)
router.get("/", requireSignIn, isAdmin, getAllAuditLogs);

// Get audit statistics (admin only)
router.get("/stats", requireSignIn, isAdmin, getAuditStats);

// Create audit log (admin only)
router.post("/", requireSignIn, isAdmin, createAuditLog);

// Delete audit log (admin only)
router.delete("/:logId", requireSignIn, isAdmin, deleteAuditLog);

module.exports = router;
