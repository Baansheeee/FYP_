/** @format */

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	MessageSquare,
	Network,
	GitBranch,
	Rocket,
	Pencil,
	Upload,
	Box,
	Activity,
	DollarSign,
	MessageCircle,
	Shield,
	Plug,
	GraduationCap,
	Cloud,
	ChevronLeft,
	ChevronRight,
	ChevronDown,
	History,
	FileText,
	Zap,
	Package,
	AlertCircle,
	TrendingUp,
	BarChart3,
	Workflow,
	Gauge,
	Bell,
	Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const modules = [
	{
		name: "Dashboard",
		path: "/user/dashboard",
		icon: LayoutDashboard,
		subItems: [],
	},
	{
		name: "Smart Chatbot",
		path: "/user/chatbot",
		icon: MessageSquare,
		subItems: [
			{ name: "Chat History", path: "/user/chatbot/history", icon: History },
			{ name: "Templates", path: "/user/chatbot/templates", icon: FileText },
			{ name: "Sessions", path: "/user/chatbot/sessions", icon: Zap },
		],
	},
	{
		name: "Architecture",
		path: "/user/architecture",
		icon: Network,
		subItems: [
			{
				name: "My Architectures",
				path: "/user/architecture/list",
				icon: Cloud,
			},
			{
				name: "Visual Editor",
				path: "/user/architecture/editor",
				icon: Pencil,
			},
			{
				name: "Templates",
				path: "/user/architecture/templates",
				icon: FileText,
			},
			{
				name: "Details",
				path: "/user/architecture/details",
				icon: AlertCircle,
			},
		],
	},
	{
		name: "Cost Management",
		path: "/user/cost",
		icon: DollarSign,
		subItems: [
			{ name: "Cost Analysis", path: "/user/cost/analysis", icon: BarChart3 },
			{ name: "Reports", path: "/user/cost/reports", icon: FileText },
			{ name: "Budget Alerts", path: "/user/cost/alerts", icon: AlertCircle },
		],
	},
	{
		name: "Version Control",
		path: "/user/version",
		icon: GitBranch,
		subItems: [
			{ name: "Version History", path: "/user/version/history", icon: History },
			{ name: "Compare", path: "/user/version/compare", icon: TrendingUp },
			{ name: "Restore", path: "/user/version/restore", icon: Zap },
		],
	},
	{
		name: "Deployment",
		path: "/user/deployment",
		icon: Rocket,
		subItems: [
			{ name: "History", path: "/user/deployment/history", icon: History },
			{ name: "Status", path: "/user/deployment/status", icon: Activity },
			{ name: "Rollback", path: "/user/deployment/rollback", icon: TrendingUp },
		],
	},
	{
		name: "Visual Canvas",
		path: "/user/canvas",
		icon: Pencil,
		subItems: [],
	},
	{
		name: "Import Resources",
		path: "/user/import",
		icon: Upload,
		subItems: [],
	},
	{
		name: "DevOps Tools",
		path: "/user/devops",
		icon: Box,
		subItems: [
			{ name: "Containers", path: "/user/devops/containers", icon: Package },
			{ name: "Pipeline", path: "/user/devops/pipeline", icon: Workflow },
			{ name: "Logs", path: "/user/devops/logs", icon: Activity },
		],
	},
	{
		name: "Performance",
		path: "/user/performance",
		icon: Cpu,
		subItems: [
			{ name: "Metrics", path: "/user/performance/metrics", icon: Gauge },
			{
				name: "Health Check",
				path: "/user/performance/health",
				icon: Activity,
			},
			{ name: "Alerts", path: "/user/performance/alerts", icon: Bell },
		],
	},
	{
		name: "Feedback",
		path: "/user/feedback",
		icon: MessageCircle,
		subItems: [],
	},
	{
		name: "API Integration",
		path: "/user/api",
		icon: Plug,
		subItems: [],
	},
	{
		name: "Education",
		path: "/user/education",
		icon: GraduationCap,
		subItems: [],
	},
];

export const DashboardSidebar = () => {
	const location = useLocation();
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [hoveredModule, setHoveredModule] = useState<string | null>(null);

	const isPathActive = (path: string) => {
		return location.pathname.startsWith(path);
	};

	// Get current active module and sub-item
	const getCurrentSection = () => {
		// First check if we're on a sub-item
		for (const module of modules) {
			const activeSubItem = module.subItems.find(
				(sub) => location.pathname === sub.path
			);
			if (activeSubItem) {
				return {
					module: module.name,
					section: activeSubItem.name,
					modulePath: module.path,
				};
			}
		}

		// If not a sub-item, find the main module
		for (const module of modules) {
			if (isPathActive(module.path)) {
				return { module: module.name, section: null, modulePath: module.path };
			}
		}

		return {
			module: "Dashboard",
			section: null,
			modulePath: "/user/dashboard",
		};
	};
	const currentSection = getCurrentSection();

	// Find the active module for keeping dropdown open
	const getActiveModuleWithSubItems = () => {
		for (const module of modules) {
			// Check if current path matches the module path or any of its sub-items
			const hasActiveSubItem = module.subItems.some(
				(subItem) => location.pathname === subItem.path
			);
			if (
				(isPathActive(module.path) || hasActiveSubItem) &&
				module.subItems.length > 0
			) {
				return module.path;
			}
		}
		return null;
	};

	const activeModuleWithSubItems = getActiveModuleWithSubItems();

	return (
		<aside
			className={cn(
				"sticky top-16 h-[calc(100vh-4rem)] border-r border-border/40 glass-card transition-all duration-300 ease-in-out z-40",
				sidebarCollapsed ? "w-16" : "w-64"
			)}>
			<div className="flex flex-col h-full relative">
				{/* Header with selected section */}
				<div className="p-4 border-b border-border/40 space-y-3">
					<div className="flex items-center justify-between">
						{!sidebarCollapsed && (
							<div className="flex-1 pr-2 flex items-center gap-2">
								{currentSection.section && (
									<Link
										to={currentSection.modulePath}
										className="flex-shrink-0 p-1 hover:bg-secondary rounded-md transition-colors"
										title="Back to module">
										<ChevronLeft className="h-4 w-4 text-foreground/70" />
									</Link>
								)}
								<div className="flex-1 min-w-0">
									<h3 className="text-sm font-semibold text-foreground truncate animate-fade-in">
										{currentSection.section || currentSection.module}
									</h3>
									{currentSection.section && (
										<p className="text-xs text-foreground/60 truncate animate-fade-in">
											{currentSection.module}
										</p>
									)}
								</div>
							</div>
						)}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
							className="h-8 w-8 transition-transform duration-300 ease-in-out">
							{sidebarCollapsed ? (
								<ChevronRight className="h-4 w-4" />
							) : (
								<ChevronLeft className="h-4 w-4" />
							)}
						</Button>
					</div>
				</div>{" "}
				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto p-3 space-y-1">
					{modules.map((module, moduleIndex) => {
						const isActive = isPathActive(module.path);
						const Icon = module.icon;
						const hasSubItems = module.subItems.length > 0;
						const isHovered = hoveredModule === module.path;
						// Keep dropdown open if this module has active sub-items
						const isModuleActive = activeModuleWithSubItems === module.path;
						const showSubItems =
							(isHovered || isModuleActive) && hasSubItems && !sidebarCollapsed;

						return (
							<div
								key={module.path}
								className="relative"
								onMouseEnter={() =>
									hasSubItems && setHoveredModule(module.path)
								}
								onMouseLeave={() => {
									// Only close if this module doesn't have active sub-items
									if (!isModuleActive) {
										setHoveredModule(null);
									}
								}}>
								<Link
									to={module.path}
									className={cn(
										"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
										isActive
											? "bg-primary text-primary-foreground shadow-md"
											: "text-foreground/70 hover:bg-secondary hover:text-foreground",
										sidebarCollapsed && "justify-center",
										hasSubItems && !sidebarCollapsed && "cursor-pointer"
									)}>
									<Icon className={cn("h-5 w-5 flex-shrink-0")} />
									{!sidebarCollapsed && (
										<>
											<span className="text-sm font-medium flex-1">
												{module.name}
											</span>
											{hasSubItems && (
												<ChevronDown
													className={cn(
														"h-4 w-4 transition-transform duration-300",
														isHovered && "rotate-180"
													)}
												/>
											)}
										</>
									)}
								</Link>

								{/* Dropdown Menu - Below the item */}
								{showSubItems && (
									<div
										className="relative w-full rounded-lg bg-background border border-border/50 shadow-xl z-50 overflow-hidden"
										style={{
											animation:
												"expandDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
										}}>
										<div className="p-2 space-y-1">
											{module.subItems.map((subItem, index) => {
												const SubIcon = subItem.icon;
												const isSubActive = location.pathname === subItem.path;

												return (
													<Link
														key={subItem.path}
														to={subItem.path}
														className={cn(
															"flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
															isSubActive
																? "bg-primary/20 text-primary font-medium"
																: "text-foreground/70 hover:bg-secondary/50 hover:text-foreground"
														)}
														style={{
															animation: `slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${
																index * 50
															}ms backwards`,
														}}>
														<SubIcon className="h-4 w-4 flex-shrink-0" />
														<span>{subItem.name}</span>
													</Link>
												);
											})}
										</div>
									</div>
								)}
							</div>
						);
					})}
				</nav>
				{/* Footer */}
				{!sidebarCollapsed && (
					<div className="p-4 border-t border-border/40">
						<div className="flex items-center gap-3 px-3 py-2"></div>
					</div>
				)}
				{/* Animation styles */}
				<style>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes expandDown {
            from {
              opacity: 0;
              transform: scaleY(0.9) translateY(-6px);
              max-height: 0;
              padding-top: 0;
              padding-bottom: 0;
              margin-top: -8px;
            }
            to {
              opacity: 1;
              transform: scaleY(1) translateY(0);
              max-height: 500px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin-top: 8px;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }
        `}</style>
			</div>
		</aside>
	);
};
