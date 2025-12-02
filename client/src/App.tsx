/** @format */

import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./components/context/authContext";
import {
	UserPrivateRoute,
	AdminPrivateRoute,
	AuthenticatedRoute,
} from "./components/PrivateRoutes";
import Index from "./pages/Index";
import Dashboard from "./pages/user/UserDashboard";
import Chatbot from "./pages/user/Chatbot";
import ArchitectureDesigner from "./pages/user/ArchitectureDesigner";
import CostEstimate from "./pages/user/CostEstimate";
import Version from "./pages/user/Version";
import Deployment from "./pages/user/Deployment";
import Canvas from "./pages/user/Canvas";
import ImportResources from "./pages/user/ImportResources";
import DevOps from "./pages/user/DevOps";
import Performance from "./pages/user/Performance";
import Feedback from "./pages/user/Feedback";
import Admin from "./pages/admin/AdminDashboard";
import UserDetails from "./pages/user/UserDetails";
import APIIntegration from "./pages/user/APIIntegration";
import Education from "./pages/user/Education";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import AdminLogin from "./pages/auth/AdminLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<GoogleOAuthProvider
				clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
				<BrowserRouter>
					<AuthProvider>
						<Routes>
							{/* Public Routes */}
							<Route path="/" element={<Index />} />
							<Route path="/pricing" element={<Pricing />} />
							<Route path="/features" element={<Features />} />
							<Route path="/about" element={<AboutUs />} />
							<Route path="/contact" element={<ContactUs />} />
							<Route path="/auth/login" element={<Login />} />
							<Route path="/auth/register" element={<Register />} />
							<Route path="/auth/admin-login" element={<AdminLogin />} />
							<Route
								path="/auth/forgot-password"
								element={<ForgotPassword />}
							/>

							{/* User Private Routes (role: 1) */}
							<Route
								path="/dashboard"
								element={
									<UserPrivateRoute>
										<Dashboard />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/chatbot"
								element={
									<UserPrivateRoute>
										<Chatbot />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/architecture/designer"
								element={
									<UserPrivateRoute>
										<ArchitectureDesigner />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/cost/estimate"
								element={
									<UserPrivateRoute>
										<CostEstimate />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/version"
								element={
									<UserPrivateRoute>
										<Version />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/deployment"
								element={
									<UserPrivateRoute>
										<Deployment />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/canvas"
								element={
									<UserPrivateRoute>
										<Canvas />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/import/connect"
								element={
									<UserPrivateRoute>
										<ImportResources />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/devops/docker"
								element={
									<UserPrivateRoute>
										<DevOps />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/performance/dashboard"
								element={
									<UserPrivateRoute>
										<Performance />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/feedback/rate"
								element={
									<UserPrivateRoute>
										<Feedback />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/api/integrations"
								element={
									<UserPrivateRoute>
										<APIIntegration />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/education/tutorials"
								element={
									<UserPrivateRoute>
										<Education />
									</UserPrivateRoute>
								}
							/>

							{/* Admin Private Routes (role: 2) */}
							<Route
								path="/admin"
								element={
									<AdminPrivateRoute>
										<Admin />
									</AdminPrivateRoute>
								}
							/>
							<Route
								path="/user/:userId"
								element={
									<AdminPrivateRoute>
										<UserDetails />
									</AdminPrivateRoute>
								}
							/>

							{/* Catch-all */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</AuthProvider>
				</BrowserRouter>
			</GoogleOAuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
