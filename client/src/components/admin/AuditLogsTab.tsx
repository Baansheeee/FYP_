/** @format */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock, Loader2, Trash2 } from "lucide-react";
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
			const response = await axiosInstance.delete(
				`/audit/${deleteLog._id}`
			);
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
				<Card className="glass-card border-border/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Total Logs
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{stats.total}</p>
					</CardContent>
				</Card>

				<Card className="glass-card border-border/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-green-500" />
							Success
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-green-500">{stats.success}</p>
					</CardContent>
				</Card>

				<Card className="glass-card border-border/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
							<AlertCircle className="w-4 h-4 text-yellow-500" />
							Warning
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-yellow-500">{stats.warning}</p>
					</CardContent>
				</Card>

				<Card className="glass-card border-border/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
							<AlertCircle className="w-4 h-4 text-red-500" />
							Failed
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-red-500">{stats.failed}</p>
					</CardContent>
				</Card>
			</div>

			{/* Audit Logs */}
			<Card className="glass-card border-border/50">
				<CardHeader>
					<div>
						<CardTitle>Audit Logs</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							All system activity and actions
						</p>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{loading ? (
							<div className="flex items-center justify-center py-12">
								<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
							</div>
						) : auditLogs.length === 0 ? (
							<p className="text-center text-muted-foreground py-8">
								No audit logs
							</p>
						) : (
							auditLogs.map((log) => (
								<div
									key={log._id}
									className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border-l-4 border-blue-500">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<h4 className="font-semibold">{log.action}</h4>
												<Badge variant="outline" className="text-xs">
													{log.category}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">
												by {log.user}
											</p>
											{log.details && (
												<p className="text-xs text-muted-foreground mt-1">
													{log.details}
												</p>
											)}
											<p className="text-xs text-muted-foreground mt-1">
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
			<AlertDialog open={!!deleteLog} onOpenChange={(open) => !open && setDeleteLog(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Audit Log</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this audit log entry? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel disabled={isDeleting}>
							Cancel
						</AlertDialogCancel>
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
};

export default AuditLogsTab;
