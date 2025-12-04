/** @format */

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, FileText, BookOpen } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import UsersTab from "@/pages/admin/UsersTab";
import EducationTab from "@/pages/admin/EducationTab";
import AuditLogsTab from "@/pages/admin/AuditLogsTab";
import ComplianceTab from "@/pages/admin/ComplianceTab";

const Admin = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
			{/* Animated background elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}></div>
				<div
					className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}></div>
			</div>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 1000,
					style: {
						background: "#0f172a",
						color: "#fff",
						padding: "12px 16px",
						borderRadius: "12px",
						fontSize: "14px",
						border: "1px solid rgba(34, 211, 238, 0.3)",
					},
					success: {
						style: {
							background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
						},
					},
					error: {
						style: {
							background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
						},
					},
				}}
			/>
			<Navbar />
			<div className="flex w-full relative z-10">
				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-center gap-6 animate-fade-in">
							<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300">
								<Shield className="w-8 h-8 text-white" />
							</div>
							<div className="flex flex-col items-center">
								<h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
									Admin Control
								</h1>
								<p className="text-cyan-300/70 mt-2 text-lg">
									Manage users, education, policies, and subscriptions
								</p>
							</div>
						</div>
						<Tabs defaultValue="users" className="w-full">
							<div className="flex flex-row justify-center items-center">
								<TabsList className="grid w-full max-w-4xl grid-cols-4 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-1">
									<TabsTrigger
										value="users"
										className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-300 rounded-lg transition-all duration-300">
										<Users className="w-4 h-4 mr-2" />
										Users
									</TabsTrigger>
									<TabsTrigger
										value="education"
										className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-300 rounded-lg transition-all duration-300">
										<BookOpen className="w-4 h-4 mr-2" />
										Education
									</TabsTrigger>
									<TabsTrigger
										value="logs"
										className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-300 rounded-lg transition-all duration-300">
										<FileText className="w-4 h-4 mr-2" />
										Audit Logs
									</TabsTrigger>
									<TabsTrigger
										value="compliance"
										className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-300 rounded-lg transition-all duration-300">
										<Shield className="w-4 h-4 mr-2" />
										Compliance
									</TabsTrigger>
								</TabsList>
							</div>

							{/* Users Tab */}
							<TabsContent value="users" className="space-y-6">
								<UsersTab />
							</TabsContent>

							{/* Education Tab */}
							<TabsContent value="education" className="space-y-6">
								<EducationTab />
							</TabsContent>

							{/* Audit Logs Tab */}
							<TabsContent value="logs" className="space-y-6">
								<AuditLogsTab />
							</TabsContent>

							{/* Compliance Tab */}
							<TabsContent value="compliance" className="space-y-6">
								<ComplianceTab />
							</TabsContent>
						</Tabs>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Admin;
