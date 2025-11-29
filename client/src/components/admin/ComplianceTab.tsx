/** @format */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface Policy {
	id: string;
	name: string;
	description: string;
	enforced: boolean;
	lastModified: string;
}

interface Plan {
	id: string;
	name: string;
	price: number;
	features: string[];
	users: number;
	status: "active" | "inactive";
}

const ComplianceTab = () => {
	const [policies, setPolicies] = useState<Policy[]>([
		{
			id: "1",
			name: "Password Policy",
			description: "Enforce strong password requirements",
			enforced: true,
			lastModified: "2024-03-10",
		},
		{
			id: "2",
			name: "Two-Factor Authentication",
			description: "Require 2FA for all users",
			enforced: false,
			lastModified: "2024-03-12",
		},
		{
			id: "3",
			name: "Data Access Control",
			description: "Role-based access control enforcement",
			enforced: true,
			lastModified: "2024-03-14",
		},
	]);
	const [plans, setPlans] = useState<Plan[]>([
		{
			id: "1",
			name: "Basic",
			price: 29,
			features: ["5 Projects", "Basic Support"],
			users: 10,
			status: "active",
		},
		{
			id: "2",
			name: "Professional",
			price: 99,
			features: ["Unlimited Projects", "Priority Support", "Analytics"],
			users: 25,
			status: "active",
		},
		{
			id: "3",
			name: "Enterprise",
			price: 299,
			features: [
				"Everything in Pro",
				"Dedicated Support",
				"Custom Integration",
			],
			users: 15,
			status: "inactive",
		},
	]);

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

	const handleTogglePolicy = (id: string) => {
		setPolicies(
			policies.map((p) =>
				p.id === id
					? {
							...p,
							enforced: !p.enforced,
							lastModified: new Date().toISOString().split("T")[0],
					  }
					: p
			)
		);
		toast.success("Policy updated");
	};

	const handleTogglePlan = (id: string) => {
		setPlans(
			plans.map((p) =>
				p.id === id
					? { ...p, status: p.status === "active" ? "inactive" : "active" }
					: p
			)
		);
		toast.success("Plan status updated");
	};

	return (
		<div className="space-y-6">
			{/* Policies Section */}
			<Card className="glass-card border-border/50">
				<CardHeader>
					<div>
						<CardTitle>Security & Compliance Policies</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							Enforce governance policies for all users
						</p>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{policies.length === 0 ? (
							<p className="text-center text-muted-foreground py-8">
								No policies configured
							</p>
						) : (
							policies.map((policy) => (
								<div
									key={policy.id}
									className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h4 className="font-semibold flex items-center gap-2">
												{policy.name}
												<CheckCircle2 className="w-4 h-4 text-green-500" />
											</h4>
											<p className="text-sm text-muted-foreground mt-1">
												{policy.description}
											</p>
											<p className="text-xs text-muted-foreground mt-2">
												Last Modified: {policy.lastModified}
											</p>
										</div>
										<Button
											size="sm"
											onClick={() => handleTogglePolicy(policy.id)}
											className={
												policy.enforced
													? "bg-green-500 hover:bg-green-600"
													: "bg-gray-500 hover:bg-gray-600"
											}>
											{policy.enforced ? "Enforced" : "Disabled"}
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			{/* Subscription Plans Section */}
			<Card className="glass-card border-border/50">
				<CardHeader>
					<div>
						<CardTitle>Subscription Plans</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							Manage subscription tiers and features
						</p>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{plans.length === 0 ? (
							<p className="text-center text-muted-foreground py-8 col-span-3">
								No plans configured
							</p>
						) : (
							plans.map((plan) => (
								<div
									key={plan.id}
									className="p-4 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-colors flex flex-col">
									<div className="flex items-start justify-between mb-3">
										<div>
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
										{plan.users} active subscribers
									</p>
									<Button
										size="sm"
										onClick={() => handleTogglePlan(plan.id)}
										className="w-full"
										variant={plan.status === "active" ? "default" : "outline"}>
										{plan.status === "active" ? "Deactivate" : "Activate"}
									</Button>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ComplianceTab;
