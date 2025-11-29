import { DashboardSidebar } from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Save, Download, Share2, Undo, Redo, ZoomIn, ZoomOut } from "lucide-react";

const Canvas = () => {
  const awsComponents = [
    { name: "EC2", category: "Compute" },
    { name: "Lambda", category: "Compute" },
    { name: "RDS", category: "Database" },
    { name: "DynamoDB", category: "Database" },
    { name: "S3", category: "Storage" },
    { name: "EBS", category: "Storage" },
    { name: "VPC", category: "Network" },
    { name: "ALB", category: "Network" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
      <Navbar />
      <div className="flex w-full">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
                  <Pencil className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Visual Canvas</h1>
                  <p className="text-muted-foreground">Drag and drop AWS architecture designer</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Undo className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Redo className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Collaborate
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" className="gradient-purple text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Generate IaC
                </Button>
              </div>
            </div>

            <div className="flex gap-6 h-[calc(100vh-14rem)]">
              {/* Components Palette */}
              <Card className="w-64 glass-card border-border/50 p-4 overflow-auto">
                <h3 className="font-semibold mb-4">AWS Components</h3>
                <div className="space-y-3">
                  {["Compute", "Database", "Storage", "Network"].map((category) => (
                    <div key={category} className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        {category}
                      </p>
                      {awsComponents
                        .filter((c) => c.category === category)
                        .map((component) => (
                          <div
                            key={component.name}
                            className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary cursor-grab active:cursor-grabbing transition-colors border border-border/40"
                            draggable
                          >
                            <p className="text-sm font-medium">{component.name}</p>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Canvas Area */}
              <Card className="flex-1 glass-card border-border/50 p-8 flex items-center justify-center bg-grid-pattern">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl gradient-purple-soft flex items-center justify-center mx-auto">
                    <Pencil className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Design Your Architecture</h3>
                  <p className="text-muted-foreground max-w-md">
                    Drag AWS components from the sidebar onto the canvas to create your infrastructure.
                    Connect components to define relationships and data flow.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">Load Template</Button>
                    <Button className="gradient-purple text-white">Start Fresh</Button>
                  </div>
                </div>
              </Card>

              {/* Properties Panel */}
              <Card className="w-64 glass-card border-border/50 p-4">
                <h3 className="font-semibold mb-4">Properties</h3>
                <div className="text-sm text-muted-foreground">
                  Select a component to view and edit its properties
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Canvas;
