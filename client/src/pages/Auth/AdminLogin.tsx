/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

"use client";

import { useState, useContext } from "react";
import { ChevronLeft, ChevronRight, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/api/axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AuthContext } from "../../components/context/authContext";
import RoleToggle from "../../components/RoleToggle";

const AdminLogin = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const isAdmin = location.pathname.includes("admin");
	const authContext = useContext(AuthContext);

	if (!authContext)
		throw new Error("AuthContext must be used within AuthProvider");
	const { login } = authContext;

	const carouselItems = [
		{
			image: "/images/aws_Image1.jpeg",
			heading: "Design your AWS Cloud Infrastructure",
			description: "Visualize and deploy AWS resources with ease.",
		},
		{
			image: "/images/aws_Image2.jpeg",
			heading: "Monitor Your Data Centers",
			description: "Global real-time monitoring of your infrastructure.",
		},
		{
			image: "/images/aws_Image3.jpeg",
			heading: "Build Scalable Cloud Solutions",
			description: "Create scalable, secure and reliable cloud architectures.",
		},
	];

	const nextImage = () =>
		setCurrentImageIndex((prev) => (prev + 1) % carouselItems.length);
	const prevImage = () =>
		setCurrentImageIndex(
			(prev) => (prev - 1 + carouselItems.length) % carouselItems.length
		);

	// Email/Password or Admin login
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const isAdmin = location.pathname.includes("admin");

		try {
			const endpoint = isAdmin ? "/auth/admin-login" : "/auth/login";
			const payload = isAdmin ? { name, password } : { email, password };

			const { data } = await axiosInstance.post(endpoint, payload);

			toast.success(
				isAdmin ? "Admin login successful ⚡" : "Login successful 🎉"
			);

			// normalize response: admin responses include `admin`, user responses include `user`
			const userObj = data.admin || data.user || {};
			const token = data.token || userObj.token;
			const role = userObj.role || (isAdmin ? 2 : 1);
			const userName = userObj.name || (isAdmin ? name : undefined);
			const userEmail = userObj.email || (isAdmin ? undefined : email);

			login({ token, role, name: userName, email: userEmail });

			navigate(role === 2 ? "/admin" : "/dashboard");
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Login failed ❌");
		}
	};

	// Google Login
	const handleGoogleLogin = async (response: CredentialResponse) => {
		if (!response.credential) return;

		try {
			const { data } = await axiosInstance.post("/auth/google-login", {
				tokenId: response.credential,
			});
			toast.success("Google Login successful ⚡");

			login({ token: data.token, role: 1, name: data.name, email: data.email });
			navigate("/dashboard");
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Google login failed ❌");
		}
	};

	return (
		<div className="min-h-screen bg-white relative">
			{/* GLOBAL TOASTER — placed once at root */}
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

			<div className="grid grid-cols-2 min-h-screen">
				{/* Left Column */}
				<div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
					<div className="max-w-md mx-auto w-full space-y-8">
						{/* Logo */}
						<button onClick={() => navigate("/")}>
							<div className="flex items-center gap-2">
								<div className="w-14 h-14 rounded-xl gradient-purple flex items-center justify-center shadow-lg group-hover:shadow-purple-glow transition-all duration-300">
									<Cloud className="w-9 h-9 text-white" />
								</div>
								<span className="text-3xl font-bold text-gradient">AWSOME</span>
							</div>
						</button>

						<div className="space-y-3">
							<h1 className="text-4xl font-bold text-gray-900">Welcome back</h1>
							<p className="text-gray-500 text-lg">Sign in to your account</p>
						</div>

						<RoleToggle />

						{/* Divider */}
						<div className="flex items-center gap-4">
							<div className="flex-1 h-px bg-gray-200"></div>
							<span className="text-gray-400 text-sm"></span>
							<div className="flex-1 h-px bg-gray-200"></div>
						</div>

						{/* Email/Password Form */}
						<form className="space-y-6" onSubmit={handleLogin}>
							<div className="space-y-2">
								<Label className="text-gray-700 font-medium">
									{isAdmin ? "Name" : "Email"}
								</Label>
								<Input
									type={isAdmin ? "text" : "email"}
									placeholder={isAdmin ? "admin name" : "you@example.com"}
									className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500"
									value={isAdmin ? name : email}
									onChange={(e) =>
										isAdmin ? setName(e.target.value) : setEmail(e.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label className="text-gray-700 font-medium">Password</Label>
								<Input
									type="password"
									placeholder="••••••••"
									className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg">
								Sign In
							</Button>
						</form>
					</div>
				</div>

				{/* Right Column (Carousel) */}
				<div className="bg-gradient-to-br from-purple-500 to-purple-700 p-12 flex flex-col items-center justify-center relative overflow-hidden">
					<div className="absolute inset-0 opacity-20">
						<div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
						<div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
					</div>

					<div className="relative z-10 w-full max-w-md space-y-8">
						<div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
							{carouselItems.map((item, index) => (
								<img
									key={index}
									src={item.image}
									alt={item.heading}
									className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
										index === currentImageIndex ? "opacity-100" : "opacity-0"
									}`}
								/>
							))}
						</div>

						<div className="text-center text-white space-y-2">
							<h2 className="text-2xl font-bold">
								{carouselItems[currentImageIndex].heading}
							</h2>
							<p className="text-purple-100 text-sm">
								{carouselItems[currentImageIndex].description}
							</p>
						</div>

						<div className="flex items-center justify-center gap-6">
							<button
								onClick={prevImage}
								className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20">
								<ChevronLeft />
							</button>

							<div className="flex gap-2">
								{carouselItems.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										className={`w-2 h-2 rounded-full transition-all ${
											index === currentImageIndex
												? "bg-white w-6"
												: "bg-white/50"
										}`}
									/>
								))}
							</div>

							<button
								onClick={nextImage}
								className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20">
								<ChevronRight />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
