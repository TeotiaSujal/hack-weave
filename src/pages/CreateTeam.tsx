import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

interface Vacancy {
  role: string;
  skills: string[];
}

const CreateTeam = () => {
  const { toast } = useToast();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [currentRole, setCurrentRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      setCurrentSkills([...currentSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCurrentSkills(currentSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddVacancy = () => {
    if (currentRole.trim() && currentSkills.length > 0) {
      setVacancies([...vacancies, { role: currentRole, skills: [...currentSkills] }]);
      setCurrentRole("");
      setCurrentSkills([]);
    }
  };

  const handleRemoveVacancy = (index: number) => {
    setVacancies(vacancies.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Team Created Successfully!",
      description: "Your team is now live and accepting applications.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Create Your <span className="bg-gradient-primary bg-clip-text text-transparent">Dream Team</span>
            </h1>
            <p className="text-muted-foreground">
              Define your team and post skill-based vacancies
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Details</CardTitle>
              <CardDescription>
                Tell us about your team and what you're building
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input id="teamName" placeholder="e.g., AI Innovators" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hackathon">Select Hackathon</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a hackathon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-challenge">AI Innovation Challenge 2024</SelectItem>
                      <SelectItem value="sustainable">Sustainable Tech Hackathon</SelectItem>
                      <SelectItem value="healthtech">HealthTech Innovation Sprint</SelectItem>
                      <SelectItem value="fintech">FinTech Future Builder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you're building and your team's vision..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Maximum Team Size</Label>
                  <Input id="maxMembers" type="number" min="2" max="10" defaultValue="5" required />
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Team Vacancies</h3>
                      <p className="text-sm text-muted-foreground">Add roles you need to fill</p>
                    </div>
                  </div>

                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-2">
                      <Label>Role Title</Label>
                      <Input
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        placeholder="e.g., Frontend Developer, UI/UX Designer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Required Skills</Label>
                      <div className="flex gap-2">
                        <Input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                          placeholder="Add required skills"
                        />
                        <Button type="button" onClick={handleAddSkill} variant="outline">
                          Add
                        </Button>
                      </div>
                      {currentSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {currentSkills.map((skill) => (
                            <Badge key={skill} className="bg-primary/10 text-primary">
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-2 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      type="button"
                      onClick={handleAddVacancy}
                      variant="outline"
                      className="w-full"
                      disabled={!currentRole || currentSkills.length === 0}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vacancy
                    </Button>
                  </div>

                  {vacancies.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Posted Vacancies:</h4>
                      {vacancies.map((vacancy, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-2">{vacancy.role}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {vacancy.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveVacancy(idx)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                  Create Team
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default CreateTeam;
