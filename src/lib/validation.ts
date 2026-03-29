import { z } from "zod";
import type { FeedbackPayload } from "@/types/domain";

export const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(800, "Message is too long"),
  rating: z.number().int().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5"),
});

export interface ValidationResult {
  ok: boolean;
  errors: Partial<Record<keyof FeedbackPayload, string>>;
}

export function validateFeedback(payload: FeedbackPayload): ValidationResult {
  const parsed = feedbackSchema.safeParse(payload);
  if (parsed.success) {
    return { ok: true, errors: {} };
  }

  const formatted = parsed.error.flatten().fieldErrors;
  return {
    ok: false,
    errors: {
      name: formatted.name?.[0],
      email: formatted.email?.[0],
      message: formatted.message?.[0],
      rating: formatted.rating?.[0],
    },
  };
}
