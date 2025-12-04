/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
	BarChart,
	TrendingUp,
	TrendingDown,
	Download,
	RefreshCw,
	Calendar,
} from "lucide-react";
import { useState } from "react";

const MetricsViewer = () => {
	const [metrics, setMetrics] = useState([
		{
			id: 1,
			name: "CPU Usage",
			value: 62,
			unit: "%",
			trend: "up",
			change: "+5%",
			color: "from-red-500 to-orange-500",
			icon: "cpu",
		},
		{
			id: 2,
			name: "Memory Usage",
			value: 78,
			unit: "%",
			trend: "up",
			change: "+8%",
			color: "from-blue-500 to-purple-500",
			icon: "memory",
		},
		{
			id: 3,
			name: "Network I/O",
			value: 245,
			unit: "Mbps",
			trend: "down",
			change: "-12%",
			color: "from-green-500 to-teal-500",
			icon: "network",
		},
		{
			id: 4,
			name: "Disk I/O",
			value: 89,
			unit: "MB/s",
			trend: "up",
			change: "+3%",
			color: "from-yellow-500 to-orange-500",
			icon: "disk",
		},
		{
			id: 5,
			name: "Request Latency",
			value: 142,
			unit: "ms",
			trend: "down",
			change: "-15%",
			color: "from-indigo-500 to-purple-500",
			icon: "latency",
		},
		{
			id: 6,
			name: "Error Rate",
			value: 0.8,
			unit: "%",
			trend: "down",
			change: "-0.2%",
			color: "from-pink-500 to-rose-500",
			icon: "error",
		},
	]);

	const [timeRange, setTimeRange] = useState("24h");

	const getTrendIcon = (trend: string) => {
		if (trend === "up") {
			return <TrendingUp className="w-4 h-4 text-red-600" />;
		} else {
			return <TrendingDown className="w-4 h-4 text-green-600" />;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-indigo-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold">Metrics Viewer</h1>
								<p className="text-lg text-muted-foreground">
									Real-time performance metrics and analytics
								</p>
							</div>
							<div className="flex gap-2">
								<select
									className="px-4 py-2 rounded-lg border border-border/50 bg-background text-sm"
									value={timeRange}
									onChange={(e) => setTimeRange(e.target.value)}>
									<option value="1h">Last 1 Hour</option>
									<option value="6h">Last 6 Hours</option>
									<option value="24h">Last 24 Hours</option>
									<option value="7d">Last 7 Days</option>
									<option value="30d">Last 30 Days</option>
								</select>
								<Button variant="outline">
									<RefreshCw className="w-4 h-4 mr-2" />
									Refresh
								</Button>
								<Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
									<Download className="w-4 h-4 mr-2" />
									Export
								</Button>
							</div>
						</div>

						{/* Key Metrics Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{metrics.map((metric) => (
								<div
									key={metric.id}
									className="glass-card rounded-xl p-6 border border-border/50 space-y-4 hover:border-indigo-300/50 transition-all">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-medium text-muted-foreground">
											{metric.name}
										</h3>
										<div className="flex items-center gap-1">
											{getTrendIcon(metric.trend)}
											<span
												className={`text-xs font-semibold ${
													metric.trend === "down"
														? "text-green-600"
														: "text-red-600"
												}`}>
												{metric.change}
											</span>
										</div>
									</div>

									<div className="space-y-2">
										<div className="flex items-baseline gap-1">
											<span className="text-3xl font-bold">{metric.value}</span>
											<span className="text-lg text-muted-foreground">
												{metric.unit}
											</span>
										</div>

										<div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden">
											<div
												className={`h-full bg-gradient-to-r ${metric.color}`}
												style={{
													width: `${Math.min(metric.value, 100)}%`,
												}}
											/>
										</div>
									</div>

									<Button variant="outline" className="w-full text-xs">
										View Details
									</Button>
								</div>
							))}
						</div>

						{/* Charts Section */}
						<div className="grid lg:grid-cols-2 gap-6">
							{/* CPU and Memory Chart */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-lg font-semibold">CPU & Memory Usage</h3>
									<Calendar className="w-4 h-4 text-muted-foreground" />
								</div>

								<div className="space-y-6">
									<div>
										<div className="flex items-center justify-between mb-2">
											<span className="text-sm font-medium">CPU</span>
											<span className="text-sm text-muted-foreground">62%</span>
										</div>
										<div className="w-full h-8 bg-secondary/30 rounded-lg overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg"
												style={{
													width: "62%",
												}}
											/>
										</div>
									</div>

									<div>
										<div className="flex items-center justify-between mb-2">
											<span className="text-sm font-medium">Memory</span>
											<span className="text-sm text-muted-foreground">78%</span>
										</div>
										<div className="w-full h-8 bg-secondary/30 rounded-lg overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg"
												style={{
													width: "78%",
												}}
											/>
										</div>
									</div>

									<div>
										<div className="flex items-center justify-between mb-2">
											<span className="text-sm font-medium">Network</span>
											<span className="text-sm text-muted-foreground">
												245 Mbps
											</span>
										</div>
										<div className="w-full h-8 bg-secondary/30 rounded-lg overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-lg"
												style={{
													width: "65%",
												}}
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Request Performance */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-lg font-semibold">Request Performance</h3>
									<BarChart className="w-4 h-4 text-muted-foreground" />
								</div>

								<div className="space-y-4">
									<div className="p-4 bg-secondary/30 rounded-lg">
										<p className="text-xs text-muted-foreground mb-1">
											Avg Latency
										</p>
										<p className="text-2xl font-bold">142ms</p>
										<p className="text-xs text-green-600 mt-1">
											↓ 15% from last hour
										</p>
									</div>

									<div className="grid grid-cols-2 gap-2">
										<div className="p-3 bg-secondary/30 rounded-lg">
											<p className="text-xs text-muted-foreground mb-1">P95</p>
											<p className="text-lg font-bold">256ms</p>
										</div>
										<div className="p-3 bg-secondary/30 rounded-lg">
											<p className="text-xs text-muted-foreground mb-1">P99</p>
											<p className="text-lg font-bold">512ms</p>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-2">
										<div className="p-3 bg-secondary/30 rounded-lg">
											<p className="text-xs text-muted-foreground mb-1">
												Success Rate
											</p>
											<p className="text-lg font-bold text-green-600">99.2%</p>
										</div>
										<div className="p-3 bg-secondary/30 rounded-lg">
											<p className="text-xs text-muted-foreground mb-1">
												Error Rate
											</p>
											<p className="text-lg font-bold text-red-600">0.8%</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Detailed Metrics Table */}
						<div className="glass-card rounded-xl border border-border/50 overflow-hidden">
							<div className="bg-secondary/30 p-4">
								<h3 className="font-semibold">Detailed Metrics</h3>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead className="border-b border-border/50">
										<tr className="text-muted-foreground text-xs">
											<th className="px-6 py-3 text-left font-medium">
												Metric
											</th>
											<th className="px-6 py-3 text-left font-medium">
												Current
											</th>
											<th className="px-6 py-3 text-left font-medium">
												Average
											</th>
											<th className="px-6 py-3 text-left font-medium">Peak</th>
											<th className="px-6 py-3 text-left font-medium">
												Status
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border/50">
										{metrics.map((metric) => (
											<tr
												key={metric.id}
												className="hover:bg-secondary/20 transition-colors">
												<td className="px-6 py-3 font-medium">{metric.name}</td>
												<td className="px-6 py-3">
													{metric.value}
													{metric.unit}
												</td>
												<td className="px-6 py-3">
													{(metric.value * 0.85).toFixed(1)}
													{metric.unit}
												</td>
												<td className="px-6 py-3">
													{(metric.value * 1.15).toFixed(1)}
													{metric.unit}
												</td>
												<td className="px-6 py-3">
													<span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
														Healthy
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default MetricsViewer;
