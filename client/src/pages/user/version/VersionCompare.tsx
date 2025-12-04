/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Check, X } from "lucide-react";
import { useState } from "react";

const VersionCompare = () => {
	const [versionA, setVersionA] = useState("v2.1.0");
	const [versionB, setVersionB] = useState("v2.0.8");

	const versions = ["v2.1.0", "v2.0.8", "v2.0.7", "v2.0.6", "v2.0.5"];

	const changes = [
		{
			type: "added",
			component: "CloudFront",
			details: "Added CDN layer for static content",
		},
		{
			type: "added",
			component: "WAF Rules",
			details: "Enhanced security with WAF policies",
		},
		{
			type: "modified",
			component: "EC2 Configuration",
			details: "Updated instance types to t3.large",
		},
		{
			type: "modified",
			component: "RDS Setup",
			details: "Increased storage to 500GB",
		},
		{
			type: "removed",
			component: "Legacy S3 Bucket",
			details: "Deprecated old storage mechanism",
		},
		{
			type: "modified",
			component: "Lambda Functions",
			details: "Updated runtime to Node.js 18",
		},
	];

	const getChangeIcon = (type: string) => {
		switch (type) {
			case "added":
				return <Plus className="w-5 h-5 text-green-600" />;
			case "removed":
				return <Minus className="w-5 h-5 text-red-600" />;
			case "modified":
				return <Check className="w-5 h-5 text-blue-600" />;
			default:
				return null;
		}
	};

	const getChangeColor = (type: string) => {
		switch (type) {
			case "added":
				return "bg-green-50 border-green-200";
			case "removed":
				return "bg-red-50 border-red-200";
			case "modified":
				return "bg-blue-50 border-blue-200";
			default:
				return "bg-gray-50 border-gray-200";
		}
	};

	const stats = {
		added: changes.filter((c) => c.type === "added").length,
		removed: changes.filter((c) => c.type === "removed").length,
		modified: changes.filter((c) => c.type === "modified").length,
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
							<h1 className="text-4xl font-bold">Version Comparison</h1>
							<p className="text-lg text-muted-foreground">
								Compare differences between architecture versions
							</p>
						</div>

						{/* Comparison Selectors */}
						<div className="glass-card rounded-xl p-6 border border-border/50">
							<div className="grid md:grid-cols-5 gap-4 items-end">
								<div>
									<label className="text-sm font-medium block mb-2">
										Version A
									</label>
									<select
										value={versionA}
										onChange={(e) => setVersionA(e.target.value)}
										className="w-full border border-border/50 rounded-lg px-4 py-2 text-sm">
										{versions.map((v) => (
											<option key={v} value={v}>
												{v}
											</option>
										))}
									</select>
								</div>

								<div className="text-center text-muted-foreground">vs</div>

								<div>
									<label className="text-sm font-medium block mb-2">
										Version B
									</label>
									<select
										value={versionB}
										onChange={(e) => setVersionB(e.target.value)}
										className="w-full border border-border/50 rounded-lg px-4 py-2 text-sm">
										{versions.map((v) => (
											<option key={v} value={v}>
												{v}
											</option>
										))}
									</select>
								</div>

								<div></div>

								<Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white w-full">
									Compare
								</Button>
							</div>
						</div>

						{/* Summary Stats */}
						<div className="grid md:grid-cols-3 gap-4">
							<div className="glass-card rounded-xl p-4 border border-green-200 bg-green-50">
								<p className="text-sm text-muted-foreground mb-1">
									Components Added
								</p>
								<p className="text-3xl font-bold text-green-600">
									{stats.added}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-blue-200 bg-blue-50">
								<p className="text-sm text-muted-foreground mb-1">
									Components Modified
								</p>
								<p className="text-3xl font-bold text-blue-600">
									{stats.modified}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-red-200 bg-red-50">
								<p className="text-sm text-muted-foreground mb-1">
									Components Removed
								</p>
								<p className="text-3xl font-bold text-red-600">
									{stats.removed}
								</p>
							</div>
						</div>

						{/* Changes List */}
						<div>
							<h2 className="text-2xl font-semibold mb-4">Changes Detail</h2>
							<div className="space-y-3">
								{changes.map((change, index) => (
									<div
										key={index}
										className={`glass-card rounded-xl p-6 border-l-4 border ${getChangeColor(
											change.type
										)}`}>
										<div className="flex items-start gap-4">
											{getChangeIcon(change.type)}
											<div className="flex-1">
												<div className="flex items-center justify-between mb-1">
													<h3 className="text-lg font-semibold">
														{change.component}
													</h3>
													<span
														className={`px-3 py-1 rounded-full text-sm font-medium ${
															change.type === "added"
																? "bg-green-100 text-green-700"
																: change.type === "removed"
																? "bg-red-100 text-red-700"
																: "bg-blue-100 text-blue-700"
														}`}>
														{change.type.charAt(0).toUpperCase() +
															change.type.slice(1)}
													</span>
												</div>
												<p className="text-muted-foreground text-sm">
													{change.details}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Version Metadata Table */}
						<div className="glass-card rounded-xl border border-border/50 overflow-hidden">
							<table className="w-full">
								<thead>
									<tr className="border-b border-border/50 bg-secondary/30">
										<th className="px-6 py-4 text-left text-sm font-semibold">
											Property
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold">
											{versionA}
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold">
											{versionB}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-border/50 hover:bg-secondary/20">
										<td className="px-6 py-4 font-medium">Created</td>
										<td className="px-6 py-4 text-muted-foreground">
											2024-12-04
										</td>
										<td className="px-6 py-4 text-muted-foreground">
											2024-12-02
										</td>
									</tr>
									<tr className="border-b border-border/50 hover:bg-secondary/20">
										<td className="px-6 py-4 font-medium">Author</td>
										<td className="px-6 py-4 text-muted-foreground">
											John Doe
										</td>
										<td className="px-6 py-4 text-muted-foreground">
											Jane Smith
										</td>
									</tr>
									<tr className="border-b border-border/50 hover:bg-secondary/20">
										<td className="px-6 py-4 font-medium">Components</td>
										<td className="px-6 py-4 text-muted-foreground">12</td>
										<td className="px-6 py-4 text-muted-foreground">12</td>
									</tr>
									<tr className="border-b border-border/50 hover:bg-secondary/20">
										<td className="px-6 py-4 font-medium">File Size</td>
										<td className="px-6 py-4 text-muted-foreground">2.4 MB</td>
										<td className="px-6 py-4 text-muted-foreground">2.3 MB</td>
									</tr>
									<tr className="hover:bg-secondary/20">
										<td className="px-6 py-4 font-medium">Total Changes</td>
										<td className="px-6 py-4 text-muted-foreground">45</td>
										<td className="px-6 py-4 text-muted-foreground">12</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* Actions */}
						<div className="flex gap-2">
							<Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
								Export Comparison
							</Button>
							<Button variant="outline">Share Report</Button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default VersionCompare;
