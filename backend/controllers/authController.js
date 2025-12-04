/** @format */

const userModel = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/passbcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const Otp = require("../models/otp");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const {
	registerSchema,
	loginSchema,
	forgotSchema,
	updateProfileSchema,
	adminLoginSchema,
	getUserByIdSchema,
} = require("../validators/userValidators");

const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ------------------- REGISTER -------------------
const registerHandler = async (req, res) => {
	try {
		const { error } = registerSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ success: false, message: error.details[0].message });

		const { name, email, password, phone, username, answer } = req.body;
		const userExists = await userModel.findOne({ email });
		if (userExists)
			return res
				.status(409)
				.json({ success: false, message: "User already exists" });

		const hashedPassword = await hashPassword(password);
		const user = await new userModel({
			name,
			email,
			password: hashedPassword,
			phone,
			username,
			answer,
			role: 1,
		}).save();

		res
			.status(201)
			.json({ success: true, message: "User registered successfully", user });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- LOGIN -------------------
const loginHandler = async (req, res) => {
	try {
		const { error } = loginSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ success: false, message: error.details[0].message });

		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "User not found" });

		const match = await comparePassword(password, user.password);
		if (!match)
			return res
				.status(401)
				.json({ success: false, message: "Invalid password" });

		const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: "1d",
		});

		// Convert role to readable format
		const roleMap = {
			2: "Admin",
			1: "Developer",
			3: "Viewer",
		};

		res.status(200).json({
			success: true,
			message: "Login successful",
			token,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				username: user.username,
				phone: user.phone,
				role: roleMap[user.role] || "Developer",
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- GOOGLE LOGIN -------------------
const googleLoginHandler = async (req, res) => {
	try {
		const { tokenId } = req.body; // sent from frontend
		const ticket = await client.verifyIdToken({
			idToken: tokenId,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const { email_verified, email, name, sub: googleId, picture } = payload;

		if (!email_verified)
			return res
				.status(400)
				.json({ success: false, message: "Google login failed" });

		let user = await userModel.findOne({ email });
		if (!user) {
			user = await new userModel({
				name,
				email,
				password: googleId,
				username: name.split(" ").join("").toLowerCase(),
				phone: "N/A",
				answer: "google",
				role: 1,
			}).save();
		}

		const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: "1d",
		});

		// Convert role to readable format
		const roleMap = {
			2: "Admin",
			1: "Developer",
			3: "Viewer",
		};

		res.status(200).json({
			success: true,
			message: "Google login successful",
			token,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				username: user.username,
				role: roleMap[user.role] || "Developer",
				googleProfilePicture: picture,
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- ADMIN REGISTER (CALL ONCE) -------------------
const registerAdminHandler = async (req, res) => {
	try {
		const { name, email, password, phone, username, answer } = req.body;
		if (!name || !email || !password)
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });

		const adminExists = await userModel.findOne({ email, role: 2 });
		if (adminExists)
			return res
				.status(409)
				.json({ success: false, message: "Admin already exists" });

		const hashedPassword = await hashPassword(password);

		const admin = await new userModel({
			name,
			email,
			password: hashedPassword,
			phone,
			username,
			answer,
			role: 2, // Hardcoded admin role
		}).save();

		res
			.status(201)
			.json({ success: true, message: "Admin registered successfully", admin });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- ADMIN LOGIN -------------------
const adminLoginHandler = async (req, res) => {
	try {
		const { error } = adminLoginSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ success: false, message: error.details[0].message });

		const { name, password } = req.body;
		const admin = await userModel.findOne({ name, role: 2 });
		if (!admin)
			return res
				.status(404)
				.json({ success: false, message: "Admin not found" });

		const match = await comparePassword(password, admin.password);
		if (!match)
			return res
				.status(401)
				.json({ success: false, message: "Invalid password" });

		const token = jwt.sign({ _id: admin._id, role: 2 }, JWT_SECRET, {
			expiresIn: "1d",
		});

		res.status(200).json({
			success: true,
			message: "Admin login successful",
			token,
			admin: { _id: admin._id, name: admin.name, email: admin.email, role: 2 },
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- FORGOT PASSWORD -------------------
const forgotHandler = async (req, res) => {
	try {
		const { email, otp, newPassword, step } = req.body;

		// Step 1: Request OTP
		if (step === "request") {
			const user = await userModel.findOne({ email });
			if (!user)
				return res
					.status(404)
					.json({ success: false, message: "User not found" });

			// Generate 6-digit OTP
			const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
			const expiresAt = new Date(
				Date.now() + parseInt(process.env.OTP_EXPIRES_MIN) * 60 * 1000
			);

			// Save OTP in DB
			await Otp.findOneAndUpdate(
				{ email },
				{ code: otpCode, expiresAt },
				{ upsert: true }
			);

			// Send OTP email
			const transporter = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: process.env.SMTP_PORT,
				secure: false,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			});

			await transporter.sendMail({
				from: process.env.SMTP_USER,
				to: email,
				subject: "Password Reset OTP",
				text: `Your OTP for password reset is: ${otpCode}. It will expire in ${process.env.OTP_EXPIRES_MIN} minutes.`,
			});

			return res
				.status(200)
				.json({ success: true, message: "OTP sent to email" });
		}

		// Step 2: Verify OTP only
		if (step === "verify") {
			if (!otp)
				return res
					.status(400)
					.json({ success: false, message: "OTP required" });

			const otpRecord = await Otp.findOne({ email, code: otp });
			if (!otpRecord)
				return res.status(400).json({ success: false, message: "Invalid OTP" });

			if (otpRecord.expiresAt < new Date())
				return res.status(400).json({ success: false, message: "OTP expired" });

			return res
				.status(200)
				.json({ success: true, message: "OTP verified successfully" });
		}

		// Step 3: Reset password (after OTP is verified)
		if (step === "reset") {
			if (!newPassword)
				return res
					.status(400)
					.json({ success: false, message: "New password required" });

			// Verify OTP one more time to ensure it hasn't expired
			const otpRecord = await Otp.findOne({ email, code: otp });
			if (!otpRecord)
				return res.status(400).json({
					success: false,
					message: "OTP verification expired. Please request a new OTP",
				});

			if (otpRecord.expiresAt < new Date())
				return res.status(400).json({
					success: false,
					message: "OTP expired. Please request a new OTP",
				});

			// Hash new password
			const hashed = await hashPassword(newPassword);

			// Update user password
			await userModel.findOneAndUpdate({ email }, { password: hashed });

			// Delete OTP record
			await Otp.deleteOne({ email });

			return res
				.status(200)
				.json({ success: true, message: "Password reset successfully" });
		}

		// Invalid step
		return res
			.status(400)
			.json({ success: false, message: "Invalid step parameter" });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- UPDATE PROFILE -------------------
const updateProfile = async (req, res) => {
	try {
		const { error } = updateProfileSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ success: false, message: error.details[0].message });

		const user = await userModel.findById(req.user._id);
		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "User not found" });

		const { name, email, password, username, phone } = req.body;
		const hashedPassword = password
			? await hashPassword(password)
			: user.password;

		const updatedUser = await userModel.findByIdAndUpdate(
			req.user._id,
			{
				name: name || user.name,
				email: email || user.email,
				password: hashedPassword,
				username: username || user.username,
				phone: phone || user.phone,
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			updatedUser,
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- GET TOTAL USERS -------------------
const getTotalUsers = async (req, res) => {
	try {
		const total = await userModel.find({ role: 1 });
		res
			.status(200)
			.json({ success: true, message: "Users fetched successfully", total });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- GET USER BY ID -------------------
const getUserById = async (req, res) => {
	try {
		const { error } = getUserByIdSchema.validate(req.params);
		if (error)
			return res
				.status(400)
				.json({ success: false, message: error.details[0].message });

		const { id } = req.params;
		const user = await userModel.findById(id).select("-password");
		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "User not found" });

		res.status(200).json({
			success: true,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				username: user.username,
				phone: user.phone,
				role:
					user.role === 2 ? "Admin" : user.role === 1 ? "Developer" : "Viewer",
				status: user.status || "active",
				createdAt: user.createdAt,
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- ADMIN: CREATE USER -------------------
const adminCreateUser = async (req, res) => {
	try {
		const { name, email, role } = req.body;

		if (!name || !email || !role) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		// Check if user already exists
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			return res
				.status(409)
				.json({ success: false, message: "User already exists" });
		}

		// Generate a temporary password
		const tempPassword = Math.random().toString(36).slice(-8);
		const hashedPassword = await hashPassword(tempPassword);

		// Create user
		const newUser = await userModel.create({
			name,
			email,
			password: hashedPassword,
			username: email.split("@")[0],
			phone: "N/A",
			answer: "N/A",
			role: role === "Admin" ? 2 : role === "Developer" ? 1 : 1, // Convert to DB role numbers
		});

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role === 2 ? "Admin" : "Developer",
				status: "active",
				joinDate: newUser.createdAt,
				tempPassword, // In real app, send this via email
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- ADMIN: GET ALL USERS -------------------
const adminGetAllUsers = async (req, res) => {
	try {
		const users = await userModel.find().select("-password");

		const formattedUsers = users.map((user) => ({
			_id: user._id,
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role:
				user.role === 2 ? "Admin" : user.role === 1 ? "Developer" : "Viewer",
			status: user.status || "active",
			joinDate: user.createdAt
				? user.createdAt.toISOString().split("T")[0]
				: new Date().toISOString().split("T")[0],
		}));

		res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			users: formattedUsers,
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- ADMIN: UPDATE USER -------------------
const adminUpdateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const { name, email, phone, username, role, status } = req.body;

		if (!userId) {
			return res
				.status(400)
				.json({ success: false, message: "User ID is required" });
		}

		// Build update object with only provided fields
		const updateData = {};
		if (name !== undefined) updateData.name = name;
		if (email !== undefined) updateData.email = email;
		if (phone !== undefined) updateData.phone = phone;
		if (username !== undefined) updateData.username = username;
		if (status !== undefined) updateData.status = status;
		if (role !== undefined) {
			// Convert role string to number
			if (role === "Admin" || role === 2 || role === "2") updateData.role = 2;
			else if (role === "Developer" || role === 1 || role === "1")
				updateData.role = 1;
			else if (role === "Viewer" || role === 3 || role === "3")
				updateData.role = 3;
			else updateData.role = parseInt(role);
		}

		const user = await userModel
			.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
			.select("-password");

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({
			success: true,
			message: "User updated successfully",
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				username: user.username,
				phone: user.phone,
				role:
					user.role === 2 ? "Admin" : user.role === 1 ? "Developer" : "Viewer",
				status: user.status || "active",
				joinDate: user.createdAt
					? user.createdAt.toISOString().split("T")[0]
					: new Date().toISOString().split("T")[0],
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- ADMIN: DELETE USER -------------------
const adminDeleteUser = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!userId) {
			return res
				.status(400)
				.json({ success: false, message: "User ID is required" });
		}

		const user = await userModel.findByIdAndDelete(userId);

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

const logoutHandler = (req, res) => {
	try {
		// Nothing to delete on server — JWT is stateless
		return res.status(200).json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		console.error("logoutHandler error:", error);
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

// ------------------- TEST HANDLER -------------------
const testHandler = (req, res) => {
	res
		.status(200)
		.json({ success: true, message: "Admin route accessed successfully" });
};

// ------------------- EXPORT -------------------
module.exports = {
	registerHandler,
	loginHandler,
	forgotHandler,
	updateProfile,
	adminLoginHandler,
	registerAdminHandler,
	getTotalUsers,
	getUserById,
	adminCreateUser,
	adminGetAllUsers,
	adminUpdateUser,
	adminDeleteUser,
	testHandler,
	googleLoginHandler,
	logoutHandler,
};
