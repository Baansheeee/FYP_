import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatCard } from "@/components/StatCard";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingDown, AlertCircle, Zap, Download } from "lucide-react";

const CostEstimate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
      <Navbar />
      <div className="flex w-full">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Cost Intelligence</h1>
                  <p className="text-muted-foreground">Optimize your AWS spending with AI-powered insights</p>
                </div>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                title="Current Month"
                value="$1,249"
                change="-8%"
                trend="down"
                icon={DollarSign}
              />
              <StatCard
                title="Potential Savings"
                value="$342"
                change="+15%"
                trend="up"
                icon={TrendingDown}
              />
              <StatCard
                title="Budget Usage"
                value="62%"
                icon={AlertCircle}
              />
            </div>

            {/* Cost Breakdown */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Cost Breakdown by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { service: "EC2 Instances", cost: "$542", percentage: 43 },
                    { service: "RDS Database", cost: "$298", percentage: 24 },
                    { service: "S3 Storage", cost: "$189", percentage: 15 },
                    { service: "CloudFront CDN", cost: "$134", percentage: 11 },
                    { service: "Lambda Functions", cost: "$86", percentage: 7 },
                  ].map((item) => (
                    <div key={item.service} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.service}</span>
                        <span className="text-muted-foreground">{item.cost}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-purple transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Optimization Suggestions */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  AI-Powered Optimization Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Switch to Reserved Instances",
                      savings: "$127/month",
                      description: "Your EC2 usage pattern is consistent. Reserved instances could save 23%.",
                    },
                    {
                      title: "Enable S3 Intelligent-Tiering",
                      savings: "$45/month",
                      description: "Automatic data tiering can reduce storage costs by moving infrequently accessed data.",
                    },
                    {
                      title: "Optimize RDS Instance Size",
                      savings: "$89/month",
                      description: "Current database utilization is 34%. Consider downsizing to save costs.",
                    },
                  ].map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <span className="text-sm font-medium text-green-600">{suggestion.savings}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      <Button size="sm" variant="outline">Apply Optimization</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CostEstimate;
