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
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/api/axios";
import { GraduationCap, Video, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Lecture {
	_id: string;
	title: string;
	description: string;
	fileUrl: string;
	fileType: string;
	duration: number;
	createdAt: string;
}

const EducationVideos = () => {
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

	const videoLectures = lectures.filter(
		(l) =>
			["video/mp4", "video/webm", "video/quicktime"].includes(l.fileType) ||
			l.fileUrl?.includes("youtube") ||
			l.fileUrl?.includes("vimeo")
	);

	const getYouTubeEmbedUrl = (url: string) => {
		if (!url) return null;
		const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
		const match = url.match(youtubeRegex);
		return match ? `https://www.youtube.com/embed/${match[1]}` : null;
	};

	const getVimeoEmbedUrl = (url: string) => {
		if (!url) return null;
		const vimeoRegex =
			/(?:vimeo\.com\/)([0-9]+)|(?:player\.vimeo\.com\/video\/)([0-9]+)/;
		const match = url.match(vimeoRegex);
		const videoId = match ? match[1] || match[2] : null;
		return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
	};

	const renderVideoPlayer = (lecture: Lecture) => {
		const youtubeUrl = getYouTubeEmbedUrl(lecture.fileUrl);
		const vimeoUrl = getVimeoEmbedUrl(lecture.fileUrl);

		if (youtubeUrl) {
			return (
				<div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
					<iframe
						className="absolute top-0 left-0 w-full h-full border-0"
						src={youtubeUrl}
						allowFullScreen
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					/>
				</div>
			);
		}

		if (vimeoUrl) {
			return (
				<div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
					<iframe
						className="absolute top-0 left-0 w-full h-full border-0"
						src={vimeoUrl}
						allow="autoplay; fullscreen; picture-in-picture"
						allowFullScreen
					/>
				</div>
			);
		}

		// Direct video file
		if (
			["video/mp4", "video/webm", "video/quicktime"].includes(lecture.fileType)
		) {
			return (
				<video
					controls
					className="w-full rounded-lg bg-black"
					style={{ maxHeight: "400px" }}>
					<source src={lecture.fileUrl} type={lecture.fileType} />
					Your browser does not support the video tag.
				</video>
			);
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
								<h1 className="text-3xl font-bold">Video Courses</h1>
								<p className="text-muted-foreground">
									Learn from video tutorials and demonstrations
								</p>
							</div>
						</div>

						{loading ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
							</div>
						) : videoLectures.length === 0 ? (
							<Card className="glass-card border-border/50">
								<CardContent className="pt-12">
									<div className="text-center py-12">
										<Video className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
										<h3 className="text-lg font-semibold mb-2">
											No videos available
										</h3>
										<p className="text-muted-foreground">
											Video courses will be added soon
										</p>
									</div>
								</CardContent>
							</Card>
						) : (
							<div className="grid gap-6">
								{videoLectures.map((video) => (
									<Card
										key={video._id}
										className="glass-card border-border/50 overflow-hidden">
										<CardHeader>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<CardTitle>{video.title}</CardTitle>
													{video.description && (
														<CardDescription>
															{video.description}
														</CardDescription>
													)}
													<p className="text-xs text-muted-foreground mt-2">
														{new Date(video.createdAt).toLocaleDateString()}
													</p>
												</div>
												<Badge variant="outline">Video</Badge>
											</div>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												{renderVideoPlayer(video)}
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default EducationVideos;
