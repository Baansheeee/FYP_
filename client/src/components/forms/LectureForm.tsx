/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axiosInstance from "../../api/axios";
import { Loader2 } from "lucide-react";

interface Lecture {
	_id: string;
	title: string;
	description: string;
	fileUrl: string;
	fileName: string;
	fileType: string;
	duration: number;
	uploadedBy: string;
	createdAt: string;
}

interface LectureFormProps {
	lecture?: Lecture | null;
	onSuccess: () => void;
	onCancel: () => void;
}

export function LectureForm({
	lecture,
	onSuccess,
	onCancel,
}: LectureFormProps) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		duration: 0,
		fileUrl: "",
	});
	const [file, setFile] = useState<File | null>(null);
	const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (lecture) {
			setFormData({
				title: lecture.title,
				description: lecture.description,
				duration: lecture.duration,
				fileUrl: lecture.fileUrl,
			});
			// Determine if it's a file or URL
			setUploadMethod(lecture.fileUrl.startsWith("/uploads/") ? "file" : "url");
		}
	}, [lecture]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "duration" ? Number.parseInt(value) || 0 : value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
			setError("");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const form = new FormData();
			form.append("title", formData.title);
			form.append("description", formData.description);
			form.append("duration", formData.duration.toString());

			if (uploadMethod === "file") {
				if (!file && !lecture) {
					setError("Please select a file to upload");
					setLoading(false);
					return;
				}
				if (file) {
					form.append("file", file);
				}
			} else {
				if (!formData.fileUrl) {
					setError("Please enter a file URL");
					setLoading(false);
					return;
				}
				form.append("fileUrl", formData.fileUrl);
			}

			if (lecture) {
				// Update existing lecture
				await axiosInstance.put(`/lectures/${lecture._id}`, form, {
					headers: { "Content-Type": "multipart/form-data" },
				});
			} else {
				// Create new lecture
				await axiosInstance.post("/lectures/create", form, {
					headers: { "Content-Type": "multipart/form-data" },
				});
			}

			onSuccess();
		} catch (err: any) {
			setError(err.response?.data?.message || "Error saving lecture");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="w-full bg-slate-800/40 p-4 my-4 backdrop-blur-xl border-cyan-500/20">
			<CardHeader className="px-0 pt-2 pb-4 text-center">
				<CardTitle className="text-cyan-300 text-3xl">
					{lecture ? "Edit Lecture" : "Create New Lecture"}
				</CardTitle>
				<CardDescription className="text-cyan-300/60 mt-1">
					{lecture
						? "Update lecture details"
						: "Add a new lecture to the system"}
				</CardDescription>
			</CardHeader>
			<CardContent className="px-0">
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<div className="bg-red-500/10 text-red-400 p-3 rounded-md text-sm border border-red-500/30">
							{error}
						</div>
					)}
					{/* Title */}
					<div className="space-y-2 form-field">
						<label className="text-sm font-medium label-animate text-cyan-300">
							Title
						</label>
						<Input
							name="title"
							placeholder="Enter lecture title"
							value={formData.title}
							onChange={handleInputChange}
							required
							className="placeholder-animate border-cyan-500/30 focus:border-cyan-500 bg-slate-950/50"
						/>
					</div>
					{/* Description */}
					<div className="space-y-2 form-field">
						<label className="text-sm font-medium label-animate text-cyan-300">
							Description
						</label>
						<Textarea
							name="description"
							placeholder="Enter lecture description"
							value={formData.description}
							onChange={handleInputChange}
							rows={4}
							className="placeholder-animate border-cyan-500/30 focus:border-cyan-500 bg-slate-950/50"
						/>
					</div>
					{/* Duration */}
					<div className="space-y-2 form-field">
						<label className="text-sm font-medium label-animate text-cyan-300">
							Duration (minutes)
						</label>
						<Input
							name="duration"
							type="number"
							placeholder="Enter duration in minutes"
							value={formData.duration}
							onChange={handleInputChange}
							min="0"
							className="placeholder-animate border-cyan-500/30 focus:border-cyan-500 bg-slate-950/50"
						/>
					</div>
					{/* File Upload Method Toggle */}
					<div className="space-y-2 form-field">
						<label className="text-sm font-medium label-animate text-cyan-300">
							Upload Method
						</label>
						<div className="flex gap-4">
							<label className="flex items-center gap-2 cursor-pointer text-cyan-300">
								<input
									type="radio"
									value="file"
									checked={uploadMethod === "file"}
									onChange={(e) =>
										setUploadMethod(e.target.value as "file" | "url")
									}
								/>
								<span className="text-sm">Upload File</span>
							</label>
							<label className="flex items-center gap-2 cursor-pointer text-cyan-300">
								<input
									type="radio"
									value="url"
									checked={uploadMethod === "url"}
									onChange={(e) =>
										setUploadMethod(e.target.value as "file" | "url")
									}
								/>
								<span className="text-sm">External URL</span>
							</label>
						</div>
					</div>
					{/* File Input or URL Input */}
					{uploadMethod === "file" ? (
						<div className="space-y-2 form-field">
							<label className="text-sm font-medium label-animate text-cyan-300">
								Select File {!lecture}
							</label>
							<Input
								type="file"
								onChange={handleFileChange}
								accept=".mp4,.webm,.pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.ppt,.pptx,.txt"
								className="placeholder-animate border-cyan-500/30 hover:cursor-pointer focus:border-cyan-500 bg-slate-950/50"
							/>
							<p className="text-xs text-cyan-300/60">
								Supported: Video, PDF, Images, Documents (Max 100MB)
							</p>
							{file && (
								<p className="text-xs text-green-400">Selected: {file.name}</p>
							)}
							{lecture && lecture.fileUrl && (
								<p className="text-xs text-cyan-300/60">
									Current: {lecture.fileName}
								</p>
							)}
						</div>
					) : (
						<div className="space-y-2 form-field">
							<label className="text-sm font-medium label-animate text-cyan-300">
								File URL *
							</label>
							<Input
								name="fileUrl"
								placeholder="Enter external file URL"
								value={formData.fileUrl}
								onChange={handleInputChange}
								className="placeholder-animate border-cyan-500/30 focus:border-cyan-500 bg-slate-950/50"
							/>
						</div>
					)}{" "}
					{/* Form Actions */}
					<div className="flex gap-2 pt-4">
						<Button
							type="submit"
							disabled={loading}
							className="flex-1 form-field bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50">
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : lecture ? (
								"Update Lecture"
							) : (
								"Create Lecture"
							)}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={onCancel}
							disabled={loading}
							className="flex-1 bg-transparent form-field border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
							Cancel
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
