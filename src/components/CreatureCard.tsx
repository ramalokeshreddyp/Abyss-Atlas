import { motion } from "framer-motion";

interface CreatureCardProps {
  name: string;
  depth: string;
  description: string;
  emoji: string;
  glowColor?: string;
}

const CreatureCard = ({ name, depth, description, emoji, glowColor = "primary" }: CreatureCardProps) => {
  return (
    <motion.div
      className="group relative bg-card/60 backdrop-blur-md border border-border/50 rounded-lg p-6 cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-glow-radial" />
      
      <div className="relative z-10">
        <span className="text-4xl block mb-3 group-hover:animate-wave">{emoji}</span>
        <h3 className="font-display text-lg text-foreground mb-1">{name}</h3>
        <p className="text-xs text-primary font-body mb-2">{depth}</p>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">{description}</p>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default CreatureCard;
