/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Edit2, Trash2, AlertTriangle, Filter } from "lucide-react";
import { useState } from "react";

const AlertsManagement = () => {
	const [alerts, setAlerts] = useState([
		{
			id: 1,
			name: "High CPU Usage",
			metric: "CPU",
			threshold: 80,
			operator: "Greater than",
			duration: "5 minutes",
			enabled: true,
			severity: "Critical",
			lastTriggered: "2 hours ago",
			recipients: ["admin@company.com", "ops@company.com"],
		},
		{
			id: 2,
			name: "Memory Low",
			metric: "Memory",
			threshold: 90,
			operator: "Greater than",
			duration: "3 minutes",
			enabled: true,
			severity: "High",
			lastTriggered: "1 day ago",
			recipients: ["admin@company.com"],
		},
		{
			id: 3,
			name: "High Error Rate",
			metric: "Error Rate",
			threshold: 5,
			operator: "Greater than",
			duration: "2 minutes",
			enabled: true,
			severity: "High",
			lastTriggered: "3 days ago",
			recipients: ["dev-team@company.com", "ops@company.com"],
		},
		{
			id: 4,
			name: "API Response Time",
			metric: "Latency",
			threshold: 500,
			operator: "Greater than",
			duration: "5 minutes",
			enabled: false,
			severity: "Medium",
			lastTriggered: "Never",
			recipients: ["admin@company.com"],
		},
		{
			id: 5,
			name: "Database Connection Failures",
			metric: "Database",
			threshold: 1,
			operator: "Greater than",
			duration: "1 minute",
			enabled: true,
			severity: "Critical",
			lastTriggered: "5 minutes ago",
			recipients: ["dba@company.com", "ops@company.com"],
		},
		{
			id: 6,
			name: "Disk Space Low",
			metric: "Disk",
			threshold: 85,
			operator: "Greater than",
			duration: "10 minutes",
			enabled: true,
			severity: "Medium",
			lastTriggered: "Never",
			recipients: ["sysadmin@company.com"],
		},
	]);

	const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case "Critical":
				return "bg-red-100 text-red-700 border-red-200";
			case "High":
				return "bg-orange-100 text-orange-700 border-orange-200";
			case "Medium":
				return "bg-yellow-100 text-yellow-700 border-yellow-200";
			case "Low":
				return "bg-blue-100 text-blue-700 border-blue-200";
			default:
				return "bg-gray-100 text-gray-700 border-gray-200";
		}
	};

	const filteredAlerts = alerts.filter(
		(alert) =>
			alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			alert.metric.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const enabledCount = alerts.filter((a) => a.enabled).length;
	const criticalCount = alerts.filter((a) => a.severity === "Critical").length;

	const handleToggleAlert = (id: number) => {
		setAlerts((prevAlerts) =>
			prevAlerts.map((alert) =>
				alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
			)
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-red-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold">Alerts Management</h1>
								<p className="text-lg text-muted-foreground">
									Configure and manage performance alerts
								</p>
							</div>
							<Button className="bg-gradient-to-r from-red-500 to-red-600 text-white">
								<Plus className="w-4 h-4 mr-2" />
								Create Alert
							</Button>
						</div>

						{/* Alert Summary */}
						<div className="grid md:grid-cols-4 gap-4">
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Alerts
								</p>
								<p className="text-2xl font-bold">{alerts.length}</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-green-200 bg-green-50/30">
								<p className="text-sm text-muted-foreground mb-1">Enabled</p>
								<p className="text-2xl font-bold text-green-600">
									{enabledCount}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-red-200 bg-red-50/30">
								<p className="text-sm text-muted-foreground mb-1">Critical</p>
								<p className="text-2xl font-bold text-red-600">
									{criticalCount}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Triggered Today
								</p>
								<p className="text-2xl font-bold">3</p>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Alerts List */}
							<div className="lg:col-span-2 space-y-4">
								{/* Search and Filter */}
								<div className="glass-card rounded-xl p-4 border border-border/50 flex gap-2">
									<Input
										placeholder="Search alerts..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="border-border/50"
									/>
									<Button variant="outline">
										<Filter className="w-4 h-4" />
									</Button>
								</div>

								{/* Alerts Cards */}
								{filteredAlerts.map((alert) => (
									<div
										key={alert.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedAlert === alert.id
												? "border-red-300/50 bg-red-500/5"
												: "border-border/50 hover:border-red-300/50"
										}`}
										onClick={() => setSelectedAlert(alert.id)}>
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2">
													<AlertTriangle className="w-5 h-5 text-red-500" />
													<h3 className="text-lg font-semibold">
														{alert.name}
													</h3>
												</div>
												<p className="text-sm text-muted-foreground">
													Metric:{" "}
													<span className="font-mono">{alert.metric}</span>
												</p>
											</div>
											<button
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
													alert.enabled ? "bg-green-500" : "bg-gray-300"
												}`}
												onClick={(e) => {
													e.stopPropagation();
													handleToggleAlert(alert.id);
												}}>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
														alert.enabled ? "translate-x-6" : "translate-x-1"
													}`}
												/>
											</button>
										</div>

										<div className="grid grid-cols-3 gap-2 py-4 px-4 bg-secondary/30 rounded-lg mb-4 text-sm">
											<div>
												<p className="text-muted-foreground text-xs mb-1">
													Threshold
												</p>
												<p className="font-semibold">{alert.threshold}</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs mb-1">
													Duration
												</p>
												<p className="font-semibold">{alert.duration}</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs mb-1">
													Last Triggered
												</p>
												<p className="font-semibold text-xs">
													{alert.lastTriggered}
												</p>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(
													alert.severity
												)}`}>
												{alert.severity}
											</span>
											<div className="flex gap-2">
												<Button variant="outline" size="sm">
													<Edit2 className="w-4 h-4" />
												</Button>
												<Button variant="outline" size="sm">
													<Trash2 className="w-4 h-4 text-red-500" />
												</Button>
											</div>
										</div>
									</div>
								))}

								{filteredAlerts.length === 0 && (
									<div className="glass-card rounded-xl p-8 border border-border/50 text-center">
										<p className="text-muted-foreground">No alerts found</p>
									</div>
								)}
							</div>

							{/* Alert Details */}
							{selectedAlert && (
								<div className="glass-card rounded-xl p-6 border border-border/50 h-fit space-y-6">
									<h3 className="text-lg font-semibold">Alert Details</h3>
									{(() => {
										const alert = alerts.find((a) => a.id === selectedAlert);
										return (
											<div className="space-y-4 text-sm">
												<div>
													<p className="text-muted-foreground mb-1">
														Alert Name
													</p>
													<p className="font-medium">{alert?.name}</p>
												</div>

												<div>
													<p className="text-muted-foreground mb-1">Severity</p>
													<span
														className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
															alert?.severity || ""
														)}`}>
														{alert?.severity}
													</span>
												</div>

												<div>
													<p className="text-muted-foreground mb-1">Status</p>
													<p className="font-medium">
														{alert?.enabled ? "Enabled" : "Disabled"}
													</p>
												</div>

												<div className="border-t border-border/50 pt-4 space-y-2">
													<div>
														<p className="text-muted-foreground text-xs mb-1">
															Condition
														</p>
														<p className="text-xs p-2 bg-secondary/30 rounded font-mono">
															{alert?.metric} {alert?.operator}{" "}
															{alert?.threshold}
														</p>
													</div>

													<div>
														<p className="text-muted-foreground text-xs mb-1">
															Duration
														</p>
														<p className="font-medium">{alert?.duration}</p>
													</div>
												</div>

												<div className="border-t border-border/50 pt-4">
													<p className="text-muted-foreground text-xs mb-2">
														Recipients
													</p>
													<div className="space-y-1">
														{alert?.recipients.map((recipient, idx) => (
															<div
																key={idx}
																className="text-xs p-2 bg-secondary/30 rounded flex items-center justify-between">
																<span>{recipient}</span>
																<button className="text-muted-foreground hover:text-foreground">
																	×
																</button>
															</div>
														))}
													</div>
												</div>

												<div className="border-t border-border/50 pt-4 space-y-2">
													<Button className="w-full bg-red-500 text-white hover:bg-red-600">
														Edit Alert
													</Button>
													<Button variant="outline" className="w-full">
														Test Alert
													</Button>
												</div>
											</div>
										);
									})()}
								</div>
							)}
						</div>

						{/* Alert History */}
						<div className="glass-card rounded-xl p-6 border border-border/50">
							<h3 className="text-lg font-semibold mb-6">Recent Triggers</h3>

							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead className="border-b border-border/50">
										<tr className="text-muted-foreground text-xs">
											<th className="px-6 py-3 text-left font-medium">Alert</th>
											<th className="px-6 py-3 text-left font-medium">Time</th>
											<th className="px-6 py-3 text-left font-medium">Value</th>
											<th className="px-6 py-3 text-left font-medium">
												Status
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border/50">
										{[
											{
												name: "Database Connection Failures",
												time: "5 minutes ago",
												value: "2",
												status: "Triggered",
											},
											{
												name: "High CPU Usage",
												time: "2 hours ago",
												value: "85%",
												status: "Triggered",
											},
											{
												name: "High Error Rate",
												time: "3 days ago",
												value: "6.2%",
												status: "Triggered",
											},
											{
												name: "Memory Low",
												time: "1 day ago",
												value: "92%",
												status: "Triggered",
											},
										].map((trigger, idx) => (
											<tr
												key={idx}
												className="hover:bg-secondary/20 transition-colors">
												<td className="px-6 py-3 font-medium">
													{trigger.name}
												</td>
												<td className="px-6 py-3">{trigger.time}</td>
												<td className="px-6 py-3 font-mono">{trigger.value}</td>
												<td className="px-6 py-3">
													<span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
														{trigger.status}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default AlertsManagement;
