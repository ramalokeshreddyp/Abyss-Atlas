export type OceanZone = "all" | "sunlight" | "twilight" | "midnight" | "abyss";

export interface Creature {
  id: string;
  name: string;
  zone: Exclude<OceanZone, "all">;
  depth: string;
  description: string;
  highlight: string;
  emoji: string;
}

export interface FeedbackPayload {
  name: string;
  email: string;
  message: string;
  rating: number;
}
