/** @format */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Network, Download, Play, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArchitectureDesigner = () => {
	const navigate = useNavigate();

	const handleStartDesigning = () => {
		navigate("/user/architecture/create");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />

				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-6">
						{/* Header */}
						<div className="flex items-center justify-between animate-fade-in">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
									<Network className="w-6 h-6 text-white" />
								</div>
								<div>
									<h1 className="text-3xl font-bold">Architecture Designer</h1>
									<p className="text-muted-foreground">
										Design and visualize your AWS infrastructure
									</p>
								</div>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm">
									<Save className="w-4 h-4 mr-2" />
									Save
								</Button>
								<Button variant="outline" size="sm">
									<Download className="w-4 h-4 mr-2" />
									Export
								</Button>
								<Button size="sm" className="gradient-purple text-white">
									<Play className="w-4 h-4 mr-2" />
									Deploy
								</Button>
							</div>
						</div>

						{/* Canvas */}
						<Card className="h-[calc(100vh-16rem)] glass-card border-border/50 p-8 flex items-center justify-center">
							<div className="text-center space-y-4">
								<div className="w-20 h-20 rounded-2xl gradient-purple-soft flex items-center justify-center mx-auto">
									<Network className="w-10 h-10 text-primary" />
								</div>
								<h3 className="text-xl font-semibold">Architecture Canvas</h3>
								<p className="text-muted-foreground max-w-md">
									Start designing your AWS infrastructure by adding components
									from the sidebar or importing from the chatbot
								</p>
								<Button
									onClick={handleStartDesigning}
									className="gradient-purple text-white shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all">
									Start Designing
								</Button>
							</div>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ArchitectureDesigner;
