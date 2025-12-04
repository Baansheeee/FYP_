/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Trash2, Download, Search } from "lucide-react";
import { useState } from "react";

const ChatHistory = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [conversations, setConversations] = useState([
		{
			id: 1,
			title: "EC2 Instance Configuration",
			date: "2024-12-04",
			messages: 12,
			timestamp: "2 hours ago",
		},
		{
			id: 2,
			title: "S3 Bucket Setup Guide",
			date: "2024-12-03",
			messages: 8,
			timestamp: "1 day ago",
		},
		{
			id: 3,
			title: "RDS Database Optimization",
			date: "2024-12-02",
			messages: 15,
			timestamp: "2 days ago",
		},
		{
			id: 4,
			title: "VPC and Security Groups",
			date: "2024-12-01",
			messages: 10,
			timestamp: "3 days ago",
		},
	]);

	const filteredConversations = conversations.filter((conv) =>
		conv.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDelete = (id: number) => {
		setConversations(conversations.filter((conv) => conv.id !== id));
	};

	const handleDownload = (id: number) => {
		const conversation = conversations.find((conv) => conv.id === id);
		// Implement download logic
		console.log("Downloading conversation:", conversation);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="space-y-4">
							<h1 className="text-4xl font-bold">Chat History</h1>
							<p className="text-lg text-muted-foreground">
								View and manage your past conversations with the AI chatbot
							</p>
						</div>

						{/* Search Bar */}
						<div className="relative">
							<Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
							<Input
								placeholder="Search conversations..."
								className="pl-12"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Conversations List */}
						<div className="grid gap-4">
							{filteredConversations.length > 0 ? (
								filteredConversations.map((conversation) => (
									<div
										key={conversation.id}
										className="glass-card rounded-xl p-6 border border-border/50 hover:border-purple-300/50 transition-all group">
										<div className="flex items-start justify-between">
											<div className="flex items-start gap-4 flex-1">
												<div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
													<MessageSquare className="w-5 h-5 text-purple-500" />
												</div>
												<div className="flex-1">
													<h3 className="text-lg font-semibold text-gray-900">
														{conversation.title}
													</h3>
													<div className="flex gap-4 mt-2 text-sm text-muted-foreground">
														<span>{conversation.messages} messages</span>
														<span>{conversation.timestamp}</span>
													</div>
												</div>
											</div>

											<div className="flex gap-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDownload(conversation.id)}
													className="hover:bg-blue-500/10">
													<Download className="w-4 h-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDelete(conversation.id)}
													className="hover:bg-red-500/10">
													<Trash2 className="w-4 h-4 text-red-500" />
												</Button>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="glass-card rounded-xl p-12 border border-border/50 text-center">
									<MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
									<p className="text-muted-foreground">
										No conversations found
									</p>
								</div>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ChatHistory;
