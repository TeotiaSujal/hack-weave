import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import { Users, Target, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Team Matching",
      description: "Connect with teammates based on complementary skills and interests.",
    },
    {
      icon: Target,
      title: "Skill-Based Roles",
      description: "Find or post positions that match specific technical requirements.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Guidance",
      description: "Get instant help from our intelligent chatbot assistant.",
    },
    {
      icon: Zap,
      title: "Quick Formation",
      description: "Build your dream team faster with streamlined processes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Build Your Dream{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Hackathon Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with talented innovators through intelligent skill-based matching.
              Create teams, find collaborators, and bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to="/register">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8">
                  Get Started Free
                </Button>
              </NavLink>
              <NavLink to="/hackathons">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Browse Hackathons
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose HackTeam?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make hackathon team formation intelligent, efficient, and skill-oriented.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-primary-foreground border-0 shadow-glow">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Perfect Team?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of innovators using HackTeam to build amazing projects together.
              </p>
              <NavLink to="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Building Now
                </Button>
              </NavLink>
            </CardContent>
          </Card>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};

export default Index;
