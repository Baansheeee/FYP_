/** @format */

import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/authContext";
import axiosInstance from "@/api/axios";
import toast from "react-hot-toast";
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
	Lock,
	Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AdminData {
	_id: string;
	name: string;
	email: string;
	username: string;
	phone: string;
	role: number | string;
	status: string;
	createdAt: string;
	updatedAt?: string;
	permissions?: string[];
}

const AdminProfileTab = () => {
	const { user } = useAuth();
	const [adminData, setAdminData] = useState<AdminData | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		username: "",
		email: "",
	});

	useEffect(() => {
		fetchAdminData();
	}, []);

	const fetchAdminData = async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");

			if (!userId) {
				toast.error("User ID not found");
				return;
			}

			const adminDetailResponse = await axiosInstance.get(
				`/auth/user/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (adminDetailResponse.data.user) {
				setAdminData(adminDetailResponse.data.user);
				setFormData({
					name: adminDetailResponse.data.user.name,
					phone: adminDetailResponse.data.user.phone,
					username: adminDetailResponse.data.user.username,
					email: adminDetailResponse.data.user.email,
				});
			}
		} catch (error: any) {
			console.error("Error fetching admin data:", error);
			toast.error("Failed to load admin profile");
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
		if (adminData) {
			setFormData({
				name: adminData.name,
				phone: adminData.phone,
				username: adminData.username,
				email: adminData.email,
			});
		}
		setIsEditing(false);
	};

	const handleSave = async () => {
		try {
			const response = await axiosInstance.put("/auth/profile", formData);

			if (response.data.success) {
				const updatedAdminData = response.data.updatedUser;
				setAdminData(updatedAdminData);
				setFormData({
					name: updatedAdminData.name,
					phone: updatedAdminData.phone,
					username: updatedAdminData.username,
					email: updatedAdminData.email,
				});
				setIsEditing(false);
				toast.success("Admin profile updated successfully!");

				// Update localStorage with new data
				localStorage.setItem("name", updatedAdminData.name);
				localStorage.setItem("email", updatedAdminData.email);
			} else {
				toast.error(response.data.message || "Failed to update profile");
			}
		} catch (error: any) {
			console.error("Error updating admin profile:", error);
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

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-cyan-300 text-lg">Loading admin profile...</div>
			</div>
		);
	}

	if (!adminData) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-cyan-300 text-lg">No admin data found</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Admin Profile Card */}
			<Card className="bg-slate-800/40 border-cyan-500/20 p-8 backdrop-blur-xl">
				{/* Profile Header with Avatar */}
				<div className="flex items-center justify-between mb-8 pb-8 border-b border-cyan-500/20">
					<div className="flex items-center gap-6">
						<div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
							<Shield className="w-12 h-12 text-white" />
						</div>
						<div>
							<h2 className="text-3xl font-bold text-cyan-300">
								{adminData.name}
							</h2>
							<p className="text-cyan-300/70">@{adminData.username}</p>
							<div className="flex items-center gap-2 mt-2">
								<Lock className="w-4 h-4 text-blue-600" />
								<span className="text-blue-400 font-medium">Admin</span>
							</div>
						</div>
					</div>

					{!isEditing && (
						<Button
							onClick={handleEditClick}
							className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
							<Edit2 className="w-4 h-4" />
							Edit Profile
						</Button>
					)}
				</div>

				{/* Profile Information */}
				<div className="space-y-6">
					{/* Name */}
					<div className="space-y-2">
						<label className="block text-xs font-bold uppercase tracking-wider text-blue-400">
							Full Name
						</label>
						{isEditing ? (
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full px-4 py-2 bg-slate-700 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
								placeholder="Enter your full name"
							/>
						) : (
							<p className="text-cyan-100 text-lg">{adminData.name}</p>
						)}
					</div>

					{/* Email */}
					<div className="space-y-2">
						<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
							<Mail className="w-4 h-4" />
							Email Address
						</label>
						{isEditing ? (
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								className="w-full px-4 py-2 bg-slate-700 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
								placeholder="Enter your email"
							/>
						) : (
							<p className="text-cyan-100 text-lg">{adminData.email}</p>
						)}
					</div>

					{/* Username */}
					<div className="space-y-2">
						<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
							<User className="w-4 h-4" />
							Username
						</label>
						{isEditing ? (
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
								className="w-full px-4 py-2 bg-slate-700 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
								placeholder="Enter your username"
							/>
						) : (
							<p className="text-cyan-100 text-lg">{adminData.username}</p>
						)}
					</div>

					{/* Phone */}
					<div className="space-y-2">
						<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
							<Phone className="w-4 h-4" />
							Phone Number
						</label>
						{isEditing ? (
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								className="w-full px-4 py-2 bg-slate-700 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
								placeholder="Enter your phone number"
							/>
						) : (
							<p className="text-cyan-100 text-lg">{adminData.phone}</p>
						)}
					</div>

					{/* Status */}
					<div className="space-y-2">
						<label className="block text-xs font-bold uppercase tracking-wider text-blue-400">
							Account Status
						</label>
						<div className="flex items-center gap-2">
							<div
								className={`w-3 h-3 rounded-full ${
									adminData.status === "active" ? "bg-green-500" : "bg-red-500"
								}`}></div>
							<p className="text-cyan-100 text-lg capitalize">
								{adminData.status}
							</p>
						</div>
					</div>

					{/* Account Dates */}
					<div className="grid grid-cols-2 gap-6 pt-6 border-t border-cyan-500/20">
						<div className="space-y-2">
							<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
								<Calendar className="w-4 h-4" />
								Member Since
							</label>
							<p className="text-cyan-100 text-lg">
								{formatDate(adminData.createdAt)}
							</p>
						</div>
						{adminData.updatedAt && (
							<div className="space-y-2">
								<label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
									<Clock className="w-4 h-4" />
									Last Updated
								</label>
								<p className="text-cyan-100 text-lg">
									{formatDate(adminData.updatedAt)}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Action Buttons */}
				{isEditing && (
					<div className="flex gap-4 mt-8 pt-8 border-t border-cyan-500/20">
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

			{/* Admin Info Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Account Information */}
				<Card className="bg-slate-800/40 border-cyan-500/20 p-6 backdrop-blur-xl">
					<h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
						<Key className="w-5 h-5 text-blue-600" />
						Account Information
					</h3>
					<div className="space-y-4">
						<div>
							<p className="text-cyan-300/70 text-sm mb-1">Admin ID</p>
							<p className="text-cyan-100 font-mono text-sm break-all">
								{adminData._id}
							</p>
						</div>
						<div>
							<p className="text-cyan-300/70 text-sm mb-1">Role ID</p>
							<p className="text-cyan-100 font-mono text-sm">
								{adminData.role}
							</p>
						</div>
					</div>
				</Card>

				{/* Security Information */}
				<Card className="bg-slate-800/40 border-cyan-500/20 p-6 backdrop-blur-xl">
					<h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
						<Lock className="w-5 h-5 text-blue-600" />
						Security Settings
					</h3>
					<div className="space-y-4">
						<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
							<Key className="w-4 h-4" />
							Change Password
						</Button>
						<Button className="w-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2">
							<Shield className="w-4 h-4" />
							Two-Factor Authentication
						</Button>
					</div>
				</Card>
			</div>

			{/* Admin Permissions */}
			<Card className="bg-blue-500/10 border-blue-500/30 p-6 backdrop-blur-xl">
				<h3 className="text-lg font-semibold text-cyan-300 mb-4">
					Admin Permissions
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded border border-blue-500/20">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-cyan-300">User Management</span>
					</div>
					<div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded border border-blue-500/20">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-cyan-300">Audit Logs</span>
					</div>
					<div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded border border-blue-500/20">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-cyan-300">Compliance</span>
					</div>
					<div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded border border-blue-500/20">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-cyan-300">Architecture</span>
					</div>
					<div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded border border-blue-500/20">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-cyan-300">Lectures</span>
					</div>
					<div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded border border-blue-500/20">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-cyan-300">Community Forum</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default AdminProfileTab;
