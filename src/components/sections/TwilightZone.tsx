import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "../ScrollReveal";

const facts = [
  { title: "Bioluminescence", description: "90% of creatures here produce their own light through chemical reactions — a living light show in the darkness.", icon: "✨", color: "hsl(175 100% 60%)" },
  { title: "Giant Squid", description: "The legendary kraken reaches 43 feet. Their eyes, the size of dinner plates, evolved to detect the faintest bioluminescent flashes.", icon: "🦑", color: "hsl(260 80% 65%)" },
  { title: "Marine Snow", description: "A constant rain of organic particles drifts down from above — the twilight zone's primary food source.", icon: "❄️", color: "hsl(200 60% 70%)" },
];

const TwilightZone = () => {
  const ref = useRef(null);
  const stickyRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section
      id="twilight"
      ref={ref}
      className="relative min-h-[120vh] py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(215 60% 11%) 0%, hsl(220 55% 8%) 50%, hsl(222 50% 5%) 100%)" }}
      aria-label="Twilight Zone - 200 to 1000 meters depth"
    >
      {/* Bioluminescent particles - more varied */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 4}px`,
            height: `${1 + Math.random() * 4}px`,
            background: i % 4 === 0 ? "hsl(175 100% 60%)" : i % 4 === 1 ? "hsl(260 80% 65%)" : i % 4 === 2 ? "hsl(45 90% 60%)" : "hsl(300 70% 60%)",
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
        />
      ))}

      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-glow-radial" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="block text-center text-xs uppercase tracking-[0.3em] text-primary font-body mb-4">
            Zone 02 — 200 to 1,000 meters
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-foreground mb-4">
            The <span className="text-glow-strong text-ocean-glow">Twilight</span> Zone
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-16 sm:mb-20 text-base sm:text-lg">
            Sunlight fades to near-nothing. In this dim realm, creatures have evolved
            extraordinary adaptations — producing their own light to hunt, communicate,
            and survive.
          </p>
        </ScrollReveal>

        {/* Sticky content reveal */}
        <div ref={stickyRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {facts.map((fact, i) => (
              <ScrollReveal key={fact.title} delay={0.15 * i}>
                <motion.div
                  className={`relative bg-card/40 backdrop-blur-md border rounded-xl p-6 sm:p-8 cursor-pointer transition-colors duration-300 ${
                    activeCard === i ? "border-primary/60" : "border-border/30"
                  }`}
                  onHoverStart={() => setActiveCard(i)}
                  onHoverEnd={() => setActiveCard(null)}
                  onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedCard === i}
                  aria-label={`Learn about ${fact.title}`}
                  onKeyDown={(e) => e.key === "Enter" && setExpandedCard(expandedCard === i ? null : i)}
                >
                  {activeCard === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      layoutId="twilight-card-glow"
                      style={{ background: `radial-gradient(ellipse at center, ${fact.color}15, transparent 70%)` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">{fact.icon}</span>
                  <h3 className="font-display text-lg sm:text-xl text-foreground mb-3">{fact.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{fact.description}</p>

                  {/* Expand indicator */}
                  <motion.div
                    className="mt-4 text-xs text-primary/50 font-body"
                    animate={{ opacity: expandedCard === i ? 0 : 1 }}
                  >
                    Tap to explore →
                  </motion.div>

                  {/* Expanded content */}
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{
                      height: expandedCard === i ? "auto" : 0,
                      opacity: expandedCard === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-4 mt-4 border-t border-border/20">
                      <p className="text-xs text-muted-foreground font-body leading-relaxed">
                        {i === 0 && "Bioluminescence is the most common form of communication in the ocean. Over 76% of ocean creatures can produce light."}
                        {i === 1 && "Giant squid have the largest eyes in the animal kingdom — up to 27cm in diameter, helping them spot predators in near-total darkness."}
                        {i === 2 && "Marine snow can take weeks to reach the deep ocean floor. It forms the base of the deep-sea food web."}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Depth counter */}
        <ScrollReveal delay={0.4} className="mt-20 sm:mt-24">
          <div className="text-center">
            <motion.div
              className="inline-block font-display text-6xl sm:text-7xl md:text-9xl font-bold text-primary/10"
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 2 }}
            >
              1,000m
            </motion.div>
            <p className="text-muted-foreground font-body text-sm -mt-2 sm:-mt-4">Maximum depth of the twilight zone</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TwilightZone;
