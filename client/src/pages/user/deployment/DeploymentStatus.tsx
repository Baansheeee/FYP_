/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle, AlertCircle, Clock, Pause } from "lucide-react";
import { useState } from "react";

const DeploymentStatus = () => {
	const [deployments, setDeployments] = useState([
		{
			id: 1,
			name: "E-Commerce Platform v2.1.0",
			status: "In Progress",
			progress: 65,
			startTime: "2024-12-04 10:30 AM",
			eta: "10:45 AM",
			currentStep: "Deploying EC2 instances",
			steps: [
				{ name: "Pre-deployment checks", status: "completed" },
				{ name: "Building artifacts", status: "completed" },
				{ name: "Deploying compute", status: "in-progress" },
				{ name: "Database migration", status: "pending" },
				{ name: "Health checks", status: "pending" },
				{ name: "Post-deployment", status: "pending" },
			],
		},
		{
			id: 2,
			name: "API Gateway Update v1.5.2",
			status: "Completed",
			progress: 100,
			startTime: "2024-12-03 3:20 PM",
			endTime: "2024-12-03 3:32 PM",
			duration: "12 mins",
			steps: [
				{ name: "Pre-deployment checks", status: "completed" },
				{ name: "Building artifacts", status: "completed" },
				{ name: "Deploying functions", status: "completed" },
				{ name: "Database migration", status: "completed" },
				{ name: "Health checks", status: "completed" },
				{ name: "Post-deployment", status: "completed" },
			],
		},
		{
			id: 3,
			name: "Lambda Functions Update",
			status: "Paused",
			progress: 40,
			startTime: "2024-12-04 2:00 PM",
			pausedAt: "2:15 PM",
			reason: "Waiting for manual approval",
			steps: [
				{ name: "Pre-deployment checks", status: "completed" },
				{ name: "Building artifacts", status: "completed" },
				{ name: "Deploying functions", status: "pending" },
				{ name: "Database migration", status: "pending" },
				{ name: "Health checks", status: "pending" },
				{ name: "Post-deployment", status: "pending" },
			],
		},
	]);

	const [selectedDeployment, setSelectedDeployment] = useState(0);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "In Progress":
				return "bg-blue-100 text-blue-700";
			case "Completed":
				return "bg-green-100 text-green-700";
			case "Paused":
				return "bg-orange-100 text-orange-700";
			case "Failed":
				return "bg-red-100 text-red-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getStepIcon = (status: string) => {
		switch (status) {
			case "completed":
				return <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />;
			case "in-progress":
				return <Activity className="w-5 h-5 text-blue-600 flex-shrink-0" />;
			case "pending":
				return <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />;
			default:
				return null;
		}
	};

	const current = deployments[selectedDeployment];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="space-y-2">
							<h1 className="text-4xl font-bold">Deployment Status</h1>
							<p className="text-lg text-muted-foreground">
								Monitor active and recent deployments in real-time
							</p>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Deployments List */}
							<div className="lg:col-span-2 space-y-4">
								{deployments.map((deployment, index) => (
									<div
										key={deployment.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedDeployment === index
												? "border-purple-300/50 bg-purple-500/5"
												: "border-border/50 hover:border-purple-300/50"
										}`}
										onClick={() => setSelectedDeployment(index)}>
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<h3 className="text-lg font-semibold">
													{deployment.name}
												</h3>
												<p className="text-sm text-muted-foreground mt-1">
													Started: {deployment.startTime}
												</p>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
													deployment.status
												)}`}>
												{deployment.status}
											</span>
										</div>

										{deployment.status === "In Progress" && (
											<div className="mb-4">
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium">
														{deployment.currentStep}
													</span>
													<span className="text-sm font-semibold text-blue-600">
														{deployment.progress}%
													</span>
												</div>
												<div className="w-full bg-secondary/30 rounded-full h-2">
													<div
														className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
														style={{
															width: `${deployment.progress}%`,
														}}
													/>
												</div>
											</div>
										)}

										{deployment.status === "Completed" && (
											<div className="text-sm text-muted-foreground">
												Completed in {deployment.duration}
											</div>
										)}

										{deployment.status === "Paused" && (
											<div className="text-sm text-orange-600">
												Paused at {deployment.pausedAt}: {deployment.reason}
											</div>
										)}
									</div>
								))}
							</div>

							{/* Detailed View */}
							<div className="glass-card rounded-xl p-6 border border-border/50 h-fit space-y-6">
								<div>
									<h3 className="text-lg font-semibold mb-4">
										Deployment Steps
									</h3>
									<div className="space-y-4">
										{current.steps.map((step, index) => (
											<div key={index} className="flex gap-3">
												{getStepIcon(step.status)}
												<div className="flex-1 min-w-0">
													<p className="font-medium text-sm">{step.name}</p>
													<p className="text-xs text-muted-foreground capitalize">
														{step.status.replace("-", " ")}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className="border-t border-border/50 pt-6">
									<h4 className="font-medium mb-4">Quick Actions</h4>
									<div className="space-y-2">
										{current.status === "In Progress" && (
											<>
												<Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
													View Logs
												</Button>
												<Button variant="outline" className="w-full">
													<Pause className="w-4 h-4 mr-2" />
													Pause Deployment
												</Button>
											</>
										)}
										{current.status === "Paused" && (
											<>
												<Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
													Resume Deployment
												</Button>
												<Button variant="outline" className="w-full">
													Cancel Deployment
												</Button>
											</>
										)}
										{(current.status === "Completed" ||
											current.status === "Failed") && (
											<>
												<Button variant="outline" className="w-full">
													View Details
												</Button>
												<Button variant="outline" className="w-full">
													Redeploy
												</Button>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default DeploymentStatus;
