/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Search, Eye, Edit, Trash2, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

interface Architecture {
	_id: string;
	name: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
	components: number;
	status?: "Production" | "Staging" | "Development" | "Draft";
	nodes: any[];
	edges: any[];
	version?: number;
}

const ArchitectureList = () => {
	const [architectures, setArchitectures] = useState<Architecture[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState<Architecture | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();

	// Fetch architectures from backend
	useEffect(() => {
		fetchArchitectures();
	}, []);

	const fetchArchitectures = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/architecture/list");
			if (response.data.success) {
				setArchitectures(response.data.architectures || []);
			}
		} catch (error) {
			console.error("Error fetching architectures:", error);
			toast.error("Failed to fetch architectures");
		} finally {
			setLoading(false);
		}
	};

	const filteredArchitectures = architectures.filter((arch) =>
		arch.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDeleteClick = (arch: Architecture) => {
		setDeleteTarget(arch);
		setShowDeleteDialog(true);
	};

	const handleConfirmDelete = async () => {
		if (!deleteTarget) return;

		try {
			setIsDeleting(true);
			const response = await axiosInstance.delete(
				`/architecture/${deleteTarget._id}`
			);
			if (response.data.success) {
				setArchitectures(
					architectures.filter((arch) => arch._id !== deleteTarget._id)
				);
				toast.success("Architecture deleted successfully");
				setShowDeleteDialog(false);
				setDeleteTarget(null);
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

	const handleCreateNew = () => {
		navigate("/user/architecture/create");
	};

	const handleEdit = (id: string) => {
		navigate(`/user/architecture-editor/${id}`);
	};

	const handleView = (id: string) => {
		navigate(`/user/architecture-editor/${id}`);
	};

	const handleDownload = async (arch: Architecture) => {
		try {
			const data = {
				name: arch.name,
				description: arch.description,
				nodes: arch.nodes,
				edges: arch.edges,
				timestamp: new Date().toISOString(),
			};
			const dataStr = JSON.stringify(data, null, 2);
			const dataBlob = new Blob([dataStr], { type: "application/json" });
			const url = URL.createObjectURL(dataBlob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${arch.name}-${Date.now()}.json`;
			link.click();
			URL.revokeObjectURL(url);
			toast.success("Architecture downloaded");
		} catch (error) {
			console.error("Error downloading architecture:", error);
			toast.error("Failed to download architecture");
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Production":
				return "bg-green-100 text-green-700";
			case "Staging":
				return "bg-blue-100 text-blue-700";
			case "Development":
				return "bg-yellow-100 text-yellow-700";
			case "Draft":
				return "bg-purple-100 text-purple-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
				<Navbar />
				<div className="flex w-full">
					<DashboardSidebar />
					<main className="flex-1 overflow-auto">
						<div className="container mx-auto p-8 text-center">
							<p>Loading architectures...</p>
						</div>
					</main>
				</div>
			</div>
		);
	}

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
								<h1 className="text-4xl font-bold">Your Architectures</h1>
								<p className="text-lg text-muted-foreground">
									Manage and view all your AWS architectures
								</p>
							</div>
							<Button
								className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
								onClick={handleCreateNew}>
								<Plus className="w-4 h-4 mr-2" />
								New Architecture
							</Button>
						</div>{" "}
						{/* Search Bar */}
						<div className="relative">
							<Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
							<Input
								placeholder="Search architectures..."
								className="pl-12"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						{/* Architectures Grid */}
						<div className="grid md:grid-cols-2 gap-6">
							{filteredArchitectures.map((arch) => (
								<div
									key={arch._id}
									className="glass-card rounded-xl p-6 border border-border/50 hover:border-purple-300/50 transition-all">
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-gray-900">
												{arch.name}
											</h3>
											<p className="text-sm text-muted-foreground mt-1">
												{arch.description}
											</p>
										</div>
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
												arch.status || "Draft"
											)}`}>
											{arch.status || "Draft"}
										</span>
									</div>

									<div className="grid grid-cols-3 gap-2 py-4 px-4 bg-secondary/30 rounded-lg mb-4 text-sm">
										<div>
											<p className="text-muted-foreground">Components</p>
											<p className="font-semibold text-gray-900">
												{arch.components}
											</p>
										</div>
										<div>
											<p className="text-muted-foreground">Modified</p>
											<p className="font-semibold text-gray-900">
												{new Date(
													arch.updatedAt || arch.createdAt || ""
												).toLocaleDateString()}
											</p>
										</div>
										<div>
											<p className="text-muted-foreground">Size</p>
											<p className="font-semibold text-gray-900">
												{(arch.components * 2.5).toFixed(1)}KB
											</p>
										</div>
									</div>

									<div className="flex gap-2">
										<Button
											variant="outline"
											className="flex-1"
											onClick={() => handleView(arch._id)}>
											<Eye className="w-4 h-4 mr-2" />
											View
										</Button>
										<Button
											variant="outline"
											className="flex-1"
											onClick={() => handleEdit(arch._id)}>
											<Edit className="w-4 h-4 mr-2" />
											Edit
										</Button>
										<Button
											variant="outline"
											className="px-4"
											onClick={() => handleDownload(arch)}>
											<Download className="w-4 h-4" />
										</Button>
										<Button
											variant="outline"
											className="px-4"
											onClick={() => handleDeleteClick(arch)}>
											<Trash2 className="w-4 h-4 text-red-500" />
										</Button>
									</div>
								</div>
							))}
						</div>
						{filteredArchitectures.length === 0 && (
							<div className="glass-card rounded-xl p-12 border border-border/50 text-center">
								<p className="text-muted-foreground">
									{architectures.length === 0
										? "No architectures yet. Create your first one!"
										: "No architectures found"}
								</p>
								{architectures.length === 0 && (
									<Button
										onClick={handleCreateNew}
										className="mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
										<Plus className="w-4 h-4 mr-2" />
										Create Architecture
									</Button>
								)}
							</div>
						)}
					</div>
				</main>
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
									"{deleteTarget?.name}"
								</strong>
								?
							</p>
							<div className="p-3 rounded-lg bg-red-500/5 border border-red-200/30">
								<p className="text-red-600 font-semibold text-sm">
									This action cannot be undone. The architecture and all its
									components will be permanently deleted.
								</p>
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end pt-4 border-t border-border/50">
						<AlertDialogCancel disabled={isDeleting} className="min-w-20">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							disabled={isDeleting}
							className="min-w-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-500/30 transition-all border-0">
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ArchitectureList;
