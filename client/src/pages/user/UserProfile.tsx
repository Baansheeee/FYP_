/** @format */

import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import axiosInstance from "@/api/axios";
import toast, { Toaster } from "react-hot-toast";
import {
	Mail,
	Phone,
	User,
	Edit2,
	Save,
	X,
	Calendar,
	Shield,
	Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface UserData {
	_id: string;
	name: string;
	email: string;
	username: string;
	phone: string;
	role: number | string;
	status: string;
	createdAt: string;
	updatedAt?: string;
}

const UserProfile = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		username: "",
		email: "",
	});

	useEffect(() => {
		if (!user?.token) {
			navigate("/login");
			return;
		}

		// Redirect admins to admin profile
		if (user.role === 2) {
			navigate("/admin/profile");
			return;
		}

		fetchUserData();
	}, [user, navigate]);

	const fetchUserData = async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");

			if (!userId) {
				toast.error("User ID not found. Please log in again.");
				navigate("/login");
				return;
			}

			const userDetailResponse = await axiosInstance.get(
				`/auth/user/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (userDetailResponse.data.user) {
				setUserData(userDetailResponse.data.user);
				setFormData({
					name: userDetailResponse.data.user.name,
					phone: userDetailResponse.data.user.phone,
					username: userDetailResponse.data.user.username,
					email: userDetailResponse.data.user.email,
				});
			}
		} catch (error: any) {
			console.error("Error fetching user data:", error);
			if (error.response?.status === 401) {
				toast.error("Session expired. Please log in again.");
				navigate("/login");
			} else {
				toast.error("Failed to load user profile");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		if (userData) {
			setFormData({
				name: userData.name,
				phone: userData.phone,
				username: userData.username,
				email: userData.email,
			});
		}
		setIsEditing(false);
	};

	const handleSave = async () => {
		try {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");

			if (!userId) {
				toast.error("User ID not found");
				return;
			}

			const response = await axiosInstance.put("/auth/profile", formData);

			if (response.data.success) {
				const updatedUserData = response.data.updatedUser;
				setUserData(updatedUserData);
				setFormData({
					name: updatedUserData.name,
					phone: updatedUserData.phone,
					username: updatedUserData.username,
					email: updatedUserData.email,
				});
				setIsEditing(false);
				toast.success("Profile updated successfully!");

				// Update localStorage with new data
				localStorage.setItem("name", updatedUserData.name);
				localStorage.setItem("email", updatedUserData.email);
			} else {
				toast.error(response.data.message || "Failed to update profile");
			}
		} catch (error: any) {
			console.error("Error updating profile:", error);
			toast.error(error.response?.data?.message || "Failed to update profile");
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getRoleLabel = (role: number | string) => {
		if (typeof role === "string") {
			return role;
		}
		return role === 1 ? "User" : role === 2 ? "Admin" : "Unknown";
	};

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
				<div className="text-white text-xl">Loading profile...</div>
			</div>
		);
	}

	if (!userData) {
		return (
			<div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
				<div className="text-white text-xl">No user data found</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 1000,
					style: {
						background: "#1f1f1f",
						color: "#fff",
						padding: "12px 16px",
						borderRadius: "10px",
						fontSize: "14px",
					},
					success: {
						style: { background: "#22c55e" },
					},
					error: {
						style: { background: "#ef4444" },
					},
				}}
			/>
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="mb-8">
							<h1 className="text-4xl font-bold text-gray-950 mb-2">
								My Profile
							</h1>
							<p className="text-gray-700">
								Manage your account information and preferences
							</p>
						</div>{" "}
						{/* Profile Card */}
						<Card className="bg-white border-gray-200 p-8 shadow-md">
							{/* Profile Header with Avatar */}
							<div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
								<div className="flex items-center gap-6">
									<div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
										<User className="w-12 h-12 text-white" />
									</div>
									<div>
										<h2 className="text-3xl font-bold text-gray-950">
											{userData.name}
										</h2>
										<p className="text-gray-700">@{userData.username}</p>
										<div className="flex items-center gap-2 mt-2">
											<Shield className="w-4 h-4 text-purple-600" />
											<span className="text-purple-600 font-medium">
												{getRoleLabel(userData.role)}
											</span>
										</div>
									</div>
								</div>

								{!isEditing && (
									<Button
										onClick={handleEditClick}
										className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
										<Edit2 className="w-4 h-4" />
										Edit Profile
									</Button>
								)}
							</div>

							{/* Profile Information */}
							<div className="space-y-6">
								{/* Name */}
								<div className="space-y-2">
									<label className="block text-xs font-bold uppercase tracking-wider text-purple-700">
										Full Name
									</label>
									{isEditing ? (
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
											placeholder="Enter your full name"
										/>
									) : (
										<p className="text-gray-950 text-lg">{userData.name}</p>
									)}
								</div>{" "}
								{/* Email */}
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
										<Mail className="w-4 h-4" />
										Email Address
									</label>
									{isEditing ? (
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
											placeholder="Enter your email"
										/>
									) : (
										<p className="text-gray-950 text-lg">{userData.email}</p>
									)}
								</div>
								{/* Username */}
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
										<User className="w-4 h-4" />
										Username
									</label>
									{isEditing ? (
										<input
											type="text"
											name="username"
											value={formData.username}
											onChange={handleInputChange}
											className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
											placeholder="Enter your username"
										/>
									) : (
										<p className="text-gray-950 text-lg">{userData.username}</p>
									)}
								</div>
								{/* Phone */}
								<div className="space-y-2">
									<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
										<Phone className="w-4 h-4" />
										Phone Number
									</label>
									{isEditing ? (
										<input
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
											placeholder="Enter your phone number"
										/>
									) : (
										<p className="text-gray-950 text-lg">{userData.phone}</p>
									)}
								</div>
								{/* Status */}
								<div className="space-y-2">
									<label className="block text-xs font-bold uppercase tracking-wider text-purple-700">
										Account Status
									</label>
									<div className="flex items-center gap-2">
										<div
											className={`w-3 h-3 rounded-full ${
												userData.status === "active"
													? "bg-green-500"
													: "bg-red-500"
											}`}></div>
										<p className="text-gray-950 text-lg capitalize">
											{userData.status}
										</p>
									</div>
								</div>
								{/* Account Dates */}
								<div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
									<div className="space-y-2">
										<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
											<Calendar className="w-4 h-4" />
											Member Since
										</label>
										<p className="text-gray-950 text-lg">
											{formatDate(userData.createdAt)}
										</p>
									</div>
									{userData.updatedAt && (
										<div className="space-y-2">
											<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
												<Clock className="w-4 h-4" />
												Last Updated
											</label>
											<p className="text-gray-950 text-lg">
												{formatDate(userData.updatedAt)}
											</p>
										</div>
									)}
								</div>
							</div>

							{/* Action Buttons */}
							{isEditing && (
								<div className="flex gap-4 mt-8 pt-8 border-t border-slate-700">
									<Button
										onClick={handleSave}
										className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">
										<Save className="w-4 h-4" />
										Save Changes
									</Button>
									<Button
										onClick={handleCancel}
										className="flex-1 bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2">
										<X className="w-4 h-4" />
										Cancel
									</Button>
								</div>
							)}
						</Card>
						{/* Additional Info */}
						<div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
							<h3 className="text-lg font-semibold text-gray-950 mb-4">
								Account Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<p className="text-gray-600 text-sm mb-1">User ID</p>
									<p className="text-gray-950 font-mono text-sm">
										{userData._id}
									</p>
								</div>
								<div>
									<p className="text-gray-600 text-sm mb-1">Role ID</p>
									<p className="text-gray-950 font-mono text-sm">
										{userData.role}
									</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default UserProfile;
