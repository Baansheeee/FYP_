/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Cloud, RefreshCw, Download, Eye } from "lucide-react";

const ImportResources = () => {
	const discoveredResources = [
		{
			type: "EC2 Instance",
			name: "web-server-01",
			region: "us-east-1",
			status: "running",
		},
		{
			type: "RDS Database",
			name: "prod-db",
			region: "us-east-1",
			status: "available",
		},
		{
			type: "S3 Bucket",
			name: "assets-bucket",
			region: "us-east-1",
			status: "active",
		},
		{
			type: "Load Balancer",
			name: "main-alb",
			region: "us-east-1",
			status: "active",
		},
		{
			type: "Lambda Function",
			name: "api-handler",
			region: "us-east-1",
			status: "active",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-between animate-fade-in">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
									<Upload className="w-6 h-6 text-white" />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Import Resources</h1>
									<p className="text-muted-foreground">
										Reverse engineer existing AWS infrastructure
									</p>
								</div>
							</div>
						</div>

						{/* AWS Connection */}
						<Card className="glass-card border-border/50">
							<CardHeader>
								<CardTitle>Connect to AWS Account</CardTitle>
								<CardDescription>
									Provide your AWS credentials to discover and import existing
									resources
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="access-key">AWS Access Key ID</Label>
										<Input id="access-key" placeholder="AKIA..." />
									</div>
									<div className="space-y-2">
										<Label htmlFor="secret-key">AWS Secret Access Key</Label>
										<Input
											id="secret-key"
											type="password"
											placeholder="••••••••"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="region">Default Region</Label>
										<Input id="region" placeholder="us-east-1" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="account">Account ID (Optional)</Label>
										<Input id="account" placeholder="123456789012" />
									</div>
								</div>
								<div className="flex gap-2">
									<Button className="gradient-purple text-white shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all">
										<Cloud className="w-4 h-4 mr-2" />
										Connect Account
									</Button>
									<Button variant="outline">Test Connection</Button>
								</div>
							</CardContent>
						</Card>

						{/* Discovered Resources */}
						<Card className="glass-card border-border/50">
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle>Discovered Resources</CardTitle>
										<CardDescription>
											Resources found in your AWS account
										</CardDescription>
									</div>
									<Button size="sm" variant="outline">
										<RefreshCw className="w-4 h-4 mr-2" />
										Refresh
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{discoveredResources.map((resource, index) => (
										<div
											key={index}
											className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in"
											style={{ animationDelay: `${index * 50}ms` }}>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 rounded-lg gradient-purple-soft flex items-center justify-center">
														<Cloud className="w-5 h-5 text-primary" />
													</div>
													<div>
														<h4 className="font-semibold">{resource.name}</h4>
														<p className="text-sm text-muted-foreground">
															{resource.type} • {resource.region}
														</p>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-700">
														{resource.status}
													</span>
													<Button size="sm" variant="outline">
														<Eye className="w-4 h-4" />
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
								<div className="flex gap-2 mt-6">
									<Button className="gradient-purple text-white">
										<Download className="w-4 h-4 mr-2" />
										Export as Terraform
									</Button>
									<Button variant="outline">
										<Eye className="w-4 h-4 mr-2" />
										Visualize Architecture
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ImportResources;
