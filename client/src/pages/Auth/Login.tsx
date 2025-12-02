/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

"use client";

import { useState, useContext } from "react";
import { ChevronLeft, ChevronRight, Cloud, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/api/axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AuthContext } from "../../components/context/authContext";
import RoleToggle from "@/components/RoleToggle";
import FormToggle from "@/components/forms/FormToggle";

const LoginPage = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{}
	);
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	if (!authContext)
		throw new Error("AuthContext must be used within AuthProvider");
	const { login } = authContext;

	// Validation logic
	const validateForm = () => {
		const newErrors: { email?: string; password?: string } = {};
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!password || password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

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

	// Email/Password login
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		try {
			const { data } = await axiosInstance.post("/auth/login", {
				email,
				password,
			});
			console.log(data);
			toast.success("Login successful 🎉");

			login({
				token: data.token,
				role: data.user.role,
				name: data.user.name,
				email: data.user.email,
			});
			// Flag for dashboard welcome toast
			sessionStorage.setItem("loginWelcome", "true");

			navigate(data.user.role === 2 ? "/admin" : "/dashboard");
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Login failed ❌");
		} finally {
			setLoading(false);
		}
	};

	// Google Login
	const handleGoogleLogin = async (response: CredentialResponse) => {
		if (!response.credential) return;

		setLoading(true);
		try {
			// Decode JWT to get profile picture
			const base64Url = response.credential.split(".")[1];
			const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split("")
					.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
					.join("")
			);
			const googlePayload = JSON.parse(jsonPayload);

			const { data } = await axiosInstance.post("/auth/google-login", {
				tokenId: response.credential,
			});
			toast.success("Google Login successful ⚡");

			login({
				token: data.token,
				role: 1,
				name: data.user.name,
				email: data.user.email,
				googleProfilePicture: googlePayload.picture,
			});

			// Store Google profile picture in localStorage
			if (googlePayload.picture) {
				localStorage.setItem("googleProfilePicture", googlePayload.picture);
			}

			navigate("/dashboard");
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Google login failed ❌");
		} finally {
			setLoading(false);
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

						<GoogleLogin
							onSuccess={handleGoogleLogin}
							onError={() => toast.error("Google login failed")}
						/>

						<div className="flex items-center gap-4">
							<div className="flex-1 h-px bg-gray-200"></div>
							<span className="text-gray-400 text-sm">
								or continue with Email
							</span>
							<div className="flex-1 h-px bg-gray-200"></div>
						</div>

						{/* Email/Password Form */}
						<form className="space-y-6" onSubmit={handleLogin}>
							<div className="space-y-2">
								<Label className="text-gray-700 font-medium">Email</Label>
								<Input
									type="email"
									placeholder="you@example.com"
									className={`h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 ${
										errors.email ? "border-red-500" : ""
									}`}
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (errors.email)
											setErrors({ ...errors, email: undefined });
									}}
									disabled={loading}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm">{errors.email}</p>
								)}
							</div>
							<div className="space-y-2">
								<Label className="text-gray-700 font-medium">Password</Label>
								<div className="relative">
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="••••••••"
										className={`h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 pr-12 ${
											errors.password ? "border-red-500" : ""
										}`}
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
											if (errors.password)
												setErrors({ ...errors, password: undefined });
										}}
										disabled={loading}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
										disabled={loading}>
										{showPassword ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="text-red-500 text-sm">{errors.password}</p>
								)}
							</div>{" "}
							<div className="flex justify-end">
								<a
									href="/auth/forgot-password"
									className="text-purple-500 text-sm hover:text-purple-600 transition-colors">
									Forgot password?
								</a>
							</div>
							<Button
								disabled={loading}
								className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{loading ? "Signing in..." : "Sign In"}
							</Button>
							<div className="flex justify-center items-center gap-2 text-sm text-gray-600">
								<span>Don't have an account?</span>
								<a
									href="/auth/register"
									className="font-semibold text-purple-600 hover:text-purple-700 hover:underline underline-offset-2 transition-all duration-200">
									Sign up
								</a>
							</div>
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

export default LoginPage;
