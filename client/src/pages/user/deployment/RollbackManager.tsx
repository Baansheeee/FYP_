/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { RotateCcw, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const RollbackManager = () => {
	const [deployments, setDeployments] = useState([
		{
			id: 1,
			name: "E-Commerce Platform",
			current: "v2.1.0",
			previous: "v2.0.8",
			deployment_date: "2024-12-04",
			status: "Active",
			canRollback: true,
			reason: "Performance issue detected",
		},
		{
			id: 2,
			name: "API Gateway",
			current: "v1.5.2",
			previous: "v1.5.1",
			deployment_date: "2024-12-03",
			status: "Stable",
			canRollback: true,
			reason: null,
		},
		{
			id: 3,
			name: "Database Service",
			current: "v3.0",
			previous: "v2.9.5",
			deployment_date: "2024-12-02",
			status: "Failed",
			canRollback: false,
			reason: "Rollback already performed",
		},
		{
			id: 4,
			name: "Lambda Functions",
			current: "v1.2.3",
			previous: "v1.2.2",
			deployment_date: "2024-12-01",
			status: "Stable",
			canRollback: true,
			reason: null,
		},
	]);

	const [selectedDeployment, setSelectedDeployment] = useState<number | null>(
		null
	);
	const [rollbackInProgress, setRollbackInProgress] = useState<number | null>(
		null
	);

	const handleRollback = async (id: number) => {
		setRollbackInProgress(id);
		// Simulate rollback operation
		setTimeout(() => {
			setDeployments(
				deployments.map((d) =>
					d.id === id
						? {
								...d,
								current: d.previous,
								status: "Rolled Back",
								canRollback: false,
						  }
						: d
				)
			);
			setRollbackInProgress(null);
		}, 2000);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Active":
				return "bg-blue-100 text-blue-700";
			case "Stable":
				return "bg-green-100 text-green-700";
			case "Failed":
				return "bg-red-100 text-red-700";
			case "Rolled Back":
				return "bg-orange-100 text-orange-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Stable":
				return <CheckCircle className="w-5 h-5 text-green-600" />;
			case "Failed":
				return <AlertCircle className="w-5 h-5 text-red-600" />;
			case "Rolled Back":
				return <RotateCcw className="w-5 h-5 text-orange-600" />;
			default:
				return <Clock className="w-5 h-5 text-blue-600" />;
		}
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
							<h1 className="text-4xl font-bold">Rollback Manager</h1>
							<p className="text-lg text-muted-foreground">
								Manage and monitor deployment rollbacks
							</p>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Deployments List */}
							<div className="lg:col-span-2 space-y-4">
								{deployments.map((deployment) => (
									<div
										key={deployment.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedDeployment === deployment.id
												? "border-purple-300/50 bg-purple-500/5"
												: "border-border/50 hover:border-purple-300/50"
										}`}
										onClick={() => setSelectedDeployment(deployment.id)}>
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<h3 className="text-lg font-semibold">
													{deployment.name}
												</h3>
												<p className="text-sm text-muted-foreground mt-1">
													Deployed: {deployment.deployment_date}
												</p>
											</div>
											<div className="flex items-center gap-2">
												{getStatusIcon(deployment.status)}
												<span
													className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
														deployment.status
													)}`}>
													{deployment.status}
												</span>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-4 py-4 px-4 bg-secondary/30 rounded-lg mb-4">
											<div>
												<p className="text-xs text-muted-foreground mb-1">
													Current Version
												</p>
												<p className="font-semibold">{deployment.current}</p>
											</div>
											<div>
												<p className="text-xs text-muted-foreground mb-1">
													Previous Version
												</p>
												<p className="font-semibold">{deployment.previous}</p>
											</div>
										</div>

										{deployment.reason && (
											<div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-700 mb-4">
												<AlertCircle className="w-4 h-4 inline mr-2" />
												{deployment.reason}
											</div>
										)}

										<Button
											onClick={() => handleRollback(deployment.id)}
											disabled={
												!deployment.canRollback ||
												rollbackInProgress === deployment.id
											}
											className={`w-full ${
												deployment.canRollback
													? "bg-orange-500 text-white hover:bg-orange-600"
													: "bg-gray-200 text-gray-600 cursor-not-allowed"
											}`}>
											{rollbackInProgress === deployment.id ? (
												<>
													<Clock className="w-4 h-4 mr-2 animate-spin" />
													Rolling Back...
												</>
											) : (
												<>
													<RotateCcw className="w-4 h-4 mr-2" />
													Rollback to {deployment.previous}
												</>
											)}
										</Button>
									</div>
								))}
							</div>

							{/* Details Sidebar */}
							{selectedDeployment && (
								<div className="glass-card rounded-xl p-6 border border-border/50 h-fit space-y-6">
									{(() => {
										const deployment = deployments.find(
											(d) => d.id === selectedDeployment
										);
										return (
											<>
												<div>
													<h3 className="font-semibold mb-4">
														Deployment Details
													</h3>
													<div className="space-y-4 text-sm">
														<div>
															<p className="text-muted-foreground mb-1">
																Service
															</p>
															<p className="font-medium">{deployment?.name}</p>
														</div>

														<div>
															<p className="text-muted-foreground mb-1">
																Current Version
															</p>
															<p className="font-mono text-lg font-semibold text-purple-600">
																{deployment?.current}
															</p>
														</div>

														<div>
															<p className="text-muted-foreground mb-1">
																Previous Version
															</p>
															<p className="font-mono text-lg font-semibold">
																{deployment?.previous}
															</p>
														</div>

														<div>
															<p className="text-muted-foreground mb-1">
																Deployment Date
															</p>
															<p className="font-medium">
																{deployment?.deployment_date}
															</p>
														</div>

														<div>
															<p className="text-muted-foreground mb-1">
																Status
															</p>
															<p className="font-medium">
																{deployment?.status}
															</p>
														</div>
													</div>
												</div>

												<div className="border-t border-border/50 pt-4">
													<h4 className="font-semibold mb-3">
														Rollback History
													</h4>
													<div className="space-y-2 text-sm">
														<div className="flex items-center justify-between p-2 bg-secondary/30 rounded">
															<span>Last rollback</span>
															<span className="text-muted-foreground">N/A</span>
														</div>
														<div className="flex items-center justify-between p-2 bg-secondary/30 rounded">
															<span>Total rollbacks</span>
															<span className="font-semibold">0</span>
														</div>
													</div>
												</div>

												<div className="border-t border-border/50 pt-4">
													<h4 className="font-semibold mb-3">Actions</h4>
													<div className="space-y-2">
														<Button variant="outline" className="w-full">
															View Logs
														</Button>
														<Button variant="outline" className="w-full">
															Compare Versions
														</Button>
													</div>
												</div>
											</>
										);
									})()}
								</div>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default RollbackManager;
