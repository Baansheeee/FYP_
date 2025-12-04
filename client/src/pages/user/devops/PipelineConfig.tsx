/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
	GitBranch,
	Plus,
	Edit2,
	Copy,
	Trash2,
	Play,
	CircleCheckBig,
	AlertCircle,
	Clock,
} from "lucide-react";
import { useState } from "react";

const PipelineConfig = () => {
	const [pipelines, setPipelines] = useState([
		{
			id: 1,
			name: "Main Deployment Pipeline",
			branch: "main",
			status: "Active",
			stages: 4,
			lastRun: "2 hours ago",
			lastStatus: "Success",
			executions: 156,
			avgDuration: "12 min",
			triggers: ["Push", "Manual"],
		},
		{
			id: 2,
			name: "Development Build",
			branch: "develop",
			status: "Active",
			stages: 3,
			lastRun: "30 min ago",
			lastStatus: "Success",
			executions: 342,
			avgDuration: "8 min",
			triggers: ["Push", "Pull Request"],
		},
		{
			id: 3,
			name: "Release Pipeline",
			branch: "release/*",
			status: "Active",
			stages: 5,
			lastRun: "1 day ago",
			lastStatus: "Failed",
			executions: 45,
			avgDuration: "25 min",
			triggers: ["Manual", "Tag"],
		},
		{
			id: 4,
			name: "Feature Branch Testing",
			branch: "feature/*",
			status: "Active",
			stages: 2,
			lastRun: "15 min ago",
			lastStatus: "In Progress",
			executions: 287,
			avgDuration: "5 min",
			triggers: ["Push"],
		},
	]);

	const [selectedPipeline, setSelectedPipeline] = useState<number | null>(null);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Success":
				return "bg-green-100 text-green-700";
			case "Failed":
				return "bg-red-100 text-red-700";
			case "In Progress":
				return "bg-blue-100 text-blue-700";
			case "Active":
				return "bg-green-100 text-green-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Success":
				return <CircleCheckBig className="w-4 h-4 text-green-600" />;
			case "Failed":
				return <AlertCircle className="w-4 h-4 text-red-600" />;
			case "In Progress":
				return <Clock className="w-4 h-4 text-blue-600" />;
			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold">Pipeline Configuration</h1>
								<p className="text-lg text-muted-foreground">
									Manage CI/CD pipelines and workflows
								</p>
							</div>
							<Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
								<Plus className="w-4 h-4 mr-2" />
								Create Pipeline
							</Button>
						</div>

						{/* Summary Stats */}
						<div className="grid md:grid-cols-4 gap-4">
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Pipelines
								</p>
								<p className="text-2xl font-bold">{pipelines.length}</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-green-200 bg-green-50/30">
								<p className="text-sm text-muted-foreground mb-1">Active</p>
								<p className="text-2xl font-bold text-green-600">
									{pipelines.filter((p) => p.status === "Active").length}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Executions
								</p>
								<p className="text-2xl font-bold">
									{pipelines.reduce((sum, p) => sum + p.executions, 0)}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-blue-200 bg-blue-50/30">
								<p className="text-sm text-muted-foreground mb-1">
									Avg Duration
								</p>
								<p className="text-2xl font-bold text-blue-600">~12 min</p>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Pipelines List */}
							<div className="lg:col-span-2 space-y-4">
								{pipelines.map((pipeline) => (
									<div
										key={pipeline.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedPipeline === pipeline.id
												? "border-blue-300/50 bg-blue-500/5"
												: "border-border/50 hover:border-blue-300/50"
										}`}
										onClick={() => setSelectedPipeline(pipeline.id)}>
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-1">
													<GitBranch className="w-5 h-5 text-blue-500" />
													<h3 className="text-lg font-semibold">
														{pipeline.name}
													</h3>
												</div>
												<p className="text-sm text-muted-foreground">
													Branch:{" "}
													<span className="font-mono">{pipeline.branch}</span>
												</p>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
													pipeline.lastStatus
												)}`}>
												{pipeline.lastStatus}
											</span>
										</div>

										<div className="grid grid-cols-5 gap-2 py-4 px-4 bg-secondary/30 rounded-lg mb-4 text-sm">
											<div>
												<p className="text-muted-foreground text-xs">Stages</p>
												<p className="font-semibold">{pipeline.stages}</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">
													Executions
												</p>
												<p className="font-semibold">{pipeline.executions}</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">
													Avg Duration
												</p>
												<p className="font-semibold">{pipeline.avgDuration}</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">
													Last Run
												</p>
												<p className="font-semibold">{pipeline.lastRun}</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">Status</p>
												<div className="flex items-center gap-1">
													{getStatusIcon(pipeline.lastStatus)}
													<span className="font-semibold">
														{pipeline.lastStatus === "Success"
															? "✓"
															: pipeline.lastStatus === "Failed"
															? "✗"
															: "•"}
													</span>
												</div>
											</div>
										</div>

										<div className="flex gap-2">
											<Button variant="outline" className="flex-1">
												View Pipeline
											</Button>
											<Button variant="outline" size="sm">
												<Play className="w-4 h-4" />
											</Button>
											<Button variant="outline" size="sm">
												<Edit2 className="w-4 h-4" />
											</Button>
											<Button variant="outline" size="sm">
												<Copy className="w-4 h-4" />
											</Button>
											<Button variant="outline" size="sm">
												<Trash2 className="w-4 h-4 text-red-500" />
											</Button>
										</div>
									</div>
								))}
							</div>

							{/* Pipeline Details and Configuration */}
							{selectedPipeline && (
								<div className="space-y-4">
									<div className="glass-card rounded-xl p-6 border border-border/50">
										<h3 className="text-lg font-semibold mb-4">
											Configuration
										</h3>
										{(() => {
											const pipeline = pipelines.find(
												(p) => p.id === selectedPipeline
											);
											return (
												<div className="space-y-4 text-sm">
													<div>
														<p className="text-muted-foreground mb-1">
															Pipeline Name
														</p>
														<p className="font-medium">{pipeline?.name}</p>
													</div>

													<div>
														<p className="text-muted-foreground mb-1">
															Branch Pattern
														</p>
														<p className="font-mono text-xs p-2 bg-secondary/30 rounded">
															{pipeline?.branch}
														</p>
													</div>

													<div>
														<p className="text-muted-foreground mb-2">
															Triggers
														</p>
														<div className="flex flex-wrap gap-2">
															{pipeline?.triggers.map((trigger) => (
																<span
																	key={trigger}
																	className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
																	{trigger}
																</span>
															))}
														</div>
													</div>

													<div className="border-t border-border/50 pt-4">
														<p className="text-muted-foreground mb-2">Stages</p>
														<div className="space-y-2">
															{["Build", "Test", "Deploy", "Verify"]
																.slice(0, pipeline?.stages)
																.map((stage) => (
																	<div
																		key={stage}
																		className="p-2 bg-secondary/30 rounded text-xs flex items-center gap-2">
																		<CircleCheckBig className="w-3 h-3 text-green-600" />
																		{stage}
																	</div>
																))}
														</div>
													</div>
												</div>
											);
										})()}
									</div>

									<Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
										Edit Pipeline
									</Button>
									<Button variant="outline" className="w-full">
										View Execution History
									</Button>
								</div>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default PipelineConfig;
