/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const BudgetAlerts = () => {
	const [budgets, setBudgets] = useState([
		{
			id: 1,
			name: "EC2 Monthly Budget",
			limit: 1000,
			spent: 850,
			percentage: 85,
			status: "warning",
			threshold: 80,
			alertsEnabled: true,
		},
		{
			id: 2,
			name: "Database Services Budget",
			limit: 500,
			spent: 480,
			percentage: 96,
			status: "critical",
			threshold: 80,
			alertsEnabled: true,
		},
		{
			id: 3,
			name: "Storage Services Budget",
			limit: 300,
			spent: 120,
			percentage: 40,
			status: "healthy",
			threshold: 80,
			alertsEnabled: true,
		},
		{
			id: 4,
			name: "Development Environment",
			limit: 200,
			spent: 95,
			percentage: 48,
			status: "healthy",
			threshold: 80,
			alertsEnabled: false,
		},
	]);

	const [alerts, setAlerts] = useState([
		{
			id: 1,
			type: "warning",
			title: "EC2 Budget at 85%",
			message:
				"Your EC2 monthly budget has reached 85% of the limit ($850 of $1000)",
			time: "1 hour ago",
			read: false,
		},
		{
			id: 2,
			type: "critical",
			title: "Database Budget Critical",
			message:
				"Your database services budget has reached 96% of the limit ($480 of $500)",
			time: "2 hours ago",
			read: false,
		},
		{
			id: 3,
			type: "info",
			title: "Monthly Report Generated",
			message: "Your December 2024 cost report has been generated",
			time: "5 hours ago",
			read: true,
		},
	]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "critical":
				return "text-red-600";
			case "warning":
				return "text-orange-600";
			default:
				return "text-green-600";
		}
	};

	const getStatusBg = (status: string) => {
		switch (status) {
			case "critical":
				return "bg-red-100";
			case "warning":
				return "bg-orange-100";
			default:
				return "bg-green-100";
		}
	};

	const handleToggleAlert = (id: number) => {
		setBudgets(
			budgets.map((b) =>
				b.id === id ? { ...b, alertsEnabled: !b.alertsEnabled } : b
			)
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="space-y-2">
							<h1 className="text-4xl font-bold">Budget Alerts</h1>
							<p className="text-lg text-muted-foreground">
								Set and manage your budget alerts and thresholds
							</p>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Budgets */}
							<div className="lg:col-span-2 space-y-4">
								<div className="flex items-center justify-between">
									<h2 className="text-2xl font-semibold">Budget Limits</h2>
									<Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
										+ New Budget
									</Button>
								</div>

								{budgets.map((budget) => (
									<div
										key={budget.id}
										className="glass-card rounded-xl p-6 border border-border/50 space-y-4">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<h3 className="text-lg font-semibold">{budget.name}</h3>
												<p className="text-sm text-muted-foreground mt-1">
													Threshold: {budget.threshold}%
												</p>
											</div>
											<div
												className={`p-2 rounded-lg ${getStatusBg(
													budget.status
												)}`}>
												{budget.status === "critical" ? (
													<AlertTriangle
														className={`w-5 h-5 ${getStatusColor(
															budget.status
														)}`}
													/>
												) : budget.status === "warning" ? (
													<Bell
														className={`w-5 h-5 ${getStatusColor(
															budget.status
														)}`}
													/>
												) : (
													<CheckCircle
														className={`w-5 h-5 ${getStatusColor(
															budget.status
														)}`}
													/>
												)}
											</div>
										</div>

										<div>
											<div className="flex items-end justify-between mb-2">
												<span className="text-sm font-medium">Spending</span>
												<span className="text-sm text-muted-foreground">
													${budget.spent} of ${budget.limit}
												</span>
											</div>
											<div className="w-full bg-secondary/30 rounded-full h-3">
												<div
													className={`h-3 rounded-full transition-all ${
														budget.percentage >= 90
															? "bg-gradient-to-r from-red-500 to-red-600"
															: budget.percentage >= 80
															? "bg-gradient-to-r from-orange-500 to-orange-600"
															: "bg-gradient-to-r from-green-500 to-green-600"
													}`}
													style={{
														width: `${Math.min(budget.percentage, 100)}%`,
													}}
												/>
											</div>
											<div className="flex justify-between mt-2 text-sm">
												<span className="text-muted-foreground">
													{budget.percentage}% spent
												</span>
												<span
													className={`font-semibold ${getStatusColor(
														budget.status
													)}`}>
													${budget.limit - budget.spent} remaining
												</span>
											</div>
										</div>

										<div className="flex gap-2 pt-4 border-t border-border/50">
											<Button
												variant="outline"
												className="flex-1"
												onClick={() => handleToggleAlert(budget.id)}>
												{budget.alertsEnabled ? (
													<>
														<Bell className="w-4 h-4 mr-2" />
														Alerts Enabled
													</>
												) : (
													<>
														<XCircle className="w-4 h-4 mr-2" />
														Alerts Disabled
													</>
												)}
											</Button>
											<Button variant="outline" className="px-4">
												Edit
											</Button>
										</div>
									</div>
								))}
							</div>

							{/* Recent Alerts */}
							<div className="glass-card rounded-xl p-6 border border-border/50 h-fit space-y-4">
								<h3 className="text-lg font-semibold flex items-center gap-2">
									<Bell className="w-5 h-5" />
									Recent Alerts
								</h3>

								<div className="space-y-3">
									{alerts.map((alert) => (
										<div
											key={alert.id}
											className={`p-4 rounded-lg border-l-4 ${
												alert.type === "critical"
													? "bg-red-50 border-red-400"
													: alert.type === "warning"
													? "bg-orange-50 border-orange-400"
													: "bg-blue-50 border-blue-400"
											}`}>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<p className="font-medium text-gray-900">
														{alert.title}
													</p>
													<p className="text-sm text-muted-foreground mt-1">
														{alert.message}
													</p>
													<p className="text-xs text-muted-foreground mt-2">
														{alert.time}
													</p>
												</div>
												{!alert.read && (
													<div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
												)}
											</div>
										</div>
									))}
								</div>

								<Button
									variant="outline"
									className="w-full"
									onClick={() => console.log("View all alerts")}>
									View All Alerts
								</Button>
							</div>
						</div>

						{/* Alert Settings */}
						<div className="glass-card rounded-xl p-6 border border-border/50">
							<h3 className="text-lg font-semibold mb-4">Alert Settings</h3>
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label className="text-sm font-medium block mb-2">
										Email Notifications
									</label>
									<select className="w-full border border-border/50 rounded-lg px-4 py-2 text-sm">
										<option>Enabled</option>
										<option>Disabled</option>
									</select>
								</div>

								<div>
									<label className="text-sm font-medium block mb-2">
										Default Alert Threshold
									</label>
									<select className="w-full border border-border/50 rounded-lg px-4 py-2 text-sm">
										<option>80%</option>
										<option>75%</option>
										<option>70%</option>
										<option>90%</option>
									</select>
								</div>

								<div>
									<label className="text-sm font-medium block mb-2">
										Alert Frequency
									</label>
									<select className="w-full border border-border/50 rounded-lg px-4 py-2 text-sm">
										<option>Immediate</option>
										<option>Daily</option>
										<option>Weekly</option>
									</select>
								</div>

								<div>
									<label className="text-sm font-medium block mb-2">
										Contact Email
									</label>
									<input
										type="email"
										placeholder="your@email.com"
										className="w-full border border-border/50 rounded-lg px-4 py-2 text-sm"
									/>
								</div>
							</div>

							<div className="mt-6 flex gap-2">
								<Button className="bg-purple-500 text-white hover:bg-purple-600">
									Save Settings
								</Button>
								<Button variant="outline">Cancel</Button>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default BudgetAlerts;
