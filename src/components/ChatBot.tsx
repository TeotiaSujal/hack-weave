import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi! I'm here to help you with team formation and hackathons. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        role: "bot",
        content: getBotResponse(input),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("team") || lowerInput.includes("create")) {
      return "To create a team, navigate to the 'Create Team' page. You can post skill-based vacancies and start building your dream team!";
    } else if (lowerInput.includes("join") || lowerInput.includes("participate")) {
      return "Check out the 'Join Teams' page to browse available teams and positions that match your skills!";
    } else if (lowerInput.includes("skill")) {
      return "Our platform uses skill-based matching to connect you with the right teams. Make sure to add your skills when registering!";
    } else if (lowerInput.includes("hackathon")) {
      return "Browse active hackathons on the 'Hackathons' page. Each hackathon has multiple teams looking for talented participants like you!";
    } else {
      return "I can help you with team creation, joining teams, skill matching, and finding hackathons. What would you like to know more about?";
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary shadow-lg hover:opacity-90 transition-opacity z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <div className="p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold">HackTeam Assistant</h3>
            <p className="text-sm opacity-90">Ask me anything!</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" className="bg-gradient-primary">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
