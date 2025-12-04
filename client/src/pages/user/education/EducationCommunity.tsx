/**
 * @format
 */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { CommunityForum } from "@/components/CommunityForum";
import { GraduationCap } from "lucide-react";

const EducationCommunity = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
			<Navbar />
			<div className="flex w-full">
				<DashboardSidebar />
				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-8 space-y-8">
						{/* Header */}
						<div className="flex items-center gap-3 animate-fade-in">
							<div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
								<GraduationCap className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-3xl font-bold">Community Forum</h1>
								<p className="text-muted-foreground">
									Connect with other AWSOME users and share knowledge
								</p>
							</div>
						</div>

						<Card className="glass-card border-border/50">
							<CardHeader>
								<CardTitle>Community Discussions</CardTitle>
								<CardDescription>
									Ask questions, share experiences, and learn from the community
								</CardDescription>
							</CardHeader>
							<CardContent>
								<CommunityForum />
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
};

export default EducationCommunity;
