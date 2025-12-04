/** @format */

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Mail,
	User,
	Calendar,
	Shield,
	Phone,
	Trash2,
	AlertCircle,
} from "lucide-react";
import axiosInstance from "@/api/axios";
import toast from "react-hot-toast";

interface UserDetailsData {
	_id: string;
	name: string;
	email: string;
	role: "Admin" | "Developer" | "Viewer";
	phone: string;
	username: string;
	joinDate: string;
	status: "active" | "inactive";
}

interface UserDetailsModalProps {
	open: boolean;
	userId: string;
	onOpenChange: (open: boolean) => void;
	onUserUpdated?: () => void;
}

const UserDetailsModal = ({
	open,
	userId,
	onOpenChange,
	onUserUpdated,
}: UserDetailsModalProps) => {
	const [user, setUser] = useState<UserDetailsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [editFormData, setEditFormData] = useState<Partial<UserDetailsData>>(
		{}
	);

	useEffect(() => {
		if (open && userId) {
			fetchUserDetails();
		}
	}, [open, userId]);

	const fetchUserDetails = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get(`/auth/user/${userId}`);

			if (response.data.success) {
				const userData = response.data.user;

				// Get the role directly - backend already converts to Admin/Developer/Viewer
				const role =
					(userData.role as "Admin" | "Developer" | "Viewer") || "Developer";

				const formattedUser: UserDetailsData = {
					_id: userData._id,
					name: userData.name,
					email: userData.email,
					role: role,
					phone: userData.phone || "N/A",
					username: userData.username || "N/A",
					joinDate: userData.createdAt
						? new Date(userData.createdAt).toISOString().split("T")[0]
						: new Date().toISOString().split("T")[0],
					status: userData.status || "active",
				};

				setUser(formattedUser);
				setEditFormData(formattedUser);
			}
		} catch (error: any) {
			console.error("Error fetching user details:", error);
			toast.error("Failed to fetch user details");
		} finally {
			setLoading(false);
		}
	};

	const handleEditChange = (field: string, value: string) => {
		setEditFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSaveChanges = async () => {
		if (!user) return;

		try {
			const roleToSend = editFormData.role || user.role;
			const response = await axiosInstance.put(
				`/auth/admin/users/${user._id}`,
				{
					name: editFormData.name || user.name,
					email: editFormData.email || user.email,
					phone: editFormData.phone || user.phone,
					username: editFormData.username || user.username,
					role: roleToSend,
					status: editFormData.status || user.status,
				}
			);

			if (response.data.success) {
				// Backend returns role as string (Admin/Developer/Viewer)
				const role =
					(response.data.user.role as "Admin" | "Developer" | "Viewer") ||
					"Developer";

				const updatedUser: UserDetailsData = {
					_id: response.data.user._id,
					name: response.data.user.name,
					email: response.data.user.email,
					role: role,
					phone: response.data.user.phone || "N/A",
					username: response.data.user.username || "N/A",
					joinDate: response.data.user.joinDate,
					status: response.data.user.status as "active" | "inactive",
				};

				setUser(updatedUser);
				setEditFormData(updatedUser);
				setIsEditing(false);
				toast.success("User updated successfully");
				onUserUpdated?.();
			}
		} catch (error: any) {
			console.error("Error updating user:", error);
			toast.error(error.response?.data?.message || "Failed to update user");
		}
	};

	const handleDeleteUser = async () => {
		if (!user) return;

		try {
			await axiosInstance.delete(`/auth/admin/users/${user._id}`);
			toast.success("User deleted successfully");
			setShowDeleteConfirm(false);
			onOpenChange(false);
			onUserUpdated?.();
		} catch (error: any) {
			console.error("Error deleting user:", error);
			toast.error(error.response?.data?.message || "Failed to delete user");
		}
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "Admin":
				return "bg-purple-500/80";
			case "Developer":
				return "bg-blue-500/80";
			case "Viewer":
				return "bg-gray-500/80";
			default:
				return "bg-blue-500/80";
		}
	};

	const getStatusColor = (status: string) => {
		return status === "active" ? "bg-green-500/80" : "bg-red-500/80";
	};

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-xl border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
					<DialogHeader className="border-b border-cyan-500/10 pb-4">
						<DialogTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
							User Details
						</DialogTitle>
						<DialogDescription className="text-cyan-300/70 mt-1">
							Manage and view user information
						</DialogDescription>
					</DialogHeader>

					{loading ? (
						<div className="flex flex-col items-center justify-center py-16">
							<div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin mb-4"></div>
							<p className="text-cyan-300/60">Loading user details...</p>
						</div>
					) : user ? (
						<div className="space-y-6 py-6">
							{/* User Info Card */}
							<div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors">
								<div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-6 py-4 border-b border-cyan-500/10">
									<h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
										<User className="w-5 h-5" />
										Basic Information
									</h3>
								</div>
								<div className="px-6 py-4">
									<div className="grid grid-cols-2 gap-4">
										{/* Name */}
										<div>
											{isEditing ? (
												<>
													<Label className="text-cyan-300/70 text-xs font-semibold mb-2">
														Full Name
													</Label>
													<Input
														value={editFormData.name || ""}
														onChange={(e) =>
															handleEditChange("name", e.target.value)
														}
														className="bg-slate-700/60 border-cyan-500/30 text-white placeholder-cyan-300/30 focus:border-cyan-500/60 h-9"
													/>
												</>
											) : (
												<>
													<p className="text-cyan-300/70 text-xs font-semibold mb-1">
														Full Name
													</p>
													<p className="text-white font-semibold text-sm">
														{user.name}
													</p>
												</>
											)}
										</div>

										{/* Email */}
										<div>
											{isEditing ? (
												<>
													<Label className="text-cyan-300/70 text-xs font-semibold mb-2">
														Email Address
													</Label>
													<Input
														value={editFormData.email || ""}
														onChange={(e) =>
															handleEditChange("email", e.target.value)
														}
														className="bg-slate-700/60 border-cyan-500/30 text-white placeholder-cyan-300/30 focus:border-cyan-500/60 h-9"
													/>
												</>
											) : (
												<>
													<p className="text-cyan-300/70 text-xs font-semibold mb-1">
														Email Address
													</p>
													<p className="text-white text-sm break-all">
														{user.email}
													</p>
												</>
											)}
										</div>

										{/* Username */}
										<div>
											{isEditing ? (
												<>
													<Label className="text-cyan-300/70 text-xs font-semibold mb-2">
														Username
													</Label>
													<Input
														value={editFormData.username || ""}
														onChange={(e) =>
															handleEditChange("username", e.target.value)
														}
														className="bg-slate-700/60 border-cyan-500/30 text-white placeholder-cyan-300/30 focus:border-cyan-500/60 h-9"
													/>
												</>
											) : (
												<>
													<p className="text-cyan-300/70 text-xs font-semibold mb-1">
														Username
													</p>
													<p className="text-white font-semibold text-sm">
														{user.username}
													</p>
												</>
											)}
										</div>

										{/* Phone */}
										<div>
											{isEditing ? (
												<>
													<Label className="text-cyan-300/70 text-xs font-semibold mb-2">
														Phone Number
													</Label>
													<Input
														value={editFormData.phone || ""}
														onChange={(e) =>
															handleEditChange("phone", e.target.value)
														}
														className="bg-slate-700/60 border-cyan-500/30 text-white placeholder-cyan-300/30 focus:border-cyan-500/60 h-9"
													/>
												</>
											) : (
												<>
													<p className="text-cyan-300/70 text-xs font-semibold mb-1">
														Phone Number
													</p>
													<p className="text-white text-sm">{user.phone}</p>
												</>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Role & Status Card */}
							<div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors">
								<div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-6 py-4 border-b border-cyan-500/10">
									<h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
										<Shield className="w-5 h-5" />
										Role & Status
									</h3>
								</div>
								<div className="px-6 py-4">
									<div className="grid grid-cols-2 gap-4">
										{/* Role */}
										<div>
											{isEditing ? (
												<>
													<Label className="text-cyan-300/70 text-xs font-semibold mb-2">
														User Role
													</Label>
													<Select
														value={editFormData.role || user.role}
														onValueChange={(value) =>
															handleEditChange(
																"role",
																value as "Admin" | "Developer" | "Viewer"
															)
														}>
														<SelectTrigger className="bg-slate-700/60 border-cyan-500/30 text-white focus:border-cyan-500/60 h-9">
															<SelectValue />
														</SelectTrigger>
														<SelectContent className="bg-slate-800 border-cyan-500/30 text-white">
															<SelectItem value="Admin" className="text-white">
																Admin
															</SelectItem>
															<SelectItem
																value="Developer"
																className="text-white">
																Developer
															</SelectItem>
															<SelectItem value="Viewer" className="text-white">
																Viewer
															</SelectItem>
														</SelectContent>
													</Select>
												</>
											) : (
												<>
													<p className="text-cyan-300/70 text-xs font-semibold mb-2">
														User Role
													</p>
													<Badge
														className={`${getRoleColor(
															user.role
														)} text-white px-3 py-1 text-xs font-semibold inline-block`}>
														{user.role}
													</Badge>
												</>
											)}
										</div>

										{/* Status */}
										<div>
											{isEditing ? (
												<>
													<Label className="text-cyan-300/70 text-xs font-semibold mb-2">
														Account Status
													</Label>
													<Select
														value={editFormData.status || user.status}
														onValueChange={(value) =>
															handleEditChange(
																"status",
																value as "active" | "inactive"
															)
														}>
														<SelectTrigger className="bg-slate-700/60 border-cyan-500/30 text-white focus:border-cyan-500/60 h-9">
															<SelectValue />
														</SelectTrigger>
														<SelectContent className="bg-slate-800 border-cyan-500/30 text-white">
															<SelectItem value="active" className="text-white">
																Active
															</SelectItem>
															<SelectItem
																value="inactive"
																className="text-white">
																Inactive
															</SelectItem>
														</SelectContent>
													</Select>
												</>
											) : (
												<>
													<p className="text-cyan-300/70 text-xs font-semibold mb-2">
														Account Status
													</p>
													<Badge
														className={`${getStatusColor(
															user.status
														)} text-white px-3 py-1 text-xs font-semibold inline-flex items-center gap-1`}>
														<span
															className={`w-2 h-2 rounded-full ${
																user.status === "active"
																	? "bg-green-300"
																	: "bg-red-300"
															}`}></span>
														{user.status === "active" ? "Active" : "Inactive"}
													</Badge>
												</>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Metadata Card */}
							<div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors">
								<div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-6 py-4 border-b border-cyan-500/10">
									<h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
										<Calendar className="w-5 h-5" />
										Account Information
									</h3>
								</div>
								<div className="px-6 py-4 space-y-3">
									<div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/20 border border-cyan-500/10 hover:bg-slate-700/30 transition-colors">
										<span className="text-cyan-300 font-semibold flex items-center gap-2">
											<Calendar className="w-4 h-4" />
											Join Date
										</span>
										<span className="text-cyan-100 font-mono">
											{user.joinDate}
										</span>
									</div>
									<div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/20 border border-cyan-500/10 hover:bg-slate-700/30 transition-colors">
										<span className="text-cyan-300 font-semibold">User ID</span>
										<span className="text-cyan-100 text-sm font-mono break-all max-w-xs">
											{user._id}
										</span>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="text-center py-12">
							<div className="text-4xl mb-4">⚠️</div>
							<p className="text-red-400 font-semibold">
								Failed to load user details
							</p>
						</div>
					)}

					<DialogFooter className="border-t border-cyan-500/10 mt-6 pt-4 flex gap-3 justify-end">
						{isEditing ? (
							<>
								<Button
									variant="outline"
									onClick={() => {
										setIsEditing(false);
										setEditFormData(user || {});
									}}
									className="border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-300 font-semibold">
									Cancel
								</Button>
								<Button
									onClick={handleSaveChanges}
									className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/30">
									Save Changes
								</Button>
							</>
						) : (
							<>
								<Button
									variant="destructive"
									onClick={() => setShowDeleteConfirm(true)}
									className="gap-2 bg-red-600/80 hover:bg-red-700 text-white font-semibold"
									disabled={loading}>
									<Trash2 className="w-4 h-4" />
									Delete User
								</Button>
								<Button
									onClick={() => setIsEditing(true)}
									className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30"
									disabled={loading}>
									Edit User
								</Button>
								<Button
									variant="outline"
									onClick={() => onOpenChange(false)}
									className="border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-300 font-semibold">
									Close
								</Button>
							</>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
				<AlertDialogContent className="bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-xl border-red-500/30 shadow-2xl shadow-red-500/20">
					<AlertDialogHeader className="border-b border-red-500/10 pb-4">
						<AlertDialogTitle className="text-2xl font-bold text-red-400 flex items-center gap-2">
							<AlertCircle className="w-6 h-6" />
							Delete User
						</AlertDialogTitle>
						<AlertDialogDescription className="text-cyan-300/70 mt-2 text-base">
							Are you sure you want to permanently delete{" "}
							<span className="font-semibold text-cyan-300">{user?.name}</span>?
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 my-4">
						<p className="text-red-300 text-sm font-semibold">
							⚠️ Warning: All associated data will be permanently removed.
						</p>
					</div>
					<div className="flex gap-3 justify-end pt-2">
						<AlertDialogCancel className="border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-300 font-semibold">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteUser}
							className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-500/30">
							Delete User
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default UserDetailsModal;
