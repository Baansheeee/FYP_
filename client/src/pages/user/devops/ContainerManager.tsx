/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Package, Play, Pause, Trash2, Plus, MoreVertical } from "lucide-react";
import { useState } from "react";

const ContainerManager = () => {
	const [containers, setContainers] = useState([
		{
			id: 1,
			name: "api-server-prod",
			image: "myrepo/api:v2.1.0",
			status: "Running",
			cpuUsage: 45,
			memoryUsage: 62,
			uptime: "45 days",
			replicas: 3,
			restarts: 2,
		},
		{
			id: 2,
			name: "web-frontend-prod",
			image: "myrepo/web:v3.0.0",
			status: "Running",
			cpuUsage: 32,
			memoryUsage: 48,
			uptime: "32 days",
			replicas: 5,
			restarts: 1,
		},
		{
			id: 3,
			name: "database-backup-job",
			image: "myrepo/backup:latest",
			status: "Stopped",
			cpuUsage: 0,
			memoryUsage: 0,
			uptime: "0 hours",
			replicas: 0,
			restarts: 0,
		},
		{
			id: 4,
			name: "cache-redis-prod",
			image: "redis:7.0-alpine",
			status: "Running",
			cpuUsage: 18,
			memoryUsage: 85,
			uptime: "60 days",
			replicas: 2,
			restarts: 0,
		},
		{
			id: 5,
			name: "worker-queue-service",
			image: "myrepo/worker:v1.5.2",
			status: "Running",
			cpuUsage: 65,
			memoryUsage: 71,
			uptime: "15 days",
			replicas: 2,
			restarts: 3,
		},
	]);

	const [selectedContainer, setSelectedContainer] = useState<number | null>(
		null
	);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Running":
				return "bg-green-100 text-green-700";
			case "Stopped":
				return "bg-gray-100 text-gray-700";
			case "Failed":
				return "bg-red-100 text-red-700";
			default:
				return "bg-blue-100 text-blue-700";
		}
	};

	const handleAction = (containerId: number, action: string) => {
		console.log(`${action} container ${containerId}`);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold">Container Manager</h1>
								<p className="text-lg text-muted-foreground">
									Manage Docker and container services
								</p>
							</div>
							<Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
								<Plus className="w-4 h-4 mr-2" />
								Deploy Container
							</Button>
						</div>

						{/* Summary Stats */}
						<div className="grid md:grid-cols-4 gap-4">
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Containers
								</p>
								<p className="text-2xl font-bold">{containers.length}</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-green-200 bg-green-50/30">
								<p className="text-sm text-muted-foreground mb-1">Running</p>
								<p className="text-2xl font-bold text-green-600">
									{containers.filter((c) => c.status === "Running").length}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Replicas
								</p>
								<p className="text-2xl font-bold">
									{containers.reduce((sum, c) => sum + c.replicas, 0)}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Restarts
								</p>
								<p className="text-2xl font-bold">
									{containers.reduce((sum, c) => sum + c.restarts, 0)}
								</p>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Containers List */}
							<div className="lg:col-span-2 space-y-4">
								{containers.map((container) => (
									<div
										key={container.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedContainer === container.id
												? "border-purple-300/50 bg-purple-500/5"
												: "border-border/50 hover:border-purple-300/50"
										}`}
										onClick={() => setSelectedContainer(container.id)}>
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-1">
													<Package className="w-5 h-5 text-purple-500" />
													<h3 className="text-lg font-semibold">
														{container.name}
													</h3>
												</div>
												<p className="text-sm text-muted-foreground">
													{container.image}
												</p>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
													container.status
												)}`}>
												{container.status}
											</span>
										</div>

										<div className="grid grid-cols-4 gap-2 py-4 px-4 bg-secondary/30 rounded-lg mb-4 text-sm">
											<div>
												<p className="text-muted-foreground text-xs">CPU</p>
												<p className="font-semibold">{container.cpuUsage}%</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">Memory</p>
												<p className="font-semibold">
													{container.memoryUsage}%
												</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">
													Replicas
												</p>
												<p className="font-semibold">{container.replicas}</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">Uptime</p>
												<p className="font-semibold">{container.uptime}</p>
											</div>
										</div>

										<div className="flex gap-2">
											<Button
												variant="outline"
												className="flex-1"
												onClick={() => handleAction(container.id, "view")}>
												View Details
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													handleAction(
														container.id,
														container.status === "Running" ? "pause" : "play"
													)
												}>
												{container.status === "Running" ? (
													<Pause className="w-4 h-4" />
												) : (
													<Play className="w-4 h-4" />
												)}
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleAction(container.id, "delete")}>
												<Trash2 className="w-4 h-4 text-red-500" />
											</Button>
											<Button variant="outline" size="sm">
												<MoreVertical className="w-4 h-4" />
											</Button>
										</div>
									</div>
								))}
							</div>

							{/* Container Details */}
							{selectedContainer && (
								<div className="glass-card rounded-xl p-6 border border-border/50 h-fit space-y-6">
									<h3 className="text-lg font-semibold">Container Details</h3>
									{(() => {
										const container = containers.find(
											(c) => c.id === selectedContainer
										);
										return (
											<div className="space-y-4 text-sm">
												<div>
													<p className="text-muted-foreground mb-1">Name</p>
													<p className="font-medium">{container?.name}</p>
												</div>

												<div>
													<p className="text-muted-foreground mb-1">Image</p>
													<p className="font-mono text-xs p-2 bg-secondary/30 rounded">
														{container?.image}
													</p>
												</div>

												<div className="grid grid-cols-2 gap-2">
													<div>
														<p className="text-muted-foreground text-xs mb-1">
															CPU Usage
														</p>
														<div className="w-full bg-secondary/30 rounded h-2">
															<div
																className="bg-purple-500 h-2 rounded"
																style={{
																	width: `${container?.cpuUsage}%`,
																}}
															/>
														</div>
														<p className="text-xs font-medium mt-1">
															{container?.cpuUsage}%
														</p>
													</div>
													<div>
														<p className="text-muted-foreground text-xs mb-1">
															Memory
														</p>
														<div className="w-full bg-secondary/30 rounded h-2">
															<div
																className="bg-blue-500 h-2 rounded"
																style={{
																	width: `${container?.memoryUsage}%`,
																}}
															/>
														</div>
														<p className="text-xs font-medium mt-1">
															{container?.memoryUsage}%
														</p>
													</div>
												</div>

												<div className="border-t border-border/50 pt-4 space-y-2">
													<Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
														View Logs
													</Button>
													<Button variant="outline" className="w-full">
														Monitor
													</Button>
												</div>
											</div>
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

export default ContainerManager;
