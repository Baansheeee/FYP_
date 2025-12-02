/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ArrowLeft,
	Mail,
	User,
	Calendar,
	Shield,
	Phone,
	Trash2,
} from "lucide-react";
import axiosInstance from "@/api/axios";
import toast, { Toaster } from "react-hot-toast";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserDetails {
	_id: string;
	name: string;
	email: string;
	role: "Admin" | "Developer" | "Viewer";
	phone?: string;
	username?: string;
	joinDate: string;
	status: "active" | "inactive";
}

const UserDetailsPage = () => {
	const { userId } = useParams<{ userId: string }>();
	const navigate = useNavigate();
	const [user, setUser] = useState<UserDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [editFormData, setEditFormData] = useState({
		name: "",
		email: "",
		phone: "",
		username: "",
		status: "active" as "active" | "inactive",
		role: "1",
	});

	useEffect(() => {
		fetchUserDetails();
	}, [userId]);

	const fetchUserDetails = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get(`/auth/user/${userId}`);
			if (response.data.success) {
				// Format the response to match our interface
				const userData = response.data.user;
				const formattedUser: UserDetails = {
					_id: userData._id,
					name: userData.name,
					email: userData.email,
					role:
						userData.role === 2
							? "Admin"
							: userData.role === 1
							? "Developer"
							: "Viewer",
					phone: userData.phone || "N/A",
					username: userData.username || "N/A",
					joinDate: userData.createdAt
						? new Date(userData.createdAt).toISOString().split("T")[0]
						: new Date().toISOString().split("T")[0],
					status: userData.status || "active",
				};
				setUser(formattedUser);
				// Initialize edit form with current user data
				setEditFormData({
					name: userData.name,
					email: userData.email,
					phone: userData.phone || "",
					username: userData.username || "",
					status: userData.status || "active",
					role: String(userData.role),
				});
			}
		} catch (err: any) {
			console.error("Error fetching user details:", err);
			toast.error(
				err.response?.data?.message || "Failed to fetch user details"
			);
			navigate("/admin");
		} finally {
			setLoading(false);
		}
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "Admin":
				return "bg-red-500";
			case "Developer":
				return "bg-blue-500";
			case "Viewer":
				return "bg-gray-500";
			default:
				return "bg-purple-500";
		}
	};

	const handleEditClick = () => {
		setEditDialogOpen(true);
	};

	const handleEditFormChange = (
		field: string,
		value: string | "active" | "inactive"
	) => {
		setEditFormData({ ...editFormData, [field]: value });
	};

	const handleSaveChanges = async () => {
		if (!user) return;

		// Validation
		if (
			!editFormData.name.trim() ||
			!editFormData.email.trim() ||
			!editFormData.username.trim()
		) {
			toast.error("Please fill in all required fields");
			return;
		}

		setIsSaving(true);
		try {
			const updatePayload = {
				name: editFormData.name,
				email: editFormData.email,
				phone: editFormData.phone,
				username: editFormData.username,
				status: editFormData.status,
				role: parseInt(editFormData.role),
			};

			const response = await axiosInstance.put(
				`/auth/admin/users/${user._id}`,
				updatePayload
			);

			if (response.data.success) {
				toast.success("User details updated successfully");
				setEditDialogOpen(false);
				// Refresh user details
				fetchUserDetails();
			}
		} catch (err: any) {
			console.error("Error updating user:", err);
			toast.error(
				err.response?.data?.message || "Failed to update user details"
			);
		} finally {
			setIsSaving(false);
		}
	};

	const handleDeleteUser = async () => {
		if (!user) return;

		setIsDeleting(true);
		try {
			const response = await axiosInstance.delete(
				`/auth/admin/users/${user._id}`
			);

			if (response.data.success) {
				toast.success("User deleted successfully");
				setDeleteDialogOpen(false);
				// Navigate back to admin page after deletion
				setTimeout(() => navigate("/admin"), 1500);
			}
		} catch (err: any) {
			console.error("Error deleting user:", err);
			toast.error(err.response?.data?.message || "Failed to delete user");
		} finally {
			setIsDeleting(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
				<Navbar />
				<div className="flex items-center justify-center h-screen">
					<p className="text-muted-foreground">Loading user details...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
				<Navbar />
				<div className="flex items-center justify-center h-screen">
					<p className="text-muted-foreground">User not found</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Toaster position="top-right" />
			<Navbar />

			<div className="container mx-auto p-8 max-w-2xl">
				{/* Back Button */}
				<Button
					variant="outline"
					onClick={() => navigate("/admin")}
					className="mb-6">
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back to Users
				</Button>

				{/* User Details Card */}
				<Card className="glass-card border-border/50">
					<CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-3xl">{user.name}</CardTitle>
								<p className="text-muted-foreground mt-1">{user.email}</p>
							</div>
							<Badge
								className={`${getRoleColor(
									user.role
								)} text-white text-lg px-4 py-2`}>
								{user.role}
							</Badge>
						</div>
					</CardHeader>

					<CardContent className="pt-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Left Column - Contact Information */}
							<div className="space-y-6">
								<h3 className="text-lg font-semibold flex items-center gap-2">
									<Shield className="w-5 h-5 text-purple-500" />
									Contact Information
								</h3>

								<div className="space-y-4">
									{/* Email */}
									<div className="p-4 rounded-lg bg-secondary/30 border border-border/50 h-[90px] flex flex-col items-center justify-center text-center">
										<div className="flex items-center justify-center gap-2 mb-1">
											<Mail className="w-5 h-5 text-blue-500" />
											<span className="text-sm text-muted-foreground">
												Email
											</span>
										</div>
										<p className="font-medium break-all">{user.email}</p>
									</div>

									{/* Phone */}
									<div className="p-4 rounded-lg bg-secondary/30 border border-border/50 h-[90px] flex flex-col items-center justify-center text-center">
										<div className="flex items-center justify-center gap-2 mb-1">
											<Phone className="w-5 h-5 text-green-500" />
											<span className="text-sm text-muted-foreground">
												Phone
											</span>
										</div>
										<p className="font-medium">{user.phone}</p>
									</div>

									{/* Username */}
									<div className="p-4 rounded-lg bg-secondary/30 border border-border/50 h-[90px] flex flex-col items-center justify-center text-center">
										<div className="flex items-center justify-center gap-2 mb-1">
											<User className="w-5 h-5 text-orange-500" />
											<span className="text-sm text-muted-foreground">
												Username
											</span>
										</div>
										<p className="font-medium">{user.username}</p>
									</div>
								</div>
							</div>

							{/* Right Column - Account Information */}
							<div className="space-y-6">
								<h3 className="text-lg font-semibold flex items-center gap-2">
									<Shield className="w-5 h-5 text-purple-500" />
									Account Information
								</h3>

								<div className="space-y-4">
									{/* Join Date */}
									<div className="p-4 rounded-lg bg-secondary/30 border border-border/50 h-[90px] flex flex-col items-center justify-center text-center">
										<div className="flex items-center justify-center gap-2 mb-1">
											<Calendar className="w-5 h-5 text-indigo-500" />
											<span className="text-sm text-muted-foreground">
												Join Date
											</span>
										</div>
										<p className="font-medium">{user.joinDate}</p>
									</div>

									{/* Status */}
									<div className="p-4 rounded-lg bg-secondary/30 border border-border/50 h-[90px] flex flex-col items-center justify-center text-center">
										<div className="flex items-center justify-center gap-2 mb-1">
											<Shield className="w-5 h-5 text-green-500" />
											<span className="text-sm text-muted-foreground">
												Status
											</span>
										</div>
										<Badge className="bg-green-500 text-white capitalize mt-1">
											{user.status}
										</Badge>
									</div>

									{/* Role Information */}
									<div className="p-4 rounded-lg bg-secondary/30 border border-border/50 h-[90px] flex flex-col items-center justify-center text-center">
										<div className="flex items-center justify-center gap-2 mb-1">
											<Shield className="w-5 h-5 text-purple-500" />
											<span className="text-sm text-muted-foreground">
												Role
											</span>
										</div>
										<div>
											<p className="font-medium">{user.role}</p>
											<p className="text-xs text-muted-foreground mt-1 line-clamp-1">
												{user.role === "Admin" &&
													"Full system access and management capabilities"}
												{user.role === "Developer" &&
													"Development and deployment access"}
												{user.role === "Viewer" &&
													"Read-only access to resources"}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="mt-8 pt-8 border-t border-border/50 flex gap-3">
							<Button variant="outline" onClick={() => navigate("/admin")}>
								Back
							</Button>
							<Button
								variant="destructive"
								onClick={() => setDeleteDialogOpen(true)}
								className="gap-2">
								<Trash2 className="w-4 h-4" />
								Delete User
							</Button>
							<Button
								onClick={handleEditClick}
								className="ml-auto gradient-purple text-white">
								Edit User
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Edit User Dialog */}
				<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
					<DialogContent className="sm:max-w-[500px]">
						<DialogHeader>
							<DialogTitle>Edit User Details</DialogTitle>
							<DialogDescription>
								Update the user's information and settings. Changes will be
								saved to the database.
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4 py-4">
							{/* Name */}
							<div className="space-y-2">
								<Label htmlFor="name" className="text-gray-700 font-medium">
									Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="name"
									placeholder="Enter user name"
									value={editFormData.name}
									onChange={(e) => handleEditFormChange("name", e.target.value)}
									className="h-10"
								/>
							</div>

							{/* Email */}
							<div className="space-y-2">
								<Label htmlFor="email" className="text-gray-700 font-medium">
									Email <span className="text-red-500">*</span>
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter email"
									value={editFormData.email}
									onChange={(e) =>
										handleEditFormChange("email", e.target.value)
									}
									className="h-10"
								/>
							</div>

							{/* Username */}
							<div className="space-y-2">
								<Label htmlFor="username" className="text-gray-700 font-medium">
									Username <span className="text-red-500">*</span>
								</Label>
								<Input
									id="username"
									placeholder="Enter username"
									value={editFormData.username}
									onChange={(e) =>
										handleEditFormChange("username", e.target.value)
									}
									className="h-10"
								/>
							</div>

							{/* Phone */}
							<div className="space-y-2">
								<Label htmlFor="phone" className="text-gray-700 font-medium">
									Phone
								</Label>
								<Input
									id="phone"
									placeholder="Enter phone number"
									value={editFormData.phone}
									onChange={(e) =>
										handleEditFormChange("phone", e.target.value)
									}
									className="h-10"
								/>
							</div>

							{/* Status */}
							<div className="space-y-2">
								<Label htmlFor="status" className="text-gray-700 font-medium">
									Status <span className="text-red-500">*</span>
								</Label>
								<Select
									value={editFormData.status}
									onValueChange={(value) =>
										handleEditFormChange(
											"status",
											value as "active" | "inactive"
										)
									}>
									<SelectTrigger id="status" className="h-10">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Role */}
							<div className="space-y-2">
								<Label htmlFor="role" className="text-gray-700 font-medium">
									Role <span className="text-red-500">*</span>
								</Label>
								<Select
									value={editFormData.role}
									onValueChange={(value) =>
										handleEditFormChange("role", value)
									}>
									<SelectTrigger id="role" className="h-10">
										<SelectValue placeholder="Select role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">Developer</SelectItem>
										<SelectItem value="2">Admin</SelectItem>
										<SelectItem value="3">Viewer</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setEditDialogOpen(false)}
								disabled={isSaving}>
								Cancel
							</Button>
							<Button
								onClick={handleSaveChanges}
								disabled={isSaving}
								className="gradient-purple text-white">
								{isSaving ? "Saving..." : "Save Changes"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				{/* Delete Confirmation Dialog */}
				<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete User</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to delete {user?.name}? This action cannot
								be undone and the user will be permanently removed from the
								system.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<div className="flex gap-3 justify-end">
							<AlertDialogCancel disabled={isDeleting}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeleteUser}
								disabled={isDeleting}
								className="bg-red-600 hover:bg-red-700">
								{isDeleting ? "Deleting..." : "Delete"}
							</AlertDialogAction>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
};

export default UserDetailsPage;
