/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, CheckCircle, RotateCcw } from "lucide-react";
import { useState } from "react";

const VersionRestore = () => {
	const [restorationInProgress, setRestorationInProgress] = useState(false);
	const [restoredVersion, setRestoredVersion] = useState<string | null>(null);

	const backups = [
		{
			id: 1,
			version: "v2.1.0",
			timestamp: "2024-12-04 10:30 AM",
			status: "Current",
			size: "2.4 MB",
			components: 12,
			description: "Latest version",
			automatic: false,
		},
		{
			id: 2,
			version: "v2.0.8",
			timestamp: "2024-12-02 3:15 PM",
			status: "Available",
			size: "2.3 MB",
			components: 12,
			description: "Previous stable release",
			automatic: true,
		},
		{
			id: 3,
			version: "v2.0.7",
			timestamp: "2024-11-28 11:45 AM",
			status: "Available",
			size: "2.3 MB",
			components: 12,
			description: "Security patch release",
			automatic: true,
		},
		{
			id: 4,
			version: "v2.0.6",
			timestamp: "2024-11-25 2:20 PM",
			status: "Available",
			size: "2.2 MB",
			components: 11,
			description: "Database schema update",
			automatic: true,
		},
		{
			id: 5,
			version: "v2.0.5",
			timestamp: "2024-11-20 9:00 AM",
			status: "Available",
			size: "2.1 MB",
			components: 11,
			description: "Initial major release",
			automatic: true,
		},
	];

	const handleRestore = async (version: string) => {
		setRestorationInProgress(true);
		// Simulate restoration process
		setTimeout(() => {
			setRestoredVersion(version);
			setRestorationInProgress(false);
		}, 3000);
	};

	const getStatusIcon = (status: string) => {
		if (status === "Current") {
			return <CheckCircle className="w-5 h-5 text-green-600" />;
		}
		return <RotateCcw className="w-5 h-5 text-gray-400" />;
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
							<h1 className="text-4xl font-bold">Version Restore</h1>
							<p className="text-lg text-muted-foreground">
								Restore your architecture to a previous version
							</p>
						</div>

						{/* Warning Banner */}
						<div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex gap-3">
							<AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
							<div>
								<p className="font-semibold text-orange-900 mb-1">
									⚠️ Restoring will replace your current version
								</p>
								<p className="text-sm text-orange-700">
									The current version (v2.1.0) will be backed up before
									restoration. Make sure you want to proceed.
								</p>
							</div>
						</div>

						{/* Success Message */}
						{restoredVersion && (
							<div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
								<CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
								<div>
									<p className="font-semibold text-green-900">
										✓ Successfully restored to {restoredVersion}
									</p>
									<p className="text-sm text-green-700">
										Your architecture has been restored to the selected version.
										Your previous version has been backed up.
									</p>
								</div>
							</div>
						)}

						{/* Backup Timeline */}
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold">Available Backups</h2>

							{backups.map((backup, index) => (
								<div
									key={backup.id}
									className={`glass-card rounded-xl p-6 border transition-all ${
										backup.status === "Current"
											? "border-green-300/50 bg-green-50/30"
											: "border-border/50 hover:border-purple-300/50"
									}`}>
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-start gap-4 flex-1">
											{getStatusIcon(backup.status)}
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-1">
													<h3 className="text-lg font-semibold">
														{backup.version}
													</h3>
													<span
														className={`px-3 py-1 rounded-full text-sm font-medium ${
															backup.status === "Current"
																? "bg-green-100 text-green-700"
																: "bg-gray-100 text-gray-700"
														}`}>
														{backup.status}
													</span>
													{backup.automatic && (
														<span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
															Automatic
														</span>
													)}
												</div>
												<p className="text-muted-foreground text-sm">
													{backup.description}
												</p>
											</div>
										</div>
									</div>

									<div className="grid grid-cols-4 gap-2 py-4 px-4 bg-secondary/30 rounded-lg mb-4 text-sm">
										<div>
											<p className="text-muted-foreground text-xs">Timestamp</p>
											<p className="font-semibold">{backup.timestamp}</p>
										</div>
										<div>
											<p className="text-muted-foreground text-xs">Size</p>
											<p className="font-semibold">{backup.size}</p>
										</div>
										<div>
											<p className="text-muted-foreground text-xs">
												Components
											</p>
											<p className="font-semibold">{backup.components}</p>
										</div>
										<div>
											<p className="text-muted-foreground text-xs">Status</p>
											<p className="font-semibold">{backup.status}</p>
										</div>
									</div>

									{backup.status !== "Current" && (
										<div className="flex gap-2">
											<Button
												onClick={() => handleRestore(backup.version)}
												disabled={restorationInProgress}
												className="flex-1 bg-orange-500 text-white hover:bg-orange-600">
												{restorationInProgress ? (
													<>
														<Clock className="w-4 h-4 mr-2 animate-spin" />
														Restoring...
													</>
												) : (
													<>
														<RotateCcw className="w-4 h-4 mr-2" />
														Restore to {backup.version}
													</>
												)}
											</Button>
											<Button
												variant="outline"
												onClick={() => console.log("Preview:", backup.id)}>
												Preview
											</Button>
										</div>
									)}
								</div>
							))}
						</div>

						{/* Restoration Details */}
						<div className="glass-card rounded-xl p-6 border border-border/50">
							<h3 className="text-lg font-semibold mb-4">
								Restoration Details
							</h3>
							<div className="grid md:grid-cols-2 gap-6 text-sm">
								<div>
									<p className="text-muted-foreground mb-2">
										Estimated Duration
									</p>
									<p className="font-semibold text-gray-900">5-15 minutes</p>
								</div>
								<div>
									<p className="text-muted-foreground mb-2">Downtime</p>
									<p className="font-semibold text-gray-900">~2-3 minutes</p>
								</div>
								<div>
									<p className="text-muted-foreground mb-2">Current Backup</p>
									<p className="font-semibold text-gray-900">
										Automatic backup before restoration
									</p>
								</div>
								<div>
									<p className="text-muted-foreground mb-2">
										Rollback Possible
									</p>
									<p className="font-semibold text-green-600">
										Yes, within 24 hours
									</p>
								</div>
							</div>
						</div>

						{/* Restoration History */}
						<div className="glass-card rounded-xl p-6 border border-border/50">
							<h3 className="text-lg font-semibold mb-4">
								Recent Restorations
							</h3>
							<div className="space-y-3">
								<div className="p-3 bg-secondary/30 rounded-lg text-sm">
									<p className="font-medium">Restored to v2.0.5</p>
									<p className="text-muted-foreground">
										2024-11-15 10:30 AM • By John Doe
									</p>
								</div>
								<div className="p-3 bg-secondary/30 rounded-lg text-sm">
									<p className="font-medium">Restored to v2.0.3</p>
									<p className="text-muted-foreground">
										2024-10-28 2:15 PM • By Jane Smith
									</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default VersionRestore;
