/** @format */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, BookOpen, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/api/axios";
import { LectureForm } from "@/components/forms/LectureForm";
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
	videoUrl: string;
	lectureNotes: string;
	duration: number;
	fileName?: string;
	createdAt: string;
	fileType?: string;
}

const EducationTab = () => {
	const [allLectures, setAllLectures] = useState<any[]>([]);
	const [allLecturesLoading, setAllLecturesLoading] = useState(false);
	const [showLectureForm, setShowLectureForm] = useState(false);
	const [selectedLecture, setSelectedLecture] = useState<any>(null);
	const [deleteConfirmationId, setDeleteConfirmationId] = useState<
		string | null
	>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		fetchAllLectures();
	}, []);

	const fetchAllLectures = async () => {
		try {
			setAllLecturesLoading(true);
			const response = await axiosInstance.get("/lectures");
			if (response.data.lectures) {
				setAllLectures(response.data.lectures);
			}
		} catch (err: any) {
			console.error("Error fetching all lectures:", err);
			toast.error("Failed to fetch lectures");
		} finally {
			setAllLecturesLoading(false);
		}
	};

	const handleConfirmDelete = async () => {
		if (!deleteConfirmationId) return;
		try {
			setIsDeleting(true);
			await axiosInstance.delete(`/lectures/${deleteConfirmationId}`);
			setAllLectures((prev) =>
				prev.filter((l) => l._id !== deleteConfirmationId)
			);
			setDeleteConfirmationId(null);
			toast.success("Lecture deleted successfully");
		} catch (err: any) {
			console.error("Error deleting lecture:", err);
			toast.error(err.response?.data?.message || "Failed to delete lecture");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="space-y-6">
			{showLectureForm ? (
				// Lecture Form View
				<div className="mb-8">
					<LectureForm
						lecture={selectedLecture}
						onSuccess={() => {
							fetchAllLectures();
							setShowLectureForm(false);
							setSelectedLecture(null);
							toast.success(
								selectedLecture
									? "Lecture updated successfully"
									: "Lecture created successfully"
							);
						}}
						onCancel={() => {
							setShowLectureForm(false);
							setSelectedLecture(null);
						}}
					/>
				</div>
			) : (
				// Lectures List View
				<>
					<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
						<CardHeader className="border-b border-cyan-500/10">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
										Lecture Management
									</CardTitle>
									<p className="text-sm text-cyan-300/60 mt-2">
										📚 Manage all lectures and course materials
									</p>
								</div>
								<Button
									onClick={() => {
										setSelectedLecture(null);
										setShowLectureForm(true);
									}}
									className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50 transition-all duration-300"
									size="lg">
									<Plus className="mr-2 h-4 w-4" />
									Add Lecture
								</Button>
							</div>
						</CardHeader>
					</Card>
					{/* Lectures List */}
					<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
						<CardHeader className="border-b border-cyan-500/10">
							<CardTitle className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
								All Lectures
							</CardTitle>
							<p className="text-sm text-cyan-300/60 mt-2">
								📖 Total:{" "}
								<span className="text-cyan-300 font-bold">
									{allLectures.length}
								</span>{" "}
								lectures
							</p>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="space-y-3">
								{allLecturesLoading ? (
									<div className="flex items-center justify-center py-12">
										<Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
									</div>
								) : allLectures.length === 0 ? (
									<div className="text-center py-12">
										<BookOpen className="h-12 w-12 text-cyan-500/50 mx-auto mb-3" />
										<h3 className="text-lg font-semibold text-cyan-300">
											No lectures yet
										</h3>
										<p className="text-cyan-300/60 mt-2">
											Create your first lecture to get started
										</p>
									</div>
								) : (
									allLectures.map((lecture) => (
										<div
											key={lecture._id}
											className="p-4 rounded-xl bg-gradient-to-r from-slate-700/40 to-slate-600/30 hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/30 group">
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1">
													<h4 className="font-semibold text-lg text-cyan-300 group-hover:text-cyan-200 transition-colors">
														{lecture.title}
													</h4>
													{lecture.description && (
														<p className="text-sm text-cyan-300/60 mt-1 line-clamp-2">
															{lecture.description}
														</p>
													)}
													<div className="flex flex-wrap gap-2 mt-3">
														<Badge className="text-xs bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
															📁 {lecture.fileType || "File"}
														</Badge>
														{lecture.duration > 0 && (
															<Badge className="text-xs bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
																⏱️ {lecture.duration} min
															</Badge>
														)}
														<Badge className="text-xs bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
															📅{" "}
															{new Date(lecture.createdAt).toLocaleDateString()}
														</Badge>
														<Badge className="text-xs bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
															📄 {lecture.fileName}
														</Badge>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => {
															setSelectedLecture(lecture);
															setShowLectureForm(true);
														}}
														className="border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
														<Edit2 className="h-4 w-4 mr-2" />
														Edit
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => setDeleteConfirmationId(lecture._id)}
														className="hover:bg-red-600">
														<Trash2 className="h-4 w-4 mr-2" />
														Delete
													</Button>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</CardContent>
					</Card>
				</>
			)}

			<AlertDialog
				open={!!deleteConfirmationId}
				onOpenChange={(open) => !open && setDeleteConfirmationId(null)}>
				<AlertDialogContent className="bg-slate-900/95 border-cyan-500/30">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-cyan-300">
							Delete Lecture
						</AlertDialogTitle>
						<AlertDialogDescription className="text-cyan-300/60">
							Are you sure you want to delete this lecture? This action cannot
							be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel className="border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							disabled={isDeleting}
							className="bg-red-600 hover:bg-red-700">
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default EducationTab;
