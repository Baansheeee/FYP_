import { DashboardSidebar } from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plug, Check, Settings, Plus } from "lucide-react";

const APIIntegration = () => {
  const integrations = [
    {
      name: "AWS CloudFormation",
      description: "Deploy infrastructure using CloudFormation templates",
      status: "connected",
      category: "Cloud Provider",
    },
    {
      name: "Terraform Cloud",
      description: "Manage infrastructure as code with Terraform",
      status: "connected",
      category: "IaC Platform",
    },
    {
      name: "GitHub",
      description: "Version control and CI/CD integration",
      status: "connected",
      category: "Version Control",
    },
    {
      name: "Slack",
      description: "Receive notifications and alerts",
      status: "disconnected",
      category: "Communication",
    },
    {
      name: "Datadog",
      description: "Advanced monitoring and analytics",
      status: "disconnected",
      category: "Monitoring",
    },
    {
      name: "PagerDuty",
      description: "Incident management and alerting",
      status: "disconnected",
      category: "Incident Management",
    },
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
                  <Plug className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">API Integrations</h1>
                  <p className="text-muted-foreground">Connect with your favorite tools and services</p>
                </div>
              </div>
              <Button size="sm" className="gradient-purple text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Integration
              </Button>
            </div>

            {/* Connected Integrations */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>
                  Active integrations with your AWSOME workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {integrations
                    .filter((i) => i.status === "connected")
                    .map((integration, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border/40 bg-secondary/20 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{integration.name}</h4>
                              <Badge variant="default" className="bg-green-500">
                                <Check className="w-3 h-3 mr-1" />
                                Connected
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Integrations */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Available Integrations</CardTitle>
                <CardDescription>
                  Connect more tools to enhance your workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {integrations
                    .filter((i) => i.status === "disconnected")
                    .map((integration, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border/40 hover:border-primary/50 transition-colors cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{integration.name}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {integration.category}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {integration.description}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Plug className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>API Keys & Webhooks</CardTitle>
                <CardDescription>
                  Manage API keys for custom integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Plug className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Generate API keys to integrate AWSOME with your custom applications
                  </p>
                  <Button className="gradient-purple text-white">
                    Generate API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default APIIntegration;
