import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "../ScrollReveal";

const AbyssSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0.3, 0.7], [0.5, 1.2]);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0, 0.4, 0]);
  const [quoteRevealed, setQuoteRevealed] = useState(false);

  const stats = [
    { value: "36,000", unit: "ft", label: "Deepest point on Earth" },
    { value: "1,086", unit: "bar", label: "Crushing pressure" },
    { value: "1–4°C", unit: "", label: "Near-freezing temperature" },
  ];

  return (
    <section
      id="abyss"
      ref={ref}
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(228 60% 2%) 0%, hsl(230 60% 1%) 50%, hsl(0 0% 0%) 100%)" }}
      aria-label="Abyss - The deepest ocean zone, 6000+ meters"
    >
      {/* Central abyss glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(185 80% 55% / 0.15) 0%, hsl(185 80% 55% / 0.05) 40%, transparent 70%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      {/* Subtle particle field */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-primary/30"
          style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 2, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 1.5 }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal>
          <span className="block text-center text-xs uppercase tracking-[0.3em] text-primary/60 font-body mb-4">
            Zone 04 — 6,000 meters and beyond
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-foreground/80 mb-6">
            The <span className="text-glow text-primary">Abyss</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground font-body max-w-2xl mx-auto mb-16 sm:mb-20 text-base sm:text-lg leading-relaxed">
            The final frontier on Earth. Deeper than Mount Everest is tall, the hadal
            trenches hold secrets we are only beginning to understand.
          </p>
        </ScrollReveal>

        {/* Stats grid with hover effect */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.15 * i} direction="scale">
              <motion.div
                className="text-center p-6 sm:p-8 rounded-xl border border-transparent hover:border-primary/10 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-1 text-glow"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 * i }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                  <span className="text-xl sm:text-2xl text-primary/60">{stat.unit}</span>
                </motion.div>
                <p className="text-xs sm:text-sm text-muted-foreground font-body">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive quote reveal */}
        <ScrollReveal delay={0.3}>
          <motion.div
            className="text-center max-w-3xl mx-auto cursor-pointer"
            onClick={() => setQuoteRevealed(true)}
            whileHover={{ scale: 1.02 }}
            role="button"
            tabIndex={0}
            aria-label="Reveal quote by Jacques Cousteau"
            onKeyDown={(e) => e.key === "Enter" && setQuoteRevealed(true)}
          >
            <motion.blockquote
              className="font-display text-xl sm:text-2xl md:text-3xl text-foreground/70 italic leading-relaxed mb-8"
              animate={quoteRevealed ? {} : { opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {quoteRevealed ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  "The sea, once it casts its spell, holds one in its net of wonder forever."
                </motion.span>
              ) : (
                <span className="text-foreground/30">Touch to reveal the wisdom of the deep...</span>
              )}
            </motion.blockquote>
            {quoteRevealed && (
              <motion.p
                className="text-muted-foreground font-body text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                — Jacques Cousteau
              </motion.p>
            )}
          </motion.div>
        </ScrollReveal>

        {/* Return to surface */}
        <ScrollReveal delay={0.4} className="mt-16 sm:mt-20">
          <div className="text-center">
            <motion.button
              className="group inline-flex items-center gap-3 bg-primary/10 border border-primary/30 text-primary font-body text-sm px-8 py-3 rounded-full hover:bg-primary/20 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(185 80% 55% / 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Return to the surface"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↑
              </motion.span>
              Return to Surface
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <footer className="mt-24 sm:mt-32 pt-8 border-t border-border/10 text-center" role="contentinfo">
          <p className="text-muted-foreground/40 font-body text-xs">
            Ocean Depths — An Interactive Storytelling Experience
          </p>
          <p className="text-muted-foreground/30 font-body text-[10px] mt-2">
            Built for Frontend Odyssey · IIT Patna · 2026
          </p>
        </footer>
      </div>
    </section>
  );
};

export default AbyssSection;
