/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

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
import PolicyForm from "@/components/forms/PolicyForm";
import PlanForm from "@/components/forms/PlanForm";

interface Policy {
	id: string;
	name: string;
	description: string;
	enforced: boolean;
	lastModified: string;
	type: string;
}

interface Plan {
	id: string;
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
		const policy = policies.find((p) => p.id === id);
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
		const plan = plans.find((p) => p.id === id);
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
				? `/compliance/policies/${editingPolicy.id}`
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
		console.log(deletePolicy);
		try {
			const response = await axiosInstance.delete(
				`/compliance/policies/${deletePolicy.id}`
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
				? `/compliance/plans/${editingPlan.id}`
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
		console.log(deletePlan);
		try {
			const response = await axiosInstance.delete(
				`/compliance/plans/${deletePlan.id}`
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
			<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
				<CardHeader className="border-b border-cyan-500/10 flex flex-row items-center justify-between">
					<div>
						<CardTitle className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							Security & Compliance Policies
						</CardTitle>
						<p className="text-sm text-cyan-300/60 mt-2">
							🔐 Enforce governance policies for all users
						</p>
					</div>
					<Button
						onClick={() => openPolicyDialog()}
						className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50 transition-all duration-300 gap-2">
						<Plus className="w-4 h-4" />
						Add Policy
					</Button>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="space-y-4">
						{policiesLoading ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
							</div>
						) : policies.length === 0 ? (
							<p className="text-center text-cyan-300/60 py-8">
								No policies configured
							</p>
						) : (
							policies.map((policy) => (
								<div
									key={policy.id}
									className="p-4 rounded-xl bg-gradient-to-r from-slate-700/40 to-slate-600/30 hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/30 group">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<h4 className="font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
													{policy.name}
												</h4>
												<Badge
													variant="outline"
													className="text-xs bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
													{policy.type}
												</Badge>
												{policy.enforced && (
													<CheckCircle2 className="w-4 h-4 text-green-400" />
												)}
											</div>
											<p className="text-sm text-cyan-300/60 mt-1">
												{policy.description}
											</p>
											<p className="text-xs text-cyan-300/50 mt-2">
												Last Modified:{" "}
												{new Date(policy.lastModified).toLocaleDateString()}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() => openPolicyDialog(policy)}
												className="gap-1 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
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
			<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
				<CardHeader className="border-b border-cyan-500/10 flex flex-row items-center justify-between">
					<div>
						<CardTitle className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							Subscription Plans
						</CardTitle>
						<p className="text-sm text-cyan-300/60 mt-2">
							💳 Manage subscription tiers and features
						</p>
					</div>
					<Button
						onClick={() => openPlanDialog()}
						className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50 transition-all duration-300 gap-2">
						<Plus className="w-4 h-4" />
						Add Plan
					</Button>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{plansLoading ? (
							<div className="flex items-center justify-center py-12 col-span-3">
								<Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
							</div>
						) : plans.length === 0 ? (
							<p className="text-center text-cyan-300/60 py-8 col-span-3">
								No plans configured
							</p>
						) : (
							plans.map((plan) => (
								<div
									key={plan.id}
									className="p-4 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-700/30 to-slate-600/20 hover:border-cyan-500/40 hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 flex flex-col group">
									<div className="flex items-start justify-between mb-3">
										<div className="flex-1">
											<h4 className="font-semibold text-lg text-cyan-300 group-hover:text-cyan-200 transition-colors">
												{plan.name}
											</h4>
											<p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-1">
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
											<p
												key={idx}
												className="text-sm flex items-center gap-2 text-cyan-300/80">
												<CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
												{feature}
											</p>
										))}
									</div>
									<p className="text-xs text-cyan-300/60 mt-3 mb-3">
										{plan.activeUsers} active subscribers
									</p>
									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
											onClick={() => openPlanDialog(plan)}
											className="flex-1 gap-1 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
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
				<DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-xl border-cyan-500/30">
					<PolicyForm
						policy={editingPolicy || undefined}
						onSave={async (data) => {
							setPolicySaving(true);
							try {
								const endpoint = editingPolicy
									? `/compliance/policies/${editingPolicy.id}`
									: "/compliance/policies";
								const method = editingPolicy ? "put" : "post";
								const response = await axiosInstance[method](endpoint, data);

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
								toast.error(
									err.response?.data?.message || "Failed to save policy"
								);
							} finally {
								setPolicySaving(false);
							}
						}}
						onCancel={closePolicyDialog}
						isLoading={policySaving}
					/>
				</DialogContent>
			</Dialog>

			{/* ============ PLAN DIALOG ============ */}
			<Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
				<DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-xl border-cyan-500/30">
					<PlanForm
						plan={editingPlan || undefined}
						onSave={async (data) => {
							setPlanSaving(true);
							try {
								const endpoint = editingPlan
									? `/compliance/plans/${editingPlan.id}`
									: "/compliance/plans";
								const method = editingPlan ? "put" : "post";
								const response = await axiosInstance[method](endpoint, {
									name: data.name,
									description: data.description,
									price: Number(data.price),
									features: data.features,
									status: data.status,
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
								toast.error(
									err.response?.data?.message || "Failed to save plan"
								);
							} finally {
								setPlanSaving(false);
							}
						}}
						onCancel={closePlanDialog}
						isLoading={planSaving}
					/>
				</DialogContent>
			</Dialog>

			{/* ============ DELETE POLICY DIALOG ============ */}
			<AlertDialog
				open={!!deletePolicy}
				onOpenChange={(open) => !open && setDeletePolicy(null)}>
				<AlertDialogContent className="bg-slate-900/95 border-cyan-500/30">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-cyan-300">
							Delete Policy
						</AlertDialogTitle>
						<AlertDialogDescription className="text-cyan-300/60">
							Are you sure you want to delete "{deletePolicy?.name}"? This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel
							disabled={isDeletingPolicy}
							className="border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
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
				<AlertDialogContent className="bg-slate-900/95 border-cyan-500/30">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-cyan-300">
							Delete Plan
						</AlertDialogTitle>
						<AlertDialogDescription className="text-cyan-300/60">
							Are you sure you want to delete "{deletePlan?.name}"? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel
							disabled={isDeletingPlan}
							className="border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
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
