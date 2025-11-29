/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, User, Calendar, Shield, Phone } from "lucide-react";
import axiosInstance from "@/api/axios";
import toast, { Toaster } from "react-hot-toast";

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
				setUser({
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
					status: "active",
				});
			}
		} catch (err: any) {
			console.error("Error fetching user details:", err);
			toast.error(
				err.response?.data?.message || "Failed to fetch user details"
			);
			navigate("/admin/users");
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
							<Button disabled className="ml-auto gradient-purple text-white">
								Edit User
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default UserDetailsPage;
