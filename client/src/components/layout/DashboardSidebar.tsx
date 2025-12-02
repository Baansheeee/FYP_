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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const modules = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Smart Chatbot", path: "/chatbot", icon: MessageSquare },
  { name: "Architecture Designer", path: "/architecture/designer", icon: Network },
  { name: "Version Control", path: "/version", icon: GitBranch },
  { name: "Deployment", path: "/deployment", icon: Rocket },
  { name: "Visual Canvas", path: "/canvas", icon: Pencil },
  { name: "Import Resources", path: "/import/connect", icon: Upload },
  { name: "DevOps Automation", path: "/devops/docker", icon: Box },
  { name: "Performance", path: "/performance/dashboard", icon: Activity },
  { name: "Cost Intelligence", path: "/cost/estimate", icon: DollarSign },
  { name: "Feedback", path: "/feedback/rate", icon: MessageCircle },
  { name: "API Integration", path: "/api/integrations", icon: Plug },
  { name: "Education", path: "/education/tutorials", icon: GraduationCap },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] border-r border-border/40 glass-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4 border-b border-border/40 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {modules.map((module) => {
            const isActive = location.pathname.startsWith(module.path);
            const Icon = module.icon;

            return (
              <Link
                key={module.path}
                to={module.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground",
                  collapsed && "justify-center"
                )}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-white")} />
                {!collapsed && (
                  <span className="text-sm font-medium">{module.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-border/40">
            <div className="flex items-center gap-3 px-3 py-2">
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
