/** @format */

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import ArchitectureCanvasWrapper from "@/components/architecture/ArchitectureCanvasWrapper";
import { ArchitectureData } from "@/components/architecture/ArchitectureCanvasContent";
import axiosInstance from "@/api/axios";
import toast from "react-hot-toast";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ArchitectureEditor = () => {
	const { id } = useParams<{ id?: string }>();
	const navigate = useNavigate();
	const [architectureData, setArchitectureData] = useState<
		ArchitectureData | undefined
	>();
	const [architectureInfo, setArchitectureInfo] = useState<any>(null);
	const [loading, setLoading] = useState(!!id);
	const [lastSavedData, setLastSavedData] = useState<ArchitectureData | null>(
		null
	);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isSavingRef = useRef(false);

	useEffect(() => {
		if (id) {
			fetchArchitecture(id);
		}
	}, [id]);

	const fetchArchitecture = async (architectureId: string) => {
		try {
			setLoading(true);
			const response = await axiosInstance.get(
				`/architecture/${architectureId}`
			);
			if (response.data.success) {
				const arch = response.data.architecture;
				const archData: ArchitectureData = {
					nodes: arch.nodes || [],
					edges: arch.edges || [],
				};
				setArchitectureInfo({
					name: arch.name,
					description: arch.description,
					status: arch.status,
					tags: arch.tags,
				});
				setArchitectureData(archData);
				setLastSavedData(archData);
			}
		} catch (error) {
			console.error("Error fetching architecture:", error);
			toast.error("Failed to load architecture");
		} finally {
			setLoading(false);
		}
	};

	const handleSaveArchitecture = async (data: ArchitectureData) => {
		try {
			const response = await axiosInstance.post("/architecture/save", {
				id: id,
				name: architectureInfo?.name || "Untitled Architecture",
				description: architectureInfo?.description || "",
				nodes: data.nodes,
				edges: data.edges,
				status: architectureInfo?.status || "Draft",
				tags: architectureInfo?.tags || [],
			});

			if (response.data.success) {
				toast.success("Architecture saved successfully!");
				setArchitectureData(data);
				setLastSavedData(data);
				// Update the architecture info in case there are changes from the server
				if (response.data.architecture) {
					setArchitectureInfo({
						name: response.data.architecture.name,
						description: response.data.architecture.description,
						status: response.data.architecture.status,
						tags: response.data.architecture.tags,
					});
				}
			} else {
				toast.error(response.data.message || "Failed to save architecture");
			}
		} catch (error: any) {
			console.error("Error saving architecture:", error);
			const errorMessage =
				error.response?.data?.message || "Failed to save architecture";
			toast.error(errorMessage);
		} finally {
			isSavingRef.current = false;
		}
	};

	// Auto-save effect - saves architecture every 30 seconds if there are unsaved changes
	useEffect(() => {
		const setupAutoSave = () => {
			if (autoSaveTimeoutRef.current) {
				clearTimeout(autoSaveTimeoutRef.current);
			}

			// Check if data has changed since last save
			if (
				architectureData &&
				lastSavedData &&
				JSON.stringify(architectureData) !== JSON.stringify(lastSavedData) &&
				!isSavingRef.current &&
				id
			) {
				isSavingRef.current = true;
				handleSaveArchitecture(architectureData);
			}
		};

		// Set up auto-save interval (30 seconds)
		const interval = setInterval(setupAutoSave, 30000);

		return () => {
			clearInterval(interval);
			if (autoSaveTimeoutRef.current) {
				clearTimeout(autoSaveTimeoutRef.current);
			}
		};
	}, [architectureData, lastSavedData, id, architectureInfo]);

	const handleDeleteArchitecture = async () => {
		try {
			setIsDeleting(true);
			const response = await axiosInstance.delete(`/architecture/${id}`);

			if (response.data.success) {
				toast.success("Architecture deleted successfully!");
				setShowDeleteDialog(false);
				// Navigate back to architectures list
				setTimeout(() => {
					navigate("/user/architecture/list");
				}, 1500);
			} else {
				toast.error(response.data.message || "Failed to delete architecture");
			}
		} catch (error: any) {
			console.error("Error deleting architecture:", error);
			const errorMessage =
				error.response?.data?.message || "Failed to delete architecture";
			toast.error(errorMessage);
		} finally {
			setIsDeleting(false);
		}
	};

	const handleBackClick = () => {
		navigate("/user/architecture/list");
	};

	if (loading) {
		return (
			<div className="w-full h-screen flex flex-col bg-gradient-to-br from-background via-purple-50/20 to-background">
				<Navbar />
				<div className="flex flex-1 overflow-hidden w-full">
					<DashboardSidebar />
					<main className="flex-1 flex items-center justify-center">
						<div className="text-center space-y-4">
							<div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin mx-auto" />
							<p className="text-muted-foreground">Loading architecture...</p>
						</div>
					</main>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="w-full h-screen flex flex-col bg-gradient-to-br from-background via-purple-50/20 to-background">
				<Navbar />
				<div className="flex flex-1 overflow-hidden w-full">
					<DashboardSidebar />
					<main className="flex-1 overflow-hidden w-full h-full">
						<ArchitectureCanvasWrapper
							onSave={handleSaveArchitecture}
							onDelete={() => setShowDeleteDialog(true)}
							initialData={architectureData}
							onBack={handleBackClick}
						/>
					</main>
				</div>
			</div>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent className="border border-red-200/40 bg-gradient-to-br from-background to-red-50/10 shadow-lg shadow-red-500/10">
					<AlertDialogHeader>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
								<span className="text-2xl">⚠️</span>
							</div>
							<AlertDialogTitle className="text-xl bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
								Delete Architecture
							</AlertDialogTitle>
						</div>
						<AlertDialogDescription className="space-y-4 pt-4">
							<p className="text-base">
								Are you sure you want to delete{" "}
								<strong className="text-foreground">
									"{architectureInfo?.name || "this architecture"}"
								</strong>
								?
							</p>
							<div className="p-3 rounded-lg bg-red-500/5 border border-red-200/30">
								<p className="text-red-600 font-semibold text-sm">
									This action cannot be undone. All components, connections, and
									history will be permanently deleted.
								</p>
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end pt-4 border-t border-border/50">
						<AlertDialogCancel disabled={isDeleting} className="min-w-20">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteArchitecture}
							disabled={isDeleting}
							className="min-w-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-500/30 transition-all border-0">
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default ArchitectureEditor;
