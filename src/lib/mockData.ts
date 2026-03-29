import type { Creature } from "@/types/domain";

export const creatureFallbackData: Creature[] = [
  {
    id: "sea-turtle",
    name: "Sea Turtle",
    zone: "sunlight",
    depth: "0-200m",
    description: "Ancient mariners gliding through warm, sunlit waters for over 100 million years.",
    highlight: "Uses magnetic fields to navigate across oceans.",
    emoji: "🐢",
  },
  {
    id: "giant-squid",
    name: "Giant Squid",
    zone: "twilight",
    depth: "200-1000m",
    description: "A legendary deep-water predator with massive eyes.",
    highlight: "Its eyes help detect tiny light in near darkness.",
    emoji: "🦑",
  },
  {
    id: "anglerfish",
    name: "Anglerfish",
    zone: "midnight",
    depth: "1000-4000m",
    description: "Uses a bioluminescent lure to attract prey.",
    highlight: "Females are much larger than males.",
    emoji: "🐡",
  },
  {
    id: "hadal-snailfish",
    name: "Hadal Snailfish",
    zone: "abyss",
    depth: "6000m+",
    description: "One of the deepest-living fish ever recorded.",
    highlight: "Has specialized proteins to survive extreme pressure.",
    emoji: "🐟",
  },
];
