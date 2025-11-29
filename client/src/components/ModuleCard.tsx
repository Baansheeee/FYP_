/** @format */

import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
	title: string;
	description: string;
	icon: LucideIcon;
	path: string;
	className?: string;
}

export const ModuleCard = ({
	title,
	description,
	icon: Icon,
	path,
	className,
}: ModuleCardProps) => {
	return (
		<Link to={path}>
			<Card
				className={cn(
					"hover-lift cursor-pointer h-full border-border/50 glass-card group",
					className
				)}>
				<CardHeader>
					<div className="w-12 h-12 rounded-xl gradient-purple-soft flex items-center justify-center mb-3 group-hover:shadow-md transition-all duration-300">
						<Icon className="w-6 h-6 text-primary" />
					</div>
					<CardTitle className="text-lg">{title}</CardTitle>
					<CardDescription className="text-sm">{description}</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	);
};
