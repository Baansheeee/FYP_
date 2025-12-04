/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatCard } from "@/components/cards/StatCard";
import toast, { Toaster } from "react-hot-toast";
import { ModuleCard } from "@/components/cards/ModuleCard";
import Navbar from "@/components/layout/Navbar";
import {
	Cloud,
	DollarSign,
	Activity,
	Zap,
	MessageSquare,
	Network,
	Rocket,
	GitBranch,
	Pencil,
	Upload,
	ChevronRight,
	History,
	AlertCircle,
	Gauge,
	Package,
	BarChart3,
	Timer,
	Cpu,
	Bell,
	FileText,
	Workflow,
	TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();

	const quickActions = [
		{
			icon: MessageSquare,
			title: "Smart Chatbot",
			description: "Describe your AWS needs in natural language",
			path: "/chatbot",
		},
		{
			icon: Network,
			title: "Design Architecture",
			description: "Create visual AWS architectures",
			path: "/architecture/designer",
		},
		{
			icon: Rocket,
			title: "Deploy Infrastructure",
			description: "One-click deployment to AWS",
			path: "/deployment",
		},
		{
			icon: Upload,
			title: "Import Resources",
			description: "Reverse engineer existing AWS resources",
			path: "/import/connect",
		},
		{
			icon: GitBranch,
			title: "Version Control",
			description: "Track and manage architecture versions",
			path: "/version",
		},
	];

	const chatbotOptions = [
		{
			icon: History,
			label: "Chat History",
			path: "/chatbot/history",
			description: "View past conversations",
		},
		{
			icon: FileText,
			label: "Templates",
			path: "/chatbot/templates",
			description: "Pre-built chat templates",
		},
		{
			icon: Zap,
			label: "Sessions",
			path: "/chatbot/sessions",
			description: "Manage chat sessions",
		},
	];

	const architectureOptions = [
		{
			icon: Cloud,
			label: "My Architectures",
			path: "/architecture/list",
			description: "Browse your designs",
		},
		{
			icon: Pencil,
			label: "Visual Editor",
			path: "/architecture/editor",
			description: "Advanced editor",
		},
		{
			icon: Network,
			label: "Templates",
			path: "/architecture/templates",
			description: "Pre-built templates",
		},
		{
			icon: FileText,
			label: "Details",
			path: "/architecture/details",
			description: "View full specs",
		},
	];

	const costOptions = [
		{
			icon: BarChart3,
			label: "Cost Analysis",
			path: "/cost/analysis",
			description: "Detailed breakdown",
		},
		{
			icon: FileText,
			label: "Reports",
			path: "/cost/reports",
			description: "Historical reports",
		},
		{
			icon: AlertCircle,
			label: "Budget Alerts",
			path: "/cost/alerts",
			description: "Set thresholds",
		},
	];

	const deploymentOptions = [
		{
			icon: History,
			label: "History",
			path: "/deployment/history",
			description: "Past deployments",
		},
		{
			icon: Activity,
			label: "Status",
			path: "/deployment/status",
			description: "Real-time progress",
		},
		{
			icon: TrendingUp,
			label: "Rollback",
			path: "/deployment/rollback",
			description: "Restore versions",
		},
	];

	const versionOptions = [
		{
			icon: History,
			label: "Version History",
			path: "/version/history",
			description: "All versions",
		},
		{
			icon: TrendingUp,
			label: "Compare",
			path: "/version/compare",
			description: "Side-by-side diff",
		},
		{
			icon: Zap,
			label: "Restore",
			path: "/version/restore",
			description: "Restore previous",
		},
	];

	const devopsOptions = [
		{
			icon: Package,
			label: "Containers",
			path: "/devops/containers",
			description: "Manage containers",
		},
		{
			icon: Workflow,
			label: "Pipeline",
			path: "/devops/pipeline",
			description: "CI/CD pipelines",
		},
		{
			icon: Activity,
			label: "Logs",
			path: "/devops/logs",
			description: "View application logs",
		},
	];

	const performanceOptions = [
		{
			icon: Gauge,
			label: "Metrics",
			path: "/performance/metrics",
			description: "Performance metrics",
		},
		{
			icon: Activity,
			label: "Health Check",
			path: "/performance/health",
			description: "System health",
		},
		{
			icon: Bell,
			label: "Alerts",
			path: "/performance/alerts",
			description: "Configure alerts",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 1000,
					style: {
						background: "#1f1f1f",
						color: "#fff",
						padding: "12px 16px",
						borderRadius: "10px",
						fontSize: "14px",
					},
					success: {
						style: { background: "#22c55e" },
					},
					error: {
						style: { background: "#ef4444" },
					},
				}}
			/>
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="space-y-2 animate-fade-in">
							<h1 className="text-4xl font-bold">Welcome Back</h1>
							<p className="text-lg text-muted-foreground">
								Manage your AWS infrastructure with AI-powered tools
							</p>
						</div>

						{/* Stats Grid */}
						<div
							className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in"
							style={{ animationDelay: "100ms" }}>
							<StatCard
								title="Active Resources"
								value="24"
								change="+12%"
								trend="up"
								icon={Cloud}
							/>
							<StatCard
								title="Monthly Cost"
								value="$1,249"
								change="-8%"
								trend="down"
								icon={DollarSign}
							/>
							<StatCard title="Uptime" value="99.9%" icon={Activity} />
							<StatCard
								title="Deployments"
								value="156"
								change="+23%"
								trend="up"
								icon={Zap}
							/>
						</div>

						{/* Quick Actions */}
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold">Quick Actions</h2>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{quickActions.map((action, index) => (
									<div
										key={action.title}
										className="animate-fade-in"
										style={{ animationDelay: `${200 + index * 50}ms` }}>
										<ModuleCard
											title={action.title}
											description={action.description}
											icon={action.icon}
											path={action.path}
										/>
									</div>
								))}
							</div>
						</div>

						{/* Module Options Grid */}
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold">Explore Features</h2>

							{/* Chatbot Options */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center gap-3 mb-4">
									<MessageSquare className="w-6 h-6 text-blue-500" />
									<h3 className="text-xl font-semibold">Chatbot Hub</h3>
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									{chatbotOptions.map((option) => (
										<button
											key={option.path}
											onClick={() => navigate(option.path)}
											className="group p-4 rounded-lg bg-secondary/30 hover:bg-blue-500/10 hover:border-blue-300/50 border border-border/50 transition-all text-left">
											<div className="flex items-start gap-3">
												<option.icon className="w-5 h-5 text-blue-500 mt-1 group-hover:scale-110 transition-transform" />
												<div>
													<p className="font-semibold text-sm">
														{option.label}
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														{option.description}
													</p>
												</div>
												<ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Architecture Options */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center gap-3 mb-4">
									<Network className="w-6 h-6 text-purple-500" />
									<h3 className="text-xl font-semibold">Architecture Tools</h3>
								</div>
								<div className="grid md:grid-cols-4 gap-4">
									{architectureOptions.map((option) => (
										<button
											key={option.path}
											onClick={() => navigate(option.path)}
											className="group p-4 rounded-lg bg-secondary/30 hover:bg-purple-500/10 hover:border-purple-300/50 border border-border/50 transition-all text-left">
											<div className="flex items-start gap-3">
												<option.icon className="w-5 h-5 text-purple-500 mt-1 group-hover:scale-110 transition-transform" />
												<div>
													<p className="font-semibold text-sm">
														{option.label}
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														{option.description}
													</p>
												</div>
												<ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Cost Management Options */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center gap-3 mb-4">
									<DollarSign className="w-6 h-6 text-green-500" />
									<h3 className="text-xl font-semibold">Cost Management</h3>
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									{costOptions.map((option) => (
										<button
											key={option.path}
											onClick={() => navigate(option.path)}
											className="group p-4 rounded-lg bg-secondary/30 hover:bg-green-500/10 hover:border-green-300/50 border border-border/50 transition-all text-left">
											<div className="flex items-start gap-3">
												<option.icon className="w-5 h-5 text-green-500 mt-1 group-hover:scale-110 transition-transform" />
												<div>
													<p className="font-semibold text-sm">
														{option.label}
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														{option.description}
													</p>
												</div>
												<ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Deployment Options */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center gap-3 mb-4">
									<Rocket className="w-6 h-6 text-orange-500" />
									<h3 className="text-xl font-semibold">
										Deployment Management
									</h3>
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									{deploymentOptions.map((option) => (
										<button
											key={option.path}
											onClick={() => navigate(option.path)}
											className="group p-4 rounded-lg bg-secondary/30 hover:bg-orange-500/10 hover:border-orange-300/50 border border-border/50 transition-all text-left">
											<div className="flex items-start gap-3">
												<option.icon className="w-5 h-5 text-orange-500 mt-1 group-hover:scale-110 transition-transform" />
												<div>
													<p className="font-semibold text-sm">
														{option.label}
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														{option.description}
													</p>
												</div>
												<ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Version Control Options */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center gap-3 mb-4">
									<GitBranch className="w-6 h-6 text-indigo-500" />
									<h3 className="text-xl font-semibold">Version Control</h3>
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									{versionOptions.map((option) => (
										<button
											key={option.path}
											onClick={() => navigate(option.path)}
											className="group p-4 rounded-lg bg-secondary/30 hover:bg-indigo-500/10 hover:border-indigo-300/50 border border-border/50 transition-all text-left">
											<div className="flex items-start gap-3">
												<option.icon className="w-5 h-5 text-indigo-500 mt-1 group-hover:scale-110 transition-transform" />
												<div>
													<p className="font-semibold text-sm">
														{option.label}
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														{option.description}
													</p>
												</div>
												<ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>
							</div>

							{/* DevOps Options */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center gap-3 mb-4">
									<Package className="w-6 h-6 text-red-500" />
									<h3 className="text-xl font-semibold">DevOps Tools</h3>
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									{devopsOptions.map((option) => (
										<button
											key={option.path}
											onClick={() => navigate(option.path)}
											className="group p-4 rounded-lg bg-secondary/30 hover:bg-red-500/10 hover:border-red-300/50 border border-border/50 transition-all text-left">
											<div className="flex items-start gap-3">
												<option.icon className="w-5 h-5 text-red-500 mt-1 group-hover:scale-110 transition-transform" />
												<div>
													<p className="font-semibold text-sm">
														{option.label}
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														{option.description}
													</p>
												</div>
												<ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Performance Options */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center gap-3 mb-4">
									<Cpu className="w-6 h-6 text-cyan-500" />
									<h3 className="text-xl font-semibold">
										Performance Monitoring
									</h3>
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									{performanceOptions.map((option) => (
										<button
											key={option.path}
											onClick={() => navigate(option.path)}
											className="group p-4 rounded-lg bg-secondary/30 hover:bg-cyan-500/10 hover:border-cyan-300/50 border border-border/50 transition-all text-left">
											<div className="flex items-start gap-3">
												<option.icon className="w-5 h-5 text-cyan-500 mt-1 group-hover:scale-110 transition-transform" />
												<div>
													<p className="font-semibold text-sm">
														{option.label}
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														{option.description}
													</p>
												</div>
												<ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Recent Activity */}
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold">Recent Activity</h2>
							<div className="glass-card rounded-xl p-6 border border-border/50 space-y-4">
								{[
									{
										action: "Deployed new architecture",
										time: "2 hours ago",
										status: "success",
									},
									{
										action: "Cost optimization applied",
										time: "5 hours ago",
										status: "success",
									},
									{
										action: "Version 2.1 created",
										time: "1 day ago",
										status: "info",
									},
									{
										action: "Performance alert resolved",
										time: "2 days ago",
										status: "warning",
									},
								].map((activity, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
										<div className="flex items-center gap-3">
											<div
												className={`w-2 h-2 rounded-full ${
													activity.status === "success"
														? "bg-green-500"
														: activity.status === "warning"
														? "bg-yellow-500"
														: "bg-blue-500"
												}`}
											/>
											<span className="font-medium">{activity.action}</span>
										</div>
										<span className="text-sm text-muted-foreground">
											{activity.time}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
