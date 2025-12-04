/** @format */

const express = require("express");
const {
	createBlankArchitecture,
	getUserArchitectures,
	getArchitectureById,
	saveArchitecture,
	deleteArchitecture,
	updateStatus,
} = require("../controllers/architectureController");
const { requireSignIn } = require("../middlewares/authmiddleware");

const router = express.Router();

// Debug middleware to log all requests
router.use((req, res, next) => {
	console.log(`🔷 Architecture Route - ${req.method} ${req.path}`);
	console.log("🔷 Headers:", req.headers);
	console.log("🔷 Body:", req.body);
	next();
});

// Protect all routes with auth middleware
router.use(requireSignIn);

// Test endpoint to verify auth
router.get("/test/auth", (req, res) => {
	console.log("🔷 test/auth endpoint hit");
	res.json({
		success: true,
		message: "Auth working",
		user: req.user,
	});
});

// Test endpoint to verify 201 response
router.post("/test/create", (req, res) => {
	console.log("🔷 test/create endpoint hit with body:", req.body);
	res.status(201).json({
		success: true,
		message: "Test create working",
		data: { id: "test123", name: "Test" },
	});
});

// Create a blank architecture
router.post("/create-blank", createBlankArchitecture);

// Get all architectures for the user (this is the "list" endpoint)
router.get("/list", getUserArchitectures);

// Save/Update architecture
router.post("/save", saveArchitecture);

// Get single architecture by ID
router.get("/:id", getArchitectureById);

// Update architecture status
router.patch("/:id/status", updateStatus);

// Delete architecture
router.delete("/:id", deleteArchitecture);

module.exports = router;
