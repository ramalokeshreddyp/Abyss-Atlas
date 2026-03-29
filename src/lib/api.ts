import { creatureFallbackData } from "@/lib/mockData";
import type { Creature, FeedbackPayload, OceanZone } from "@/types/domain";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

type CreaturesResponse = {
  data: Creature[];
  count: number;
};

function applyCreatureFilters(creatures: Creature[], zone: OceanZone, query: string) {
  const search = query.trim().toLowerCase();
  return creatures.filter((creature) => {
    const zoneMatch = zone === "all" ? true : creature.zone === zone;
    const queryMatch =
      search.length === 0 ||
      creature.name.toLowerCase().includes(search) ||
      creature.description.toLowerCase().includes(search) ||
      creature.highlight.toLowerCase().includes(search);
    return zoneMatch && queryMatch;
  });
}

export async function fetchCreatures(zone: OceanZone, query: string): Promise<Creature[]> {
  const params = new URLSearchParams({ zone, q: query });

  try {
    const response = await fetch(`${API_BASE}/api/creatures?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch creatures: ${response.status}`);
    }

    const result = (await response.json()) as CreaturesResponse;
    return result.data;
  } catch {
    return applyCreatureFilters(creatureFallbackData, zone, query);
  }
}

export async function submitFeedback(payload: FeedbackPayload): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/api/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    const fallback = "Unable to submit feedback. Please try again.";
    const details = typeof result.error === "string" ? result.error : fallback;
    throw new Error(details);
  }

  const result = (await response.json()) as { message: string };
  return result;
}
