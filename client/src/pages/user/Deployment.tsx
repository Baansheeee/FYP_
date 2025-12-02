import { DashboardSidebar } from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Globe, CheckCircle, Clock, AlertCircle, RotateCcw } from "lucide-react";

const Deployment = () => {
  const deployments = [
    {
      id: "dep-001",
      environment: "Production",
      region: "us-east-1",
      status: "active",
      version: "v3.2.1",
      deployed: "2024-03-15 14:30",
      health: "healthy",
    },
    {
      id: "dep-002",
      environment: "Staging",
      region: "us-west-2",
      status: "active",
      version: "v3.3.0-beta",
      deployed: "2024-03-16 09:15",
      health: "healthy",
    },
    {
      id: "dep-003",
      environment: "Development",
      region: "eu-west-1",
      status: "deploying",
      version: "v3.3.1-dev",
      deployed: "2024-03-16 16:45",
      health: "deploying",
    },
  ];

  const regions = [
    { name: "US East (N. Virginia)", code: "us-east-1", status: "available" },
    { name: "US West (Oregon)", code: "us-west-2", status: "available" },
    { name: "EU West (Ireland)", code: "eu-west-1", status: "available" },
    { name: "Asia Pacific (Tokyo)", code: "ap-northeast-1", status: "available" },
  ];

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
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Deployment Engine</h1>
                  <p className="text-muted-foreground">One-click deployment and management</p>
                </div>
              </div>
              <Button size="lg" className="gradient-purple text-white shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all">
                <Rocket className="w-5 h-5 mr-2" />
                Deploy New Version
              </Button>
            </div>

            {/* Active Deployments */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Active Deployments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deployments.map((deployment, index) => (
                    <div
                      key={deployment.id}
                      className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg gradient-purple-soft flex items-center justify-center">
                            <Globe className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{deployment.environment}</h3>
                            <p className="text-sm text-muted-foreground">{deployment.region}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              deployment.status === "active"
                                ? "default"
                                : deployment.status === "deploying"
                                ? "secondary"
                                : "destructive"
                            }
                            className={deployment.status === "active" ? "bg-green-500" : ""}
                          >
                            {deployment.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {deployment.status === "deploying" && <Clock className="w-3 h-3 mr-1" />}
                            {deployment.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Version</p>
                          <p className="font-medium">{deployment.version}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Deployed</p>
                          <p className="font-medium">{deployment.deployed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Health</p>
                          <p className="font-medium capitalize flex items-center gap-1">
                            {deployment.health === "healthy" && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            {deployment.health}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Logs</Button>
                        <Button size="sm" variant="outline">
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Rollback
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          Terminate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Regions */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Multi-Region Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {regions.map((region, index) => (
                    <div
                      key={region.code}
                      className="p-4 rounded-lg border border-border/40 hover:border-primary/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{region.name}</h4>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                          Available
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{region.code}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Deploy to Region
                      </Button>
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

export default Deployment;
