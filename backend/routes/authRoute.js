/** @format */

const express = require("express");
const {
	registerHandler,
	loginHandler,
	forgotHandler,
	adminLoginHandler,
	registerAdminHandler,
	getTotalUsers,
	updateProfile,
	getUserById,
	adminCreateUser,
	adminGetAllUsers,
	adminUpdateUser,
	adminDeleteUser,
	testHandler,
	googleLoginHandler,
	logoutHandler,
} = require("../controllers/authController");
const {
	requireSignIn,
	isUser,
	isAdmin,
} = require("../middlewares/authmiddleware");

const router = express.Router();

// ---------------- USER ROUTES ---------------- //

// Register a regular user
router.post("/register", registerHandler);

// Login as a regular user
router.post("/login", loginHandler);

// Forgot password (user)
router.post("/forgot", forgotHandler);

// Protected route: check if logged in (user)
router.get("/user-auth", requireSignIn, isUser, (req, res) => {
	res.status(200).json({ ok: true, message: "User authorized" });
});

// Google login
router.post("/google-login", googleLoginHandler);

// Update user profile (both users and admins can update their own)
router.put("/profile", requireSignIn, updateProfile);

// Get user details by ID (admin or user can view)
router.get("/user/:id", requireSignIn, getUserById);

// ---------------- ADMIN ROUTES ---------------- //

// Register admin (one-time setup)
router.post("/register-admin", registerAdminHandler);

// Admin login
router.post("/admin-login", adminLoginHandler);

// Test admin protected route
router.get("/adminRoute", requireSignIn, isAdmin, testHandler);

// Check if logged in as admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
	res.status(200).json({ ok: true, message: "Admin authorized" });
});

// Get all users (admin only)
router.get("/total-users", requireSignIn, isAdmin, getTotalUsers);

// Admin: Get all users with details
router.get("/admin/users", requireSignIn, isAdmin, adminGetAllUsers);

// Admin: Create user
router.post("/admin/users", requireSignIn, isAdmin, adminCreateUser);

// Admin: Update user
router.put("/admin/users/:userId", requireSignIn, isAdmin, adminUpdateUser);

// Admin: Delete user
router.delete("/admin/users/:userId", requireSignIn, isAdmin, adminDeleteUser);

// Logout route
router.post("/logout", logoutHandler);

module.exports = router;
