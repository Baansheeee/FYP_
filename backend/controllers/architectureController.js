/** @format */

const Architecture = require("../models/architectureModel");

// Create a blank architecture
const createBlankArchitecture = async (req, res) => {
	try {
		const { name, description } = req.body;
		const userId = req.user?.id || req.user?._id || req.userId;

		console.log("🔷 CreateBlankArchitecture - Request body:", {
			name,
			description,
		});
		console.log("🔷 CreateBlankArchitecture - User from token:", req.user);
		console.log("🔷 CreateBlankArchitecture - Extracted userId:", userId);

		if (!userId) {
			console.error("❌ No userId found");
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}

		if (!name || !name.trim()) {
			console.error("❌ No name provided");
			return res.status(400).json({
				success: false,
				message: "Architecture name is required",
			});
		}

		const newArchitecture = new Architecture({
			userId,
			name: name.trim(),
			description: description || "",
			nodes: [],
			edges: [],
			status: "Draft",
			components: 0,
		});

		console.log("🔷 Architecture object before save:", newArchitecture);

		const savedArchitecture = await newArchitecture.save();

		console.log("✅ Architecture saved successfully:", savedArchitecture);

		console.log(
			"🔷 About to send 201 response with architecture:",
			savedArchitecture._id
		);

		const responsePayload = {
			success: true,
			message: "Architecture created successfully",
			architecture: savedArchitecture,
		};

		console.log(
			"🔷 Response payload:",
			JSON.stringify(responsePayload, null, 2)
		);

		return res.status(201).json(responsePayload);
	} catch (error) {
		console.error("❌ Error creating architecture:", error);
		console.error("❌ Error details:", {
			name: error.name,
			message: error.message,
			code: error.code,
			stack: error.stack,
		});

		return res.status(500).json({
			success: false,
			message: "Failed to create architecture",
			error: error.message,
			details: error.errors ? Object.keys(error.errors) : null,
		});
	}
};

// Get all architectures for a user
const getUserArchitectures = async (req, res) => {
	try {
		const userId = req.user?.id || req.user?._id || req.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}

		const architectures = await Architecture.find({ userId }).sort({
			createdAt: -1,
		});

		res.status(200).json({
			success: true,
			message: "Architectures fetched successfully",
			architectures: architectures || [],
			total: architectures.length,
		});
	} catch (error) {
		console.error("Error fetching architectures:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch architectures",
			error: error.message,
		});
	}
};

// Get a single architecture by ID
const getArchitectureById = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.id || req.user?._id || req.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}

		const architecture = await Architecture.findById(id);

		if (!architecture) {
			return res.status(404).json({
				success: false,
				message: "Architecture not found",
			});
		}

		// Check if user owns this architecture or it's public
		if (
			architecture.userId.toString() !== userId.toString() &&
			!architecture.isPublic
		) {
			return res.status(403).json({
				success: false,
				message: "You do not have permission to view this architecture",
			});
		}

		res.status(200).json({
			success: true,
			message: "Architecture fetched successfully",
			architecture,
		});
	} catch (error) {
		console.error("Error fetching architecture:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch architecture",
			error: error.message,
		});
	}
};

// Save/Update architecture
const saveArchitecture = async (req, res) => {
	try {
		const { id, name, description, nodes, edges, status, tags } = req.body;
		const userId = req.user?.id || req.user?._id || req.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}

		// If creating new without ID
		if (!id) {
			const newArchitecture = new Architecture({
				userId,
				name: name || "Untitled Architecture",
				description: description || "",
				nodes: nodes || [],
				edges: edges || [],
				status: status || "Draft",
				tags: tags || [],
				components: nodes ? nodes.length : 0,
			});

			const savedArchitecture = await newArchitecture.save();

			return res.status(201).json({
				success: true,
				message: "Architecture created and saved successfully",
				architecture: savedArchitecture,
			});
		}

		// Update existing architecture
		const architecture = await Architecture.findById(id);

		if (!architecture) {
			return res.status(404).json({
				success: false,
				message: "Architecture not found",
			});
		}

		// Verify ownership
		if (architecture.userId.toString() !== userId.toString()) {
			return res.status(403).json({
				success: false,
				message: "You do not have permission to update this architecture",
			});
		}

		// Update fields
		if (name) architecture.name = name;
		if (description !== undefined) architecture.description = description;
		if (nodes !== undefined) architecture.nodes = nodes;
		if (edges !== undefined) architecture.edges = edges;
		if (status) architecture.status = status;
		if (tags) architecture.tags = tags;
		if (nodes) architecture.components = nodes.length;

		architecture.version = (architecture.version || 1) + 1;

		const updatedArchitecture = await architecture.save();

		res.status(200).json({
			success: true,
			message: "Architecture saved successfully",
			architecture: updatedArchitecture,
		});
	} catch (error) {
		console.error("Error saving architecture:", error);
		res.status(500).json({
			success: false,
			message: "Failed to save architecture",
			error: error.message,
		});
	}
};

// Delete architecture
const deleteArchitecture = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.id || req.user?._id || req.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}

		const architecture = await Architecture.findById(id);

		if (!architecture) {
			return res.status(404).json({
				success: false,
				message: "Architecture not found",
			});
		}

		// Verify ownership
		if (architecture.userId.toString() !== userId.toString()) {
			return res.status(403).json({
				success: false,
				message: "You do not have permission to delete this architecture",
			});
		}

		await Architecture.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: "Architecture deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting architecture:", error);
		res.status(500).json({
			success: false,
			message: "Failed to delete architecture",
			error: error.message,
		});
	}
};

// Update architecture status
const updateStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const userId = req.user?.id || req.user?._id || req.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}

		const validStatuses = ["Draft", "Production", "Staging", "Development"];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({
				success: false,
				message: "Invalid status",
			});
		}

		const architecture = await Architecture.findById(id);

		if (!architecture) {
			return res.status(404).json({
				success: false,
				message: "Architecture not found",
			});
		}

		// Verify ownership
		if (architecture.userId.toString() !== userId.toString()) {
			return res.status(403).json({
				success: false,
				message: "You do not have permission to update this architecture",
			});
		}

		architecture.status = status;
		const updatedArchitecture = await architecture.save();

		res.status(200).json({
			success: true,
			message: "Architecture status updated successfully",
			architecture: updatedArchitecture,
		});
	} catch (error) {
		console.error("Error updating architecture status:", error);
		res.status(500).json({
			success: false,
			message: "Failed to update architecture status",
			error: error.message,
		});
	}
};

module.exports = {
	createBlankArchitecture,
	getUserArchitectures,
	getArchitectureById,
	saveArchitecture,
	deleteArchitecture,
	updateStatus,
};
