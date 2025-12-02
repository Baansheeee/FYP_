/** @format */

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, FileText, BookOpen } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import UsersTab from "@/pages/admin/UsersTab";
import EducationTab from "@/pages/admin/EducationTab";
import AuditLogsTab from "@/pages/admin/AuditLogsTab";
import ComplianceTab from "@/pages/admin/ComplianceTab";

const Admin = () => {
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
						style: { background: "#36b5a8" },
					},
					error: {
						style: { background: "#ef4444" },
					},
				}}
			/>
			<Navbar />
			<div className="flex w-full">
				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center justify-center gap-3 animate-fade-in">
							<div className="w-14 h-14 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
								<Shield className="w-8 h-8 text-white" />
							</div>
							<div className="flex flex-col items-center">
								<h1 className="text-5xl font-bold">Admin Dashboard</h1>
								<p className="text-muted-foreground">
									Manage users, education, policies, and subscriptions
								</p>
							</div>
						</div>
						<Tabs defaultValue="users" className="w-full">
							<div className="flex flex-row justify-center items-center">
								<TabsList className="grid w-full max-w-4xl grid-cols-4 ">
									<TabsTrigger value="users">
										<Users className="w-4 h-4 mr-2" />
										Users
									</TabsTrigger>
									<TabsTrigger value="education">
										<BookOpen className="w-4 h-4 mr-2" />
										Education
									</TabsTrigger>
									<TabsTrigger value="logs">
										<FileText className="w-4 h-4 mr-2" />
										Audit Logs
									</TabsTrigger>
									<TabsTrigger value="compliance">
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
