/**
 * @format
 */

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GraduationCap, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqItems = [
	{
		id: 1,
		question: "What is AWSOME?",
		answer:
			"AWSOME is a comprehensive cloud architecture management platform that helps teams design, implement, and maintain scalable cloud solutions across multiple cloud providers.",
	},
	{
		id: 2,
		question: "How do I get started with AWSOME?",
		answer:
			"Begin by creating an account, setting up your organization, and following our interactive tutorials. Our step-by-step guides will help you get up and running in minutes.",
	},
	{
		id: 3,
		question: "What cloud providers does AWSOME support?",
		answer:
			"AWSOME supports AWS, Azure, Google Cloud Platform, and other major cloud providers with native integrations and support.",
	},
	{
		id: 4,
		question: "Can I collaborate with my team?",
		answer:
			"Yes! AWSOME includes comprehensive team collaboration features including shared workspaces, role-based access control, and real-time updates.",
	},
	{
		id: 5,
		question: "How is my data secured?",
		answer:
			"We use enterprise-grade encryption, secure API endpoints, and follow industry best practices for data security and compliance.",
	},
	{
		id: 6,
		question: "Is there API documentation available?",
		answer:
			"Yes, comprehensive API documentation is available in our API Integration module with code examples in multiple programming languages.",
	},
	{
		id: 7,
		question: "How often is AWSOME updated?",
		answer:
			"We release new features and improvements regularly. Check our Version Control module to stay updated on the latest changes.",
	},
	{
		id: 8,
		question: "What kind of support is available?",
		answer:
			"We offer multiple support channels including documentation, community forum, email support, and for premium users, dedicated support teams.",
	},
];

interface FAQItem {
	id: number;
	question: string;
	answer: string;
}

const EducationFAQs = () => {
	const [openItems, setOpenItems] = useState<number[]>([]);

	const toggleItem = (id: number) => {
		setOpenItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

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
								<h1 className="text-3xl font-bold">
									Frequently Asked Questions
								</h1>
								<p className="text-muted-foreground">
									Find answers to common questions about AWSOME
								</p>
							</div>
						</div>

						<Card className="glass-card border-border/50">
							<CardContent className="pt-6">
								<div className="space-y-2">
									{faqItems.map((item: FAQItem) => (
										<Collapsible
											key={item.id}
											open={openItems.includes(item.id)}
											onOpenChange={() => toggleItem(item.id)}>
											<CollapsibleTrigger className="w-full">
												<div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-left">
													<h3 className="font-semibold">{item.question}</h3>
													<ChevronDown
														className={`w-5 h-5 transition-transform duration-300 ${
															openItems.includes(item.id) ? "rotate-180" : ""
														}`}
													/>
												</div>
											</CollapsibleTrigger>
											<CollapsibleContent className="px-4 py-3 bg-secondary/20 border border-t-0 border-border/30 rounded-b-lg">
												<p className="text-muted-foreground">{item.answer}</p>
											</CollapsibleContent>
										</Collapsible>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Additional Help Section */}
						<Card className="glass-card border-border/50 bg-gradient-to-br from-purple-50/10 to-blue-50/10">
							<CardContent className="pt-6">
								<div className="text-center space-y-3">
									<h3 className="text-lg font-semibold">
										Didn't find your answer?
									</h3>
									<p className="text-muted-foreground">
										Check our documentation, visit the community forum, or
										contact our support team.
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

export default EducationFAQs;
