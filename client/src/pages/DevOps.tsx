import { DashboardSidebar } from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, FileCode, Play, Download, Settings } from "lucide-react";

const DevOps = () => {
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
                  <Box className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">DevOps Automation</h1>
                  <p className="text-muted-foreground">Automate Docker and CI/CD workflows</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="docker" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="docker">Docker</TabsTrigger>
                <TabsTrigger value="orchestration">Orchestration</TabsTrigger>
                <TabsTrigger value="cicd">CI/CD</TabsTrigger>
              </TabsList>

              {/* Docker Tab */}
              <TabsContent value="docker" className="space-y-6">
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle>Auto-Generate Dockerfile</CardTitle>
                    <CardDescription>
                      Automatically create optimized Dockerfiles for your applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Node.js Application</h4>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-background/50 rounded p-4 font-mono text-sm">
                        <pre className="text-muted-foreground">
{`FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`}
                        </pre>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="gradient-purple text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Build Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle>Recent Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "app-backend", tag: "v1.2.3", size: "245 MB", created: "2 hours ago" },
                        { name: "app-frontend", tag: "v1.2.2", size: "186 MB", created: "5 hours ago" },
                        { name: "api-gateway", tag: "v2.0.0", size: "89 MB", created: "1 day ago" },
                      ].map((image, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{image.name}:{image.tag}</h4>
                              <p className="text-sm text-muted-foreground">
                                {image.size} • {image.created}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Push</Button>
                              <Button size="sm" variant="outline">Deploy</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orchestration Tab */}
              <TabsContent value="orchestration" className="space-y-6">
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle>Container Orchestration</CardTitle>
                    <CardDescription>Kubernetes and ECS configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-xl gradient-purple-soft flex items-center justify-center mx-auto mb-4">
                        <Box className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Multi-Container Orchestration</h3>
                      <p className="text-muted-foreground mb-4">
                        Generate Kubernetes manifests and ECS task definitions
                      </p>
                      <Button className="gradient-purple text-white">
                        Generate Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* CI/CD Tab */}
              <TabsContent value="cicd" className="space-y-6">
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle>CI/CD Pipeline Templates</CardTitle>
                    <CardDescription>Pre-configured templates for popular CI/CD platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { platform: "GitHub Actions", language: "YAML", icon: "⚡" },
                        { platform: "GitLab CI", language: "YAML", icon: "🦊" },
                        { platform: "Jenkins", language: "Groovy", icon: "🔧" },
                        { platform: "CircleCI", language: "YAML", icon: "🔵" },
                      ].map((template, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-border/40 hover:border-primary/50 transition-colors cursor-pointer"
                        >
                          <div className="text-3xl mb-2">{template.icon}</div>
                          <h4 className="font-semibold mb-1">{template.platform}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{template.language} Configuration</p>
                          <Button size="sm" variant="outline" className="w-full">
                            <FileCode className="w-4 h-4 mr-2" />
                            Generate Template
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DevOps;
