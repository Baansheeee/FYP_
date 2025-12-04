/**
 * @format
 */

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axiosInstance, { getFileUrl } from "@/api/axios";
import { GraduationCap, FileText, Eye, Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Lecture {
	_id: string;
	title: string;
	description: string;
	fileUrl: string;
	fileName: string;
	fileType: string;
	duration: number;
	createdAt: string;
}

const EducationDocs = () => {
	const [lectures, setLectures] = useState<Lecture[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchLectures();
	}, []);

	const fetchLectures = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/lectures");
			if (response.data.success) {
				setLectures(response.data.lectures || []);
			}
		} catch (err: any) {
			console.error("Error fetching lectures:", err);
			toast.error("Failed to fetch lectures");
		} finally {
			setLoading(false);
		}
	};

	const docsLectures = lectures.filter((l) =>
		[
			"application/pdf",
			"application/msword",
			"text/plain",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/vnd.ms-powerpoint",
			"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		].includes(l.fileType)
	);

	const getFileIcon = (fileType: string) => {
		if (fileType.includes("pdf")) return "📄 PDF";
		if (fileType.includes("word") || fileType.includes("document"))
			return "📝 Document";
		if (fileType.includes("powerpoint") || fileType.includes("presentation"))
			return "📊 Presentation";
		if (fileType.includes("text")) return "📃 Text";
		return "📁 File";
	};

	const openFile = (fileUrl: string) => {
		window.open(fileUrl, "_blank");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />
				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center gap-3 animate-fade-in">
							<div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
								<GraduationCap className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-3xl font-bold">Documentation</h1>
								<p className="text-muted-foreground">
									Comprehensive guides and reference materials
								</p>
							</div>
						</div>

						<Card className="glass-card border-border/50">
							<CardHeader>
								<CardTitle>Documentation</CardTitle>
								<CardDescription>
									Comprehensive guides and reference materials
								</CardDescription>
							</CardHeader>
							<CardContent>
								{loading ? (
									<div className="flex items-center justify-center py-12">
										<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
									</div>
								) : docsLectures.length === 0 ? (
									<div className="text-center py-12">
										<FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
										<h3 className="text-lg font-semibold mb-2">
											No documentation available
										</h3>
										<p className="text-muted-foreground">
											Documentation resources will be added soon
										</p>
									</div>
								) : (
									<div className="space-y-3">
										{docsLectures.map((doc) => {
											const fullDocUrl = getFileUrl(doc.fileUrl);
											return (
												<div
													key={doc._id}
													className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50">
													<div className="flex items-start justify-between">
														<div className="flex-1">
															<div className="flex items-center gap-2 mb-2">
																<h4 className="font-semibold">{doc.title}</h4>
																<Badge variant="outline" className="text-xs">
																	{getFileIcon(doc.fileType)}
																</Badge>
															</div>
															{doc.description && (
																<p className="text-sm text-muted-foreground line-clamp-2">
																	{doc.description}
																</p>
															)}
															<p className="text-xs text-muted-foreground mt-2">
																{new Date(doc.createdAt).toLocaleDateString()}
															</p>
														</div>
														<div className="flex gap-2">
															<Button
																size="sm"
																variant="outline"
																onClick={() => openFile(fullDocUrl)}
																className="hover:bg-gray-800">
																<Eye className="w-4 h-4 mr-1" />
																View
															</Button>
															<Button
																size="sm"
																variant="outline"
																onClick={() => {
																	const link = document.createElement("a");
																	link.href = fullDocUrl;
																	link.download = doc.fileName;
																	link.click();
																}}
																className="hover:bg-gray-800">
																<Download className="w-4 h-4 mr-1" />
																Download
															</Button>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
};

export default EducationDocs;
