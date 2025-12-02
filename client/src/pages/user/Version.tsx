import { DashboardSidebar } from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, GitCompare, Clock, User, Download } from "lucide-react";

const Version = () => {
  const versions = [
    {
      version: "v3.2.1",
      date: "2024-03-15",
      author: "John Doe",
      changes: "Added multi-region deployment support",
      status: "current",
    },
    {
      version: "v3.2.0",
      date: "2024-03-10",
      author: "Jane Smith",
      changes: "Optimized RDS configuration and added auto-scaling",
      status: "previous",
    },
    {
      version: "v3.1.5",
      date: "2024-03-05",
      author: "John Doe",
      changes: "Updated security groups and IAM policies",
      status: "previous",
    },
    {
      version: "v3.1.0",
      date: "2024-02-28",
      author: "Mike Johnson",
      changes: "Initial production deployment with load balancer",
      status: "previous",
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
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Version Control</h1>
                  <p className="text-muted-foreground">Track and manage architecture versions</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare Versions
                </Button>
                <Button size="sm" className="gradient-purple text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export History
                </Button>
              </div>
            </div>

            {/* Version Timeline */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Architecture Version History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {versions.map((version, index) => (
                    <div
                      key={version.version}
                      className="relative pl-8 pb-6 border-l-2 border-border last:border-transparent animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          version.status === "current"
                            ? "gradient-purple shadow-lg shadow-purple-glow/50"
                            : "bg-secondary"
                        }`}
                      >
                        <GitBranch
                          className={`w-3 h-3 ${
                            version.status === "current" ? "text-white" : "text-primary"
                          }`}
                        />
                      </div>

                      <div className="glass-card rounded-lg p-4 border border-border/40 hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {version.version}
                              {version.status === "current" && (
                                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">
                                  Current
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{version.changes}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {version.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {version.author}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">Restore</Button>
                          {version.status !== "current" && (
                            <Button size="sm" variant="outline">Compare</Button>
                          )}
                        </div>
                      </div>
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

export default Version;
