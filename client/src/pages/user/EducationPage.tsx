/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LectureForm } from "@/components/forms/LectureForm";
import axiosInstance from "../../api/axios";
import { Trash2, Edit2, Plus, Loader2, Eye } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

export default function EducationPage() {
	const [lectures, setLectures] = useState<Lecture[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchLectures();
	}, []);

	const fetchLectures = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/lectures");
			setLectures(response.data.lectures || []);
			setError("");
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to fetch lectures");
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (lecture: Lecture) => {
		setSelectedLecture(lecture);
		setShowForm(true);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			setIsDeleting(true);
			await axiosInstance.delete(`/lectures/${deleteId}`);
			setLectures((prev) => prev.filter((l) => l._id !== deleteId));
			setDeleteId(null);
			setError("");
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to delete lecture");
		} finally {
			setIsDeleting(false);
		}
	};

	const handleFormSuccess = async () => {
		await fetchLectures();
		setShowForm(false);
		setSelectedLecture(null);
	};

	const handleCancel = () => {
		setShowForm(false);
		setSelectedLecture(null);
	};

	const openFile = (fileUrl: string) => {
		window.open(fileUrl, "_blank");
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold">Education Management</h1>
							<p className="text-muted-foreground mt-2">
								Manage lectures for your courses
							</p>
						</div>
						{!showForm && (
							<Button
								onClick={() => {
									setSelectedLecture(null);
									setShowForm(true);
								}}
								size="lg">
								<Plus className="mr-2 h-4 w-4" />
								Add Lecture
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8">
				{error && (
					<div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
						{error}
					</div>
				)}

				{/* Form Section */}
				{showForm && (
					<div className="mb-8">
						<LectureForm
							lecture={selectedLecture}
							onSuccess={handleFormSuccess}
							onCancel={handleCancel}
						/>
					</div>
				)}

				{/* Lectures List */}
				<div className="space-y-4">
					{loading ? (
						<Card>
							<CardContent className="flex items-center justify-center py-12">
								<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
							</CardContent>
						</Card>
					) : lectures.length === 0 ? (
						<Card>
							<CardContent className="flex flex-col items-center justify-center py-12">
								<div className="text-center">
									<h3 className="text-lg font-semibold">No lectures yet</h3>
									<p className="text-muted-foreground mt-2">
										Create your first lecture to get started
									</p>
								</div>
							</CardContent>
						</Card>
					) : (
						<div className="grid gap-4">
							{lectures.map((lecture) => (
								<Card key={lecture._id} className="overflow-hidden">
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<CardTitle className="line-clamp-2">
													{lecture.title}
												</CardTitle>
												<CardDescription className="mt-2 line-clamp-2">
													{lecture.description || "No description"}
												</CardDescription>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-2 gap-4 text-sm mb-4">
											<div>
												<span className="font-medium">File Type:</span>
												<p className="text-muted-foreground">
													{lecture.fileType || "Unknown"}
												</p>
											</div>
											<div>
												<span className="font-medium">Duration:</span>
												<p className="text-muted-foreground">
													{lecture.duration ? `${lecture.duration} min` : "N/A"}
												</p>
											</div>
											<div>
												<span className="font-medium">File Name:</span>
												<p className="text-muted-foreground truncate">
													{lecture.fileName}
												</p>
											</div>
											<div>
												<span className="font-medium">Created:</span>
												<p className="text-muted-foreground">
													{new Date(lecture.createdAt).toLocaleDateString()}
												</p>
											</div>
										</div>

										{/* Actions */}
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() => openFile(lecture.fileUrl)}>
												<Eye className="h-4 w-4 mr-2" />
												View
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleEdit(lecture)}>
												<Edit2 className="h-4 w-4 mr-2" />
												Edit
											</Button>
											<Button
												variant="destructive"
												size="sm"
												onClick={() => setDeleteId(lecture._id)}>
												<Trash2 className="h-4 w-4 mr-2" />
												Delete
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={!!deleteId}
				onOpenChange={(open) => !open && setDeleteId(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Lecture</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this lecture? This action cannot
							be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-2">
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className="bg-destructive">
							{isDeleting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Deleting...
								</>
							) : (
								"Delete"
							)}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
