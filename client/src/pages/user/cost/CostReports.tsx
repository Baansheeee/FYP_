/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2, Eye } from "lucide-react";
import { useState } from "react";

const CostReports = () => {
	const [reports, setReports] = useState([
		{
			id: 1,
			title: "November 2024 Cost Report",
			month: "November 2024",
			totalCost: 2650,
			generated: "2024-12-01",
			size: "2.3 MB",
			status: "Completed",
		},
		{
			id: 2,
			title: "October 2024 Cost Report",
			month: "October 2024",
			totalCost: 2890,
			generated: "2024-11-01",
			size: "2.1 MB",
			status: "Completed",
		},
		{
			id: 3,
			title: "September 2024 Cost Report",
			month: "September 2024",
			totalCost: 2450,
			generated: "2024-10-01",
			size: "2.0 MB",
			status: "Completed",
		},
		{
			id: 4,
			title: "Quarterly Report Q3 2024",
			month: "Q3 2024",
			totalCost: 7235,
			generated: "2024-10-05",
			size: "4.5 MB",
			status: "Completed",
		},
		{
			id: 5,
			title: "Annual Report 2023",
			month: "Full Year 2023",
			totalCost: 28450,
			generated: "2024-01-15",
			size: "8.2 MB",
			status: "Completed",
		},
	]);

	const [selectedReport, setSelectedReport] = useState<number | null>(null);

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
								<h1 className="text-4xl font-bold">Cost Reports</h1>
								<p className="text-lg text-muted-foreground">
									View and download historical cost reports
								</p>
							</div>
							<Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
								Generate Custom Report
							</Button>
						</div>

						<div className="grid lg:grid-cols-3 gap-8">
							{/* Reports List */}
							<div className="lg:col-span-2 space-y-4">
								{reports.map((report) => (
									<div
										key={report.id}
										className={`glass-card rounded-xl p-6 border transition-all cursor-pointer ${
											selectedReport === report.id
												? "border-purple-300/50 bg-purple-500/5"
												: "border-border/50 hover:border-purple-300/50"
										}`}
										onClick={() => setSelectedReport(report.id)}>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-3">
													<FileText className="w-5 h-5 text-purple-500" />
													<div>
														<h3 className="text-lg font-semibold">
															{report.title}
														</h3>
														<p className="text-sm text-muted-foreground">
															{report.month}
														</p>
													</div>
												</div>

												<div className="grid grid-cols-3 gap-4 mt-4">
													<div>
														<p className="text-xs text-muted-foreground">
															Total Cost
														</p>
														<p className="text-lg font-semibold">
															${report.totalCost}
														</p>
													</div>
													<div>
														<p className="text-xs text-muted-foreground">
															File Size
														</p>
														<p className="text-lg font-semibold">
															{report.size}
														</p>
													</div>
													<div>
														<p className="text-xs text-muted-foreground">
															Generated
														</p>
														<p className="text-lg font-semibold">
															{report.generated}
														</p>
													</div>
												</div>
											</div>

											<div className="flex gap-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => {
														e.stopPropagation();
														console.log("View:", report.id);
													}}>
													<Eye className="w-4 h-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => {
														e.stopPropagation();
														console.log("Download:", report.id);
													}}>
													<Download className="w-4 h-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => {
														e.stopPropagation();
														console.log("Share:", report.id);
													}}>
													<Share2 className="w-4 h-4" />
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Report Details */}
							<div className="glass-card rounded-xl p-6 border border-border/50 h-fit">
								<h3 className="text-lg font-semibold mb-6">Report Details</h3>

								{selectedReport ? (
									<div className="space-y-6">
										{(() => {
											const report = reports.find(
												(r) => r.id === selectedReport
											);
											return (
												<>
													<div>
														<p className="text-sm text-muted-foreground mb-1">
															Report Name
														</p>
														<p className="font-medium text-gray-900">
															{report?.title}
														</p>
													</div>

													<div>
														<p className="text-sm text-muted-foreground mb-1">
															Period
														</p>
														<p className="font-medium text-gray-900">
															{report?.month}
														</p>
													</div>

													<div>
														<p className="text-sm text-muted-foreground mb-1">
															Total Cost
														</p>
														<p className="text-2xl font-bold text-purple-600">
															${report?.totalCost}
														</p>
													</div>

													<div className="border-t border-border/50 pt-4">
														<p className="text-sm text-muted-foreground mb-1">
															Status
														</p>
														<p className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
															{report?.status}
														</p>
													</div>

													<div>
														<p className="text-sm text-muted-foreground mb-2">
															Quick Stats
														</p>
														<div className="space-y-2 text-sm">
															<div className="flex justify-between">
																<span>Daily Average:</span>
																<span className="font-medium">
																	${((report?.totalCost || 0) / 30).toFixed(2)}
																</span>
															</div>
															<div className="flex justify-between">
																<span>File Size:</span>
																<span className="font-medium">
																	{report?.size}
																</span>
															</div>
														</div>
													</div>

													<div className="space-y-2 pt-4 border-t border-border/50">
														<Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
															<Download className="w-4 h-4 mr-2" />
															Download PDF
														</Button>
														<Button variant="outline" className="w-full">
															<Share2 className="w-4 h-4 mr-2" />
															Share Report
														</Button>
													</div>
												</>
											);
										})()}
									</div>
								) : (
									<div className="text-center text-muted-foreground py-8">
										<p>Select a report to view details</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default CostReports;
