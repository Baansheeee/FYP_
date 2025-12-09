/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

"use client";

import { useState, useContext } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AuthContext } from "../../components/context/authContext";
import RoleToggle from "@/components/RoleToggle";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import Logo from "@/components/Logo";

const AdminLogin = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
		setErrors({}); // Clear previous errors
		const isAdmin = location.pathname.includes("admin");
		const newErrors: { [key: string]: string } = {};

		// Validation
		if (isAdmin && !name.trim()) {
			newErrors.name = "Name is required";
		}
		if (!isAdmin && !email.trim()) {
			newErrors.email = "Email is required";
		} else if (!isAdmin && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!password.trim()) {
			newErrors.password = "Password is required";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const endpoint = isAdmin ? "/auth/admin-login" : "/auth/login";
			const payload = isAdmin ? { name, password } : { email, password };

			const { data } = await axiosInstance.post(endpoint, payload);

			// normalize response: admin responses include `admin`, user responses include `user`
			const userObj = data.admin || data.user || {};
			const token = data.token || userObj.token;

			// Convert role string to numeric: "Admin"→2, else→1
			const roleValue = userObj.role || (isAdmin ? 2 : 1);
			const roleMap: { [key: string]: 1 | 2 } = {
				Admin: 2,
				Developer: 1,
				Viewer: 1,
			};
			const role: 1 | 2 =
				typeof roleValue === "string"
					? roleMap[roleValue] || 1
					: roleValue === 2
					? 2
					: 1;

			const validRole = role === 2 ? 2 : 1;
			const userName = userObj.name || (isAdmin ? name : undefined);
			const userEmail = userObj.email || (isAdmin ? undefined : email);
			const userId = userObj._id || (isAdmin ? userObj._id : undefined);

			login({
				token,
				role: validRole,
				name: userName,
				email: userEmail,
				userId,
			});

			navigate(validRole === 2 ? "/admin" : "/dashboard");
		} catch (err: any) {
			const errorMessage = err.response?.data?.message;

			if (errorMessage?.toLowerCase().includes("not found")) {
				setErrors({
					[isAdmin ? "name" : "email"]:
						"Account not found. Please check your credentials.",
				});
			} else if (errorMessage?.toLowerCase().includes("password")) {
				setErrors({ password: "Invalid password. Please try again." });
			} else if (errorMessage?.toLowerCase().includes("unauthorized")) {
				setErrors({
					password: "You are not authorized to access this panel.",
				});
			} else {
				setErrors({
					form: errorMessage || "Login failed",
				});
			}
		}
	}; // Google Login
	const handleGoogleLogin = async (response: CredentialResponse) => {
		if (!response.credential) return;
		setErrors({}); // Clear errors on Google login attempt

		try {
			const { data } = await axiosInstance.post("/auth/google-login", {
				tokenId: response.credential,
			});

			login({
				token: data.token,
				role: 1,
				name: data.user.name,
				email: data.user.email,
			});
			navigate("/dashboard");
		} catch (err: any) {
			const errorMessage = err.response?.data?.message?.toLowerCase() || "";

			if (
				errorMessage.includes("network") ||
				errorMessage.includes("connect")
			) {
				setErrors({
					form: "Network error. Please check your connection.",
				});
			} else if (errorMessage.includes("not found")) {
				setErrors({
					form: "Google account not found in our system.",
				});
			} else if (errorMessage.includes("invalid")) {
				setErrors({
					form: "Invalid Google credentials. Please try again.",
				});
			} else {
				setErrors({
					form: "Google login failed. Please try again.",
				});
			}
		}
	};

	return (
		<div className="min-h-screen bg-white relative">
			<div className="grid grid-cols-2 min-h-screen">
				{/* Left Column */}
				<div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
					<div className="max-w-md mx-auto w-full space-y-8">
						{/* Logo */}
						<button onClick={() => navigate("/")}>
							<div className="flex items-center gap-2">
								<div className="w-14 h-14 rounded-xl gradient-purple flex items-center justify-center shadow-lg group-hover:shadow-purple-glow transition-all duration-300">
									<Logo />
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
							<span className="text-gray-400 text-sm">Admin Panel Login</span>
							<div className="flex-1 h-px bg-gray-200"></div>
						</div>
						{/* Email/Password Form */}
						<form className="space-y-5" onSubmit={handleLogin}>
							<div className="form-field">
								<FloatingLabelInput
									type={isAdmin ? "text" : "email"}
									label={isAdmin ? "Name" : "Email"}
									value={isAdmin ? name : email}
									onChange={(e) => {
										if (isAdmin) {
											setName(e.target.value);
										} else {
											setEmail(e.target.value);
										}
										// Clear error when user starts typing
										if (errors[isAdmin ? "name" : "email"]) {
											setErrors({
												...errors,
												[isAdmin ? "name" : "email"]: "",
											});
										}
									}}
									error={errors[isAdmin ? "name" : "email"]}
								/>
							</div>

							<div className="form-field relative">
								<FloatingLabelInput
									type={showPassword ? "text" : "password"}
									label="Password"
									placeholder=""
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										// Clear error when user starts typing
										if (errors.password) {
											setErrors({ ...errors, password: "" });
										}
									}}
									error={errors.password}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
									tabIndex={-1}>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>

							{errors.form && (
								<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
									<p className="text-red-600 text-sm font-medium">
										{errors.form}
									</p>
								</div>
							)}

							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed form-field">
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
