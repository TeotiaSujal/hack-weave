import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  skill: string;
  variant?: "default" | "secondary" | "accent";
}

const SkillBadge = ({ skill, variant = "default" }: SkillBadgeProps) => {
  const variants = {
    default: "bg-primary/10 text-primary hover:bg-primary/20",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent/10 text-accent hover:bg-accent/20",
  };

  return (
    <Badge className={`${variants[variant]} transition-colors`}>
      {skill}
    </Badge>
  );
};

export default SkillBadge;
