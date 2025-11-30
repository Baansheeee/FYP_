/** @format */

const Policy = require("../models/policy");
const Plan = require("../models/plan");

// ===================== POLICIES =====================

// ------------------- GET ALL POLICIES -------------------
const getAllPolicies = async (req, res) => {
	try {
		const policies = await Policy.find()
			.populate("modifiedBy", "name email")
			.sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			message: "Policies fetched successfully",
			policies: policies.map((policy) => ({
				id: policy._id,
				name: policy.name,
				description: policy.description,
				enforced: policy.enforced,
				type: policy.type,
				lastModified: policy.lastModified.toISOString().split("T")[0],
			})),
			total: policies.length,
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- CREATE POLICY -------------------
const createPolicy = async (req, res) => {
	try {
		const { name, description, enforced = false, type = "Security" } = req.body;

		if (!name || !description) {
			return res
				.status(400)
				.json({ success: false, message: "Name and description are required" });
		}

		const existingPolicy = await Policy.findOne({ name });
		if (existingPolicy) {
			return res
				.status(409)
				.json({ success: false, message: "Policy already exists" });
		}

		const newPolicy = await Policy.create({
			name,
			description,
			enforced,
			type,
			modifiedBy: req.userId || null,
		});

		res.status(201).json({
			success: true,
			message: "Policy created successfully",
			policy: {
				id: newPolicy._id,
				name: newPolicy.name,
				description: newPolicy.description,
				enforced: newPolicy.enforced,
				type: newPolicy.type,
				lastModified: newPolicy.lastModified.toISOString().split("T")[0],
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- UPDATE POLICY -------------------
const updatePolicy = async (req, res) => {
	try {
		const { policyId } = req.params;
		const { name, description, enforced, type } = req.body;

		if (!policyId) {
			return res
				.status(400)
				.json({ success: false, message: "Policy ID is required" });
		}

		const updateData = {};
		if (name !== undefined) updateData.name = name;
		if (description !== undefined) updateData.description = description;
		if (enforced !== undefined) updateData.enforced = enforced;
		if (type !== undefined) updateData.type = type;
		updateData.modifiedBy = req.userId || null;
		updateData.lastModified = Date.now();

		const policy = await Policy.findByIdAndUpdate(policyId, updateData, {
			new: true,
		});

		if (!policy) {
			return res
				.status(404)
				.json({ success: false, message: "Policy not found" });
		}

		res.status(200).json({
			success: true,
			message: "Policy updated successfully",
			policy: {
				id: policy._id,
				name: policy.name,
				description: policy.description,
				enforced: policy.enforced,
				type: policy.type,
				lastModified: policy.lastModified.toISOString().split("T")[0],
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- DELETE POLICY -------------------
const deletePolicy = async (req, res) => {
	try {
		const { policyId } = req.params;

		if (!policyId) {
			return res
				.status(400)
				.json({ success: false, message: "Policy ID is required" });
		}

		const policy = await Policy.findByIdAndDelete(policyId);

		if (!policy) {
			return res
				.status(404)
				.json({ success: false, message: "Policy not found" });
		}

		res.status(200).json({
			success: true,
			message: "Policy deleted successfully",
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ===================== PLANS =====================

// ------------------- GET ALL PLANS -------------------
const getAllPlans = async (req, res) => {
	try {
		const plans = await Plan.find().sort({ price: 1 });

		res.status(200).json({
			success: true,
			message: "Plans fetched successfully",
			plans: plans.map((plan) => ({
				id: plan._id,
				name: plan.name,
				price: plan.price,
				features: plan.features,
				status: plan.status,
				users: plan.activeUsers,
			})),
			total: plans.length,
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- CREATE PLAN -------------------
const createPlan = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			features = [],
			status = "active",
		} = req.body;

		if (!name || price === undefined) {
			return res
				.status(400)
				.json({ success: false, message: "Name and price are required" });
		}

		const existingPlan = await Plan.findOne({ name });
		if (existingPlan) {
			return res
				.status(409)
				.json({ success: false, message: "Plan already exists" });
		}

		const newPlan = await Plan.create({
			name,
			description,
			price,
			features,
			status,
		});

		res.status(201).json({
			success: true,
			message: "Plan created successfully",
			plan: {
				id: newPlan._id,
				name: newPlan.name,
				price: newPlan.price,
				features: newPlan.features,
				status: newPlan.status,
				users: newPlan.activeUsers,
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- UPDATE PLAN -------------------
const updatePlan = async (req, res) => {
	try {
		const { planId } = req.params;
		const { name, description, price, features, status, activeUsers } =
			req.body;

		if (!planId) {
			return res
				.status(400)
				.json({ success: false, message: "Plan ID is required" });
		}

		const updateData = {};
		if (name !== undefined) updateData.name = name;
		if (description !== undefined) updateData.description = description;
		if (price !== undefined) updateData.price = price;
		if (features !== undefined) updateData.features = features;
		if (status !== undefined) updateData.status = status;
		if (activeUsers !== undefined) updateData.activeUsers = activeUsers;

		const plan = await Plan.findByIdAndUpdate(planId, updateData, {
			new: true,
		});

		if (!plan) {
			return res
				.status(404)
				.json({ success: false, message: "Plan not found" });
		}

		res.status(200).json({
			success: true,
			message: "Plan updated successfully",
			plan: {
				id: plan._id,
				name: plan.name,
				price: plan.price,
				features: plan.features,
				status: plan.status,
				users: plan.activeUsers,
			},
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

// ------------------- DELETE PLAN -------------------
const deletePlan = async (req, res) => {
	try {
		const { planId } = req.params;

		if (!planId) {
			return res
				.status(400)
				.json({ success: false, message: "Plan ID is required" });
		}

		const plan = await Plan.findByIdAndDelete(planId);

		if (!plan) {
			return res
				.status(404)
				.json({ success: false, message: "Plan not found" });
		}

		res.status(200).json({
			success: true,
			message: "Plan deleted successfully",
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: "Server error", error: err.message });
	}
};

module.exports = {
	// Policies
	getAllPolicies,
	createPolicy,
	updatePolicy,
	deletePolicy,
	// Plans
	getAllPlans,
	createPlan,
	updatePlan,
	deletePlan,
};
