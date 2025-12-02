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
} from "lucide-react";

const Dashboard = () => {
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
			icon: Pencil,
			title: "Visual Canvas",
			description: "Drag and drop architecture designer",
			path: "/canvas",
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
