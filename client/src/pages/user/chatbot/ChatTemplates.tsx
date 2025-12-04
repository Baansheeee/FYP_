/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Zap, Star, Plus, Copy } from "lucide-react";
import { useState } from "react";

const ChatTemplates = () => {
	const [templates, setTemplates] = useState([
		{
			id: 1,
			name: "EC2 Architecture",
			description: "Design a scalable EC2 instance architecture",
			category: "Compute",
			rating: 4.8,
			uses: 234,
		},
		{
			id: 2,
			name: "Database Setup",
			description: "Configure RDS database with backups and failover",
			category: "Database",
			rating: 4.9,
			uses: 456,
		},
		{
			id: 3,
			name: "Storage Solution",
			description: "Set up S3 buckets with lifecycle policies",
			category: "Storage",
			rating: 4.7,
			uses: 189,
		},
		{
			id: 4,
			name: "Network Configuration",
			description: "Design VPC with security groups and ACLs",
			category: "Networking",
			rating: 4.6,
			uses: 312,
		},
		{
			id: 5,
			name: "Lambda Microservices",
			description: "Create serverless microservices with Lambda",
			category: "Compute",
			rating: 4.9,
			uses: 567,
		},
		{
			id: 6,
			name: "API Gateway Setup",
			description: "Configure API Gateway with authentication",
			category: "Integration",
			rating: 4.8,
			uses: 423,
		},
	]);

	const categories = [
		"All",
		"Compute",
		"Database",
		"Storage",
		"Networking",
		"Integration",
	];
	const [selectedCategory, setSelectedCategory] = useState("All");

	const filteredTemplates =
		selectedCategory === "All"
			? templates
			: templates.filter((t) => t.category === selectedCategory);

	const handleUseTemplate = (id: number) => {
		// Implement template usage logic
		console.log("Using template:", id);
	};

	const handleDuplicate = (id: number) => {
		// Implement duplicate logic
		console.log("Duplicating template:", id);
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
								<h1 className="text-4xl font-bold">Chat Templates</h1>
								<p className="text-lg text-muted-foreground">
									Ready-made templates to jumpstart your conversations
								</p>
							</div>
							<Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
								<Plus className="w-4 h-4 mr-2" />
								Create Custom Template
							</Button>
						</div>

						{/* Category Filter */}
						<div className="flex gap-2 flex-wrap">
							{categories.map((category) => (
								<Button
									key={category}
									variant={
										selectedCategory === category ? "default" : "outline"
									}
									onClick={() => setSelectedCategory(category)}
									className={
										selectedCategory === category
											? "bg-purple-500 text-white hover:bg-purple-600"
											: ""
									}>
									{category}
								</Button>
							))}
						</div>

						{/* Templates Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredTemplates.map((template) => (
								<div
									key={template.id}
									className="glass-card rounded-xl p-6 border border-border/50 hover:border-purple-300/50 transition-all flex flex-col">
									<div className="flex items-start justify-between mb-4">
										<div>
											<h3 className="text-lg font-semibold text-gray-900">
												{template.name}
											</h3>
											<p className="text-sm text-purple-600 font-medium">
												{template.category}
											</p>
										</div>
										<div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
											<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
											<span className="text-sm font-medium">
												{template.rating}
											</span>
										</div>
									</div>

									<p className="text-muted-foreground text-sm mb-4 flex-1">
										{template.description}
									</p>

									<div className="text-xs text-muted-foreground mb-4 pb-4 border-b">
										{template.uses} people used this template
									</div>

									<div className="flex gap-2">
										<Button
											onClick={() => handleUseTemplate(template.id)}
											className="flex-1 bg-purple-500 text-white hover:bg-purple-600">
											<Zap className="w-4 h-4 mr-2" />
											Use Template
										</Button>
										<Button
											onClick={() => handleDuplicate(template.id)}
											variant="outline"
											className="px-4">
											<Copy className="w-4 h-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ChatTemplates;
