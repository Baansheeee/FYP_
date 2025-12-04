/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Download, Copy, Share2, MoreVertical, GitBranch } from "lucide-react";
import { useState } from "react";

const VersionHistory = () => {
	const [versions, setVersions] = useState([
		{
			id: 1,
			version: "v2.1.0",
			created: "2024-12-04 10:30 AM",
			author: "John Doe",
			description: "Added new features and bug fixes",
			components: 12,
			size: "2.4 MB",
			changes: 45,
			isLatest: true,
			status: "Active",
		},
		{
			id: 2,
			version: "v2.0.8",
			created: "2024-12-02 3:15 PM",
			author: "Jane Smith",
			description: "Performance optimizations",
			components: 12,
			size: "2.3 MB",
			changes: 12,
			status: "Previous",
		},
		{
			id: 3,
			version: "v2.0.7",
			created: "2024-11-28 11:45 AM",
			author: "John Doe",
			description: "Security patches",
			components: 12,
			size: "2.3 MB",
			changes: 8,
			status: "Previous",
		},
		{
			id: 4,
			version: "v2.0.6",
			created: "2024-11-25 2:20 PM",
			author: "Mike Johnson",
			description: "Database schema update",
			components: 11,
			size: "2.2 MB",
			changes: 15,
			status: "Previous",
		},
		{
			id: 5,
			version: "v2.0.5",
			created: "2024-11-20 9:00 AM",
			author: "Jane Smith",
			description: "Initial major release",
			components: 11,
			size: "2.1 MB",
			changes: 120,
			status: "Previous",
		},
	]);

	const [selectedVersion, setSelectedVersion] = useState(0);

	const handleDownload = (id: number) => {
		console.log("Downloading version:", id);
	};

	const handleDuplicate = (id: number) => {
		console.log("Duplicating version:", id);
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
							<h1 className="text-4xl font-bold">Version History</h1>
							<p className="text-lg text-muted-foreground">
								Browse and manage architecture versions
							</p>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Versions List */}
							<div className="lg:col-span-2 space-y-4">
								{versions.map((version, index) => (
									<div
										key={version.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedVersion === index
												? "border-purple-300/50 bg-purple-500/5"
												: "border-border/50 hover:border-purple-300/50"
										}`}
										onClick={() => setSelectedVersion(index)}>
										<div className="flex items-start justify-between mb-3">
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-1">
													<GitBranch className="w-5 h-5 text-purple-500" />
													<h3 className="text-lg font-semibold">
														{version.version}
													</h3>
													{version.isLatest && (
														<span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
															Latest
														</span>
													)}
												</div>
												<p className="text-sm text-muted-foreground">
													{version.description}
												</p>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${
													version.status === "Active"
														? "bg-green-100 text-green-700"
														: "bg-gray-100 text-gray-700"
												}`}>
												{version.status}
											</span>
										</div>

										<div className="grid grid-cols-4 gap-2 py-4 px-4 bg-secondary/30 rounded-lg mb-4 text-sm">
											<div>
												<p className="text-muted-foreground text-xs">Created</p>
												<p className="font-semibold text-gray-900">
													{version.created}
												</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">By</p>
												<p className="font-semibold text-gray-900">
													{version.author}
												</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">Changes</p>
												<p className="font-semibold text-gray-900">
													{version.changes}
												</p>
											</div>
											<div>
												<p className="text-muted-foreground text-xs">Size</p>
												<p className="font-semibold text-gray-900">
													{version.size}
												</p>
											</div>
										</div>

										<div className="flex gap-2">
											<Button
												variant="outline"
												className="flex-1"
												onClick={() => console.log("View:", version.id)}>
												View Details
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleDownload(version.id)}>
												<Download className="w-4 h-4" />
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleDuplicate(version.id)}>
												<Copy className="w-4 h-4" />
											</Button>
											<Button variant="outline" size="sm">
												<MoreVertical className="w-4 h-4" />
											</Button>
										</div>
									</div>
								))}
							</div>

							{/* Version Details */}
							<div className="glass-card rounded-xl p-6 border border-border/50 h-fit space-y-6">
								<h3 className="text-lg font-semibold">Version Details</h3>

								{(() => {
									const version = versions[selectedVersion];
									return (
										<div className="space-y-4 text-sm">
											<div>
												<p className="text-muted-foreground mb-1">Version</p>
												<p className="text-xl font-bold text-purple-600">
													{version.version}
												</p>
											</div>

											<div className="border-t border-border/50 pt-4">
												<p className="text-muted-foreground mb-1">
													Description
												</p>
												<p className="text-gray-900">{version.description}</p>
											</div>

											<div>
												<p className="text-muted-foreground mb-1">Created</p>
												<p className="font-medium">{version.created}</p>
											</div>

											<div>
												<p className="text-muted-foreground mb-1">Created By</p>
												<p className="font-medium">{version.author}</p>
											</div>

											<div className="grid grid-cols-2 gap-2">
												<div>
													<p className="text-muted-foreground text-xs mb-1">
														Components
													</p>
													<p className="font-bold">{version.components}</p>
												</div>
												<div>
													<p className="text-muted-foreground text-xs mb-1">
														Changes
													</p>
													<p className="font-bold">{version.changes}</p>
												</div>
											</div>

											<div className="border-t border-border/50 pt-4 space-y-2">
												<Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
													<Download className="w-4 h-4 mr-2" />
													Download
												</Button>
												<Button variant="outline" className="w-full">
													<Copy className="w-4 h-4 mr-2" />
													Duplicate
												</Button>
												<Button variant="outline" className="w-full">
													<Share2 className="w-4 h-4 mr-2" />
													Share
												</Button>
											</div>
										</div>
									);
								})()}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default VersionHistory;
