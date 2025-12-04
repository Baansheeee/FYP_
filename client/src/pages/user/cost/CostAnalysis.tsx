/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingDown, Calendar, Download } from "lucide-react";
import { useState } from "react";

const CostAnalysis = () => {
	const [selectedMonth, setSelectedMonth] = useState("December 2024");
	const [selectedService, setSelectedService] = useState("All");

	const costs = {
		total: 2450,
		change: -8.5,
		forecast: 2380,
		services: [
			{ name: "EC2", cost: 850, percentage: 35, trend: -5 },
			{ name: "RDS", cost: 480, percentage: 20, trend: 2 },
			{ name: "S3", cost: 320, percentage: 13, trend: -2 },
			{ name: "CloudFront", cost: 280, percentage: 11, trend: 4 },
			{ name: "Lambda", cost: 150, percentage: 6, trend: -1 },
			{ name: "Other", cost: 370, percentage: 15, trend: 0 },
		],
		daily: [
			{ date: "Dec 1", amount: 82 },
			{ date: "Dec 2", amount: 75 },
			{ date: "Dec 3", amount: 88 },
			{ date: "Dec 4", amount: 79 },
			{ date: "Dec 5", amount: 91 },
		],
	};

	const filteredServices =
		selectedService === "All"
			? costs.services
			: costs.services.filter((s) => s.name === selectedService);

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
								<h1 className="text-4xl font-bold">Cost Analysis</h1>
								<p className="text-lg text-muted-foreground">
									Detailed breakdown of your AWS spending
								</p>
							</div>
							<Button variant="outline">
								<Download className="w-4 h-4 mr-2" />
								Export Report
							</Button>
						</div>

						{/* Cost Summary Cards */}
						<div className="grid md:grid-cols-3 gap-6">
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<p className="text-muted-foreground text-sm mb-2">
									Total This Month
								</p>
								<p className="text-3xl font-bold">${costs.total}</p>
								<p className="text-sm text-green-600 mt-2">
									<TrendingDown className="w-4 h-4 inline mr-1" />
									{costs.change}% vs last month
								</p>
							</div>

							<div className="glass-card rounded-xl p-6 border border-border/50">
								<p className="text-muted-foreground text-sm mb-2">
									Projected Next Month
								</p>
								<p className="text-3xl font-bold">${costs.forecast}</p>
								<p className="text-sm text-gray-500 mt-2">
									Based on current usage
								</p>
							</div>

							<div className="glass-card rounded-xl p-6 border border-border/50">
								<p className="text-muted-foreground text-sm mb-2">
									Daily Average
								</p>
								<p className="text-3xl font-bold">
									${(costs.total / 30).toFixed(2)}
								</p>
								<p className="text-sm text-gray-500 mt-2">
									Per day average cost
								</p>
							</div>
						</div>

						{/* Filters */}
						<div className="flex gap-4 items-center">
							<div className="flex items-center gap-2">
								<Calendar className="w-5 h-5 text-muted-foreground" />
								<select
									value={selectedMonth}
									onChange={(e) => setSelectedMonth(e.target.value)}
									className="border border-border/50 rounded-lg px-4 py-2 text-sm">
									<option>December 2024</option>
									<option>November 2024</option>
									<option>October 2024</option>
								</select>
							</div>

							<select
								value={selectedService}
								onChange={(e) => setSelectedService(e.target.value)}
								className="border border-border/50 rounded-lg px-4 py-2 text-sm">
								<option value="All">All Services</option>
								{costs.services.map((s) => (
									<option key={s.name} value={s.name}>
										{s.name}
									</option>
								))}
							</select>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Cost Breakdown */}
							<div className="lg:col-span-2 glass-card rounded-xl p-6 border border-border/50 space-y-6">
								<h2 className="text-xl font-semibold flex items-center gap-2">
									<BarChart3 className="w-5 h-5" />
									Service Breakdown
								</h2>

								<div className="space-y-4">
									{filteredServices.map((service) => (
										<div key={service.name}>
											<div className="flex items-center justify-between mb-2">
												<div>
													<p className="font-medium">{service.name}</p>
													<p className="text-sm text-muted-foreground">
														${service.cost}/month
													</p>
												</div>
												<div className="text-right">
													<p className="font-semibold">{service.percentage}%</p>
													<p
														className={`text-sm ${
															service.trend < 0
																? "text-green-600"
																: "text-red-600"
														}`}>
														{service.trend > 0 ? "+" : ""}
														{service.trend}%
													</p>
												</div>
											</div>
											<div className="w-full bg-secondary/30 rounded-full h-2">
												<div
													className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
													style={{
														width: `${service.percentage}%`,
													}}
												/>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Daily Cost Trend */}
							<div className="glass-card rounded-xl p-6 border border-border/50">
								<h3 className="text-lg font-semibold mb-6">Daily Costs</h3>
								<div className="space-y-4">
									{costs.daily.map((day) => (
										<div key={day.date}>
											<div className="flex justify-between mb-1">
												<span className="text-sm font-medium">{day.date}</span>
												<span className="text-sm font-semibold">
													${day.amount}
												</span>
											</div>
											<div className="w-full bg-secondary/30 rounded-full h-1.5">
												<div
													className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full"
													style={{
														width: `${(day.amount / 91) * 100}%`,
													}}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Recommendations */}
						<div className="glass-card rounded-xl p-6 border border-border/50 bg-gradient-to-r from-blue-500/10 to-blue-600/10">
							<h3 className="text-lg font-semibold mb-4">
								💡 Cost Optimization Recommendations
							</h3>
							<ul className="space-y-2 text-sm">
								<li>• Consider Reserved Instances for EC2 to save up to 40%</li>
								<li>
									• Enable S3 Intelligent-Tiering for better storage management
								</li>
								<li>• Review unused resources and terminate idle instances</li>
							</ul>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default CostAnalysis;
