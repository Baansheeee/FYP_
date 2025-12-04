/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { useState } from "react";

const ChatSessions = () => {
	const [sessions, setSession] = useState([
		{
			id: 1,
			name: "AWS Best Practices",
			startTime: "2024-12-04 10:30 AM",
			duration: "45 minutes",
			messages: 24,
			status: "Active",
			lastMessage: "How to optimize costs?",
		},
		{
			id: 2,
			name: "Infrastructure Planning",
			startTime: "2024-12-03 02:15 PM",
			duration: "1 hour 20 minutes",
			messages: 18,
			status: "Completed",
			lastMessage: "Design completed successfully",
		},
		{
			id: 3,
			name: "Database Migration",
			startTime: "2024-12-02 11:00 AM",
			duration: "2 hours",
			messages: 32,
			status: "Completed",
			lastMessage: "Migration plan finalized",
		},
		{
			id: 4,
			name: "Security Review",
			startTime: "2024-12-01 03:45 PM",
			duration: "1 hour 15 minutes",
			messages: 16,
			status: "Completed",
			lastMessage: "Security assessment complete",
		},
	]);

	const handleResume = (id: number) => {
		console.log("Resuming session:", id);
	};

	const handleShare = (id: number) => {
		console.log("Sharing session:", id);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Active":
				return "bg-green-100 text-green-700";
			case "Completed":
				return "bg-gray-100 text-gray-700";
			default:
				return "bg-blue-100 text-blue-700";
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="space-y-2">
							<h1 className="text-4xl font-bold">Chat Sessions</h1>
							<p className="text-lg text-muted-foreground">
								Manage and review your chatbot sessions
							</p>
						</div>

						{/* Sessions Table */}
						<div className="glass-card rounded-xl border border-border/50 overflow-hidden">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-border/50 bg-secondary/30">
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Session Name
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Start Time
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Duration
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Messages
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Status
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{sessions.map((session) => (
											<tr
												key={session.id}
												className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
												<td className="px-6 py-4">
													<div>
														<p className="font-medium text-gray-900">
															{session.name}
														</p>
														<p className="text-sm text-muted-foreground mt-1">
															{session.lastMessage}
														</p>
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-muted-foreground">
													{session.startTime}
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2 text-sm">
														<Clock className="w-4 h-4" />
														{session.duration}
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2">
														<MessageCircle className="w-4 h-4 text-purple-500" />
														<span className="text-sm font-medium">
															{session.messages}
														</span>
													</div>
												</td>
												<td className="px-6 py-4">
													<span
														className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
															session.status
														)}`}>
														{session.status}
													</span>
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2">
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleResume(session.id)}>
															Resume
														</Button>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => handleShare(session.id)}>
															<Share2 className="w-4 h-4" />
														</Button>
														<Button variant="ghost" size="sm">
															<MoreVertical className="w-4 h-4" />
														</Button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ChatSessions;
