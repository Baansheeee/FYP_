/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
	Clock,
	CheckCircle,
	AlertCircle,
	Download,
	RotateCcw,
} from "lucide-react";
import { useState } from "react";

const DeploymentHistory = () => {
	const [deployments, setDeployments] = useState([
		{
			id: 1,
			name: "E-Commerce Platform v2.1.0",
			environment: "Production",
			status: "Success",
			startTime: "2024-12-04 10:30 AM",
			endTime: "2024-12-04 10:45 AM",
			duration: "15 mins",
			resources: 12,
			cost: "$45.50",
		},
		{
			id: 2,
			name: "API Gateway Update v1.5.2",
			environment: "Staging",
			status: "Success",
			startTime: "2024-12-03 3:20 PM",
			endTime: "2024-12-03 3:32 PM",
			duration: "12 mins",
			resources: 8,
			cost: "$28.30",
		},
		{
			id: 3,
			name: "Database Migration v3.0",
			environment: "Production",
			status: "Failed",
			startTime: "2024-12-02 11:15 AM",
			endTime: "2024-12-02 11:52 AM",
			duration: "37 mins",
			resources: 6,
			cost: "$0",
		},
		{
			id: 4,
			name: "Lambda Functions Batch Update",
			environment: "Production",
			status: "Success",
			startTime: "2024-12-01 9:00 AM",
			endTime: "2024-12-01 9:18 AM",
			duration: "18 mins",
			resources: 24,
			cost: "$12.75",
		},
		{
			id: 5,
			name: "Security Patch Deployment",
			environment: "Production",
			status: "Success",
			startTime: "2024-11-30 2:45 PM",
			endTime: "2024-11-30 3:01 PM",
			duration: "16 mins",
			resources: 10,
			cost: "$35.20",
		},
	]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Success":
				return "bg-green-100 text-green-700";
			case "Failed":
				return "bg-red-100 text-red-700";
			case "In Progress":
				return "bg-blue-100 text-blue-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Success":
				return CheckCircle;
			case "Failed":
				return AlertCircle;
			default:
				return Clock;
		}
	};

	const handleRetry = (id: number) => {
		console.log("Retrying deployment:", id);
	};

	const handleRollback = (id: number) => {
		console.log("Rolling back deployment:", id);
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
							<h1 className="text-4xl font-bold">Deployment History</h1>
							<p className="text-lg text-muted-foreground">
								View all past deployments and their status
							</p>
						</div>

						{/* Stats */}
						<div className="grid md:grid-cols-4 gap-4">
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Deployments
								</p>
								<p className="text-2xl font-bold">24</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Success Rate
								</p>
								<p className="text-2xl font-bold text-green-600">95.8%</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Failed Deployments
								</p>
								<p className="text-2xl font-bold text-red-600">1</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">Total Cost</p>
								<p className="text-2xl font-bold">$121.75</p>
							</div>
						</div>

						{/* Deployments Table */}
						<div className="glass-card rounded-xl border border-border/50 overflow-hidden">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-border/50 bg-secondary/30">
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Deployment Name
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Environment
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Status
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Duration
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Cost
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{deployments.map((deployment) => {
											const StatusIcon = getStatusIcon(deployment.status);
											return (
												<tr
													key={deployment.id}
													className="border-b border-border/50 hover:bg-secondary/20">
													<td className="px-6 py-4">
														<div>
															<p className="font-medium text-gray-900">
																{deployment.name}
															</p>
															<p className="text-sm text-muted-foreground mt-1">
																{deployment.startTime}
															</p>
														</div>
													</td>
													<td className="px-6 py-4 text-sm">
														<span className="px-3 py-1 bg-secondary rounded-full">
															{deployment.environment}
														</span>
													</td>
													<td className="px-6 py-4">
														<div className="flex items-center gap-2">
															<StatusIcon
																className={`w-5 h-5 ${
																	deployment.status === "Success"
																		? "text-green-600"
																		: deployment.status === "Failed"
																		? "text-red-600"
																		: "text-blue-600"
																}`}
															/>
															<span
																className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
																	deployment.status
																)}`}>
																{deployment.status}
															</span>
														</div>
													</td>
													<td className="px-6 py-4 text-sm font-medium">
														{deployment.duration}
													</td>
													<td className="px-6 py-4 text-sm font-medium">
														{deployment.cost}
													</td>
													<td className="px-6 py-4">
														<div className="flex gap-2">
															<Button
																variant="ghost"
																size="sm"
																onClick={() =>
																	console.log("View:", deployment.id)
																}>
																View
															</Button>
															<Button
																variant="ghost"
																size="sm"
																onClick={() => handleRollback(deployment.id)}>
																<RotateCcw className="w-4 h-4" />
															</Button>
														</div>
													</td>
												</tr>
											);
										})}
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

export default DeploymentHistory;
