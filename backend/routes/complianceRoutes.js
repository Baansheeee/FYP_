/** @format */

const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authmiddleware");
const {
	getAllPolicies,
	createPolicy,
	updatePolicy,
	deletePolicy,
	getAllPlans,
	createPlan,
	updatePlan,
	deletePlan,
} = require("../controllers/complianceController");

const router = express.Router();

// ------------------- POLICY ROUTES -------------------

// Get all policies (admin only)
router.get("/policies", requireSignIn, isAdmin, getAllPolicies);

// Create policy (admin only)
router.post("/policies", requireSignIn, isAdmin, createPolicy);

// Update policy (admin only)
router.put("/policies/:policyId", requireSignIn, isAdmin, updatePolicy);

// Delete policy (admin only)
router.delete("/policies/:policyId", requireSignIn, isAdmin, deletePolicy);

// ------------------- PLAN ROUTES -------------------

// Get all plans (admin only)
router.get("/plans", requireSignIn, isAdmin, getAllPlans);

// Create plan (admin only)
router.post("/plans", requireSignIn, isAdmin, createPlan);

// Update plan (admin only)
router.put("/plans/:planId", requireSignIn, isAdmin, updatePlan);

// Delete plan (admin only)
router.delete("/plans/:planId", requireSignIn, isAdmin, deletePlan);

module.exports = router;
const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authmiddleware");
const {
	getAllPolicies,
	createPolicy,
	updatePolicy,
	deletePolicy,
	getAllPlans,
	createPlan,
	updatePlan,
	deletePlan,
} = require("../controllers/complianceController");

// ------------------- POLICY ROUTES -------------------

// Get all policies (admin only)
router.get("/policies", requireSignIn, isAdmin, getAllPolicies);

// Create policy (admin only)
router.post("/policies", requireSignIn, isAdmin, createPolicy);

// Update policy (admin only)
router.put("/policies/:policyId", requireSignIn, isAdmin, updatePolicy);

// Delete policy (admin only)
router.delete("/policies/:policyId", requireSignIn, isAdmin, deletePolicy);

// ------------------- PLAN ROUTES -------------------

// Get all plans (admin only)
router.get("/plans", requireSignIn, isAdmin, getAllPlans);

// Create plan (admin only)
router.post("/plans", requireSignIn, isAdmin, createPlan);

// Update plan (admin only)
router.put("/plans/:planId", requireSignIn, isAdmin, updatePlan);

// Delete plan (admin only)
router.delete("/plans/:planId", requireSignIn, isAdmin, deletePlan);

module.exports = router;
