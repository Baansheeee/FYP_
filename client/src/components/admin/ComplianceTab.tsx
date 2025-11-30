/** @format */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	CheckCircle2,
	Loader2,
	Plus,
	Edit2,
	Trash2,
	X,
	AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/api/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Policy {
	_id: string;
	name: string;
	description: string;
	enforced: boolean;
	lastModified: string;
	type: string;
}

interface Plan {
	_id: string;
	name: string;
	price: number;
	features: string[];
	activeUsers: number;
	status: "active" | "inactive";
}

const ComplianceTab = () => {
	const [policies, setPolicies] = useState<Policy[]>([]);
	const [plans, setPlans] = useState<Plan[]>([]);
	const [policiesLoading, setPoliciesLoading] = useState(true);
	const [plansLoading, setPlansLoading] = useState(true);

	// Policy Dialog States
	const [policyDialogOpen, setPolicyDialogOpen] = useState(false);
	const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
	const [policyFormData, setPolicyFormData] = useState({
		name: "",
		description: "",
		enforced: false,
		type: "Security",
	});
	const [policyFormErrors, setPolicyFormErrors] = useState<{
		[key: string]: string;
	}>({});
	const [policySaving, setPolicySaving] = useState(false);
	const [deletePolicy, setDeletePolicy] = useState<Policy | null>(null);
	const [isDeletingPolicy, setIsDeletingPolicy] = useState(false);

	// Plan Dialog States
	const [planDialogOpen, setPlanDialogOpen] = useState(false);
	const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
	const [planFormData, setPlanFormData] = useState({
		name: "",
		description: "",
		price: "",
		features: [] as string[],
		status: "active" as "active" | "inactive",
	});
	const [planFormErrors, setPlanFormErrors] = useState<{
		[key: string]: string;
	}>({});
	const [planSaving, setPlanSaving] = useState(false);
	const [deletePlan, setDeletePlan] = useState<Plan | null>(null);
	const [isDeletingPlan, setIsDeletingPlan] = useState(false);
	const [featureInput, setFeatureInput] = useState("");

	useEffect(() => {
		fetchPolicies();
		fetchPlans();
	}, []);

	const fetchPolicies = async () => {
		try {
			setPoliciesLoading(true);
			const response = await axiosInstance.get("/compliance/policies");
			if (response.data.success) {
				setPolicies(response.data.policies);
			}
		} catch (err: any) {
			console.error("Error fetching policies:", err);
			toast.error("Failed to fetch policies");
		} finally {
			setPoliciesLoading(false);
		}
	};

	const fetchPlans = async () => {
		try {
			setPlansLoading(true);
			const response = await axiosInstance.get("/compliance/plans");
			if (response.data.success) {
				setPlans(response.data.plans);
			}
		} catch (err: any) {
			console.error("Error fetching plans:", err);
			toast.error("Failed to fetch plans");
		} finally {
			setPlansLoading(false);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-500";
			case "inactive":
				return "bg-gray-500";
			default:
				return "bg-blue-500";
		}
	};

	const handleTogglePolicy = async (id: string) => {
		const policy = policies.find((p) => p._id === id);
		if (!policy) return;

		try {
			const response = await axiosInstance.put(`/compliance/policies/${id}`, {
				enforced: !policy.enforced,
			});
			if (response.data.success) {
				toast.success("Policy updated");
				fetchPolicies();
			}
		} catch (err: any) {
			console.error("Error updating policy:", err);
			toast.error("Failed to update policy");
		}
	};

	const handleTogglePlan = async (id: string) => {
		const plan = plans.find((p) => p._id === id);
		if (!plan) return;

		try {
			const newStatus = plan.status === "active" ? "inactive" : "active";
			const response = await axiosInstance.put(`/compliance/plans/${id}`, {
				status: newStatus,
			});
			if (response.data.success) {
				toast.success("Plan status updated");
				fetchPlans();
			}
		} catch (err: any) {
			console.error("Error updating plan:", err);
			toast.error("Failed to update plan");
		}
	};

	// ============ POLICY FORM HANDLERS ============
	const openPolicyDialog = (policy?: Policy) => {
		if (policy) {
			setEditingPolicy(policy);
			setPolicyFormData({
				name: policy.name,
				description: policy.description,
				enforced: policy.enforced,
				type: policy.type,
			});
		} else {
			setEditingPolicy(null);
			setPolicyFormData({
				name: "",
				description: "",
				enforced: false,
				type: "Security",
			});
		}
		setPolicyFormErrors({});
		setPolicyDialogOpen(true);
	};

	const closePolicyDialog = () => {
		setPolicyDialogOpen(false);
		setEditingPolicy(null);
		setPolicyFormData({
			name: "",
			description: "",
			enforced: false,
			type: "Security",
		});
		setPolicyFormErrors({});
	};

	const validatePolicyForm = () => {
		const errors: { [key: string]: string } = {};
		if (!policyFormData.name.trim()) errors.name = "Name is required";
		if (!policyFormData.description.trim())
			errors.description = "Description is required";
		setPolicyFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSavePolicy = async () => {
		if (!validatePolicyForm()) return;

		setPolicySaving(true);
		try {
			const endpoint = editingPolicy
				? `/compliance/policies/${editingPolicy._id}`
				: "/compliance/policies";
			const method = editingPolicy ? "put" : "post";
			const response = await axiosInstance[method](endpoint, policyFormData);

			if (response.data.success) {
				toast.success(
					editingPolicy
						? "Policy updated successfully"
						: "Policy created successfully"
				);
				closePolicyDialog();
				fetchPolicies();
			}
		} catch (err: any) {
			console.error("Error saving policy:", err);
			toast.error(err.response?.data?.message || "Failed to save policy");
		} finally {
			setPolicySaving(false);
		}
	};

	const handleDeletePolicy = async () => {
		if (!deletePolicy) return;

		setIsDeletingPolicy(true);
		try {
			const response = await axiosInstance.delete(
				`/compliance/policies/${deletePolicy._id}`
			);
			if (response.data.success) {
				toast.success("Policy deleted successfully");
				setDeletePolicy(null);
				fetchPolicies();
			}
		} catch (err: any) {
			console.error("Error deleting policy:", err);
			toast.error(err.response?.data?.message || "Failed to delete policy");
		} finally {
			setIsDeletingPolicy(false);
		}
	};

	// ============ PLAN FORM HANDLERS ============
	const openPlanDialog = (plan?: Plan) => {
		if (plan) {
			setEditingPlan(plan);
			setPlanFormData({
				name: plan.name,
				description: "",
				price: String(plan.price),
				features: [...plan.features],
				status: plan.status,
			});
		} else {
			setEditingPlan(null);
			setPlanFormData({
				name: "",
				description: "",
				price: "",
				features: [],
				status: "active",
			});
		}
		setPlanFormErrors({});
		setFeatureInput("");
		setPlanDialogOpen(true);
	};

	const closePlanDialog = () => {
		setPlanDialogOpen(false);
		setEditingPlan(null);
		setPlanFormData({
			name: "",
			description: "",
			price: "",
			features: [],
			status: "active",
		});
		setPlanFormErrors({});
		setFeatureInput("");
	};

	const validatePlanForm = () => {
		const errors: { [key: string]: string } = {};
		if (!planFormData.name.trim()) errors.name = "Name is required";
		if (!planFormData.price) errors.price = "Price is required";
		if (isNaN(Number(planFormData.price)))
			errors.price = "Price must be a number";
		if (planFormData.features.length === 0)
			errors.features = "At least one feature is required";
		setPlanFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const addFeature = () => {
		if (!featureInput.trim()) {
			toast.error("Feature cannot be empty");
			return;
		}
		setPlanFormData({
			...planFormData,
			features: [...planFormData.features, featureInput.trim()],
		});
		setFeatureInput("");
	};

	const removeFeature = (index: number) => {
		setPlanFormData({
			...planFormData,
			features: planFormData.features.filter((_, i) => i !== index),
		});
	};

	const handleSavePlan = async () => {
		if (!validatePlanForm()) return;

		setPlanSaving(true);
		try {
			const endpoint = editingPlan
				? `/compliance/plans/${editingPlan._id}`
				: "/compliance/plans";
			const method = editingPlan ? "put" : "post";
			const response = await axiosInstance[method](endpoint, {
				name: planFormData.name,
				description: planFormData.description,
				price: Number(planFormData.price),
				features: planFormData.features,
				status: planFormData.status,
			});

			if (response.data.success) {
				toast.success(
					editingPlan
						? "Plan updated successfully"
						: "Plan created successfully"
				);
				closePlanDialog();
				fetchPlans();
			}
		} catch (err: any) {
			console.error("Error saving plan:", err);
			toast.error(err.response?.data?.message || "Failed to save plan");
		} finally {
			setPlanSaving(false);
		}
	};

	const handleDeletePlan = async () => {
		if (!deletePlan) return;

		setIsDeletingPlan(true);
		try {
			const response = await axiosInstance.delete(
				`/compliance/plans/${deletePlan._id}`
			);
			if (response.data.success) {
				toast.success("Plan deleted successfully");
				setDeletePlan(null);
				fetchPlans();
			}
		} catch (err: any) {
			console.error("Error deleting plan:", err);
			toast.error(err.response?.data?.message || "Failed to delete plan");
		} finally {
			setIsDeletingPlan(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* ============ POLICIES SECTION ============ */}
			<Card className="glass-card border-border/50">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Security & Compliance Policies</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							Enforce governance policies for all users
						</p>
					</div>
					<Button
						onClick={() => openPolicyDialog()}
						className="gradient-purple text-white gap-2">
						<Plus className="w-4 h-4" />
						Add Policy
					</Button>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{policiesLoading ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
							</div>
						) : policies.length === 0 ? (
							<p className="text-center text-muted-foreground py-8">
								No policies configured
							</p>
						) : (
							policies.map((policy) => (
								<div
									key={policy._id}
									className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<h4 className="font-semibold">{policy.name}</h4>
												<Badge variant="outline" className="text-xs">
													{policy.type}
												</Badge>
												{policy.enforced && (
													<CheckCircle2 className="w-4 h-4 text-green-500" />
												)}
											</div>
											<p className="text-sm text-muted-foreground mt-1">
												{policy.description}
											</p>
											<p className="text-xs text-muted-foreground mt-2">
												Last Modified:{" "}
												{new Date(policy.lastModified).toLocaleDateString()}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() => openPolicyDialog(policy)}
												className="gap-1">
												<Edit2 className="w-4 h-4" />
												Edit
											</Button>
											<Button
												size="sm"
												variant="destructive"
												onClick={() => setDeletePolicy(policy)}
												className="gap-1">
												<Trash2 className="w-4 h-4" />
												Delete
											</Button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			{/* ============ PLANS SECTION ============ */}
			<Card className="glass-card border-border/50">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Subscription Plans</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							Manage subscription tiers and features
						</p>
					</div>
					<Button
						onClick={() => openPlanDialog()}
						className="gradient-purple text-white gap-2">
						<Plus className="w-4 h-4" />
						Add Plan
					</Button>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{plansLoading ? (
							<div className="flex items-center justify-center py-12 col-span-3">
								<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
							</div>
						) : plans.length === 0 ? (
							<p className="text-center text-muted-foreground py-8 col-span-3">
								No plans configured
							</p>
						) : (
							plans.map((plan) => (
								<div
									key={plan._id}
									className="p-4 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-colors flex flex-col">
									<div className="flex items-start justify-between mb-3">
										<div className="flex-1">
											<h4 className="font-semibold text-lg">{plan.name}</h4>
											<p className="text-2xl font-bold text-purple-500 mt-1">
												${plan.price}
											</p>
										</div>
										<Badge
											className={`${getStatusColor(plan.status)} text-white`}>
											{plan.status}
										</Badge>
									</div>
									<div className="space-y-2 flex-1">
										{plan.features.map((feature, idx) => (
											<p key={idx} className="text-sm flex items-center gap-2">
												<CheckCircle2 className="w-4 h-4 text-green-500" />
												{feature}
											</p>
										))}
									</div>
									<p className="text-xs text-muted-foreground mt-3 mb-3">
										{plan.activeUsers} active subscribers
									</p>
									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
											onClick={() => openPlanDialog(plan)}
											className="flex-1 gap-1">
											<Edit2 className="w-4 h-4" />
											Edit
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={() => setDeletePlan(plan)}
											className="flex-1 gap-1">
											<Trash2 className="w-4 h-4" />
											Delete
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			{/* ============ POLICY DIALOG ============ */}
			<Dialog open={policyDialogOpen} onOpenChange={setPolicyDialogOpen}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>
							{editingPolicy ? "Edit Policy" : "Create New Policy"}
						</DialogTitle>
						<DialogDescription>
							{editingPolicy
								? "Update the policy details"
								: "Add a new security or compliance policy"}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{/* Name */}
						<div className="space-y-2">
							<Label
								htmlFor="policy-name"
								className="text-gray-700 font-medium">
								Policy Name <span className="text-red-500">*</span>
							</Label>
							<Input
								id="policy-name"
								placeholder="e.g., Password Policy"
								value={policyFormData.name}
								onChange={(e) =>
									setPolicyFormData({ ...policyFormData, name: e.target.value })
								}
								className={`h-10 ${
									policyFormErrors.name ? "border-red-500" : ""
								}`}
							/>
							{policyFormErrors.name && (
								<p className="text-sm text-red-500">{policyFormErrors.name}</p>
							)}
						</div>

						{/* Description */}
						<div className="space-y-2">
							<Label
								htmlFor="policy-desc"
								className="text-gray-700 font-medium">
								Description <span className="text-red-500">*</span>
							</Label>
							<textarea
								id="policy-desc"
								placeholder="Describe the policy"
								value={policyFormData.description}
								onChange={(e) =>
									setPolicyFormData({
										...policyFormData,
										description: e.target.value,
									})
								}
								className={`w-full h-24 p-2 rounded-lg bg-secondary/30 border border-border/50 text-sm ${
									policyFormErrors.description ? "border-red-500" : ""
								}`}
							/>
							{policyFormErrors.description && (
								<p className="text-sm text-red-500">
									{policyFormErrors.description}
								</p>
							)}
						</div>

						{/* Type */}
						<div className="space-y-2">
							<Label
								htmlFor="policy-type"
								className="text-gray-700 font-medium">
								Type
							</Label>
							<Select
								value={policyFormData.type}
								onValueChange={(value) =>
									setPolicyFormData({ ...policyFormData, type: value })
								}>
								<SelectTrigger id="policy-type" className="h-10">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Security">Security</SelectItem>
									<SelectItem value="Privacy">Privacy</SelectItem>
									<SelectItem value="Compliance">Compliance</SelectItem>
									<SelectItem value="Access">Access Control</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Enforced */}
						<div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
							<input
								type="checkbox"
								id="policy-enforced"
								checked={policyFormData.enforced}
								onChange={(e) =>
									setPolicyFormData({
										...policyFormData,
										enforced: e.target.checked,
									})
								}
								className="w-4 h-4 cursor-pointer"
							/>
							<Label
								htmlFor="policy-enforced"
								className="cursor-pointer text-sm font-medium">
								Enforce this policy for all users
							</Label>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={closePolicyDialog}
							disabled={policySaving}>
							Cancel
						</Button>
						<Button
							onClick={handleSavePolicy}
							disabled={policySaving}
							className="gradient-purple text-white">
							{policySaving ? "Saving..." : "Save Policy"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* ============ PLAN DIALOG ============ */}
			<Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
				<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>
							{editingPlan ? "Edit Plan" : "Create New Plan"}
						</DialogTitle>
						<DialogDescription>
							{editingPlan
								? "Update the plan details"
								: "Add a new subscription plan"}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{/* Name */}
						<div className="space-y-2">
							<Label htmlFor="plan-name" className="text-gray-700 font-medium">
								Plan Name <span className="text-red-500">*</span>
							</Label>
							<Input
								id="plan-name"
								placeholder="e.g., Professional"
								value={planFormData.name}
								onChange={(e) =>
									setPlanFormData({ ...planFormData, name: e.target.value })
								}
								className={`h-10 ${
									planFormErrors.name ? "border-red-500" : ""
								}`}
							/>
							{planFormErrors.name && (
								<p className="text-sm text-red-500">{planFormErrors.name}</p>
							)}
						</div>

						{/* Price */}
						<div className="space-y-2">
							<Label htmlFor="plan-price" className="text-gray-700 font-medium">
								Price (USD) <span className="text-red-500">*</span>
							</Label>
							<Input
								id="plan-price"
								type="number"
								placeholder="99"
								value={planFormData.price}
								onChange={(e) =>
									setPlanFormData({ ...planFormData, price: e.target.value })
								}
								className={`h-10 ${
									planFormErrors.price ? "border-red-500" : ""
								}`}
							/>
							{planFormErrors.price && (
								<p className="text-sm text-red-500">{planFormErrors.price}</p>
							)}
						</div>

						{/* Description */}
						<div className="space-y-2">
							<Label htmlFor="plan-desc" className="text-gray-700 font-medium">
								Description
							</Label>
							<textarea
								id="plan-desc"
								placeholder="Describe the plan"
								value={planFormData.description}
								onChange={(e) =>
									setPlanFormData({
										...planFormData,
										description: e.target.value,
									})
								}
								className="w-full h-20 p-2 rounded-lg bg-secondary/30 border border-border/50 text-sm"
							/>
						</div>

						{/* Status */}
						<div className="space-y-2">
							<Label
								htmlFor="plan-status"
								className="text-gray-700 font-medium">
								Status
							</Label>
							<Select
								value={planFormData.status}
								onValueChange={(value) =>
									setPlanFormData({
										...planFormData,
										status: value as "active" | "inactive",
									})
								}>
								<SelectTrigger id="plan-status" className="h-10">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Features */}
						<div className="space-y-2">
							<Label className="text-gray-700 font-medium">
								Features <span className="text-red-500">*</span>
							</Label>
							<div className="flex gap-2">
								<Input
									placeholder="Enter a feature"
									value={featureInput}
									onChange={(e) => setFeatureInput(e.target.value)}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											addFeature();
										}
									}}
									className="h-10 flex-1"
								/>
								<Button
									type="button"
									onClick={addFeature}
									size="sm"
									variant="outline">
									Add
								</Button>
							</div>
							{planFormErrors.features && (
								<p className="text-sm text-red-500">
									{planFormErrors.features}
								</p>
							)}

							{/* Features List */}
							{planFormData.features.length > 0 && (
								<div className="space-y-2 mt-3">
									{planFormData.features.map((feature, idx) => (
										<div
											key={idx}
											className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
											<span className="text-sm">{feature}</span>
											<Button
												type="button"
												size="sm"
												variant="ghost"
												onClick={() => removeFeature(idx)}
												className="h-6 w-6 p-0">
												<X className="w-4 h-4" />
											</Button>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={closePlanDialog}
							disabled={planSaving}>
							Cancel
						</Button>
						<Button
							onClick={handleSavePlan}
							disabled={planSaving}
							className="gradient-purple text-white">
							{planSaving ? "Saving..." : "Save Plan"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* ============ DELETE POLICY DIALOG ============ */}
			<AlertDialog
				open={!!deletePolicy}
				onOpenChange={(open) => !open && setDeletePolicy(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Policy</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete "{deletePolicy?.name}"? This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel disabled={isDeletingPolicy}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeletePolicy}
							disabled={isDeletingPolicy}
							className="bg-red-600 hover:bg-red-700">
							{isDeletingPolicy ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>

			{/* ============ DELETE PLAN DIALOG ============ */}
			<AlertDialog
				open={!!deletePlan}
				onOpenChange={(open) => !open && setDeletePlan(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Plan</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete "{deletePlan?.name}"? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel disabled={isDeletingPlan}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeletePlan}
							disabled={isDeletingPlan}
							className="bg-red-600 hover:bg-red-700">
							{isDeletingPlan ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ComplianceTab;
