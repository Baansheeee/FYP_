/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Download, Copy, Share2, Clock, Cloud } from "lucide-react";

const ArchitectureDetails = () => {
	const architecture = {
		id: 1,
		name: "E-Commerce Platform",
		description:
			"High-availability e-commerce infrastructure with auto-scaling and multi-region deployment",
		created: "2024-11-15",
		lastModified: "2024-12-03",
		status: "Production",
		estimatedCost: "$2,450/month",
		components: [
			{ name: "Route 53", type: "DNS", region: "Global" },
			{ name: "CloudFront", type: "CDN", region: "Global" },
			{ name: "ALB", type: "Load Balancer", region: "us-east-1" },
			{ name: "EC2 (Auto Scaling)", type: "Compute", region: "us-east-1" },
			{ name: "RDS (Multi-AZ)", type: "Database", region: "us-east-1" },
			{ name: "ElastiCache", type: "Cache", region: "us-east-1" },
			{ name: "S3", type: "Storage", region: "us-east-1" },
			{ name: "SQS", type: "Queue", region: "us-east-1" },
		],
		diagram:
			"High-level diagram showing global distribution with regional resources",
		documentations: [
			{
				id: 1,
				title: "Architecture Overview",
				type: "PDF",
				size: "2.4 MB",
			},
			{
				id: 2,
				title: "Cost Optimization Guide",
				type: "PDF",
				size: "1.8 MB",
			},
			{
				id: 3,
				title: "Deployment Instructions",
				type: "PDF",
				size: "3.1 MB",
			},
		],
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-start justify-between">
							<div className="space-y-2 flex-1">
								<h1 className="text-4xl font-bold">{architecture.name}</h1>
								<p className="text-lg text-muted-foreground">
									{architecture.description}
								</p>
								<div className="flex gap-4 mt-4 text-sm">
									<span
										className={`px-3 py-1 rounded-full font-medium ${
											architecture.status === "Production"
												? "bg-green-100 text-green-700"
												: "bg-blue-100 text-blue-700"
										}`}>
										{architecture.status}
									</span>
									<span className="text-muted-foreground">
										Created: {architecture.created}
									</span>
									<span className="text-muted-foreground">
										Last modified: {architecture.lastModified}
									</span>
								</div>
							</div>

							<div className="flex gap-2">
								<Button variant="outline">
									<Download className="w-4 h-4 mr-2" />
									Export
								</Button>
								<Button variant="outline">
									<Copy className="w-4 h-4 mr-2" />
									Duplicate
								</Button>
								<Button variant="outline">
									<Share2 className="w-4 h-4 mr-2" />
									Share
								</Button>
							</div>
						</div>

						{/* Cost Summary */}
						<div className="glass-card rounded-xl p-6 border border-border/50 bg-gradient-to-r from-purple-500/10 to-purple-600/10">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-muted-foreground text-sm mb-1">
										Estimated Monthly Cost
									</p>
									<p className="text-3xl font-bold">
										{architecture.estimatedCost}
									</p>
								</div>
								<Cloud className="w-16 h-16 text-purple-500/30" />
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Components Section */}
							<div className="lg:col-span-2 space-y-6">
								<div>
									<h2 className="text-2xl font-semibold mb-4">Components</h2>
									<div className="glass-card rounded-xl border border-border/50 overflow-hidden">
										<div className="overflow-x-auto">
											<table className="w-full">
												<thead>
													<tr className="border-b border-border/50 bg-secondary/30">
														<th className="px-6 py-3 text-left text-sm font-semibold">
															Component
														</th>
														<th className="px-6 py-3 text-left text-sm font-semibold">
															Type
														</th>
														<th className="px-6 py-3 text-left text-sm font-semibold">
															Region
														</th>
													</tr>
												</thead>
												<tbody>
													{architecture.components.map((comp, index) => (
														<tr
															key={index}
															className="border-b border-border/50 hover:bg-secondary/20">
															<td className="px-6 py-4">
																<span className="font-medium">{comp.name}</span>
															</td>
															<td className="px-6 py-4 text-muted-foreground">
																{comp.type}
															</td>
															<td className="px-6 py-4 text-muted-foreground">
																{comp.region}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>

								{/* Architecture Diagram */}
								<div>
									<h2 className="text-2xl font-semibold mb-4">
										Architecture Diagram
									</h2>
									<div className="glass-card rounded-xl border border-border/50 p-8 bg-secondary/30 flex items-center justify-center min-h-96">
										<div className="text-center text-muted-foreground/50">
											<Cloud className="w-20 h-20 mx-auto mb-4" />
											<p className="text-lg">{architecture.diagram}</p>
										</div>
									</div>
								</div>
							</div>

							{/* Sidebar */}
							<div className="space-y-6">
								{/* Quick Stats */}
								<div className="glass-card rounded-xl p-6 border border-border/50 space-y-4">
									<h3 className="font-semibold text-lg">Quick Stats</h3>
									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Total Components
											</span>
											<span className="font-semibold">
												{architecture.components.length}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Availability
											</span>
											<span className="font-semibold">99.99%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Data Centers
											</span>
											<span className="font-semibold">3</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Scalability</span>
											<span className="font-semibold">Auto-scaling</span>
										</div>
									</div>
								</div>

								{/* Documentation */}
								<div className="glass-card rounded-xl p-6 border border-border/50 space-y-4">
									<h3 className="font-semibold text-lg">Documentation</h3>
									<div className="space-y-2">
										{architecture.documentations.map((doc) => (
											<div
												key={doc.id}
												className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
												<div className="flex items-center justify-between">
													<div>
														<p className="text-sm font-medium">{doc.title}</p>
														<p className="text-xs text-muted-foreground">
															{doc.type} • {doc.size}
														</p>
													</div>
													<Download className="w-4 h-4 text-purple-500" />
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Timeline */}
								<div className="glass-card rounded-xl p-6 border border-border/50 space-y-4">
									<h3 className="font-semibold text-lg flex items-center gap-2">
										<Clock className="w-5 h-5" />
										Timeline
									</h3>
									<div className="space-y-3 text-sm">
										<div className="pb-3 border-b border-border/50">
											<p className="font-medium">Created</p>
											<p className="text-muted-foreground">
												{architecture.created}
											</p>
										</div>
										<div>
											<p className="font-medium">Last Modified</p>
											<p className="text-muted-foreground">
												{architecture.lastModified}
											</p>
										</div>
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

export default ArchitectureDetails;
