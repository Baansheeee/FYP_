/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/api/axios";

interface User {
	id: string;
	name: string;
	email: string;
	role: "Admin" | "Developer" | "Viewer";
	status: "active" | "inactive";
	joinDate: string;
}

const UsersTab = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/auth/admin/users");
			if (response.data.success) {
				setUsers(response.data.users);
			}
		} catch (err: any) {
			console.error("Error fetching users:", err);
			toast.error("Failed to fetch users");
		} finally {
			setLoading(false);
		}
	};

	const handleViewUser = (userId: string) => {
		navigate(`/user/${userId}`);
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
		<Card className="glass-card border-border/50">
			<CardHeader>
				<div>
					<CardTitle>User Management</CardTitle>
					<p className="text-sm text-muted-foreground mt-1">
						Total Users: {users.length}
					</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{loading ? (
						<p className="text-center text-muted-foreground py-8">
							Loading users...
						</p>
					) : users.length === 0 ? (
						<p className="text-center text-muted-foreground py-8">
							No users found
						</p>
					) : (
						users.map((user) => (
							<div
								key={user.id}
								className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<h4 className="font-semibold">{user.name}</h4>
										<p className="text-sm text-muted-foreground">
											{user.email}
										</p>
										<p className="text-xs text-muted-foreground mt-1">
											Joined: {user.joinDate}
										</p>
									</div>
									<div className="flex items-center gap-3">
										<Badge
											variant={user.role === "Admin" ? "default" : "secondary"}>
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
											className="hover:bg-purple-500/20">
											<Eye className="w-4 h-4 text-purple-500" />
										</Button>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default UsersTab;
