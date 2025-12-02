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
import axiosInstance from "@/api/axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../components/context/authContext"; // <-- import AuthContext
import FormToggle from "@/components/forms/FormToggle";

const Register = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	if (!authContext)
		throw new Error("AuthContext must be used within AuthProvider");
	const { login } = authContext;

	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		phone: "",
		password: "",
		answer: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const carouselItems = [
		{
			image: "/images/aws_Image1.jpeg",
			heading: "Design your AWS Cloud Infrastructure",
			description:
				"Visualize and deploy your AWS cloud resources in real-time with ease and accuracy.",
		},
		{
			image: "/images/aws_Image2.jpeg",
			heading: "Monitor Your Data Centers",
			description:
				"Get a complete view of your global AWS data centers and network status.",
		},
		{
			image: "/images/aws_Image3.jpeg",
			heading: "Build Scalable Cloud Solutions",
			description:
				"Use Brainboard to design scalable, secure, and reliable cloud architectures quickly.",
		},
	];

	const validateForm = () => {
		const newErrors: Record<string, string> = {};
		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.username.trim()) newErrors.username = "Username is required";
		if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
			newErrors.email = "Valid email is required";
		if (!formData.phone || !/^[0-9+\-\s()]+$/.test(formData.phone))
			newErrors.phone = "Valid phone number is required";
		if (!formData.password || formData.password.length < 6)
			newErrors.password = "Password must be at least 6 characters";
		if (!formData.answer.trim()) newErrors.answer = "Answer is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
		// Clear error for this field when user starts typing
		if (errors[id]) {
			setErrors({ ...errors, [id]: "" });
		}
	};

	// ---------------- Email/Password Registration ----------------
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		try {
			const { data } = await axiosInstance.post("/auth/register", formData);
			toast.success(data.message);

			// Save in AuthContext & localStorage
			login({
				token: data.token,
				role: data.user.role,
				name: data.user.name,
				email: data.user.email,
			});

			// Navigate to dashboard
			navigate("/dashboard");
		} catch (err: any) {
			toast.error(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	// ---------------- Google Login ----------------
	const handleGoogleLogin = async (response: CredentialResponse) => {
		if (!response.credential) return;
		setLoading(true);
		try {
			const { data } = await axiosInstance.post("/auth/google-login", {
				tokenId: response.credential,
			});
			toast.success("Google login successful");

			// Google login is always role=1
			login({
				token: data.token,
				role: 1,
				name: data.user.name,
				email: data.user.email,
			});

			// Navigate to dashboard
			navigate("/dashboard");
		} catch (err: any) {
			console.error(err);
			toast.error(err.response?.data?.message || "Google login failed");
		} finally {
			setLoading(false);
		}
	};

	// ---------------- Carousel ----------------
	const nextImage = () =>
		setCurrentImageIndex((prev) => (prev + 1) % carouselItems.length);
	const prevImage = () =>
		setCurrentImageIndex(
			(prev) => (prev - 1 + carouselItems.length) % carouselItems.length
		);

	return (
		<div className="min-h-screen bg-white">
			<div className="grid grid-cols-2 min-h-screen">
				{/* Left Column - Form */}
				<div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
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

						{/* Heading */}
						<div className="space-y-3">
							<h1 className="text-4xl font-bold text-gray-900">
								Welcome to AWSOME
							</h1>
							<p className="text-gray-500 text-lg">
								Let's get started with your 21-day free trial. Select your
								sign-up method
							</p>
						</div>

						{/* Google Sign-In */}
						<GoogleLogin
							onSuccess={handleGoogleLogin}
							onError={() => toast.error("Google login failed")}
						/>

						{/* Divider */}
						<div className="flex items-center gap-4">
							<div className="flex-1 h-px bg-gray-200"></div>
							<span className="text-gray-400 text-sm">
								or continue with email
							</span>
							<div className="flex-1 h-px bg-gray-200"></div>
						</div>

						{/* Form */}
						<form className="space-y-4" onSubmit={handleSubmit}>
							{["name", "username", "email", "phone", "password", "answer"].map(
								(field) => (
									<div key={field} className="space-y-2">
										<Label
											htmlFor={field}
											className="text-gray-700 font-medium">
											{field.charAt(0).toUpperCase() + field.slice(1)}
											<span className="text-red-500">*</span>
										</Label>
										{field === "password" ? (
											<div className="relative">
												<Input
													id={field}
													type={showPassword ? "text" : "password"}
													placeholder="••••••••"
													className={`h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300 pr-12 ${
														errors[field] ? "border-red-500" : ""
													}`}
													value={formData[field as keyof typeof formData]}
													onChange={handleChange}
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
										) : (
											<Input
												id={field}
												type="text"
												placeholder={
													field === "answer"
														? "Who is your idol?"
														: `Enter your ${field}`
												}
												className={`h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300 ${
													errors[field] ? "border-red-500" : ""
												}`}
												value={formData[field as keyof typeof formData]}
												onChange={handleChange}
												disabled={loading}
											/>
										)}
										{errors[field] && (
											<p className="text-red-500 text-sm">{errors[field]}</p>
										)}
									</div>
								)
							)}
							<Button
								disabled={loading}
								className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{loading ? "Creating Account..." : "Create Account"}
							</Button>
							<div className="flex justify-center items-center gap-2 text-sm text-gray-600">
								<span>Already have an account?</span>
								<a
									href="/auth/login"
									className="font-semibold text-purple-600 hover:text-purple-700 hover:underline underline-offset-2 transition-all duration-200">
									Sign in
								</a>
							</div>
						</form>
					</div>
				</div>

				{/* Right Column - Carousel */}
				<div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden">
					<div className="absolute inset-0 opacity-20">
						<div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
						<div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
					</div>

					<div className="relative z-10 w-full max-w-md space-y-8">
						<div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
							{carouselItems.map((item, index) => (
								<img
									key={index}
									src={item.image || "/placeholder.svg"}
									alt={`Carousel slide ${index + 1}`}
									className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
										index === currentImageIndex ? "opacity-100" : "opacity-0"
									}`}
								/>
							))}
						</div>
						<div className="text-center space-y-3 text-white">
							<h2 className="text-2xl font-bold">
								{carouselItems[currentImageIndex].heading}
							</h2>
							<p className="text-purple-100 text-sm leading-relaxed">
								{carouselItems[currentImageIndex].description}
							</p>
						</div>
						<div className="flex items-center justify-center gap-6 pt-4">
							<button
								onClick={prevImage}
								className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110">
								<ChevronLeft className="w-5 h-5" />
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
								className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110">
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
