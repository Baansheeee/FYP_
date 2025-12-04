/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
	Activity,
	CheckCircle,
	AlertCircle,
	Zap,
	Clock,
	RefreshCw,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react";
import { useState } from "react";

const HealthCheck = () => {
	const [services, setServices] = useState([
		{
			id: 1,
			name: "API Server",
			status: "Healthy",
			uptime: 99.98,
			responseTime: 45,
			checks: 542,
			lastCheck: "2 seconds ago",
			cpu: 45,
			memory: 62,
		},
		{
			id: 2,
			name: "Database",
			status: "Healthy",
			uptime: 99.95,
			responseTime: 12,
			checks: 512,
			lastCheck: "1 second ago",
			cpu: 28,
			memory: 78,
		},
		{
			id: 3,
			name: "Cache Service",
			status: "Healthy",
			uptime: 99.99,
			responseTime: 2,
			checks: 498,
			lastCheck: "3 seconds ago",
			cpu: 18,
			memory: 85,
		},
		{
			id: 4,
			name: "Message Queue",
			status: "Degraded",
			uptime: 98.5,
			responseTime: 156,
			checks: 485,
			lastCheck: "5 seconds ago",
			cpu: 72,
			memory: 91,
		},
		{
			id: 5,
			name: "Authentication Service",
			status: "Healthy",
			uptime: 99.97,
			responseTime: 28,
			checks: 523,
			lastCheck: "1 second ago",
			cpu: 32,
			memory: 45,
		},
		{
			id: 6,
			name: "File Storage",
			status: "Healthy",
			uptime: 99.99,
			responseTime: 67,
			checks: 456,
			lastCheck: "2 seconds ago",
			cpu: 15,
			memory: 52,
		},
	]);

	const [selectedService, setSelectedService] = useState<number | null>(null);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Healthy":
				return "bg-green-100 text-green-700 border-green-200";
			case "Degraded":
				return "bg-yellow-100 text-yellow-700 border-yellow-200";
			case "Unhealthy":
				return "bg-red-100 text-red-700 border-red-200";
			default:
				return "bg-gray-100 text-gray-700 border-gray-200";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Healthy":
				return <CheckCircle className="w-5 h-5 text-green-600" />;
			case "Degraded":
				return <AlertCircle className="w-5 h-5 text-yellow-600" />;
			case "Unhealthy":
				return <AlertCircle className="w-5 h-5 text-red-600" />;
			default:
				return null;
		}
	};

	const healthyCount = services.filter((s) => s.status === "Healthy").length;
	const degradedCount = services.filter((s) => s.status === "Degraded").length;
	const unhealthyCount = services.filter(
		(s) => s.status === "Unhealthy"
	).length;

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold">Health Check</h1>
								<p className="text-lg text-muted-foreground">
									System health and service status monitoring
								</p>
							</div>
							<Button className="bg-gradient-to-r from-green-500 to-green-600 text-white">
								<RefreshCw className="w-4 h-4 mr-2" />
								Run All Checks
							</Button>
						</div>

						{/* Health Summary */}
						<div className="grid md:grid-cols-4 gap-4">
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									Total Services
								</p>
								<p className="text-2xl font-bold">{services.length}</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-green-200 bg-green-50/30">
								<p className="text-sm text-muted-foreground mb-1">Healthy</p>
								<p className="text-2xl font-bold text-green-600">
									{healthyCount}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-yellow-200 bg-yellow-50/30">
								<p className="text-sm text-muted-foreground mb-1">Degraded</p>
								<p className="text-2xl font-bold text-yellow-600">
									{degradedCount}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">
									System Status
								</p>
								<p className="text-lg font-bold text-green-600">
									✓ Operational
								</p>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Services List */}
							<div className="lg:col-span-2 space-y-4">
								{services.map((service) => (
									<div
										key={service.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedService === service.id
												? "border-green-300/50 bg-green-500/5"
												: "border-border/50 hover:border-green-300/50"
										}`}
										onClick={() => setSelectedService(service.id)}>
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-1">
													<Activity className="w-5 h-5 text-green-500" />
													<h3 className="text-lg font-semibold">
														{service.name}
													</h3>
												</div>
												<p className="text-sm text-muted-foreground">
													Last check: {service.lastCheck}
												</p>
											</div>
											<div className="flex items-center gap-2">
												{getStatusIcon(service.status)}
												<span
													className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
														service.status
													)}`}>
													{service.status}
												</span>
											</div>
										</div>

										<div className="grid grid-cols-3 gap-2 py-4 px-4 bg-secondary/30 rounded-lg mb-4 text-sm">
											<div>
												<p className="text-muted-foreground text-xs mb-1">
													Uptime
												</p>
												<p className="font-semibold">{service.uptime}%</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs mb-1">
													Response Time
												</p>
												<p className="font-semibold">
													{service.responseTime}ms
												</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs mb-1">
													Total Checks
												</p>
												<p className="font-semibold">{service.checks}</p>
											</div>
										</div>

										<div className="space-y-2 mb-4">
											<div>
												<div className="flex justify-between items-center mb-1">
													<span className="text-xs text-muted-foreground">
														CPU Usage
													</span>
													<span className="text-xs font-medium">
														{service.cpu}%
													</span>
												</div>
												<div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
													<div
														className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
														style={{
															width: `${service.cpu}%`,
														}}
													/>
												</div>
											</div>

											<div>
												<div className="flex justify-between items-center mb-1">
													<span className="text-xs text-muted-foreground">
														Memory Usage
													</span>
													<span className="text-xs font-medium">
														{service.memory}%
													</span>
												</div>
												<div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
													<div
														className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
														style={{
															width: `${service.memory}%`,
														}}
													/>
												</div>
											</div>
										</div>

										<Button variant="outline" className="w-full">
											View Details
										</Button>
									</div>
								))}
							</div>

							{/* Service Details */}
							{selectedService && (
								<div className="glass-card rounded-xl p-6 border border-border/50 h-fit space-y-6">
									<h3 className="text-lg font-semibold">Service Details</h3>
									{(() => {
										const service = services.find(
											(s) => s.id === selectedService
										);
										return (
											<div className="space-y-4 text-sm">
												<div>
													<p className="text-muted-foreground mb-1">
														Service Name
													</p>
													<p className="font-medium">{service?.name}</p>
												</div>

												<div>
													<p className="text-muted-foreground mb-1">
														Current Status
													</p>
													<p className="font-medium flex items-center gap-2">
														{getStatusIcon(service?.status || "")}
														{service?.status}
													</p>
												</div>

												<div className="border-t border-border/50 pt-4 space-y-2">
													<div className="p-3 bg-secondary/30 rounded">
														<p className="text-xs text-muted-foreground mb-1">
															Uptime
														</p>
														<p className="text-lg font-bold text-green-600">
															{service?.uptime}%
														</p>
													</div>

													<div className="p-3 bg-secondary/30 rounded">
														<p className="text-xs text-muted-foreground mb-1">
															Response Time
														</p>
														<p className="text-lg font-bold">
															{service?.responseTime}
															ms
														</p>
													</div>

													<div className="p-3 bg-secondary/30 rounded">
														<p className="text-xs text-muted-foreground mb-1">
															Total Health Checks
														</p>
														<p className="text-lg font-bold">
															{service?.checks}
														</p>
													</div>
												</div>

												<div className="border-t border-border/50 pt-4 space-y-2">
													<Button className="w-full bg-green-500 text-white hover:bg-green-600">
														Run Check Now
													</Button>
													<Button variant="outline" className="w-full">
														View Logs
													</Button>
													<Button variant="outline" className="w-full">
														Configure Alerts
													</Button>
												</div>
											</div>
										);
									})()}
								</div>
							)}
						</div>

						{/* Health Timeline */}
						<div className="glass-card rounded-xl p-6 border border-border/50">
							<h3 className="text-lg font-semibold mb-6">
								Recent Health Events
							</h3>

							<div className="space-y-3">
								{[
									{
										time: "2:35 PM",
										event: "All services healthy",
										type: "success",
									},
									{
										time: "2:28 PM",
										event: "Message Queue recovery",
										type: "info",
									},
									{
										time: "2:15 PM",
										event: "Message Queue degraded",
										type: "warning",
									},
									{
										time: "1:45 PM",
										event: "Database response time increased",
										type: "warning",
									},
									{
										time: "1:20 PM",
										event: "Full system health check passed",
										type: "success",
									},
								].map((event, idx) => (
									<div
										key={idx}
										className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
										<div className="flex-shrink-0">
											{event.type === "success" ? (
												<CheckCircle className="w-5 h-5 text-green-600" />
											) : event.type === "warning" ? (
												<AlertCircle className="w-5 h-5 text-yellow-600" />
											) : (
												<Clock className="w-5 h-5 text-blue-600" />
											)}
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium">{event.event}</p>
										</div>
										<span className="text-xs text-muted-foreground">
											{event.time}
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

export default HealthCheck;
