import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Cinematic Story Journey",
    description: "Scroll through five ocean zones with layered transitions and atmospheric motion.",
    to: "/journey",
    cta: "Start Journey",
  },
  {
    title: "Interactive Explorer",
    description: "Discover deep-sea species with searchable API-backed cards and resilient fallback data.",
    to: "/explorer",
    cta: "Open Explorer",
  },
  {
    title: "Feedback and Validation",
    description: "Submit structured feedback through validated forms and robust API error handling.",
    to: "/feedback",
    cta: "Send Feedback",
  },
];

const HomePage = () => {
  return (
    <main className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(190_80%_55%/.14),transparent_40%),radial-gradient(circle_at_80%_15%,hsl(210_70%_45%/.16),transparent_35%),linear-gradient(180deg,hsl(210_60%_7%)_0%,hsl(220_58%_4%)_100%)]" />

      <section className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.p
          className="mb-4 font-body text-xs uppercase tracking-[0.32em] text-primary/80"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frontend Odyssey • IIT Patna
        </motion.p>

        <motion.h1
          className="font-display text-5xl leading-[0.9] text-foreground text-glow sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Ocean Depths
          <span className="block text-primary">Interactive System</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A polished multi-page web application with narrative storytelling, API-driven exploration,
          robust validation, and production-grade architecture.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Button asChild size="lg" className="rounded-full px-10">
            <Link to="/journey">Dive Into Journey</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 px-10 text-primary hover:text-primary">
            <Link to="/explorer">Explore Species</Link>
          </Button>
        </motion.div>
      </section>

      <section className="relative mx-auto mt-14 grid max-w-6xl gap-6 sm:mt-20 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            className="group rounded-2xl border border-border/45 bg-card/45 p-6 backdrop-blur-sm transition-colors hover:border-primary/40"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <h2 className="font-display text-2xl text-foreground">{feature.title}</h2>
            <p className="mt-3 min-h-20 font-body text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
            <div className="mt-7 flex justify-center">
              <Button asChild className="rounded-full">
                <Link to={feature.to}>{feature.cta}</Link>
              </Button>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
