import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy } from "lucide-react";

const Hackathons = () => {
  const hackathons = [
    {
      id: 1,
      name: "AI Innovation Challenge 2024",
      description: "Build the next generation of AI-powered applications",
      date: "March 15-17, 2024",
      teams: 24,
      status: "Open",
      prize: "$10,000",
    },
    {
      id: 2,
      name: "Sustainable Tech Hackathon",
      description: "Create solutions for a greener future",
      date: "April 5-7, 2024",
      teams: 18,
      status: "Open",
      prize: "$7,500",
    },
    {
      id: 3,
      name: "HealthTech Innovation Sprint",
      description: "Revolutionize healthcare with technology",
      date: "May 20-22, 2024",
      teams: 15,
      status: "Open",
      prize: "$12,000",
    },
    {
      id: 4,
      name: "FinTech Future Builder",
      description: "Shape the future of financial technology",
      date: "June 10-12, 2024",
      teams: 20,
      status: "Registration Open",
      prize: "$15,000",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Active <span className="bg-gradient-primary bg-clip-text text-transparent">Hackathons</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse ongoing hackathons and find your next challenge
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-2xl">{hackathon.name}</CardTitle>
                  <Badge className="bg-accent text-accent-foreground">
                    {hackathon.status}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {hackathon.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{hackathon.teams} teams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-accent">{hackathon.prize}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Browse Teams
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Hackathons;
