/** @format */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, RotateCw } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/api/axios";
import UserDetailsModal from "@/pages/user/UserDetails";

interface User {
	id: string;
	name: string;
	email: string;
	role: "Admin" | "Developer" | "Viewer";
	status: "active" | "inactive";
	joinDate: string;
}

const UsersTab = () => {
	const location = useLocation();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

	useEffect(() => {
		fetchUsers();
	}, [location]);

	const fetchUsers = async () => {
		try {
			if (!refreshing) setLoading(true);
			const response = await axiosInstance.get("/auth/admin/users");
			if (response.data.success) {
				setUsers(response.data.users);
			}
		} catch (err: any) {
			console.error("Error fetching users:", err);
			toast.error("Failed to fetch users");
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	const handleViewUser = (userId: string) => {
		setSelectedUserId(userId);
		setModalOpen(true);
	};

	const handleUserUpdated = () => {
		fetchUsers();
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		await fetchUsers();
		toast.success("Users list refreshed");
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-500";
			case "inactive":
				return "bg-gray-500";
			default:
				return "bg-blue-500";
		}
	};

	return (
		<>
			<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
				<CardHeader className="border-b border-cyan-500/10">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
								User Management
							</CardTitle>
							<p className="text-sm text-cyan-300/60 mt-2">
								👥 Total Users:{" "}
								<span className="text-cyan-300 font-bold">{users.length}</span>
							</p>
						</div>
						<Button
							size="sm"
							variant="outline"
							onClick={handleRefresh}
							disabled={refreshing}
							className="gap-2 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300">
							<RotateCw
								className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
							/>
							{refreshing ? "Refreshing..." : "Refresh"}
						</Button>
					</div>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="space-y-3">
						{loading ? (
							<p className="text-center text-cyan-300/60 py-8">
								Loading users...
							</p>
						) : users.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-5xl mb-3">🔍</div>
								<p className="text-cyan-300/60">No users found</p>
							</div>
						) : (
							users.map((user) => (
								<div
									key={user.id}
									className="p-4 rounded-xl bg-gradient-to-r from-slate-700/40 to-slate-600/30 hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/30 group">
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<h4 className="font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
												{user.name}
											</h4>
											<p className="text-sm text-cyan-300/60 mt-1">
												📧 {user.email}
											</p>
											<p className="text-xs text-cyan-300/50 mt-2">
												📅 Joined: {user.joinDate}
											</p>
										</div>
										<div className="flex items-center gap-3">
											<Badge
												className={`${
													user.role === "Admin"
														? "bg-purple-500"
														: user.role === "Developer"
														? "bg-blue-500"
														: "bg-gray-500"
												} text-white`}>
												{user.role}
											</Badge>
											<Badge
												className={`${getStatusColor(user.status)} text-white`}>
												{user.status}
											</Badge>
											<Button
												size="sm"
												variant="ghost"
												onClick={() => handleViewUser(user.id)}
												className="hover:bg-cyan-500/20 text-cyan-400">
												<Eye className="w-4 h-4" />
											</Button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			{/* User Details Modal */}
			{selectedUserId && (
				<UserDetailsModal
					open={modalOpen}
					userId={selectedUserId}
					onOpenChange={(newOpen) => {
						setModalOpen(newOpen);
						if (!newOpen) {
							setSelectedUserId(null);
						}
					}}
					onUserUpdated={handleUserUpdated}
				/>
			)}
		</>
	);
};

export default UsersTab;
