/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CommunityForum } from "@/components/community/CommunityForum";
import axiosInstance, { getFileUrl } from "@/api/axios";
import {
	GraduationCap,
	Book,
	Video,
	HelpCircle,
	Users,
	Play,
	FileText,
	Download,
	Loader2,
	Eye,
} from "lucide-react";
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

const Education = () => {
	const [lectures, setLectures] = useState<Lecture[]>([]);
	const [loading, setLoading] = useState(true);

	const faqs = [
		{
			question: "How does the AI chatbot understand my requirements?",
			answer:
				"Our chatbot uses advanced NLP to interpret natural language descriptions...",
		},
		{
			question: "Can I import existing AWS resources?",
			answer:
				"Yes! Use the Import Resources module to reverse engineer your infrastructure...",
		},
		{
			question: "What IaC formats are supported?",
			answer: "We support Terraform, CloudFormation, and AWS CDK...",
		},
	];

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

	// Filter lectures by fileType
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

	// Enhanced filter for videos - includes YouTube and other video URLs
	const videoLectures = lectures.filter(
		(l) =>
			["video/mp4", "video/webm"].includes(l.fileType) ||
			l.fileUrl.includes("youtube") ||
			l.fileUrl.includes("youtu.be") ||
			l.fileUrl.includes("vimeo") ||
			/\.(mp4|webm|mov|avi|mkv)$/i.test(l.fileUrl)
	);

	const getFileIcon = (fileType: string) => {
		if (fileType.includes("pdf")) return "📄 PDF";
		if (fileType.includes("word") || fileType.includes("document"))
			return "📝 Document";
		if (fileType.includes("powerpoint") || fileType.includes("presentation"))
			return "📊 Presentation";
		if (fileType.includes("text")) return "📃 Text";
		if (fileType.includes("video")) return "🎥 Video";
		return "📁 File";
	};

	const openFile = (fileUrl: string) => {
		window.open(fileUrl, "_blank");
	};

	// Helper to check if URL is a YouTube link
	const getYouTubeEmbedUrl = (url: string) => {
		try {
			const youtubeRegex =
				/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/;
			const match = url.match(youtubeRegex);
			if (match && match[1]) {
				return `https://www.youtube.com/embed/${match[1]}`;
			}
		} catch (e) {
			// Not a YouTube URL
		}
		return null;
	};

	// Helper to check if URL is a Vimeo link
	const getVimeoEmbedUrl = (url: string) => {
		try {
			const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;
			const match = url.match(vimeoRegex);
			if (match && match[1]) {
				return `https://player.vimeo.com/video/${match[1]}`;
			}
		} catch (e) {
			// Not a Vimeo URL
		}
		return null;
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
								<h1 className="text-3xl font-bold">User Education</h1>
								<p className="text-muted-foreground">
									Learn how to make the most of AWSOME
								</p>
							</div>
						</div>

						<Tabs defaultValue="tutorials" className="w-full">
							<TabsList className="grid w-full max-w-2xl grid-cols-5">
								<TabsTrigger value="tutorials">
									<Book className="w-4 h-4 mr-2" />
									Tutorials
								</TabsTrigger>
								<TabsTrigger value="docs">
									<FileText className="w-4 h-4 mr-2" />
									Docs
								</TabsTrigger>
								<TabsTrigger value="videos">
									<Video className="w-4 h-4 mr-2" />
									Videos
								</TabsTrigger>
								<TabsTrigger value="faqs">
									<HelpCircle className="w-4 h-4 mr-2" />
									FAQs
								</TabsTrigger>
								<TabsTrigger value="community">
									<Users className="w-4 h-4 mr-2" />
									Community
								</TabsTrigger>
							</TabsList>

							{/* Tutorials - Empty for later addition */}
							<TabsContent value="tutorials" className="space-y-6">
								<Card className="glass-card border-border/50">
									<CardHeader>
										<CardTitle>Interactive Tutorials</CardTitle>
										<CardDescription>
											Step-by-step guides to master AWSOME
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="text-center py-12">
											<Book className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
											<h3 className="text-lg font-semibold mb-2">
												No tutorials yet
											</h3>
											<p className="text-muted-foreground">
												Tutorials will be added soon. Check back later!
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Documentation - Filtered by document types */}
							<TabsContent value="docs" className="space-y-6">
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
																		<h4 className="font-semibold">
																			{doc.title}
																		</h4>
																		<Badge
																			variant="outline"
																			className="text-xs">
																			{getFileIcon(doc.fileType)}
																		</Badge>
																	</div>
																	{doc.description && (
																		<p className="text-sm text-muted-foreground line-clamp-2">
																			{doc.description}
																		</p>
																	)}
																	<p className="text-xs text-muted-foreground mt-2">
																		{new Date(
																			doc.createdAt
																		).toLocaleDateString()}
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
							</TabsContent>

							{/* Videos - Filtered by video types */}
							<TabsContent value="videos" className="space-y-6">
								<Card className="glass-card border-border/50">
									<CardHeader>
										<CardTitle>Video Courses</CardTitle>
										<CardDescription>
											Learn through video tutorials and webinars
										</CardDescription>
									</CardHeader>
									<CardContent>
										{loading ? (
											<div className="flex items-center justify-center py-12">
												<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
											</div>
										) : videoLectures.length === 0 ? (
											<div className="text-center py-12">
												<Video className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
												<h3 className="text-lg font-semibold mb-2">
													No videos available
												</h3>
												<p className="text-muted-foreground">
													Video content will be added soon
												</p>
											</div>
										) : (
											<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
												{videoLectures.map((video) => {
													const youtubeUrl = getYouTubeEmbedUrl(video.fileUrl);
													const vimeoUrl = getVimeoEmbedUrl(video.fileUrl);
													const fullFileUrl = getFileUrl(video.fileUrl);

													return (
														<div
															key={video._id}
															className="rounded-lg border border-border/40 overflow-hidden hover:border-primary/50 transition-colors flex flex-col">
															{youtubeUrl ? (
																<iframe
																	width="100%"
																	height="200"
																	src={youtubeUrl}
																	title={video.title}
																	frameBorder="0"
																	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
																	allowFullScreen
																	className="bg-black"
																/>
															) : vimeoUrl ? (
																<iframe
																	src={vimeoUrl}
																	width="100%"
																	height="200"
																	frameBorder="0"
																	allow="autoplay; fullscreen; picture-in-picture"
																	allowFullScreen
																	className="bg-black"
																/>
															) : video.fileUrl.match(
																	/\.(mp4|webm|mov|avi)$/i
															  ) ? (
																<video
																	width="100%"
																	height="200"
																	controls
																	className="bg-black aspect-video"
																	poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E">
																	<source
																		src={fullFileUrl}
																		type={video.fileType}
																	/>
																	Your browser does not support the video tag.
																</video>
															) : (
																<div
																	className="aspect-video bg-secondary/30 flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors"
																	onClick={() => openFile(fullFileUrl)}>
																	<Play className="w-12 h-12 text-primary" />
																</div>
															)}
															<div className="p-4 flex-1 flex flex-col">
																<h4 className="font-semibold mb-2 line-clamp-2">
																	{video.title}
																</h4>
																{video.description && (
																	<p className="text-xs text-muted-foreground mb-2 line-clamp-1">
																		{video.description}
																	</p>
																)}
																<div className="flex justify-between items-center text-xs text-muted-foreground mb-3 mt-auto">
																	<span>{video.duration || 0} min</span>
																	<span>
																		{new Date(
																			video.createdAt
																		).toLocaleDateString()}
																	</span>
																</div>
																<Button
																	size="sm"
																	onClick={() => openFile(fullFileUrl)}
																	className="w-full bg-blue-600 hover:bg-blue-700 text-white">
																	<Play className="w-4 h-4 mr-2" />
																	Open
																</Button>
															</div>
														</div>
													);
												})}
											</div>
										)}
									</CardContent>
								</Card>
							</TabsContent>

							{/* FAQs */}
							<TabsContent value="faqs" className="space-y-6">
								<Card className="glass-card border-border/50">
									<CardHeader>
										<CardTitle>Frequently Asked Questions</CardTitle>
										<CardDescription>
											Find answers to common questions
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{faqs.map((faq, index) => (
												<div
													key={index}
													className="p-4 rounded-lg border border-border/40 animate-fade-in"
													style={{ animationDelay: `${index * 100}ms` }}>
													<h4 className="font-semibold mb-2">{faq.question}</h4>
													<p className="text-sm text-muted-foreground">
														{faq.answer}
													</p>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Community Forum */}
							<TabsContent value="community" className="space-y-6">
								<CommunityForum />
							</TabsContent>
						</Tabs>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Education;
