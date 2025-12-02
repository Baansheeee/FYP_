/** @format */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import {
	MessageSquare,
	Network,
	DollarSign,
	Activity,
	Rocket,
	GitBranch,
	Zap,
	Shield,
	BarChart3,
	Cloud,
	Lock,
	Users,
	ArrowRight,
	CheckCircle2,
} from "lucide-react";

const Features = () => {
	const mainFeatures = [
		{
			icon: MessageSquare,
			title: "AI-Powered Chatbot",
			description:
				"Describe your AWS needs in natural language. Our intelligent chatbot understands complex requirements and generates optimized infrastructure designs automatically.",
			benefits: [
				"Natural language processing",
				"Smart resource recommendations",
				"Real-time suggestions",
			],
		},
		{
			icon: Network,
			title: "Architecture Designer",
			description:
				"Visually design AWS architectures with drag-and-drop components. Create complex multi-tier applications with ease.",
			benefits: [
				"Drag-and-drop interface",
				"Pre-built AWS components",
				"Auto-layout and alignment",
			],
		},
		{
			icon: DollarSign,
			title: "Cost Intelligence",
			description:
				"Get real-time cost analysis and optimization recommendations. Identify savings opportunities and track spending patterns.",
			benefits: ["Cost predictions", "Optimization alerts", "Budget tracking"],
		},
		{
			icon: Activity,
			title: "Performance Monitoring",
			description:
				"Monitor your infrastructure with ML-powered analytics. Detect anomalies and performance issues before they impact users.",
			benefits: [
				"Real-time metrics",
				"Anomaly detection",
				"Performance insights",
			],
		},
		{
			icon: Rocket,
			title: "One-Click Deployment",
			description:
				"Deploy your infrastructure to AWS with a single click. Complete rollback support and deployment history tracking.",
			benefits: [
				"Automated deployment",
				"Rollback capabilities",
				"Deployment logs",
			],
		},
		{
			icon: GitBranch,
			title: "Version Control",
			description:
				"Track all changes to your infrastructure. Collaborate with your team and manage versions seamlessly.",
			benefits: ["Change history", "Team collaboration", "Version comparison"],
		},
	];

	const advancedFeatures = [
		{
			icon: Shield,
			title: "Security & Compliance",
			description:
				"Built-in security best practices and compliance checks for AWS",
		},
		{
			icon: BarChart3,
			title: "Advanced Analytics",
			description:
				"Deep insights into resource utilization and performance metrics",
		},
		{
			icon: Users,
			title: "Team Collaboration",
			description: "Work together with real-time updates and shared workspaces",
		},
		{
			icon: Cloud,
			title: "Multi-Region Support",
			description: "Deploy and manage resources across multiple AWS regions",
		},
		{
			icon: Lock,
			title: "Enterprise Security",
			description: "Role-based access control and audit logging for compliance",
		},
		{
			icon: Zap,
			title: "Auto-Scaling",
			description: "Automatic scaling policies based on metrics and thresholds",
		},
	];

	const compareWith = [
		{
			feature: "AI-Powered Design",
			awsome: true,
			others: false,
		},
		{
			feature: "Cost Optimization",
			awsome: true,
			others: true,
		},
		{
			feature: "Real-time Monitoring",
			awsome: true,
			others: true,
		},
		{
			feature: "Visual Editor",
			awsome: true,
			others: true,
		},
		{
			feature: "Automated Deployment",
			awsome: true,
			others: false,
		},
		{
			feature: "Version Control",
			awsome: true,
			others: false,
		},
		{
			feature: "Team Collaboration",
			awsome: true,
			others: true,
		},
		{
			feature: "Free Tier",
			awsome: true,
			others: true,
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 text-center ">
				<div className="p-8 py-28 rounded-2xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent border border-purple-500/10 ">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
						Powerful Features for{" "}
						<span className="text-gradient">AWS Management</span>
					</h1>
					<p
						className="text-xl text-muted-foreground mb-8 animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						Everything you need to design, deploy, and manage AWS infrastructure
						with confidence
					</p>
				</div>
			</section>

			{/* Main Features Grid */}
			<section className="container mx-auto px-4 py-8">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{mainFeatures.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.title}
								className="p-6 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-lg"
								style={{ animationDelay: `${index * 50}ms` }}>
								<div className="mb-4">
									<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
										<Icon className="w-6 h-6 text-white" />
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
								<p className="text-muted-foreground mb-4">
									{feature.description}
								</p>
								<ul className="space-y-2">
									{feature.benefits.map((benefit) => (
										<li
											key={benefit}
											className="flex items-center gap-2 text-sm">
											<CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
											<span>{benefit}</span>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</section>

			{/* Advanced Features */}
			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4 animate-fade-in">
						Advanced Capabilities
					</h2>
					<p
						className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						Go beyond basics with enterprise-grade features
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{advancedFeatures.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.title}
								className="p-6 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-all duration-300 animate-fade-in"
								style={{ animationDelay: `${200 + index * 50}ms` }}>
								<div className="flex items-start gap-4">
									<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
										<Icon className="w-5 h-5 text-purple-500" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">{feature.title}</h3>
										<p className="text-sm text-muted-foreground">
											{feature.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>

			{/* Comparison */}
			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4 animate-fade-in">
						Why Choose AWSOME?
					</h2>
					<p
						className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in"
						style={{ animationDelay: "100ms" }}>
						See how we compare to other AWS management tools
					</p>
				</div>

				<div
					className="max-w-4xl mx-auto overflow-x-auto animate-fade-in"
					style={{ animationDelay: "200ms" }}>
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-border/50">
								<th className="text-left p-4 font-semibold">Feature</th>
								<th className="text-center p-4 font-semibold text-purple-600">
									AWSOME
								</th>
								<th className="text-center p-4 font-semibold text-muted-foreground">
									Others
								</th>
							</tr>
						</thead>
						<tbody>
							{compareWith.map((row, index) => (
								<tr
									key={index}
									className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
									<td className="p-4">{row.feature}</td>
									<td className="text-center p-4">
										{row.awsome ? (
											<CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<div className="w-5 h-5 mx-auto" />
										)}
									</td>
									<td className="text-center p-4">
										{row.others ? (
											<CheckCircle2 className="w-5 h-5 text-gray-400 mx-auto" />
										) : (
											<div className="w-5 h-5 mx-auto" />
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* Feature Highlight */}
			<section className="container mx-auto px-4 py-16">
				<div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-12 text-center animate-fade-in">
					<h2 className="text-3xl font-bold mb-4">Continuous Innovation</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						We're constantly adding new features and improvements. Expect
						updates every month with new capabilities and enhancements.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="gradient-purple text-white" asChild>
							<Link to="/auth/register">
								Start Building
								<ArrowRight className="ml-2 w-5 h-5" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link to="/pricing">View Pricing</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Footer Spacing */}
			<div className="h-8"></div>
		</div>
	);
};

export default Features;
