import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { submitFeedback } from "@/lib/api";
import { validateFeedback } from "@/lib/validation";
import type { FeedbackPayload } from "@/types/domain";

const initialState: FeedbackPayload = {
  name: "",
  email: "",
  message: "",
  rating: 5,
};

const FeedbackPage = () => {
  const [form, setForm] = useState<FeedbackPayload>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackPayload, string>>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: (result) => {
      setSuccessMessage(result.message);
      setForm(initialState);
      setErrors({});
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const validation = validateFeedback(form);
    if (!validation.ok) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    mutation.mutate(form);
  };

  const handleChange = <K extends keyof FeedbackPayload>(key: K, value: FeedbackPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-3xl rounded-3xl border border-border/45 bg-card/35 p-6 shadow-deep sm:p-10">
        <div className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-primary/80">Validation Module</p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Share Feedback</h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            This form is validated on both client and API layers to ensure robust data quality and consistent state.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="mb-2 block font-body text-sm text-foreground/90">
              Name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="h-11 w-full rounded-xl border border-border/60 bg-background/70 px-4 font-body text-sm outline-none transition-colors focus:border-primary/60"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 font-body text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-body text-sm text-foreground/90">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="h-11 w-full rounded-xl border border-border/60 bg-background/70 px-4 font-body text-sm outline-none transition-colors focus:border-primary/60"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 font-body text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-body text-sm text-foreground/90">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 font-body text-sm outline-none transition-colors focus:border-primary/60"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 font-body text-xs text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="rating" className="mb-2 block font-body text-sm text-foreground/90">
              Rating (1 to 5)
            </label>
            <input
              id="rating"
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) => handleChange("rating", Number(e.target.value))}
              className="h-11 w-full rounded-xl border border-border/60 bg-background/70 px-4 font-body text-sm outline-none transition-colors focus:border-primary/60"
              aria-invalid={Boolean(errors.rating)}
              aria-describedby={errors.rating ? "rating-error" : undefined}
            />
            {errors.rating && (
              <p id="rating-error" className="mt-1 font-body text-xs text-destructive">
                {errors.rating}
              </p>
            )}
          </div>

          {mutation.error && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 font-body text-sm text-destructive">
              {mutation.error.message}
            </p>
          )}

          {successMessage && (
            <motion.p
              className="rounded-lg border border-primary/40 bg-primary/10 p-3 text-center font-body text-sm text-primary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {successMessage}
            </motion.p>
          )}

          <div className="flex justify-center pt-2">
            <Button type="submit" size="lg" className="rounded-full px-10" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default FeedbackPage;
