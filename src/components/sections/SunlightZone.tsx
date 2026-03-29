import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "../ScrollReveal";
import CreatureCard from "../CreatureCard";
import ParallaxLayer from "../ParallaxLayer";

const creatures = [
  { name: "Sea Turtle", depth: "0–200m", description: "Ancient mariners gliding through warm, sunlit waters for over 100 million years.", emoji: "🐢" },
  { name: "Clownfish", depth: "1–15m", description: "Living among venomous anemone tentacles in a beautiful symbiotic dance.", emoji: "🐠" },
  { name: "Dolphin", depth: "0–300m", description: "Highly intelligent social creatures with complex language and play behavior.", emoji: "🐬" },
  { name: "Coral Reef", depth: "0–50m", description: "Living structures supporting 25% of all marine species — the rainforests of the sea.", emoji: "🪸" },
];

const depthStats = [
  { label: "Marine Life", value: "90%", desc: "of all ocean life lives here" },
  { label: "Light Penetration", value: "200m", desc: "maximum depth" },
  { label: "Temperature", value: "20-25°C", desc: "average surface temp" },
];

const SunlightZone = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lightRayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.08, 0.08, 0]);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section
      id="sunlight"
      ref={ref}
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(200 75% 18%) 0%, hsl(210 65% 14%) 50%, hsl(215 60% 11%) 100%)" }}
      aria-label="Sunlight Zone - 0 to 200 meters depth"
    >
      {/* Animated light rays */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-[2px]"
          style={{
            left: `${15 + i * 18}%`,
            height: "100%",
            background: `linear-gradient(180deg, hsl(195 85% 55% / 0.3), transparent 60%)`,
            opacity: lightRayOpacity,
            rotate: `${-3 + i * 1.5}deg`,
          }}
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Kelp SVG decoration */}
      <motion.svg
        className="absolute bottom-0 left-4 w-16 h-64 opacity-15 hidden md:block"
        viewBox="0 0 60 250"
        fill="none"
        aria-hidden="true"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M30 250 Q25 200 35 150 Q45 100 28 50 Q20 20 30 0" stroke="hsl(145 50% 35%)" strokeWidth="3" fill="none" />
        <path d="M30 180 Q15 160 20 140" stroke="hsl(145 50% 35%)" strokeWidth="2" fill="none" />
        <path d="M32 120 Q50 100 40 80" stroke="hsl(145 50% 35%)" strokeWidth="2" fill="none" />
      </motion.svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-body">Zone 01 — 0 to 200 meters</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-foreground mb-4">
            The <span className="text-ocean-surface">Sunlight</span> Zone
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-12 sm:mb-16 text-base sm:text-lg">
            Where light penetrates and life flourishes. This is the ocean's most
            vibrant layer — home to 90% of all marine life.
          </p>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal delay={0.25}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-16 sm:mb-20">
            {depthStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center cursor-default"
                onHoverStart={() => setHoveredStat(i)}
                onHoverEnd={() => setHoveredStat(null)}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="font-display text-3xl sm:text-4xl font-bold text-primary text-glow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs text-muted-foreground font-body mt-1">{stat.desc}</p>
                {hoveredStat === i && (
                  <motion.div
                    className="h-0.5 bg-primary/40 mt-2 mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ParallaxLayer speed={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {creatures.map((creature, i) => (
              <ScrollReveal key={creature.name} delay={0.1 * i} direction={i % 2 === 0 ? "up" : "scale"}>
                <CreatureCard {...creature} />
              </ScrollReveal>
            ))}
          </div>
        </ParallaxLayer>

        {/* Fun fact sticky card */}
        <ScrollReveal delay={0.3} className="mt-20 sm:mt-24">
          <motion.div
            className="relative bg-secondary/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 sm:p-8 md:p-12 max-w-3xl mx-auto"
            whileHover={{ borderColor: "hsl(185 80% 55% / 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-3 left-6 sm:left-8 bg-primary text-primary-foreground text-xs font-body px-3 py-1 rounded-full">
              Did you know?
            </div>
            <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed">
              The ocean's sunlight zone receives enough solar energy to warm the water to
              <span className="text-primary"> 97°F (36°C)</span> in tropical regions,
              creating the perfect cradle for marine life.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SunlightZone;
