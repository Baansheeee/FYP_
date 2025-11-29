/** @format */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import {
	ArrowRight,
	Cloud,
	Sparkles,
	Shield,
	Zap,
	Globe,
	MessageSquare,
	Network,
	DollarSign,
	Activity,
	Rocket,
	GitBranch,
} from "lucide-react";
import { ModuleCard } from "@/components/ModuleCard";

const Index = () => {
	const features = [
		{
			icon: MessageSquare,
			title: "AI-Powered Chatbot",
			description:
				"Describe your needs in natural language and let AI design your infrastructure",
			path: "/chatbot",
		},
		{
			icon: Network,
			title: "Architecture Designer",
			description:
				"Visual architecture builder with automatic diagram generation",
			path: "/architecture/designer",
		},
		{
			icon: DollarSign,
			title: "Cost Intelligence",
			description: "Real-time cost optimization and budget management",
			path: "/cost/estimate",
		},
		{
			icon: Activity,
			title: "Performance Monitoring",
			description: "ML-powered monitoring with anomaly detection",
			path: "/performance/dashboard",
		},
		{
			icon: Rocket,
			title: "One-Click Deployment",
			description:
				"Deploy to AWS with a single click, complete rollback support",
			path: "/deployment",
		},
		{
			icon: GitBranch,
			title: "Version Control",
			description: "Track changes, collaborate with teams, and manage versions",
			path: "/version",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-background">
			<Navbar />

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-14 md:py-20">
				<div className=" p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/10">
					<div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 glass-card border border-border/40 mb-4">
							<Sparkles className="w-4 h-4 text-primary" />
							<span className="text-sm font-medium text-foreground">
								AI-Powered AWS Management
							</span>
						</div>

						<h1 className="text-5xl md:text-7xl font-bold leading-tight">
							Build, Deploy & Optimize{" "}
							<span className="text-gradient">AWS Infrastructure</span>
						</h1>

						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							AWSOME automates AWS architecture design, deployment, and
							optimization using AI. Describe your needs, and watch as your
							infrastructure comes to life.
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
							<Button
								size="lg"
								className="gradient-purple text-white shadow-lg hover:shadow-xl hover:shadow-purple-glow/50 transition-all duration-300"
								asChild>
								<Link to="/auth/register">
									Get Started Free
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link to="/dashboard">View Dashboard</Link>
							</Button>
						</div>

						<div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<Shield className="w-4 h-4 text-primary" />
								<span>Enterprise Security</span>
							</div>
							<div className="flex items-center gap-2">
								<Zap className="w-4 h-4 text-primary" />
								<span>Instant Deployment</span>
							</div>
							<div className="flex items-center gap-2">
								<Globe className="w-4 h-4 text-primary" />
								<span>Multi-Region</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="container mx-auto px-4 py-20">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16 space-y-4">
						<h2 className="text-4xl md:text-5xl font-bold">
							Everything You Need to{" "}
							<span className="text-gradient">Manage AWS</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Comprehensive suite of tools powered by AI to streamline your AWS
							operations
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{features.map((feature, index) => (
							<div
								key={feature.title}
								className="animate-fade-in"
								style={{ animationDelay: `${index * 100}ms` }}>
								<ModuleCard
									title={feature.title}
									description={feature.description}
									icon={feature.icon}
									path={feature.path}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-20">
				<div className="max-w-4xl mx-auto">
					<div className="glass-card rounded-3xl p-12 text-center space-y-6 border border-border/40 shadow-xl">
						<div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center mx-auto shadow-lg shadow-purple-glow/50">
							<Cloud className="w-8 h-8 text-white" />
						</div>
						<h2 className="text-3xl md:text-4xl font-bold">
							Ready to Transform Your AWS Workflow?
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Join thousands of developers and enterprises using AWSOME to
							manage their cloud infrastructure
						</p>
						<Button
							size="lg"
							className="gradient-purple text-white shadow-lg hover:shadow-xl hover:shadow-purple-glow/50 transition-all duration-300"
							asChild>
							<Link to="/auth/register">
								Start Building Now
								<ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border/40 py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
								<Cloud className="w-5 h-5 text-white" />
							</div>
							<span className="font-bold text-gradient">AWSOME</span>
						</div>
						<p className="text-sm text-muted-foreground">
							© 2025 AWSOME. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Index;
