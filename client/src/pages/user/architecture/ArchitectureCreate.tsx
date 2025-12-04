/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Plus,
	Zap,
	Layout,
	BookOpen,
	ArrowRight,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios";
import toast from "react-hot-toast";

const ArchitectureCreate = () => {
	const navigate = useNavigate();
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCreateBlank = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name.trim()) {
			toast.error("Please enter an architecture name");
			return;
		}

		try {
			setLoading(true);
			console.log("🔷 Creating architecture with data:", {
				name: formData.name,
				description: formData.description,
			});

			const token = localStorage.getItem("token");
			console.log(
				"🔷 Token from localStorage:",
				token ? "✅ Exists" : "❌ Missing"
			);

			if (!token) {
				toast.error("Please login first");
				setLoading(false);
				return;
			}

			const response = await axiosInstance.post("/architecture/create-blank", {
				name: formData.name,
				description: formData.description,
			});

			console.log("✅ Full Response from server:", response);
			console.log("✅ Response status:", response.status);
			console.log("✅ Response data:", response.data);

			if (response.status === 204) {
				console.error("❌ Got 204 No Content response - server returned empty");
				toast.error("Server returned empty response - check backend logs");
				return;
			}

			if (response.status === 201 || (response.data && response.data.success)) {
				toast.success("Architecture created successfully!");
				const archId = response.data?.architecture?._id;
				console.log("🔷 Architecture ID:", archId);
				if (archId) {
					navigate(`/user/architecture-editor/${archId}`);
				} else {
					toast.error("No architecture ID returned");
				}
			} else {
				toast.error(response.data?.message || "Failed to create architecture");
			}
		} catch (error: any) {
			console.error("❌ Error creating architecture:", error);
			console.error("❌ Full error response:", error.response);
			console.error("❌ Error status:", error.response?.status);
			console.error("❌ Error data:", error.response?.data);
			console.error("❌ Error message:", error.message);

			const errorMsg =
				error.response?.data?.message ||
				error.message ||
				"Failed to create architecture";
			toast.error(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	const handleStartDesigning = () => {
		setShowForm(true);
	};

	const handleUseTemplate = (templateName: string) => {
		navigate("/user/architecture/templates", {
			state: { selectedTemplate: templateName },
		});
	};

	const templates = [
		{
			id: 1,
			name: "Web Application",
			description: "Classic three-tier web application architecture",
			icon: Layout,
			color: "gradient-blue",
			useCase: "Perfect for scalable web apps with load balancing",
		},
		{
			id: 2,
			name: "Microservices",
			description: "Distributed microservices architecture pattern",
			icon: Zap,
			color: "gradient-purple",
			useCase: "Ideal for complex systems with independent services",
		},
		{
			id: 3,
			name: "Serverless Application",
			description: "Fully managed serverless deployment pattern",
			icon: Sparkles,
			color: "gradient-amber",
			useCase: "Best for event-driven, cost-efficient applications",
		},
		{
			id: 4,
			name: "Data Analytics Pipeline",
			description: "Big data processing and analytics infrastructure",
			icon: BookOpen,
			color: "gradient-green",
			useCase: "For large-scale data processing and insights",
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
						<div className="space-y-2 animate-fade-in">
							<h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
								Create New Architecture
							</h1>
							<p className="text-muted-foreground text-lg">
								Start from scratch or choose from our pre-built templates
							</p>
						</div>

						{!showForm ? (
							<>
								{/* Quick Start Options */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
									{/* Start Designing Card */}
									<Card className="glass-card border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-purple-glow/20 transition-all cursor-pointer group overflow-hidden">
										<div className="p-8 space-y-6 h-full flex flex-col">
											<div className="space-y-3">
												<div className="w-14 h-14 rounded-xl gradient-purple flex items-center justify-center group-hover:scale-110 transition-transform">
													<Plus className="w-7 h-7 text-white" />
												</div>
												<h3 className="text-2xl font-bold">Start Designing</h3>
												<p className="text-muted-foreground">
													Create a blank architecture and design it from the
													ground up with full flexibility
												</p>
											</div>
											<div className="space-y-3 mt-auto">
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<div className="w-1 h-1 rounded-full bg-primary" />
													Full customization
												</div>
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<div className="w-1 h-1 rounded-full bg-primary" />
													Save and iterate anytime
												</div>
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<div className="w-1 h-1 rounded-full bg-primary" />
													Access all AWS components
												</div>
											</div>
											<Button
												onClick={handleStartDesigning}
												className="gradient-purple text-white w-full mt-4 shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all">
												Get Started
												<ArrowRight className="w-4 h-4 ml-2" />
											</Button>
										</div>
									</Card>

									{/* Use Templates Card */}
									<Card className="glass-card border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-purple-glow/20 transition-all cursor-pointer group overflow-hidden">
										<div className="p-8 space-y-6 h-full flex flex-col">
											<div className="space-y-3">
												<div className="w-14 h-14 rounded-xl gradient-amber flex items-center justify-center group-hover:scale-110 transition-transform">
													<Sparkles className="w-7 h-7 text-white" />
												</div>
												<h3 className="text-2xl font-bold">Use a Template</h3>
												<p className="text-muted-foreground">
													Choose from battle-tested templates and customize them
													for your specific needs
												</p>
											</div>
											<div className="space-y-3 mt-auto">
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<div className="w-1 h-1 rounded-full bg-primary" />
													Pre-configured components
												</div>
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<div className="w-1 h-1 rounded-full bg-primary" />
													Industry best practices
												</div>
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<div className="w-1 h-1 rounded-full bg-primary" />
													Faster setup and deployment
												</div>
											</div>
											<Button
												onClick={() => navigate("/user/architecture/templates")}
												variant="outline"
												className="w-full mt-4">
												Browse Templates
												<ArrowRight className="w-4 h-4 ml-2" />
											</Button>
										</div>
									</Card>
								</div>

								{/* Popular Templates Preview */}
								<div className="space-y-4 animate-fade-in">
									<h2 className="text-2xl font-bold">Popular Templates</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
										{templates.map((template) => {
											const Icon = template.icon;
											return (
												<Card
													key={template.id}
													className="glass-card border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-purple-glow/20 transition-all cursor-pointer group p-6 space-y-4">
													<div
														className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
														<Icon className="w-6 h-6 text-white" />
													</div>
													<div>
														<h4 className="font-semibold">{template.name}</h4>
														<p className="text-sm text-muted-foreground">
															{template.description}
														</p>
													</div>
													<p className="text-xs text-muted-foreground italic">
														{template.useCase}
													</p>
													<Button
														onClick={() => handleUseTemplate(template.name)}
														variant="outline"
														size="sm"
														className="w-full">
														Use Template
													</Button>
												</Card>
											);
										})}
									</div>
								</div>
							</>
						) : (
							/* Form Section */
							<Card className="glass-card border-border/50 p-8 max-w-2xl mx-auto animate-fade-in">
								<form onSubmit={handleCreateBlank} className="space-y-6">
									<div>
										<h2 className="text-2xl font-bold mb-6">
											Create Blank Architecture
										</h2>
									</div>

									<div className="space-y-2">
										<Label htmlFor="name" className="text-base font-semibold">
											Architecture Name *
										</Label>
										<Input
											id="name"
											name="name"
											type="text"
											placeholder="e.g., E-Commerce Platform, API Gateway System"
											value={formData.name}
											onChange={handleInputChange}
											className="h-12 text-base"
											disabled={loading}
											required
										/>
										<p className="text-xs text-muted-foreground">
											Give your architecture a meaningful name for easy
											identification
										</p>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="description"
											className="text-base font-semibold">
											Description (Optional)
										</Label>
										<textarea
											id="description"
											name="description"
											placeholder="Describe your architecture, its purpose, and key requirements..."
											value={formData.description}
											onChange={handleInputChange}
											className="w-full min-h-24 px-4 py-3 rounded-lg border border-input bg-background text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
											disabled={loading}
										/>
										<p className="text-xs text-muted-foreground">
											Adding a description helps you remember the purpose and
											details later
										</p>
									</div>

									<div className="flex gap-3 pt-4">
										<Button
											type="button"
											variant="outline"
											onClick={() => {
												setShowForm(false);
												setFormData({ name: "", description: "" });
											}}
											disabled={loading}
											className="flex-1">
											Cancel
										</Button>
										<Button
											type="submit"
											className="gradient-purple text-white flex-1 shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all"
											disabled={loading}>
											{loading ? (
												<>
													<div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />
													Creating...
												</>
											) : (
												<>
													<Plus className="w-4 h-4 mr-2" />
													Create Architecture
												</>
											)}
										</Button>
									</div>
								</form>
							</Card>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default ArchitectureCreate;
