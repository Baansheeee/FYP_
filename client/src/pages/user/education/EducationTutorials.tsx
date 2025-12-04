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
import { GraduationCap, Book } from "lucide-react";

const EducationTutorials = () => {
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
								<h1 className="text-3xl font-bold">Interactive Tutorials</h1>
								<p className="text-muted-foreground">
									Step-by-step guides to master AWSOME
								</p>
							</div>
						</div>

						<Card className="glass-card border-border/50">
							<CardHeader>
								<CardTitle>Interactive Tutorials</CardTitle>
								<CardDescription>
									Step-by-step guides to master AWSOME
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-center py-12">
									<Book className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2">
										No tutorials yet
									</h3>
									<p className="text-muted-foreground">
										Tutorials will be added soon. Check back later!
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
};

export default EducationTutorials;
