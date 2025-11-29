/** @format */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface AuditLog {
	id: string;
	user: string;
	action: string;
	category: string;
	timestamp: string;
	status: "success" | "failed" | "warning";
}

const AuditLogsTab = () => {
	const [auditLogs] = useState<AuditLog[]>([
		{
			id: "1",
			user: "john@example.com",
			action: "Deployed architecture v3.2.1",
			category: "Deployment",
			timestamp: "2024-03-16 14:30",
			status: "success",
		},
		{
			id: "2",
			user: "jane@example.com",
			action: "Modified security policy",
			category: "Policy",
			timestamp: "2024-03-16 12:15",
			status: "success",
		},
		{
			id: "3",
			user: "admin@example.com",
			action: "Failed login attempt",
			category: "Auth",
			timestamp: "2024-03-16 09:45",
			status: "warning",
		},
	]);

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
		<Card className="glass-card border-border/50">
			<CardHeader>
				<div>
					<CardTitle>Audit Logs</CardTitle>
					<p className="text-sm text-muted-foreground mt-1">
						Total Logs: {auditLogs.length}
					</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{auditLogs.length === 0 ? (
						<p className="text-center text-muted-foreground py-8">
							No audit logs
						</p>
					) : (
						auditLogs.map((log) => (
							<div
								key={log.id}
								className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border-l-4 border-blue-500">
								<div className="flex items-start justify-between">
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
										<p className="text-xs text-muted-foreground mt-1">
											{log.timestamp}
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
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default AuditLogsTab;
