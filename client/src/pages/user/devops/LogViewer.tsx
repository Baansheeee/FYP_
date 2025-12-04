/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Square,
	Download,
	RefreshCw,
	Trash2,
	Filter,
	Copy,
	Clock,
	AlertCircle,
	CheckCircle,
} from "lucide-react";
import { useState } from "react";

const LogViewer = () => {
	const [logs, setLogs] = useState([
		{
			id: 1,
			timestamp: "2024-01-15 14:23:45",
			service: "api-server",
			level: "INFO",
			message: "Server started on port 8080",
		},
		{
			id: 2,
			timestamp: "2024-01-15 14:23:46",
			service: "api-server",
			level: "INFO",
			message: "Connected to database",
		},
		{
			id: 3,
			timestamp: "2024-01-15 14:25:12",
			service: "web-frontend",
			level: "INFO",
			message: "Asset compilation completed",
		},
		{
			id: 4,
			timestamp: "2024-01-15 14:26:03",
			service: "api-server",
			level: "WARNING",
			message: "High memory usage detected: 78%",
		},
		{
			id: 5,
			timestamp: "2024-01-15 14:27:15",
			service: "background-worker",
			level: "INFO",
			message: "Processing queue: 45 jobs",
		},
		{
			id: 6,
			timestamp: "2024-01-15 14:28:22",
			service: "api-server",
			level: "ERROR",
			message: "Database connection timeout after 30s",
		},
		{
			id: 7,
			timestamp: "2024-01-15 14:28:23",
			service: "api-server",
			level: "INFO",
			message: "Retrying database connection...",
		},
		{
			id: 8,
			timestamp: "2024-01-15 14:28:45",
			service: "api-server",
			level: "INFO",
			message: "Database connection restored",
		},
		{
			id: 9,
			timestamp: "2024-01-15 14:30:01",
			service: "cache-redis",
			level: "INFO",
			message: "Cache evicted 125 keys",
		},
		{
			id: 10,
			timestamp: "2024-01-15 14:31:30",
			service: "web-frontend",
			level: "WARNING",
			message: "Build warning: unused import detected",
		},
	]);

	const [filteredLogs, setFilteredLogs] = useState(logs);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedLevel, setSelectedLevel] = useState("All");
	const [selectedService, setSelectedService] = useState("All");

	const getLevelColor = (level: string) => {
		switch (level) {
			case "INFO":
				return "bg-blue-100 text-blue-700";
			case "WARNING":
				return "bg-yellow-100 text-yellow-700";
			case "ERROR":
				return "bg-red-100 text-red-700";
			case "DEBUG":
				return "bg-purple-100 text-purple-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getLevelIcon = (level: string) => {
		switch (level) {
			case "INFO":
				return <CheckCircle className="w-4 h-4 text-blue-600" />;
			case "WARNING":
				return <AlertCircle className="w-4 h-4 text-yellow-600" />;
			case "ERROR":
				return <AlertCircle className="w-4 h-4 text-red-600" />;
			default:
				return null;
		}
	};

	const uniqueServices = ["All", ...new Set(logs.map((l) => l.service))];
	const uniqueLevels = ["All", ...new Set(logs.map((l) => l.level))];

	const handleFilter = () => {
		let filtered = logs;

		if (selectedLevel !== "All") {
			filtered = filtered.filter((log) => log.level === selectedLevel);
		}

		if (selectedService !== "All") {
			filtered = filtered.filter((log) => log.service === selectedService);
		}

		if (searchTerm) {
			filtered = filtered.filter((log) =>
				log.message.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredLogs(filtered);
	};

	const handleSearch = (value: string) => {
		setSearchTerm(value);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-orange-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<h1 className="text-4xl font-bold">Log Viewer</h1>
								<p className="text-lg text-muted-foreground">
									Real-time application and deployment logs
								</p>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" onClick={() => handleFilter()}>
									<RefreshCw className="w-4 h-4 mr-2" />
									Refresh
								</Button>
								<Button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
									<Download className="w-4 h-4 mr-2" />
									Export
								</Button>
							</div>
						</div>

						{/* Summary Stats */}
						<div className="grid md:grid-cols-4 gap-4">
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">Total Logs</p>
								<p className="text-2xl font-bold">{filteredLogs.length}</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-red-200 bg-red-50/30">
								<p className="text-sm text-muted-foreground mb-1">Errors</p>
								<p className="text-2xl font-bold text-red-600">
									{filteredLogs.filter((l) => l.level === "ERROR").length}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-yellow-200 bg-yellow-50/30">
								<p className="text-sm text-muted-foreground mb-1">Warnings</p>
								<p className="text-2xl font-bold text-yellow-600">
									{filteredLogs.filter((l) => l.level === "WARNING").length}
								</p>
							</div>
							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-1">Services</p>
								<p className="text-2xl font-bold">
									{uniqueServices.length - 1}
								</p>
							</div>
						</div>

						{/* Filters */}
						<div className="glass-card rounded-xl p-6 border border-border/50 space-y-4">
							<div className="flex items-center gap-2 mb-4">
								<Filter className="w-5 h-5 text-muted-foreground" />
								<h3 className="text-lg font-semibold">Filters</h3>
							</div>

							<div className="grid md:grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">
										Search Logs
									</label>
									<Input
										placeholder="Search message..."
										value={searchTerm}
										onChange={(e) => handleSearch(e.target.value)}
										className="border border-border/50"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Log Level
									</label>
									<select
										className="w-full px-3 py-2 rounded-md border border-border/50 bg-background text-sm"
										value={selectedLevel}
										onChange={(e) => {
											setSelectedLevel(e.target.value);
											handleFilter();
										}}>
										{uniqueLevels.map((level) => (
											<option key={level} value={level}>
												{level}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Service
									</label>
									<select
										className="w-full px-3 py-2 rounded-md border border-border/50 bg-background text-sm"
										value={selectedService}
										onChange={(e) => {
											setSelectedService(e.target.value);
											handleFilter();
										}}>
										{uniqueServices.map((service) => (
											<option key={service} value={service}>
												{service}
											</option>
										))}
									</select>
								</div>
							</div>

							<Button
								className="w-full bg-orange-500 text-white hover:bg-orange-600"
								onClick={handleFilter}>
								Apply Filters
							</Button>
						</div>

						{/* Logs Display */}
						<div className="glass-card rounded-xl border border-border/50 overflow-hidden">
							<div className="bg-secondary/30 p-4 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Square className="w-5 h-5 text-muted-foreground" />
									<h3 className="font-semibold">Application Logs</h3>
								</div>
								<span className="text-sm text-muted-foreground">
									Showing {filteredLogs.length} logs
								</span>
							</div>

							<div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto">
								{filteredLogs.length > 0 ? (
									filteredLogs.map((log) => (
										<div
											key={log.id}
											className="p-4 hover:bg-secondary/30 transition-colors group">
											<div className="flex items-start justify-between mb-2">
												<div className="flex items-center gap-3 flex-1">
													{getLevelIcon(log.level)}
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<span className="text-xs font-mono text-muted-foreground">
																{log.timestamp}
															</span>
															<span className="text-xs font-mono px-2 py-1 bg-secondary/50 rounded text-muted-foreground">
																{log.service}
															</span>
															<span
																className={`text-xs font-medium px-2 py-1 rounded ${getLevelColor(
																	log.level
																)}`}>
																{log.level}
															</span>
														</div>
														<p className="text-sm">{log.message}</p>
													</div>
												</div>
												<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
													<Button variant="ghost" size="sm">
														<Copy className="w-4 h-4" />
													</Button>
												</div>
											</div>
										</div>
									))
								) : (
									<div className="p-8 text-center text-muted-foreground">
										No logs found matching your filters
									</div>
								)}
							</div>
						</div>

						{/* Log Statistics */}
						<div className="grid md:grid-cols-3 gap-4">
							<div className="glass-card rounded-xl p-4 border border-blue-200 bg-blue-50/30">
								<p className="text-sm text-muted-foreground mb-2">Latest Log</p>
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4 text-blue-600" />
									<p className="font-mono text-sm">
										{logs[logs.length - 1]?.timestamp}
									</p>
								</div>
							</div>

							<div className="glass-card rounded-xl p-4 border border-red-200 bg-red-50/30">
								<p className="text-sm text-muted-foreground mb-2">Error Rate</p>
								<p className="text-2xl font-bold text-red-600">
									{(
										(logs.filter((l) => l.level === "ERROR").length /
											logs.length) *
										100
									).toFixed(1)}
									%
								</p>
							</div>

							<div className="glass-card rounded-xl p-4 border border-border/50">
								<p className="text-sm text-muted-foreground mb-2">
									Last Refresh
								</p>
								<p className="text-sm font-medium">Just now</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default LogViewer;
