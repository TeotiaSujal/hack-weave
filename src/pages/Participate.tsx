import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import SkillBadge from "@/components/SkillBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Participate = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [joinedTeams, setJoinedTeams] = useState<number[]>([]);

  const handleJoinTeam = (teamId: number, teamName: string) => {
    if (joinedTeams.includes(teamId)) {
      toast({
        title: "Already Requested",
        description: `You've already sent a request to join ${teamName}.`,
        variant: "destructive",
      });
      return;
    }

    setJoinedTeams([...joinedTeams, teamId]);
    toast({
      title: "Join Request Sent! 🎉",
      description: `Your request to join ${teamName} has been sent to the team leader.`,
    });
  };

  const teams = [
    {
      id: 1,
      name: "AI Innovators",
      hackathon: "AI Innovation Challenge 2024",
      leader: "Sarah Chen",
      members: 3,
      maxMembers: 5,
      openRoles: ["ML Engineer", "Frontend Developer"],
      requiredSkills: ["Python", "TensorFlow", "React"],
      description: "Building an AI-powered code review assistant",
    },
    {
      id: 2,
      name: "GreenTech Warriors",
      hackathon: "Sustainable Tech Hackathon",
      leader: "Alex Kumar",
      members: 2,
      maxMembers: 4,
      openRoles: ["Backend Developer", "UI/UX Designer"],
      requiredSkills: ["Node.js", "Figma", "MongoDB"],
      description: "Creating a carbon footprint tracking application",
    },
    {
      id: 3,
      name: "HealthHub",
      hackathon: "HealthTech Innovation Sprint",
      leader: "Maria Garcia",
      members: 4,
      maxMembers: 6,
      openRoles: ["Mobile Developer", "Data Scientist"],
      requiredSkills: ["React Native", "Python", "Data Analysis"],
      description: "Developing a mental health support platform",
    },
    {
      id: 4,
      name: "FinanceFlow",
      hackathon: "FinTech Future Builder",
      leader: "David Park",
      members: 2,
      maxMembers: 5,
      openRoles: ["Full Stack Developer", "Security Expert"],
      requiredSkills: ["TypeScript", "Cybersecurity", "Blockchain"],
      description: "Building a decentralized payment solution",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Find Your <span className="bg-gradient-primary bg-clip-text text-transparent">Perfect Team</span>
          </h1>
          <p className="text-muted-foreground mb-6">
            Browse available teams and join based on your skills
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search teams or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:max-w-md"
            />
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
                <SelectItem value="figma">Figma</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          {teams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{team.name}</CardTitle>
                    <CardDescription className="text-base mb-3">
                      {team.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{team.members}/{team.maxMembers} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{team.hackathon}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-gradient-primary hover:opacity-90"
                    onClick={() => handleJoinTeam(team.id, team.name)}
                    disabled={joinedTeams.includes(team.id)}
                  >
                    {joinedTeams.includes(team.id) ? "Request Sent" : "Join Team"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Open Roles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.openRoles.map((role) => (
                      <SkillBadge key={role} skill={role} variant="accent" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.requiredSkills.map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Led by <span className="font-semibold text-foreground">{team.leader}</span>
                  </p>
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

export default Participate;
