/** @format */

const jwt = require("jsonwebtoken");

// Middleware to check if user is logged in (any user)
const requireSignIn = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res
				.status(401)
				.json({ success: false, message: "Authentication token is required" });
		}

		const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Token is missing" });
		}

		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.error("requireSignIn error:", error);
		return res
			.status(401)
			.json({ success: false, message: "Invalid or expired token" });
	}
};

// Middleware to check if the user is a regular user (role = 1)
const isUser = (req, res, next) => {
	try {
		if (req.user.role !== 1 && req.user.role !== "1") {
			return res
				.status(403)
				.json({ success: false, message: "Access denied. Users only." });
		}
		next();
	} catch (error) {
		console.error("isUser error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

// Middleware to check if the user is admin (role = 2)
const isAdmin = (req, res, next) => {
	try {
		if (req.user.role !== 2 && req.user.role !== "2") {
			return res
				.status(403)
				.json({ success: false, message: "Access denied. Admins only." });
		}
		next();
	} catch (error) {
		console.error("isAdmin error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

module.exports = {
	requireSignIn,
	isUser,
	isAdmin,
	authMiddleware: requireSignIn,
};
