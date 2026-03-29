import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "../ScrollReveal";

const creatures = [
  { name: "Anglerfish", emoji: "🐡", fact: "Uses a bioluminescent lure dangling from its head to attract prey in complete darkness. Males fuse permanently onto females.", depth: "1,000–4,000m", color: "hsl(175 100% 60%)" },
  { name: "Vampire Squid", emoji: "🦑", fact: "Neither squid nor octopus, this ancient species turns itself inside-out to reveal spiny webbing as defense.", depth: "600–1,200m", color: "hsl(260 80% 65%)" },
  { name: "Gulper Eel", emoji: "🐍", fact: "Its enormous mouth can unhinge to swallow prey much larger than itself. Its stomach expands to accommodate massive meals.", depth: "1,000–3,000m", color: "hsl(0 70% 55%)" },
  { name: "Barreleye Fish", emoji: "🐟", fact: "Has a completely transparent head filled with fluid, through which its tubular eyes peer upward to spot prey silhouettes.", depth: "600–2,500m", color: "hsl(45 90% 60%)" },
];

const MidnightZone = () => {
  const [selectedCreature, setSelectedCreature] = useState<number | null>(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const darkOverlay = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);

  return (
    <section
      id="midnight"
      ref={ref}
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222 50% 5%) 0%, hsl(225 55% 3%) 50%, hsl(228 60% 2%) 100%)" }}
      aria-label="Midnight Zone - 1000 to 4000 meters depth"
    >
      {/* Dark overlay that gets darker as you scroll */}
      <motion.div
        className="absolute inset-0 bg-background/50"
        style={{ opacity: darkOverlay }}
      />

      {/* Sparse bioluminescent dots */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-ocean-glow"
          style={{
            left: `${10 + i * 9}%`,
            top: `${15 + (i % 4) * 22}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
          }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="block text-center text-xs uppercase tracking-[0.3em] text-primary font-body mb-4">
            Zone 03 — 1,000 to 4,000 meters
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-foreground mb-4">
            The <span className="text-foreground/60">Midnight</span> Zone
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-16 sm:mb-20 text-base sm:text-lg">
            Absolute darkness. Crushing pressure. Near-freezing temperatures.
            Yet life persists here in forms so alien they challenge our imagination.
          </p>
        </ScrollReveal>

        {/* Interactive creature explorer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {creatures.map((c, i) => (
            <ScrollReveal key={c.name} delay={0.1 * i} direction="scale">
              <motion.button
                className={`w-full p-4 sm:p-6 rounded-xl border transition-all duration-300 text-center ${
                  selectedCreature === i
                    ? "bg-primary/10 border-primary/40 shadow-glow"
                    : "bg-card/20 border-border/20 hover:border-primary/20"
                }`}
                onClick={() => setSelectedCreature(selectedCreature === i ? null : i)}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Learn about ${c.name}`}
                aria-pressed={selectedCreature === i}
              >
                <motion.span
                  className="text-3xl sm:text-4xl block mb-2"
                  animate={selectedCreature === i ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {c.emoji}
                </motion.span>
                <span className="font-display text-xs sm:text-sm text-foreground block">{c.name}</span>
                <span className="block text-[10px] text-muted-foreground font-body mt-1">{c.depth}</span>

                {/* Active indicator */}
                {selectedCreature === i && (
                  <motion.div
                    className="w-6 h-0.5 bg-primary mx-auto mt-3 rounded-full"
                    layoutId="creature-indicator"
                  />
                )}
              </motion.button>
            </ScrollReveal>
          ))}
        </div>

        {/* Fact display */}
        <motion.div
          className="max-w-2xl mx-auto min-h-[120px] flex items-center justify-center"
          layout
        >
          {selectedCreature !== null ? (
            <motion.div
              key={selectedCreature}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-xl p-6 sm:p-8 text-center"
            >
              <p className="font-body text-foreground/90 leading-relaxed text-base sm:text-lg">
                {creatures[selectedCreature].fact}
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {creatures.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === selectedCreature ? "bg-primary" : "bg-muted/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground font-body text-sm text-center"
            >
              ↑ Tap a creature to discover its secrets
            </motion.p>
          )}
        </motion.div>

        {/* Pressure visualization */}
        <ScrollReveal delay={0.3} className="mt-20 sm:mt-24">
          <div className="flex flex-col items-center">
            <p className="font-body text-xs text-muted-foreground mb-4 uppercase tracking-widest">Pressure at depth</p>
            <div className="flex items-end gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-3 sm:w-4 md:w-5 bg-primary/30 rounded-t"
                  initial={{ height: 0 }}
                  whileInView={{ height: bar * 12 }}
                  transition={{ duration: 0.5, delay: bar * 0.1 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
            <p className="font-display text-sm text-foreground/60 mt-3">
              400× atmospheric pressure
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MidnightZone;
