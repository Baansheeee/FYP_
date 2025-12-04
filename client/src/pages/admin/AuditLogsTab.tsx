/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	CheckCircle2,
	AlertCircle,
	Clock,
	Loader2,
	Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AuditLog {
	_id: string;
	user: string;
	action: string;
	category: string;
	createdAt: string;
	status: "success" | "failed" | "warning";
	userId?: string;
	details?: string;
}

interface AuditStats {
	total: number;
	success: number;
	failed: number;
	warning: number;
}

const AuditLogsTab = () => {
	const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
	const [stats, setStats] = useState<AuditStats>({
		total: 0,
		success: 0,
		failed: 0,
		warning: 0,
	});
	const [loading, setLoading] = useState(true);
	const [deleteLog, setDeleteLog] = useState<AuditLog | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		fetchAuditLogs();
		fetchAuditStats();
	}, []);

	const fetchAuditLogs = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/audit");
			if (response.data.success) {
				setAuditLogs(response.data.logs);
			}
		} catch (err: any) {
			console.error("Error fetching audit logs:", err);
			toast.error("Failed to fetch audit logs");
		} finally {
			setLoading(false);
		}
	};

	const fetchAuditStats = async () => {
		try {
			const response = await axiosInstance.get("/audit/stats");
			if (response.data.success) {
				setStats(response.data.stats);
			}
		} catch (err: any) {
			console.error("Error fetching audit stats:", err);
		}
	};

	const handleDeleteLog = async () => {
		if (!deleteLog) return;

		setIsDeleting(true);
		try {
			const response = await axiosInstance.delete(`/audit/${deleteLog._id}`);
			if (response.data.success) {
				toast.success("Audit log deleted successfully");
				setDeleteLog(null);
				fetchAuditLogs();
				fetchAuditStats();
			}
		} catch (err: any) {
			console.error("Error deleting log:", err);
			toast.error(err.response?.data?.message || "Failed to delete log");
		} finally {
			setIsDeleting(false);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "success":
				return "bg-green-500";
			case "warning":
				return "bg-yellow-500";
			case "failed":
				return "bg-red-500";
			default:
				return "bg-blue-500";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "success":
				return <CheckCircle2 className="w-4 h-4" />;
			case "warning":
				return <AlertCircle className="w-4 h-4" />;
			case "failed":
				return <AlertCircle className="w-4 h-4" />;
			default:
				return <Clock className="w-4 h-4" />;
		}
	};

	return (
		<div className="space-y-6">
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-cyan-300/70">
							📊 Total Logs
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-cyan-300">{stats.total}</p>
					</CardContent>
				</Card>

				<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-cyan-300/70 flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-green-400" />
							Success
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-green-400">{stats.success}</p>
					</CardContent>
				</Card>

				<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-cyan-300/70 flex items-center gap-2">
							<AlertCircle className="w-4 h-4 text-yellow-400" />
							Warning
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-yellow-400">
							{stats.warning}
						</p>
					</CardContent>
				</Card>

				<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-cyan-300/70 flex items-center gap-2">
							<AlertCircle className="w-4 h-4 text-red-400" />
							Failed
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-red-400">{stats.failed}</p>
					</CardContent>
				</Card>
			</div>

			{/* Audit Logs */}
			<Card className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl">
				<CardHeader className="border-b border-cyan-500/10">
					<div>
						<CardTitle className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							Audit Logs
						</CardTitle>
						<p className="text-sm text-cyan-300/60 mt-2">
							📋 All system activity and actions
						</p>
					</div>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="space-y-3">
						{loading ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
							</div>
						) : auditLogs.length === 0 ? (
							<p className="text-center text-cyan-300/60 py-8">No audit logs</p>
						) : (
							auditLogs.map((log) => (
								<div
									key={log._id}
									className="p-4 rounded-xl bg-gradient-to-r from-slate-700/40 to-slate-600/30 hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 border-l-4 border-cyan-500 group">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<h4 className="font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
													{log.action}
												</h4>
												<Badge
													variant="outline"
													className="text-xs bg-cyan-500/20 border-cyan-500/30 text-cyan-300">
													{log.category}
												</Badge>
											</div>
											<p className="text-sm text-cyan-300/60 mt-1">
												by {log.user}
											</p>
											{log.details && (
												<p className="text-xs text-cyan-300/50 mt-1">
													{log.details}
												</p>
											)}
											<p className="text-xs text-cyan-300/50 mt-1">
												{new Date(log.createdAt).toLocaleString()}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<div
												className={`flex items-center gap-1 px-3 py-1 rounded-full ${getStatusColor(
													log.status
												)} text-white text-xs font-medium`}>
												{getStatusIcon(log.status)}
												{log.status}
											</div>
											<Button
												size="sm"
												variant="destructive"
												onClick={() => setDeleteLog(log)}
												className="gap-1">
												<Trash2 className="w-4 h-4" />
												Delete
											</Button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={!!deleteLog}
				onOpenChange={(open) => !open && setDeleteLog(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Audit Log</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this audit log entry? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteLog}
							disabled={isDeleting}
							className="bg-red-600 hover:bg-red-700">
							{isDeleting ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default AuditLogsTab;
