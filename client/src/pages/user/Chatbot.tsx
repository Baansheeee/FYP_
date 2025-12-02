/** @format */

import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Sparkles } from "lucide-react";

const Chatbot = () => {
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content:
				"Hello! I'm your AWS assistant. Describe your infrastructure needs and I'll help you design the perfect solution.",
		},
	]);
	const [input, setInput] = useState("");

	const handleSend = () => {
		if (!input.trim()) return;

		setMessages([...messages, { role: "user", content: input }]);
		setInput("");

		// Simulate AI response
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"I understand you need a scalable web application. I recommend using EC2 instances with an Application Load Balancer, RDS for database, and S3 for static assets. Would you like me to generate the architecture diagram?",
				},
			]);
		}, 1000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 h-[calc(100vh-8rem)] flex flex-col">
						{/* Header */}
						<div className="mb-6 animate-fade-in">
							<div className="flex items-center gap-3 mb-2">
								<div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
									<Bot className="w-6 h-6 text-white" />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Smart Chatbot</h1>
									<p className="text-muted-foreground">
										Describe your AWS needs in natural language
									</p>
								</div>
							</div>
						</div>

						{/* Chat Messages */}
						<Card className="flex-1 overflow-auto p-6 glass-card border-border/50 mb-4">
							<div className="space-y-6">
								{messages.map((message, index) => (
									<div
										key={index}
										className={`flex gap-4 animate-fade-in ${
											message.role === "user" ? "flex-row-reverse" : ""
										}`}>
										<div
											className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
												message.role === "assistant"
													? "gradient-purple shadow-md"
													: "bg-secondary"
											}`}>
											{message.role === "assistant" ? (
												<Sparkles className="w-5 h-5 text-white" />
											) : (
												<User className="w-5 h-5 text-primary" />
											)}
										</div>
										<div
											className={`flex-1 px-4 py-3 rounded-xl ${
												message.role === "assistant"
													? "bg-secondary/50"
													: "gradient-purple-soft"
											}`}>
											<p className="text-sm leading-relaxed">
												{message.content}
											</p>
										</div>
									</div>
								))}
							</div>
						</Card>

						{/* Input */}
						<div className="flex gap-3">
							<Input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && handleSend()}
								placeholder="Describe your AWS infrastructure needs..."
								className="flex-1 h-12 glass-card"
							/>
							<Button
								onClick={handleSend}
								size="lg"
								className="gradient-purple text-white shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all">
								<Send className="w-5 h-5" />
							</Button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Chatbot;
