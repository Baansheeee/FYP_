import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatCard } from "@/components/StatCard";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Zap, AlertTriangle, TrendingUp, Download, RefreshCw } from "lucide-react";

const Performance = () => {
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
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Performance Monitoring</h1>
                  <p className="text-muted-foreground">Real-time metrics and AI-powered insights</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard
                title="Uptime"
                value="99.98%"
                change="+0.05%"
                trend="up"
                icon={TrendingUp}
              />
              <StatCard
                title="Response Time"
                value="124ms"
                change="-15ms"
                trend="down"
                icon={Zap}
              />
              <StatCard
                title="Error Rate"
                value="0.03%"
                change="-0.02%"
                trend="down"
                icon={Activity}
              />
              <StatCard
                title="Active Alerts"
                value="2"
                icon={AlertTriangle}
              />
            </div>

            {/* Metrics Chart */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <p>Performance metrics chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Anomaly Detection */}
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    AI Anomaly Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        severity: "warning",
                        message: "CPU usage spike detected on EC2 instance",
                        time: "5 minutes ago",
                      },
                      {
                        severity: "info",
                        message: "Unusual traffic pattern in US-East region",
                        time: "15 minutes ago",
                      },
                      {
                        severity: "success",
                        message: "Database query performance improved",
                        time: "1 hour ago",
                      },
                    ].map((alert, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              alert.severity === "warning"
                                ? "bg-yellow-500"
                                : alert.severity === "info"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alert.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Logs */}
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle>Recent Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-mono text-xs">
                    {[
                      { level: "INFO", message: "Application started successfully", timestamp: "10:45:23" },
                      { level: "WARN", message: "High memory usage detected", timestamp: "10:44:15" },
                      { level: "INFO", message: "Database connection established", timestamp: "10:43:02" },
                      { level: "ERROR", message: "Failed to connect to external API", timestamp: "10:42:18" },
                      { level: "INFO", message: "Cache cleared successfully", timestamp: "10:41:45" },
                    ].map((log, index) => (
                      <div
                        key={index}
                        className="p-2 rounded bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <span className="text-muted-foreground">[{log.timestamp}]</span>{" "}
                        <span
                          className={
                            log.level === "ERROR"
                              ? "text-red-600"
                              : log.level === "WARN"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }
                        >
                          {log.level}
                        </span>{" "}
                        <span>{log.message}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View All Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;
