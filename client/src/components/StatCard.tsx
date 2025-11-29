import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  className?: string;
}

export const StatCard = ({ title, value, change, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("glass-card border-border/50", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold">{value}</h3>
              {change && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend === "up" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {change}
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl gradient-purple-soft flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
