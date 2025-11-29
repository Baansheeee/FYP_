import { DashboardSidebar } from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Star, Send, TrendingUp } from "lucide-react";
import { useState } from "react";

const Feedback = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-background">
      <Navbar />
      <div className="flex w-full">
        <DashboardSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-8 max-w-4xl space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Feedback & Model Tuning</h1>
                <p className="text-muted-foreground">Help us improve with your feedback</p>
              </div>
            </div>

            {/* Rating Section */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Rate Your Experience</CardTitle>
                <CardDescription>
                  How satisfied are you with AWSOME's AI-powered features?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-all duration-200 hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-sm text-muted-foreground animate-fade-in">
                    {rating === 5 && "Excellent! We're thrilled you love it! ⭐"}
                    {rating === 4 && "Great! Thank you for your positive feedback! 😊"}
                    {rating === 3 && "Good! We'd love to know how we can improve."}
                    {rating === 2 && "We can do better. Please tell us what went wrong."}
                    {rating === 1 && "We're sorry. Your feedback will help us improve."}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  Tell us about your experience, suggestions, or issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select a category</option>
                    <option value="architecture">Architecture Designer</option>
                    <option value="chatbot">Smart Chatbot</option>
                    <option value="deployment">Deployment Engine</option>
                    <option value="cost">Cost Intelligence</option>
                    <option value="performance">Performance Monitoring</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, suggestions, or report any issues..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="improvement">Suggested Improvements (Optional)</Label>
                  <Textarea
                    id="improvement"
                    placeholder="How can we make AWSOME better for you?"
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button className="w-full gradient-purple text-white shadow-md hover:shadow-lg hover:shadow-purple-glow/50 transition-all">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Model Tuning Info */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Continuous Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your feedback directly helps improve our AI models. We use your input to:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <h4 className="font-semibold mb-2">🎯 Accuracy</h4>
                    <p className="text-sm text-muted-foreground">
                      Refine architecture recommendations
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <h4 className="font-semibold mb-2">⚡ Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimize response times
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <h4 className="font-semibold mb-2">🔧 Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Build what you need
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
