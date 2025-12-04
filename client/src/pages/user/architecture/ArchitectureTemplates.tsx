/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Star, Copy, Download, Eye } from "lucide-react";
import { useState } from "react";

const ArchitectureTemplates = () => {
	const [templates, setTemplates] = useState([
		{
			id: 1,
			name: "Web Application",
			description: "Scalable web application with auto-scaling",
			components: ["ELB", "EC2", "RDS", "S3"],
			difficulty: "Beginner",
			rating: 4.9,
			usage: 2341,
		},
		{
			id: 2,
			name: "Microservices",
			description: "Container-based microservices architecture",
			components: ["ECS", "ALB", "RDS", "ElastiCache"],
			difficulty: "Intermediate",
			rating: 4.8,
			usage: 1834,
		},
		{
			id: 3,
			name: "Data Lake",
			description: "Big data storage and analytics solution",
			components: ["S3", "Redshift", "Glue", "Athena"],
			difficulty: "Advanced",
			rating: 4.7,
			usage: 956,
		},
		{
			id: 4,
			name: "Serverless API",
			description: "API Gateway with Lambda functions",
			components: ["API Gateway", "Lambda", "DynamoDB", "CloudFront"],
			difficulty: "Intermediate",
			rating: 4.9,
			usage: 3201,
		},
		{
			id: 5,
			name: "IoT Solution",
			description: "IoT data ingestion and processing",
			components: ["IoT Core", "Kinesis", "Lambda", "RDS"],
			difficulty: "Advanced",
			rating: 4.6,
			usage: 678,
		},
		{
			id: 6,
			name: "High Availability",
			description: "Multi-region redundant infrastructure",
			components: ["Route 53", "ELB", "EC2", "RDS", "S3"],
			difficulty: "Advanced",
			rating: 4.8,
			usage: 1456,
		},
	]);

	const [selectedDifficulty, setSelectedDifficulty] = useState("All");

	const filteredTemplates =
		selectedDifficulty === "All"
			? templates
			: templates.filter((t) => t.difficulty === selectedDifficulty);

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Beginner":
				return "bg-green-100 text-green-700";
			case "Intermediate":
				return "bg-blue-100 text-blue-700";
			case "Advanced":
				return "bg-red-100 text-red-700";
			default:
				return "bg-gray-100 text-gray-700";
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
							<h1 className="text-4xl font-bold">Architecture Templates</h1>
							<p className="text-lg text-muted-foreground">
								Start from pre-built architecture templates
							</p>
						</div>

						{/* Filter */}
						<div className="flex gap-2 flex-wrap">
							{["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
								<Button
									key={level}
									variant={selectedDifficulty === level ? "default" : "outline"}
									onClick={() => setSelectedDifficulty(level)}
									className={
										selectedDifficulty === level
											? "bg-purple-500 text-white hover:bg-purple-600"
											: ""
									}>
									{level}
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
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-gray-900">
												{template.name}
											</h3>
											<span
												className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
													template.difficulty
												)}`}>
												{template.difficulty}
											</span>
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

									<div className="mb-4 pb-4 border-b">
										<p className="text-xs font-medium text-muted-foreground mb-2">
											Components
										</p>
										<div className="flex flex-wrap gap-1">
											{template.components.map((comp) => (
												<span
													key={comp}
													className="px-2 py-1 bg-secondary rounded text-xs">
													{comp}
												</span>
											))}
										</div>
									</div>

									<div className="text-xs text-muted-foreground mb-4">
										{template.usage} people used this
									</div>

									<div className="flex gap-2">
										<Button
											onClick={() => console.log("Use:", template.id)}
											className="flex-1 bg-purple-500 text-white hover:bg-purple-600">
											Use Template
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={() => console.log("View:", template.id)}>
											<Eye className="w-4 h-4" />
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={() => console.log("Copy:", template.id)}>
											<Copy className="w-4 h-4" />
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={() => console.log("Download:", template.id)}>
											<Download className="w-4 h-4" />
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

export default ArchitectureTemplates;
