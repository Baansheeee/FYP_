/** @format */

import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./components/context/authContext";
import {
	UserPrivateRoute,
	AdminPrivateRoute,
	AuthenticatedRoute,
} from "./components/PrivateRoutes";
import "./styles/reactflow.css";
import Index from "./pages/Index";
import UserDashboard from "./pages/user/UserDashboard";
import Chatbot from "./pages/user/Chatbot";
import ArchitectureDesigner from "./pages/user/architecture/ArchitectureDesigner";
import CostEstimate from "./pages/user/CostEstimate";
import Version from "./pages/user/Version";
import Deployment from "./pages/user/Deployment";
// import Canvas from "./pages/user/architecture/Canvas";
import ImportResources from "./pages/user/ImportResources";
import DevOps from "./pages/user/DevOps";
import Performance from "./pages/user/Performance";
import Feedback from "./pages/user/Feedback";
import AdminDashboard from "./pages/admin/AdminDashboard";
import APIIntegration from "./pages/user/APIIntegration";
import Education from "./pages/user/Education";
import EducationTutorials from "./pages/user/education/EducationTutorials";
import EducationDocs from "./pages/user/education/EducationDocs";
import EducationVideos from "./pages/user/education/EducationVideos";
import EducationFAQs from "./pages/user/education/EducationFAQs";
import EducationCommunity from "./pages/user/education/EducationCommunity";
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

import ChatHistory from "./pages/user/chatbot/ChatHistory";
import ChatTemplates from "./pages/user/chatbot/ChatTemplates";
import ChatSessions from "./pages/user/chatbot/ChatSessions";

import ArchitectureList from "./pages/user/architecture/ArchitectureList";
import ArchitectureEditor from "./pages/user/architecture/ArchitectureEditor";
import ArchitectureCreate from "./pages/user/architecture/ArchitectureCreate";
import ArchitectureTemplates from "./pages/user/architecture/ArchitectureTemplates";
import ArchitectureDetails from "./pages/user/architecture/ArchitectureDetails";

import CostAnalysis from "./pages/user/cost/CostAnalysis";
import CostReports from "./pages/user/cost/CostReports";
import BudgetAlerts from "./pages/user/cost/BudgetAlerts";

import DeploymentHistory from "./pages/user/deployment/DeploymentHistory";
import DeploymentStatus from "./pages/user/deployment/DeploymentStatus";
import RollbackManager from "./pages/user/deployment/RollbackManager";

import VersionHistory from "./pages/user/version/VersionHistory";
import VersionCompare from "./pages/user/version/VersionCompare";
import VersionRestore from "./pages/user/version/VersionRestore";

import ContainerManager from "./pages/user/devops/ContainerManager";
import PipelineConfig from "./pages/user/devops/PipelineConfig";
import LogViewer from "./pages/user/devops/LogViewer";

import MetricsViewer from "./pages/user/performance/MetricsViewer";
import HealthCheck from "./pages/user/performance/HealthCheck";
import AlertsManagement from "./pages/user/performance/AlertsManagement";

const queryClient = new QueryClient();

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<GoogleOAuthProvider
				clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
				<BrowserRouter>
					<ScrollToTop />
					<AuthProvider>
						<Routes>
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
							<Route
								path="/user/dashboard"
								element={
									<UserPrivateRoute>
										<UserDashboard />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/chatbot"
								element={
									<UserPrivateRoute>
										<Chatbot />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/chatbot/history"
								element={
									<UserPrivateRoute>
										<ChatHistory />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/chatbot/templates"
								element={
									<UserPrivateRoute>
										<ChatTemplates />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/chatbot/sessions"
								element={
									<UserPrivateRoute>
										<ChatSessions />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/architecture"
								element={
									<UserPrivateRoute>
										<ArchitectureDesigner />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/architecture/list"
								element={
									<UserPrivateRoute>
										<ArchitectureList />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/architecture/create"
								element={
									<UserPrivateRoute>
										<ArchitectureCreate />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/architecture/editor"
								element={
									<UserPrivateRoute>
										<ArchitectureEditor />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/architecture-editor/:id"
								element={
									<UserPrivateRoute>
										<ArchitectureEditor />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/architecture/templates"
								element={
									<UserPrivateRoute>
										<ArchitectureTemplates />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/architecture/details"
								element={
									<UserPrivateRoute>
										<ArchitectureDetails />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/cost"
								element={
									<UserPrivateRoute>
										<CostEstimate />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/cost/analysis"
								element={
									<UserPrivateRoute>
										<CostAnalysis />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/cost/reports"
								element={
									<UserPrivateRoute>
										<CostReports />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/cost/alerts"
								element={
									<UserPrivateRoute>
										<BudgetAlerts />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/version"
								element={
									<UserPrivateRoute>
										<Version />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/version/history"
								element={
									<UserPrivateRoute>
										<VersionHistory />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/version/compare"
								element={
									<UserPrivateRoute>
										<VersionCompare />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/version/restore"
								element={
									<UserPrivateRoute>
										<VersionRestore />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/deployment"
								element={
									<UserPrivateRoute>
										<Deployment />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/deployment/history"
								element={
									<UserPrivateRoute>
										<DeploymentHistory />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/deployment/status"
								element={
									<UserPrivateRoute>
										<DeploymentStatus />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/deployment/rollback"
								element={
									<UserPrivateRoute>
										<RollbackManager />
									</UserPrivateRoute>
								}
							/>
							{/* <Route
								path="/user/canvas"
								element={
									<UserPrivateRoute>
										<Canvas />
									</UserPrivateRoute>
								} */}
							{/* /> */}
							<Route
								path="/user/import"
								element={
									<UserPrivateRoute>
										<ImportResources />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/devops"
								element={
									<UserPrivateRoute>
										<DevOps />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/devops/containers"
								element={
									<UserPrivateRoute>
										<ContainerManager />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/devops/pipeline"
								element={
									<UserPrivateRoute>
										<PipelineConfig />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/devops/logs"
								element={
									<UserPrivateRoute>
										<LogViewer />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/performance"
								element={
									<UserPrivateRoute>
										<Performance />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/performance/metrics"
								element={
									<UserPrivateRoute>
										<MetricsViewer />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/performance/health"
								element={
									<UserPrivateRoute>
										<HealthCheck />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/performance/alerts"
								element={
									<UserPrivateRoute>
										<AlertsManagement />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/feedback"
								element={
									<UserPrivateRoute>
										<Feedback />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/api"
								element={
									<UserPrivateRoute>
										<APIIntegration />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/education"
								element={
									<UserPrivateRoute>
										<Education />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/education/tutorials"
								element={
									<UserPrivateRoute>
										<EducationTutorials />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/education/docs"
								element={
									<UserPrivateRoute>
										<EducationDocs />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/education/videos"
								element={
									<UserPrivateRoute>
										<EducationVideos />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/education/faqs"
								element={
									<UserPrivateRoute>
										<EducationFAQs />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/user/education/community"
								element={
									<UserPrivateRoute>
										<EducationCommunity />
									</UserPrivateRoute>
								}
							/>
							<Route
								path="/admin"
								element={
									<AdminPrivateRoute>
										<AdminDashboard />
									</AdminPrivateRoute>
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</AuthProvider>
				</BrowserRouter>
			</GoogleOAuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
